import React, { useEffect, useContext, useState } from 'react';
import { ButtonGroup, Button, Col } from 'react-bootstrap';
import jsPDF from 'jspdf';
import ReportContext from '../../context/report-context';
import { firebaseStorage } from '../../firebase/firebase';

import userLogo from '../../res/icons/user.png';
import './Graphics.css'

const Report = () => {
  const [listImg, setListImg] = useState([]);
  const [listImgVl, setListImgVl] = useState([]);
  const [listImgVa, setListImgVa] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [playerSex, setPlayerSex] = useState('');
  const [playeWeight, setPlayerWeight] = useState('');
  const [playerExperience, setPlayerExperience] = useState('');
  const [gestureType, setGestureType] = useState('');
  const [playerPhoto, setPlayerPhoto] = useState('');
  const { data } = useContext(ReportContext);
  const storage = firebaseStorage.ref();

  const addImage = (newImage) => (setListImg((oldArray) => [...oldArray, newImage]));
  const addImageVl = (newImage) => (setListImgVl((oldArray) => [...oldArray, newImage]));
  const addImageVa = (newImage) => (setListImgVa((oldArray) => [...oldArray, newImage]));

  useEffect(() => {
    if (data.player.documentNumber) {
      if(listImg.length > 0) setListImg([]);
      const {
        age, documentNumber, experience,
        playerName, sex, weight, picture,
      } = data.player;
      const root = `${documentNumber}/images/${data.gestureType}/`
      const imagesMARef = storage.child(`${root}Movimiento Angular`);
      imagesMARef.listAll().then(async (res) => {
        for (let idx in res.items) {
          const url = await res.items[idx].getDownloadURL();
          addImage(url);
        }
      });
      const imagesVLRef = storage.child(`${root}Velocidad Lineal`);
      imagesVLRef.listAll().then(async (res) => {
        for (let idx in res.items) {
          const url = await res.items[idx].getDownloadURL();
          addImageVl(url);
        }
      });
      const imagesVARef = storage.child(`${root}Velocidad Angular`);
      imagesVARef.listAll().then(async (res) => {
        for (let idx in res.items) {
          const url = await res.items[idx].getDownloadURL();
          addImageVa(url);
        }
      });
      setPlayerName(playerName);
      setPlayerAge(age);
      setPlayerSex(sex);
      setPlayerWeight(weight);
      setPlayerExperience(experience);
      setGestureType(data.gestureType.split('_').join(' '));
      setPlayerPhoto(picture);
    }
    //eslint-disable-next-line
  }, [data.player]);

  const saveAsPDF = () => {
    const input = document.getElementById('report');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      hotfixes: ['px_scaling']
    });
    pdf.html(input, {
      callback: () => {
        pdf.save("download.pdf");
      },
      margin: [40, 30, 40, 30],
      autoPaging: 'text',
      width: 750,
      windowWidth: 1000,
    });
  };

  return (<div className={'main-container__report'}>
    <div className={'flex-container'}>
      <ButtonGroup aria-label='Buttons group'>
        <Button variant='primary'>Descargar datos</Button>
        <Button variant='primary'
                onClick={() => saveAsPDF()}>Descargar reporte</Button>
      </ButtonGroup>
    </div>
    { 
      listImg.length === 0 
      ? (<p className={'main-container__report--warning'}>Selecciona un Jugador</p>)
      : (<div id='report'>
        <Col sm={'12'}>
          <h3>{playerName && `Reporte ${playerName}`}</h3>
        </Col>
        <div className={'main-container__report--info'}>
          <div>
            <p><b>Nombre(s):</b> {playerName}</p>
            <p><b>Sexo:</b> {playerSex}</p>
            <p><b>Edad:</b> {playerAge} años</p>
            <p><b>Peso:</b> {playeWeight} Kg</p>
            <p><b>Experiencia:</b> {playerExperience} años</p>
            
          </div>
          <div style={{ margin: 'auto' }}>
            <img id={'playerPicture'} alt={'Jugador'} src={playerPhoto || userLogo}/>
          </div>
        </div>
        <h3>{ gestureType }</h3>
        <h3>Movimiento Angular </h3>
        <div className={'main-container__report--imgs'}>
          {
            listImg && listImg.length > 0
            && listImg.map((img, idx) => (<img id={idx} alt={'report'} src={img}/>))
          }
        </div>
        <h3>Velocidad Lineal </h3>
        <div className={'main-container__report--imgs'}>
          {
            listImgVl && listImgVl.length > 0
            && listImgVl.map((img, idx) => (<img id={idx} alt={'report'} src={img}/>))
          }
        </div>
        <div style={{ height: '200px'}}/>
        <h3>Velocidad Angular </h3>
        <div className={'main-container__report--imgs'}>
          {
            listImgVa && listImgVa.length > 0
            && listImgVa.map((img, idx) => (<img id={idx} alt={'report'} src={img}/>))
          }
        </div>
      </div>)
    }
  </div>);
};

export default Report;