
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Product from "./pages/Product"
import ProductDetail from "./pages/ProductDetail"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Admin from "./pages/Admin"

function App() {
  
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productid" element={<ProductDetail />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  )
}

export default App
