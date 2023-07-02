"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

// higher order component wrapping the enitre app in layout.jsx file.
const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
