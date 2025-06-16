"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define schema
const schema = z.object({
  mscNo: z.string().min(1, "MSC No. is required"),
  companyName: z.string().min(1, "Company Name is required"),
  website: z.string().url("Enter a valid URL"),
  industry: z.string().min(1, "Industry is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
  currentAddress: z.string().min(1, "Current Address is required"),
  contactNo: z.string().min(1, "Contact No. is required"),
  email: z.string().email("Enter a valid email"),
  recruitmentDate: z.string().min(1, "Recruitment Date is required"),
});

export type CompanyFormData = z.infer<typeof schema>;

interface Props {
  onNext: (data: CompanyFormData) => void;
  defaultValues?: Partial<CompanyFormData>;
}

export default function CompanyInformationForm({ onNext, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <>
      {/* Progress Bar */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[50.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 1 of 2</p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-8">
        <h2 className="text-xl font-semibold mb-2">Company Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="MSC No." name="mscNo" register={register} error={errors.mscNo} />
          <Input
            label="Recruitment Date"
            name="recruitmentDate"
            register={register}
            error={errors.recruitmentDate}
            type="date"
          />
          <Input label="Company Name" name="companyName" register={register} error={errors.companyName} />
          <Input label="Industry" name="industry" register={register} error={errors.industry} />
          <Input label="Website" name="website" register={register} error={errors.website} />
          <Input label="Address" name="address" register={register} error={errors.address} />
          <Input label="City" name="city" register={register} error={errors.city} />
          <Input label="Province/State" name="province" register={register} error={errors.province} />
          <Input label="Country" name="country" register={register} error={errors.country} />
          <Input label="Current Address" name="currentAddress" register={register} error={errors.currentAddress} />
          <Input label="Contact No." name="contactNo" register={register} error={errors.contactNo} />
          <Input label="Official Email" name="email" register={register} error={errors.email} type="email" />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          {/* Optional Cancel or Back Button if needed */}
          {/* <button type="button" className="border border-blue-500 text-blue-600 px-6 py-2 rounded-md">
            Cancel
          </button> */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
}

function Input({ label, name, register, error, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={`Enter ${label}`}
        className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
