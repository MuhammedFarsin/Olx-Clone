import React, { useEffect, useState, useContext } from "react";
import "./View.css";
import { PostContext } from "../../store/PostContext";
// import { FirebaseContext } from "../../store/Context";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  // const { firestore } = useContext(FirebaseContext);

  useEffect(() => {
    if (postDetails) {
      const fetchUserDetails = async () => {
        const { userId } = postDetails;
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('id', '==', userId));
        const querySnapshot = await getDocs(userQuery);
        
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      };

      fetchUserDetails();
    }
  }, [postDetails]);

  if (!postDetails || !userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{new Date(postDetails.createdAt).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
