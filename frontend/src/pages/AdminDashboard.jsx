import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

function AdminDashboard() {
  const [properties, setProperties] = useState([])

  const fetchProperties = async () => {
    const response = await axios.get(
      "http://127.0.0.1:5000/api/properties/"
    )
    setProperties(response.data)
  }

  const deleteProperty = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this property?"
    )

    if (!confirmDelete) return

    await axios.delete(
      `http://127.0.0.1:5000/api/properties/${id}`
    )

    fetchProperties()
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Admin Dashboard
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-2xl font-bold">
            Total Properties: {properties.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Location</th>
                <th className="p-4">Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="border-b"
                >
                  <td className="p-4">{property.title}</td>
                  <td className="p-4">{property.location}</td>
                  <td className="p-4">
                    ₹ {property.price}
                  </td>

                  <td className="p-4 flex gap-3">
                    <Link
                      to={`/edit-property/${property.id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProperty(property.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  )
}

export default AdminDashboard