import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";


function Header() {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext); // Corrected to use 'auth' instead of 'firebase'
  const navigate = useNavigate();

  const handleLogin = () => {
    if(!user){
      navigate("/login")
    }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span onClick={handleLogin}>{user ? user.displayName : "Login"}</span>
          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              auth.signOut();
              navigate("/login");
            }}
          >
            Logout
          </span>
        )}
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
