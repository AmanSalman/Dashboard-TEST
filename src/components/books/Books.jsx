import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSSFiles/general.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import '../CSSFiles/order.css';
import Delete from '../../assets/decline.png';
import Update from '../../assets/pen.png'
import { toast } from 'react-toastify';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/book/allbooks`);
        console.log(response.data);
        setBooks(response.data.books);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const DeleteBook = async (BookId) =>{
    try {
      setLoading(true);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/book/deletebook/${BookId}`);
      if (response.data.message == 'success') {
				toast.success(" Book Deleted successfully");
				setLoading(false);
			} 
      // else if (response.data.message == "can't reject the order") {
			// 	toast.warn(response.data.message);
			// }
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
  }

  if (loading){
    return <Loader/>;
  }


  return (
    <div className='cssFix'>
      <h2 className='text-uppercase heading text-dark'>Books :</h2>

      {loading && <Loader />}

      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <table className="generaltable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>description</th>
              <th>publishingHouse</th>
              <th>Price</th>
              <th >Delete</th>
              <th>Update</th>
              {/* Add more table headers based on your book data structure */}
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.publishingHouse}</td>
                <td>{book.price}</td>
                <td><Link className='d-flex justify-content-center' onClick={()=>DeleteBook(book._id)}><img src={Delete} alt='Delete' width={"45px"} /></Link></td>
             <td><Link to='/Update' className='d-flex justify-content-center'><img src={Update} alt='Update' width={"30px"} /></Link></td>
                {/* Add more table cells based on your book data structure */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Books;
