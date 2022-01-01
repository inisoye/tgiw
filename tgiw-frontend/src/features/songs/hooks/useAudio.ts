import * as React from 'react';

export const useAudio = (url: string) => {
  const audio = React.useMemo(() => new Audio(url), [url]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const intervalRef: { current: NodeJS.Timeout | null } = React.useRef(null);

  audio.onloadedmetadata = () => {
    setDuration(audio.duration);
  };

  const toggle = () => setIsPlaying(!isPlaying);

  const startTimer = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 200);
  };

  React.useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
    startTimer();

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  React.useEffect(() => {
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.pause();
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isPlaying,
    toggle,
    currentTime,
    duration,
    trackProgressPercentage:
      (currentTime && duration && currentTime / duration) * 100,
  };
};
