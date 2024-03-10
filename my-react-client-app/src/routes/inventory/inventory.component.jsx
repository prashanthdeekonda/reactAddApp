import "./inventory.component.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Spinner from "../../components/spinner/spinner.component";

// React Notification
import { NotificationManager } from "react-notifications";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const addInventoryItemPage = () => {
    navigate("add-item", { state: { id: 7, color: "green" } });
  };

  const updateInventoryItem = (item) => {
    navigate("update-item", { state: item });
  };

  const deleteInventoryItem = () => {};

  const { state } = useLocation();
  console.log("inventory", state);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventory")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
        NotificationManager.success(
          "Inventory collection retrieved!",
          "Successful!",
          2000
        );
      })
      .catch((err) => {
        setLoading(false);
        NotificationManager.error(
          "Error getting data for Inventory collection",
          "Error !"
        );
      });
  }, []);

  let spinnerContent;

  if (loading) {
    spinnerContent = (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div class="container mt-5">
        <h1>Inventory Mangement</h1>
        <span> Manage inventory items. Add, update, and delete items.</span>
        <div style={{ "text-align": "center" }} className="mb-3 mt-3">
          {/* <button
            type="button"
            class="btn btn-primary"
            onClick={addInventoryItemPage}
          >
            Create new Inventory Item
          </button> */}

          <Link to="add-item" className="btn btn-primary">
            Create new Inventory Item
          </Link>
        </div>
        <div>{spinnerContent}</div>
        <div className="inv-table">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>ITEM</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td style={{ "text-align": "center" }} colSpan="4">
                    Inventory is empty
                  </td>
                </tr>
              ) : (
                <>
                  {items.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={item.imageUrl}
                            width="90"
                            height="90"
                            alt="ima"
                          />
                        </td>
                        <td>{item.itemName}</td>
                        <td>{`$${item.price}`}</td>
                        <td>{item.quantity}</td>
                        <td style={{ cursor: "pointer" }}>
                          <i
                            class="bi bi-pencil-square"
                            onClick={() => updateInventoryItem(item)}
                          >
                            Update
                          </i>
                          <i
                            class="bi bi-trash3 px-5"
                            onClick={deleteInventoryItem}
                          >
                            Delete
                          </i>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
