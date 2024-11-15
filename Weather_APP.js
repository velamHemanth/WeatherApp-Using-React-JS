import { Oval } from 'react-loader-spinner';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './Weather_APP.css'


function Weather_APP() {
    const[input,setInput] = useState("")
    const[weather,setWeather] = useState({
        loading:false,
        data:{},
        error:false
    })

    const toDateFun=()=>{
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const weeks = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]
        const currentDate = new Date()
        const date = `${weeks[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`
        return date
    }

    const search = async (event) =>{
        if (event.key === "Enter"){
            event.preventDefault()
            setInput("")
            setWeather({...weather,loading:true})
            const url = "https://api.openweathermap.org/data/2.5/weather";
            const api_key = 'f00c38e0279b7bc85480c3fe775d518c'
            await axios.get(url,{
                params:{
                    q:input,
                    units:'metric',
                    appid:api_key
                },
            })
            .then((res)=>{
                console.log('res:',res)
                setWeather({data:res.data,loading:false,error:false})
            })
            .catch((error)=>{
                setWeather({...weather,data:{},error:true})
                setWeather("")
                console.log("error:",error)

            })
        }

    }
  return (
    <div className='weather-app'> 
      <div className='sub'>
      <h1 className='title'>Weather App USing React JS</h1>
      <div>
        <input type=' text' value={input} className='search-bar' placeholder='Enter City Name...' onChange={(e)=>{
            setInput(e.target.value)
        }} onKeyPress={search}/>
      </div>
      {weather.loading &&(
        <>
        <br />
        <br />
        <Oval type="oval" color='black' width={100} height={100}/>
        </>
      )}
      {weather.error &&(
        <>
        <br />
        <br />
        <span className='error-msg'>
            <FontAwesomeIcon icon={faFrown} />
            <span style={{fontSize:'20px'}}>City Not Found</span>
        </span>
        </>
      )}
      {weather && weather.data && weather.data.main && (
        <div className='city'>
            <h2 className='cityname'>
                {weather.data.name} ,<span>{weather.data.sys.country}</span>
            </h2>
            <div className='date'>
                <span>{toDateFun()}</span>
            </div>
            <div className='icon-temp'>
                <img className='' src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt={weather.data.weather[0].description}/>
                {Math.round(weather.data.main.temp)}
                <sup className='degee'>°C</sup>
            </div>
            <div className='wind'>
                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                <p>Wind Speed:{weather.data.wind.speed}m/sec</p>
            </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Weather_APP
