import{Link} from 'react-router-dom'

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Events</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav"> 
        <li classNameName="nav-item">
          <a classNameName="nav-link" href="Login" style={{paddingLeft:'1000px'}} >Login</a>
         </li>
      </ul>
    </div>
  </div>
</nav>
      
        
    )
}
export default Navbar