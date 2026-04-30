import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

import PropertyCard from "../components/PropertyCard"
import { Link } from "react-router-dom"

function Home() {

  const [properties, setProperties] = useState([])

  const [search, setSearch] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  const fetchProperties = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/properties/"
      )

      setProperties(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const filteredProperties = properties.filter((property) => {

  const matchesSearch =
    property.title
      .toLowerCase()
      .includes(search.toLowerCase())

  const matchesLocation =
    property.location
      .toLowerCase()
      .includes(locationFilter.toLowerCase())

  return matchesSearch && matchesLocation
})

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />
      <div className="p-8">

      <div className="text-center mb-14">

  <h1 className="text-6xl font-extrabold text-blue-600 mb-4">
    PropIntel AI
  </h1>

  <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
    Smart Real Estate Platform powered by
    <span className="font-bold text-purple-600"> Generative AI </span>
    +
    <span className="font-bold text-red-600"> Agentic AI</span>
  </p>

  <p className="text-gray-500 mt-4 text-lg">
    Learn • Manage • Support — all in one intelligent platform
  </p>

</div>

    <div className="grid md:grid-cols-3 gap-6 mb-10">

  <Link
    to="/add-property"
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
  >
    <h2 className="text-2xl font-bold text-green-600 mb-2">
      Add Property
    </h2>
    <p className="text-gray-600">
      Add new property listings with title, price, location, image, and description.
    </p>
  </Link>

  <Link
    to="/quiz"
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
  >
    <h2 className="text-2xl font-bold text-purple-600 mb-2">
      Learning Quiz Bot
    </h2>
    <p className="text-gray-600">
      Practice real estate concepts with AI-generated quizzes, explanations, and memory tips.
    </p>
  </Link>


  <Link
  to="/support-center"
  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
>
  <h2 className="text-2xl font-bold text-red-600 mb-2">
    AI Support Center
  </h2>

  <p className="text-gray-600">
    Submit tenant/property issues and let AI classify urgency, extract details, and generate responses automatically.
  </p>
</Link>

</div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">

  <input
    type="text"
    placeholder="Search properties..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-3 rounded-lg flex-1"
  />

  <input
    type="text"
    placeholder="Filter by location..."
    value={locationFilter}
    onChange={(e) => setLocationFilter(e.target.value)}
    className="border p-3 rounded-lg flex-1"
  />

</div>

      <h2 className="text-3xl font-bold mb-6">
  Available Properties
</h2>
      <div className="grid md:grid-cols-3 gap-8">

        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}

      </div>
      </div>

    </div>
  )
}

export default Home