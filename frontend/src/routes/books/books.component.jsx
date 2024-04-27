import axios from "axios";
import { useEffect, useState } from "react";

import Spinner from "../../components/spinner/spinner.component";
import "./books.component.css";

// React Notification
import { NotificationManager } from "react-notifications";

const Books = () => {
  const [booksCollection, setBooksCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const booksApiUrl = "https://all-books-api.p.rapidapi.com/getBooks";
    const headers = {
      "X-RapidAPI-Key": "eaed3af1eemshe894b69298432ccp10d934jsn9fa0b2a61780",
      "X-RapidAPI-Host": "all-books-api.p.rapidapi.com",
    };
    axios(booksApiUrl, { headers })
      .then((response) => {
        const { data } = response;
        setBooksCollection(data);
        setLoading(false);
        NotificationManager.success(
          "Books collection retrieved!",
          "Successful!",
          2000
        );
      })
      .catch((err) => {
        setLoading(false);
        NotificationManager.error(
          "Error getting data for books collection",
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
    <div className="books">
      <div class="container mt-5">
        <h1> Third Party Api - Books Collection</h1>
        <div>{spinnerContent}</div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>TITLE</th>
              <th>AUTHOR</th>
              <th>PUBLISHER</th>
              <th>BUY AT AMAZON</th>
            </tr>
          </thead>
          <tbody>
            {booksCollection.map((book) => {
              return (
                <tr key={book.bookIsbn}>
                  <td>
                    <img
                      src={book.bookImage}
                      width="90"
                      height="90"
                      alt="ima"
                    />
                  </td>
                  <td>{book.bookTitle}</td>
                  <td>{book.bookAuthor}</td>
                  <td>{book.bookPublisher}</td>
                  <td>
                    <a href={book.amazonBookUrl}> Buy</a>
                  </td>
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
