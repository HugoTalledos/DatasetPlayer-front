import React, { useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import AppContext from "../../../context/app-context";
import './FormInfo.css';

const FormInfo = () => {
  const { data, dispatchData } = useContext(AppContext);
  return (<div className={'main-container__form-info'}>
    <h2>Información</h2>
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2"> Nombre </Form.Label>
        <Col sm="10">
          <Form.Control type="text" disabled={data.graph || data.clear}
                        onChange={(e) => dispatchData({ ...data, name: e.target.value })}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2"> Edad </Form.Label>
        <Col sm="2">
          <Form.Control type="number" min={0} disabled={data.graph || data.clear}
                        onChange={(e) => dispatchData({ ...data,  age: e.target.value })}/>
        </Col>
        <Form.Label column sm="2"> Peso (kg) </Form.Label>
        <Col sm="2">
          <Form.Control type="number" min={0} disabled={data.graph || data.clear}
                        onChange={(e) => dispatchData({ ...data, weight: e.target.value })}/>
        </Col>
        <Form.Label column sm="2"> Sexo </Form.Label>
        <Col sm="2">
          <Form.Select aria-label="Default select example" disabled={data.graph || data.clear}
                       onChange={(e) => dispatchData({ ...data, sex: e.target.value })}>
            <option>----------</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2"> Años de entrenamiento </Form.Label>
        <Col sm="4">
          <Form.Control type="number" min={0} max={data.age} disabled={data.graph || data.clear}
                        onChange={(e) => dispatchData({ ...data, experience: e.target.value })}/>
        </Col>
        <Form.Label column sm="2"> Efectividad (%)</Form.Label>
        <Col sm="4">
          <Form.Control type="number" min={0} max={100} disabled={data.graph || data.clear}
                        onChange={(e) => dispatchData({ ...data, efectivity: e.target.value })}/>
        </Col>
      </Form.Group>
    </Form>
  </div>);
};

export default FormInfo;
