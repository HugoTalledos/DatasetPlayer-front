import React from 'react';
import PlayerList from '../PlayerList/PlayerList';
import Graphics from '../Graphics/Graphics';
import ReportContext from './data/report-data';

const Report = () => {
  return (
    <ReportContext>
      <PlayerList/>
      <Graphics/>
    </ReportContext>
  )
};

export default Report;