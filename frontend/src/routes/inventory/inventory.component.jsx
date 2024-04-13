import "./inventory.component.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Spinner from "../../components/spinner/spinner.component";

// React Notification
import { NotificationManager } from "react-notifications";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemDeleted, setItemDeleted] = useState(0);
  const navigate = useNavigate();

  // replace this url with EC2 instance url from AWS
  const host = window.location.host;
  const baseURL = host.includes("localhost")
    ? "http://localhost:5000/"
    : `https://${host}/`;

  // const baseURL = "http://localhost:5000/";
  const updateInventoryItem = (item) => {
    navigate("update-item", { state: item });
  };

  const deleteInventoryItem = (item) => {
    const id = item._id;
    const deleteURL = `${baseURL}api/inventory/${id}`;
    let itemsLength = items.length;
    axios
      .delete(deleteURL)
      .then((response) => {
        const del = itemDeleted + 1;
        itemsLength--;
        setItemDeleted(del);
        NotificationManager.success(
          "Inventory Item Deleted Successfully!",
          "Successful!",
          2000
        );
        const keyToDelete = item.imageUrl.split("/")[3];
        const deleteS3Image = `${baseURL}api/s3/s3Url/delete/${keyToDelete}`;
        axios.get(deleteS3Image).then((res) => {
          NotificationManager.success(
            " Image Deleted Successfully from S3 Bucket!",
            "Successful!",
            2000
          );
        });
        if (itemsLength === 0) {
          alert("All inventory items are deleted !!!");
        }
      })
      .catch((err) => {
        setLoading(false);
        NotificationManager.error("Error deleting inventory item", "Error !");
      });
  };

  useEffect(() => {
    const getURL = `${baseURL}api/inventory`;
    axios
      .get(getURL)
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
  }, [itemDeleted, baseURL]);

  let spinnerContent;

  if (loading) {
    spinnerContent = (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <div class="container mt-5">
        <h1 style={{ textAlign: "center" }}>Inventory Mangement</h1>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "0.85rem",
          }}
        >
          Manage inventory items. Add, update, and delete items.
        </span>
        <div style={{ "text-align": "center" }} className="mb-3 mt-3">
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
                  <td style={{ "text-align": "center" }} colSpan="5">
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
                            onClick={() => deleteInventoryItem(item)}
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
