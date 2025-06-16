"use client";

import { useForm } from "react-hook-form";

export interface ContactFormData {
  pocName: string;
  pocDesignation: string;
  pocEmail: string;
  pocContact: string;
  alternateContactPerson: string;
  alternateContactNo: string;
}

interface Props {
  onBack: () => void;
  onSubmit: (data: ContactFormData) => void;
  defaultValues?: Partial<ContactFormData>;
}

export default function PrimaryContactForm({ onBack, onSubmit, defaultValues }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    defaultValues,
  });

  return (
    <>
      {/* Step Progress */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[90%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 2 of 2</p>
      </div>

      {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-xl font-semibold mb-2">Primary Contact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Point of Contact Name" name="pocName" register={register} error={errors.pocName} />
          <Input label="POC Designation" name="pocDesignation" register={register} error={errors.pocDesignation} />
          <Input label="POC Email" name="pocEmail" type="email" register={register} error={errors.pocEmail} />
          <Input label="POC Contact" name="pocContact" register={register} error={errors.pocContact} />
          <Input
            label="Alternate Contact Person"
            name="alternateContactPerson"
            register={register}
            error={errors.alternateContactPerson}
          />
          <Input
            label="Alternate Contact No."
            name="alternateContactNo"
            register={register}
            error={errors.alternateContactNo}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="border border-blue-500 text-blue-600 px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form> */}
    </>
  );
}

// Reusable Input component
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
