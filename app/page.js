import Navbar from "./components/Navbar";
import Hero from "./section/Hero";

export default function Home() {
  return (
    <>
      <div className=" max-md:pb-8 md:pt-4 bg-slate-100 min-h-screen">
        <Navbar />
        <Hero />
      </div>
    </>
  );
}
