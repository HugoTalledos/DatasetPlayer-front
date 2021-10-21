import React, { useEffect, useContext, useState } from 'react';
import { Col } from 'react-bootstrap';
import ReportContext from '../../context/report-context';
import { firebaseStorage } from '../../firebase/firebase';
import './Graphics.css'

const Report = () => {
  const [listImg, setListImg] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const { data } = useContext(ReportContext);
  const storage = firebaseStorage.ref();

  const addImage = (newImage) => (setListImg((oldArray) => [...oldArray, newImage]));

  useEffect(() => {
    if (data.playerId) {
      if(listImg.length > 0) setListImg([]);
      const imagesListRef = storage.child(`${data.playerId}/images/NormalBand`);
      imagesListRef.listAll().then(async (res) => {
        for (let idx in res.items) {
          const [name] = (res.items[idx].name).split('_');
          const url = await res.items[idx].getDownloadURL();
          setPlayerName(name);
          addImage(url);
        }
      });
      console.log(data);
      console.log(data.playerId);
    }
    //eslint-disable-next-line
  }, [data.playerId]);

  return (<div className={'main-container__report'}>
    <Col sm={'4'}>
      <h3>{playerName && `Reporte de ${playerName}`}</h3>
    </Col>
    <div className={'main-container__report--imgs'}>
      {
        listImg && listImg.length > 0
        && listImg.map((img) => (<img alt={'report'} src={img}/>))
      }
    </div>
    { 
      listImg.length === 0 
      && (<p className={'main-container__report--warning'}>Selecciona un Jugador</p>)
    }
  </div>);
};

export default Report;