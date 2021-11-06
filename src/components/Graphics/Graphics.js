import React, { useEffect, useContext, useState } from 'react';
import { Col } from 'react-bootstrap';
import ReportContext from '../../context/report-context';
import { firebaseStorage } from '../../firebase/firebase';
import './Graphics.css'

const Report = () => {
  const [listImg, setListImg] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [playerSex, setPlayerSex] = useState('');
  const [playeWeight, setPlayerWeight] = useState('');
  const [playerExperience, setPlayerExperience] = useState('');
  const [gestureType, setGestureType] = useState('');
  const { data } = useContext(ReportContext);
  const storage = firebaseStorage.ref();

  const addImage = (newImage) => (setListImg((oldArray) => [...oldArray, newImage]));

  useEffect(() => {
    if (data.player.documentNumber) {
      if(listImg.length > 0) setListImg([]);
      const { age, documentNumber, experience, playerName, sex, weight } = data.player;
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
    }
    //eslint-disable-next-line
  }, [data.player]);

  return (<div className={'main-container__report'}>
    { 
      listImg.length === 0 
      ? (<p className={'main-container__report--warning'}>Selecciona un Jugador</p>)
      : (<><Col sm={'12'}>
          <h3>{playerName && `Reporte ${playerName}`}</h3>
        </Col>
        <div className={'main-container__report--info'}>
          <div>
            <p><b>Nombre(s):</b> {playerName}</p>
            <p><b>Sexo:</b> {playerSex}</p>
            <p><b>Edad:</b> {playerAge} años</p>
            <p><b>Peso:</b> {playeWeight} Kg</p>
            <p><b>Experiencia:</b> {playerExperience} años</p>
            <p><b>Gesto:</b> {gestureType.split('_').join(' ')}</p>
          </div>
          <div style={{ margin: 'auto' }}>
            <img id={'playerPicture'} alt={'Jugador'} src={'https://estudiantes.ucontinental.edu.pe/wp-content/uploads/2020/09/Madurez-emocional-7.jpg'}/>
          </div>
        </div>
        <div className={'main-container__report--imgs'}>
          {
            listImg && listImg.length > 0
            && listImg.map((img) => (<img alt={'report'} src={img}/>))
          }
        </div></>)
    }
  </div>);
};

export default Report;