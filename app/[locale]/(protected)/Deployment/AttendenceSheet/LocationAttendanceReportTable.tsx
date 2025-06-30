"use client";

import React, { useEffect, useState } from "react";

export interface GuardAttendance {
  id: string | number;
  guardName: string;
  mscNo: string;
  status: "P" | "A" | "R" | "L";
  shift?: string;
}

interface Props {
  guards: GuardAttendance[];
}

export function LocationAttendanceReportTable({ guards }: Props) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDayName = (day: number) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed
    const date = new Date(year, month, day).getDay();
    return weekdays[date];
  };

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );
    setCurrentTime(
      now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  return (
    <div className="bg-[#EAF1FC] p-8 rounded-lg space-y-8">
      {/* Top Auto Fields */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Office ID", value: "Auto" },
          { label: "Supervisor ID", value: "Auto" },
          { label: "Date", value: currentDate },
          { label: "Time", value: currentTime },
        ].map(({ label, value }, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-[#F4F9FF] text-gray-700"
              value={value}
              readOnly
            />
          </div>
        ))}
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Select Location ID</label>
          <select className="w-full p-2 rounded bg-[#F4F9FF]">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Select Location Name</label>
          <select className="w-full p-2 rounded bg-[#F4F9FF]">
            <option>Select</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto rounded-lg border border-[#D4DDF5]">
        <table className="min-w-[1200px] text-sm text-left">
          <thead className="bg-[#EEF0FF] text-gray-700 font-bold">
            <tr>
              <th className="p-2">S.No</th>
              <th className="p-2">Name</th>
              <th className="p-2">MSC No.</th>
              <th className="p-2">P</th>
              <th className="p-2">A</th>
              <th className="p-2">R</th>
              <th className="p-2">L</th>
              {days.map((day) => (
                <th key={day} className="p-2 text-center whitespace-nowrap">
                  {day} <br />
                  {getDayName(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-sm">
            {guards.map((guard, index) => {
              const counts = {
                P: 26,
                A: 1,
                R: 3,
                L: 1,
              };
              return (
                <tr key={guard.id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{guard.guardName}</td>
                  <td className="p-2">{guard.mscNo}</td>
                  <td className="p-2">{counts.P}</td>
                  <td className="p-2">{counts.A}</td>
                  <td className="p-2">{counts.R}</td>
                  <td className="p-2">{counts.L}</td>
                  {days.map((day) => (
                    <td key={day} className="p-2 text-center">
                      {day === 1 || day === 2 || day === 3
                        ? "p"
                        : day === 8 || day === 9
                        ? "R"
                        : day === 18
                        ? "L"
                        : day === 31
                        ? "A"
                        : "p"}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
