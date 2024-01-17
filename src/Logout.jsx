import axios from "axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  };

  const userid = localStorage.getItem("user_id");

  if (!userid) {
    // If userid return null or an alternative component
    return null;
  }

  return (
    <a href="#" onClick={handleClick}>
      Logout
    </a>
  );
}
