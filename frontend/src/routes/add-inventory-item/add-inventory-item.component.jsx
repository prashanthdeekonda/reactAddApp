import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// React Notification
import { NotificationManager } from "react-notifications";

const AddInventoryItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setquantity] = useState();
  const [imageUrl, setImageUrl] = useState("a");
  const imageInputRef = useRef();

  // replace this url with EC2 instance url from AWS
  const host = window.location.host;
  const baseURL = host.includes("localhost")
    ? "http://localhost:5000/"
    : `http://${host}/`;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const s3URL = `${baseURL}api/s3/s3Url`;
    // get secure url from our aws s3 bucket server
    axios
      .get(s3URL)
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
    if (!itemName) {
      NotificationManager.error("Item should have name", "Error !");
      return;
    } else if (!quantity || +quantity < 1) {
      NotificationManager.error("Quantity should be atleast 1", "Error !");
      return;
    } else if (!price || +price < 1) {
      NotificationManager.error("Price should be minimum of $1", "Error !");
      return;
    } else if (!imageUrl) {
      NotificationManager.error(
        "Image is required, please upload an image",
        "Error !"
      );
      return;
    }
    const postURL = `${baseURL}api/inventory`;
    e.preventDefault();
    const payload = { itemName, price, quantity, imageUrl };
    axios
      .post(postURL, payload)
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
        setImageUrl("");
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
          color: "white",
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
            <label class="col-2">Quantity</label>
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
            <label class="col-2">Price</label>
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
