import React, { useContext, useState } from 'react';
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
  const {user} = useContext(UserContext);
  const fetchUsers = async () => {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/users`,{headers:{Authorization: `${user}`}} );
        console.log(data.users );

        return data.users;
      } catch (error) {
        console.log(error);
      }
    };

    const {data,isLoading} = useQuery("users", fetchUsers);

  if (isLoading){
    return <Loader/>;
  }

    return (
        <div className='cssFix table-container '>
            <h2 className='text-uppercase heading text-dark'>Users :</h2>

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
                                 data?.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td> 
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


                    
                    </>
                )
            }
        </div>
    );

 

}

export default User;