"use client";

import { useState } from "react";
import PersonalInformationForm, { FormData } from "./PersonalInformationForm";
import NextOfKinForm from "./NextOfKinForm";
import AcademicLicenseForm from "./AcademicLicenseForm "; 
import ExperienceForm, { ExperienceFormData } from "./ExperienceForm";
import ReferencesGuarantorsForm, { ReferenceFormData } from "./ReferencesForm";
import BankAccountForm, { BankFormData as BankAccountFormData } from "./BankAccountForm";
import UploadDocumentsForm, { UploadFormData } from "./UploadDocumentsForm";
import BiometricForm, { BiometricData } from "./BiometricForm";

type GuardFormData = {
  personal?: FormData;
  nextOfKin?: any;
  academicLicense?: any;
  experience?: ExperienceFormData;
  references?: ReferenceFormData;
  bankAccount?: BankAccountFormData;
  uploadDocs?: UploadFormData;
  biometric?: BiometricData;
};

export default function MultiStepEmployeeForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<GuardFormData>({});

  const goToStep = (step: number) => setCurrentStep(step);

  const updateStepData = (stepKey: keyof GuardFormData, data: any) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
  };

  const handleFinalSubmit = (biometricData: BiometricData) => {
    const finalData = { ...formData, biometric: biometricData };
    console.log("✅ Final Submission:", finalData);
    // Replace with your API call
  };

  const steps = [
    { label: "Personal Information" },
    { label: "Next of Kin / Emergency Contact" },
    { label: "Academics & Licenses" },
    { label: "Experience" },
    { label: "References / Guarantors" },
    { label: "Add Bank Account" },
    { label: "Upload Employee Documents" },
    { label: "Bio-Metric" },
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
              setCurrentStep(5);
            }}
            onBack={() => setCurrentStep(3)}
            defaultValues={formData.references}
          />
        );
      case 5:
        return (
          <BankAccountForm
            onNext={(data) => {
              updateStepData("bankAccount", data);
              setCurrentStep(6);
            }}
            onBack={() => setCurrentStep(4)}
            defaultValues={formData.bankAccount}
          />
        );
      case 6:
        return (
          <UploadDocumentsForm
            onNext={(data) => {
              updateStepData("uploadDocs", data);
              setCurrentStep(7);
            }}
            onBack={() => setCurrentStep(5)}
            defaultValues={formData.uploadDocs}
          />
        );
      case 7:
        return (
          <BiometricForm
            onSubmit={handleFinalSubmit}
            onBack={() => setCurrentStep(6)}
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
        <h1 className="text-xl font-bold mb-4">Employee Registration</h1>
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
      <section className="w-full lg:w-3/4 p-4 sm:p-6 bg-white shadow-md">
        {renderForm()}
      </section>
    </div>
  );
}
