import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import Closed from "./Closed";

const Create = () => {
  const navigate = useNavigate();

  // Importing necessary hooks and components
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Rai");
  const [toggle, setToggle] = useState(false);

  const {
    data: authors,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/authors");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing the default form submission behavior

    const blog = { title, content, author };

    // Sending a POST request to the server to add a new blog
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      }).then(() => {
        console.log("New blog added successfully");
        navigate("/");
      });
      if (!authors.some((a) => a.name === author)) {
        fetch("http://localhost:8000/authors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: author }),
        });
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  // hnadleToggle function to toggle the author selection
  const handleToggle = () => {
    setToggle(!toggle);
    setAuthor(""); // Resetting author when toggling
    if (toggle) {
      setAuthor("Rai"); // Default author when toggled off
    }
  };

  return (
    <div className="create">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <Closed />
          ) : (
            <>
              <h2>Add New Blogs Here</h2>
              <form>
                <label>Blog title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="title"
                />

                <label>Blog Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Content"
                ></textarea>

                <label>Blog Author</label>
                <div className="author-selection">
                  {!toggle ? (
                    <>
                      <select
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                      >
                        {authors ? (
                          authors.map((author) => {
                            return (
                              <option key={author.id} value={author.name}>
                                {author.name}
                              </option>
                            );
                          })
                        ) : (
                          <>
                            <option value="anonymous">anonymous</option>
                          </>
                        )}
                      </select>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        placeholder="Author Name"
                      />
                    </>
                  )}
                  <input
                    className="check"
                    type="checkbox"
                    value={toggle}
                    onChange={handleToggle}
                  />
                </div>

                <button type="submit" onClick={handleSubmit}>
                  Add Blog
                </button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Create;
