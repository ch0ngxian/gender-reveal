"use client";

import { useState } from "react";
import db from "@/lib/firestore";
import { doc, setDoc } from "@firebase/firestore";
import Image from "next/image";

export default function Submit() {
  const [selectedGender, setSelectedGender] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = async () => {
    if (!selectedGender) return;

    try {
      await setDoc(
        doc(db, "data", "chongxiantanye"),
        {
          gender: selectedGender,
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
        <div className="mt-10 text-3xl font-medium text-center">{"Thank you for your submission!"}</div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="mb-2 text-sm text-gray-400">Selected the wrong gender?</div>
        <button
          onClick={() => window.location.reload()}
          className="w-full h-16 bg-slate-200 text-slate-600 flex justify-center items-center rounded-lg font-medium"
        >
          Resubmit
        </button>
      </div>
    </div>
  ) : (
    <div className="w-screen h-full flex flex-col justify-between items-center p-7 ">
      <div className="text-3xl font-medium">{"What is the gender of the baby?"}</div>
      <div className="flex flex-col w-full h-full m-10 gap-5">
        <div
          onClick={() => setSelectedGender("male")}
          className={`w-full h-full flex justify-center items-center rounded-lg text-5xl border-2 font-bold ${
            selectedGender == "male" ? "border-[#0CA5E9] text-[#0CA5E9] bg-[#d0f1ff]" : "bg-slate-100 text-slate-300"
          }`}
        >
          Boy
        </div>
        <div
          onClick={() => setSelectedGender("female")}
          className={`w-full h-full flex justify-center items-center rounded-lg text-5xl border-2 font-bold ${
            selectedGender == "female" ? "border-[#FD94CB] text-[#FD94CB] bg-[#ffe6f3]" : "bg-slate-100 text-slate-300"
          }`}
        >
          Girl
        </div>
      </div>
      <button
        onClick={submit}
        className={`w-full h-24  flex justify-center items-center rounded-lg font-medium ${
          selectedGender ? "bg-black text-white" : "bg-slate-300 text-slate-100 pointer-events-none"
        }`}
      >
        Confirm
      </button>
    </div>
  );
}
