
export function Forecast({ data }) {
  return (
    <div className='border rounded-lg p-3 my-2 bg-gray-100 flex justify-between'>
      <div>{new Date(data.dt*1000).toLocaleDateString([],{hour:'2-digit',minute:'2-digit'})}</div>
      <div>{data.weather[0].description}</div>
      <div>{(data.main.temp-273.15).toFixed(1)}°C</div>
    </div>
  )
}
