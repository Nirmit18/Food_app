import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChildD from './components/ChildD';
import Search from './components/Search';
import Navbar from './components/Navbar';
import FoodDetails from './components/FoodDetails';
import Footer from './components/Footer';

 import { lazy, Suspense } from 'react';
// import Logout from './components/Logout';
// import Signin from './components/Signin';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Loader from './components/Loader';

import MyTypewriter from './components/MyTypewriter';
import Test from './components/Test';

// Lazy load the Home component
// const Home = lazy(() => import('./components/Home'));
const Home = lazy(() =>
  new Promise(resolve => {
    setTimeout(() => resolve(import('./components/Home')), 1000); // 5 seconds delay
  })
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<div className=' flex justify-center items-center  min-h-screen'><Loader /></div>}>
              <Home />
            </Suspense>
          }
        />



        <Route path='/d' element={<ChildD />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        {/* <Route path='/l' element={<Logout />} /> */}
        <Route path='/food/:id' element={<FoodDetails />} />
        <Route path='/test' element={<Test />} />
        <Route path='/search' element={<Search />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
