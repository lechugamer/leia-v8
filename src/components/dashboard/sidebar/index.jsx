import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5"
import { IconContext } from "react-icons";
import "./sidebar.css";

const Sidebar = () => {
  const [inactive, setInactive] = useState(false);

  return (
    <IconContext.Provider value={{ size: "30px" }}>
      <div className={`sidebar ${inactive ? 'inactive' : ''}`}>
        <div onClick={() => setInactive(!inactive)} className='arrow__close'>
        <i>
          <FaChevronLeft />
        </i>
        </div>
        <Link to="/Dashboard" className="sidebar__link">
          <i className='menu__icons'>
          <FaHome />
          </i>
          <h3 >Inicio</h3>
        </Link>
        <Link to="/Users" className="sidebar__link">
        <i className='menu__icons'>
          <FaUsers />
        </i>
          <h3>Usuarios</h3>
        </Link>
        <Link to="/Entries" className="sidebar__link">
        <i className='menu__icons'>
          <IoDocumentText />
        </i>
          <h3>Entradas</h3>
        </Link>
        <Link to="" className="sidebar__link">
        <i className='menu__icons'>
          <FaUsers />
        </i>
          <h3>Vacio</h3>
        </Link>
        <Link to="" className="sidebar__link">
        <i className='menu__icons'>
          <FaUsers />
        </i>
          <h3>Vacio</h3>
        </Link>
        <Link to="" className="sidebar__link">
        <i className='menu__icons'>
          <FaUsers />
        </i>
          <h3>Vacio</h3>
        </Link>
      </div>
    </IconContext.Provider>
  );
};

export default Sidebar;
