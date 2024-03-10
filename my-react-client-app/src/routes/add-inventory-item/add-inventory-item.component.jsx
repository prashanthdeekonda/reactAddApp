import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// React Notification
import { NotificationManager } from "react-notifications";

const AddInventoryItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const [showImage, setShowImage] = useState();

  const [item, setItem] = useState({
    itemName: "",
    price: 0,
    quantity: 0,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // const file = {
    //   file: e.target.files[0],
    //   name: e.target.files[0].name,
    // };
    console.log("dd", file);
    setImageFile(file);
    console.log(e.target.files[0]);

    // get secure url from our server
    axios
      .get("http://localhost:5000/api/s3/s3Url")
      .then((response) => {
        const { data } = response;
        console.log(data.url);

        // post the image direclty to the s3 bucket

        const headers = {
          "Content-Type": "multipart/form-data",
        };
        axios.put(data.url, file, { headers }).then((res) => {
          console.log("inseted");
          const imageUrl = data.url.split("?")[0];
          console.log("imagehrl", imageUrl);
          setShowImage(imageUrl);
          setImageUrl(imageUrl);
        });

        // await fetch(url, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //   },
        //   body: file
        // })
      })
      .catch((err) => {
        // setLoading(false);
        // NotificationManager.error(
        //   "Error getting data for Inventory collection",
        //   "Error !"
        // );
      });
  };

  // const onItemChange = (e) => {

  //   const  data = {
  //       ...item,
  //       [e.target.name]: e.target.value,
  //     };
  //   }
  //   setItem(data);
  //   console.log(item);
  // };

  const { state } = useLocation();
  console.log("add inventory", state);

  const navigate = useNavigate();

  const addInventoryItem = (e) => {
    e.preventDefault();
    const obj = {
      name: itemName,
      price: price,
      quantity: quantity,
      imageFile: imageFile,
    };
    NotificationManager.success("added succesfully!", "Successful!", 2000);
    navigate("/inventory", { state: obj });
  };

  return (
    <div>
      <div class="container mt-5" style={{ width: "500px" }}>
        <h1>Add Inventory Item</h1>
        <form noValidate onSubmit={addInventoryItem}>
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
              onChange={(e) => e.target.value}
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
              onChange={handleImageUpload}
            ></input>
          </div>

          <div class=" text-start d-flex offset-md-2 mb-5">
            <button type="button" class="btn btn-primary">
              Add To Inventory
            </button>
          </div>
        </form>
      </div>
      <img src={showImage} alt="sh" />
    </div>
  );
};

export default AddInventoryItem;
