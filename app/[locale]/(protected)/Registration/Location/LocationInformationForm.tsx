"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";

const locationSchema = z.object({
  clientName: z.string().min(1, "Client Name is required"),
  dateTime: z.string().min(1, "Date and Time is required"),
  locationId: z.string(),
  locationName: z.string().min(1, "Location Name is required"),
  companyName: z.string().min(1, "Company Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  gps: z.string().min(1, "GPS Coordinates are required"),
  locationType: z.string().min(1, "Location Type is required"),
  authorizedName: z.string().min(1, "Authorized Name is required"),
  authorizedNumber: z.string().min(1, "Contact Number is required"),
  authorizedDesignation: z.string().min(1, "Designation is required"),
});

export type LocationInfoData = z.infer<typeof locationSchema>;

interface Props {
  onNext: (data: LocationInfoData) => void;
  defaultValues?: Partial<LocationInfoData>;
}

export default function LocationInformationForm({ onNext, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationInfoData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      locationId: "0",
      dateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      ...defaultValues,
    },
  });

  return (
    <div>
      {/* Progress & Step */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[33%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 1 of 3</p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectInput label="Select Client" name="clientName" register={register} error={errors.clientName} />
          <Input label="Date and Time" name="dateTime" type="datetime-local" register={register} error={errors.dateTime} />
          <Input label="Location ID" name="locationId" register={register} error={errors.locationId} disabled note="Auto Generate Location ID" />

          <Input label="Location Name" name="locationName" register={register} error={errors.locationName} />
          <Input label="Company Name" name="companyName" register={register} error={errors.companyName} />
          <Input label="Address" name="address" register={register} error={errors.address} />

          <SelectInput label="City" name="city" register={register} error={errors.city} />
          <SelectInput label="Province/State" name="state" register={register} error={errors.state} />
          <SelectInput label="Country" name="country" register={register} error={errors.country} />

          <Input label="GPS Coordinates" name="gps" register={register} error={errors.gps} />
          <SelectInput label="Location Type" name="locationType" register={register} error={errors.locationType} />
          <Input label="Authorized Person Name" name="authorizedName" register={register} error={errors.authorizedName} />

          <Input label="Authorized Person Number" name="authorizedNumber" register={register} error={errors.authorizedNumber} />
          <Input label="Authorized Person Designation" name="authorizedDesignation" register={register} error={errors.authorizedDesignation} />
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" className="text-blue-600 border border-blue-600 px-6 py-2 rounded-md hover:bg-blue-50">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

// Reusable Text Input
function Input({ label, name, register, error, type = "text", disabled = false, note }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...register(name)}
        type={type}
        disabled={disabled}
        placeholder={`Enter ${label}`}
        className={`w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}

// Reusable Select Input
function SelectInput({ label, name, register, error }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...register(name)}
        className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
