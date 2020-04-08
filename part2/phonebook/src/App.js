import React, { useState } from 'react'
import './App.css';

const Person = ({person}) => (
    <p>
      {person.name} {person.number}
	</p>
)

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas',
          number: '979140491'
		}
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const addName = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {
            alert(`${newName} already exists in the phonebook!`)
		} else {
            const phonebookEntry = {
                name: newName,
                number: newNumber
		    }
            setPersons(persons.concat(phonebookEntry))
	    }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
	}
    
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
          <h2>Phonebook</h2>
          <form onSubmit={addName}>
            <div>
              <div>name:<input value={newName} onChange={handleNameChange}/></div>
              <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
            </div>
            <div>
              <button type="submit">
                Add
              </button>
            </div>
          </form> 
          <h2>Numbers</h2>
          <div>
            {persons.map(person => <Person key={person.name} person={person}/>)}
		  </div>
        </div>
    )
}

export default App
