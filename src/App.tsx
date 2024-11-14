import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 h-full">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
};

export default App;
