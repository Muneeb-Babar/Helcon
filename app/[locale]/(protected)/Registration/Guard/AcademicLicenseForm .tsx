"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// ✅ Schema
const academicLicenseSchema = z.object({
  education: z.string().min(1, "Education is required"),
  institute: z.string().min(1, "Institute/City is required"),
  drivingLicense: z.string().min(1, "Driving License selection is required"),
  licenseNo: z.string().min(1, "Driving License No. is required"),
  issueDate: z.string().min(1, "Date of Issue is required"),
  expiryDate: z.string().min(1, "Date of Expiry is required"),
  issuingCity: z.string().min(1, "Issuing City is required"),
});

export type AcademicLicenseFormData = z.infer<typeof academicLicenseSchema>;

export default function AcademicLicenseForm({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: AcademicLicenseFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<AcademicLicenseFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcademicLicenseFormData>({
    resolver: zodResolver(academicLicenseSchema),
    defaultValues,
  });

  const onSubmit = (data: AcademicLicenseFormData) => {
    onNext(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-6"
    >
      <Select
        name="education"
        label="Last Highest Education"
        options={["Matric", "Intermediate", "Bachelor", "Master"]}
        register={register}
        error={errors.education}
      />
      <Input
        name="institute"
        placeholder="Enter Institute/ City"
        label="Institute/ City"
        register={register}
        error={errors.institute}
      />

      <Select
        name="drivingLicense"
        label="Driving License"
        options={["Yes", "No"]}
        register={register}
        error={errors.drivingLicense}
      />
      <Input
        name="licenseNo"
        placeholder="Enter Driving License No."
        label="Driving License No."
        register={register}
        error={errors.licenseNo}
      />

      <Input
        name="issueDate"
        type="date"
        label="Date Of Issue (Driving License)"
        register={register}
        error={errors.issueDate}
      />
      <Input
        name="expiryDate"
        type="date"
        label="Date Of Expiry (Driving License)"
        register={register}
        error={errors.expiryDate}
      />

      <Select
        name="issuingCity"
        label="Issuing City"
        options={["Karachi", "Lahore", "Islamabad", "Peshawar"]}
        register={register}
        error={errors.issuingCity}
      />

      {/* Buttons */}
      <div className="col-span-full flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

function Input({
  name,
  register,
  error,
  placeholder,
  type = "text",
  label,
}: any) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error.message}</p>
      )}
    </div>
  );
}

function Select({ name, options, register, error, label }: any) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        {...register(name)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error.message}</p>
      )}
    </div>
  );
}
