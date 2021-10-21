import React, { useEffect, useContext, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import BackendApi from '../../api/backendApi';
import NotificationContext from "../../context/notification-context";
import ReportContext from "../../context/report-context";
import './PlayerList.css';

const PlayerList = () => {
  const [playerList, setPlayerList] = useState([]);
  const { dispatchData } = useContext(ReportContext);
  const { dispatchData: dispatchNotification } = useContext(NotificationContext);

  useEffect(() => {
    BackendApi.getPlayersInfo()
    .then((resp) => setPlayerList(resp.data))
    .catch((error) => dispatchNotification({ text: error.message, type: 'error' }));
    //eslint-disable-next-line
  }, []);

  return (<div className={'main-container__list-player'}>
  <h2> Jugadores</h2>
  <div className={'main-container__list-player--list'}>
    <ListGroup>
      {
        playerList && playerList.length > 0
        && playerList.map((player) => 
          (<ListGroup.Item key={`${player.documentNumber}`}
                           style = {{ cursor: 'pointer' }}
                           onClick={() => dispatchData({ playerId: player.documentNumber})}>
                      {player.playerName}
          </ListGroup.Item>))
      }
      </ListGroup>
  </div>
</div>);
};

export default PlayerList;