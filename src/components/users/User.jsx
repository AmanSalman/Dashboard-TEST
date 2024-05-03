import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader.jsx';
import { UserContext } from '../context/User.jsx';
import '../CSSFiles/general.css';
import '../CSSFiles/order.css';
import { Link } from 'react-router-dom';
import Accept from '../../assets/accept (2).png';
import Reject from '../../assets/decline.png';

function User() {
  const [error, setError] = useState(null);
  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useContext(UserContext);
  const fetchUsers = async () => {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/users`,{headers:{Authorization: `${user}`}} );
        setUsers(data.users);
        console.log(data.users)
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      } finally{
        setIsLoading(false)
      }
    };


   //pagination
   const [currentPage, setCurrentPage] = useState(1);
   const recordsPerPage = 6;
   const LastIndex = currentPage * recordsPerPage;
   const firstIndex = LastIndex - recordsPerPage;
   const records = Users.slice(firstIndex, LastIndex);
  const npage = Math.ceil(Users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(()=>{
    fetchUsers();
  },[])

    return (
        <div className='cssFix table-container ' style={{background: 'white',
        borderRadius: '18px'}}>
            <h2 className='text-uppercase heading'>Users :</h2>

            {
                isLoading && <Loader />
            }

            {
                error && <p>Error: {error}</p>
            }

            {
                !isLoading && !error && (
                    <>
                        <table className='generaltable'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Activate</th>
									<th>Disable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                 records?.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{firstIndex + index + 1}</td> 
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td style={{ color: user.status === 'Activated' ? 'green' : 'red' }}>{user.status}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link className='d-flex justify-content-center' to={`/acceptOrder/${user._id}`}>
                                                <img src={Accept} alt='Accept' width={"32px"} />
                                            </Link>
                                        </td>
                                        <td>
                                            <Link className='d-flex justify-content-center' to={`/rejectOrder/${user._id}`}>
                                                <img src={Reject} alt='Reject' width={"45px"} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                                
                                
                                }
                            </tbody>
                        </table>
                        <nav style={{display:'flex', justifyContent:'center' ,alignItems:'center'}}>
                            <ul className='pagination'>
                                <li className='page-item'>
                                    <a href='#' className='page-link' onClick={prePage}> Prev</a>
                                </li>
                                {
                                    numbers.map((n, i) => (
                                        <li className={`'page-item' ${currentPage === n ? 'active page-item bgPrimary' : 'page-item'}`} key={i}>
                                            <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                                        </li>
                                    ))
                                }

                                <li className='page-item'>
                                    <a href='#' className='page-link' onClick={nextPage}> Next</a>
                                </li>
                            </ul>
                        </nav>


                    
                    </>
                )
            }
        </div>
    );
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    
    function changeCPage(id) {
        setCurrentPage(id);
    }
    
    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }
    

 

}

export default User;
