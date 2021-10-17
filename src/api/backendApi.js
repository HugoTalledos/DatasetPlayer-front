import { api, getResponseData, escalateError } from './index';

export default class BackendPlayer {
  static startProcessPlayer(data) {
    return api.post('processPlayer', data)
      .then(getResponseData)
      .catch(escalateError);
  };
};
