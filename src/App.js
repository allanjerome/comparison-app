import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [numStrings, setNumStrings] = useState('');
  const [comparisonType, setComparisonType] = useState('');
  const [strings, setStrings] = useState([]);
  const [result, setResult] = useState('');

  const handleNumStringsChange = (e) => {
    const inputNumStrings = e.target.value;

    if (inputNumStrings > 5) {
      alert('Please enter a lesser number of strings (maximum 5).');
    } else {
      setNumStrings(inputNumStrings);
      setStrings(Array.from({ length: inputNumStrings }, () => ''));
    }
  };

  const handleComparisonTypeChange = (e) => {
    setComparisonType(e.target.value);
  };

  const handleStringChange = (index, e) => {
    const newStrings = [...strings];
    newStrings[index] = e.target.value;
    setStrings(newStrings);
  };

  const handleCompare = () => {
    const isValid = validateInputs();
    if (isValid) {
      let count = 0;
      let message = '';

      strings.forEach((string) => {
        let vowelCount = 0;
        let consonantCount = 0;

        for (let i = 0; i < string.length; i++) {
          const char = string[i].toLowerCase();

          if (isVowel(char)) {
            vowelCount++;
          } else if (isConsonant(char)) {
            consonantCount++;
          }
        }

        count += comparisonType === 'Vowels' ? vowelCount : consonantCount;
        message += `String: ${string}, ${comparisonType}: ${
          comparisonType === 'Vowels' ? vowelCount : consonantCount
        }\n`;
      });

      setResult(`Total ${comparisonType}: ${count}\n\n${message}`);
    }
  };

  const isVowel = (char) => {
    return ['a', 'e', 'i', 'o', 'u'].includes(char);
  };

  const isConsonant = (char) => {
    return /^[a-z]$/i.test(char) && !isVowel(char);
  };

  const validateInputs = () => {
    if (!numStrings || isNaN(numStrings) || numStrings < 2) {
      alert('Please enter a valid number of strings (minimum 2).');
      return false;
    }

    if (numStrings > 5) {
      alert('Please enter a lesser number of strings (maximum 5).');
      return false;
    }

    if (!comparisonType) {
      alert('Please select a comparison type.');
      return false;
    }

    return true;
  };

  const handleStartOver = () => {
    setNumStrings('');
    setComparisonType('');
    setStrings([]);
    setResult('');
  };

  const renderStringsInputs = () => {
    const inputs = [];

    for (let i = 0; i < numStrings; i++) {
      inputs.push(
        <input
          key={i}
          type="text"
          value={strings[i] || ''}
          onChange={(e) => handleStringChange(i, e)}
          placeholder={`String ${i + 1}`}
        />
      );
    }

    return inputs;
  };

  return (
    <div className="app">
      <div className=' container'>
       <h1 className="app-title">String Comparison App</h1>
       <div className="app-inputs">
         <label htmlFor="numStrings">Enter the number of strings to compare:</label>
         <input
           id="numStrings"
           type="text"
           value={numStrings}
           onChange={handleNumStringsChange}
           placeholder="Number of Strings"
         />
         {numStrings >= 2 && (
           <>
             <div className="strings-inputs">
               <h2>Enter the strings:</h2>
               {renderStringsInputs()}
             </div>

             <div className="comparison-type">
               <label htmlFor="comparisonType">Select comparison type:</label>
               <select id="comparisonType" value={comparisonType} onChange={handleComparisonTypeChange}>
                 <option value="">-- Select --</option>
                 <option value="Vowels">Vowels</option>
                 <option value="Consonants">Consonants</option>
               </select>
             </div>

             <button className="compare-button" onClick={handleCompare}>Compare</button>
           </>
         )}
       </div>

       {result && (
         <div className="result">
           <h2>Result:</h2>
           <pre>{result}</pre>
           <button className="start-over-button" onClick={handleStartOver}>Start Over</button>
         </div>
       )}
       </div>
    </div>
  );
};

export default App;
