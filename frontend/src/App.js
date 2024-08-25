import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [filteredResponse, setFilteredResponse] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Numbers');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch('http://localhost:3000/api/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });
      const data = await res.json();
      if (selectedFilter === 'Numbers') {
        setFilteredResponse(data.numbers.join(','));
      } else if (selectedFilter === 'Alphabets') {
        setFilteredResponse(data.alphabets.join(','));
      } else {
        setFilteredResponse(data.highest_lowercase_alphabet.join(','));
      }
    } catch (err) {
      console.error('Invalid JSON input', err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="jsonInput">API Input</label>
          <input
            type="text"
            id="jsonInput"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"data":["M","1","334","4","B"]}'
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <div className="filter-group">
        <label htmlFor="filter">Multi Filter</label>
        <select
          id="filter"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="Numbers">Numbers</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
        </select>
      </div>

      <div className="response">
        <h3>Filtered Response</h3>
        <p>{selectedFilter}: {filteredResponse}</p>
      </div>
    </div>
  );
}

export default App;
