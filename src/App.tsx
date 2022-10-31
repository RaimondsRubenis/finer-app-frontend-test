import React, {useState, useEffect} from 'react'
import { Container } from './components/Container'
import {InputField} from './components/InputField'
import {isValidPhone, isValidInput, sendtoApi, validator} from './Functions';

import "./styles.css";

function App () {

  const [steps, setSteps] = useState([]);
  const [inputs, setInputs] = useState({});
  const [showId, setShowId] = useState(0);

  useEffect(() => {
    async function getSteps() {
      //TODO error handler if backend is unavailable
      const response = await fetch('http://localhost:3001/getFormData', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      const data = await response.json();
      setSteps(data);
    }
    getSteps();
  }, []);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    setInputs(values => ({...values, [name]: value}))
  }

  const checkFailed = (message: string, index: number) => {
    setShowId(index);
    alert(message);
  }

  const handleSubmit = () => validator(steps, inputs, checkFailed) && sendtoApi(inputs);

  const handleNext = (id: any) => {
    if(id+1 > steps.length) return handleSubmit();
    //TODO optimise into a better solution?
    let tmp: Array<any> = [];
    tmp[id-1] = steps[id-1];
    validator(tmp, inputs, checkFailed) && setShowId(id);
  }

  return (
    <div className="main">
    {
      steps.map((form: any, id:number) => 
        <Container 
        key={id} 
        id={id} 
        show={showId === id} 
        handleNext={handleNext} 
        title={form.title} 
        children={form.fields.map((inp: any, iid:number) => 
          <InputField 
          key={iid} 
          data={{
            title: inp.title, 
            type: inp.type, 
            required: inp.required, 
            options: inp.options, 
            name: inp.name, 
            changeTrigger: handleChange, 
            placeholder: inp.placeholder
          }} 
          />)} 
        />
        )
    }  
    </div>
    )
}

export default App
