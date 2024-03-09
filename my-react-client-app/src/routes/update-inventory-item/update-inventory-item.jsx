import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateInventoryItem = () => {
  const { state } = useLocation();
  const [itemName, setItemName] = useState(state.itemName);
  const [price, setPrice] = useState(state.price);
  const [quantity, setquantity] = useState(state.quantity);

  //   useEffect( () => {
  //     setItemName(state.itemName);
  //     setPrice(state.price);
  //     setquantity(state.quantity);
  //   }, [state]);

  const updateInventoryItem = () => {};
  return (
    <div>
      <div class="container mt-5">
        <h1>Update Inventory Item</h1>

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

        <div class=" text-start d-flex offset-md-2 mb-5">
          <button
            type="button"
            class="btn btn-primary"
            onClick={updateInventoryItem}
          >
            Update Inventory Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInventoryItem;
