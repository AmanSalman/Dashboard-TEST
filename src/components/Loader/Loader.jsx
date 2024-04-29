import React from 'react'
import './Loader.css'
import './Loader.sass'
function Loader() {
  return (
    // <div className="d-flex justify-content-center align-items-center flex-grow-1">

    //   <div className="lds-dual-ring"></div>
    // </div>
    <div className='cssFix d-flex align-items-center justify-content-center flex-grow-1' style={{marginTop:'5em'}}>

      {/* <div className="dot-spin " style={{background:'#9880ff'}}></div>  */}
      <span className="loader"></span>
    </div>
  //   <div className="loader-overlay">
  //   <div className="loader-container">
  //     <div className="dot-spin"></div>
  //   </div>
  // </div>
      
      )
}




export default Loader