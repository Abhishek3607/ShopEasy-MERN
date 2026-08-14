import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import ImageSlider from "../components/imageSlider";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Product from "../components/Product";
import "../pageStyles/Home.css";
import { useEffect } from "react";
import { getProduct } from "../features/products/productSlice";

const Home = () => {
  const { loading, error, products, productCount } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <>
      <PageTitle title="Home-My Website" />
      <Navbar />
      <ImageSlider />
      <div className="home-container">
        <h2 className="home-heading">Trending Now</h2>
        <div className="home-product-container">
          {products.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
