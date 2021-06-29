import "./navbar.css";
import Logo from '../../../assets/logo.png';
import avatar from "../../../assets/avatar.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className='navbar__logo'>
        <img src={ Logo } alt='logo' width='80'/>
        <h4>
          Dev-School
        </h4>
      </div>
      <div className="nav_icon" >
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <a href="#!">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
