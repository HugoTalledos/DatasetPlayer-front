import React from 'react';
import FormInfo from './FormInfo/FormInfo';
import FormConfig from './FormConfig/FormConfig';
import FormMode from './FormMode/FormMode';
import './Form.css';

const Form = () => {
  return(<div className={'main-container__form'}>
    <FormInfo />
    <FormConfig />
    <FormMode />
  </div>)
};

export default Form;