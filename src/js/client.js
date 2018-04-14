import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Components
import BusTable from "../components/BusTable"


const title = 'Sydney M30 Bus tracker';

const App = () => (
  <MuiThemeProvider>
    <BusTable />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();