import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Grid,
  Image,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

const App = () => {
  const [breeds, setBreeds] = useState({});
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the list of dog breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");
        setBreeds(response.data.message);
      } catch (error) {
        console.error("Error fetching the breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  // Fetch images when breeds are selected
  useEffect(() => {
    const fetchImages = async () => {
      if (selectedBreeds.length === 0) {
        setImages([]);
        return;
      }

      setLoading(true);
      try {
        const promises = selectedBreeds.map((breed) =>
          axios.get(`https://dog.ceo/api/breed/${breed}/images`)
        );
        const results = await Promise.all(promises);
        const allImages = results.flatMap((result) => result.data.message);
        setImages(allImages);
      } catch (error) {
        console.error("Error fetching breed images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [selectedBreeds]);

  return (
    <Box p={6}>
      <Heading as="h1" mb={6}>
        Dog Breed Gallery
      </Heading>

      {/* Breed selection */}
      <CheckboxGroup onChange={setSelectedBreeds}>
        {Object.keys(breeds).map((breed) => (
          <Checkbox key={breed} value={breed} mr={4} mb={4}>
            {breed.charAt(0).toUpperCase() + breed.slice(1)}
          </Checkbox>
        ))}
      </CheckboxGroup>

      {/* Loading spinner */}
      {loading && <Spinner size="xl" color="teal.500" mt={6} />}

      {/* Image gallery */}
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={6}
        mt={6}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="Dog"
            boxSize="200px"
            objectFit="cover"
            borderRadius="lg"
          />
        ))}
      </Grid>
    </Box>
  );
};

export default App;
