import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import AppContext from "../../context/app-context";
import NotificationContext from "../../context/notification-context";

import './Form.css';

const FormConfig = () => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [name, setName] = useState('');
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
  const [columns, setColumns] = useState('muñeca#codo#hombro#cadera#rodilla#tobillo');
  const [temp, setTemp] = useState(false);
  const [clear, setClear] = useState(false);
  const [graph, setGraph] = useState(false);
  const { data, dispatchData } = useContext(AppContext);
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);

  useEffect(() => {
    switch(metric) {
      case '1': setUnity('°'); break;
      case '2': setUnity('m/s'); break;
      case '3': setUnity('°/s'); break;
      default: setUnity(''); break;
    }
  }, [metric]);

  const validateFields = () => {
    const action = clear ? 'clear' : graph && 'graph';

    switch (action) {
      case 'clear':
        if (!root || root.length === 0 || !documentNumber || documentNumber === 0) {
          dispatchNotification({ text: 'Rellena todos los campos disponibles, por favor', type: 'danger' });
        } else savePlayer('clear');
        break;
      case 'graph':
        if  (!documentNumber || documentNumber.length === 0
          || !root || root.length === 0
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
        if (!documentNumber || documentNumber === 0
          || !name || name.length === 0
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
          age, clear, columns, decimalSeparator, documentNumber,
          efectivity, experience, graph, metric, name, root,
          rootFinish, separator, sex, temp, unity, weight,
        }
      });
      setDocumentNumber('');
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

  return(<div className={'main-container__form'}>
      <div className={'main-container__form-info'}>
      <h2>Información</h2>
      <Form>
        <Form.Group as={Row} className={'mb-3'}>
          <Col sm={'6'}>
            <FloatingLabel label={'Número de documento'} className={'mb-3'}>
              <Form.Control type={'number'} value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}/>
            </FloatingLabel>
          </Col>
          <Col sm={'6'}>
            <FloatingLabel label={'Nombre'} className={'mb-3'}>
              <Form.Control type={'text'} disabled={graph ||clear}
                            value={name} onChange={(e) => setName(e.target.value)}/>
            </FloatingLabel>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className={'mb-3'}>
          <Col sm={'4'}>
            <FloatingLabel label={'Edad'} className={'mb-3'}>
              <Form.Control type={'number'} min={0} disabled={graph || clear}
                            value={age} onChange={(e) => setAge(e.target.value)}/>
            </FloatingLabel>
          </Col>
          <Col sm={'4'}>
            <FloatingLabel label={'Peso (kg)'} className={'mb-3'}>
              <Form.Control type={'number'} min={0} disabled={graph || clear}
                            value={weight} onChange={(e) => setWeight(e.target.value)}/>
            </FloatingLabel>
          </Col>
          <Col sm={'4'}>
            <FloatingLabel label={'Sexo'} className={'mb-3'}>
              <Form.Select aria-label={'Sex player select'} disabled={graph || clear}
                          value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value={'0'}>----------</option>
                <option value={'M'}>Masculino</option>
                <option value={'F'}>Femenino</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className={'mb-3'}>
          <Col sm={'6'}>
            <FloatingLabel label={'Años de entrenamiento'} className={'mb-3'}>
              <Form.Control type={'number'} min={0} max={data.age} disabled={graph || clear}
                            value={experience} onChange={(e) => setExperience(e.target.value)}/>
            </FloatingLabel>
          </Col>
          <Col sm={'6'}>
            <FloatingLabel label={'Efectividad (%)'} className={'mb-3'}>
              <Form.Control type={'number'} min={0} max={100} disabled={graph || clear}
                            value={efectivity} onChange={(e) => setEfectivity(e.target.value)}/>
            </FloatingLabel>
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
                            value={metric} onChange={(e) => setMetric(e.target.value)}>
                  <option value={'0'}>----------</option>
                  <option value={'1'}>Movimiento Angular</option>
                  <option value={'2'}>Velocidad Lineal</option>
                  <option value={'3'}>Velocidad Angular</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col sm={'6'}>
              <FloatingLabel label={'Unidades'} className={'mb-3'}>
                <Form.Control type={'text'} value={unity}
                              disabled={ metric === '0' || clear}
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
          <Form.Check type={'switch'} disabled={graph || clear}
                      id={'delTemp-switch'} label={'Borrar Temporales'}
                      checked={temp} onChange={(e) => setTemp(e.target.checked)}/>
          <Form.Check type={'switch'} label={'Limpieza'}
                      id={'clear-switch'} disabled={graph}
                      checked={clear} onChange={(e) => setClear(e.target.checked)}/>
          <Form.Check type={'switch'} label={'Graficar'}
                      disabled={clear} id={'graph-switch'}
                      checked={graph} onChange={(e) => setGraph(e.target.checked)}/>
        </div>
        <Button variant={'success'} onClick={() => validateFields()}>
          { clear ? 'Limpiar': graph ? 'Graficar' : 'Agregar' }
        </Button>
      </div>
    </div>
  </div>)
};

export default FormConfig;