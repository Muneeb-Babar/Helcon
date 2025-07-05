"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const personalInfoSchema = z.object({
  mscNo: z.string().min(1, "MSC No. is required"),
  recruitmentDate: z.string().min(1, "Recruitment date is required"),
  recruitmentTime: z.string().min(1, "Recruitment time is required"),
  fullName: z.string().min(1, "Full name is required"),
  fatherName: z.string().min(1, "Father name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  cnic: z.string().regex(/^[0-9]{13}$/, "CNIC must be exactly 13 digits"),
  cnicIssueDate: z.string().min(1, "CNIC issue date is required"),
  cnicExpiryDate: z.string().min(1, "CNIC expiry date is required"),
  contactNo: z.string().regex(/^03[0-9]{9}$/, "Contact number must be valid"),
  currentAddress: z.string().min(5, "Current address is required"),
  permanentAddress: z.string().min(5, "Permanent address is required"),
  policeStationC: z.string().min(1, "Police station (C) is required"),
  contactNoC: z.string().regex(/^03[0-9]{9}$/, "Police contact number (C) must be valid"),
  areaPoliceP: z.string().min(1, "Area police station (P) is required"),
  policeContactP: z.string().regex(/^03[0-9]{9}$/, "Police contact number (P) must be valid"),
  religion: z.string().min(1, "Religion is required"),
  weight: z.string().regex(/^[0-9]+$/, "Weight must be a number (in kg)"),
  height: z.string().regex(/^[0-9]+$/, "Height must be a number (in cm)"),
  bloodPressure: z.string().min(1, "Blood pressure status is required"),
  eyeColor: z.string().min(1, "Eye color is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  heartBeat: z.string().min(1, "Heart beat condition is required"),
  disability: z.string().min(1, "Disability field is required"),
  eobiNo: z.string().regex(/^[0-9]{6,15}$/, "EOBI No. must be between 6 to 15 digits"),
  sessiNo: z.string().regex(/^[0-9]{6,15}$/, "SESSI/PESSI No. must be between 6 to 15 digits"),
});

export type FormData = z.infer<typeof personalInfoSchema>;

export default function PersonalInformationForm({
  onNext,
  defaultValues,
}: {
  onNext: (data: any) => void;
  defaultValues?: Partial<FormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    onNext(data); // Pass raw values, transformation will be handled in final payload
  };

  return (
    <div className="min-h-screen w-full bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[17.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 1 of 8</p>
      </div>

      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl px-4 py-6 sm:px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <SectionTitle title="Identification & Recruitment" />
          <Input name="mscNo" placeholder="MSC No." register={register} error={errors.mscNo} />
          <Input type="date" name="recruitmentDate" placeholder="Recruitment Date" register={register} error={errors.recruitmentDate} />
          <Input type="time" name="recruitmentTime" placeholder="Recruitment Time" register={register} error={errors.recruitmentTime} />

          <SectionTitle title="Personal Details" />
          <Input name="fullName" placeholder="Full Name" register={register} error={errors.fullName} className="sm:col-span-2" />
          <Input name="fatherName" placeholder="Father Name" register={register} error={errors.fatherName} />
          <Input type="date" name="dob" placeholder="Date of Birth" register={register} error={errors.dob} />

          <SectionTitle title="CNIC Details" />
          <Input name="cnic" placeholder="CNIC (13 digits)" register={register} error={errors.cnic} />
          <Input type="date" name="cnicIssueDate" placeholder="CNIC Issue Date" register={register} error={errors.cnicIssueDate} />
          <Input type="date" name="cnicExpiryDate" placeholder="CNIC Expiry Date" register={register} error={errors.cnicExpiryDate} />

          <SectionTitle title="Contact Info" />
          <Input name="contactNo" placeholder="Contact No." register={register} error={errors.contactNo} />
          <Input name="currentAddress" placeholder="Current Address" register={register} error={errors.currentAddress} className="sm:col-span-2" />
          <Input name="permanentAddress" placeholder="Permanent Address" register={register} error={errors.permanentAddress} className="sm:col-span-2" />

          <SectionTitle title="Police Station Info" />
          <Input name="policeStationC" placeholder="Police Station (C)" register={register} error={errors.policeStationC} />
          <Input name="contactNoC" placeholder="Police Contact (C)" register={register} error={errors.contactNoC} />
          <Input name="areaPoliceP" placeholder="Area Police Station (P)" register={register} error={errors.areaPoliceP} />
          <Input name="policeContactP" placeholder="Police Contact (P)" register={register} error={errors.policeContactP} />

          <SectionTitle title="Physical & Religion Info" />
          <Input name="weight" placeholder="Weight (kg)" register={register} error={errors.weight} />
          <Input name="height" placeholder="Height (cm)" register={register} error={errors.height} />
          <Select name="religion" options={["Islam", "Christianity", "Hinduism"]} register={register} error={errors.religion} />
          <Select name="bloodGroup" options={["A+", "B+", "O+", "AB+"]} register={register} error={errors.bloodGroup} />
          <Select name="bloodPressure" options={["Normal", "High", "Low"]} register={register} error={errors.bloodPressure} />
          <Select name="heartBeat" options={["Normal", "Irregular"]} register={register} error={errors.heartBeat} />
          <Select name="eyeColor" options={["Black", "Brown", "Blue"]} register={register} error={errors.eyeColor} />
          <Select name="disability" options={["None", "Yes"]} register={register} error={errors.disability} />

          <SectionTitle title="Social Security Info" />
          <Input name="eobiNo" placeholder="EOBI Number" register={register} error={errors.eobiNo} />
          <Input name="sessiNo" placeholder="SESSI/PESSI Number" register={register} error={errors.sessiNo} />

          <div className="col-span-full flex flex-col sm:flex-row justify-end gap-4 pt-6">
            <button type="button" className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-black rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ name, type = "text", placeholder, register, error, className = "" }: any) {
  return (
    <div className={`w-full ${className}`}>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}

function Select({ name, options, register, error, className = "" }: any) {
  return (
    <div className={`w-full ${className}`}>
      <select
        {...register(name)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select {name}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="col-span-full text-lg font-semibold pt-6">{title}</h2>;
}
