import React from 'react'
import {connect} from 'react-redux'
import {setFilter} from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        props.setFilter(event.target.value)
	}
    const style = {marginBottom: 10}

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
		</div>
    )
	
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
	}
}

const mapDispatchToProps = {
    setFilter
}

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default connectedFilter
