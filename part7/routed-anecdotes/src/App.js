import React, {useState} from 'react'


import Footer from './components/Footer'
import Menu from './components/Menu'



const App = () => {
  const [notification, setNotification] = useState('')

    return (
        <div>
          <Menu />
          <Footer />
        </div>
    // <div>
    //   <h1>Software anecdotes</h1>
    //   <Menu />
    //   <AnecdoteList anecdotes={anecdotes} />
    //   <About />
    //   <CreateNew addNew={addNew} />
    //   <Footer />
    // </div>
  )
}

export default App;
