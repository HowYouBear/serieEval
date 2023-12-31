export async function signin(credentials) {
  console.log("connection en cours avec les identifiants: ", credentials);
  try {
    const response = await fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const body = await response.json();
    console.log("réponse connexion: ", body);
    if (response.ok) {
      return body;
    } else {
      if (body) {
        throw body;
      } else {
        throw new Error("Error connection");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function signup(values) {
  try {
    const response = await fetch("http://localhost:8000/api/users/register", {
      method: "POST",
      body: values,
    });
    const body = await response.json();
    if (response.ok) {
      return body;
    } else {
      if (body) {
        throw body;
      } else {
        throw new Error("Error register");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(id) {
  const response = await fetch(`http://localhost:8000/api/users/getUser/${id}`);
  return response.json();
}
