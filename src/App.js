import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import EmployeeList from "./components/employeeList/EmployeeList";
import Profile from "./components/profile/Profile";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="main-content">
        <Route exact path="/" component={EmployeeList}/>
        <Route path="/profile/:id" component={Profile}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
