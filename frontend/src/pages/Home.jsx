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
    const matchesSearch = property.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesLocation = property.location
      .toLowerCase()
      .includes(locationFilter.toLowerCase())

    return matchesSearch && matchesLocation
  })

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      
      {/* animated background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="p-8">

          {/* Hero Section */}
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

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <Link
              to="/add-property"
              className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-xl hover:scale-105 transition"
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
              className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-xl hover:scale-105 transition"
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
              className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-xl hover:scale-105 transition"
            >
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                AI Support Center
              </h2>

              <p className="text-gray-600">
                Submit tenant/property issues and let AI classify urgency, extract details, and generate responses automatically.
              </p>
            </Link>

          </div>

          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-white/40 bg-white/70 backdrop-blur-md p-3 rounded-xl flex-1 shadow-md outline-none"
            />

            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-white/40 bg-white/70 backdrop-blur-md p-3 rounded-xl flex-1 shadow-md outline-none"
            />
          </div>

          {/* Properties */}
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
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
    </div>
  )
}

export default Home