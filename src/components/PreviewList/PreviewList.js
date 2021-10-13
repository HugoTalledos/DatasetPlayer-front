import React, { useContext, useMemo, useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import AppContext from '../../context/app-context';
import NotificationContext from '../../context/notification-context';
import './PreviewList.css';

const PreviewList = () => {
  const { data } = useContext(AppContext);
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);
  const [show, setShow] = useState(false);
  const [player, setPlayer] = useState('');
  const [playerList, setPlayerList] = useState([]);

  const addPlayer = (newElement) => setPlayerList((oldArray) => [...oldArray, newElement]);

  useMemo(() => {
    if (data.player.name.length !== 0) {
      addPlayer(data.player);
      dispatchNotification({ text: 'Jugador añadido a la lista', type: 'success' })
    };
    // eslint-disable-next-line
  }, [data]);

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
          <p><strong>Ubicación de archivos</strong>: {playerInfo.root}</p>
          <p><strong>Ubicación de salida</strong>: {playerInfo.rootFinish}</p>
          <p><strong>Separador</strong>: {playerInfo.separator}</p>
          <p><strong>Separador decimal</strong>: {playerInfo.decimalSeparator}</p>
          <p><strong>Métrica</strong>: {playerInfo.metric}</p>
          <p><strong>Unidades</strong>: {playerInfo.unity}</p>
          <p><strong>Nombre de columnas</strong>: {playerInfo.columns}</p>
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
                            onClick={() => {
                              setPlayer(element);
                              setShow(true);
                            }}>
              {element.documentNumber} - {element.name}
            </ListGroup.Item>
          </>))
        }
        { renderModal() }
        </ListGroup>
    </div>
    <div className={'main-container__preview-list--button'}>
      <Button variant="success">Procesar</Button>
    </div>
  </div>);
};

export default PreviewList;
