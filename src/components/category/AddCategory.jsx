import React, { useState } from 'react'
import '../CSSFiles/general.css';
import commonStyles from '../books/commonStyles.js';
import axios from 'axios';
import { useFormik } from 'formik';
import Loader from '../Loader/Loader.jsx';

function AddCategory() {
     const [loading, setLoading] = useState(false);
    const initialValues = {
        categoryName: '',
    };

    const onSubmit = async (Category, { resetForm }) => {
        try {
            setLoading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/category/add`, Category);
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
            <h2 className='text-uppercase heading'>ADD Category :</h2>
            <form onSubmit={formik.handleSubmit} style={styles.container}>
                <input
                    type="text"
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                    placeholder="Category Name"
                    style={styles.input}
                    id="categoryName"
                    name="categoryName"
                />
        
                <button type="submit" style={styles.button}>Add Category</button>
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

export default AddCategory;