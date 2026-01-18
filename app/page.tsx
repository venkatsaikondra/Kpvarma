import Image from "next/image";
import First from "@/components/first/first"
import About from "@/components/about/about";
import Receive from "@/components/receive/receive";
import Projects from "@/components/projects/projects";
import Photography from '@/components/photography/photography'
import Parallax from '@/components/parallax/parallax'
import Scroll from '@/components/scroll/scroll'
import Footer from '@/components/footer/footer'

export default function Home() {
  return (
    <div>
    
      <First/>
      <About/>
      <Receive/>
      <Projects/>
      <Photography/>
      <Parallax/>
      <Scroll/>
      <Footer/>
    </div>
  );
}
