import GrainOverlay from "../../components/shared/GrainOverlay";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import StatsBar from "../../components/landing/StatsBar";
import PhoneCarousel from "../../components/landing/PhoneCarousel";
import HowItWorks from "../../components/landing/HowItWorks";
import Templates from "../../components/landing/Templates";
import AiFeatures from "../../components/landing/AiFeatures";
import Pricing from "../../components/landing/Pricing";
import { CtaBanner, Footer } from "../../components/landing/CtaBanner";

export default function LandingPage() {
  return (
    <div className="relative">
      <GrainOverlay />
      <Navbar />
      <Hero />
      <StatsBar />
      <PhoneCarousel />
      <HowItWorks />
      <Templates />
      <AiFeatures />
      <Pricing />
      <CtaBanner />
      <Footer />
    </div>
  );
}
