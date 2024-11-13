import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 h-full">
        <Outlet />
      </div>
    </>
  )
}

export default App
