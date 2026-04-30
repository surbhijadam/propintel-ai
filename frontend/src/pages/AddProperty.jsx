import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Navbar from "../components/Navbar"

function AddProperty() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: ""
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await axios.post(
        "http://127.0.0.1:5000/api/properties/",
        formData
      )

      alert("Property added successfully")

      navigate("/")

    } catch (error) {

      console.log(error)

      alert("Failed to add property")
    }
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center py-10">

        <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Add Property
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="title"
              placeholder="Property Title"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              rows="4"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg"
            >
              Add Property
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default AddProperty