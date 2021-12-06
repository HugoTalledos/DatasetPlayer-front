import React, { useEffect, useContext, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import BackendApi from '../../api/backendApi';
import NotificationContext from '../../context/notification-context';
import ReportContext from '../../context/report-context';
import { firebaseRef } from '../../firebase/firebase';

import Utils from '../../utils/utils';

import './PlayerList.css';

const PlayerList = () => {
  const [playerList, setPlayerList] = useState([]);
  const [gestureType, setGestureType] = useState('');
  const { dispatchData } = useContext(ReportContext);
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (localStorage.getItem('mail')) {
      BackendApi.getPlayersInfo()
      .then((resp) => setPlayerList(resp.data))
      .catch((error) => {
        dispatchNotification({ text: error.message, type: 'error' });
        setTimeout(() => Utils.logOut(firebaseRef), 1000);
      });
    }
    //eslint-disable-next-line
  }, []);

  return (<div className={'main-container__list-player'}>
  <h4>Gesto</h4>
  <div key={'inline-radio'} className='mb-3'>
    <Form.Check inline label='Remate'
      onChange={(event) => setGestureType(event.target.id)}
      name='group1' type={'radio'}
      id={'Remate'}
    />
    <Form.Check inline label='Saque con salto'
      onChange={(event) => setGestureType(event.target.id)}
      name='group1' type={'radio'}
      id={'Saque_con_salto'}
    />
    <Form.Check inline label='Saque sin salto'
      onChange={(event) => setGestureType(event.target.id)}
      name='group1' type={'radio'}
      id={'Saque_sin_salto'}
    />
  </div>
  <h4> Jugadores</h4>
  <div className={'main-container__list-player--list'}>
    <ListGroup>
      {
        playerList && playerList.length > 0
        && playerList.map((player, idx) => 
          (<ListGroup.Item key={`${idx}-${player.documentNumber}`}
                           style = {{ cursor: 'pointer' }}
                           disabled={!gestureType}
                           onClick={() => dispatchData({ player: player, gestureType})}>
                      {player.playerName}
          </ListGroup.Item>))
      }
      </ListGroup>
  </div>
</div>);
};

export default PlayerList;