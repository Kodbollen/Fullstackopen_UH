import React, {useState} from 'react'

const Togglable = (props) => {
	const [visibility, setVisibility] = useState(true)
    const hideOnVisibility = {display: visibility ? 'none' : ''}

	const toggleVisibility = () => {
		setVisibility(!visibility)
	}

	return (
        <div>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
          <div style={hideOnVisibility}>
            {props.children}
		  </div>
		</div>
	)
}

export default Togglable
