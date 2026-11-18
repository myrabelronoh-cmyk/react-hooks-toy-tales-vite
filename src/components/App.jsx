import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const TOYS_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchToys() {
      try {
        const response = await fetch(TOYS_URL);
        if (!response.ok) {
          throw new Error(`Unable to load toys (${response.status})`);
        }
        setToys(await response.json());
      } catch (error) {
        setError(error.message);
      }
    }

    fetchToys();
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  async function handleCreateToy(toy) {
    try {
      setError("");
      const response = await fetch(TOYS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toy),
      });
      if (!response.ok) {
        throw new Error(`Unable to create toy (${response.status})`);
      }
      const createdToy = await response.json();
      setToys((currentToys) => [...currentToys, createdToy]);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }

  async function handleLikeToy(toy) {
    try {
      setError("");
      const response = await fetch(`${TOYS_URL}/${toy.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: toy.likes + 1 }),
      });
      if (!response.ok) {
        throw new Error(`Unable to like toy (${response.status})`);
      }
      const updatedToy = await response.json();
      setToys((currentToys) =>
        currentToys.map((currentToy) =>
          currentToy.id === updatedToy.id ? updatedToy : currentToy,
        ),
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDonateToy(toy) {
    try {
      setError("");
      const response = await fetch(`${TOYS_URL}/${toy.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Unable to donate toy (${response.status})`);
      }
      setToys((currentToys) =>
        currentToys.filter((currentToy) => currentToy.id !== toy.id),
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onCreateToy={handleCreateToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {error ? <p role="alert">{error}</p> : null}
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDonateToy={handleDonateToy}
      />
    </>
  );
}

export default App;
