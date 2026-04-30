import Navbar from "../components/Navbar"

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-8">

        <h1 className="text-4xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user?.name}
          </h2>

          <p className="text-gray-600">
            Email: {user?.email}
          </p>

          <p className="text-gray-600 mt-2">
            Role: {user?.role}
          </p>

        </div>

      </div>

    </div>
  )
}

export default Dashboard