import React, { useState } from 'react';
import commonStyles from './commonStyles.js';
import '../CSSFiles/general.css';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import Input from '../shared/Input.jsx';
import { useParams } from 'react-router-dom';

const UpdateBook = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const handelFieldChange = (event) => {
        formik.setFieldValue('image', event.target.files[0]);
    }

    const onSubmit = async (book) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("isbn", book.isbn);
            formData.append("title", book.title);
            formData.append("price", book.price);
            formData.append("image", book.image);
            formData.append("description", book.description);
            formData.append("publishingHouse", book.publishingHouse);
            formData.append("categoryName", book.categoryName);

            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/book/update/${id}`, formData);

            if (data.message === 'success') {
                toast.success("Book updated successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while updating the book");
        } finally {
            setLoading(false);
        }
    };

    // Check if bookToUpdate exists before accessing its properties
    const initialValues = {
        isbn: '',
        title: '',
        price: 0,
        description: '',
        publishingHouse: '',
        categoryName: '',
        image: '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    const inputs = [
        {
            id: 'isbn',
            type: 'text',
            name: 'isbn',
            title: 'ISBN',
            value: formik.values.isbn,
            required: true
        },
        {
            id: 'title',
            type: 'text',
            name: 'title',
            title: 'Title',
            value: formik.values.title,
            required: true
        },
        {
            id: 'price',
            type: 'number',
            name: 'price',
            title: 'Price',
            value: formik.values.price,
            required: true
        },
        {
            id: 'description',
            type: 'textarea',
            name: 'description',
            title: 'Description',
            value: formik.values.description,
        },
        {
            id: 'publishingHouse',
            type: 'text',
            name: 'publishingHouse',
            title: 'Publishing House',
            value: formik.values.publishingHouse,
            required: true
        },
        {
            id: 'categoryName',
            type: 'text',
            name: 'categoryName',
            title: 'Category Name',
            value: formik.values.categoryName,
            required: true
        },
        {
            id: 'image',
            type: 'file',
            name: 'image',
            title: 'Image',
            onChange: handelFieldChange,
            required: true,
        }
    ];

    const renderInputs = inputs.map((input, index) =>
        <Input
            type={input.type}
            id={input.id}
            name={input.name}
            title={input.title}
            value={input.value}
            key={index}
            onChange={formik.handleChange}
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            required
            className='pb-4 pt-3'
        />
    );

    return (
        <div className='cssFix w-100' style={{ background: 'white', borderRadius: '18px' }}>
            {loading ? (<Loader />) :
                <>
                    <h2 className='text-uppercase heading'>UPDATE Book :</h2>
                    <form onSubmit={formik.handleSubmit} style={styles.container}>
                        {renderInputs}
                        <button type="submit" style={styles.button} disabled={!formik.isValid}>Update Book</button>
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

export default UpdateBook;
