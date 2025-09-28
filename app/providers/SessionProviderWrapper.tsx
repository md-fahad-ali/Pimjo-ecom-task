"use client";
import React from "react";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Temporary pass-through: remove dependency on next-auth/react.
  // TODO: Reintroduce real SessionProvider once auth stack is finalized.
  return <>{children}</>;
}
