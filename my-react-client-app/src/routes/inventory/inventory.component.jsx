import "./inventory.css";
import { useNavigate, useLocation } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();

  const addInventoryItemPage = () => {
    navigate("add-item", { state: { id: 7, color: "green" } });
  };

  const updateInventoryItem = (item) => {
     navigate("update-item", { state: item });
  };

  const deleteInventoryItem = () => {};

  const { state } = useLocation();
  console.log('inventory', state);

  const items = [
    {
      imageUrl: "https://robohash.org/1?set=set2&size=90x90",
      itemName: "Shoes",
      price: "20",
      quantity: "50",
    },
    {
      imageUrl: "https://robohash.org/2?set=set2&size=90x90",
      itemName: "Belts",
      price: "40",
      quantity: "70",
    },
    {
      imageUrl: "https://robohash.org/3?set=set2&size=90x90",
      itemName: "Glasses",
      price: "60",
      quantity: "80",
    },
    {
      imageUrl: "https://robohash.org/4?set=set2&size=90x90",
      itemName: "Fi",
      price: "90",
      quantity: "75",
    },
  ];
  return (
    <div>
      <div class="container mt-5">
        <h1>Inventory Mangement</h1>
        <span> Manage inventory items. Add, update, and delete items.</span>
        <div style={{ "text-align": "center" }} className="mb-3 mt-3">
          <button
            type="button"
            class="btn btn-primary"
            onClick={addInventoryItemPage}
          >
            Create new Inventory Item
          </button>
        </div>
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
                        <td style={{cursor: "pointer"}}>
                          <i
                            class="bi bi-pencil-square"
                            onClick={() => updateInventoryItem(item)}
                          >Update</i>
                          <i
                            class="bi bi-trash3 px-5"
                            onClick={deleteInventoryItem}
                          >Delete</i>
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
