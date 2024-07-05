
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import ChildB from './components/ChildB';
import ChildC from './components/ChildC';
import ChildD from './components/ChildD';
import Search from './components/Search';



function App() {
  



  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/b' element={<ChildB />} />
        <Route path='/c' element={<ChildC />} />
        <Route path='/d' element={<ChildD />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
