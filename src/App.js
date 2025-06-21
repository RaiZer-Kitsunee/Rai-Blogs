import About from "./Components/About";
import BlogDetails from "./Components/Blog_Details";
import Create from "./Components/Create";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>  
      <div className="App">
        <NavBar/>
        <div className="holder"></div>
        <div className="content">
            <Routes>
              <Route exact path="/" Component={Home}/>
              <Route path="/create" Component={Create}/>
              <Route path="/blog/:id" Component={BlogDetails}/>
              <Route path="/about" Component={About}/>
              <Route path="*" Component={() => <div>404 Not Found</div>} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
