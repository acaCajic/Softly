import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GeneralProvider from './Providers/GeneralProvider';
import Routes from './router/Routes';
import routes from './router/routes';

function App() {
  return (
    <BrowserRouter>
      <GeneralProvider>
        <Routes routes={routes} />
      </GeneralProvider>
    </BrowserRouter>
  );
}

export default App;
