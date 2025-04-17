import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    connectionString: process.env.REACT_APP_APPINSIGHTS_CONNECTION_STRING,
    enableAutoRouteTracking: true,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: window.history }
    }
  }
});

appInsights.loadAppInsights();
appInsights.trackPageView(); // manually send page load

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
