import { useBuilder } from "../../context/BuilderContext";

export default function BuilderNav() {
  const { step, goNext, goBack } = useBuilder();

  return (
    <div className="flex justify-between mt-5 pt-3 border-t border-[#e8e7e3]">
      <button
        onClick={goBack}
        disabled={step === 1}
        className={`bg-transparent border border-[#e8e7e3] px-5 py-2.5 rounded-xl text-[0.82rem] font-semibold cursor-pointer transition-all duration-200 hover:border-[#d4d4c8] ${
          step === 1 ? "opacity-30 cursor-default text-[#d4d4c8]" : "text-[#141413]"
        }`}
      >
        ← Back
      </button>

      {step < 9 && (
        <button
          onClick={goNext}
          className="bg-[#141413] text-white border-none px-6 py-2.5 rounded-xl font-bold text-[0.82rem] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
        >
          Continue →
        </button>
      )}
    </div>
  );
}