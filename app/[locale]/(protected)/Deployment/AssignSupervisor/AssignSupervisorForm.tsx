'use client';

import { useState } from "react";
import { useForm, UseFormRegister, Path, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

const schema = z.object({
  mscNo: z.string().min(1, "MSC No. is required"),
  supervisorName: z.string().min(1, "Supervisor name is required"),
  clientId: z.string().min(1, "Client ID is required"),
  locationId: z.string().min(1, "Location ID is required"),
  category: z.string().min(1, "Assign category is required"),
});

type FormData = z.infer<typeof schema>;

type DeploymentItem = {
  id: number;
  clientId: string;
  locationId: string;
  deploymentDate: string;
  deployedTill: string;
  totalWorkingDays: number;
};

export default function TagSupervisorForm() {
  const [deployments, setDeployments] = useState<DeploymentItem[]>([]);
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      mscNo: "",
      supervisorName: "",
      clientId: "",
      locationId: "",
      category: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const totalDays = Math.floor(Math.random() * 100) + 1;

    const newItem: DeploymentItem = {
      id: deployments.length + 1,
      clientId: data.clientId,
      locationId: data.locationId,
      deploymentDate: currentDate, // ✅ use the current date here
      deployedTill: "Deployed Till",
      totalWorkingDays: totalDays,
    };

    setDeployments([...deployments, newItem]);

    reset({ clientId: "", locationId: "", category: "" });
  };

  const handleDelete = (id: number) => {
    setDeployments(deployments.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[#EAF1FC] min-h-screen p-4 md:p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-md space-y-6"
      >
        {/* Auto-filled info row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AutoInput label="Office ID" value="Auto" />
          <AutoInput label="Staff ID" value="Auto" />
          <AutoInput label="Date" value={format(new Date(currentDate), "P")} />
          <AutoInput label="Time" value={format(new Date(), "p")} />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Tag Supervisor with Locations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput<FormData>
            label="MSC. No."
            name="mscNo"
            register={register}
            error={errors.mscNo}
          />
          <SelectInput<FormData>
            label="Supervisor Name"
            name="supervisorName"
            register={register}
            error={errors.supervisorName}
          />
        </div>

        {/* Deployment Table */}
        <div className="bg-[#EEF0FF] rounded-lg overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-7 font-semibold text-sm text-gray-700 px-4 py-2 border-b">
              <div>S.NO</div>
              <div>Client ID</div>
              <div>Location ID</div>
              <div>Deployment Date</div>
              <div>Deployed Till</div>
              <div>Total Working Days</div>
              <div className="text-center">Action</div>
            </div>
            {deployments.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-7 text-sm px-4 py-2 items-center border-b bg-white">
                <div>{String(idx + 1).padStart(2, "0")}</div>
                <div>{item.clientId}</div>
                <div>{item.locationId}</div>
                <div>{item.deploymentDate ? format(new Date(item.deploymentDate), "P") : "Invalid Date"}</div>
                <div>{item.deployedTill}</div>
                <div>{item.totalWorkingDays}</div>
                <div className="text-center">
                  <button type="button" onClick={() => handleDelete(item.id)} className="text-gray-500 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignment fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectInput<FormData>
            label="Client ID"
            name="clientId"
            register={register}
            error={errors.clientId}
          />
          <SelectInput<FormData>
            label="Location ID"
            name="locationId"
            register={register}
            error={errors.locationId}
          />
          <SelectInput<FormData>
            label="Assign category"
            name="category"
            register={register}
            error={errors.category}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button type="button" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

interface AutoInputProps {
  label: string;
  value: string;
}

function AutoInput({ label, value }: AutoInputProps) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 block mb-1">{label}</label>
      <input
        type="text"
        value={value}
        disabled
        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500"
      />
    </div>
  );
}

interface SelectInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: { message?: string } | undefined;
}

function SelectInput<T extends FieldValues>({
  label,
  name,
  register,
  error,
}: SelectInputProps<T>) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
      <select
        {...register(name)}
        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500"
      >
        <option value="">Select</option>
        <option value="MSC-k001-001">MSC-k001-001</option>
        <option value="MSC-k001-002">MSC-k001-002</option>
      </select>
      {error?.message && <p className="text-xs text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
