"use client";

import { useState } from "react";
import PersonalInformationForm, { FormData } from "./PersonalInformationForm";
import NextOfKinForm from "./NextOfKinForm";
import AcademicLicenseForm from "./AcademicLicenseForm ";
import ExperienceForm, { ExperienceFormData } from "./ExperienceForm";
import ReferencesGuarantorsForm, { ReferenceFormData } from "./ReferencesForm";

type GuardFormData = {
  personal?: FormData;
  nextOfKin?: any;
  academicLicense?: any;
  experience?: ExperienceFormData;
  references?: ReferenceFormData;
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<GuardFormData>({});

  const goToStep = (step: number) => setCurrentStep(step);

  const updateStepData = (stepKey: keyof GuardFormData, data: any) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
  };

  const steps = [
    { label: "Personal Information" },
    { label: "Next of Kin / Emergency Contact" },
    { label: "Academics & Licenses" },
    { label: "Experience" },
    { label: "References / Guarantors" },
  ];

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
              setCurrentStep(2);
            }}
            onBack={() => setCurrentStep(0)}
            defaultValues={formData.nextOfKin}
          />
        );
      case 2:
        return (
          <AcademicLicenseForm
            onNext={(data) => {
              updateStepData("academicLicense", data);
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
            defaultValues={formData.academicLicense}
          />
        );
      case 3:
        return (
          <ExperienceForm
            onNext={(data) => {
              updateStepData("experience", data);
              setCurrentStep(4);
            }}
            onBack={() => setCurrentStep(2)}
            defaultValues={formData.experience}
          />
        );
      case 4:
        return (
          <ReferencesGuarantorsForm
            onNext={(data) => {
              updateStepData("references", data);
              console.log("✅ All form data:", {
                ...formData,
                references: data,
              });
              // Proceed to next step here if needed
              // setCurrentStep(5);
            }}
            onBack={() => setCurrentStep(3)}
            defaultValues={formData.references}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-1/5 bg-white shadow-md px-4 py-6 space-y-4">
        <h1 className="text-xl font-bold mb-4">Guards Registration</h1>
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={`block w-full text-left px-4 py-3 rounded-lg transition ${
              currentStep === index
                ? "bg-yellow-400 text-black font-semibold"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {step.label}
          </button>
        ))}
      </aside>

      {/* Form Renderer */}
      <section className="w-full lg:w-4/5 p-0">
        <div className="bg-white w-full h-full p-4 sm:p-6">{renderForm()}</div>
      </section>
    </div>
  );
}
