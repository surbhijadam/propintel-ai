import { Link, useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")
  }

  return (

    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      <Link
        to="/"
        className="text-3xl font-bold text-blue-600"
      >
        PropIntel AI
      </Link>

      <div className="flex items-center gap-4">

        {token ? (

          <>

            <p className="font-semibold">
              {user?.name}
            </p>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>

        ) : (

          <>

            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </Link>
          </>

        )}

      </div>

    </div>
  )
}

export default Navbar