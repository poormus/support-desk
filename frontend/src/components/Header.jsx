import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/AuthSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  const onLogOut=()=>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  const notLoggedIn=<>
  <li>
    <Link to="/login">
      <FaSignInAlt />
      Login
    </Link>
  </li>

  <li>
    <Link to="/register">
      <FaUser />
      Register
    </Link>
  </li>
</>

const loggedIn=<li>
  <button className="btn" onClick={onLogOut}><FaSignOutAlt/>Log out</button>
</li>

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support desk</Link>
      </div>
      <ul>
        {user ? (
          loggedIn
        ) : (
          notLoggedIn
        )}
      </ul>
    </header>
  );

  
}

export default Header;
