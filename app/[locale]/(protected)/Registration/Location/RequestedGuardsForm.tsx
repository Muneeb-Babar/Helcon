"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod Schema for Guards Form
const guardsSchema = z.object({
  description: z.string().min(1, "Description is required"),
  numberOfPersons: z.coerce.number().min(1, "Nos. of Person is required"),
  shiftType: z.string().min(1, "Shift Type is required"),
  daysPerMonth: z.coerce.number().min(1, "Days/Month is required"),
  chargesPerMonth: z.coerce.number().min(1, "Charges/Month is required"),
  overtimeRate: z.coerce.number().min(0, "Overtime/Hour is required"),
  allowance: z.coerce.number().min(0, "Allowance is required"),
});

export type GuardsFormData = z.infer<typeof guardsSchema>;

interface Props {
  onBack: () => void;
  onNext: (data: GuardsFormData) => void;
  defaultValues?: Partial<GuardsFormData>;
}

export default function RequestedGuardsForm({ onBack, onNext, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuardsFormData>({
    resolver: zodResolver(guardsSchema),
    defaultValues,
  });

  return (
    <>
      {/* Progress bar */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[66%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 2 of 3</p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-8">
        <h2 className="text-xl font-semibold mb-2">Requested No. of Guards</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Description" name="description" register={register} error={errors.description} />
          <Input label="Nos. of Person" name="numberOfPersons" type="number" register={register} error={errors.numberOfPersons} />
          <Input label="Shift Type" name="shiftType" register={register} error={errors.shiftType} />
          <Input label="Days/Month" name="daysPerMonth" type="number" register={register} error={errors.daysPerMonth} />
          <Input label="Charges/Month" name="chargesPerMonth" type="number" register={register} error={errors.chargesPerMonth} />
          <Input label="Overtime/Hour" name="overtimeRate" type="number" register={register} error={errors.overtimeRate} />
          <Input label="Allowance" name="allowance" type="number" register={register} error={errors.allowance} />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="border border-blue-500 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50"
          >
            Back
          </button>
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

// Reusable Input Field
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
