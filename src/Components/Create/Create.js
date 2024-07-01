import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Create = () => {
  const { storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (storage) {
      const storageRef = ref(storage, `/image/${image.name}`);

      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("File uploaded:", url);

          const db = getFirestore();
          addDoc(collection(db, "products"), {
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: new Date().toISOString(),
          });
          navigate("/home");
        });
      });
    } else {
      console.error("Firebase storage is not initialized");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="fname"
          name="Name"
          defaultValue="John"
        />
        <br />
        <label htmlFor="fname">Category</label>
        <br />
        <input
          className="input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="fname"
          name="category"
          defaultValue="John"
        />
        <br />
        <label htmlFor="fname">Price</label>
        <br />
        <input
          className="input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="fname"
          name="Price"
        />
        <br />
        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ""}
        />
        <br />
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
        />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
