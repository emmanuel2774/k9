import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {useNavigate, useLocation, Routes, Route} from "react-router-dom"
import SignIn from './components/Sign-in/SignIn';
import Signup from './components/Sign-Up/Signup';
import Profile from './components/Profile/Profile';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import SignOut from './components/SignOut/SignOut';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Home from './components/Home/Home';
import Breed from './components/Breed/Breed';
import SellDog from './components/SellDog/SellDog';


function App() {
  const navigate = useNavigate()
  const location = useLocation()



  return (
    <>
    <Routes>
      
      <Route path='/' element={
        <>
        <Navbar/>
        <Home/>
        </>
      } />
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-out' element={<SignOut/>}/>
      <Route path='/sign-up' element={<Signup/>} />
      <Route path='/breed/:breedName' element={<Breed/>}/>

      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/sell-dog' element={<SellDog/>}/>
      <Route path="/profile" element={<PrivateRoutes />}>
      <Route path='/profile' element={<Profile/>} />
      </Route>


     
    </Routes>
    <ToastContainer/>
  </>

  
  );
}

export default App;
