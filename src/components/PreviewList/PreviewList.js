import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import './PreviewList.css';

const PreviewList = () => {
  return(<div className={'main-container__preview-list'}>
    <h2> Cola de procesamiento</h2>
    <ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
    <div className={'main-container__preview-list--button'}>
      <Button variant="success">Procesar</Button>
    </div>
  </div>);
};

export default PreviewList;
