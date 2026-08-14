import Footer from "../components/Footer";
import ImageSlider from "../components/imageSlider";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Product from "../components/Product";
import "../pageStyles/Home.css";

const products = [
  {
    _id: "6a74614950a18cf054f65717",
    name: "Product a4",
    description: "Prod description 1",
    price: 800,
    ratings: 2,
    image: [
      {
        public_id: "Test id 1",
        url: "Test url 1",
        _id: "6a74614950a18cf054f65718",
      },
    ],
    category: "shirt",
    stock: 4,
    numOfReviews: 1,
    reviews: [
      {
        user: "6a7cb733e231dd23693153d4",
        name: "Boss",
        rating: 5,
        comment: "Awesome",
        _id: "6a7cb763e231dd23693153d7",
      },
    ],
    createdAt: "2026-08-06T10:26:17.947Z",
    __v: 2,
  },
  {
    _id: "6a7466aa561fd2e52cd6ba87",
    name: "Product2",
    description: "Prod description 2",
    price: 200,
    ratings: 0,
    image: [
      {
        public_id: "Test id 2",
        url: "Test url 2",
        _id: "6a7466aa561fd2e52cd6ba88",
      },
    ],
    category: "shoes",
    stock: 1,
    numOfReviews: 0,
    reviews: [],
    createdAt: "2026-08-06T10:49:14.576Z",
    __v: 0,
  },
  {
    _id: "6a74bb45123830a41bf719dd",
    name: "Product3",
    description: "Prod description 3",
    price: 200,
    ratings: 0,
    image: [
      {
        public_id: "Test id 3",
        url: "Test url 3",
        _id: "6a74bb45123830a41bf719de",
      },
    ],
    category: "shoes",
    stock: 1,
    numOfReviews: 0,
    reviews: [],
    createdAt: "2026-08-06T16:50:13.553Z",
    __v: 0,
  },
];

const Home = () => {
  return (
    <>
    <PageTitle title="Home-My Website"/>
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
