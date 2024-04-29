import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import UserContextProvider from './components/context/User.jsx'
import OrderContextProvider from './components/context/OrderContext'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  // <QueryClientProvider client={queryClient}>
  // <BrowserRouter>
  //   < ToastContainer/>
  //   <App />
  // </BrowserRouter>
  // </QueryClientProvider>
  <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <OrderContextProvider>
           <App/>
          </OrderContextProvider>
        </UserContextProvider>
  <ToastContainer/>
  </QueryClientProvider>
)
