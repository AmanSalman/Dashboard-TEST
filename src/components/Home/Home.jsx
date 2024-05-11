import './Home.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext, useEffect, useState} from 'react';
import {OrderContext} from '../context/OrderContext.jsx'
import Loader from '../Loader/Loader.jsx';
import StatsCard from '../shared/StatsCard.jsx';
import { UserContext } from '../context/User.jsx';
function Home() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [orders, setOrders] = useState([]);
	const [pendingCount, setPendingCount] = useState(0);
	const [RejectedCount, setRejectedCount] = useState(0);
	const [AcceptedCount, setAcceptedCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);


	const [error, setError] = useState(null);

	const {user} = useContext(UserContext);
	const fetchOrders = async () => {
		try {
			const {data} = await axios.get(`${
				import.meta.env.VITE_API_URL
			}/order/getAllOrders`, {
				headers: {
					Authorization: `${user}`
				}
			});
			setOrders(data.orders);

			// Count orders based on status
			const pending = data.orders.filter(order => order.status === 'Pending').length;
			const rejected = data.orders.filter(order => order.status === 'Rejected').length;
			const accepted = data.orders.filter(order => order.status === 'Accepted').length;

			setPendingCount(pending);
			setRejectedCount(rejected);
			setAcceptedCount(accepted);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false)
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchOrders();
	}, [user, orders]); // Fetch orders whenever user or orders change
		if (isLoading) {
			return <Loader/>
		}
  const data = {
    labels: ['Accepted Orders', 'Rejected Orders'],
    datasets: [
      {
        label: '# of Orders',
        data: [AcceptedCount || 0, RejectedCount || 0],
        backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1.5,
      },
    ],
  };


  return (
    <div className="position-relative cssFix homeBackground h-100">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{display:'flex', gap:'2em',marginBottom:'1em' }}>
        <div>
        <StatsCard title="Today's Users" number={2300} change="3% than last month" />
        </div>
        <div>
      <StatsCard title="Active Sessions" number={150} />
      </div> 
      <div>
      <StatsCard title="Active Sessions" number={150} />
      </div>
      <div>
      <StatsCard title="Active Sessions" number={150} />
      </div>    
        </div>
      </div>
        <div style={{ width: 'fit-content', borderRadius: 10, padding: 10, background: 'white' }}>
          <Doughnut data={data} />
        </div>
    </div>
  );
}

export default Home;
