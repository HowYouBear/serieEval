import { useState } from "react";
// import { useLoaderData } from "react-router-dom";
import { getUser } from "../../apis/users";
import { UserContext } from "../../context/UserContext";

export default function UserProvider({ children }) {
  //   const initialUser = useLoaderData();
  const [user, setUser] = useState(null);

  async function signinS(id) {
    const newUser = await getUser(id);
    setUser(newUser);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signinS,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
