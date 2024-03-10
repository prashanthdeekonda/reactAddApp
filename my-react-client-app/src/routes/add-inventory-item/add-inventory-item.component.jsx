import { useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

// React Notification
import { NotificationManager } from "react-notifications";

const AddInventoryItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const imageInputRef = useRef();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    // get secure url from our aws s3 bucket server
    axios
      .get("http://localhost:5000/api/s3/s3Url")
      .then((response) => {
        const { data } = response;
        // post the image to the s3 bucket
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        axios.put(data.url, file, { headers }).then((res) => {
          const imageUrl = data.url.split("?")[0];
          setImageUrl(imageUrl);
        });
      })
      .catch((err) => {
        NotificationManager.error(
          "Error uploading image into the s3 bucket",
          "Error !"
        );
      });
  };
  let uploadedImagePreview;
  if (!!imageUrl) {
    uploadedImagePreview = (
      <div class="d-flex flex-row mb-5 text-start form-group">
        <span class="col-2">Preview Image</span>
        <img
          src={imageUrl}
          width="120"
          height="120"
          alt="previewUploadedImage"
        />
      </div>
    );
  }

  const addInventoryItem = (e) => {
    e.preventDefault();
    const payload = { itemName, price, quantity, imageUrl };
    axios
      .post("http://localhost:5000/api/inventory", payload)
      .then((res) => {
        NotificationManager.success(
          "Inventory Item added succesfully!",
          " Add Item Successful!",
          2000
        );
        //Resets the file name of the file input
        imageInputRef.current.value = "";
        setItemName("");
        setPrice(0);
        setquantity(0);
      })
      .catch((err) => {
        NotificationManager.error(
          "Error adding inventory item, please try again",
          "Error !"
        );
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
        <h1 style={{ textAlign: "center" }}>Add Inventory Item</h1>
        <form noValidate>
          <div class="d-flex flex-row mb-3 text-start mt-5 form-group">
            <label class="col-2">Name</label>
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
            <label class="col-2">Price</label>
            <input
              type="number"
              class="form-control"
              placeholder="enter price"
              aria-label="price"
              aria-describedby="price"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div class="d-flex flex-row mb-3 text-start form-group">
            <label class="col-2">Quantity</label>
            <input
              type="number"
              class="form-control"
              placeholder="enter quantity"
              aria-label="quantity"
              aria-describedby="quantity"
              value={quantity}
              id="quantity"
              name="quantity"
              onChange={(e) => setquantity(e.target.value)}
            />
          </div>

          <div class="d-flex flex-row mb-5 text-start form-group">
            <span class="col-2">Choose Image</span>
            <input
              class="form-control"
              type="file"
              id="image"
              name="imageUrl"
              accept=".png, .jpg, .jpeg"
              ref={imageInputRef}
              onChange={handleImageUpload}
            ></input>
          </div>
          {uploadedImagePreview}
          <div class=" text-start d-flex offset-md-2 mb-5">
            <button
              type="button"
              class="btn btn-primary"
              disabled={!imageUrl}
              onClick={addInventoryItem}
            >
              Add To Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventoryItem;
