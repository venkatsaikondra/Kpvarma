"use client";
import React, { useRef, useEffect } from 'react';
import Styles from './photography.module.css'; // Import styles to use the container class

const TrailContainer = () => {
  const trailContainerRef = useRef(null);
  const animationStateRef = useRef(null);
  const trailRef = useRef([]);
  const currentImageIndexRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const interpolatedMousePosRef = useRef({ x: 0, y: 0 });
  const isDesktopRef = useRef(false);

  useEffect(() => {
    const config = {
      imageLifespan: 1000,
      mouseTreshold: 100, // Reduced slightly for smoother triggering
      inDuration: 750,
      outDuration: 1000,
      staggerIn: 50,
      staggerOut: 25,
      slideDuration: 1000,
      slideEasing: "cubic-bezier(0.25,0.46,0.45,0.94)",
      easing: "cubic-bezier(0.87,0,0.13,1)",
    };

    const trailImageCount = 5; // Reduced for testing (ensure you have these images)
    // Create an array of image paths
    const images = Array.from({ length: trailImageCount }, (_, i) => 
       `/trail-images/img${i + 1}.jpg`
    );

    const trailContainer = trailContainerRef.current;
    if (!trailContainer) return;

    // Initial check
    isDesktopRef.current = window.innerWidth > 1000;

    const MathUtils = {
      // Correct Lerp: start * (1 - amount) + end * amount
      lerp: (start, end, amount) => start * (1 - amount) + end * amount,
      distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
    };

    const getMouseDistance = () => MathUtils.distance(
      mousePosRef.current.x,
      mousePosRef.current.y,
      lastMousePosRef.current.x,
      lastMousePosRef.current.y
    );

    const isInTrailContainer = (x, y) => {
      if (!trailContainer) return false;
      const rect = trailContainer.getBoundingClientRect();
      return (
        x > rect.left && x < rect.right && y > rect.top && y < rect.bottom
      );
    };

    const createTrailImage = () => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("trail-img"); // Matches :global(.trail-img)
      
      const imgSrc = images[currentImageIndexRef.current];
      currentImageIndexRef.current = (currentImageIndexRef.current + 1) % images.length;

      const rect = trailContainer.getBoundingClientRect();
      // Offset by 87.5 (half of 175px width/height) to center image on mouse
      const startX = interpolatedMousePosRef.current.x - rect.left - 87.5;
      const startY = interpolatedMousePosRef.current.y - rect.top - 87.5;
      const targetX = mousePosRef.current.x - rect.left - 87.5;
      const targetY = mousePosRef.current.y - rect.top - 87.5;

      imgContainer.style.left = `${startX}px`;
      imgContainer.style.top = `${startY}px`;
      imgContainer.style.transition = `left ${config.slideDuration}ms ${config.slideEasing}, top ${config.slideDuration}ms ${config.slideEasing}`;

      const maskLayers = [];
      const imgLayers = [];

      for (let i = 0; i < 10; i++) {
        const layer = document.createElement("div");
        layer.classList.add("mask-layer");
        
        const imageLayer = document.createElement("div");
        imageLayer.classList.add("image-layer");
        imageLayer.style.backgroundImage = `url(${imgSrc})`;
        
        const startY_pct = i * 10;
        const endY_pct = (i + 1) * 10;

        layer.style.clipPath = `polygon(50% ${startY_pct}%, 50% ${startY_pct}%, 50% ${endY_pct}%, 50% ${endY_pct}%)`;
        layer.style.transition = `clip-path ${config.inDuration}ms ${config.easing}`;
        layer.style.transform = "translateZ(0)";
        layer.style.backfaceVisibility = "hidden";
        
        layer.appendChild(imageLayer);
        imgContainer.appendChild(layer);
        
        maskLayers.push(layer);
        imgLayers.push(imageLayer);
      }

      trailContainer.appendChild(imgContainer);

      requestAnimationFrame(() => {
        imgContainer.style.left = `${targetX}px`;
        imgContainer.style.top = `${targetY}px`; // Fixed: was right, should be top

        maskLayers.forEach((layer, i) => {
          const startY_pct = i * 10;
          const endY_pct = (i + 1) * 10;
          const distanceFromMiddle = Math.abs(i - 4.5);
          const delay = distanceFromMiddle * config.staggerIn;

          setTimeout(() => {
            layer.style.clipPath = `polygon(0% ${startY_pct}%, 100% ${startY_pct}%, 100% ${endY_pct}%, 0% ${endY_pct}%)`;
          }, delay);
        });
      });

      trailRef.current.push({
        element: imgContainer,
        maskLayers: maskLayers,
        imgLayers: imgLayers, // Fixed variable name consistency
        removeTime: Date.now() + config.imageLifespan,
      });
    };

    const removeOldImages = () => {
      const now = Date.now();
      if (trailRef.current.length === 0) return;

      // Check the oldest image (first in array)
      const oldestImage = trailRef.current[0];

      if (now >= oldestImage.removeTime) {
        const imgToRemove = trailRef.current.shift();

        imgToRemove.maskLayers.forEach((layer, i) => {
          const startY_pct = i * 10;
          const endY_pct = (i + 1) * 10;
          const distanceFromEdge = 4.5 - Math.abs(i - 4.5);
          const delay = distanceFromEdge * config.staggerOut;

          layer.style.transition = `clip-path ${config.outDuration}ms ${config.easing}`;
          
          setTimeout(() => {
            layer.style.clipPath = `polygon(50% ${startY_pct}%, 50% ${startY_pct}%, 50% ${endY_pct}%, 50% ${endY_pct}%)`;
          }, delay);
        });

        imgToRemove.imgLayers.forEach((imageLayer) => {
          imageLayer.style.transition = `opacity ${config.outDuration}ms ${config.easing}`;
          imageLayer.style.opacity = "0";
        });

        setTimeout(() => {
          if (imgToRemove.element.parentNode) {
            imgToRemove.element.parentNode.removeChild(imgToRemove.element);
          }
        }, config.outDuration + 100);
      }
    };

    const render = () => {
      if (!isDesktopRef.current) return;

      const distance = getMouseDistance();

      // Update interpolated position
      interpolatedMousePosRef.current.x = MathUtils.lerp(
        interpolatedMousePosRef.current.x,
        mousePosRef.current.x,
        0.1
      );
      interpolatedMousePosRef.current.y = MathUtils.lerp(
        interpolatedMousePosRef.current.y,
        mousePosRef.current.y,
        0.1
      );

      if (distance > config.mouseTreshold && isInTrailContainer(mousePosRef.current.x, mousePosRef.current.y)) {
        createTrailImage();
        lastMousePosRef.current = { ...mousePosRef.current };
      }

      removeOldImages();
      animationStateRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
        mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const startAnimation = () => {
      document.addEventListener("mousemove", handleMouseMove);
      animationStateRef.current = requestAnimationFrame(render);
    };

    const stopAnimation = () => {
      if (animationStateRef.current) {
        cancelAnimationFrame(animationStateRef.current);
        animationStateRef.current = null;
      }
      document.removeEventListener("mousemove", handleMouseMove);
      
      // Cleanup DOM elements
      trailRef.current.forEach((item) => {
        if (item.element.parentNode) {
          item.element.parentNode.removeChild(item.element);
        }
      });
      trailRef.current.length = 0;
    };

    const handleResize = () => {
        const wasDesktop = isDesktopRef.current;
        isDesktopRef.current = window.innerWidth > 1000;

        if (isDesktopRef.current && !wasDesktop) {
            startAnimation();
        } else if (!isDesktopRef.current && wasDesktop) {
            stopAnimation();
        }
    };

    window.addEventListener("resize", handleResize);

    // Initial Start
    if (isDesktopRef.current) {
        // Initialize interpolated position to current mouse to prevent jump
        interpolatedMousePosRef.current = { ...mousePosRef.current };
        lastMousePosRef.current = { ...mousePosRef.current };
        startAnimation();
    }

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // We refer to the class in CSS Modules
    <div className={Styles.trail_container} ref={trailContainerRef}>
    </div>
  );
};

export default TrailContainer;