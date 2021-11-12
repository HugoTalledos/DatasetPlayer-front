import { api, getResponseData, escalateError } from './index';

export default class BackendPlayer {
  static startGraphMode(data) {
    return api.post('graphMode', data,
      { headers: { Authorization: localStorage.getItem('token') } })
      .then(getResponseData)
      .catch(escalateError);
  };

  static startClearMode(data) {
    return api.post('clearMode', data,
    { headers: { Authorization: localStorage.getItem('token') } })
    .then(getResponseData)
    .catch(escalateError);
  }

  static startProcess(data) {
    return api.post('startProcess', data,
    { headers: { Authorization: localStorage.getItem('token') } })
    .then(getResponseData)
    .catch(escalateError);
  }

  static getPlayersInfo(){
    return api.get('getPlayers',
    { headers: { Authorization: localStorage.getItem('token') } })
    .then(getResponseData)
    .catch(escalateError);
  }

  static addPlayer(data) {
    console.log({ ...data, status: 0 });
    return api.post('createPlayers', { ...data, status: 0 },
    { headers: { Authorization: localStorage.getItem('token') } })
    .then(getResponseData)
    .catch(escalateError);
  }
};
