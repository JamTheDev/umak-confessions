import { Component, FunctionComponent } from "react";

const Navbar: FunctionComponent = () => {
  return (
    <nav className="absolute w-full max-w-screen-2xl flex flex-row justify-between px-16 py-5">
      <a href="/" className="flex flex-row items-center gap-6">
        <img
          src={"images/logos/UCIC.png"}
          alt="UMak Confessions Icon"
          className="aspect-square w-16 "
        />
        <span className="text-white font-metropolis font-bold text-xl leading-5">
            UMak <br />
            Confessions
        </span>
      </a>

      <div className="flex flex-row items-center uppercase  font-metropolis gap-12 text-white">
            <span className="text-bold text-xs">About</span>
            <span className="text-bold text-xs">Contact</span>
      </div>
    </nav>
  );
};

export default Navbar;
