import Image from "next/image";
import First from "@/components/first/first"
import About from "@/components/about/about";
import Receive from "@/components/receive/receive";
import Projects from "@/components/projects/projects";
export default function Home() {
  return (
    <div>
      <First/>
      <About/>
      <Receive/>
      <Projects/>
    </div>
  );
}
