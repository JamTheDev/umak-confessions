import { NextPage } from "next";

const SubmitPage: NextPage = () => {
  return (
    <main className="h-[90%] w-full grid place-items-center text-white">
      <div className="flex flex-col justify-center items-center gap-3">
        <span className="text-5xl font-extrabold">Soon! 😉</span>
        <p>
          This part of the page is still under construction. Come back later!
        </p>
        <a href="/" className="bg-white py-2 px-6 my-4 rounded-full shadow-lg w-fit text-black font-bold hover:scale-110 transition-transform">
          Go back Home
        </a>
      </div>
    </main>
  );
};

export default SubmitPage;
