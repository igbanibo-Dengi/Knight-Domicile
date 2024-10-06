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
      <div className="flex-1 mt-16">{children}</div>
      <Footer />
    </main>
  );
}
