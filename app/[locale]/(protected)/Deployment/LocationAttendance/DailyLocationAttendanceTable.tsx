"use client";

import React, { useEffect, useState } from "react";

export interface GuardAttendance {
  id: number;
  mscNo: string;
  guardName: string;
  shift: string;
  status: "P" | "A" | "R" | "L";
}

interface Props {
  guards: GuardAttendance[];
  onChange: (updatedList: GuardAttendance[]) => void;
}

export function DailyLocationAttendanceTable({ guards, onChange }: Props) {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();

    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  }, []);

  const handleStatusChange = (id: number, status: GuardAttendance["status"]) => {
    const updated = guards.map((g) => (g.id === id ? { ...g, status } : g));
    onChange(updated);
  };

  return (
    <div className="bg-[#EAF1FC] p-8 rounded-lg space-y-12">
      {/* Top Auto Fields */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Office ID</label>
          <input
            className="w-full px-3 py-2 rounded bg-[#F4F9FF] text-gray-700"
            value="Auto"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor ID</label>
          <input
            className="w-full px-3 py-2 rounded bg-[#F4F9FF] text-gray-700"
            value="Auto"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            className="w-full px-3 py-2 rounded bg-[#F4F9FF] text-gray-700"
            value={currentDate}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            className="w-full px-3 py-2 rounded bg-[#F4F9FF] text-gray-700"
            value={currentTime}
            readOnly
          />
        </div>
      </div>

      {/* Section Title */}
      <h2 className="text-lg font-medium">Daily Location Attendance</h2>

      {/* Location Select Dropdowns */}
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

      {/* Attendance Table */}
      <div className="overflow-x-auto rounded-lg border border-[#D4DDF5]">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#EEF0FF] text-gray-700 font-bold">
            <tr>
              <th className="p-3">S.NO</th>
              <th className="p-3">MSC No.</th>
              <th className="p-3">Guard Name</th>
              <th className="p-3">Shift</th>
              <th className="p-3">Attendance</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {guards.map((guard, index) => (
              <tr key={guard.id} className="bg-white border-t">
                <td className="p-3">{String(index + 1).padStart(2, "0")}</td>
                <td className="p-3">{guard.mscNo}</td>
                <td className="p-3">{guard.guardName}</td>
                <td className="p-3">{guard.shift}</td>
                <td className="p-3">
                  <div className="flex space-x-4 items-center">
                    {["P", "A", "R", "L"].map((status) => (
                      <label key={status} className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name={`status-${guard.id}`}
                          checked={guard.status === status}
                          onChange={() => handleStatusChange(guard.id, status as any)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <button className="bg-green-500 text-white rounded-full px-4 py-1 hover:bg-green-600 text-sm">
                    SUBMIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-center gap-6 mt-4">
        <button className="border border-blue-600 text-blue-600 px-8 py-2 rounded hover:bg-blue-50">
          Cancel
        </button>
        <button className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
}
