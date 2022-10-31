import React, {HTMLInputTypeAttribute, Dispatch, SetStateAction, ChangeEventHandler } from 'react';
import {isValidEmail} from '../Functions';
import DatePicker from './DatePicker';

interface inputProps {
	data: {
	title?: String,
	name: string,
	type: HTMLInputTypeAttribute,
	required?: boolean,
	options?: string[],
	changeTrigger: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
	placeholder?: string,
	}
}

export const InputField = ({data}:inputProps) => <div className="d-inline"><label>{data.title}</label><InputFieldElements data={data} /></div>

export const InputFieldElements = ({data}:inputProps) => {
	const {name, type, required, options, changeTrigger, placeholder} = data;
	if(type == "textarea") 
		return <textarea onChange={changeTrigger}  name={name} required={required} />
	if(type == "options")  
		return (
			<select onChange={changeTrigger} name={name} required={required}> 
				{placeholder && <option value="" disabled selected hidden>{placeholder}</option>}
				{options?.map((option, id) => <option key={id} value={option}>{option}</option>)}
			</select>
				)
	if(type == "date")
		return 	(
					<div>
						<DatePicker data={data} />
					</div>
				)
	
	return (
			<input 
				onBlur={(event) => {(type=="email" && !isValidEmail(event.target.value)) && alert("Invalid e-mail")}}
				type={type} 
				onChange={changeTrigger} 
				name={name} 
				required={required}
				onKeyPress={(event) => {type=="tel" && (!/[+0-9]/.test(event.key)) && event.preventDefault()}}
			 />
			)	
}