import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  List,
  Spinner,
} from "reactstrap";
import apiClient from "../../apiClient";

export function Books() {
  const [booksList, setBooksList] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  const deleteBook = (e) => {
    const id = e.target.id;

    apiClient.delete(`/book/${id}`).then((data) => {
      console.log(data.data.message);

      if (data.data.responseCode === "SUCCESS") {
        setBooksList((prev) => prev.filter((book) => book._id !== id));

        //apiClient.get("/book").then(({ data }) => {
        //  if (data.responseCode === "SUCCESS") setBooksList(data.result);
        //});
      }
    });
  };

  useEffect(() => {
    apiClient.get("/book").then(({ data }) => {
      setIsloading(false);
      if (data.responseCode === "SUCCESS") setBooksList(data.result);
      else setError(data.message);
    });
  }, []);

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <Spinner />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Button color="primary" size="sm" className="mb-2">
        <Link to="add-new">Add New</Link>
      </Button>
      <List type="unstyled">
        {booksList.map((book) => (
          <Card
            style={{
              width: "18rem",
            }}
            key={book._id}
          >
            <CardBody>
              <CardTitle tag="h5">{book.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                ${book.price}
              </CardSubtitle>

              <div className="d-flex">
                <Button size="sm" color="info" className="me-2">
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  id={book._id}
                  onClick={deleteBook}
                >
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </List>
    </div>
  );
}
