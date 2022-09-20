import React from 'react'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration:2000
});

const LandingPage = () => {
  return (
    <div className="row landing justify-content-center">
        <div className="col-md-9 my-auto text-center">
            <h2 data-aos="zoom-in" style={{color:"white",fontSize:"130px"}}>Oyo Rooms</h2>
            <h4 data-aos="zoom-out" style={{color:"white"}}>There is only one boss, it is the guest !!!</h4>
            <Link to="/home"><button className='btn btn-primary' style={{marginTop:"10px"}}>Get Started</button></Link>
            
        </div>
    </div>
  )
}

export default LandingPage