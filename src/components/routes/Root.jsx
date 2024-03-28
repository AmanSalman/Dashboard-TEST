import React from 'react'
import Sidebar from '../sidebar/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <div className='d-flex fixWrapSmall'>
    <Sidebar/>
    <Outlet/>
    </div>
  )
}

export default Root