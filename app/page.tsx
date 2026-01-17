import Image from "next/image";
import First from "@/components/first/first"
import About from "@/components/about/about";
import Receive from "@/components/receive/receive";
import Projects from "@/components/projects/projects";
import Photography from '@/components/photography/photography'
export default function Home() {
  return (
    <div>
      <First/>
      <About/>
      <Receive/>
      <Projects/>
      <Photography/>
    </div>
  );
}
