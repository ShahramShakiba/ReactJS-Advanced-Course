import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* API & REST API
* - API: stands for "Application Programming Interface"

* - REST API:
  - is a web server that exposes certain pre-defined routes to which HTTP requests can be sent.


* Frontend | React:
  - you build a "client-side" web application (it runs in the browser)

* HTTP Request:
  - you communicate with a backend(API) via HTTP Requests

* Backend | REST API:
  - a web server that exposes certain "endpoints"(URLs) to which you can send requests & data(to receive data back)


! you should never try to connect to a database directly from inside your React code (credentials would be exposed)
*/
