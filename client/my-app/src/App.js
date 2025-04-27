import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute.js"
import Loader from "./components/loader.js";
import { useSelector } from "react-redux";

function App() {
  const {loader}=useSelector(state=>state.loaderReducer)
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader /> }
      <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={
        <ProtectedRoute>
          <Home />
          </ProtectedRoute>} >
          </Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/signup" element={<Signup />} ></Route>
      
      </Routes>
      </BrowserRouter>
    </>
   
  )
}

export default App;
