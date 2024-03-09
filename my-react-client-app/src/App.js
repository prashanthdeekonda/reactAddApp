import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Profile />} />
        <Route path="addition" element={<Addition />} />
        <Route path="books" element={<Books />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/add-item" element={<AddInventoryItem />} />\
        <Route path="inventory/update-item" element={<UpdateInventoryItem />} />
      </Route>
    </Routes>
  );
}

export default App;
