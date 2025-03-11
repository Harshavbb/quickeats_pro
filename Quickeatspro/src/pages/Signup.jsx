import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        rollNo,
        department,
        section,
        year,
        uid: user.uid,
      });
  
      alert("Signup successful! Please log in.");
      navigate("/"); // Redirect to login instead of menu
    } catch (err) {
      setError(err.message);
    }
  };
  
  
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" sx={{ textAlign: "center", mt: 5 }}>Signup</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <TextField label="Full Name" fullWidth margin="normal" onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" type="email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Roll No" fullWidth margin="normal" onChange={(e) => setRollNo(e.target.value)} />
      <TextField label="Department" fullWidth margin="normal" onChange={(e) => setDepartment(e.target.value)} />
      <TextField label="Section" fullWidth margin="normal" onChange={(e) => setSection(e.target.value)} />
      <TextField label="Year" fullWidth margin="normal" onChange={(e) => setYear(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />

      <Button variant="contained" fullWidth onClick={handleSignup}>Signup</Button>

      <Typography sx={{ textAlign: "center", mt: 2 }}>
        Already have an account? <a href="/">Login</a>
      </Typography>
    </Container>
  );
}

export default Signup;
