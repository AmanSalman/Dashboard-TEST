import './Home.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext} from 'react';
import {OrderContext} from '../context/OrderContext.jsx'
import Loader from '../Loader/Loader.jsx';
import StatsCard from '../shared/StatsCard.jsx';
function Home() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const {AcceptedCount,RejectedCount,orders} = useContext(OrderContext)
  if(!orders.length){
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
