// import React, {useState} from 'react';
// import commonStyles from './commonStyles.js';
// import '../CSSFiles/general.css'
// import { useFormik } from 'formik';
// const AddBook = () => {
// const [isbn, setISBN] = useState('');
// const [title, setTitle] = useState('');
// const [price, setPrice] = useState('');
// const [description, setDescription] = useState('');
// const [publishingHouse, setPublishingHouse] = useState('');


//     const initialValues = {
//         isbn: '',
//           title: '',
//           price: '',
//           description:'',
//           publishingHouse:''
//     };
//     const onSubmit = async (book) =>{
//         console.log(book)
//         try {

//         } catch (error) {

//         }
//     }
//     const formik = useFormik({
//         initialValues,
//         onSubmit
//       });


// const handleAddBook = (e) => {
// e.preventDefault();
// if (!isbn.trim() || !title.trim() || !price.trim() || !description.trim() || !publishingHouse.trim()) {
// alert('Please fill in all fields');
// return;
// }
// alert(`Book "${title}" added successfully`);
// // Clear input fields after adding book
// setISBN('');
// setTitle('');
// setPrice('');
// setDescription('');
// setPublishingHouse('');
// };

// return (

// <div className='cssFix w-100'>

// <h2 className='text-uppercase heading text-dark'>ADD Book :</h2>


// <form onSubmit={formik.handleSubmit}
// style={
// styles.container
// }
// >
// <input type="text"
// value={formik.values.isbn}
// onChange={formik.handleChange}
// placeholder="ISBN"
// style={
// styles.input
// }
//                     id="isbn" name="isbn"/>
// <input type="text"
// value={formik.values.title}
// onChange={formik.handleChange}
// placeholder="Title"
// style={
// styles.input
// }
//                     id="title" name="title"
//                     />
// <input type="text"
// value={formik.values.price}
// onChange={formik.handleChange}
// placeholder="Price"
// style={
// styles.input
// }
//                     id="price" name="price"/>
// <input type="text"
// value={formik.values.publishingHouse}
// onChange={formik.handleChange}
// placeholder="Publishing House"
// style={
// styles.input
// }
//                     id="PublishingHouse" name="PublishingHouse"/>
// <textarea value={formik.values.description}
// onChange={formik.handleChange}
// placeholder="Description"
// style={
// {
// ...styles.input,
// ...styles.textarea
// }
// }
//                     id="Description" name="Description"
// // merge styles for textarea
// />
// <button type="submit"
// style={
// styles.button
// }>Add Book</button>
// </form>
// </div>
// );
// };

// const styles = {
// ...commonStyles,
// textarea: {
// height: 120, // adjust the height of the textarea
// resize: 'vertical', // allow vertical resizing
// paddingTop: '10px',
// borderRadius: 10
// }

// };

// export default AddBook;
import React, {useState} from 'react';
import commonStyles from '../books/commonStyles.js';
import '../CSSFiles/general.css';
import './Register.css';
import {useFormik} from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import Dashboard from '../Dashboard/Dashboard.jsx';

const Register = ({ onRegistrationSuccess }) => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const initialValues = {
		name: '',
		phone: '',
		email: '',
		password: '',
		role: 'admin'
	};

	const onSubmit = async (admin, {resetForm}) => {
		console.log(admin)
		try {
			setLoading(true);
			const {data} = await axios.post(`${
				import.meta.env.VITE_API_URL
			}/auth/register`, admin);
			console.log(data);
			if (data.message == 'success') {
				toast.success("registered successfully");
                onRegistrationSuccess();
				navigate('/Dashboard');
				resetForm();
				setLoading(false);
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error);
		}
	};

	const formik = useFormik({initialValues, onSubmit});

	return (
		<div className='d-flex flex-column flex-grow-1 align-items-center'>
			{
			loading ? (
				<Loader/>) : <>

					<div className='d-flex flex-column justify-content-center align-items-center'>

						<img src={Logo}
							alt='logo'
							className=' img-fluid'
							style={
								{
									borderRadius: '50%',
									width: '35%',
									border: 'solid 1px rgb(156, 131, 131)',
									margin: '1em'
								}
							}/>
						<h2 className='HeadingRegister'>Register</h2>
					</div>

					{/* <h2 className='text-uppercase heading text-dark'>Register :</h2> */}
                    <div className='formFix'>
                       <form onSubmit={
							formik.handleSubmit
						}
						style={
							styles.container
						}
						>
						<input type="text"
							value={
								formik.values.name
							}
							onChange={
								formik.handleChange
							}
							placeholder="name"
							style={
								styles.input
							}
							id="name"
							name="name"/>
						<input type="tel"
							value={
								formik.values.phone
							}
							onChange={
								formik.handleChange
							}
							placeholder="phone"
							style={
								styles.input
							}
							id="phone"
							name="phone"/>
						<input type="email"
							value={
								formik.values.email
							}
							onChange={
								formik.handleChange
							}
							placeholder="email"
							style={
								styles.input
							}
							id="email"
							name="email"/>
						<input type="password"
							value={
								formik.values.publishingHouse
							}
							onChange={
								formik.handleChange
							}
							placeholder="password"
							style={
								styles.input
							}
							id="password"
							name="password"/>
						<button type="submit"
							style={
								styles.button
						}>Register</button>
					</form> 
                    </div>
					
				</>
		} </div>
	);
};

const styles = {
	...commonStyles,
	textarea: {
		height: 120,
		resize: 'vertical',
		paddingTop: '10px',
		borderRadius: 10
	}
};

export default Register;
