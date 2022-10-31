import React from 'react';

export const isValidEmail = (email : any) => (/\S+@\S+\.\S+/.test(email)) ? true : false;

export const isValidPhone = (phone : any) => (!/[+0-9]/.test(phone)) ? false : true;

export const isValidInput = (input: any) =>  Boolean(input.trim());

//TODO validate date data more, but I'll skip it for now
export const validateYear = () => {}

export const sendtoApi = (data: any) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
		body: JSON.stringify(data)
	};
	fetch('http://localhost:3001/submitFormData', requestOptions)
	.then(response => response.json());
	//TODO: handle a fail response
}

export const validator = (steps: Array<any>, inputs: Object, checkFailed: Function) => {
	//TODO validate if text not shorter than some amount from ENV
    let index = 0;
    let pass = true;
    Loop1:
    for(let step of steps){
    	if(Boolean(step)){
    		for(let field of step.fields){
    			if(pass == false){break Loop1;}
    			if(field["name"] in inputs){
    				if(field["type"] == "email" && !isValidEmail(inputs[field["name"] as keyof typeof inputs])){
    					checkFailed("Invalid e-mail in "+ field["title"], index); pass = false;
    				}
    				if(field["type"] == "tel" && !isValidPhone(inputs[field["name"] as keyof typeof inputs])){
    					checkFailed("Invalid phone number in "+ field["title"], index); pass = false;
    				}
    				if(field["required"] && !Boolean(inputs[field["name"] as keyof typeof inputs])){
    					checkFailed("Invalid input in "+ field["title"], index); pass = false;
    				}
    			}else{
    				if(field["required"]){
    					checkFailed("Missing required field "+ field["title"], index); pass = false;
    				}
    			}
    		}
    	}
    	index++;
    }
    return pass;
}