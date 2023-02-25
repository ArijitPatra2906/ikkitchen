import './App.css';
import { Route, Routes } from "react-router-dom"
import LoginView from './view/LoginView';
import DashboardView from './view/DashboardView';
import CategoryView from './view/CategoryView';
import FoodView from './view/FoodView';
import ContactView from "./view/ContactView";
import { ToastContainer } from 'react-toastify';
import Some from './pages/Some';

function App() {
  // useEffect(() => {
  //   if (!localStorage.getItem("_token"))
  //     navigate("/")
  // }, [navigate])
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWU1ZTRiYjg2NjliOGFlYjBmZGFlMCIsImlhdCI6MTY3NjcwMzc4NiwiZXhwIjoxNjc5Mjk1Nzg2fQ.JwGPGranRVlyHqzF4kTE_foHdJS4onW9rKmdj7lI-fQ"
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWU1ZTRiYjg2NjliOGFlYjBmZGFlMCIsImlhdCI6MTY3NjcwMzgxMywiZXhwIjoxNjc5Mjk1ODEzfQ.vQA1kpIdqNzRjOyP9QWmt0ZgVuyKbwLbvAls9XDD5i4"
  const userToken = localStorage.getItem("_token");

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginView />} />
        {/* <Route path='/register' element={<RegisterView />} /> */}
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path='/contact' element={<ContactView />} />
        <Route path='/category' element={<CategoryView />} />
        <Route path='/food' element={<FoodView />} />
        <Route path='/category/:catId' element={<Some />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
