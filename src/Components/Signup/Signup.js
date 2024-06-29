  import React, { useState, useContext } from "react";
  import Logo from "../../olx-logo.png";
  import "./Signup.css";
  import { FirebaseContext } from "../../store/Context";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
  } from "firebase/auth";
  import { useNavigate } from "react-router-dom";
  import { getFirestore, collection, addDoc } from "firebase/firestore";

  export default function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const { firebase } = useContext(FirebaseContext);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const auth = getAuth(firebase);
      const db = getFirestore(firebase);

      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: username });
        await addDoc(collection(db, "users"), {
          id: result.user.uid,
          username: username,
          phone: number,
        });
        navigate("/login");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    return (
      <div>
        <div className="signupParentDiv">
          <img width="200px" height="200px" src={Logo} alt="Logo"></img>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <br />
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="name"
            />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
            />
            <br />
            <label htmlFor="phone">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              id="phone"
              name="phone"
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
            />
            <br />
            <br />
            <button>Signup</button>
          </form>
          <a href="/login">Login</a>
        </div>
      </div>
    );
  }
