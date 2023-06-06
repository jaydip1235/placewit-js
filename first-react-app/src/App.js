import logo from './logo.svg';
import './App.css';
import Intro from './components/Intro'
import Introsecond from './components/Introsecond';
import First from './components/First';
import ApiData from './components/ApiData';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {

  return (
    <>
      {/* <Intro/>
      <Introsecond/> */}
      {/* <h1>This is intro</h1>
      <h3>This is second intro</h3> */}
      {/* <First/> */}
      {/* <ApiData/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ApiData />} />
          <Route path="/intro" element={<Intro />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
