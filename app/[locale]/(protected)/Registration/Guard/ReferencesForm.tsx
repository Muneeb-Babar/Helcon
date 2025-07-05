"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation schema
const referenceSchema = z.object({
  guarantor1: z.object({
    fullName: z.string().min(1, "Full name is required"),
    fatherName: z.string().optional(),
    cnic: z.string().min(13, "CNIC must be 13 digits").max(13, "CNIC must be 13 digits"),
    contact: z.string().optional(),
    relationship: z.string().optional(),
    permanentAddress: z.string().optional(),
    currentAddress: z.string().optional(),
    refCnicUpload: z.any().optional(),
  }),
  guarantor2: z.object({
    fullName: z.string().min(1, "Full name is required"),
    fatherName: z.string().optional(),
    cnic: z.string().min(13, "CNIC must be 13 digits").max(13, "CNIC must be 13 digits"),
    contact: z.string().optional(),
    relationship: z.string().optional(),
    permanentAddress: z.string().optional(),
    currentAddress: z.string().optional(),
    refCnicUpload: z.any().optional(),
  }),
});

export type ReferenceFormData = z.infer<typeof referenceSchema>;

export default function ReferencesForm({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: ReferenceFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<ReferenceFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ReferenceFormData>({
    resolver: zodResolver(referenceSchema),
    defaultValues,
  });

  const onSubmit = (data: ReferenceFormData) => {
    const fixedData: ReferenceFormData = {
      guarantor1: {
        ...data.guarantor1,
        refCnicUpload: data.guarantor1.refCnicUpload?.[0] || undefined,
      },
      guarantor2: {
        ...data.guarantor2,
        refCnicUpload: data.guarantor2.refCnicUpload?.[0] || undefined,
      },
    };

    onNext(fixedData);
  };

  return (
    <>
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[57.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 5 of 8</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-6">
        <GuarantorFields
          title="Guarantor no. 1"
          prefix="guarantor1"
          register={register}
          errors={errors?.guarantor1 || {}}
          watch={watch}
        />
        <GuarantorFields
          title="Guarantor no. 2"
          prefix="guarantor2"
          register={register}
          errors={errors?.guarantor2 || {}}
          watch={watch}
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
}

// Guarantor field group
function GuarantorFields({ title, prefix, register, errors, watch }: any) {
  const fileWatch = watch(`${prefix}.refCnicUpload`);
  const fileName = fileWatch?.[0]?.name;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <h3 className="col-span-full text-lg font-semibold text-gray-700">{title}</h3>

      <Input label="Full Name" name={`${prefix}.fullName`} register={register} error={errors?.fullName} />
      <Input label="Father's Name" name={`${prefix}.fatherName`} register={register} error={errors?.fatherName} />
      <Input label="Ref. CNIC No." name={`${prefix}.cnic`} register={register} error={errors?.cnic} />
      <Input label="Ref. Contact No." name={`${prefix}.contact`} register={register} error={errors?.contact} />
      <Input label="Relationship" name={`${prefix}.relationship`} register={register} error={errors?.relationship} />
      <Input label="Permanent Address" name={`${prefix}.permanentAddress`} register={register} error={errors?.permanentAddress} />
      <Input label="Current Address" name={`${prefix}.currentAddress`} register={register} error={errors?.currentAddress} />

      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Ref. CNIC</label>
        <input
          type="file"
          {...register(`${prefix}.refCnicUpload`)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        {fileName && <p className="text-sm text-green-600 mt-1">{fileName}</p>}
        {errors?.refCnicUpload && (
          <p className="text-sm text-red-600 mt-1">{errors?.refCnicUpload.message}</p>
        )}
      </div>
    </div>
  );
}

// Input component
function Input({ label, name, register, error, type = "text" }: any) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={`Enter ${label}`}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
