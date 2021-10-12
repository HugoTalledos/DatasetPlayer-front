import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/app-context';

const reducer = (data, action) => {
  if (action) {
    return {
      ...data,
      name: action.name,
      age: action.age,
      weight: action.weight,
      sex: action.sex,
      experience: action.experience,
      efectivity: action.efectivity,
      root: action.root,
      finishRoot: action.finishRoot,
      separator: action.separator,
      decimalSeparator: action.decimalSeparator,
      metric: action.metric,
      unity: action.unity,
      columns: action.columns,
      clear: action.clear,
      graph: action.graph,
      delTemp: action.delTemp,
      players: [],
    };
  }
  return { ...data };
};

const AppInformation = ({ children }) => {
  const [data, dispatchData] = React.useReducer(reducer, {
    name: '',
    age: 0,
    weight: 0,
    sex: '',
    experience: 0,
    efectivity: 0,
    root: '',
    finishRoot: '',
    separator: '',
    decimalSeparator: '',
    metric: '',
    unity: '',
    columns: '',
    clear: false,
    graph: false,
    delTemp: false,
    players: [],
  });
  return (
    <AppContext.Provider value={{ data, dispatchData }}>
      {children}
    </AppContext.Provider>
  );
};

AppInformation.propTypes = { children: PropTypes.node };
export default AppInformation;
