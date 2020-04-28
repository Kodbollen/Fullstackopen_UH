import React, { useState } from 'react'
import {useField} from '../hooks'

const CreateNew = ({anecdotes, setAnecdotes, notification, setNotification}) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    
    const [timerId, setTimerId] = useState('')

    const excludeReset = (useFieldObject) => {
        const {reset, ...rest} = useFieldObject
        return rest
	}

    const createNotification = (message) => {
        setNotification(`You created '${message}'`)
        if (timerId) {
            clearTimeout(timerId)
            setTimerId('')
		}
        const nId = setTimeout(() => {
            setNotification('')
            setTimerId('')
		}, 10000)
        setTimerId(nId)
	}
    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        console.log(anecdote)
        setAnecdotes(anecdotes.concat(anecdote))
        createNotification(anecdote.content)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        })
    }
    const resetAll = () => {
        content.reset()
        author.reset()
        info.reset()
	}

    return (
        <div>
          <h2>create a new anecdote</h2>
          <form onSubmit={handleSubmit}>
            <div>
              content
              <input {...excludeReset(content)} />
            </div>
            <div>
              author
              <input {...excludeReset(author)} />
            </div>
            <div>
              url for more info
              <input {...excludeReset(info)}/>
            </div>
            <button>create</button>
            <button type='button' onClick={resetAll}>reset form</button>
          </form>
        </div>
    )

}

export default CreateNew
