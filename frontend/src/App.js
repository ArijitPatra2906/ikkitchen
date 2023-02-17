import './App.css';
import { Route, Routes } from "react-router-dom"
import LoginView from './view/LoginView';
import DashboardView from './view/DashboardView';
import CategoryView from './view/CategoryView';
import FoodView from './view/FoodView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginView />} />
        {/* <Route path='/register' element={<RegisterView />} /> */}
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path='/category' element={<CategoryView />} />
        <Route path='/food' element={<FoodView />} />
      </Routes>
    </div>
  );
}

export default App;
