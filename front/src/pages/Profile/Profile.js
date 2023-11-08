import { useContext } from "react";
import image from "../../assets/images/no_avatar.jpg";
import { UserContext } from "../../context/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);
  console.log("profile", user);

  return (
    <div className="flex-fill">
      <h1>Profile</h1>
      {user && user.avatar ? (
        <div>
          <img src={`http://localhost:8000/${user.avatar}`} alt="avatar" />
        </div>
      ) : (
        <div>
          <img style={{ width: "200px" }} src={image} alt="no_avatar" />
        </div>
      )}
    </div>
  );
}
