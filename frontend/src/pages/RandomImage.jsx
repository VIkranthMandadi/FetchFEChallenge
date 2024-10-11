import React, { useState } from "react";
import { Box, Button, Image, Grid, Heading } from "@chakra-ui/react";
import axios from "axios";

const RandomDogImages = () => {
  const [randomImages, setRandomImages] = useState([]);

  // Function to fetch random images from Dog API
  const fetchRandomImages = async () => {
    try {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random/3"
      );
      setRandomImages(response.data.message); // Set the images to state
    } catch (error) {
      console.error("Error fetching random images:", error);
    }
  };

  return (
    <Box p={6} textAlign="center">
      {/* Title */}
      <Heading as="h1" mb={6}>
        Generate Random Dog Images
      </Heading>

      {/* Button to fetch random dog images */}
      <Button colorScheme="teal" size="lg" onClick={fetchRandomImages}>
        Generate Random Images
      </Button>

      {/* Display the random images */}
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={6}
        mt={6}
      >
        {randomImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="Random Dog"
            boxSize="200px"
            objectFit="cover"
            borderRadius="lg"
          />
        ))}
      </Grid>
    </Box>
  );
};

export default RandomDogImages;
