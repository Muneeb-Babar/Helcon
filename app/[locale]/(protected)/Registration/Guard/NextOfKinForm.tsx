"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const nextOfKinSchema = z.object({
  kinName: z.string().min(1, "Full name is required"),
  kinFatherName: z.string().min(1, "Father name is required"),
  kinReligion: z.string().min(1, "Religion Sect is required"),
  kinCNIC: z.string().regex(/^[0-9]{13}$/, "CNIC must be exactly 13 digits"),
});

type KinFormData = z.infer<typeof nextOfKinSchema>;

export default function NextOfKinForm({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: KinFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<KinFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KinFormData>({
    resolver: zodResolver(nextOfKinSchema),
    defaultValues,
  });

  const onSubmit = (data: KinFormData) => {
    onNext(data);
  };

  return (
    <main className="w-full lg:w-4/5 bg-white p-6">
      {/* Steps */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[27.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 2 of 8</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <h2 className="text-xl font-semibold col-span-full">
          Next of Kin / Emergency Contact
        </h2>

        <Input
          name="kinName"
          placeholder="Enter Full Name"
          register={register}
          error={errors.kinName}
        />
        <Input
          name="kinFatherName"
          placeholder="Enter Father Name"
          register={register}
          error={errors.kinFatherName}
        />
        <Select
          name="kinReligion"
          register={register}
          error={errors.kinReligion}
          options={["Sunni", "Shia", "Christian", "Other"]}
        />
        <Input
          name="kinCNIC"
          placeholder="Enter CNIC No."
          register={register}
          error={errors.kinCNIC}
        />

        {/* Buttons */}
        <div className="col-span-full flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </form>
    </main>
  );
}

function Input({ name, type = "text", placeholder, register, error }: any) {
  return (
    <div>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-sm text-red-600 pt-1">{error.message}</p>}
    </div>
  );
}

function Select({ name, options, register, error }: any) {
  return (
    <div>
      <select
        {...register(name)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select {name}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 pt-1">{error.message}</p>}
    </div>
  );
}
