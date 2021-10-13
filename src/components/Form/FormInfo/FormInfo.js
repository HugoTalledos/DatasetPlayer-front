import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import AppContext from "../../../context/app-context";
import NotificationContext from "../../../context/notification-context";
import './FormInfo.css';

const FormInfo = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sex, setSex] = useState(0);
  const [experience, setExperience] = useState(0);
  const [efectivity, setEfectivity] = useState(0);
  const [root, setRoot] = useState('');
  const [rootFinish, setRootFinish] = useState('');
  const [separator, setSeparator] = useState(',');
  const [decimalSeparator, setDecimalSeparator] = useState('.');
  const [metric, setMetric] = useState(0);
  const [unity, setUnity] = useState('');
  const [columns, setColumns] = useState('');
  const [temp, setTemp] = useState(false);
  const [clear, setClear] = useState(false);
  const [graph, setGraph] = useState(false);
  const { data, dispatchData } = useContext(AppContext);
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);

  useEffect(() => {
    switch(data.metric) {
      case '1':
        dispatchData({ ...data, unity: '°' })
        break;
        case '2':
          dispatchData({ ...data, unity: 'm/s'})
          break;
        case '3':
          dispatchData({ ...data, unity: '°/s'})
          break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [data.metric]);

  const validateFields = () => {
    const action = clear 
    ? 'clear'
    : graph && 'graph';
    console.log("🚀 ~ file: FormMode.js ~ line 19 ~ validateFields ~ action", action)

    switch (action) {
      case 'clear':
        if (!root || root.length === 0) {
          dispatchNotification({ text: 'Rellena todos los campos disponibles, por favor', type: 'danger' });
        } else savePlayer('clear');
        break;
      case 'graph':
        if  (!root || root.length === 0
          || !rootFinish || rootFinish.length === 0
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
          || !rootFinish || rootFinish.length === 0
          || !separator || separator.length === 0
          || !decimalSeparator || decimalSeparator.length === 0
          || !metric || metric.length === 0
          || !unity || unity.length === 0 
          || !columns || columns.length === 0
          ) {
          dispatchNotification({ text: 'Rellena todos los campos disponibles, por favor', type: 'danger' });
        } else savePlayer('run')
        break;
    }
  };

  const savePlayer = (action) => {
    if (action === 'run') {
      dispatchData({
        player: {
          age, clear, columns, decimalSeparator, efectivity,
          experience, graph, metric, name, root, rootFinish,
          separator, sex, temp, unity, weight,
        }
      });
      setAge(0);
      setEfectivity(0);
      setExperience(0);
      setExperience(0);
      setName('');
      setRoot('');
      setRootFinish('');
      setSex(0);
      setWeight(0);
    }
  };


  return (<div className={'main-container__form-info'}>
    <h2>Información</h2>
    <Form>
      <Form.Group as={Row} className={'mb-3'}>
        <Form.Label column sm={'2'}> Nombre </Form.Label>
        <Col sm={'10'}>
          <Form.Control type={'text'} disabled={graph ||clear}
                        value={name} onChange={(e) => setName(e.target.value)}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className={'mb-3'}>
        <Form.Label column sm={'2'}> Edad </Form.Label>
        <Col sm={'2'}>
          <Form.Control type={'number'} min={0} disabled={graph || clear}
                        value={age} onChange={(e) => setAge(e.target.value)}/>
        </Col>
        <Form.Label column sm={'2'}> Peso (kg) </Form.Label>
        <Col sm={'2'}>
          <Form.Control type={'number'} min={0} disabled={graph || clear}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}/>
        </Col>
        <Form.Label column sm={'2'}> Sexo </Form.Label>
        <Col sm={'2'}>
          <Form.Select aria-label={'Sex player select'} disabled={graph || clear}
                       value={sex}
                       onChange={(e) => setSex(e.target.value)}>
            <option value={'0'}>----------</option>
            <option value={'M'}>Masculino</option>
            <option value={'F'}>Femenino</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className={'mb-3'}>
        <Form.Label column sm={'2'}> Años de entrenamiento </Form.Label>
        <Col sm={'4'}>
          <Form.Control type={'number'} min={0} max={data.age} disabled={graph || clear}
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}/>
        </Col>
        <Form.Label column sm={'2'}> Efectividad (%)</Form.Label>
        <Col sm={'4'}>
          <Form.Control type={'number'} min={0} max={100} disabled={graph || clear}
                        value={efectivity}
                        onChange={(e) => setEfectivity(e.target.value)}/>
        </Col>
      </Form.Group>
      </Form>
      <div className={'main-container__form-config'}>
      <h2>Configuración</h2>
      <Form>
        <Form.Group as={Row} className={'mb-3'}>
          <Col sm={'6'}>
            <FloatingLabel label={'Ubicación de archivos'} className={'mb-3'}>
              <Form.Control type={'text'} value={root}
                            onChange={(e) => setRoot(e.target.value)}/>
            </FloatingLabel>
          </Col>
          <Col sm={'6'}>
            <FloatingLabel label={'Ubicación de salida'} className={'mb-3'}>
              <Form.Control type={'text'} disabled={clear} value={rootFinish}
                            onChange={(e) => setRootFinish(e.target.value)}/>
            </FloatingLabel>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className={'mb-3'} >
          <Col sm={'6'}>
            <FloatingLabel label={'Separador'} className={'mb-3'}>
              <Form.Control type={'text'} disabled={clear} value={separator}
                            onChange={(e) => setSeparator(e.target.value)}/>
            </FloatingLabel>
          </Col>
          <Col sm={'6'}>
            <FloatingLabel label={'Separador decimal'} className={'mb-3'}>
              <Form.Control type={'text'} disabled={clear} value={decimalSeparator}
                            onChange={(e) => setDecimalSeparator(e.target.value)}/>
            </FloatingLabel>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className={'mb-3'}>
          <Col sm={'6'}>
            <FloatingLabel label={'Métrica'} className={'mb-3'}>
              <Form.Select aria-label={'Metric Select'} disabled={clear}
                          value={metric}
                          onChange={(e) => setMetric(e.target.value)}>
                <option value={'0'}>----------</option>
                <option value={'1'}>Movimiento Angular</option>
                <option value={'2'}>Velocidad Lineal</option>
                <option value={'3'}>Velocidad Angular</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col sm={'6'}>
            <FloatingLabel label={'Unidades'} className={'mb-3'}>
              <Form.Control type={'text'} value={unity} disabled={clear}
                            onChange={(e) => setUnity(e.target.value)}/>
            </FloatingLabel>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className={'mb-3'}>
          <FloatingLabel label={'Nombre de columnas'} className={'mb-3'}>
            <Form.Control as={'textarea'} disabled={clear} value={columns}
                          onChange={(e) => setColumns(e.target.value)}/>
          </FloatingLabel>
        </Form.Group>
      </Form>
    </div>
    <div className={'main-container__form-mode'}>
      <h2>Modos </h2>
      <div className={'main-container__form-mode--switches'}>
        <Form.Check 
          type={'switch'}
          disabled={graph || clear}
          id={'delTemp-switch'}
          label={'Borrar Temporales'}
          checked={temp}
          onChange={(e) => setTemp(e.target.checked)}/>
        <Form.Check 
          type={'switch'}
          label={'Limpieza'}
          id={'clear-switch'}
          disabled={graph}
          checked={clear}
          onChange={(e) => setClear(e.target.checked)}/>
        <Form.Check 
          type={'switch'}
          label={'Graficar'}
          disabled={clear}
          id={'graph-switch'}
          checked={graph}
          onChange={(e) => setGraph(e.target.checked)}/>
      </div>
      <Button variant={'success'} onClick={() => validateFields()}>
        {
          clear
            ? 'Limpiar'
            : graph
              ? 'Graficar'
              : 'Agregar'
        }
      </Button>
    </div>
  </div>);
};

export default FormInfo;
