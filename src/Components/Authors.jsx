import { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import Closed from "./Closed";

const Authors = () => {
  const {
    data: authors,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/authors");

  const [authorsList, setAuthorsList] = useState([]);

  useEffect(() => {
    if (Array.isArray(authors)) {
      setAuthorsList(authors);
    }
  }, [authors]);

  const handleDeleteAuthor = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/authors/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAuthorsList((prev) => prev.filter((author) => author.id !== id));
      } else {
        console.error("Failed to delete author");
      }
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return (
    <div className="about">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <Closed />
          ) : (
            <>
              <h2>Authors</h2>
              <p>
                Here we keep our authors locked and <span>SAVE</span>
              </p>
              <div className="authors">
                {authorsList.map((author) => (
                  <div key={author.id} className="author">
                    <div className="left">
                      <h3>{author.name}</h3>
                      <p>Author ID: {author.id}</p>
                    </div>
                    <div className="right">
                      <button onClick={() => handleDeleteAuthor(author.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Authors;
