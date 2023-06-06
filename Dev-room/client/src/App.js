import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import DeveloperList from './components/DeveloperList';
import DeveloperDetails from './components/DeveloperDetails';
import Dashboard from './components/Dashboard';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import Navbar from './components/Navbar';
import AddEducation from './components/AddEducation';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExperience from './components/AddExperience';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/register" element={<UserRegister />} />
          <Route path="/users/login" element={<UserLogin />} />
          <Route path="/developers" element={<DeveloperList />} />
          <Route path="/profiles/dashboard" element={<Dashboard />} />
          <Route
            path="/developers/:developerId"
            element={<DeveloperDetails />}
          />
          <Route path="/profiles/create-profile" element={<CreateProfile />} />
          <Route
            exact
            path="/profiles/edit-profile"
            element={<EditProfile />}
          />
          <Route path="/profiles/add-education" element={<AddEducation />} />
          <Route path="/profiles/add-experience" element={<AddExperience />} />
          <Route path="/posts/list" element={<PostList />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
