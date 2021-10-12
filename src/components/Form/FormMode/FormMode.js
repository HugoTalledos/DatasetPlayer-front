import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import AppContext from "../../../context/app-context";
import './FormMode.css';

const FormMode = () => {
  const { data, dispatchData } = useContext(AppContext);
  return(<div className={'main-container__form-mode'}>
    <h2>Modos </h2>
    <div className={'main-container__form-mode--switches'}>
      <Form.Check 
        type="switch"
        disabled={data.graph || data.clear}
        id="delTemp-switch"
        label="Borrar Temporales"
        onChange={(e) => dispatchData({ ...data, delTemp: e.target.value === 'on' })}
      />
      <Form.Check 
        type="switch"
        label="Limpieza"
        id="clear-switch"
        disabled={data.graph}
        onChange={(e) => {
        dispatchData({
          ...data,
          clear: e.target.checked,
          disabled: e.target.checked,
        })}}
      />
      <Form.Check 
        type="switch"
        label="Gráficas"
        disabled={data.clear}
        id="graph-switch"
        onChange={(e) => dispatchData({
          ...data, graph: e.target.checked,
        })}
      />
    </div>
    <Button variant="success" onClick={() => console.log(data)}>Agregar</Button>
  </div>);
};

export default FormMode;
