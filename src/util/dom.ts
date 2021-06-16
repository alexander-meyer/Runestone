interface EaseInOutQuadOptions {
  currentTime: number;
  start: number;
  change: number;
  duration: number;
}

const easeInOutQuad = (currentTime, start, change, duration): EaseInOutQuadOptions => {
  let newCurrentTime = currentTime;
  newCurrentTime /= duration / 2;

  if (newCurrentTime < 1) {
    return (change / 2) * newCurrentTime * newCurrentTime + start;
  }

  newCurrentTime -= 1;
  return (-change / 2) * (newCurrentTime * (newCurrentTime - 2) - 1) + start;
};

interface SmoothScrollOptions {
  duration: number;
  element: HTMLElement;
  to: number;
  type: "scrollTop" | "scrollLeft";
}

// Thanks to Karel Píč for the custom scroll animation with duration
// https://gist.github.com/andjosh/6764939#gistcomment-3515576
const smoothScroll = (
  duration: number,
  element: HTMLElement,
  to: number,
  type = "scrollTop"
  ): SmoothScrollOptions => {
  const start = element[type];
  const change = to - start;
  const startDate = new Date().getTime();

  const animateScroll = () => {
    const currentDate = new Date().getTime();
    const currentTime = currentDate - startDate;
    element[type] = easeInOutQuad(currentTime, start, change, duration);

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element[type] = to;
    }
  };
  animateScroll();

  return null;
};

export { smoothScroll };
