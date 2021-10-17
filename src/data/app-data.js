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
      documentNumber: '',
      name: '',
      age: 0,
      weight: 0,
      sex: '',
      experience: 0,
      efectivity: 0,
      listFiles: [],
      rootFinish: '',
      separator: ',',
      decimalSeparator: '.',
      metric: '',
      unity: '',
      columns: '',
      clear: false,
      graph: false,
      temp: false,
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
