import Hero from "@/components/sections/Hero";
import HomeContent from "@/components/sections/HomeContent";

export default function Home() {
  return (
    <main className="relative flex flex-col">
      <Hero />
      <HomeContent />
    </main>
  );
}
