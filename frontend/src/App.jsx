import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AddProperty from "./pages/AddProperty"
import Quiz from "./pages/Quiz"

import ProtectedRoute from "./components/ProtectedRoute"
import SupportCenter from "./pages/SupportCenter"
import PropertyDetails from "./pages/PropertyDetails"
import AdminDashboard from "./pages/AdminDashboard"
import EditProperty from "./pages/EditProperty"

function App() {

  return (

    <Routes>

      <Route
  path="/"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-property"
        element={
          <ProtectedRoute>
            <AddProperty />
          </ProtectedRoute>
        }
      />

      <Route
  path="/quiz"
  element={
    <ProtectedRoute>
      <Quiz />
    </ProtectedRoute>
  }
/>


<Route
  path="/support-center"
  element={
    <ProtectedRoute>
      <SupportCenter />
    </ProtectedRoute>
  }
/>

<Route
  path="/properties/:id"
  element={
    <ProtectedRoute>
      <PropertyDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-property/:id"
  element={
    <ProtectedRoute>
      <EditProperty />
    </ProtectedRoute>
  }
/>

    </Routes>
  )
}



export default App