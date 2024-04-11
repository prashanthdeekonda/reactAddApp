import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import Auth from "./routes/auth/Auth";
import Login from "./routes/auth/login/login.component";
import SignUp from "./routes/auth/signup/signup.component";
import ProtectedRoute from "./components/protected-route/protected-route.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import Profile from "./routes/profile/profile.component";
import Addition from "./routes/addition/addition.component";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Books from "./routes/books/books.component";
import Inventory from "./routes/inventory/inventory.component";
import AddInventoryItem from "./routes/add-inventory-item/add-inventory-item.component";
import UpdateInventoryItem from "./routes/update-inventory-item/update-inventory-item";
import User from "./routes/user/user.component";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // github pages is not supporting BrowserRouter directly need to add basename or alternatively can use HashRouter

  <BrowserRouter basename={"/"}>
    <React.StrictMode>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="/" element={<App />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="addition"
            element={
              <ProtectedRoute>
                <Addition />
              </ProtectedRoute>
            }
          />
          <Route
            path="books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="inventory/add-item"
            element={
              <ProtectedRoute>
                <AddInventoryItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="inventory/update-item"
            element={
              <ProtectedRoute>
                <UpdateInventoryItem />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<div>No Route found</div>} />
      </Routes>
      <NotificationContainer />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
