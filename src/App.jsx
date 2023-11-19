import "./App.css";
import Chatbot from "./Chatbot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./login";
import SignupForm from "./Signup";
function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
      }}
    >
      <h1 style={{ textAlign: "center", display: "block" }}>
        Chat Bot for Indian Budget
      </h1>
      {sessionStorage.getItem("user") != null && (
        <button onClick={sessionStorage.removeItem("user")}> Signout</button>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
