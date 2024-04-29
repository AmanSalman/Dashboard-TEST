import React, { useState } from 'react'
import '../CSSFiles/general.css';
import commonStyles from '../books/commonStyles.js';
import axios from 'axios';
import { useFormik } from 'formik';
import Loader from '../Loader/Loader.jsx';
import Input from '../shared/Input.jsx';

function AddCategory() {
     const [loading, setLoading] = useState(false);
    const initialValues = {
        categoryName: '',
        image:''
    };

    const handelFieldChange = (event)=>{
        formik.setFieldValue('image', event.target.files[0]);
    }

    const onSubmit = async (Category, { resetForm }) => {
        try {
            const formData = new FormData();
            formData.append("userName",Category.categoryName);
            formData.append("image",Category.image);
            setLoading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/category/add`, formData);
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

    
    const inputs = [
        {
            id:'categoryName',
            type:'text',
            name:'categoryName',
            title:'Category Name',
            value:formik.values.categoryName,
            required:true
        },
        {
            id:'image',
            type:'file',
            name:'image',
            title:'Category Image',
            onchange:handelFieldChange,
            required:true
        }
    ]

    
    const renderInputs = inputs.map ((input,index)=>
    <Input type={input.type}
     id={input.id}
      name={input.name} 
      title={input.title}
       value={input.value}  
       key={index}
     onChange={input.onchange|| formik.handleChange} 
     errors={formik.errors}
     onBlur={formik.handleBlur} 
     touched={formik.touched}
     required/>
    )
    

    return (
        <div className='cssFix w-100' style={{background: 'white',
        borderRadius: '18px'}}>
            {loading? (<Loader />) :
            <>
            <h2 className='text-uppercase heading'>ADD Category :</h2>
            <form onSubmit={formik.handleSubmit} style={styles.container}>
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