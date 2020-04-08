import React, { useState } from 'react'
import './App.css';

const Filter = ({nameFilter, updateFilter}) => (
    <div>
      Filter names:<input value={nameFilter} onChange={updateFilter}/>
    </div>)

const EntryForm = ({onSubmit, name, nameHandler, number, numberHandler}) => (
    <form onSubmit={onSubmit}>
      <div>
        <div>name:<input value={name} onChange={nameHandler}/></div>
        <div>number: <input value={number} onChange={numberHandler}/></div>
      </div>
      <div>
        <button type="submit">
          Add
        </button>
      </div>      
	</form>)

const DisplayFiltered = ({listToBeFiltered, filter}) => {
    const arraysEqual = (a, b) => {
        if (a === b) return true
        if (a == null || b == null) return false
        if (a.length !== b.length) return false
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false
		}
        return true
        
    }
    let result
    if (filter.length === 0) {
        result = listToBeFiltered
    }
    else {
        result = listToBeFiltered.filter(person =>
                                         arraysEqual([...person.name.toLowerCase()].slice(0, filter.length),
                                                     [...filter.toLowerCase()]))
    }
    return (
        <div>
          {result.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
	    </div>)


}


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

    const updateFilter= (event) => {
        const filter = event.target.value
        setNameFilter(filter)
	}
    
    return (
        <div>
          <h2>Phonebook</h2>
          <Filter nameFilter={nameFilter} updateFilter={updateFilter}/>
          <h2>Add entry to phonebook</h2>
          <EntryForm onSubmit={addName} name={newName} nameHandler={handleNameChange}
                     number={newNumber} numberHandler={handleNumberChange}/>
          <h2>Numbers</h2>
          <DisplayFiltered listToBeFiltered={persons} filter={nameFilter}/>
        </div>
    )
}

export default App
 
