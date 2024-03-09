import axios from "axios";
import { useEffect, useState } from "react";

import Spinner from "../../components/spinner/spinner.component";
import "./books.component.css";

const Books = () => {
  const [booksCollection, setBooksCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://softwium.com/api/books";
    axios(url)
      .then((response) => {
        const { data } = response;
        setBooksCollection(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error getting data for books collection");
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
        <h1> Third Party Api - Books Collection</h1>
        <div>{spinnerContent}</div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>ISBN</th>
              <th>TITLE</th>
              <th>AUTHORS</th>
            </tr>
          </thead>
          <tbody>
            {booksCollection.map((book) => {
              return (
                <tr key={book.id}>
                  <th>{book.id}</th>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>{book.authors.join(", ")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
