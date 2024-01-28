import './App.css';
import {
  Routes,
  Route,

} from "react-router-dom"
import AboutUs from './Components/AboutUs'
import Footer from './Components/Footer';
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import Login from './Components/Login'
import Signup from './Components/Signup'
import Tshirts from './Components/Tshirts';
import Shoes from './Components/Shoes';
import Hoodies from './Components/Hoodies';
import Jewellery from './Components/Jewellery';
import Notfoundpage from './Components/Notfoundpage';
function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route exact path='*' element={<Notfoundpage/>} />
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/AboutUs' element={<AboutUs/>}/>
        <Route exact path='/Tshirts' element={<Tshirts/>}/>
        <Route exact path='/Hoodies' element={<Hoodies/>}/>
        <Route exact path='/Shoes' element={<Shoes/>}/>
        <Route exact path='/Jewellery' element={<Jewellery/>}/>
        <Route exact path='/login' element={<Login  />}/>
        <Route exact path='/signup' element={<Signup />}/>
        </Routes>

      <Footer />
    </>
  );
}

export default App;
