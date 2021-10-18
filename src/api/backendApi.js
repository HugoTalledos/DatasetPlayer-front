import { api, getResponseData, escalateError } from './index';

export default class BackendPlayer {
  static startGraphMode(data, token) {
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
};
