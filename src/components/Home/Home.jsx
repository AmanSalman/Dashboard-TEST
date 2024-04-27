import axios from 'axios';
import './Home.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/User.jsx';
import { useQuery } from 'react-query';

function Home() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [error, setError] = useState(null);
  const {user} = useContext(UserContext);

  const { data: acceptedData, isLoading: acceptedLoading, error: acceptedError } = useQuery("Accepted", async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order/acceptedOrders`, { headers: { Authorization: `${user}` } });
      return data.AcceptedOrders;
    } catch (error) {
      setError(error);
    }
  });

  const { data: rejectedData, isLoading: rejectedLoading, error: rejectedError } = useQuery("Rejected", async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order/RejectedOrders`, { headers: { Authorization: `${user}` } });
      return data.RejectedOrders;
    } catch (error) {
      setError(error);
    }
  });

  const data = {
    labels: ['Accepted Orders', 'Rejected Orders'],
    datasets: [
      {
        label: '# of Votes',
        data: [acceptedData || 0, rejectedData || 0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)', // Green for accepted orders
          'rgba(255, 99, 132, 0.7)', // Red for rejected orders
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', // Darker green
          'rgba(255, 99, 132, 1)', // Darker red
        ],
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <div className="position-relative cssFix homeBackground h-100">
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ width: 'fit-content', borderRadius: 10, padding: 10, background: 'white' }}>
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
}

export default Home;
