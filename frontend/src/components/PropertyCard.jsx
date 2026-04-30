import { Link } from "react-router-dom"

function PropertyCard({ property }) {

  return (

<div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5 flex flex-col flex-grow">

        <h2 className="text-2xl font-bold mb-2">
          {property.title}
        </h2>

        <p className="text-gray-600 mb-2">
          {property.location}
        </p>

        <p className="text-gray-700 mb-4">
          {property.description}
        </p>

        <h3 className="text-blue-600 text-xl font-semibold">
          ₹ {property.price}
        </h3>

      </div>
      <Link
  to={`/properties/${property.id}`}
className="mt-auto mx-auto mb-5 inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
  View Details
</Link>

    </div>
  )
}

export default PropertyCard