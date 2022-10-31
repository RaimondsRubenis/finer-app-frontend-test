import React, { KeyboardEvent, useState } from 'react';

interface pickerProps {
	data: {
		name: string,	
		changeTrigger: any,
	}
}

const DatePicker = ({data}:pickerProps) => {
	//TODO put more effort into this
	const {name, changeTrigger} = data; 
	const [day, setDay] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");

	const handleInput = (event: any) => {
		const target = event.target.name;
		const value = event.target.value;
		if(target===name+"-year"){
			let final = Number(value) > 99 ? "99" : value;
			setYear(final);
		}
		if(target===name+"-month"){
			let final = Number(value) > 12 ? "12" : value;
			setMonth(final);
		}
		if(target===name+"-day"){
			let final = Number(value) > 31 ? "31" : value;
			setDay(final);
		}
	}

	const normaliseInput = (event:any) => {
		const ename = event.target.name;
		const evalue = event.target.value;
		(ename===name+"-month" && evalue<0) && setMonth("01");
		(ename===name+"-day" && evalue<0) && setDay("01");
		if(Number(evalue) < 10 && evalue.length === 1 && evalue !== ""){
			ename===name+"-year" && setYear("0"+year);
			ename===name+"-month" && setMonth("0"+month);
			ename===name+"-day" && setDay("0"+day);
		}
		(Boolean(day) && Boolean(month) && Boolean(year)) 
			? changeTrigger({target:{name: name, value: day+"-"+month+"-"+year}})
			: changeTrigger({target:{name: name, value: ""}})
	}

	return (
		<div>
			<DateInputElement name={name+"-day"} value={day} placeholder="DD" inputChange={handleInput} onBlur={normaliseInput} />
			<DateInputElement name={name+"-month"} value={month} placeholder="MM" inputChange={handleInput} onBlur={normaliseInput} />
			<DateInputElement name={name+"-year"} value={year} placeholder="YY" inputChange={handleInput} onBlur={normaliseInput} />
		</div>
		)
}

interface InputElementProps {
	value: string
	name: string
	inputChange: any
	placeholder?: string
	onBlur?: any
}

const DateInputElement: React.FC<InputElementProps> = ({value, name, inputChange, placeholder, onBlur}) => {
	const limitToNumbers = (event: KeyboardEvent<HTMLInputElement>) => {
		(!/[0-9]/.test(event.key)) && event.preventDefault()
	}

	return (
		<input 
		className="d-inline" 
		name={name}  
		value={value} 
		onChange={(e) => inputChange(e)} 
		style={{width: 25}} 
		type="text" 
		placeholder={placeholder}
		onKeyPress={(e) => limitToNumbers(e)} 
		onBlur={(e) => onBlur(e)}
		/>
		)
}

export default DatePicker;