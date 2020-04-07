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
          <p>Number of exercises {props.parts.map(obj => obj.exercises).reduce((a, b) => a + b)}</p>
		</>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
    
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }]
    }
    
    return (
        <div>
          <Header course={course.name}/>
          <Content parts={course.parts} />
          <Total parts={course.parts}/>
        </div>					
    )
}
    
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

