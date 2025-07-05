"use client";

import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// ✅ Schema
const experienceSchema = z.object({
  exServicemen: z.string().min(1, "Please select an option"),
  armyNo: z.string().optional(),
  rankName: z.string().optional(),
  guardCategoryId: z.string().optional(),
  unit: z.string().optional(),
  branch: z.string().optional(),
  serviceYears: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" })
    .transform(Number)
    .optional(),
  serviceMonths: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" })
    .transform(Number)
    .optional(),
  dischargeBookNo: z.string().optional(),
  recentEmployment: z.string().optional(),
  place: z.string().optional(),
  securityYears: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" })
    .transform(Number)
    .optional(),
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
    setValue,
    watch,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  const selectedRank = watch("rankName");

  useEffect(() => {
    const postRankCategory = async () => {
      if (!selectedRank) return;
      try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
          "http://ec2-34-227-20-11.compute-1.amazonaws.com:5001/guard-category",
          { categoryName: selectedRank.toLowerCase() },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const categoryId = res.data?.data?.id;

        if (categoryId) {
          setValue("guardCategoryId", categoryId);
          localStorage.setItem("guardCategoryId", categoryId);
          console.log("✅ guardCategoryId stored:", categoryId);
        }
      } catch (err) {
        console.error("❌ Failed to fetch guardCategoryId:", err);
        Swal.fire("Error", "Failed to get Guard Category ID", "error");
      }
    };

    postRankCategory();
  }, [selectedRank, setValue]);

  const onSubmit = (data: ExperienceFormData) => {
    onNext(data);
  };

  return (
    <>
      {/* Step Progress */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[47.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">
          Step 4 of 8
        </p>
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
          name="rankName"
          label="Rank"
          options={["Sepoy", "Havaldar", "Naik", "Captain", "Major"]}
          register={register}
          error={errors.rankName}
        />
        <Input
          name="unit"
          label="Unit/ Corps Served"
          placeholder="Enter Unit"
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

        {/* Service Duration */}
        <div className="w-full flex flex-col sm:flex-row gap-3 sm:col-span-2">
          <Input
            name="serviceYears"
            label="Total Service - Years"
            type="number"
            placeholder="Years"
            register={register}
            error={errors.serviceYears}
          />
          <Input
            name="serviceMonths"
            label="Total Service - Months"
            type="number"
            placeholder="Months"
            register={register}
            error={errors.serviceMonths}
          />
        </div>

        <Input
          name="dischargeBookNo"
          label="Discharge Book No."
          placeholder="Enter Discharge Book No."
          register={register}
          error={errors.dischargeBookNo}
        />
        <Input
          name="recentEmployment"
          label="Recent Civil Employment"
          placeholder="Enter Recent Employment"
          register={register}
          error={errors.recentEmployment}
        />
        <Input
          name="place"
          label="Place of Duty"
          placeholder="Enter Place of Duty"
          register={register}
          error={errors.place}
        />
        <Input
          name="securityYears"
          label="Total Years in Security"
          type="number"
          placeholder="Years"
          register={register}
          error={errors.securityYears}
        />

        {/* Hidden Field for guardCategoryId */}
        <input type="hidden" {...register("guardCategoryId")} />

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
    </>
  );
}

// Reusable Input Component
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

// Reusable Select Component
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
