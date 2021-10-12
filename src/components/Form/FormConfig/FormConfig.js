import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import AppContext from "../../../context/app-context";
import './FormConfig.css';

const FormConfig = () => {
  const { data, dispatchData } = useContext(AppContext);
  const [unity, setUnity] = useState('');

  useEffect(() => {
    switch(data.metric) {
      case '1':
        setUnity('°');
        break;
      case '2':
        setUnity('m/s');
        break;
      case '3':
        setUnity('°/s');
        break;
      default:
        setUnity('');
    }
  }, [data.metric]);

  return(<div className={'main-container__form-config'}>
    <h2>Configuración</h2>
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Col sm="6">
          <FloatingLabel label="Ubicación de archivos" className="mb-3">
            <Form.Control type="text"
                          onChange={(e) => dispatchData({ ...data, root: e.target.value })}/>
          </FloatingLabel>
        </Col>
        <Col sm="6">
          <FloatingLabel label="Ubicación de salida" className="mb-3">
            <Form.Control type="text" disabled={data.clear}
                          onChange={(e) => dispatchData({ ...data, finishRoot: e.target.value })}/>
          </FloatingLabel>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Col sm="6">
          <FloatingLabel label="Separador" className="mb-3">
            <Form.Control type="text" disabled={data.clear}
                          onChange={(e) => dispatchData({ ...data, separator: e.target.value })}/>
          </FloatingLabel>
        </Col>
        <Col sm="6">
          <FloatingLabel label="Separador decimal" className="mb-3">
            <Form.Control type="text" disabled={data.clear}
                          onChange={(e) => dispatchData({ ...data, decimalSeparator: e.target.value })}/>
          </FloatingLabel>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm="6">
          <FloatingLabel label="Métrica" className="mb-3">
            <Form.Select aria-label="Default select example" disabled={data.clear}
                         onChange={(e) => dispatchData({ ...data, metric: e.target.value })}>
              <option value={'0'}>----------</option>
              <option value="1">Movimiento Angular</option>
              <option value="2">Velocidad Lineal</option>
              <option value="3">Velocidad Angular</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col sm="6">
          <FloatingLabel label="Unidades" className="mb-3">
            <Form.Control type="text" value={unity} disabled={data.clear}
                          onChange={(e) => dispatchData({ ...data, unity: e.target.value })}/>
          </FloatingLabel>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className={'mb-3'}>
        <FloatingLabel label="Nombre de columnas" className="mb-3">
          <Form.Control as="textarea" disabled={data.clear}
                        onChange={(e) => dispatchData({ ...data, columns: e.target.value })}/>
        </FloatingLabel>
      </Form.Group>
    </Form>
  </div>)
};

export default FormConfig;
