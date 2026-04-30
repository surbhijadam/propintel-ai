import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"

function EditProperty() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: ""
  })

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/properties/${id}`
      )

      setForm(response.data)
    }

    fetchProperty()
  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.put(
      `http://127.0.0.1:5000/api/properties/${id}`,
      form
    )

    alert("Property updated successfully")
    navigate("/admin")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h1 className="text-4xl font-bold text-blue-600 mb-6">
            Edit Property
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows="5"
              className="w-full border p-3 rounded-lg"
            />

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Update Property
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default EditProperty