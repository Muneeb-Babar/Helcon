"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useGuardsStore } from "@/app/Store/guardsStore";

const guardsSchema = z.object({
  description: z.string().min(1, "Required"),
  numberOfPersons: z.coerce.number().min(1, "Required"),
  shiftType: z.string().min(1, "Required"),
  daysPerMonth: z.coerce.number().min(1, "Required"),
  chargesPerMonth: z.coerce.number().min(1, "Required"),
  overtimeRate: z.coerce.number().min(0, "Required"),
  allowance: z.coerce.number().min(0, "Required"),
});

export type GuardsFormData = z.infer<typeof guardsSchema>;

export default function RequestedGuardsForm({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { guards, addGuard, updateGuard, deleteGuard, editingGuard, setEditingGuard } = useGuardsStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<GuardsFormData>({
    resolver: zodResolver(guardsSchema),
  });

  const onSubmit = (data: GuardsFormData) => {
    if (editingGuard) {
      updateGuard({ ...data, id: editingGuard.id });
    } else {
      addGuard({ ...data, id: nanoid() });
    }
    reset();
    setEditingGuard(null);
  };

  const handleEdit = (guard: typeof editingGuard) => {
    setEditingGuard(guard);
    if (!guard) return;
    setValue("description", guard.description);
    setValue("numberOfPersons", guard.numberOfPersons);
    setValue("shiftType", guard.shiftType);
    setValue("daysPerMonth", guard.daysPerMonth);
    setValue("chargesPerMonth", guard.chargesPerMonth);
    setValue("overtimeRate", guard.overtimeRate);
    setValue("allowance", guard.allowance);
  };

  return (
    <div>
      {/* Progress Bar */}
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-600 w-[66.6%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 2 of 3</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Requested No. of Guards</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Select
          label="Description"
          name="description"
          register={register}
          error={errors.description}
          options={[
            "Ex-Servicemen",
            "Un-Armed Guards",
            "Armed Guards Civilian",
            "Supervisor",
            "SSG",
          ]}
        />
        <Input label="Nos. of Person" name="numberOfPersons" type="number" register={register} error={errors.numberOfPersons} />
        <Select label="Shift Type" name="shiftType" register={register} error={errors.shiftType} options={["Day", "Night", "Rotational"]} />
        <Input label="Days/Month" name="daysPerMonth" type="number" register={register} error={errors.daysPerMonth} />
        <Input label="Charges/Month" name="chargesPerMonth" type="number" register={register} error={errors.chargesPerMonth} />
        <Input label="Overtime/Hour" name="overtimeRate" type="number" register={register} error={errors.overtimeRate} />
        <Input label="Allowance" name="allowance" type="number" register={register} error={errors.allowance} />
        <button
          type="submit"
          className="bg-blue-500 text-white border mt-6 border-gray-300 hover:bg-yellow-500 font-semibold rounded-md px-4 py-2"
        >
          {editingGuard ? "Update" : "Add +"}
        </button>
      </form>

      {guards.length > 0 && (
        <div className="mb-4 space-y-2">
          {guards.map((guard) => (
            <div
              key={guard.id}
              className="grid grid-cols-1 md:grid-cols-8 gap-4 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border items-center"
            >
              <p>
                <b>Description:</b> {guard.description}
              </p>
              <p>
                <b>Nos.:</b> {guard.numberOfPersons}
              </p>
              <p>
                <b>Shift:</b> {guard.shiftType}
              </p>
              <p>
                <b>Days:</b> {guard.daysPerMonth}
              </p>
              <p>
                <b>Charges:</b> {guard.chargesPerMonth}
              </p>
              <p>
                <b>Overtime:</b> {guard.overtimeRate}
              </p>
              <p>
                <b>Allowance:</b> {guard.allowance}
              </p>
              <div className="flex gap-6">
                <button type="button" onClick={() => handleEdit(guard)} className="text-blue-600 hover:text-blue-800">
                  <Pencil size={16} />
                </button>
                <button type="button" onClick={() => deleteGuard(guard.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button onClick={onBack} className="border border-blue-500 text-blue-600 px-6 py-2 rounded-md">
          Cancel
        </button>
        <button
          onClick={() => (guards.length > 0 ? onNext() : alert("Please add at least one guard."))}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Shared Input + Select components
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

function Select({
  label,
  name,
  register,
  error,
  options,
}: {
  label: string;
  name: string;
  register: any;
  error: any;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...register(name)}
        className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
