import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useField} from '../hooks'
import {addComment} from '../reducers/commentReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import {addTimeout, removeTimeout} from '../reducers/timeoutReducer'

const CommentSection = ({blog}) => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)
    const user = useSelector(state => state.user)
    const timeoutId = useSelector(state => state.timeoutId)
    const comment = useField('text')

    const createNotification = (message) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        dispatch(setNotification(message, 'info'))
        const nId = setTimeout(() => {
            dispatch(removeNotification())
            dispatch(removeTimeout())
		}, 5000)
        dispatch(addTimeout(nId))
	}

    const createComment = (event) => {
        event.preventDefault()
        const newComment = {
            comment: comment.value,
            blog: blog
        }
        dispatch(addComment(comment.value, blog, user.token))
        createNotification(`you commented: '${newComment.comment}'`)        
    }
    
    const blogComments = comments.filter(comment => comment.blog.id === blog.id)
    return (
        <div>
          <h3>Comments</h3>
          {blogComments.length === 0 ? null :
           <ul>
            {blogComments.map(comment => <li key={comment.id}>{comment.content}</li>)}
		   </ul>}
          <form onSubmit={createComment}>
            <div>
              <div>
                <input {...comment} />
                <button id='submitCommentForm' type='submit'>Add comment</button>
              </div>
            </div>
          </form>
		</div>
	)
}

export default CommentSection
