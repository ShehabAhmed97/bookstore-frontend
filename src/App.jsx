import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Books } from "../Pages/Books/Books";
import { Navbar, NavbarBrand } from "reactstrap";
import { AddBook } from "../Pages/AddBook/AddBook";

function App() {
  return (
    <>
      <Navbar color="dark" dark>
        <NavbarBrand>
          <Link to="/">BookStore</Link>
        </NavbarBrand>
      </Navbar>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add-new" element={<AddBook />} />
      </Routes>
    </>
  );
}

export default App;
