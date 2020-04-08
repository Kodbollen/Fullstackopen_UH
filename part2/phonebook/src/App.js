import React, { useState } from 'react'
import './App.css';


const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]) 
    const [ newName, setNewName ] = useState('')

    const addName = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {
            alert(`${newName} already exists in the phonebook!`)
		} else {
            const phonebookEntry = {          
                name: newName
		    }
            setPersons(persons.concat(phonebookEntry))
	    }
    }

    const handleNoteChange = (event) => {
        setNewName(event.target.value)
	}

    return (
        <div>
          <h2>Phonebook</h2>
          <form onSubmit={addName}>
            <div>
              name: <input value={newName} onChange={handleNoteChange}/>
            </div>
            <div>
              <button type="submit">
                Add
              </button>
            </div>
          </form> 
          <h2>Numbers</h2>
          <div>
            {persons.map(person => <p key={person.name}>{person.name}</p>)}
		  </div>
        </div>
    )
}

export default App
