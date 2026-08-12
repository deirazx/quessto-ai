import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Generate from './pages/Generate'
import MyNotes from './pages/MyNotes'
import NoteDetail from './pages/NoteDetail'
import { getCurrentUser } from './api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/authSlice'

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        dispatch(setUser(data.user))
      } catch (error) {
        console.error("No logged in user found:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  console.log("Current user details:", user);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={user ? <Navigate to={"/"} replace /> : <Auth />} />
        <Route path='/generate' element={user ? <Generate /> : <Navigate to="/auth" replace />} />
        <Route path='/my-notes' element={user ? <MyNotes /> : <Navigate to="/auth" replace />} />
        <Route path='/notes/:noteId' element={user ? <NoteDetail /> : <Navigate to="/auth" replace />} />
      </Routes>

    </>
  )
}

export default App