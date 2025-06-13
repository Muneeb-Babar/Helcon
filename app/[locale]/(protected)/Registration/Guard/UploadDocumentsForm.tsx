"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const uploadSchema = z.object({
  picture: z.any().refine((file) => file?.[0], "Picture is required"),
  cnicFront: z.any().refine((file) => file?.[0], "CNIC Front is required"),
  cnicBack: z.any().refine((file) => file?.[0], "CNIC Back is required"),
  licenseFront: z.any().refine((file) => file?.[0], "License Front is required"),
  licenseBack: z.any().refine((file) => file?.[0], "License Back is required"),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

export default function UploadDocumentsForm({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: UploadFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<UploadFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues,
  });

  const onSubmit = (data: UploadFormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Upload Employee Documents / Bio-Metric
      </h2>

      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[87.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 7 of 8</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FileInput label="Picture (Upto 5MB)" name="picture" register={register} error={errors.picture} />
        <FileInput label="CNIC Front" name="cnicFront" register={register} error={errors.cnicFront} />
        <FileInput label="CNIC Back" name="cnicBack" register={register} error={errors.cnicBack} />
        <FileInput label="Driving License Front" name="licenseFront" register={register} error={errors.licenseFront} />
        <FileInput label="Driving License Back" name="licenseBack" register={register} error={errors.licenseBack} />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
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
    </form>
  );
}

function FileInput({ label, name, register, error }: any) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <input
          type="text"
          placeholder={label}
          readOnly
          className="flex-1 px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700"
        />
        <label className="sm:w-10 sm:h-10 w-full flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200">
          +
          <input
            type="file"
            {...register(name)}
            className="hidden"
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
