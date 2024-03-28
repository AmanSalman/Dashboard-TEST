import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

function DeleteBook() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Rename Navigate to navigate
  
  const deleteBook = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/book/deletebook/${id}`);
      if (response.data.message === 'success') {
        toast.success("Book Deleted successfully");
      } else if (response.data.message === "can't reject the order") {
        toast.warn(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    navigate('/books');
  };

  useEffect(() => {
    deleteBook();
  }, []); 

  if (loading) {
    return <Loader />;
  }

  // Add your JSX content here if needed

  return <></>; // Ensure you return JSX content
}

export default DeleteBook;
