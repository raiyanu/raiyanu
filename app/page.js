import { Camera } from "lucide-react";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <div className="relative pt-4">
        <Navbar />
        <Camera size="64" />
        <h1> hey there </h1>
      </div>
    </>
  );
}
