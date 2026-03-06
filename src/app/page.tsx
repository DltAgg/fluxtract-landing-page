import { Header } from "@/components";
import { Hero } from "@/components";
import { About } from "@/components";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";

export default function Home() {
  return (
    <>
      <PageSlot />
      <Header />
      <Hero />
      <About />
    </>
  );
}
