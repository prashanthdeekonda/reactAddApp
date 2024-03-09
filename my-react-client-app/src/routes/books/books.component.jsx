import axios from "axios";
import { useEffect, useState } from "react";

const Books = () => {
  const [booksCollection, setBooksCollection] = useState([]);

  useEffect(() => {
    const url = "https://softwium.com/api/books";
    axios(url).then((response) => {
      const { data } = response;
      setBooksCollection(data);
    });
  }, []);

  return (
    <div>
      <div class="container mt-5">
        <h1> Third Party Api - Books Collection</h1>
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
                <tr>
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
