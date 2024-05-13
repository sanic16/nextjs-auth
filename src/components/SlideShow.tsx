"use client";

import { FaPause, FaPlay } from "react-icons/fa";
import "./slideshow.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const Slideshow = ({ images }: { images: string[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const interval = useRef<NodeJS.Timeout>();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + images.length - 1) % images.length
    );
  };

  useEffect(() => {
    if (isPlaying) {
      interval.current = setInterval(() => {
        nextSlide();
      }, 5000);
    } else {
      clearInterval(interval.current);
      console.log("clear interval");
    }

    return () => clearInterval(interval.current);
  }, [isPlaying, nextSlide]);

  return (
    <div className="slideshow-container">
      <div className="slideshow-wrapper">
        {!isPlaying && (
          <div
            className={`${isHovering ? "hover" : ""} control left-arrow`}
            onClick={prevSlide}
          >
            <div className="arrow">
              <div className="line line-1"></div>
              <div className="line line-2"></div>
            </div>
          </div>
        )}

        <div className="slides">
          {images.map((image, index) => {
            if (index === currentSlide) {
              return (
                <div
                  key={index}
                  className={`slide slide-${index + 1}`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Image src={image} alt={`slide-${index + 1}`} fill />
                </div>
              );
            }
          })}
        </div>

        {!isPlaying && (
          <div
            className={`${isHovering ? "hover" : ""} control right-arrow`}
            onClick={nextSlide}
          >
            <div className="arrow">
              <div className="line line-3"></div>
              <div className="line line-4"></div>
            </div>
          </div>
        )}

        <div
          className="play-pause"
          onClick={() => setIsPlaying((prev) => !prev)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
