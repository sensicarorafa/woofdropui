import { useState, useEffect } from 'react';

function useWindowDimensions() {
  // State to store window width and height
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update state with new window dimensions
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup: remove the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return windowDimensions; // Return the current window dimensions
}

export default useWindowDimensions;
