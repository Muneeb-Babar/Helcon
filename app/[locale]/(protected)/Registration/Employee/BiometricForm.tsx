// BiometricForm.tsx
"use client";

import { useState } from "react";

export type BiometricData = { [key: string]: string };

interface BiometricFormProps {
  onBack: () => void;
  onSubmit: (data: BiometricData) => void;
  defaultValues?: BiometricData;
}

export default function BiometricForm({ onBack, onSubmit, defaultValues }: BiometricFormProps) {
  const [capturedFingers, setCapturedFingers] = useState<BiometricData>(defaultValues || {});
  const [loadingFinger, setLoadingFinger] = useState<string | null>(null);

  const fingers = [
    "Right Thumb",
    "Right Fore Finger",
    "Right Middle Finger",
    "Right Ring Finger",
    "Right Little Finger",
    "Right Four Fingers",
    "Left Thumb",
    "Left Fore Finger",
    "Left Middle Finger",
    "Left Ring Finger",
    "Left Little Finger",
    "Left Four Fingers",
  ];

  const handleCapture = async (finger: string) => {
    setLoadingFinger(finger);

    try {
      const simulatedFingerprint = btoa(`fingerprint-${finger}-${Date.now()}`);
      setCapturedFingers((prev) => ({
        ...prev,
        [finger]: simulatedFingerprint,
      }));
    } catch (err) {
      console.error("Capture failed", err);
      alert(`Failed to capture ${finger}`);
    } finally {
      setLoadingFinger(null);
    }
  };

  const handleSubmit = () => {
    console.log("🧬 Captured Bio-Metric Data:", capturedFingers);
    onSubmit(capturedFingers);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Bio-Metric</h2>
      <div className="w-full mb-6">
        <div className="h-1 bg-gray-200 rounded-full">
          <div className="h-1 bg-blue-500 w-[90.5%] rounded-full" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 8 of 8</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fingers.map((finger, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={finger}
              readOnly
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />
            <button
              type="button"
              onClick={() => handleCapture(finger)}
              disabled={loadingFinger === finger}
              className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded hover:bg-gray-300"
            >
              {capturedFingers[finger] ? "✓" : loadingFinger === finger ? "..." : "+"}
            </button>
          </div>
        ))}
      </div>

      <div className="col-span-full flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}