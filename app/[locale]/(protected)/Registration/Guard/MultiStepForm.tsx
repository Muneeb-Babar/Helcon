"use client";

import { useState } from "react";
import PersonalInformationForm from "./PersonalInformationForm";
import NextOfKinForm from "./NextOfKinForm";

type FormData = {
  personal?: any;
  nextOfKin?: any;
};

const steps = [
  { label: "Personal Information" },
  { label: "Next of Kin / Emergency Contact" },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  const goToStep = (step: number) => setCurrentStep(step);

  const updateStepData = (stepKey: keyof FormData, data: any) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInformationForm
            onNext={(data) => {
              updateStepData("personal", data);
              setCurrentStep(1);
            }}
            defaultValues={formData.personal}
          />
        );
      case 1:
        return (
          <NextOfKinForm
            onNext={(data) => {
              updateStepData("nextOfKin", data);
              console.log("All form data:", {
                ...formData,
                nextOfKin: data,
              });
            }}
            onBack={() => setCurrentStep(0)}
            defaultValues={formData.nextOfKin}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/5 bg-white shadow-md px-4 py-6 space-y-4">
        <h1 className="text-xl font-bold mb-4">Guards Registration</h1>
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition ${
              currentStep === index
                ? "bg-yellow-400 text-black font-semibold"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {step.label}
          </button>
        ))}
      </aside>

      {/* Form Content */}
      <section className="w-full lg:w-4/5 p-0">
        <div className="bg-white w-full h-full p-4 sm:p-6">
          {renderForm()}
        </div>
      </section>
    </div>
  );
}
