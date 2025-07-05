"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import PersonalInformationForm, { type FormData as PersonalInfoFormData } from "./PersonalInformationForm";
import NextOfKinForm from "./NextOfKinForm";
import AcademicLicenseForm, { AcademicLicenseFormData } from "./AcademicLicenseForm ";
import ExperienceForm, { ExperienceFormData } from "./ExperienceForm";
import ReferencesGuarantorsForm, { ReferenceFormData } from "./ReferencesForm";
import BankAccountForm, { BankFormData as BankAccountFormData } from "./BankAccountForm";
import UploadDocumentsForm, { UploadFormData } from "./UploadDocumentsForm";
import BiometricForm, { BiometricData } from "./BiometricForm";

const steps = [
  "Personal Information",
  "Next of Kin / Emergency Contact",
  "Academics & Licenses",
  "Experience",
  "References / Guarantors",
  "Add Bank Account",
  "Upload Employee Documents",
  "Bio-Metric",
];

type NextOfKinData = {
  kinName: string;
  kinFatherName: string;
  kinReligion: string;
  kinCNIC: string;
};

const requiredSteps: (keyof GuardFormData)[] = [
  "personal",
  "nextOfKin",
  "academicLicense",
  "experience",
  "references",
  "bankAccount",
  "uploadDocs",
  "biometric",
];

