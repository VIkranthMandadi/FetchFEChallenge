import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { Box, Button } from "@chakra-ui/react";
import RandomDogImages from "./pages/RandomImage";

import DogSelection from "./pages/DogSelection";
const App = () => {

  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Hook to navigate back

  // Check if the current path is not the homepage ("/")
  const showBackButton = location.pathname !== "/";

  return (
      <Box p={6} position="relative">
        {/* Conditionally render Back Button */}
        {showBackButton && (
          <Button
            colorScheme="teal"
            onClick={() => navigate(-1)} // Navigate back
            position="absolute"
            top="10px"
            left="10px"
          >
            Back
          </Button>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dogselection" element={<DogSelection />} />
          <Route path="/randomgeneration" element={<RandomDogImages />} />
        </Routes>
      </Box>
  );
};

export default App;
