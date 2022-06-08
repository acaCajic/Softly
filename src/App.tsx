import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainWrapper from './components/MainWrapper/MainWrapper.component';
import GeneralProvider from './Providers/GeneralProvider';
import Routes from './router/Routes';
import routes from './router/routes';

function App() {
  return (
    <BrowserRouter>
      <GeneralProvider>
        <MainWrapper>
          <Routes routes={routes} />
          <ToastContainer />
        </MainWrapper>
      </GeneralProvider>
    </BrowserRouter>
  );
}

export default App;
