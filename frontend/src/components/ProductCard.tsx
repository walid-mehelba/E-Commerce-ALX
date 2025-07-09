import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/Cart/CartContext";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
  description: string;
}

export default function ProductCard({ _id, title, image, price, description }: Props) {
  const { addItemToCart } = useCart();
  return (
    <Card sx={{ maxWidth: 345, height: 500, padding: 1, backgroundColor: "#E0E1DD" }}>
      <CardMedia sx={{ height: 200, objectFit: "cover" }} image={image} title="Product Image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            mb: 1,
            backgroundColor: "#FDC500",
            color: "#00296B",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transform: "translateY(-2px)",
            },
          }}
          onClick={() => addItemToCart(_id)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>


  );
}
