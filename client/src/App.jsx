// Importing neccessary components and packages
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Donordashboard from './pages/Donordashboard'
import Logout from './components/Logout'
import PrivateRoute from './components/PrivateRoute'
import Viewblogs from './pages/Viewblogs'
import OnlyAdmin from './components/OnlyAdmin'
import CreatePosts from './pages/Createpost'

// App function definition
function App() {
  return (
    // Wrapping the entire application with BrowserRouter to enable routing
    <BrowserRouter>
    {/* Defining routes for different pages */}
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<PrivateRoute />}>
      <Route path="/donordashboard" element={<Donordashboard />} />
      <Route path="/viewblogs" element={<Viewblogs />} />
      <Route path="/logoutpop" element={<Logout />} />
      </Route>

      <Route element={<OnlyAdmin />} >
        <Route path="/create-post" element={<CreatePosts />} />
      </Route>
      

    </Routes>
    </BrowserRouter>
  )
}

// Exporting App
export default App