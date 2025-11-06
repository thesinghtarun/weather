import selectCity from '../assets/images/select_city.png'
import options from '../assets/images/options.png'
import sun from '../assets/images/sun.png'
import moon from '../assets/images/moon.png'
import { Forecast } from './Forecast'
import { useEffect, useState } from 'react'
import { getCityData, getForcast } from '../api/api'
export function Temperature() {

    const [search, setSearch] = useState('')
    const [weather, setWeather] = useState(null)
    const [forcast, setForcast] = useState(null)
    const [spinner, setSpinner] = useState(false)
    const handleSearch = async () => {
        if (!search.trim()) {
            alert('Please enter a city name');
            return;
        }

        try {
            const data = await getCityData(search.trim());
            const forcast=await getForcast(search.trim());
            if (data.cod === '404' || forcast.cod==='404') {
                alert('City not found');
                setWeather(null);
                setForcast(null);
            } else {
                setWeather(data);
                setForcast(forcast);
            }
        } catch (error) {
            console.error('Error fetching weather:', error);
            alert('Error fetching weather data');
        }
    }

    return (
        <div className='h-screen w-screen'>
            <div className='bg-cyan-500 rounded-b-3xl gap-5 p-3'>
                <div className='flex justify-between'>
                    <div className='text-white font-semibold text-xl'>
                        Weather☁️
                    </div>
                    <div className='flex p-2 gap-3'>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='border-white border rounded-lg p-1.3 w-40 sm:w-100 px-2 placeholder:text-white placeholder:p-1 text-white' />
                        <button
                            onClick={handleSearch}
                            className='bg-white p-1.5 rounded-lg hover:bg-gray-300 hover:cursor-pointer '>Search</button>
                    </div>
                </div>

                {/* Middle Portion */}
                <div className='flex justify-center items-center flex-col mt-4'>
                    {
                         weather ? (
                            <>
                                <div className='flex'>

                                    <div className='text-9xl text-white font-bold ml-10'>{(weather.main.temp - 273.15).toFixed(1)}</div>
                                    <div className='text-2xl mt-5 text-gray-400 font-bold'>
                                        °C
                                    </div>
                                </div>
                                <div className='text-2xl text-amber-200 font-semibold'>{weather.name}</div>
                                <div className='text-2xl text-white font-medium'>
                                    {(weather.weather[0].description).charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
                                </div>
                                <div className='text-white'>
                                    Feels like {(weather.main.feels_like - 273.15).toFixed(1)}°C
                                </div>
                                <div className='text-white'>
                                    {(weather.main.temp_min - 273.15).toFixed()}~{(weather.main.temp_max - 273.15).toFixed()}
                                </div>
                                 <div className='flex justify-evenly mx-3 my-1 gap-20'>
                            <div>
                                <img src={sun} width={60} alt="sun" />
                                <div className='font-semibold'>
                                    {new Date(weather.sys.sunrise*1000).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
                                </div>
                            </div>
                            <div>
                                <img src={moon} width={60} alt="moon" />
                                <div className='font-semibold'>
                                    {new Date(weather.sys.sunset*1000).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
                                </div>
                            </div>
                        </div>
                            </>
                        ) : (
                            <div className='text-white text-lg mt-10'>Enter a city to get started</div>
                        )
                    }
                </div>
            </div>
                
                    {forcast && forcast.list && (
                <div className='p-4'>
                    {forcast.list.map((item, index) => (
                        <Forecast key={index} data={item} />
                    ))}
                </div>
            )}
        </div>
    )
}