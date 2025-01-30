import { useState, useEffect } from 'react';

const useInactivity = (timeoutDuration = ( 50 * 60 * 1000), onInactivity = () => {}) => {
  const [isInactive, setIsInactive] = useState(false);

  useEffect(() => {
    let inactivityTimer;

    const handleInactivity = () => {
      setIsInactive(true);
      onInactivity(); 
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer); 
      setIsInactive(false); 
      inactivityTimer = setTimeout(handleInactivity, timeoutDuration);
    };

    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
      window.removeEventListener('scroll', resetInactivityTimer);
    };
  }, [timeoutDuration, onInactivity]);

  return { isInactive };
};

export default useInactivity;
