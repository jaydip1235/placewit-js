import React from 'react'
import Third from './Third'

const Second = ({key1,key2}) => {
  return (
    <>
      <h1>This is my second component</h1>
      <h2>{key1}</h2>
      <h3>{key2}</h3>
      <Third key1={key1} key2={key2} key3="Dey" />
    </>
  );
}

export default Second