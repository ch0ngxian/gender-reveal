"use client";

import { useEffect, useState } from "react";
import db from "@/lib/firestore";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import Image from "next/image";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

export default function Submit() {
  const [selectedRevealAt, setSelectedRevealAt] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const docRef = await getDoc(doc(db, "data", "chongxiantanye"));
      const data = docRef.data();

      if (!data.reveal_at) return;
      setSelectedRevealAt(data.reveal_at.toDate());
    };

    getData();
  }, []);

  const submit = async () => {
    try {
      await setDoc(
        doc(db, "data", "chongxiantanye"),
        {
          reveal_at: selectedRevealAt,
        },
        { merge: true }
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return isSubmitted ? (
    <div className="w-screen h-full flex flex-col justify-between items-center p-7 ">
      <div className="h-full flex flex-col justify-center items-center">
        <Image src="/images/checked.svg" width={50} height={50} alt="checked" />
        <div className="mt-10 text-3xl font-medium text-center">{"Reveal time updated!"}</div>
      </div>

      <div className="w-full flex flex-col items-center">
        <button
          onClick={() => window.location.reload()}
          className="w-full h-16 bg-slate-200 text-slate-600 flex justify-center items-center rounded-lg font-medium"
        >
          Reselect
        </button>
      </div>
    </div>
  ) : (
    <div className="w-screen h-full flex flex-col justify-between items-center p-7 ">
      <div className="text-3xl font-medium">{"Gender Reveal Time"}</div>
      <div className="flex flex-col w-full h-full m-10 gap-5">
        <DateTimePicker disableClock={true} onChange={setSelectedRevealAt} value={selectedRevealAt} />
      </div>
      <button
        onClick={submit}
        className={`w-full h-24  flex justify-center items-center rounded-lg font-medium ${
          selectedRevealAt ? "bg-black text-white" : "bg-slate-300 text-slate-100 pointer-events-none"
        }`}
      >
        Update
      </button>
    </div>
  );
}
