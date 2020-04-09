import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'


const Filter = ({countryFilter, updateFilter}) => (
    <div>
      find countries
      <input value={countryFilter} onChange={updateFilter} />
    </div>)

const Country = ({name, capital, population, languages, flag}) => {

    return (
        <div>
          <h1>{name}</h1>
          <p>capital: {capital}</p>
          <p>Population: {population}</p>
          <h2>languages</h2>
          <ul>
            {languages.map(language => <li key={language.name}>{language.name}</li>)}
		  </ul>
          <img src={flag} alt={`The flag of ${name}`}/>
		</div>
	)
}

const Display = ({listToBeFiltered, filter, showCountry, setShowCountry}) => {
    const arraysEqual = (a, b) => {
        if (a === b) return true
        if (a == null || b == null) return false
        if (a.length !== b.length) return false
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false
		}
        return true
        
    }

    const toggleContent = (name) => {
        if (showCountry.includes(name)) {
            console.log(showCountry.filter(item => item !== name))
            setShowCountry(showCountry.filter(item => item !== name))
		} else {
            console.log(showCountry.concat(name))
            setShowCountry(showCountry.concat(name))
        }
	}
    let result
    if (filter.length === 0) {
        result = listToBeFiltered
        return (<div></div>)
    }
    else {
        result = listToBeFiltered.filter(country =>
                                         arraysEqual([...country.name.toLowerCase()].slice(0, filter.length),
                                                     [...filter.toLowerCase()]))
    }
    if (result.length > 10) {
        return (
            <div>Too many mathces, specify another filter.</div>
		)
	}
    if (result.length === 1) {
        return (<Country name={result[0].name} capital={result[0].capital}
                         population={result[0].population} languages={result[0].languages}
                         flag={result[0].flag}/>)
    }
    return (
        <div>
          {result.map(country => (
              <div key={country.name}>
                {country.name}
                <button key={country.alpha3Code} onClick={() => toggleContent(country.name)}>
                  {showCountry.includes(country.name) ? 'Hide' : 'Show'}
                </button>
                {showCountry.includes(country.name) ?
                 <Country name={country.name} capital={country.capital}
                          population={country.population} languages={country.languages}
                          flag={country.flag}/>
                 : null}
              </div>
		  ))}
	    </div>
    )

}

const App = () => {
    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')
    const [showCountry, setShowCountry] = useState([])

    const hook = () => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
			})
	}

    useEffect(hook, [])

    const updateFilter = (event) => {
        setCountryFilter(event.target.value)
    }


    return (
        <div>
          <Filter countryFilter={countryFilter} updateFilter={updateFilter} />
          <Display listToBeFiltered={countries} filter={countryFilter}
                           showCountry={showCountry} setShowCountry={setShowCountry}/>
        </div>
    )
}

export default App
