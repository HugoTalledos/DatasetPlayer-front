import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import modalMessagecontext from '../context/modal-context';

const reducer = (data, action) => {
  if (action && action.text && action.text.length > 0) {
    console.log(action)
    return {
      ...data,
      show: true,
      text: action.text,
      title: action.title,
    };
  }
  return { ...data, show: false, isAction: action.isAction, };
};

const ModalMessageDataHolder = ({ children }) => {
  const [data, dispatchData] = useReducer(reducer, { show: false, text: '', title: '', isAction: false });
  return (
    <modalMessagecontext.Provider value={{ data, dispatchData }}>
      {children}
    </modalMessagecontext.Provider>
  );
};
ModalMessageDataHolder.propTypes = { children: PropTypes.node };
export default ModalMessageDataHolder;
