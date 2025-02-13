import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Selection/Register.jsx';
import Selection from './pages/Selection/Selection.jsx';
import Loadingsong from './pages/LoadingThankScreen/Loadingsong.jsx';
import Thankyou from './pages/LoadingThankScreen/Thankyou.jsx';
import Home2 from './pages/Home/Home2.jsx';
import TermsAndConditions from './TermsAndCondition.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/' element={<Home2 />} />
      <Route path='/register' element={<Register />} />
      <Route path='/selection' element={<Selection />} />
      <Route path='/loadingsong' element={<Loadingsong />} />
      <Route path='/thankyou' element={<Thankyou />} />
      <Route path='/TermsAndConditions' element={<TermsAndConditions />} />
    </Routes>
  </BrowserRouter>      
    </>
  )
}

export default App
