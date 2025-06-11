// contexts/FormDataContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type FormData = Record<string, any>;

const FormDataContext = createContext<{
  formData: FormData;
  setFormData: (data: FormData) => void;
}>({
  formData: {},
  setFormData: () => {},
});

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({});
  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormDataContext = () => useContext(FormDataContext);
