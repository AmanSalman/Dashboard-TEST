import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/Logo.png'
import '../CSSFiles/SideBar.css'
import '../../App.css';
const Sidebar = () => {
	return (
		<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
			<div className="sidebarFlex align-items-sm-start px-3 pt-2 text-white min-vh-100">
				<Link to="/" className="d-flex align-items-center pb-3 gap-2 mb-md-0 me-md-auto text-white text-decoration-none LogoDropdown">
					<img src={Logo}
						alt='logo'
						className=' img-fluid'
						style={
							{
								borderRadius: '50%',
								width: '50%'
							}
						}/>

					<div className="dropdown">
						<a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
							{/* <img src='' alt="hugenerd"
									width={30}
									height={30}
									className="rounded-circle"/> */}
							<span className="d-none d-sm-inline mx-1">User</span>
						</a>
						<ul className="dropdown-menu dropdown-menu-dark text-small shadow">
							<li>
								<a className="dropdown-item" href="#">Profile</a>
							</li>
							<li>
								<hr className="dropdown-divider"/>
							</li>
							<li>
								<Link className="dropdown-item" to='/register'>Register</Link>
							</li>
						</ul>
					</div>
				</Link>


				<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start align-items-sm-start" id="menu">
					<li className="nav-item">
						<Link to="/orders" className="nav-link px-0 align-middle text-decoration-none">
							<i className="fs-4 bi-table"/>
							<span className="ms-1 d-sm-inline items-styling">Manage Orders</span>
						</Link>
					</li>

					<li className="nav-item">
						<a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
							<i className="fs-4 bi-grid"/>
							<span className="ms-1 d-sm-inline items-styling">Manage Books</span>
						</a>
						<ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
							<li>
								<Link to="/books" className="nav-link px-0">
									<span className="d-sm-inline dropDownStyling">
										Books</span>
								</Link>
							</li>
							<li>
								<Link to="/addbook" className="nav-link px-0">
									<span className="d-sm-inline dropDownStyling">Add Books</span>
								</Link>
							</li>
						</ul>
					</li>


					{/* Add more menu items as needed */} </ul>


			</div>


		</div>
	);
};

export default Sidebar;
