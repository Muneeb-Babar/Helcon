"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";

const financeEntrySchema = z.object({
  salaryPerMonth: z.string().min(1, "Required"),
  overtimeHour: z.string().min(1, "Required"),
  allowance: z.string().min(1, "Required"),
});

export type FinanceFormData = Record<string, z.infer<typeof financeEntrySchema>>;

interface GuardDetails {
  description: string;
  numberOfPersons: number;
  shiftType: string;
  daysPerMonth: number;
  chargesPerMonth: number;
  overtimeRate: number;
  allowance: number;
}

interface Props {
  onBack: () => void;
  onSubmit: (data: FinanceFormData) => void;
  guards: GuardDetails[];
  defaultValues?: FinanceFormData;
}

export default function AccountsFinanceForm({
  onBack,
  onSubmit,
  guards,
  defaultValues,
}: Props) {
  const form = useForm<FinanceFormData>({
    resolver: async (values) => {
      const issues: any = {};
      for (const guard of guards) {
        const entry = await financeEntrySchema.safeParseAsync(
          values[guard.description]
        );
        if (!entry.success) issues[guard.description] = entry.error.format();
      }
      return { values, errors: issues };
    },
    defaultValues:
      defaultValues ||
      guards.reduce(
        (acc, guard) => ({
          ...acc,
          [guard.description]: {
            salaryPerMonth: "",
            overtimeHour: "",
            allowance: "",
          },
        }),
        {}
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <>
      <div className="w-full mb-6">
        <div className="h-[3px] bg-gray-200 rounded-full">
          <div className="h-[3px] bg-blue-600 w-full rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">
          Step 3 of 3
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        For Accounts/Finance
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {guards.map((guard, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-8 gap-3 bg-white p-4 rounded-lg border border-gray-200"
          >
            <ReadOnlyField label="Description" value={guard.description} />
            <ReadOnlyField label="Charges/Month" value={guard.chargesPerMonth} />
            <ReadOnlyField label="Overtime/Hour" value={guard.overtimeRate} />
            <ReadOnlyField label="Allowance" value={guard.allowance} />
            <Input
              label="Salary/Month"
              name={`${guard.description}.salaryPerMonth`}
              register={register}
              error={errors?.[guard.description]?.salaryPerMonth}
            />
            <Input
              label="Overtime/Hour"
              name={`${guard.description}.overtimeHour`}
              register={register}
              error={errors?.[guard.description]?.overtimeHour}
            />
            <Input
              label="Allowance"
              name={`${guard.description}.allowance`}
              register={register}
              error={errors?.[guard.description]?.allowance}
            />
          </div>
        ))}

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-green-50 border border-green-400 text-green-700 text-sm">
        <span className="truncate">{value}</span>
        {/* <CheckCircle2 size={16} className="text-green-500" /> */}
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  register,
  error,
  type = "text",
}: {
  label: string;
  name: string;
  register: any;
  error: any;
  type?: string;
}) {
  return (
    <div className="w-full ">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder="Enter"
        className="w-full px-6 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error?.message}</p>
      )}
    </div>
  );
}
