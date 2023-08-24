import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import apiClient from "../../apiClient";

export function EditBook() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [touched, setTouched] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleChangeName = (e) => {
    if (!touched) setTouched(true);

    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    if (!touched) setTouched(true);

    setPrice(Number(e.target.value));
  };

  const handleSubmit = () => {
    apiClient
      .put(`/book/${params.id}`, { name: name, price: price })
      .then(({ data }) => {
        if (data.responseCode === "SUCCESS") navigate("/");
      });
  };

  useEffect(() => {
    apiClient.get(`/book/${params.id}`).then(({ data }) => {
      if (data.responseCode === "SUCCESS") {
        setName(data.result.name);
        setPrice(data.result.price);
      }
    });
  }, [params.id]);

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
        Update
      </Button>
    </div>
  );
}
