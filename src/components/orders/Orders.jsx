// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import '../CSSFiles/general.css';
// import '../CSSFiles/order.css'
// import {Link} from 'react-router-dom';
// import Loader from '../Loader/Loader.jsx';
// import Accept from '../../assets/accept (2).png';
// import Reject from '../../assets/decline.png';
// import {toast} from 'react-toastify';

// function Orders() {
// 	const [orders, setOrders] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);


// 	const fetchOrders = async () => {
// 		try {
// 			const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/getAllOrders`, {
// 				headers: {
// 					Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWViNDMzZmRiODBjYmJiZDdhZDY2NDciLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMDI4NDgxNSwiZXhwIjoxNzEwMjg4NDE1fQ.4E-_7k48EznQMnno9DWoJu1u-mobRSgDVETu8JTx8SQ`
// 				}
// 			});
// 			console.log(response.data)
// 			setOrders(response.data.orders);
// 			setLoading(false); 
// 		} catch (error) {
// 			setError(error.message);
// 			setLoading(false);
// 		}
// 	};


// 	const AcceptOrder = async (orderId) => {
// 		try {
// 			console.log(orderId)
// 			setLoading(true);
// 			const response = await axios.put(`${import.meta.env.VITE_API_URL}/order/AcceptOrder/${orderId}`);
// 			console.log(response.data.message)
// 			if (response.data.message == 'success') {
// 				toast.success("Accepted successfully");
// 				setLoading(false);
// 			} else if (response.data.message == "can't accept the order") {
// 				toast.warn(response.data.message);
// 			}
// 			setLoading(false);
// 		} catch (error) {
// 			setError(error.message);
// 			setLoading(false);
// 		}
// 	}

// 	const RejectOrder = async (orderId) => {
// 		try {
// 			console.log(orderId)
// 			setLoading(true);
// 			const response = await axios.put(`${import.meta.env.VITE_API_URL}/order/rejectOrder/${orderId}`);
// 			console.log(response.data.message)
// 			if (response.data.message == 'success') {
// 				toast.success("Rejected successfully");
// 				setLoading(false);
// 			} else if (response.data.message == "can't reject the order") {
// 				toast.warn(response.data.message);
// 			}
// 			setLoading(false);
// 		} catch (error) {
// 			setError(error.message);
// 			setLoading(false);
// 		}
// 	}


// 	useEffect(() => {
// 		fetchOrders();
// 	}, []);

// 	if (loading){
//     return <Loader/>;
//   }

// 	return (
// 		<div className='cssFix'>
// 			<h2 className='text-uppercase heading text-dark'>Orders :</h2>

// 			{
// 			loading && <Loader/>
// 		}

// 			{
// 			error && <p>Error: {error}</p>
// 		}

// 			{
// 			!loading && !error && (
// 				<table className='generaltable'>
// 					<thead>
// 						<tr>
// 							<th>ID</th>
// 							<th>Location</th>
// 							<th>Total Price</th>
// 							<th>Status</th>
// 							<th>Accept</th>
// 							<th>Reject</th>
// 							{/* Add more table headers based on your data structure */} </tr>
// 					</thead>
// 					<tbody> {
// 						orders.map((order) => (
// 							<tr key={
// 								order._id
// 							}>
// 								<td>{
// 									order._id
// 								}</td>
// 								<td>{
// 									order.location
// 								}</td>
// 								<td>{
// 									order.totalPrice
// 								}</td>
// 								<td style={
// 									{
// 										color: order.status === 'Pending' ? 'orange' : order.status === 'Accepted' ? 'green' : order.status === 'Rejected' ? 'red' : 'inherit',
// 										fontWeight: '600'
// 									}
// 								}>
// 									{
// 									order.status
// 								}</td>
// 								<td>
// 									<Link className='d-flex justify-content-center'
// 										onClick={
// 											() => AcceptOrder(order._id)
// 									}><img src={Accept}
// 											alt='Accept'
// 											width={"32px"}/></Link>
// 								</td>
// 								<td>
// 									<Link className='d-flex justify-content-center'
// 										onClick={
// 											() => RejectOrder(order._id)
// 									}><img src={Reject}
// 											alt='Reject'
// 											width={"45px"}/></Link>
// 								</td>
// 								{/* Add more table cells based on your data structure */} </tr>

// 						))
// 					} </tbody>
// 				</table>
// 			)
// 		} </div>
// 	);
// }

// export default Orders;
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../CSSFiles/general.css';
import '../CSSFiles/order.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import Accept from '../../assets/accept (2).png';
import Reject from '../../assets/decline.png';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { UserContext } from '../context/User.jsx';
import { OrderContext } from '../context/OrderContext.jsx';

function Orders() {
    //const [orders, setOrders] = useState([]);
    const {orders,error, setError} = useContext(OrderContext);
    const [isLoading, setIsLoading]= useState(false)
    const {user} = useContext(UserContext);

    if (!orders.length) {
        return <Loader />; // Display loader if orders are being fetched
      }
    return (
        <div className='cssFix table-container' style={{background: 'white',
            borderRadius: '18px'}} >
            <h2 className='text-uppercase heading'>Orders :</h2>

            {
                error && <p>Error: {error}</p>
            }

            {
                !isLoading && !error && (
                    <>
                        <h3 className='secondary-heading'>Pending Orders :</h3>
                        <table className='generaltable'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Location</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Accept</th>
									<th>Reject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.filter(order => order.status === 'Pending').map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.location}</td>
                                            <td>{order.totalPrice}</td>
                                            <td style={{ color: 'orange', fontWeight: '600' }}>{order.status}</td>
                                            <td>
                                                <Link className='d-flex justify-content-center' to={`/acceptOrder/${order._id}`}>
                                                    <img src={Accept} alt='Accept' width={"32px"} />
                                                </Link></td>
												<td>

                                                <Link className='d-flex justify-content-center' to={`/rejectOrder/${order._id}`}>
                                                    <img src={Reject} alt='Reject' width={"45px"} />
                                                </Link>
												</td>
                                            
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <h3 className='secondary-heading '>Accepted Orders :</h3>
                        <table className='generaltable'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Location</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.filter(order => order.status === 'Accepted').map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.location}</td>
                                            <td>{order.totalPrice}</td>
                                            <td style={{ color: 'green', fontWeight: '600' }}>{order.status}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <h3 className='secondary-heading'>Rejected Orders :</h3>
                        <table className='generaltable'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Location</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.filter(order => order.status === 'Rejected').map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.location}</td>
                                            <td>{order.totalPrice}</td>
                                            <td style={{ color: 'red', fontWeight: '600' }}>{order.status}</td>
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

export default Orders;
