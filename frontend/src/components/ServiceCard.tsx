type ServiceProps = {
  nomService: string
  description: string
}

function ServiceCard({
  nomService,
  description
}: ServiceProps) {

  return (

    <div>

      <h2>{nomService}</h2>

      <p>{description}</p>

    </div>

  )
}

export default ServiceCard