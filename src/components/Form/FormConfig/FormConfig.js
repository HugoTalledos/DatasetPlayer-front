import React from "react";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import './FormConfig.css';

const FormConfig = () => {
  return(<div className={'main-container__form-config'}>
    <h2>Configuración</h2>
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Col sm="6">
          <Form.Label>Ubicación de archivos</Form.Label>
          <div class="input-group">
            <div class="custom-file">
            <input type="file" title={'test'} webkitdirectory="true" />
            </div>
          </div>
        </Col>
        <Col sm="6">
          <Form.Label>Ubicación de salida</Form.Label>
          <div class="input-group">
            <div class="custom-file">
            <input type="file" title={'test'} webkitdirectory="true" />
            </div>
          </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Col sm="6">
          <FloatingLabel label="Separador" className="mb-3">
            <Form.Control type="text"/>
          </FloatingLabel>
        </Col>
        <Col sm="6">
          <FloatingLabel label="Separador decimal" className="mb-3">
            <Form.Control type="text"/>
          </FloatingLabel>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm="6">
          <FloatingLabel label="Métrica" className="mb-3">
            <Form.Select aria-label="Default select example">
              <option>----------</option>
              <option value="1">Movimiento Angular</option>
              <option value="2">Velocidad Lineal</option>
              <option value="2">Velocidad Angular</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col sm="6">
          <FloatingLabel label="Unidades" className="mb-3">
            <Form.Control type="text" />
          </FloatingLabel>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className={'mb-3'}>
        <FloatingLabel label="Nombre de columnas" className="mb-3">
          <Form.Control as="textarea"/>
        </FloatingLabel>
      </Form.Group>
    </Form>
  </div>)
};

export default FormConfig;
