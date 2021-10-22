import { api, escalateError, getResponseData } from './index';

export default class DataApi {
  // Login
  static postUser(data) {
    const { email, userInfo, id } = data;
    return api.post('users', {
      email,
      userData: {
        id,
        name: userInfo.name,
        locale: userInfo.locale,
        hd: userInfo.hd,
        picture: userInfo.picture,
      },
    })
      .then(getResponseData)
      .catch(escalateError);
  }
}
