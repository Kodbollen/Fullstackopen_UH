import React, {useState, useImperativeHandle} from 'react'

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
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
          <div style={hideOnVisibility}>
            {props.children}
		  </div>
		</div>
	)
})

export default Togglable
