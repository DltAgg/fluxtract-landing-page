import { Header, Hero, About, HowItWorks, Templates, Pricing } from "@/components";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";

export default function Home() {
  return (
    <>
      <PageSlot />
      <Header />
      <Hero />
      <About />
      <HowItWorks />
      <Templates />
      <Pricing />
    </>
  );
}
