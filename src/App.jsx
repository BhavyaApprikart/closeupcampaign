import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Selection/Register.jsx';
import Selection from './pages/Selection/Selection.jsx';
import Loadingsong from './pages/LoadingThankScreen/Loadingsong.jsx';
import Thankyou from './pages/LoadingThankScreen/Thankyou.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/selection' element={<Selection />} />
      <Route path='/loadingsong' element={<Loadingsong />} />
      <Route path='/thankyou' element={<Thankyou />} />
    </Routes>
  </BrowserRouter>      
    </>
  )
}

export default App
