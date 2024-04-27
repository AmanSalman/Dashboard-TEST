import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import '../CSSFiles/SideBar.css';
import '../../App.css';
import { UserContext } from '../context/User.jsx';
import { FaTruck, FaUsers } from "react-icons/fa";
import { PiBooks } from "react-icons/pi";
import { BiCategory } from 'react-icons/bi';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const Sidebar = () => {
    const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);
    const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
    let { user, setUser, userData, setUserData } = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem("userToken");
        setUser(null);
        setUserData(null);
        navigate('/login');
    }

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 " style={{ background: '#2b3447' }}>
            <div className="sidebarFlex align-items-sm-start px-2 pt-2 text-white min-vh-100 ">
                <Link to="/" className="d-flex align-items-center pb-3 gap-2 mb-md-0 me-md-auto text-white text-decoration-none LogoDropdown">
                    <img src={Logo}
                        alt='logo'
                        className=' img-fluid'
                        style={
                            {
                                borderRadius: '50%',
                                width: '50%'
                            }
                        } />

                    <div className="dropdown">
                        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="d-none d-sm-inline mx-1">User</span>
                        </a>
                        <ul className="dropdown-menu text-small shadow">
                            <li>
                                <Link className="dropdown-item" to='/profile'>Profile</Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link className="dropdown-item" onClick={logout}>logout</Link>
                            </li>
                        </ul>
                    </div>
                </Link>

                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <NavLink exact to="/orders" className="nav-link  align-middle text-decoration-none" activeClassName="active">
                            <FaTruck color='#c1c4c9' fontSize={'1.3em'} />
                            <span className="ms-2 d-sm-inline items-styling">Manage Orders</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <div>
                            <button className="nav-link align-middle text-decoration-none" type="button"
                                    onClick={() => setBooksDropdownOpen(!booksDropdownOpen)}
                                    aria-expanded={booksDropdownOpen ? "true" : "false"}>
                                <PiBooks color='#c1c4c9' fontSize={'1.3em'} />
                                <span className="ms-2 d-sm-inline items-styling">Manage Books</span>
                                {booksDropdownOpen ? <BsChevronUp color='white' fontSize={'10px'} className='ms-1'  /> : <BsChevronDown color='white' fontSize={'10px'} className='ms-1'  />}
                            </button>
                            <div className={`collapse ${booksDropdownOpen ? 'show' : ''}`} id="booksDropdown">
                                <ul className="nav flex-column ms-1">
                                    <li>
                                        <NavLink to="/books" className="nav-link" activeClassName="active">
                                            <span className="d-sm-inline dropDownStyling">Books</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/addbook" className="nav-link" activeClassName="active">
                                            <span className="d-sm-inline dropDownStyling">Add Books</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div>
                            <button className="nav-link align-middle text-decoration-none" type="button"
                                    onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                                    aria-expanded={categoriesDropdownOpen ? "true" : "false"}>
                                <BiCategory color='#c1c4c9' fontSize={'1.3em'} />
                                <span className="ms-1 d-sm-inline items-styling">Manage Categories</span>
                                {categoriesDropdownOpen ? <BsChevronUp color='white' fontSize={'10px'} className='ms-1' /> : <BsChevronDown color='white' fontSize={'10px'} className='ms-1'  />}
                            </button>
                            <div className={`collapse ${categoriesDropdownOpen ? 'show' : ''}`} id="navDropdown">
                                <ul className="nav flex-column g-1 ms-1">
                                    <li>
                                        <NavLink to="/categories" className="nav-link" activeClassName="active">
                                            <span className="d-sm-inline dropDownStyling">Categories</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/addCategory" className="nav-link" activeClassName="active">
                                            <span className="d-sm-inline dropDownStyling">Add Categories</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/users" className="nav-link  align-middle text-decoration-none" activeClassName="active">
                            <FaUsers color='#c1c4c9' fontSize={'1.3em'} />
                            <span className="ms-2 d-sm-inline items-styling">Manage Users</span>
                        </NavLink>
                    </li>

                    {/* Add more menu items as needed */}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
