import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Demo = () => {
  return (
    <section className="demo-page">
      <div className="container">
        <h2>See PharmaPMS in Action</h2>

        {/* Video Demo */}
        <div className="video-demo">
          <video width="100%" height="400" controls>
            <source src="videos/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default Demo;
