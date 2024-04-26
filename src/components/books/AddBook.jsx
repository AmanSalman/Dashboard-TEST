// import React, {useState} from 'react';
// import commonStyles from './commonStyles.js';
// import '../CSSFiles/general.css'
// import { useFormik } from 'formik';
// const AddBook = () => {
// 	const [isbn, setISBN] = useState('');
// 	const [title, setTitle] = useState('');
// 	const [price, setPrice] = useState('');
// 	const [description, setDescription] = useState('');
// 	const [publishingHouse, setPublishingHouse] = useState('');


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


// 	const handleAddBook = (e) => {
// 		e.preventDefault();
// 		if (!isbn.trim() || !title.trim() || !price.trim() || !description.trim() || !publishingHouse.trim()) {
// 			alert('Please fill in all fields');
// 			return;
// 		}
// 		alert(`Book "${title}" added successfully`);
// 		// Clear input fields after adding book
// 		setISBN('');
// 		setTitle('');
// 		setPrice('');
// 		setDescription('');
// 		setPublishingHouse('');
// 	};

// 	return (

// 		<div className='cssFix w-100'>

// 			<h2 className='text-uppercase heading text-dark'>ADD Book :</h2>


// 			<form onSubmit={formik.handleSubmit}
// 				style={
// 					styles.container
// 				}
// 				>
// 				<input type="text"
// 					value={formik.values.isbn}
// 					onChange={formik.handleChange}
// 					placeholder="ISBN"
// 					style={
// 						styles.input
// 					}
//                     id="isbn" name="isbn"/>
// 				<input type="text"
// 					value={formik.values.title}
// 					onChange={formik.handleChange}
// 					placeholder="Title"
// 					style={
// 						styles.input
// 					}
//                     id="title" name="title"
//                     />
// 				<input type="text"
// 					value={formik.values.price}
// 					onChange={formik.handleChange}
// 					placeholder="Price"
// 					style={
// 						styles.input
// 					}
//                     id="price" name="price"/>
// 				<input type="text"
// 					value={formik.values.publishingHouse}
// 					onChange={formik.handleChange}
// 					placeholder="Publishing House"
// 					style={
// 						styles.input
// 					}
//                     id="PublishingHouse" name="PublishingHouse"/>
// 				<textarea value={formik.values.description}
// 					onChange={formik.handleChange}
// 					placeholder="Description"
// 					style={
// 						{
// 							...styles.input,
// 							...styles.textarea
// 						}
// 					}
//                     id="Description" name="Description"
// 					// merge styles for textarea
// 				/>
// 				<button type="submit"
// 					style={
// 						styles.button
// 				}>Add Book</button>
// 			</form>
// 		</div>
// 	);
// };

// const styles = {
// 	...commonStyles,
// 	textarea: {
// 		height: 120, // adjust the height of the textarea
// 		resize: 'vertical', // allow vertical resizing
// 		paddingTop: '10px',
// 		borderRadius: 10
// 	}

// };

// export default AddBook;
import React, { useState } from 'react';
import commonStyles from './commonStyles.js';
import '../CSSFiles/general.css';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';

const AddBook = () => {
    const [loading, setLoading] = useState(false);
    const initialValues = {
        isbn: '',
        title: '',
        price: '',
        description: '',
        publishingHouse: '',
        categoryName:''
    };

    const onSubmit = async (book, { resetForm }) => {
        console.log(book);
        try {
            setLoading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/book/add`, book);
            console.log(data);
            if (data.message == 'success') {
				toast.success("Added successfully");
                resetForm();
				setLoading(false);
			}
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    return (
        <div className='cssFix w-100'>
            {loading? (<Loader />) :
            <>
            <h2 className='text-uppercase heading text-dark'>ADD Book :</h2>
            <form onSubmit={formik.handleSubmit} style={styles.container}>
                <input
                    type="text"
                    value={formik.values.isbn}
                    onChange={formik.handleChange}
                    placeholder="ISBN"
                    style={styles.input}
                    id="isbn"
                    name="isbn"
                />
                <input
                    type="text"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder="Title"
                    style={styles.input}
                    id="title"
                    name="title"
                />
                <input
                    type="text"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    placeholder="Price"
                    style={styles.input}
                    id="price"
                    name="price"
                />
                <input
                    type="text"
                    value={formik.values.publishingHouse}
                    onChange={formik.handleChange}
                    placeholder="Publishing House"
                    style={styles.input}
                    id="publishingHouse"
                    name="publishingHouse"
                />
                <input
                    type="text"
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                    placeholder="CategoryName"
                    style={styles.input}
                    id="categoryName"
                    name="categoryName"
                />
                <textarea
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    placeholder="Description"
                    style={{ ...styles.input, ...styles.textarea }}
                    id="description"
                    name="description"
                />
                <button type="submit" style={styles.button}>Add Book</button>
            </form>
            </>
}
        </div>
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

export default AddBook;