import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <NavLink to="/" className={`mr10 tdn `}>
          <img src={logo} alt="logo du blog" />
        </NavLink>
      </div>
      {user ? (
        <ul>
        <NavLink className={`mr10 tdn `}>
          <button className="mr10 btn btn-primary-reverse">
            <span onClick={() => setUser(null)}>Logout</span>
          </button>
        </NavLink>
        <NavLink to="/profile" className={` tdn mr10 `}>
          <button className="mr10 btn btn-primary">
            <span>Profile</span>
          </button>
        </NavLink>
      </ul>  
      ) : (
        <ul>
          <NavLink end to="/login" className={`mr10 tdn `}>
            <button className="mr10 btn btn-primary-reverse">
              <span>Login</span>
            </button>
          </NavLink>
          <NavLink to="/register" className={` tdn mr10 `}>
            <button className="mr10 btn btn-primary">
              <span>Register</span>
            </button>
          </NavLink>
        </ul>
      )}
    </header>
  );
}
