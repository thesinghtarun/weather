
export const getCityData=async(city)=>{
    const api=import.meta.env.VITE_API_KEY 
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
   try {
     const res=await fetch(url)
    const data=await res.json()
    console.log(data);
    return data
   } catch (error) {
    console.log(error)
    return null
   }
}

export const getForcast=async(city)=>{
  const api=import.meta.env.VITE_API_KEY
    const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`
    try{
    const res=await fetch(url)
    const data=await res.json()
    console.log(data);
    return data
   } catch (error) {
    console.log(error)
    return null
   }
}

