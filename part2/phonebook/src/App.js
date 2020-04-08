import React, { useState } from 'react'
import './App.css';

const Person = ({person}) => (
    <p>
      {person.name} {person.number}
	</p>
)


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [filteredPhonebook, setFilteredPhonebook] = useState([...persons])
    
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
            setFilteredPhonebook(persons.concat(phonebookEntry).filter(
                person => arraysEqual([...person.name.toLowerCase()].slice(0, nameFilter.length),[...nameFilter.toLowerCase()])                                                          
            ))
	    }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
	}
    
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const arraysEqual = (a, b) => {
        if (a === b) return true
        if (a == null || b == null) return false
        if (a.length !== b.length) return false
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false
		}
        return true
	}

    const updateFilter= (event) => {
        const filter = event == null ? nameFilter : event.target.value
        setNameFilter(filter)
        setFilteredPhonebook(persons.filter(person =>
                                  arraysEqual([...person.name.toLowerCase()].slice(0, filter.length),[...filter.toLowerCase()])))
	}
    
    return (
        <div>
          <h2>Phonebook</h2>
          <div>Filter names:<input value={nameFilter} onChange={updateFilter}/></div>
          <form onSubmit={addName}>
            <h2>Add entry to phonebook</h2>
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
            {filteredPhonebook.map(person => <Person key={person.name} person={person}/>)}
		  </div>
        </div>
    )
}

export default App
