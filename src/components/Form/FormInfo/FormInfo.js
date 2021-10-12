import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import './FormInfo.css';

const FormInfo = () => {
  return (<div className={'main-container__form-info'}>
    <h2>Información</h2>
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2"> Nombre </Form.Label>
        <Col sm="10"> <Form.Control type="text" /> </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2"> Edad </Form.Label>
        <Col sm="2"> <Form.Control type="number" /> </Col>
        <Form.Label column sm="2"> Peso (kg) </Form.Label>
        <Col sm="2"> <Form.Control type="number" /> </Col>
        <Form.Label column sm="2"> Sexo </Form.Label>
        <Col sm="2">
          <Form.Select aria-label="Default select example">
            <option>----------</option>
            <option value="1">Masculino</option>
            <option value="2">Femenino</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2"> Años de entrenamiento </Form.Label>
        <Col sm="4"> <Form.Control type="number" /> </Col>
        <Form.Label column sm="2"> Efectividad (%)</Form.Label>
        <Col sm="4"> <Form.Control type="number" /></Col>
      </Form.Group>
    </Form>
  </div>);
};

export default FormInfo;
