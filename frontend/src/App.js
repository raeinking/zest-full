import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Apartments from './pages/Apartments.js';
import Add_Apartments from './pages/Add_Apartments.js';
import Add_project from './pages/Add_project.js';
import Test from './pages/Test.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/property" element={<Apartments/>} />
        <Route path="/add_property" element={<Add_Apartments/>} />
        <Route path="/add_project" element={<Add_project/>} />
        <Route path="/test" element={<Test/>} />
      </Routes>
    </Router>
  );
}

export default App;
