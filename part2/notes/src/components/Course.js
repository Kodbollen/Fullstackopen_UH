import React from 'react'

const Header = ({text}) => (<h1>{text}</h1>)

const Part = ({name, exercises}) => (<p>{name} {exercises}</p>)

const Content = ({parts}) => (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
	</div>)

const Course = ({course}) => (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
	</div>)


export default Course
