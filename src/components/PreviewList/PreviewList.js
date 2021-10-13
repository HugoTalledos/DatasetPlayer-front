import React, { useContext, useMemo, useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import AppContext from '../../context/app-context';
import NotificationContext from '../../context/notification-context';
import './PreviewList.css';

const PreviewList = () => {
  const { data } = useContext(AppContext);
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);
  const [show, setShow] = useState(false);
  const [playerList, setPlayerList] = useState([]);

  const addPlayer = (newElement) => setPlayerList((oldArray) => [...oldArray, newElement]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useMemo(() => {
    if (data.player.name.length !== 0) {
      addPlayer(data.player);
      dispatchNotification({ text: 'Jugador añadido a la lista', type: 'success' })
    };
  }, [data]);

  const renderModal = (element) => {
    console.log(element);
    return (<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>);
  };

  return(<div className={'main-container__preview-list'}>
    <h2> Cola de procesamiento</h2>
    <ListGroup>
      {
        (playerList && playerList.length > 0) 
        && playerList.map((element) => (<>
          <ListGroup.Item onClick={() => handleShow()}>{element.name}</ListGroup.Item>
          { renderModal(element) }
        </>))
      }
    </ListGroup>
    <div className={'main-container__preview-list--button'}>
      <Button variant="success">Procesar</Button>
    </div>
  </div>);
};

export default PreviewList;
