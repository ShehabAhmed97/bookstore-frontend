import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import apiClient from "../../apiClient";

export function AddBook() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [touched, setTouched] = useState(false);

  const navigate = useNavigate();

  const handleChangeName = (e) => {
    if (!touched) setTouched(true);

    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    if (!touched) setTouched(true);

    setPrice(Number(e.target.value));
  };

  const handleSubmit = () => {
    apiClient.post("/book", { name: name, price: price }).then(({ data }) => {
      if (data.responseCode === "SUCCESS") navigate("/");
    });
  };

  return (
    <div className="py-3 px-3">
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Book Name"
          type="text"
          value={name}
          onChange={handleChangeName}
        />
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        <Input
          id="price"
          name="price"
          placeholder="Price"
          type="number"
          value={price}
          onChange={handleChangePrice}
        />
      </FormGroup>
      <Button
        color="primary"
        size="sm"
        disabled={!touched}
        onClick={handleSubmit}
      >
        Add
      </Button>
    </div>
  );
}
