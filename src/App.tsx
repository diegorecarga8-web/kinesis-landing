import { useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import Process from "./components/Process";
import Explorations from "./components/Explorations";
import Stats from "./components/Stats";
import Contact from "./components/Contact";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatedBackground />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <Process />
        <Explorations />
        <Stats />
      </main>
      <Contact />
    </>
  );
}

export default App;
