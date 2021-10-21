import React from 'react';
import PropTypes from 'prop-types';
import ReportContext from '../context/report-context';

const reducer = (data, action) => {
  if (action) {
    return {
      ...data,
      playerId: action.playerId,
    };
  }
  return { ...data };
};

const ReportInformation = ({ children }) => {
  const [data, dispatchData] = React.useReducer(reducer, { playerId: '' });
  return (
    <ReportContext.Provider value={{ data, dispatchData }}>
      {children}
    </ReportContext.Provider>
  );
};

ReportInformation.propTypes = { children: PropTypes.node };
export default ReportInformation;
