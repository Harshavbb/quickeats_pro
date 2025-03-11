import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { Box, Card, TextField, Button, Typography, CircularProgress, Link } from "@mui/material";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        rollNo,
        department,
        section,
        year,
        uid: user.uid,
        role: "user", // Default role
      });

      await signOut(auth);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        {/* Left Side - Image */}
        <Box sx={styles.imageContainer}>
          <img 
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?t=st=1741715462~exp=1741719062~hmac=77a1d32316e81640156e9044f0458dcba8c308119d410bc4d969099379ff2150&w=900" // Replace with your image URL
            alt="Signup Visual"
            style={styles.image}
          />
        </Box>

        {/* Right Side - Form */}
        <Box sx={styles.formContainer}>
          <Typography variant="h5" sx={styles.title}>Create an Account</Typography>
          {error && <Typography sx={styles.error}>{error}</Typography>}

          <form style={styles.form}>
            <TextField label="Full Name" variant="filled" fullWidth onChange={(e) => setName(e.target.value)} sx={styles.input} />
            <TextField label="Email" type="email" variant="filled" fullWidth onChange={(e) => setEmail(e.target.value)} sx={styles.input} />
            <TextField label="Roll No" variant="filled" fullWidth onChange={(e) => setRollNo(e.target.value)} sx={styles.input} />
            <TextField label="Department" variant="filled" fullWidth onChange={(e) => setDepartment(e.target.value)} sx={styles.input} />
            <TextField label="Section" variant="filled" fullWidth onChange={(e) => setSection(e.target.value)} sx={styles.input} />
            <TextField label="Year" variant="filled" fullWidth onChange={(e) => setYear(e.target.value)} sx={styles.input} />
            <TextField label="Password" type="password" variant="filled" fullWidth onChange={(e) => setPassword(e.target.value)} sx={styles.input} />

            <Button type="button" variant="contained" sx={styles.button} onClick={handleSignup} disabled={loading}>
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Signup"}
            </Button>
          </form>

          {/* Login Section */}
          <Typography variant="body2" sx={styles.loginText}>
            Already have an account? 
            <Link onClick={() => navigate("/login")} sx={styles.loginLink}> Login</Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#FAF3E0",
  },
  card: {
    display: "flex",
    width: 800,
    height: "auto",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: 5,
  },
  imageContainer: {
    width: "40%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  formContainer: {
    width: "60%",
    padding: "35px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#E07B39",
    marginBottom: "15px",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    "& .MuiFilledInput-root": {
      backgroundColor: "#F5F5F5",
      borderRadius: "8px",
    },
    "& .MuiFilledInput-root:focus": {
      backgroundColor: "#FFFFFF",
    },
  },
  button: {
    backgroundColor: "#E07B39",
    color: "white",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    "&:hover": { backgroundColor: "#B6A28E" },
  },
  loginText: {
    textAlign: "center",
    marginTop: "15px",
    color: "#666",
  },
  loginLink: {
    color: "#E07B39",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "5px",
    "&:hover": { textDecoration: "underline" },
  },
};

export default Signup;
