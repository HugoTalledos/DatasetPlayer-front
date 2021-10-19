import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import modalMessageContext from '../../context/modal-context';

const ModalAlert = () => {
  const { data, dispatchData } = useContext(modalMessageContext);

  return (<Modal show={data.show} onHide={() => dispatchData({ show: false })}>
    <Modal.Header closeButton>
      <Modal.Title>{data.title}</Modal.Title>
    </Modal.Header>
  
    <Modal.Body>
      <p>{data.text}</p>
    </Modal.Body>
  
    <Modal.Footer>
      <Button variant={'primary'}
              onClick={() => dispatchData({ isAction: true })}>
        Aceptar
      </Button>
    </Modal.Footer>
  </Modal>);
};

export default ModalAlert;