type GuardFormData = {
  personal?: PersonalInfoFormData;
  nextOfKin?: NextOfKinData;
  academicLicense?: AcademicLicenseFormData;
  experience?: ExperienceFormData;
  references?: ReferenceFormData;
  bankAccount?: BankAccountFormData;
  uploadDocs?: UploadFormData;
  biometric?: BiometricData;
  guardCategoryId?: string;
};

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<GuardFormData>({});
  const [loading, setLoading] = useState(false);

  const handleNext = (key: keyof GuardFormData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const formatFinalPayload = (
    data: GuardFormData & { biometric?: BiometricData; guardCategoryId: string }
  ) => {
    const toDate = (d: any) => {
      const date = new Date(d);
      return isNaN(date.getTime()) ? "" : date.toISOString();
    };

    return {
      registrationDate: toDate(data.personal?.recruitmentDate),
      fullName: data.personal?.fullName || "",
      fatherName: data.personal?.fatherName || "",
      dateOfBirth: toDate(data.personal?.dob),
      cnicNumber: data.personal?.cnic || "",
      cnicIssueDate: toDate(data.personal?.cnicIssueDate),
      currentAddress: data.personal?.currentAddress || "",
      permanentAddress: data.personal?.permanentAddress || "",
      socialSecurityNo: data.personal?.sessiNo || "",
      weight: Number(data.personal?.weight) || 0,
      height: Number(data.personal?.height) || 0,
      religion: data.personal?.religion || "",
      bloodGroup: data.personal?.bloodGroup || "",
      bloodPressure: data.personal?.bloodPressure || "",
      heartBeat: data.personal?.heartBeat || "",
      eyeColor: data.personal?.eyeColor || "",

      kinName: data.nextOfKin?.kinName || "",
      kinFatherName: data.nextOfKin?.kinFatherName || "",
      kinReligion: data.nextOfKin?.kinReligion || "",
      kinCNIC: data.nextOfKin?.kinCNIC || "",

      experience: Array.isArray(data.experience)
        ? data.experience
        : [],

      references: [
        {
          fullName: data.references?.guarantor1?.fullName || "",
          fatherName: data.references?.guarantor1?.fatherName || "",
          cnicNumber: data.references?.guarantor1?.cnic || "",
          contactNumber: data.references?.guarantor1?.contact || "",
          relationship: data.references?.guarantor1?.relationship || "",
          currentAddress: data.references?.guarantor1?.currentAddress || "",
          permanentAddress: data.references?.guarantor1?.permanentAddress || "",
        },
        {
          fullName: data.references?.guarantor2?.fullName || "",
          fatherName: data.references?.guarantor2?.fatherName || "",
          cnicNumber: data.references?.guarantor2?.cnic || "",
          contactNumber: data.references?.guarantor2?.contact || "",
          relationship: data.references?.guarantor2?.relationship || "",
          currentAddress: data.references?.guarantor2?.currentAddress || "",
          permanentAddress: data.references?.guarantor2?.permanentAddress || "",
        },
      ],

      bankAccount: {
        bankName: data.bankAccount?.bankName || "",
        bankCode: data.bankAccount?.bankCode || "",
        branchCode: data.bankAccount?.branchCode || "",
        branch: data.bankAccount?.branch || "",
        accountNumber: data.bankAccount?.accountNo || "",
        IBAN: data.bankAccount?.iban || "",
      },

      biometric: {
        rightThumb: data.biometric?.["Right Thumb"] || "",
        rightForeFinger: data.biometric?.["Right Fore Finger"] || "",
        rightMiddleFinger: data.biometric?.["Right Middle Finger"] || "",
        rightRingFinger: data.biometric?.["Right Ring Finger"] || "",
        rightLittleFinger: data.biometric?.["Right Little Finger"] || "",
        rightFourFinger: data.biometric?.["Right Four Fingers"] || "",

        leftThumb: data.biometric?.["Left Thumb"] || "",
        leftForeFinger: data.biometric?.["Left Fore Finger"] || "",
        leftMiddleFinger: data.biometric?.["Left Middle Finger"] || "",
        leftRingFinger: data.biometric?.["Left Ring Finger"] || "",
        leftLittleFinger: data.biometric?.["Left Little Finger"] || "",
        leftFourFinger: data.biometric?.["Left Four Fingers"] || "",
      },

      guardCategoryId: data.guardCategoryId,
    };
  };

  const handleSubmit = async (biometric?: BiometricData) => {
    const allData = { ...data, biometric };

    for (const key of requiredSteps) {
      if (!allData[key]) {
        const stepIndex = requiredSteps.indexOf(key);
        const stepName = steps[stepIndex];
        return Swal.fire({
          icon: "warning",
          title: "Missing Data",
          html: `Please complete step: <strong>${stepName}</strong> before submitting.`,
        });
      }
    }

    const token = localStorage.getItem("token");
    const guardCategoryId = localStorage.getItem("guardCategoryId");

    if (!token) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Token",
        html: "User is not authenticated.",
      });
    }

    if (!guardCategoryId) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Data",
        html: "Please select a rank to store guardCategoryId.",
      });
    }

    try {
      setLoading(true);

      const payload = formatFinalPayload({
        ...allData,
        guardCategoryId,
      });

      await axios.post("http://ec2-34-227-20-11.compute-1.amazonaws.com:5001/guards", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({ icon: "success", title: "Success", html: "Guard data submitted successfully!" });
      setData({});
      setStep(0);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: error?.response?.data?.message || "Submission failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <PersonalInformationForm onNext={(val) => handleNext("personal", val)} defaultValues={data.personal} />;
      case 1:
        return <NextOfKinForm onNext={(val) => handleNext("nextOfKin", val)} onBack={handleBack} defaultValues={data.nextOfKin} />;
      case 2:
        return (
          <AcademicLicenseForm
            onNext={(val: AcademicLicenseFormData) => handleNext("academicLicense", val)}
            onBack={handleBack}
            defaultValues={data.academicLicense as AcademicLicenseFormData}
          />
        );
      case 3:
        return <ExperienceForm onNext={(val) => handleNext("experience", val)} onBack={handleBack} defaultValues={data.experience} />;
      case 4:
        return <ReferencesGuarantorsForm onNext={(val) => handleNext("references", val)} onBack={handleBack} defaultValues={data.references} />;
      case 5:
        return <BankAccountForm onNext={(val) => handleNext("bankAccount", val)} onBack={handleBack} defaultValues={data.bankAccount} />;
      case 6:
        return <UploadDocumentsForm onNext={(val) => handleNext("uploadDocs", val)} onBack={handleBack} defaultValues={data.uploadDocs} />;
      case 7:
        return <BiometricForm onSubmit={handleSubmit} onBack={handleBack} defaultValues={data.biometric} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-1/4 bg-white p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Guard Registration</h2>
        {steps.map((label, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`block w-full text-left px-3 py-4 rounded mb-1 ${
              step === i ? "bg-yellow-400 font-semibold" : "bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </aside>
      <main className="flex-1 p-6 bg-white shadow-inner">
        {loading ? (
          <div className="text-center text-blue-600 font-semibold text-lg">Submitting, please wait...</div>
        ) : (
          renderStep()
        )}
      </main>
    </div>
  );
}
