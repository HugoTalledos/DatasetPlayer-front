import React, { useContext, useMemo, useState, useEffect } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import AppContext from '../../context/app-context';
import NotificationContext from '../../context/notification-context';
import ModalContext from "../../context/modal-context";
import BackendPlayer from '../../api/backendApi';
import { firebaseStorage } from '../../firebase/firebase';
import './PreviewList.css';

const PreviewList = () => {
  const { data } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [documentNumber, setDocumentNumber] = useState('');
  const [player, setPlayer] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);
  const { data: dataModal, dispatchData: dispatchModal } = useContext(ModalContext);
  const storage = firebaseStorage.ref();

  const addPlayer = (newElement) => setPlayerList((oldArray) => [...oldArray, newElement]);

  useMemo(() => {
    if (data.player.documentNumber.length !== 0) {
      addPlayer(data.player);
      dispatchNotification({ text: 'Jugador añadido a la lista', type: 'success' })
    };
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (dataModal.isAction) {
      BackendPlayer.startClearMode(documentNumber)
        .then((resp) => {
          if (resp.success) {
            dispatchNotification({ text: resp.data, type: 'success' })
          }
          dispatchModal({});
          deletePlayer(documentNumber)
        })
        .catch((e) => {
          dispatchNotification({ text: e.message, type: 'error' })
          dispatchModal({});
        });
    }
    //eslint-disable-next-line
  }, [dataModal])

  const uploadFiles = async (player) => {
    // console.log(player);
    const { documentNumber, listFiles, name, playerPhoto } = player;
    const listPromises = [];

    const photFile = storage.child(`${documentNumber}/picture/${documentNumber}_${name}.png`);
    const url = photFile.put(playerPhoto).then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    });

    listFiles.forEach((file, idx) => {
      const fileRef = storage.child(`${documentNumber}/data/${documentNumber}_${name}_${idx}.csv`);
      listPromises.push(fileRef.put(file))
    });

    return Promise.all([listPromises])
      .then(() => {
        dispatchNotification({ text: `Archivos de ${player.name} subidos`, type: 'success' })
        return url;
      })
      .catch((err) =>dispatchNotification({ text: err.message, type: 'danger' }));
  };

  const startProccess = async () => {
    setIsRunning(true);
    if (localStorage.getItem('token')) {
      for (let idx in playerList) {
        const { graph, clear } = playerList[idx];
        if(graph) {
          await uploadFiles(playerList[idx])
          .then(() => {
            BackendPlayer.startGraphMode(playerList[idx])
            .then((res) => {
              if (res.success) dispatchNotification({ text: res.data, type: 'success' });
              else dispatchNotification({ text: res.error, type: 'error' });
              deletePlayer(playerList[idx].documentNumber);
            })
            .catch((e) => dispatchNotification({ text: e.message, type: 'error' }));
          })
          .catch((err) => dispatchNotification({ text: err.message, type: 'error' }));
        } else if(clear) {
          setDocumentNumber(playerList[idx].documentNumber);
          dispatchModal({
            title: '¿Seguro que quieres realizar esta acción?',
            text: 'Esta accion es irreversible y borrará las imagenes y archivos previamente cargados. (La informacion seguira presente en el dataset)',
          })
        } else { 
          await uploadFiles(playerList[idx])
          .then((resp) => {
            BackendPlayer.addPlayer({ ...playerList[idx], photo: resp });

            BackendPlayer.startProcess(playerList[idx])
            .then((res) => {
              if (res.success) dispatchNotification({ text: res.data, type: 'success' });
              else dispatchNotification({ text: res.error, type: 'error' });
              deletePlayer(playerList[idx].documentNumber);
            })
            .catch((e) => dispatchNotification({ text: e.message, type: 'error' }));
          })
          .catch((err) => dispatchNotification({ text: err.message, type: 'error' }));
        }
      }
    } else {
      dispatchNotification({ text: 'Debes iniciar sesión para iniciar el proceso', type: 'error'})
    }
  }

  const deletePlayer = (documentNumber) => {
    const newTaskList = playerList.filter((player) => player.documentNumber !== documentNumber);
    setPlayerList(newTaskList);
    setShow(false);
    setPlayer();
    dispatchNotification({ text: 'Jugador quitado de la lista', type: 'warning' })
  }

  const renderModal = () => {
    if (!player) return(<></>)
    const [playerInfo] = playerList.filter((element) => element.documentNumber === player.documentNumber);
    return (<Modal show={show} onHide={() => setShow(false)} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Información de jugador</Modal.Title>
      </Modal.Header>
      <Modal.Body scro>
        {<>
          <p><strong>Número de documento</strong>: {playerInfo.documentNumber}</p>
          <p><strong>Nombre</strong>: {playerInfo.name}</p>
          <p><strong>Edad</strong>: {playerInfo.age}</p>
          <p><strong>Peso</strong>: {playerInfo.weight}</p>
          <p><strong>Sexo</strong>: {playerInfo.sex}</p>
          <p><strong>Años de entrenamiento</strong>: {playerInfo.experience}</p>
          <p><strong>Efectividad</strong>: {playerInfo.efectivity}</p>
          <p><strong>Cantidad de archivos</strong>: {playerInfo.listFiles.length}</p>
          <p><strong>Ubicación de salida</strong>: {playerInfo.rootFinish}</p>
          <p><strong>Separador</strong>: {playerInfo.separator}</p>
          <p><strong>Separador decimal</strong>: {playerInfo.decimalSeparator}</p>
          <p><strong>Métrica</strong>: {playerInfo.metric}</p>
          <p><strong>Unidades</strong>: {playerInfo.unity}</p>
          <p><strong>Nombre de columnas</strong>: {playerInfo.columns}</p>
          <p><strong>Nombre de columna de tiempo</strong>: {playerInfo.columnTime}</p>
        </>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'danger'} onClick={() => deletePlayer(playerInfo.documentNumber)}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>);
  };

  return(<div className={'main-container__preview-list'}>
    <h2> Cola de procesamiento</h2>
    <div className={'main-container__preview-list--list'}>
      <ListGroup>
        {
          (playerList && playerList.length > 0) 
          && playerList.map((element, idx) => (<>
            <ListGroup.Item key={`${element.documentNumber}-${idx}`}
                            style = {{ cursor: 'pointer' }}
                            className={'d-flex justify-content-between align-items-start'}
                            onClick={() => {
                              setPlayer(element);
                              setShow(true);
                            }}>
              {element.documentNumber} - {element.name || '(Limpiar)'}
              { isRunning &&
               (<div class="ripple-loader">
                  <div></div>
                  <div></div>
                </div>)
              }
            </ListGroup.Item>
          </>))
        }
        { renderModal() }
        </ListGroup>
    </div>
    <div className={'main-container__preview-list--button'}>
      <Button variant={'success'} onClick={() => startProccess()}>Procesar</Button>
    </div>
  </div>);
};

export default PreviewList;
