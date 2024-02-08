import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());

    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/users.json`, formData)
      .then((response) => {
        console.log(response.data);
        loginUser(params);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  // Function to log in the user after successful signup
  const loginUser = (credentials) => {
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/sessions.json`, {
        email: credentials.email,
        password: credentials.password,
      })
      .then((response) => {
        // Assuming response.data contains the JWT token
        console.log(response.data);
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.jwt}`;
        window.location.href = "/"; // or use a router to navigate
      })
      .catch((error) => {
        console.error("Login after signup failed:", error.response);
        // Handle login failure (optional)
      });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Username: <input name="username" type="text" />
        </div>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <div>
          Password confirmation: <input name="password_confirmation" type="password" />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
