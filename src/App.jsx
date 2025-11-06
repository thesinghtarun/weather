
import { useEffect, useState } from "react"
import { Temperature } from "./components/Temperature"
import { getCityData } from "./api/api"
import { Forecast } from "./components/Forecast"

function App(){
  
     return(
      <>
         <Temperature />
      </>
  )
}
export default App