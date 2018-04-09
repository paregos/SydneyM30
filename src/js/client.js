import React from 'react';
import ReactDOM from 'react-dom';

//Components
import BusTable from "../components/BusTable"

const title = 'Sydney M30 Bus tracker';

ReactDOM.render(
  <BusTable />,
  document.getElementById('app')
);

module.hot.accept();