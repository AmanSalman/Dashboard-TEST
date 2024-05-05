import React from 'react';
import commonStyles from '../books/commonStyles.js';
import './File.css'

export default function Input({ id, title, type, name, value, onChange, onBlur, errors, required, className }) {
    return (
        <>
            <label htmlFor={id} className="form-label">
                {title}
                {required && <span style={styles.requiredStar}>*</span>}
            </label>
            {type === 'file' ? (
                <input
                    type={type}
                    name={name}
                    className={`form-control ${className}`}
                    id={id}
                    onChange={onChange} // Use onChange directly
                    onBlur={onBlur} // Add onBlur
                    style={styles.input}
                    required={required}
                    placeholder={title}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    className={`form-control ${className}`}
                    id={id}
                    onChange={onChange}
                    onBlur={onBlur}
                    defaultValue={value} // Use defaultValue instead of value
                    style={styles.input}
                    required={required}
                    placeholder={title}
                />
            )}
            {errors[name] && <p className='text-danger'>{errors[name]}</p>}
        </>
    );
}

const styles = {
    ...commonStyles,
    requiredStar: {
        color: 'red',
        marginLeft: '4px',
    },
};
