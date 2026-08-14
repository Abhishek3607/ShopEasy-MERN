import { Link } from "react-router-dom";
import "../componentStyles/Product.css";
import Ratings from "./Ratings";
import { useState } from "react";

const Product = ({ product }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <Link to={product._id} className="product_id">
      <div className="product-card">
        <img src={product.image[0].url} alt={product.name} />

        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>

          <p className="product-price">
            <strong>{product.price}</strong>/-
          </p>

          <div className="rating_container">
            <Ratings
              value={product.ratings}
              onRatingChange={handleRatingChange}
              disabled={true}
            />
          </div>

          <span className="productCardSpan">
            ({product.numOfReviews}
            {product.numOfReviews === 1 ? "Review" : "Reviews"})
          </span>

          <button className="add-to-cart">View Details</button>
        </div>
      </div>
    </Link>
  );
};

export default Product;