"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schema
const experienceSchema = z.object({
  exServicemen: z.string().min(1, "Please select an option"),
  armyNo: z.string().optional(),
  rank: z.string().optional(),
  unit: z.string().optional(),
  branch: z.string().optional(),
  totalServiceYears: z.string().optional(),
  totalServiceMonths: z.string().optional(),
  dischargeBookNo: z.string().optional(),
  recentEmployment: z.string().optional(),
  placeOfDuty: z.string().optional(),
  totalYearsInSecurity: z.string().optional(),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

export default function ExperienceForm({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: ExperienceFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<ExperienceFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  const onSubmit = (data: ExperienceFormData) => {
    onNext(data);
  };

  return (
    <>
    {/* Steps */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[47.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 4 of 8</p>
      </div>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-6"
    >
      {/* Ex-Servicemen Section */}
      <Select
        name="exServicemen"
        label="Ex-Servicemen"
        options={["Yes", "No"]}
        register={register}
        error={errors.exServicemen}
      />
      <Input
        name="armyNo"
        label="Army No."
        placeholder="Enter Army No."
        register={register}
        error={errors.armyNo}
      />
      <Select
        name="rank"
        label="Rank"
        options={["Sepoy", "Havaldar", "Naik", "Captain", "Major"]}
        register={register}
        error={errors.rank}
      />
      <Input
        name="unit"
        label="Unit/ Corps Served"
        placeholder="Enter Unit/ Corps Served"
        register={register}
        error={errors.unit}
      />
      <Input
        name="branch"
        label="Branch"
        placeholder="Enter Branch"
        register={register}
        error={errors.branch}
      />

      {/* Total Service Duration */}
      <div className="w-full flex flex-col sm:flex-row gap-3">
        <Input
          name="totalServiceYears"
          label="Total Service - Years"
          type="number"
          placeholder="Years"
          register={register}
          error={errors.totalServiceYears}
        />
        <Input
          name="totalServiceMonths"
          label="Total Service - Months"
          type="number"
          placeholder="Months"
          register={register}
          error={errors.totalServiceMonths}
        />
      </div>

      <Input
        name="dischargeBookNo"
        label="Ex-Servicemen Discharge Book No."
        placeholder="Enter Discharge Book No."
        register={register}
        error={errors.dischargeBookNo}
      />

      {/* Civilian / Additional */}
      <Input
        name="recentEmployment"
        label="Recent Civil Employment"
        placeholder="Enter Recent Civil Employment"
        register={register}
        error={errors.recentEmployment}
      />
      <Input
        name="placeOfDuty"
        label="Place of Duty"
        placeholder="Enter Place of Duty"
        register={register}
        error={errors.placeOfDuty}
      />
      <Input
        name="totalYearsInSecurity"
        label="Total Years in Security"
        type="number"
        placeholder="Total Years in Security"
        register={register}
        error={errors.totalYearsInSecurity}
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
    </form></>
  );
}

// Shared Input
function Input({
  name,
  type = "text",
  placeholder,
  label,
  register,
  error,
  className = "",
}: any) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}

// Shared Select
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
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Select {label}</option>
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
