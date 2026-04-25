import Navbar from "@/components/Navbar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default layout;
