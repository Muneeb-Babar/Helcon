'use client';

import React from 'react';
import PersonalInformationForm from './PersonalInformationForm';
import { FormDataProvider } from '@/app/context/FormDataContext';
import MultiStepForm from './MultiStepForm';

const Page = () => {
  const handleNext = (data: any) => {
    console.log('Personal Information Form Data:', data);
    // You can store this in state or context for later use
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Personal Information</h1>
        <FormDataProvider>
  <MultiStepForm/>
</FormDataProvider>
      </div>
    </div>
  );
};

export default Page;
