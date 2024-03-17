import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Orders from './components/orders/Orders.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import './App.css';
import Books from './components/books/Books.jsx';
import DeleteBook from './components/books/DeleteBook.jsx';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
import Home from './components/Home/Home.jsx'
import AddBook from './components/books/AddBook.jsx';
export default function App() {
  return (
   <div className='d-flex '>
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/add' element={<AddBook/>} />
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/books' element={<Books/>}/>
      <Route path='/delete' element={<DeleteBook/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
   </div>
  )
}
 


// import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Orders from './components/orders/Orders.jsx';
// import Sidebar from './components/sidebar/Sidebar.jsx';
// import './App.css';
// import Books from './components/books/Books.jsx';
// import DeleteBook from './components/books/DeleteBook.jsx';
// import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
// import Home from './components/Home/Home.jsx';
// import SignUpForm from './components/SignUpForm/SignInForm.jsx';

// export default function App() {
//   const [isRegistered, setIsRegistered] = useState(false);

//   return (
//     <div className='d-flex '>
//       {isRegistered ? (
//         <Sidebar />
//       ) : (
//         <SignUpForm onRegister={() => setIsRegistered(true)} />
//       )}
//       <Routes>
//         {isRegistered && <Route path='/' element={<Home />} />}
//         <Route path='/orders' element={<Orders />} />
//         <Route path='/books' element={<Books />} />
//         <Route path='/delete' element={<DeleteBook />} />
//         {/* <Route path='*' element={<PageNotFound />} /> */}
//       </Routes>
//     </div>
//   );
// }
