import { useState } from "react";
import taylorSwift from "./assets/taylor.jpg";

export function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ textAlign: "center" }}
    >
      {isHovered ? <img src={taylorSwift} alt="Taylor Swift" style={{ width: "18px", height: "18px" }} /> : <p> 🏈 </p>}
    </footer>
  );
}
