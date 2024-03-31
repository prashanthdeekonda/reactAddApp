import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Navigation from "./routes/navigation/navigation.component";
import Profile from "./routes/profile/profile.component";
import Addition from "./routes/addition/addition.component";
import Books from "./routes/books/books.component";
import Inventory from "./routes/inventory/inventory.component";
import AddInventoryItem from "./routes/add-inventory-item/add-inventory-item.component";
import UpdateInventoryItem from "./routes/update-inventory-item/update-inventory-item";

// React Notification
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Login from "./routes/login/login.component";
import SignUp from "./routes/signup/signup.component";
import Dashboard from "./routes/dashboard/dashboard.component";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Profile />} />
          <Route path="addition" element={<Addition />} />
          <Route path="books" element={<Books />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/add-item" element={<AddInventoryItem />} />\
          <Route
            path="inventory/update-item"
            element={<UpdateInventoryItem />}
          />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <NotificationContainer />
    </Fragment>
  );
}

export default App;
