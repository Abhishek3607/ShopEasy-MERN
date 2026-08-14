import { Email, GitHub, Instagram, LinkedIn, Phone, YouTube } from "@mui/icons-material";
import "../componentStyles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1 */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <Phone fontSize="small" />
            Phone: +911234567890{" "}
          </p>
          <p>
            <Email fontSize="small" />
            Email: foodiiee@gmail.com
          </p>
        </div>
        {/* Section 2 */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="" target="_blank">
                <GitHub className="social-icon"/>
            </a>
            <a href="" target="_blank">
                <LinkedIn className="social-icon"/>
            </a>
            <a href="" target="_blank">
                <YouTube className="social-icon"/>
            </a>
            <a href="" target="_blank">
                <Instagram className="social-icon"/>
            </a>
          </div>

        </div>
        <div className="footer-section about">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum assumenda vero quibusdam tempore, sed fugiat.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Abhishek - All Rights Reserved </p>
      </div>
    </footer>
  );
};

export default Footer;
