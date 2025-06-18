"use client";

import { useState } from "react";
import LocationInformationForm, { LocationInfoData } from "./LocationInformationForm";
import RequestedGuardsForm, { GuardsFormData } from "./RequestedGuardsForm";
import AccountsFinanceForm, { FinanceFormData } from "./AccountsFinanceForm";

export default function MultiStepLocationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<{
    location?: LocationInfoData;
    guards?: GuardsFormData;
    finance?: FinanceFormData;
  }>({});

  const handleLocationSubmit = (formData: LocationInfoData) => {
    setData((prev) => ({ ...prev, location: formData }));
    setStep(1);
  };

  const handleGuardsSubmit = (formData: GuardsFormData) => {
    setData((prev) => ({ ...prev, guards: formData }));
    setStep(2);
  };

  const handleFinanceSubmit = async (formData: FinanceFormData) => {
    const finalData = { ...data, finance: formData };
    console.log("✅ Submitting Final Data:", finalData);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        alert("Data submitted successfully!");
        setStep(0);
        setData({});
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f9fafb]">
      <aside className="w-full lg:w-1/4 bg-white shadow-md px-4 py-6 space-y-4">
        <h1 className="text-xl font-bold mb-4">Location</h1>
        <button onClick={() => setStep(0)} className={`block w-full text-left px-4 py-4 rounded-lg ${step === 0 ? "bg-yellow-300" : "bg-gray-100"}`}>Location Information</button>
        <button onClick={() => setStep(1)} className={`block w-full text-left px-4 py-4 rounded-lg ${step === 1 ? "bg-yellow-300" : "bg-gray-100"}`}>Requested No. of Guards</button>
        <button onClick={() => setStep(2)} className={`block w-full text-left px-4 py-4 rounded-lg ${step === 2 ? "bg-yellow-300" : "bg-gray-100"}`}>For Accounts/Finance</button>
      </aside>

      <main className="w-full lg:w-3/4 p-6 bg-white shadow-md">
        {step === 0 && <LocationInformationForm onNext={handleLocationSubmit} defaultValues={data.location} />}
        {step === 1 && <RequestedGuardsForm onBack={() => setStep(0)} onNext={handleGuardsSubmit} defaultValues={data.guards} />}
        {step === 2 && <AccountsFinanceForm onBack={() => setStep(1)} onSubmit={handleFinanceSubmit} defaultValues={data.finance} />}
      </main>
    </div>
  );
}

