import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/app-context';

const reducer = (data, action) => {
  if (action) {
    return {
      ...data,
      player: action.player,
    };
  }
  return { ...data };
};

const AppInformation = ({ children }) => {
  const [data, dispatchData] = React.useReducer(reducer, {
    player: {
      age: 0,
      clear: false,
      columns: '',
      decimalSeparator: '.',
      documentNumber: '',
      efectivity: 0,
      experience: 0,
      graph: false,
      listFiles: [],
      metric: '',
      name: '',
      picture: [],
      rootFinish: '',
      separator: ',',
      sex: '',
      temp: false,
      unity: '',
      weight: 0,
    }
  });
  return (
    <AppContext.Provider value={{ data, dispatchData }}>
      {children}
    </AppContext.Provider>
  );
};

AppInformation.propTypes = { children: PropTypes.node };
export default AppInformation;
