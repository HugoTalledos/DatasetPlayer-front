import React from "react";
import { Form, Button } from "react-bootstrap";
import './FormMode.css';

const FormMode = () => {
  return(<div className={'main-container__form-mode'}>
    <h2>Modos </h2>
    <div className={'main-container__form-mode--switches'}>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="Borrar Temporales"
      />
      <Form.Check 
        type="switch"
        label="Limpieza"
        id="disabled-custom-switch"
      />
      <Form.Check 
        type="switch"
        label="Gráficas"
        id="disabled-custom-switch"
      />
    </div>
    <Button variant="success">Agregar</Button>
  </div>);
};

export default FormMode;
