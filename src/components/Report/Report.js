import React from 'react';
import PlayerList from '../PlayerList/PlayerList';
import Graphics from '../Graphics/Graphics';
import ReportContext from '../../data/report-data';

const Report = () => {
  return (<div className={'main-container'}>
    <ReportContext>
      <PlayerList/>
      <Graphics/>
    </ReportContext>
  </div>)
};

export default Report;