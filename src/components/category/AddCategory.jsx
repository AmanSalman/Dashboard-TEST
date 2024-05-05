import React, { useState } from 'react';
import '../CSSFiles/general.css';
import commonStyles from '../books/commonStyles.js';
import axios from 'axios';
import { useFormik } from 'formik';
import Loader from '../Loader/Loader.jsx';
import Input from '../shared/Input.jsx';
import { toast } from 'react-toastify';
import { categorySchema } from '../../validation/CategoryValidation.js'

function AddCategory() {
    const [loading, setLoading] = useState(false);

    const initialValues = {
        name: '',
        image: '', // Change to null as default value
    };

    const handelFieldChange = (event) => {
        formik.setFieldValue('image', event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("image", values.image);
            
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL2}/category/`, formData);
            console.log(data)
            if (data.message === 'success') {
                toast.success("Added successfully");
                resetForm();
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error("No Response - Server might be down");
            } else {
                toast.error("An Error Occurred - Please try again later");
            }
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:categorySchema,
        validateOnChange: false, // Only validate on blur or submit
        validateOnBlur: false
    });

    const inputs = [
        {
            id: 'name',
            type: 'text',
            name: 'name',
            title: 'Category Name',
            value: formik.values.name,
            required: true
        },
        {
            id: 'image',
            type: 'file',
            name: 'image',
            title: 'Category Image',
            onChange: handelFieldChange,
            required: true
        }
    ];

    const renderInputs = inputs.map((input, index) => (
        <Input 
            type={input.type}
            id={input.id}
            name={input.name} 
            title={input.title}
            value={input.value}  
            key={index}
            onChange={input.onChange || formik.handleChange} 
            onBlur={formik.handleBlur} 
            errors={formik.errors}
            touched={formik.touched}
        />
    ));

    return (
        <div className='cssFix w-100' style={{ background: 'white', borderRadius: '18px' }}>
            {loading ? (<Loader />) :
                <>
                    <h2 className='text-uppercase heading'>ADD Category :</h2>
                    <form onSubmit={formik.handleSubmit} encType='multipart/form-data' style={styles.container}>
                        {renderInputs}
                        <button type="submit" style={styles.button} disabled={!formik.isValid}>Add Category</button>
                    </form>
                </>
            }
        </div>
    );
};

const styles = {
    ...commonStyles,
};

export default AddCategory;
