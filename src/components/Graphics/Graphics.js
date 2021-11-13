import React, { useEffect, useContext, useState } from 'react';
import { ButtonGroup, Button, Col } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReportContext from '../../context/report-context';
import { firebaseStorage } from '../../firebase/firebase';

import userLogo from '../../res/icons/user.png';
import './Graphics.css'

const Report = () => {
  const [listImg, setListImg] = useState([]);
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

  useEffect(() => {
    console.log(data.player);
    if (data.player.documentNumber) {
      if(listImg.length > 0) setListImg([]);
      const {
        age, documentNumber, experience,
        playerName, sex, weight, picture,
      } = data.player;
      const imagesListRef = storage.child(`${documentNumber}/images/NormalBand`);
      imagesListRef.listAll().then(async (res) => {
        for (let idx in res.items) {
          const url = await res.items[idx].getDownloadURL();
          addImage(url);
        }
      });
      setPlayerName(playerName);
      setPlayerAge(age);
      setPlayerSex(sex);
      setPlayerWeight(weight);
      setPlayerExperience(experience);
      setGestureType(data.gestureType);
      setPlayerPhoto(picture);
    }
    //eslint-disable-next-line
  }, [data.player]);

  const saveAsPDF = () => {
    const input = document.getElementById('report');
    // let imgWidth = canvas.imgWidth;
    // let imgHeight = canvas.height * imgWidth / canvas.width;
    // const imgData = canvas.toDataURL('img/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      hotfixes: ['px_scaling']
    });
    pdf.html(input, {
      callback: () => {
        pdf.save("download.pdf");
      },
      margin: [40, 30, 80, 30],
      autoPaging: 'text',
      width: 750,
      windowWidth: 1000,
    });
  };

  return (<div className={'main-container__report'}>
    <div className={'flex-container'}>
      <ButtonGroup aria-label='Buttons group'>
        <Button variant='primary'>Descargar datos</Button>
        <Button variant='primary' disable={listImg.length === 0}
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
        <div className={'main-container__report--imgs'}>
          {
            listImg && listImg.length > 0
            && listImg.map((img, idx) => (<img id={idx} alt={'report'} src={img}/>))
          }
        </div>
      </div>)
    }
  </div>);
};

export default Report;