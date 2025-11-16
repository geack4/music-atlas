import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { Navbar } from "./components/navbar"
import { useEffect } from "react"
import { getToken } from "./methods/getToken"
import { Artists } from "./pages/artists"
import { PageNotFound } from "./pages/notFound"
import { Favorites } from "./pages/favorites"
import { Albums } from "./pages/albums"

function App() {

  useEffect(()=>{
    console.log(getToken())
  },[])

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
    <footer><p>© Karol Gacek</p></footer>
    </>
  )
}

export default App
