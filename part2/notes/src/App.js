import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const Notification = ({message}) => {
    if (message === null) return null
    return (
        <div className='error'>{message}</div>
	)
}

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const hook = () => {
        noteService.getAll()
            .then(response => {
                setNotes(response)
			})
	}
    useEffect(hook, [])

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important}

        noteService.update(id, changedNote)
            .then(response => {
                setNotes(notes.map(note => note.id !== id ? note : response))
            })
            .catch(error => {
                setErrorMessage(`Note '${note.content}' was already removed from server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
			})
	}
    
	const notesToShow = showAll ? notes : notes.filter(note => note.important)
	
    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
	}
    
    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > .5
		}
        noteService.create(noteObject)
            .then(response => {
                  setNotes(notes.concat(noteObject))
                  setNewNote('')
            })
	}

    return (
        <div>
          <Notification message={errorMessage}/>
          <h1>Notes</h1>
          <div>
            <button onClick={() => setShowAll(!showAll)} >
              Show {showAll ? 'important' : 'all'}
			</button>
		  </div>
          <ul>
            {notesToShow.map(note =>
                             <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
		  </ul>
          <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type="submit">Save</button>
		  </form>
		</div>
    )
}

export default App


