import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({countryFilter, updateFilter}) => (
    <div>
      find countries
      <input value={countryFilter} onChange={updateFilter} />
    </div>)

const Weather = ({capital, weatherData}) => {
    const dataIndex = weatherData.map(data => data.location.name).indexOf(capital)
    if (dataIndex < 0) {
        return (<div>No weather information available</div>)
    } else {
        const data = weatherData[dataIndex]
        return (
            <div>
              <h2>Weather in {capital}</h2>
              <p><b>Temperature: </b>{data.current.temperature}</p>
              <img src={data.current.weather_icons} alt={`Conditions: ${data.current.weather_descriptions[0]}`}/>
              <p><b>Wind: </b>{data.current.wind_speed} Km/t direction {data.current.wind_dir}</p>
		    </div>
	    )
    }
}

const Country = ({name, capital, population, languages, flag, weatherData}) => (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>Population: {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
	  </ul>
      <img src={flag} alt={`The flag of ${name}`}/>
      <Weather capital={capital} weatherData={weatherData}/>
	</div>
)


const Display = ({listToBeFiltered, filter, showCountry, setShowCountry, weatherData, setWeatherData}) => {
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
            setShowCountry(showCountry.filter(item => item !== name))
		} else {
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
          {result.map(country => {
              /* fetchWeatherData(country.capital) */
              return (
                  <div key={country.name}>
                    {country.name}
                    <button key={country.alpha3Code} onClick={() => toggleContent(country.name, country.capital)}>
                      {showCountry.includes(country.name) ? 'Hide' : 'Show'}
                    </button>
                    {showCountry.includes(country.name) ?
                     <Country name={country.name} capital={country.capital}
                              population={country.population} languages={country.languages}
                              flag={country.flag} weatherData={weatherData}/>
                     : null}
                  </div>
              )
		  })}
	    </div>
    )

}

const App = () => {
    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')
    const [showCountry, setShowCountry] = useState([])
    const [weatherData, setWeatherData] = useState([])

    const weatherHook = () => {
        const queryList = showCountry.filter(country => !weatherData.map(data => data.location.country).includes(country))
        queryList.map(country =>
                      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}&units=m`)
                      .then(response => {
                          setWeatherData(weatherData.concat(response.data))
		              }))

    }    
    const hook = () => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
			})
	}
    
    useEffect(hook, [])
    useEffect(weatherHook, [showCountry])
    
    const updateFilter = (event) => {
        setCountryFilter(event.target.value)
    }


    return (
        <div>
          <div>
            <Filter countryFilter={countryFilter} updateFilter={updateFilter} />
            <Display listToBeFiltered={countries} filter={countryFilter}
                     showCountry={showCountry} setShowCountry={setShowCountry}
                     weatherData={weatherData} setWeatherData={setWeatherData}/>
          </div>
          <div>
		  </div>
        </div>

    )
}

export default App
