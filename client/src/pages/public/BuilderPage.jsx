import { Link } from "react-router-dom";
import { BuilderProvider, useBuilder } from "../../context/BuilderContext";
import BuilderSteps from "../../components/builder/BuilderSteps";
import StepTemplate from "../../components/builder/StepTemplate";
import StepProfile from "../../components/builder/StepProfile";
import StepAbout from "../../components/builder/StepAbout";
import StepSkills from "../../components/builder/StepSkills";
import StepProjects from "../../components/builder/StepProjects";
import StepExtras from "../../components/builder/StepExtras";
import StepDesign from "../../components/builder/StepDesign";
import StepLaunch from "../../components/builder/StepLaunch";
import BuilderPreview from "../../components/builder/BuilderPreview";
import BuilderNav from "../../components/builder/BuilderNav";
import StepIntro from "../../components/builder/StepIntro";

function BuilderContent() {
  const { step } = useBuilder();

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <header className="sticky top-0 z-50 px-6 bg-[#fafaf8]/80 border-b border-[#e8e7e3]" style={{ backdropFilter: "blur(20px)" }}>
        <div className="max-w-[1200px] mx-auto h-[52px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-[#5a5a55] text-sm no-underline hover:text-[#141413] transition-colors">
              ← Back
            </Link>
            <div className="w-px h-5 bg-[#e8e7e3]" />
            <span className="font-extrabold text-[0.95rem]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Mero<span className="text-[#22c55e]">Portfolio</span>
            </span>
          </div>
          <BuilderSteps />
        </div>
      </header>

      <div className="flex max-w-[1200px] mx-auto px-6 py-5 gap-5">
        <div className="flex-1 min-w-0 max-w-[480px]">
          <div className="bg-white border border-[#e8e7e3] rounded-[20px] p-7">
            {step === 1 && <StepTemplate />}
{step === 2 && <StepProfile />}
{step === 3 && <StepAbout />}
{step === 4 && <StepSkills />}
{step === 5 && <StepProjects />}
{step === 6 && <StepExtras />}
{step === 7 && <StepIntro />}
{step === 8 && <StepDesign />}
{step === 9 && <StepLaunch />}
            <BuilderNav />
          </div>
        </div>
        <div className="flex-1 min-w-[320px] hidden lg:block">
          <BuilderPreview />
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  );
}