import React, { useState, useEffect, useContext } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Context";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import { PostContext } from "../../store/PostContext";

function Posts() {
  const [products, setProducts] = useState([]);
  const { firestore } = useContext(FirebaseContext);
  const {setPostDetails} = useContext(PostContext)

  const navigate = useNavigate()

  const handleClickCard = (product) => {
    setPostDetails(product)
    navigate('/view')
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, 'products');
        const snapshot = await getDocs(productsCollection);
        const allProducts = snapshot.docs.map((product) => ({
          id: product.id,
          ...product.data(),
        }));
        setProducts(allProducts);
        console.log(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [firestore]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id} onClick={() => handleClickCard(product)}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
