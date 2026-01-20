import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { WeatherFunc } from './features/data';
import './input.css';

function Input() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (input.trim() !== "") {
      dispatch(WeatherFunc(input));
    }
  };

  return (
    <div className='input-container'>
      <input 
        type="text" 
        placeholder="Enter city name..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Input;
