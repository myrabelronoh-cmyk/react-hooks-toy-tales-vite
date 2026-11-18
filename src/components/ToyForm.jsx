import React, { useState } from "react";

function ToyForm({ onCreateToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const created = await onCreateToy({ name, image, likes: 0 });
    if (created) {
      setName("");
      setImage("");
    }
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          required
        />
        <br />
        <button type="submit" name="submit" className="submit">
          Create New Toy
        </button>
      </form>
    </div>
  );
}

export default ToyForm;
