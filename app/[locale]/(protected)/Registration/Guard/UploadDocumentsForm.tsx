"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

// Zod Schema
const uploadSchema = z.object({
  picture: z.any().refine((file) => file?.[0] instanceof File, "Picture is required"),
  cnicFront: z.any().refine((file) => file?.[0] instanceof File, "CNIC Front is required"),
  cnicBack: z.any().refine((file) => file?.[0] instanceof File, "CNIC Back is required"),
  licenseFront: z.any().refine((file) => file?.[0] instanceof File, "License Front is required"),
  licenseBack: z.any().refine((file) => file?.[0] instanceof File, "License Back is required"),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

interface Props {
  onNext: (data: {
    picture: string;
    cnicFront: string;
    cnicBack: string;
    licenseFront: string;
    licenseBack: string;
  }) => void;
  onBack: () => void;
  defaultValues?: Partial<UploadFormData>;
}

export default function UploadDocumentsForm({ onNext, onBack, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues,
  });

  const uploadFile = async (file: File): Promise<string> => {
    // Step 1: Get signed URL
    const { data } = await axios.post("https://api.guardsos.com/file/url", {
      fileName: file.name,
      fileType: file.type,
    });

    const { url, fileUrl } = data;

    // Step 2: Upload the file to the signed URL
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    return fileUrl;
  };

  const onSubmit = async (data: UploadFormData) => {
    try {
      const files = {
        picture: data.picture[0],
        cnicFront: data.cnicFront[0],
        cnicBack: data.cnicBack[0],
        licenseFront: data.licenseFront[0],
        licenseBack: data.licenseBack[0],
      };

      // Upload all files
      const [
        pictureUrl,
        cnicFrontUrl,
        cnicBackUrl,
        licenseFrontUrl,
        licenseBackUrl,
      ] = await Promise.all([
        uploadFile(files.picture),
        uploadFile(files.cnicFront),
        uploadFile(files.cnicBack),
        uploadFile(files.licenseFront),
        uploadFile(files.licenseBack),
      ]);

      // Pass uploaded URLs to onNext
      onNext({
        picture: pictureUrl,
        cnicFront: cnicFrontUrl,
        cnicBack: cnicBackUrl,
        licenseFront: licenseFrontUrl,
        licenseBack: licenseBackUrl,
      });
    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Upload Employee Documents
      </h2>

      {/* Step Progress */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[87.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 7 of 8</p>
      </div>

      {/* File Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FileInput label="Picture (Upto 5MB)" name="picture" register={register} error={errors.picture} watch={watch} />
        <FileInput label="CNIC Front" name="cnicFront" register={register} error={errors.cnicFront} watch={watch} />
        <FileInput label="CNIC Back" name="cnicBack" register={register} error={errors.cnicBack} watch={watch} />
        <FileInput label="License Front" name="licenseFront" register={register} error={errors.licenseFront} watch={watch} />
        <FileInput label="License Back" name="licenseBack" register={register} error={errors.licenseBack} watch={watch} />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="border border-blue-500 text-blue-600 px-6 py-2 rounded-md"
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
  );
}

// Reusable File Input
function FileInput({
  label,
  name,
  register,
  error,
  watch,
}: {
  label: string;
  name: string;
  register: any;
  error: any;
  watch: any;
}) {
  const selectedFile = watch(name)?.[0];

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <input
          type="text"
          readOnly
          value={selectedFile?.name || ""}
          placeholder={`Select ${label}`}
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
