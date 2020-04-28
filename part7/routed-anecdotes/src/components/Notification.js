import React from 'react'

const Notification = ({notification}) => {
    const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}
    return (
        <div style={notification ? style : {display: ''}}>
          {notification}
		</div>
	)
}

export default Notification
