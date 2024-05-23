import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { QueryClient,QueryClientProvider } from 'react-query';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CounterContextBrovider from './Context/Counter';
import TokenContextBrovider from './Context/TokenContext';
import './index.css';
import CartContextBrovider from './Context/CartContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
let query=new QueryClient()
root.render(
  <CartContextBrovider>
  <QueryClientProvider client={query}>
    <CounterContextBrovider>
      <TokenContextBrovider>
       <App />
      </TokenContextBrovider>
    </CounterContextBrovider>
    </QueryClientProvider>
    </CartContextBrovider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
