import { useUser } from "../context/UserContext";
import { useState } from "react";

const LoginBox = () => {
  const { setUsername } = useUser();
  const [input, setInput] = useState("");

  const handleLogin = () => {
    if (input.trim()) {
      console.log("login with username:", input.trim()); //for debug
      setUsername(input.trim());
    }
  };

  return (
    <div className="login-box">
      <input
        type="text"
        placeholder="Enter username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginBox;
