import { Link, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    error,
  } = useFetch(`http://localhost:8000/blogs/${id}`);

  const handleDelete = () => {
    try {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: "DELETE",
      }).then(() => {
        console.log("Blog deleted successfully");
        // Optionally, you can redirect or update the state after deletion
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="blog-details">
      {error && <div> {error}</div>}
      {isLoading && <div>loading...</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.content}</div>
          <Link className="button" to={"/"} onClick={handleDelete}>
            Delete Blog
          </Link>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
