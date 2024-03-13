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
    const booksApiUrl = "https://books-api7.p.rapidapi.com/books/find/genres";
    const params = { "genres[]": ["fantasy", "fiction", "Classics"] };
    const headers = {
      "X-RapidAPI-Key": "eaed3af1eemshe894b69298432ccp10d934jsn9fa0b2a61780",
      "X-RapidAPI-Host": "books-api7.p.rapidapi.com",
    };
    axios(booksApiUrl, { params, headers })
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
              <th>GENRE</th>
            </tr>
          </thead>
          <tbody>
            {booksCollection.map((book) => {
              const author = `${book.author.first_name} ${book.author.last_name}`;
              return (
                <tr key={book._id}>
                  <td>
                    <img src={book.cover} width="90" height="90" alt="ima" />
                  </td>
                  <td>{book.title}</td>
                  <td>{author}</td>
                  <td>{book.genres.join(", ")}</td>
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
