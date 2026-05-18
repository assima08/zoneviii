import axios from "axios"
import { useEffect, useState } from "react"
import ServiceCard from "./components/ServiceCard"

function App() {

  const [services, setServices] = useState([])

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/services/")
      .then((response) => {

        setServices(response.data)

      })
      .catch((error) => {

        console.log(error)

      })

  }, [])

  return (
    <div>

      <h1>ZoneVIII</h1>

      {services.map((service: any) => (

        <ServiceCard
          key={service.id}
          nomService={service.nomService}
          description={service.description}
  />

      ))}

    </div>
  )
}

export default App