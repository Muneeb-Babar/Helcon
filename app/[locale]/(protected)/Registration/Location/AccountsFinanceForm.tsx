"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const financeSchema = z.object({
  salaryPerMonth: z.string().min(1, "Required"),
  overtimeRate: z.string().min(1, "Required"),
  allowance: z.string().min(1, "Required"),
});

export type FinanceFormData = z.infer<typeof financeSchema>;

interface Props {
  onBack: () => void;
  onSubmit: (data: FinanceFormData) => void;
  defaultValues?: Partial<FinanceFormData>;
}

export default function AccountsFinanceForm({
  onBack,
  onSubmit,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinanceFormData>({
    resolver: zodResolver(financeSchema),
    defaultValues,
  });

  return (
    <>
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-full rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 3 of 3</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-xl font-semibold mb-2">For Accounts/Finance</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Salary/Month" name="salaryPerMonth" register={register} error={errors.salaryPerMonth} />
          <Input label="Overtime/Hour" name="overtimeRate" register={register} error={errors.overtimeRate} />
          <Input label="Allowance" name="allowance" register={register} error={errors.allowance} />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={onBack} className="border border-blue-500 text-blue-600 px-6 py-2 rounded-md">
            Back
          </button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Submit
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
