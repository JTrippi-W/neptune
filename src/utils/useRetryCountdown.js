import { useEffect, useState } from 'react';

const useRetryCountdown = (startCountdown, initialCountdown = 5) => {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [progress, setProgress] = useState(100);
  const [retryAvailable, setRetryAvailable] = useState(false);

  useEffect(() => {
    if (startCountdown) {
      setRetryAvailable(false);
      setCountdown(initialCountdown);
      setProgress(100);

      const interval = setInterval(() => {
        setCountdown((currentCount) => {
          const nextCount = currentCount - 1;
          if (nextCount <= 0) {
            clearInterval(interval);
            setRetryAvailable(true);
            return 0;
          }
          setProgress((nextCount / initialCountdown) * 100);
          return nextCount;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startCountdown, initialCountdown]);

  return { countdown, retryAvailable, setRetryAvailable, progress };
};

export default useRetryCountdown;
