import React from 'react';
import Form from '../Form/Form';
import PreviewList from '../PreviewList/PreviewList';
import AppContext from '../../data/app-data';

const MainScreen = () => {
  return (<div className={'main-container'}>
    <AppContext>
      <Form/>
      <PreviewList/>
    </AppContext>
  </div>)
};

export default MainScreen;