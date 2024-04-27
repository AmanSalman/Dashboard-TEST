import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSSFiles/general.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import '../CSSFiles/order.css';
import Delete from '../../assets/decline.png';
import Update from '../../assets/pen.png'
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

function Books() {
  // const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
 
  const fetchBooks = async () => {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/book/allbooks`);
        console.log(data);
        return data.books;
        // setBooks(response.data.books);
      } catch (error) {
        console.log(error);
      }
    };

    const {data,isLoading} = useQuery("books", fetchBooks);
  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  if (isLoading){
    return <Loader/>;
  }
  // const DeleteBook = async (BookId) =>{
  //   try {
  //     const response = await axios.delete(`${import.meta.env.VITE_API_URL}/book/deletebook/${BookId}`);
  //     if (response.data.message == 'success') {
	// 			toast.success(" Book Deleted successfully");
	// 		} 
  //     // else if (response.data.message == "can't reject the order") {
	// 		// 	toast.warn(response.data.message);
	// 		// }
	// 	} catch (error) {
	// 		setError(error.message);
	// 	}
  // }


  return (
    <div className='cssFix table-container'>
      <h2 className='text-uppercase heading'>Books :</h2>


      {error && <p>Error: {error}</p>}


        <table className="generaltable">
          <thead>
            <tr>
              <th>Category </th>
              <th>Title</th>
              <th>description</th>
              <th>publishingHouse</th>
              <th>Price</th>
              <th >Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((book) => (
              <tr key={book._id}>
                <td>{book.categoryName}</td>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.publishingHouse}</td>
                <td>{book.price}</td>
                <td><Link className='d-flex justify-content-center' to={`/delete/${book._id}`}><img src={Delete} alt='Delete' width={"45px"} /></Link></td>
             <td><Link to='/Update' className='d-flex justify-content-center'><img src={Update} alt='Update' width={"30px"} /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default Books;
