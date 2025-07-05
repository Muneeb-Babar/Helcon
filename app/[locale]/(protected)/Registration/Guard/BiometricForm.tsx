"use client";

import { useState } from "react";
import clsx from "clsx";

export type BiometricData = { [finger: string]: string };

interface BiometricFormProps {
  onBack: () => void;
  onSubmit: (data: BiometricData) => void;
  defaultValues?: BiometricData;
}

const FINGERS = [
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

export default function BiometricForm({
  onBack,
  onSubmit,
  defaultValues = {},
}: BiometricFormProps) {
  const [captured, setCaptured] = useState<BiometricData>(defaultValues);
  const [loading, setLoading] = useState<string | null>(null);
  const [isReady] = useState(true); // Simulated ready

  const captureFinger = async (finger: string) => {
    if (!isReady || loading) return;
    setLoading(finger);

    try {
      const template = btoa(`${finger}-${new Date().toISOString()}`);
      setCaptured((prev) => ({ ...prev, [finger]: template }));
    } catch (err) {
      console.error(`Error capturing ${finger}:`, err);
      alert(`Failed to capture ${finger}`);
    } finally {
      setLoading(null);
    }
  };

  const submitForm = () => {
    if (Object.keys(captured).length === 0) {
      alert("Please capture at least one fingerprint.");
      return;
    }
    onSubmit(captured);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Biometric Capture</h2>

      {/* Step Progress */}
      <div className="mb-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-[90.5%]" />
        </div>
        <p className="text-sm text-right mt-1 text-blue-600 font-medium">Step 8 of 8</p>
      </div>

      {!isReady && (
        <p className="text-center text-gray-600 mb-4">
          Initializing fingerprint device...
        </p>
      )}

      {/* Fingerprint Capture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FINGERS.map((finger) => {
          const isCaptured = Boolean(captured[finger]);
          const isLoading = loading === finger;

          return (
            <div key={finger} className="flex items-center justify-between gap-2">
              <span className="text-sm text-gray-800 truncate">{finger}</span>
              <button
                type="button"
                onClick={() => captureFinger(finger)}
                disabled={!isReady || isLoading}
                aria-label={`Capture ${finger}`}
                title={isCaptured ? "Captured" : "Click to capture"}
                className={clsx(
                  "w-10 h-10 rounded text-white font-bold text-lg",
                  isCaptured && "bg-green-500",
                  isLoading && "cursor-wait bg-gray-400",
                  !isCaptured && !isLoading && "bg-gray-300 hover:bg-gray-400"
                )}
              >
                {isLoading ? "…" : isCaptured ? "✓" : "+"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={submitForm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
