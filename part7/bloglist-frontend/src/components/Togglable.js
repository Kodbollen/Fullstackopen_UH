import React, {useState, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visibility, setVisibility] = useState(true)

    const hideOnVisibility = {display: visibility ? 'none' : ''}

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <div>
            <button id='toggleVisibilityButton' onClick={toggleVisibility}>{props.buttonLabel}</button>
            <div style={hideOnVisibility}>
                {props.children}
            </div>
        </div>)
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
