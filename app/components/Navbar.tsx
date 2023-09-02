import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./dojo-logo.png";
import { rajdhani } from "../layout";

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link className="ml-4" href="/">
        <h2 className={rajdhani.className}>penplace</h2>
      </Link>
    </nav>
  );
};

export default Navbar;
