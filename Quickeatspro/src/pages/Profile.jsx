    import React, { useEffect, useState } from "react";
    import { auth, db } from "../firebase/config"; // Ensure firebase is properly imported
    import { doc, getDoc } from "firebase/firestore";
    import { onAuthStateChanged, signOut } from "firebase/auth";
    import { Box, Typography, Button, CircularProgress } from "@mui/material";
    import { useNavigate } from "react-router-dom";

    function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Track authentication state
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            // Fetch user data from Firestore
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
            setUser(userDocSnap.data());
            }
        } else {
            navigate("/login"); // Redirect to login if not authenticated
        }
        setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login"); // Redirect to login after logout
    };

    if (loading) return <CircularProgress />; // Show loading spinner while fetching data

    return (
        <Box sx={{ textAlign: "center", padding: "20px", minHeight: "100vh", backgroundColor: "#F5F5DC" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#E07B39" }}>Profile</Typography>
        {user ? (
            <Box sx={{ marginTop: "20px", backgroundColor: "#DCE4C9", padding: "20px", borderRadius: "10px", boxShadow: 3 }}>
            <Typography variant="h6"><strong>Name:</strong> {user.name}</Typography>
            <Typography variant="h6"><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="h6"><strong>Roll No:</strong> {user.rollNo}</Typography>
            <Typography variant="h6"><strong>Department:</strong> {user.department}</Typography>
            <Typography variant="h6"><strong>Section:</strong> {user.section}</Typography>
            <Typography variant="h6"><strong>Year:</strong> {user.year}</Typography>
            <Button sx={{ marginTop: "15px", backgroundColor: "#E07B39", color: "white", "&:hover": { backgroundColor: "#B6A28E" } }} onClick={handleLogout}>
                Logout
            </Button>
            </Box>
        ) : (
            <Typography variant="h6">No user data found.</Typography>
        )}
        </Box>
    );
    }

    export default Profile;
