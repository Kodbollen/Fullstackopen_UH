import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({text}) => (<><h1>{text}</h1></>)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
    const average = Math.round((good - bad) / (good + neutral + bad) * 100 + Number.EPSILON) / 100
    const positive = Math.round((good + neutral) / (good + neutral + bad) * 10000) / 100

    if (good + neutral + bad === 0) {
        return (
            <div>
              No feedback given
			</div>
		)
    }
    
    return (
        <>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>Average: {average}</p>
          <p>Positive: {positive}%</p>
		</>
	)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
        <Header text='Give feedback'/>
        <Button onClick={() => setGood(good + 1)} text='Good' />
        <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
        <Button onClick={() => setBad(bad + 1)} text='Bad' />
        <Header text='Statistics'/>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
