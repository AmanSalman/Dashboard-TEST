import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader.jsx';
import axios from 'axios';

function RejectOrder() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {orderId} = useParams();

    const RejectOrder = async () => {
        try {
            console.log(orderId)
            setLoading(true);
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/order/rejectOrder/${orderId}`);
            console.log(response.data.message)
            if (response.data.message == 'success') {
                toast.success("Rejected successfully");
            } else if (response.data.message == "can't reject the order") {
                toast.warn(response.data.message);
            }
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        navigate('/orders')
    }

    useEffect(() => {
        RejectOrder();
      }, []); 

    if (loading) {
        return <Loader />;
      }

  return <></>

}

export default RejectOrder