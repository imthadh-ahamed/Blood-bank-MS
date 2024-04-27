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
import PostSuccess from './components/PostSuccess'
import Updatepost from './pages/Updatepost'
import Viewdonors from './pages/Viewdonors'
import Viewcampaigns from './pages/Viewcampaigns'
import Adddonor from './pages/Adddonor'
import CreateCampaign from './pages/Createcampaign'
import Updatecampaigns from './pages/Updatecampaigns'
import Updatedonors from './pages/Updatedonor'

// App function definition
function App() {
  return (
    // Wrapping the entire application with BrowserRouter to enable routing
    <BrowserRouter>
    {/* Defining routes for different pages */}
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/postsuccess' element={<PostSuccess />} />

      <Route element={<PrivateRoute />}>
      <Route path="/donordashboard" element={<Donordashboard />} />
      <Route path="/viewblogs" element={<Viewblogs />} />
      <Route path="/viewdonors" element={<Viewdonors />} />
      <Route path="/viewcampaigns" element={<Viewcampaigns />} />
      <Route path="/logoutpop" element={<Logout />} />
      </Route>

      <Route element={<OnlyAdmin />} >
        <Route path="/create-post" element={<CreatePosts />} />
        <Route path="/create-donor" element={<Adddonor />} />
        <Route path="/update-post" element={<Updatepost />} />
        <Route path='/create-campaign' element={<CreateCampaign />} />
        <Route path="/update-campaign/:campaignID" element={<Updatecampaigns />} />
        <Route path="/update-donor/:donorid" element={<Updatedonors />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

// Exporting App
export default App