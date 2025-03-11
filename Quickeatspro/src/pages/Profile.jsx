import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Box, Typography, Button, CircularProgress, Card, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser(userDocSnap.data());
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F5DC", display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
      <Card sx={{ width: 400, textAlign: "center", padding: 4, backgroundColor: "#DCE4C9", boxShadow: 5, borderRadius: "12px" }}>
        
        {/* Profile Avatar */}
        <Avatar sx={{ width: 80, height: 80, margin: "0 auto", backgroundColor: "#E07B39" }}>
          <PersonIcon sx={{ fontSize: 50, color: "white" }} />
        </Avatar>

        {/* Profile Information */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#E07B39", mt: 2 }}>
          {user?.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#5A5A5A", mb: 2 }}>
          {user?.email}
        </Typography>

        <Box sx={{ textAlign: "left", mt: 2 }}>
          <Typography variant="body1" sx={infoStyle}><strong>Roll No:</strong> {user?.rollNo}</Typography>
          <Typography variant="body1" sx={infoStyle}><strong>Department:</strong> {user?.department}</Typography>
          <Typography variant="body1" sx={infoStyle}><strong>Section:</strong> {user?.section}</Typography>
          <Typography variant="body1" sx={infoStyle}><strong>Year:</strong> {user?.year}</Typography>
        </Box>

        {/* Logout Button */}
        <Button variant="contained" sx={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </Box>
  );
}

// Styles
const infoStyle = {
  color: "#5A5A5A",
  fontSize: "16px",
  marginBottom: "8px",
};

const logoutButtonStyle = {
  backgroundColor: "#E07B39",
  color: "white",
  fontWeight: "bold",
  marginTop: "20px",
  padding: "10px 20px",
  width: "100%",
  borderRadius: "8px",
  "&:hover": { backgroundColor: "#B6A28E" },
};

export default Profile;
