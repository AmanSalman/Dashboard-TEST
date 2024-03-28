import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  // <QueryClientProvider client={queryClient}>
  // <BrowserRouter>
  //   < ToastContainer/>
  //   <App />
  // </BrowserRouter>
  // </QueryClientProvider>
  <QueryClientProvider client={queryClient}>
  <ToastContainer/>
  <App/>
  </QueryClientProvider>
)
