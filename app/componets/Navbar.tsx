import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        Marshal<span>Blog</span>
      </Link>
    </nav>
  );
}
