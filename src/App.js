import { useState, useEffect, forwardRef } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import "./App.css";
import Navbar from "./components/Navbar";
import AllFacts from "./components/AllFacts";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function App() {
  const [facts, setFacts] = useState([]);
  const [randomFact, setRandomFact] = useState();
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [signal, setSignal] = useState(false);
  const [open, setOpen] = useState(false);

  // const url = "http://localhost:8080/facts/";
  const live_url = "https://deployment-recap.onrender.com/facts";

  useEffect(() => {
    const getFacts = async () => {
      const res = await fetch(live_url);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      }
      setFacts(data);
      setRandomFact(data && data[Math.floor(Math.random() * data.length)]);
    };
    getFacts();
  }, [signal]);

  const randomizer = () => {
    setRandomFact(facts && facts[Math.floor(Math.random() * facts.length)]);
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      setError("Write something first!");
      return;
    }

    await fetch("http://localhost:8080/facts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    setSignal(!signal);
    setOpen(true);
    setError(null);
  };

  const factForm = (
    <form onSubmit={handleSubmit}>
      <div className="text">
        <TextareaAutosize
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="empty textarea"
          placeholder="Fun fact here"
          style={{ width: 200, marginRight: 10 }}
        />
        <Button type="submit" variant="contained">
          add fact
        </Button>
      </div>
      {error && (
        <Alert
          style={{ justifyContent: "center" }}
          variant="filled"
          severity="error"
        >
          <strong>{error}</strong>
        </Alert>
      )}
      {
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Fun fact added!
          </Alert>
        </Snackbar>
      }
    </form>
  );

  return (
    <div className="App">
      <Typography variant="h3">Random fun facts!</Typography>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              randomFact={randomFact}
              error={error}
              randomizer={randomizer}
            />
          }
        />
        <Route
          path="/all"
          element={facts.length ? <AllFacts facts={facts} /> : "Loading..."}
        />
        <Route path="/new" element={factForm} />
      </Routes>
    </div>
  );
}

export default App;
