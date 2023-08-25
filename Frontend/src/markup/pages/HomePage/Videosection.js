import React from "react";
import bannerImage from "../../../assets/template_assets/images/custom/banner/banner.jpg";
function Videosection() {
  return (
    <div>
      <section class="video-section">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        ></div>
        <div class="auto-container">
          <h5>Working since 1999</h5>
          <h2>
            Tuneup Your Car <br /> to Next Level
          </h2>
          <div class="video-box">
            <div class="video-btn">
              <a
                href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
                class="overlay-link lightbox-image video-fancybox ripple"
              >
                <i class="flaticon-play"></i>
              </a>
            </div>
            <div class="text">
              Watch intro video <br /> about us
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Videosection;
