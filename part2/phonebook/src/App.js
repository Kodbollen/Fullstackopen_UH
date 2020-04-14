import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'
import './index.css'


const InfoBar = ({infoMessage, setInfoMessage, infoType}) => {
    if (infoMessage === null) return null
    return (
        <div className={infoType}>{infoMessage}</div>
    )
}

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

const DisplayFiltered = ({listToBeFiltered, filter, persons, setPersons,
                          infoMessage, setInfoMessage, infoType, setInfoType }) => {
    const arraysEqual = (a, b) => {
        if (a === b) return true
        if (a == null || b == null) return false
        if (a.length !== b.length) return false
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false
		}
        return true
    }

    const removeContact = person => {
        if (window.confirm(`Do you really want to delete ${person.name} from your contacts?`)) {
            personService.remove(person.id)
                .then(response => {
                    setInfoType('info')
                    setInfoMessage(`Succesfully removed ${person.name}`)
                    personService.getAll().then(response => setPersons(response))
                })
                .catch(error => {
                    const msg = `Entry for ${person.name} wasn't found in database.`
                    setInfoType('error')
                    setInfoMessage(msg)
                    personService.getAll().then(response => setPersons(response))
				})
        }
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
          {result.map(person =>
                      <div key={person.name}>
                        {person.name} {person.number} <button onClick={() => removeContact(person)}>Delete</button>
                      </div>)}
	    </div>)


}


const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [infoMessage, setInfoMessage] = useState(null)
    const [infoType, setInfoType ] = useState('info')

    const hook = () => {
        personService.getAll()
          .then(response => {
              setPersons(response)
		  })
    }

    useEffect(hook, [])
    
    const addName = (event) => {
        event.preventDefault()
        const dialogue = `${newName} already exists in the phonebook! Do you want to replace the phone number for the contact?`
        if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(dialogue)) {
                const contact = persons.find(p => p.name === newName)
                const updatedContact = {...contact, number: newNumber}
                personService.update(contact.id, updatedContact)
                    .then(response =>
                          personService.getAll()
                          .then(response => {
                              setPersons(response)
                              setInfoType('info')
                              setInfoMessage(`${contact.name} succesfully updated!`)
                              setTimeout(() => {
                                  setInfoMessage(null)
                              }, 5000)
                          }))
			}
		} else {
            const phonebookEntry = {
                name: newName,
                number: newNumber
		    }
            personService.create(phonebookEntry)
                .then(response =>
                      personService.getAll()
                      .then(response => {
                          setPersons(response)
                          setInfoType('info')
                          setInfoMessage(`${newName} succesfully added to phonebook!`)
                          setTimeout(() => {
                              setInfoMessage(null)
                          }, 5000)
                      }))
				.catch(error => {
					console.log('error logged')
					console.log(error)
					console.log(error.response)
					console.log(error.response.data)
					console.log(error.response.data.error)
					setInfoType('error')
                    setInfoMessage(error.response.data.error)
				})
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
          <InfoBar infoMessage={infoMessage} setInfoMessage={setInfoMessage} infoType={infoType}/>
          <h2>Phonebook</h2>
          <Filter nameFilter={nameFilter} updateFilter={updateFilter}/>
          <h2>Add entry to phonebook</h2>
          <EntryForm onSubmit={addName} name={newName} nameHandler={handleNameChange}
                     number={newNumber} numberHandler={handleNumberChange}/>
          <h2>Numbers</h2>
          <DisplayFiltered listToBeFiltered={persons} filter={nameFilter}
                           persons={persons} setPersons={setPersons} infoMessage={infoMessage}
                           setInfoMessage={setInfoMessage} infoType={infoType} setInfoType={setInfoType}/>
        </div>
    )
}

export default App
