import React from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const user = session?.user;
  return (
    <main className="flex min-h-screen flex-col">
      <Header user={user} />
      <div className="mt-16 flex-1">{children}</div>
      <Footer />
    </main>
  );
}
