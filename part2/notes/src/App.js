import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    const hook = () => {
        axios.get('http://localhost:3001/notes')
            .then(response => {
                setNotes(response.data)
			})
	}
    useEffect(hook, [])

    const notesToShow = showAll ? notes : notes.filter(note => note.important)
	
    const handleNoteChange = (event) => {
        console.log(event.target.value)
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
        setNotes(notes.concat(noteObject))
        setNewNote('')
	}

    return (
        <div>
          <h1>Notes</h1>
          <div>
            <button onClick={() => setShowAll(!showAll)} >
              Show {showAll ? 'important' : 'all'}
			</button>
		  </div>
          <ul>
            {notesToShow.map(note => <Note key={note.id} note={note}/>)}
		  </ul>
          <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type="submit">Save</button>
		  </form>
		</div>
    )
}

export default App

