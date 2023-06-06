import React,{useState} from 'react'
import Second from './Second';

const First = () => {
  const [titleValue,setTitleValue]=useState("");
  const [initial,setInitial]=useState(false);
  
  const onInputChange = (e) => {
    setTitleValue(e.target.value); // titleValue = e.target.value
    console.log(titleValue);
  }
  const toggle = () =>{
        setInitial(!initial);
  }

  return (
    <>
      <input
        type="text"
        name="title"
        placeholder="Enter a title"
        value={titleValue}
        onChange={onInputChange}
      />

      <button onClick={toggle}>Click me</button>

      {initial == true && <Second key1={titleValue} key2="Jaydip"/>}
    </>
  );
}

export default First