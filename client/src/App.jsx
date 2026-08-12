import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { getCurrentUser } from './api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/authSlice'

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        dispatch(setUser(data.user))
      } catch (error) {
        console.error("No logged in user found:", error.response?.data?.message || error.message);
      }
    };
    fetchUser();
  }, [dispatch]);
  console.log("Current user details:", user);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={user ? <Navigate to={"/"} replace /> : <Auth />} />
      </Routes>

    </>
  )
}

export default App