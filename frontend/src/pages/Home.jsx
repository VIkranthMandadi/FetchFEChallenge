import React from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation to DogSelection page
  const handleDogSelection = () => {
    navigate("/dogselection");
  };

  // Function to handle navigation to RandomDogImages page
  const handleRandomImageGeneration = () => {
    navigate("/randomgeneration");
  };

  return (
    <Box textAlign="center" p={6}>
      {/* Title */}
      <Heading as="h1" mb={6}>
        Find Cute Dog Pictures
      </Heading>

      {/* Button to navigate to DogSelection page */}
      <Button colorScheme="teal" size="lg" onClick={handleDogSelection} mb={4}>
        Select Your Favorite Dogs
      </Button>

      <br />

      {/* Button to navigate to RandomDogImages page */}
      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleRandomImageGeneration}
      >
        Go to Random Image Generation
      </Button>
    </Box>
  );
};

export default Home;
