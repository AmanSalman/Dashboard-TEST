import React from 'react';
import commonStyles from '../books/commonStyles.js';
import './File.css'
export default function Input({ id, title, type, name, value, handleData, errors, required, className }) {
    return (
        <>
            <label htmlFor={id} className="form-label">
                {title}
                {required && <span style={styles.requiredStar}>*</span>}
            </label>
            <input
                type={type}
                name={name}
                className={`form-control ${className}`} // Add className here
                id={id}
                onChange={handleData}
                defaultValue={value} // Use defaultValue instead of value
                style={styles.input}
                required={required}
                placeholder={title}
            />
            {errors[name] && <p className='text-danger'>{errors[name]}</p>}
        </>
    );
}

const styles = {
    ...commonStyles,
    requiredStar: {
        color: 'red', // You can adjust the color as needed
        marginLeft: '4px', // Adjust spacing as needed
    },
};
