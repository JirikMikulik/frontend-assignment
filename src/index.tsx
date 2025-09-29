import {ChakraProvider} from '@chakra-ui/react';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router';
import App from './App';
import {AuthProvider} from './context/AuthProvider';
import GlobalStyles from './GlobalStyles';
import './i18n/i18n';
import theme from './theme';
import WebVitals from './WebVitals';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(MOUNT_NODE);
root.render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
        <GlobalStyles />
        <WebVitals showStatusInConsoleLog />
      </HelmetProvider>
    </ChakraProvider>
  </StrictMode>
);
