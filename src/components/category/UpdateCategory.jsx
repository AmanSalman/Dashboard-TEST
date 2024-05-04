import React, { useState } from 'react';
import commonStyles from '../books/commonStyles.js'
import '../CSSFiles/general.css';
import { useFormik } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';
import Input from '../shared/Input.jsx';
import { useParams } from 'react-router-dom';

const UpdateCategory = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const initialValues = {
        name: '',
        status: '',
        image:'',
    };

    const handelFieldChange = (event)=>{
        formik.setFieldValue('image', event.target.files[0]);
    }

    const onSubmit = async (Category, { resetForm }) => {
        console.log(Category);
        try {
            const formData = new FormData();
            formData.append("name", Category.name);
            formData.append("status", Category.status);
            formData.append("image", Category.image);

            setLoading(true);
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL2}/category/${id}`, formData);
            console.log(data);

            if (data.message === 'success') {
                toast.success("Added successfully");
                resetForm();
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    const statusOptions = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
    ];

    const renderInputs = [
        {
            id:'name',
            type:'text',
            name:'name',
            title:'Name',
            value:formik.values.name,
            required:true
        },
        {
            id:'status',
            type:'select',
            name:'status',
            title:'Status',
            value:formik.values.status,
            required:true,
            options: statusOptions
        },
        {
            id:'image',
            type:'file',
            name:'image',
            title:'Image',
            onChange:handelFieldChange,
            required:true,
        }
    ].map((input,index) => {
        if (input.type === 'select') {
            return (
                <div key={index} className='pb-4 pt-3'>
                    <label htmlFor={input.id} className='form-label'>{input.title}</label>
                    <select
                        id={input.id}
                        name={input.name}
                        value={formik.values[input.name]}
                        onChange={formik.handleChange} // Update onChange handler
                        onBlur={formik.handleBlur}
                        className='form-control'
                        required={input.required}
                    >
                        {input.options.map((option, idx) => (
                            <option key={idx} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            );
        } else {
            return (
                <Input
                    key={index}
                    type={input.type}
                    id={input.id}
                    name={input.name}
                    title={input.title}
                    value={input.value}
                    onChange={formik.handleChange}
                    errors={formik.errors}
                    onBlur={formik.handleBlur}
                    touched={formik.touched}
                    required={input.required}
                    className='pb-4 pt-3'
                />
            );
        }
    });

    return (
        <div className='cssFix w-100' style={{ background: 'white', borderRadius: '18px' }}>
            {loading ? (<Loader />) :
                <>
                    <h2 className='text-uppercase heading'>Update Category :</h2>
                    <form onSubmit={formik.handleSubmit} style={styles.container}>
                        {renderInputs}
                        <button type="submit" style={styles.button} disabled={!formik.isValid}>Update Category</button>
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

export default UpdateCategory;
