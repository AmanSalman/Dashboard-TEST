import React from 'react'

export default function Input({id,title,type,name,value,handleData,errors}) {
	return (
		<div className="mb-3">
			<label htmlFor={id} className="form-label">{title}</label>
			<input type={type} name={name} className="form-control" id={id} onChange={handleData} value={value}/>
            {errors[name] && <p className=' text-danger'>{errors.name} </p>}
		</div>
	)
}
