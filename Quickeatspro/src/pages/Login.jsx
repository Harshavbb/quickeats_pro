import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { Box, Card, TextField, Button, Typography, CircularProgress, Link } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔹 Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;
        navigate(userRole === "admin" ? "/admindashboard" : "/menu");
      } else {
        setError("User data not found.");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        {/* Left Side - Image */}
        <Box sx={styles.imageContainer}>
          <img 
            src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?t=st=1741714990~exp=1741718590~hmac=9569c70400d0090cb2ae359ac7676ab721e5de999aa3bdf7ed6a47f2e7f66dcf&w=900" // Replace with your image URL
            alt="Login Visual"
            style={styles.image}
          />
        </Box>

        {/* Right Side - Form */}
        <Box sx={styles.formContainer}>
          <Typography variant="h5" sx={styles.title}>
            Welcome Back 👋
          </Typography>
          {error && <Typography sx={styles.error}>{error}</Typography>}

          <form onSubmit={handleLogin} style={styles.form}>
            <TextField 
              type="email" 
              label="Email" 
              variant="filled" 
              fullWidth 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              sx={styles.input}
            />
            <TextField 
              type="password" 
              label="Password" 
              variant="filled" 
              fullWidth 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              sx={styles.input}
            />
            <Button type="submit" variant="contained" sx={styles.button} disabled={loading}>
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
            </Button>
          </form>

          {/* Sign Up Section */}
          <Typography variant="body2" sx={styles.signupText}>
            Don't have an account? 
            <Link onClick={() => navigate("/signup")} sx={styles.signupLink}> Sign up</Link>
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
    backgroundColor: "#FAF3E0", // Soft creamy background
  },
  card: {
    display: "flex",
    width: 750,
    height: 420,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: 5,
  },
  imageContainer: {
    width: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  formContainer: {
    width: "50%",
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
    gap: "15px",
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
    "&:hover": { backgroundColor: "#B6A28E" },
  },
  signupText: {
    textAlign: "center",
    marginTop: "15px",
    color: "#666",
  },
  signupLink: {
    color: "#E07B39",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "5px",
    "&:hover": { textDecoration: "underline" },
  },
};

export default Login;
