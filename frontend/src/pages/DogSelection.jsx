import React, { useState, useEffect } from "react";
import { Box, Grid, Image, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import Select from "react-select";

const DogSelection = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the list of dog breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");
        const breedList = Object.keys(response.data.message).map((breed) => ({
          label: breed.charAt(0).toUpperCase() + breed.slice(1),
          value: breed,
        }));
        setBreeds(breedList);
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
          axios.get(`https://dog.ceo/api/breed/${breed.value}/images`)
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

      {/* Breed selection multi-select dropdown */}
      <Select
        isMulti
        options={breeds}
        onChange={setSelectedBreeds}
        placeholder="Select breed(s)"
        closeMenuOnSelect={false}
      />

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

export default DogSelection;
