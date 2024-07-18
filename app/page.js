"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CountDownSection from "./components/CountDownSection";
import db from "@/lib/firestore";
import { getDoc, doc } from "firebase/firestore";
import Countdown from "react-countdown";

export default function Home() {
  const [gender, setGender] = useState();
  const [revealAt, setRevealAt] = useState();
  const [isRevealed, setIsRevealed] = useState(false);

  const interationDiv = useRef();

  const girl1 = useRef();
  const girl2 = useRef();
  const girl3 = useRef();
  const boy1 = useRef();
  const boy2 = useRef();

  const onMouseMove = (event) => {
    const div = interationDiv.current;

    div.style.left = `${event.clientX - 700}px`;
    div.style.top = `${event.clientY - 400}px`;
  };

  useEffect(() => {
    const getData = async () => {
      const docRef = await getDoc(doc(db, "data", "chongxiantanye"));
      const data = docRef.data();

      setGender(decryptGender(data.gender));
      setRevealAt(data.reveal_at);
    };

    getData();
  }, []);

  const decryptGender = (gender) => {
    if (gender == "female") return "Baby Girl";
    if (gender == "male") return "Baby Boy";

    return "Opps! Something went wrong";
  };

  const onReveal = () => {
    if (gender == "Baby Girl") {
      boy1.current.style.opacity = 0;
      boy2.current.style.opacity = 0;
    }

    if (gender == "Baby Boy") {
      girl1.current.style.opacity = 0;
      girl2.current.style.opacity = 0;
      girl3.current.style.opacity = 0;
    }

    setTimeout(() => {
      setIsRevealed(true);
    }, 250);
  };

  const MemoCountDownSection = useMemo(() => {
    return gender && revealAt && <CountDownSection gender={gender} revealAt={revealAt} />;
  }, [gender, revealAt]);

  return (
    <div onMouseMove={onMouseMove}>
      <main className="flex flex-col justify-between items-center py-10">
        <div className="text-xl text-center font-medium">{isRevealed ? "It is a" : "Chong Xian & Tan Ye baby's gender revealed in"}</div>
        {MemoCountDownSection}
        <a href="https://www.chongxian.dev" target="_blank" className="cursor-pointer">
          Built by Chong Xian
        </a>
      </main>
      {revealAt && <Countdown className="hidden" date={revealAt.toDate()} renderer={() => {}} onComplete={onReveal} />}

      <div className="gradient-background">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div ref={girl1} className="girl1 transition-opacity duration-1000"></div>
          <div ref={boy1} className="boy1 transition-opacity duration-1000"></div>
          <div ref={girl2} className="girl2 transition-opacity duration-1000"></div>
          <div ref={boy2} className="boy2 transition-opacity duration-1000"></div>
          <div ref={girl3} className="girl3 transition-opacity duration-1000"></div>
          <div ref={interationDiv} className="interactive"></div>
        </div>
      </div>
    </div>
  );
}
