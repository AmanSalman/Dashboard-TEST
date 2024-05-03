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
import UpdateBook from './UpdateBook.jsx';

function Books() {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const fetchBooks = async () => {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/book/allbooks`);
        setBooks(data.books);
        console.log(data.books)
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false)
      }
    };

     //pagination
     const [currentPage, setCurrentPage] = useState(1);
     const recordsPerPage = 6;
     const LastIndex = currentPage * recordsPerPage;
     const firstIndex = LastIndex - recordsPerPage;
     const records = books.slice(firstIndex, LastIndex);
    const npage = Math.ceil(books.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);



 
  useEffect(() => {
    fetchBooks();
  }, []);

  if (isLoading){
    return <Loader/>;
  }
  // const DeleteBook = async (BookId) =>{
  //   try {
  //     const response = await axios.delete(`${import.meta.env.VITE_API_URL}/book/deletebook/${BookId}`);
  //     if (response.data.message == 'success')import Books from './Books';
 
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
    <div className='cssFix table-container' style={{background: 'white',
    borderRadius: '18px'}}>
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
            {records?.map((book) => (
              <tr key={book._id}>
                <td>{book.categoryName}</td>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.publishingHouse}</td>
                <td>{book.price}</td>
                <td><Link className='d-flex justify-content-center' to={`/delete/${book._id}`}><img src={Delete} alt='Delete' width={"45px"} /></Link></td>
             <td><Link to={`/Update/${book._id} `} onClick={()=>UpdateBook(book)} className='d-flex justify-content-center'><img src={Update} alt='Update' width={"30px"} /></Link></td>
              </tr>
            ))}
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

export default Books;
