import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const Home = () => {
  return (
    <div>
      <Navbar/>
    <img src="banner.jpg" className="img-fluid rounded" alt="Event" style={{ width: '100%', height: '20%' }} />

      <Footer/>
    </div>
  )
}

export default Home
