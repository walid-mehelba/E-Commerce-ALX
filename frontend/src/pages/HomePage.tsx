import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { Box } from "@mui/material";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/product");
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <Box>Something went wrong, please try again</Box>;
  }

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container sx={{ mt: 0 }} >
        <Grid container spacing={2} alignContent="center">
          {products.map((p) => (
            <Grid mt={2} mb={2} sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard description={""} {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
