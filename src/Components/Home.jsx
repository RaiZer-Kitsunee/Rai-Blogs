import useFetch from "../Hooks/useFetch";
import BlogList from "./Blogs_List";

const Home = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="home">
      {error && <div>Error: {error}</div>}
      {isLoading && <div>Loading...</div>}
      {blogs && (
        <>
          <BlogList blogs={blogs} title="All Blogs" />
          <BlogList
            blogs={blogs.filter((blog) => blog.author === "Rai")}
            title="Rai Blogs"
          />
        </>
      )}
    </div>
  );
};

export default Home;
