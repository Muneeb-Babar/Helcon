"use client";

import { useState } from "react";
import LocationInformationForm, { LocationInfoData } from "./LocationInformationForm";
import RequestedGuardsForm from "./RequestedGuardsForm";
import AccountsFinanceForm from "./AccountsFinanceForm";
import { useGuardsStore } from "@/app/Store/guardsStore";

export default function MultiStepLocationForm() {
  const [step, setStep] = useState(0);
  const [locationData, setLocationData] = useState<LocationInfoData>();
  const { guards, resetStore } = useGuardsStore();

  const handleLocationSubmit = (data: LocationInfoData) => {
    setLocationData(data);
    setStep(1);
  };

  const handleFinanceSubmit = async (financeData: any) => {
    if (!locationData) {
      return alert("Please complete the location step first.");
    }

    const payload = { location: locationData, guards, finance: financeData };

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Submitted successfully!");
        setStep(0);
        setLocationData(undefined);
        resetStore();  // clear both store and persisted data
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const steps = [
    { label: "Location Information", component: <LocationInformationForm onNext={handleLocationSubmit} defaultValues={locationData} /> },
    { label: "Requested No. of Guards", component: <RequestedGuardsForm onBack={() => setStep(0)} onNext={() => setStep(2)} /> },
    { label: "For Accounts/Finance", component: <AccountsFinanceForm onBack={() => setStep(1)} guards={guards} onSubmit={handleFinanceSubmit} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#eaf0f9]">
      <aside className="w-full lg:w-1/4 p-4 space-y-4">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`block w-full text-left p-4 rounded-lg ${step === i ? "bg-yellow-400" : "bg-gray-300"}`}
          >
            {s.label}
          </button>
        ))}
      </aside>

      <main className="w-full lg:w-3/4 p-6 bg-white shadow-md">
        {steps[step].component}
      </main>
    </div>
  );
}
