import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import Viewpost from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";
import "./App.css";

function App() {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<Viewpost />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
