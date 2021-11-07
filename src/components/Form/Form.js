import React, { useContext, useEffect, useState } from 'react';
import { Form, Row, Col, FloatingLabel, Button, Card, Container } from 'react-bootstrap';
import AppContext from '../../context/app-context';
import NotificationContext from '../../context/notification-context';
import BackendApi from '../../api/backendApi';
import userLogo from '../../res/icons/user.png';

import Utils from '../../utils/utils';
import './Form.css';

const FormConfig = () => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [playerPhoto, setPlayerPhoto] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sex, setSex] = useState(0);
  const [experience, setExperience] = useState(0);
  const [efectivity, setEfectivity] = useState(0);
  const [listFiles, setListFiles] = useState('');
  const [separator, setSeparator] = useState(',');
  const [decimalSeparator, setDecimalSeparator] = useState('.');
  const [metric, setMetric] = useState(0);
  const [unity, setUnity] = useState('');
  const [gestureType, setGestureType] = useState(0);
  const [columnTime, setColumnTime] = useState('Tiempo (ms)');
  const [columns, setColumns] = useState('muñeca#codo#hombro#cadera#rodilla#tobillo');
  const [clear, setClear] = useState(false);
  const [graph, setGraph] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const { data, dispatchData } = useContext(AppContext);
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);

  const addFiles = (element) => setListFiles((oldArray) => [...oldArray, element]);
  useEffect(() => {
    switch(metric) {
      case '1': setUnity('°'); break;
      case '2': setUnity('m/s'); break;
      case '3': setUnity('°/s'); break;
      default: setUnity(''); break;
    }
  }, [metric]);

  useEffect(() => {
    if (localStorage.getItem('mail')) {
      BackendApi.getPlayersInfo()
      .then((resp) => setPlayerList(resp.data))
      .catch((error) => dispatchNotification({ text: error.message, type: 'error' }));
    }
    //eslint-disable-next-line
  }, []);

  const validateFields = () => {
    const action = clear ? 'clear' : graph ? 'graph' : 'other';
    const fields = {
      age, clear, columns, decimalSeparator, documentNumber,
      efectivity, experience, graph, metric, name, listFiles,
      separator, sex, unity, weight, gestureType, columnTime
    };

    if (Utils.validateField(fields, action)) {
      dispatchNotification({ text: 'Rellena todos los campos disponibles, por favor', type: 'error' });
    } else savePlayer();
  };

  const listDocuments = (folder, type) => {
    const files = folder.target.files;
    console.log("🚀 ~ file: Form.js ~ line 68 ~ listDocuments ~ files", files)
    if (type === 'image') {
      if (files[0].size > 1000000) return dispatchNotification({ text: 'Imagen demaciado grande (maximo 1MB)', type: 'error' })
      setPlayerPhoto(files[0])
    } else {
      const len = files.length;
      for (let i=0; i<len; i+=1) {
        addFiles(files[i]);
      }
    }
  };

  const savePlayer = () => {
    dispatchData({
      player: {
        age, clear, columns, decimalSeparator, documentNumber,
        efectivity, experience, graph, metric, name, listFiles,
        separator, sex, unity, weight, gestureType, columnTime
      }
    });
    setDocumentNumber('');
    setAge(0);
    setEfectivity(0);
    setExperience(0);
    setExperience(0);
    setName('');
    setListFiles('');
    setSex(0);
    setWeight(0);
  };

  return(<div className={'main-container__form'}>
    <Container>
      <h2>Modos </h2>
      <div className={'main-container__form-mode--switches'}>
        <Form.Check type={'switch'} label={'Limpieza'}
                    id={'clear-switch'} disabled={graph}
                    checked={clear} onChange={(e) => setClear(e.target.checked)}/>
        <Form.Check type={'switch'} label={'Graficar'}
                    disabled={clear} id={'graph-switch'}
                    checked={graph} onChange={(e) => setGraph(e.target.checked)}/>
      </div>
    </Container>
    <Container>
      <Row>
        <h2>Información</h2>
        <Col sm={'8'}>
          <Form>
            <Form.Group as={Row} className={'mb-3'}>
              <Col sm={'6'}>
                <FloatingLabel label={'Número de documento'} className={'mb-3'}>
                  {
                    !clear
                    ? (<Form.Control type={'number'} value={documentNumber}
                                     onChange={(e) => setDocumentNumber(e.target.value)}/>)
                    : (<Form.Select aria-label={'Sex player select'}
                                    value={documentNumber} 
                                    onChange={(e) => setDocumentNumber(e.target.value)}>
                          <option value={'0'}>----------</option>
                          { playerList && playerList.length >= 0
                            && playerList.map((player) =>(
                              <option value={player.documentNumber}>
                                {player.documentNumber} ({player.playerName})
                              </option>))
                          }
                      </Form.Select>)
                  }
                </FloatingLabel>
              </Col>
              <Col sm={'6'}>
                <FloatingLabel label={'Nombre'} className={'mb-3'}>
                  <Form.Control type={'text'} disabled={clear}
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
        </Col>
        <Col of sm={'4'}>
          <Card>
            <img alt={'User default'} style={{ padding: '1em', maxWidth: '100%', maxHeight: '140px'}}
                 src={playerPhoto ? URL.createObjectURL(playerPhoto) : userLogo } />
            <Card.Body>
              <Card.Title>Foto de usuario</Card.Title>
              <input type={'file'} id={'playerPhoto'} disabled={clear}
                     style={{ width: '100%' }}
                     accept={'image/*'} onChange={(e) => listDocuments(e, 'image')}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Container>
      <h2>Configuración</h2>
      <Form>
        <Form.Group as={Row} className={'mb-3'}>
          <Col sm={'6'}>
            <input type={'file'} id={'documents'} multiple disabled={clear}
                    accept={'.csv'} onChange={(e) => listDocuments(e)}/>
            <Form.Label style={{ textAlign: 'left' }}>Subir archivos</Form.Label>
          </Col>
          <Col sm={'6'}>
            <FloatingLabel label={'Gesto'} className={'mb-3'}>
              <Form.Select aria-label={'GEsture Select'} disabled={clear}
                          value={gestureType} onChange={(e) => setGestureType(e.target.value)}>
                <option value={'0'}>----------</option>
                <option value={'1'}>Saque con Salto</option>
                <option value={'2'}>Saque sin Salto</option>
                <option value={'3'}>Remate</option>
              </Form.Select>
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
          <Col sm={6}>
            <FloatingLabel label={'Nombre de columnas'} className={'mb-3'}>
              <Form.Control as={'textarea'} disabled={clear} value={columns}
                            onChange={(e) => setColumns(e.target.value)}/>
            </FloatingLabel>
          </Col>
          <Col sm={6}>
            <FloatingLabel label={'Columna de tiempo'} className={'mb-3'}>
              <Form.Control type={'text'} disabled={clear} value={columnTime}
                            onChange={(e) => setColumnTime(e.target.value)}/>
            </FloatingLabel>
          </Col>
        </Form.Group>
        <Button variant={'success'} onClick={() => validateFields()}>
          { clear ? 'Limpiar' : 'Agregar' }
        </Button>
      </Form>
    </Container>
  </div>);
};

export default FormConfig;