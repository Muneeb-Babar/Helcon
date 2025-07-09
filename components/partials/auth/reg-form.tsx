"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

type Address = {
  state: string;
  contact: string;
  email: string;
  address: string;
};

type Inputs = {
  logo: FileList;
  companyName: string;
  addresses: Address[];
};

const RegForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      addresses: [{ state: "", contact: "", email: "", address: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Logo
        </label>
        <input
          type="file"
          {...register("logo")}
          className="block w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          type="text"
          {...register("companyName", { required: "Company name is required" })}
          className="block w-full border border-gray-300 rounded px-3 py-2 text-sm"
          placeholder="e.g. Techlancer Ltd"
        />
        {errors.companyName && (
          <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
        )}
      </div>

      {/* Address Sections */}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="border border-gray-200 rounded p-4 relative">
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            )}

            <h4 className="text-sm font-semibold text-gray-800 mb-4">
              Address {index + 1}
            </h4>

            {/* State/Province */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State / Province
              </label>
              <input
                type="text"
                {...register(`addresses.${index}.state`, { required: "State is required" })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="e.g. Sindh"
              />
              {errors.addresses?.[index]?.state && (
                <p className="text-red-500 text-xs mt-1">{errors.addresses[index].state?.message}</p>
              )}
            </div>

            {/* Contact No. */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact No.
              </label>
              <input
                type="tel"
                {...register(`addresses.${index}.contact`, {
                  required: "Contact number is required",
                })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="+92 300 1234567"
              />
              {errors.addresses?.[index]?.contact && (
                <p className="text-red-500 text-xs mt-1">{errors.addresses[index].contact?.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register(`addresses.${index}.email`, {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="you@example.com"
              />
              {errors.addresses?.[index]?.email && (
                <p className="text-red-500 text-xs mt-1">{errors.addresses[index].email?.message}</p>
              )}
            </div>

            {/* Address Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                rows={3}
                {...register(`addresses.${index}.address`, { required: "Address is required" })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Street, City, ZIP"
              />
              {errors.addresses?.[index]?.address && (
                <p className="text-red-500 text-xs mt-1">{errors.addresses[index].address?.message}</p>
              )}
            </div>
          </div>
        ))}

        {/* Add More Address Button */}
        <div>
          <button
            type="button"
            onClick={() => append({ state: "", contact: "", email: "", address: "" })}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add More Address
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-black  text-white py-2 rounded text-sm font-medium"
        >
          Register Company
        </button>
      </div>
    </form>
  );
};

export default RegForm;
