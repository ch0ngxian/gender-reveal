"use client";
import Countdown, { zeroPad } from "react-countdown";
import confetti from "canvas-confetti";
import BlurIn from "./BlurIn";

export default function CountDownSection({ gender, revealAt }) {
  const startConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const Timer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <BlurIn className={"text-8xl font-bold"}>{gender}</BlurIn>;
    } else {
      return (
        <div className="flex flex-col justify-center items-center">
          {days > 0 && (
            <div className="text-7xl mb-5">
              {days} day{days > 1 ? "s" : ""}
            </div>
          )}
          <div className="text-8xl">
            {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </div>
        </div>
      );
    }
  };

  return <Countdown date={Date.now() + 1000} renderer={Timer} onComplete={startConfetti} />;
}
