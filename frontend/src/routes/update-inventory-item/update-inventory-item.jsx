import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

// React Notification
import { NotificationManager } from "react-notifications";

const UpdateInventoryItem = () => {
  const { state } = useLocation();
  const [itemName, setItemName] = useState(state.itemName);
  const [price, setPrice] = useState(state.price);
  const [quantity, setquantity] = useState(state.quantity);

  // replace this url with EC2 instance url from AWS
  const host = window.location.host;
  const baseURL = host.includes("localhost")
    ? "http://localhost:5000/"
    : `http://${host}/`;

  const updateInventoryItem = () => {
    if (!itemName) {
      NotificationManager.error("Item should have name", "Error !");
      return;
    } else if (!quantity || +quantity < 0) {
      NotificationManager.error("Quantity should be 0 or greater", "Error !");
      return;
    } else if (!price || +price < 1) {
      NotificationManager.error("Price should be minimum of $1", "Error !");
      return;
    }
    const putURL = `${baseURL}api/inventory/${state._id}`;
    const payload = { itemName, price, quantity };
    axios
      .put(putURL, payload)
      .then((response) => {
        NotificationManager.success(
          "Inventory Item Updated Successfully!",
          "Successful!",
          2000
        );
      })
      .catch((err) => {
        NotificationManager.error("Error updating inventory item", "Error !");
      });
  };

  return (
    <div>
      <div
        class="container mt-5"
        style={{
          width: "42rem",
          padding: "2rem",
          border: "2px solid lightgray",
          borderRadius: "5px",
        }}
      >
        <Link
          to="/inventory"
          class="btn btn-outline-warning float-right"
          style={{ float: "right" }}
        >
          Show Inventory
        </Link>
        <h1 style={{ textAlign: "center" }}>Update Inventory Item</h1>
        <form noValidate>
          <div class="d-flex flex-row mb-3 text-start mt-5 form-group">
            <label class="col-2"> Name </label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter item name"
              aria-label="itemName"
              aria-describedby="item-name"
              value={itemName}
              id="name"
              name="itemName"
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div class="d-flex flex-row mb-3 text-start form-group">
            <label class="col-2"> Quantity </label>
            <input
              type="number"
              class="form-control"
              placeholder="Enter quantity"
              aria-label="quantity"
              aria-describedby="quantity"
              value={quantity}
              id="quantity"
              name="quantity"
              onChange={(e) => setquantity(e.target.value)}
            />
          </div>

          <div class="d-flex flex-row mb-3 text-start form-group">
            <label class="col-2"> Price </label>
            <input
              type="number"
              class="form-control"
              placeholder="Enter price"
              aria-label="price"
              aria-describedby="price"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div class=" text-start d-flex offset-md-2 mb-2">
            <button
              type="button"
              class="btn btn-primary"
              onClick={updateInventoryItem}
            >
              Update Inventory Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInventoryItem;
