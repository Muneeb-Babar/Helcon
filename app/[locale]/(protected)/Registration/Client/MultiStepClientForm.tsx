"use client";

import { useState } from "react";
import CompanyInformationForm, { CompanyFormData } from "./CompanyInformationForm";
import PrimaryContactForm, { ContactFormData } from "./PrimaryContactForm";

// Define the form data types for each step
type MultiStepData = {
  company?: CompanyFormData;
  contact?: ContactFormData;
};

export default function MultiStepClientForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<MultiStepData>({});

  const steps = [
    { label: "Company Information" },
    { label: "Primary Contact" },
  ];

  const updateData = (key: keyof MultiStepData, data: any) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  const handleFinalSubmit = (contactData: ContactFormData) => {
    const allData = { ...formData, contact: contactData };
    console.log("📦 Final Submission:", allData);

    // 👉 TODO: Replace this with your API logic
    // await fetch("/api/submit", { ... })
  };

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <CompanyInformationForm
            onNext={(data) => {
              updateData("company", data);
              setStep(1);
            }}
            defaultValues={formData.company}
          />
        );
      case 1:
        return (
          <PrimaryContactForm
            onBack={() => setStep(0)}
            onSubmit={(data) => handleFinalSubmit(data)}
            defaultValues={formData.contact}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f9fafb]">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-1/4 bg-white shadow-md px-4 py-6 space-y-4">
        <h1 className="text-xl font-bold mb-4">Client Onboarding</h1>
        {steps.map((s, index) => (
          <button
            key={index}
            onClick={() => setStep(index)}
            className={`block w-full text-left px-4 py-3 rounded-lg transition ${
              step === index
                ? "bg-yellow-400 text-black font-semibold"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </aside>

      {/* Form Content */}
      <section className="w-full lg:w-3/4 p-4 sm:p-6 bg-white shadow-md">
        {renderForm()}
      </section>
    </div>
  );
}
