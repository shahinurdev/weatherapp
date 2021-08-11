import React, { useEffect, useState } from 'react';
import './Style.css';
import WeatherCard from './WeatherCard';
const Temp = () => {
    const [searchValue, setSearchValue] = useState('jamalpur');
    const [tempInfo, setTempInfo] = useState({})
    const getWeatherInfo = async () =>{
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=d05788f3e04125c4f961761782c09018`;
            const res = await fetch(url);
            const data = await res.json();
            const {temp, humidity, pressure} = data.main;
            const {main: weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeather = {
                temp, 
                humidity, 
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            };
               setTempInfo(myNewWeather)
            console.log(temp);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getWeatherInfo();
    }, [])
     
    return (
        <>
        <br /><br />
           <div className="wrap">
               <div className="search">
                   <input type="search" placeholder="Search" autoFocus id="search"
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}
                   className="searchTerm" />
                   <button className="searchButton" type="button" onClick={getWeatherInfo}>Search </button>
               </div>
            </div> 
           <WeatherCard tempInfo={tempInfo}/>
        </>
    );
};

export default Temp;