import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { arrowRight } from "react-icons-kit/feather/arrowRight";
import { arrowLeft } from "react-icons-kit/feather/arrowLeft";
import { Link } from "react-router-dom";

import sea1 from "../Components/video/10.mp4";
import sea2 from "../Components/video/sea.mp4";
import sea3 from "../Components/video/sea1.mp4";

import { motion } from "framer-motion";

const Home = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [activeVideo, setActiveVideo] = useState(false);

  const handleLeftArrow = () => {
    if (step === 1) {
      setStep(3);
    } else setStep(step - 1);
  };
  const handleRightArrow = () => {
    if (step === 3) {
      setStep(1);
    } else setStep(step + 1);
  };

  const goToSlide1 = () => {
    setStep(1);
  };
  const goToSlide2 = () => {
    setStep(2);
  };

  const goToSlide3 = () => {
    setStep(3);
  };
  const animate = () => {
    setActiveVideo(!activeVideo);
  };

  return (
    <div class={show ? " showcase active " : "showcase "}>
      <header>
        <h2 class="logo">Travel {/* {JSON.stringify(auth)} */}</h2>
        <div
          class={show ? "toggle active " : "toggle"}
          onClick={() => setShow(!show)}
        ></div>
      </header>

      <div className="leftArrow" onClick={handleLeftArrow}>
        <Icon icon={arrowLeft} size={28} />
      </div>

      {step === 1 && (
        <video
          className={activeVideo ? " video-slide active" : "video-slide   "}
          src={sea1}
          muted
          loop
          autoPlay
        ></video>
      )}
      {step === 2 && (
        <video
          className={activeVideo ? " video-slide active " : "video-slide  "}
          src={sea2}
          muted
          loop
          autoPlay
        ></video>
      )}
      {step === 3 && (
        <video
          className={activeVideo ? " video-slide active " : "video-slide "}
          src={sea3}
          muted
          loop
          autoPlay
        ></video>
      )}

      <div class="overlay"></div>
      <div class="text">
        <h2>Never Stop </h2>
        <h3>Exploring The World</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <Link to="/HotelList">Explore</Link>
        <div className="indicators_box">
          {step === 1 && (
            <>
              <div
                className={activeVideo ? "indicator active  " : "indicator   "}
                onClick={() => setActiveVideo(!activeVideo)}
                onClick={animate}
              ></div>
              <div className="indicator" onClick={goToSlide2}>
                {" "}
              </div>
              <div className="indicator" onClick={goToSlide3}></div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="indicator" onClick={goToSlide1}></div>
              <div
                className={activeVideo ? "indicator active  " : "indicator   "}
                onClick={() => setActiveVideo(!activeVideo)}
                onClick={animate}
              ></div>
              <div className="indicator" onClick={goToSlide3}></div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="indicator" onClick={goToSlide1}></div>
              <div className="indicator" onClick={goToSlide2}></div>
              <div
                className={activeVideo ? "indicator active " : "indicator    "}
                onClick={() => setActiveVideo(!activeVideo)}
                onClick={animate}
              ></div>
            </>
          )}
        </div>
      </div>

      <div className="rightArrow" onClick={handleRightArrow}>
        <Icon icon={arrowRight} size={28} />
      </div>
      <ul class="social">
        <li>
          <a href="#">
            <img src="https://i.ibb.co/x7P24fL/facebook.png" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="https://i.ibb.co/Wnxq2Nq/twitter.png" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="https://i.ibb.co/ySwtH4B/instagram.png" />
          </a>
        </li>
      </ul>
    </div>
  );
};

// const menuToggle = document.querySelector('.toggle');
// const showcase = document.querySelector('.showcase');
// menuToggle.addEventListener('click', (e) => {
//   menuToggle.classList.toggle('active');
//   showcase.classList.toggle('active');
// })

export default Home;
