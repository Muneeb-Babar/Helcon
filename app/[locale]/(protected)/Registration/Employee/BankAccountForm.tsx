"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const bankSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  bankCode: z.string().min(1, "Bank code is required"),
  accountNo: z.string().min(1, "Account number is required"),
  iban: z.string().min(1, "IBAN is required"),
  branchCode: z.string().min(1, "Branch code is required"),
  branch: z.string().min(1, "Branch is required"),
});

export type BankFormData = z.infer<typeof bankSchema>;

export default function BankAccountForm({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: BankFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<BankFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues,
  });

  const onSubmit = (data: BankFormData) => {
    onNext(data);
  };

  return (
    <>
    {/* Steps */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[70.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 6 of 8</p>
      </div>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-xl font-semibold mb-2">Add Bank Account</h2>
      {/* <div className="h-1 bg-gray-200 rounded-full mb-4">
        <div className="h-1 bg-blue-500 w-[62.5%] rounded-full" /> Step 5 of 8
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Bank Name"
          name="bankName"
          register={register}
          error={errors.bankName}
          options={["Meezan Bank", "UBL", "HBL", "MCB", "Allied Bank"]}
        />
        <Input label="Bank Code" name="bankCode" register={register} error={errors.bankCode} />
        <Input label="Account No." name="accountNo" register={register} error={errors.accountNo} />
        <Input label="IBAN" name="iban" register={register} error={errors.iban} />
        <Input label="Recent Branch Code" name="branchCode" register={register} error={errors.branchCode} />
        <Input label="Branch" name="branch" register={register} error={errors.branch} />
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
          Continue
        </button>
      </div>
    </form></>
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

function Select({ label, name, register, error, options }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...register(name)}
        className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {options.map((opt: string, idx: number) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
