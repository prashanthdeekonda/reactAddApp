import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// React Notification
import { NotificationManager } from "react-notifications";

const AddInventoryItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [imageUrl, setImage] = useState();

  // const [inventoryItem, setInventoryItem] = useState({
  //   itemName: "",
  //   price: "",
  //   quantity: "",
  //   imageUrl: "",
  // });

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const { state } = useLocation();
  console.log("add inventory", state);

  const navigate = useNavigate();

  const addInventoryItem = () => {
    const obj = {
      name: itemName,
      price: price,
      quantity: quantity,
      image: imageUrl,
    };
    NotificationManager.success(
      "added succesfully!",
      "Successful!",
      2000
    );
    navigate("/inventory", { state: obj });
  };

  return (
    <div>
      <div class="container mt-5">
        <h1>Add Inventory Item</h1>
        {/* <form noValidate > */}
          <div class="d-flex flex-row mb-3 text-start mt-5">
            <label class="col-2" for="name">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="enter item name"
              aria-label="itemName"
              aria-describedby="item-name"
              value={itemName}
              id="name"
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div class="d-flex flex-row mb-3 text-start">
            <label class="col-2" for="price">
              Price
            </label>
            <input
              type="number"
              class="form-control"
              placeholder="enter price"
              aria-label="price"
              aria-describedby="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
            />
          </div>

          <div class="d-flex flex-row mb-3 text-start">
            <label class="col-2" for="quantity">
              Quantity
            </label>
            <input
              type="number"
              class="form-control"
              placeholder="enter quantity"
              aria-label="quantity"
              aria-describedby="quantity"
              value={quantity}
              id="quantity"
              onChange={(e) => setquantity(+e.target.value)}
            />
          </div>

          <div class="d-flex flex-row mb-5 text-start">
            <span class="col-2" for="image">
              Choose Image
            </span>
            <input
              class="form-control"
              type="file"
              id="image"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageUpload}
            ></input>
          </div>

          <div class=" text-start d-flex offset-md-2 mb-5">
            <button
              type="button"
              class="btn btn-primary"
              onClick={addInventoryItem}
            >
              Add To Inventory
            </button>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default AddInventoryItem;
