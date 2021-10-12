import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import AppContext from "../../../context/app-context";
import NotificationContext from "../../../context/notification-context";
import './FormMode.css';

const FormMode = () => {
  const { data, dispatchData } = useContext(AppContext);
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);

  const validateFields = () => {
    const {
      name, age, weight, sex, experience,
      efectivity, root, finishRoot,
      separator, decimalSeparator, metric,
      unity, columns, clear,
    } = data;
    const action = clear ? 'clear' : 'graph';

    switch (action) {
      case 'clear':
        if (!root || root.length === 0) {
          dispatchNotification({ text: 'Rellena todos los campos disponibles, por favor', type: 'danger' });
        } else savePlayer('clear');
        break;
      case 'graph':
        if  (!root || root.length === 0
          || !finishRoot || finishRoot.length === 0
          || !separator || separator.length === 0
          || !decimalSeparator || decimalSeparator.length === 0
          || !metric || metric.length === 0
          || !unity || unity.length === 0
          || !columns || columns.length === 0) {
          dispatchNotification({ text: 'Rellena todos los campos disponibles, por favor', type: 'danger' });
        } else savePlayer('graph');
        break;
      default:
        if (!name || name.length === 0
          || !age || age.length === 0
          || !weight || weight.length === 0
          || !sex || sex.length === 0
          || !experience || experience.length === 0
          || !efectivity || efectivity.length === 0
          || !root || root.length === 0
          || !finishRoot || finishRoot.length === 0
          || !separator || separator.length === 0
          || !decimalSeparator || decimalSeparator.length === 0
          || !metric || metric.length === 0
          || !unity || unity.length === 0
          || !columns || columns.length === 0
          ) {
          dispatchNotification({ text: 'Rellena todos los campos disponibles, por favor', type: 'danger' });
        } else savePlayer()
        break;
    }
  };

  const savePlayer = (action) => {
    
  };

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
    <Button variant="success" onClick={() => validateFields()}>Agregar</Button>
  </div>);
};

export default FormMode;
