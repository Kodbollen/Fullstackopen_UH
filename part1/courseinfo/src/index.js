import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
    return (
        <>
          <h1>{props.course}</h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
          <p>{props.part.name} {props.part.exercises}</p>
		</>
	)
}

const Content = (props) => {
    console.log(props.parts[0])
    return (
        <>
          <Part part={props.parts[0]} />
          <Part part={props.parts[1]} />
          <Part part={props.parts[2]} />
        </>
    )
}

const Total = (props) => {
    return (
        <>
          <p>Number of exercises {props.parts.map(obj => obj.exercises).reduce((a, b) => a + b, 0)}</p>
		</>
    )
}


const App = () => {
    const course = 'Half Stack application development'

    const part1  = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }
    const parts = [part1, part2, part3]
    
    return (
        <div>
          <Header course={course}/>
          <Content parts={parts} />
          <Total parts={parts}/>
        </div>					
    )
}
    
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

