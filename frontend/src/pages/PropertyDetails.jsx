import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"

function PropertyDetails() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [scheduled, setScheduled] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/properties/${id}`
      )
      setProperty(response.data)
    }

    fetchProperty()
  }, [id])

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-center mt-20 text-xl">
          Loading property...
        </p>
      </div>
    )
  }

  const handleVisit = () => {
  setScheduled(true)

  setTimeout(() => {
    setScheduled(false)
  }, 4000)
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <img
          src={property.image}
          alt={property.title}
          className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-8">

            <h1 className="text-5xl font-bold text-blue-600 mb-4">
              {property.title}
            </h1>

            <p className="text-xl text-gray-500 mb-4">
              📍 {property.location}
            </p>

            <p className="text-4xl font-bold text-green-600 mb-8">
              ₹ {property.price}
            </p>

            <h2 className="text-2xl font-bold mb-4">
              Description
            </h2>

            <p className="text-gray-700 leading-8 text-lg">
              {property.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

              <div className="bg-blue-50 p-5 rounded-2xl text-center">
                <h3 className="font-bold text-2xl">3</h3>
                <p className="text-gray-600">Bedrooms</p>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl text-center">
                <h3 className="font-bold text-2xl">2</h3>
                <p className="text-gray-600">Bathrooms</p>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl text-center">
                <h3 className="font-bold text-2xl">1800</h3>
                <p className="text-gray-600">Sq Ft</p>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl text-center">
                <h3 className="font-bold text-2xl">1</h3>
                <p className="text-gray-600">Parking</p>
              </div>

            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-white rounded-3xl shadow-md p-6">

              <h2 className="text-2xl font-bold mb-5">
                Amenities
              </h2>

              <ul className="space-y-3 text-gray-700 text-lg">
                <li>✅ Modular Kitchen</li>
                <li>✅ Balcony View</li>
                <li>✅ High-speed WiFi</li>
                <li>✅ Security System</li>
                <li>✅ Power Backup</li>
                <li>✅ Garden Area</li>
              </ul>

            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">

              <h2 className="text-2xl font-bold mb-5">
                Contact Agent
              </h2>
              
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold"
                onClick={handleVisit}
              >
                {scheduled ? "Visit Scheduled!" : "Schedule Visit"}
              </button>

              {scheduled && (
  <div className="mt-4 bg-green-100 border border-green-400 text-green-700 p-4 rounded-2xl">
    ✅ Visit scheduled successfully.
    <br />
    Our agent will contact you shortly.
  </div>
)}

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default PropertyDetails