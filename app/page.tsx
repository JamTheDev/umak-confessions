import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The UMak Confessions",
  description: "Telling stories of the illustrious UMak Herons since 2013",
  keywords: [
    "umak",
    "university of makati",
    "umak confessions",
    "umak confession",
    "harold heron",
  ]
}

export default function Home() {
  return (
    <main className="flex flex-row px-24 *:flex-1 h-full font-metropolis text-white">
      <div className="flex flex-col h-full justify-center pb-8 ">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-col h-full">
            <span className="text-xl">Telling stories of Herons</span>
            <span className="text-[4rem] font-extrabold">Since 2013</span>
          </div>

          <div className="w-[75%] h-fit">
            <p className="text-xl">
              Since 2013, weaving tales of herons - patience, grace, and the
              secrets of the wetlands.
            </p>
          </div>

          <button className="bg-white py-2 px-6 my-4 rounded-full shadow-lg w-fit text-black font-bold hover:scale-110 transition-transform">Submit your Confession</button>
        </div>
      </div>
      <div className="grid place-items-center">
        <img src="images/umak-confession-cover.png" alt="" className="mb-8"/>
      </div>
    </main>
  );
}
