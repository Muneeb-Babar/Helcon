"use client";

import React, { useEffect, useState } from "react";

export interface GuardAttendance {
  id: string | number;
  guardName: string;
  mscNo: string;
  status: "P" | "A" | "R" | "L";
}

const guardsLocation1: GuardAttendance[] = [
  { id: 1, mscNo: "MSC-001", guardName: "Zahid Khan", status: "P" },
  { id: 2, mscNo: "MSC-002", guardName: "Ali Khan", status: "P" },
];

const guardsLocation2: GuardAttendance[] = [
  { id: 3, mscNo: "MSC-003", guardName: "Noman Ahmed", status: "P" },
  { id: 4, mscNo: "MSC-004", guardName: "Hassan Raza", status: "A" },
];

export function LocationAttendanceReportTable() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [locationId, setLocationId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [guards, setGuards] = useState<GuardAttendance[]>(guardsLocation1);
  const [heading, setHeading] = useState("Location 1 - ABC Town");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDayName = (day: number) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    return weekdays[new Date(year, month, day).getDay()];
  };

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

  const handleFetchReport = () => {
    if (locationId === "1" && locationName === "ABC Town") {
      setGuards(guardsLocation1);
      setHeading("Location 1 - ABC Town");
    } else if (locationId === "2" && locationName === "XYZ Sector") {
      setGuards(guardsLocation2);
      setHeading("Location 2 - XYZ Sector");
    } else {
      setGuards([]);
      setHeading("No Location Selected");
    }
  };

  return (
    <div className="bg-[#EAF1FC] p-8 rounded-lg space-y-6">
      {/* Top Inputs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Office ID", value: "Auto" },
          { label: "Supervisor ID", value: "Auto" },
          { label: "Date", value: currentDate },
          { label: "Time", value: currentTime },
        ].map(({ label, value }, index) => (
          <div key={index}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <input
              className="w-full px-3 py-2 rounded bg-[#F4F9FF] border border-gray-300"
              value={value}
              readOnly
            />
          </div>
        ))}
      </div>

      {/* Section Title */}
      <h2 className="text-lg font-bold text-gray-800">Location Attendance Report</h2>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select className="p-2 rounded bg-[#EAEFFF]">
          <option>Select Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i}>{new Date(0, i).toLocaleString("default", { month: "long" })}</option>
          ))}
        </select>

        <select className="p-2 rounded bg-[#EAEFFF]">
          <option>Select No of Days</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      {/* Location ID & Name Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <select
          className="p-2 rounded bg-[#EAEFFF]"
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
        >
          <option value="">Select Location ID</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <select
          className="p-2 rounded bg-[#EAEFFF]"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        >
          <option value="">Select Location Name</option>
          <option value="ABC Town">ABC Town</option>
          <option value="XYZ Sector">XYZ Sector</option>
        </select>

        <button
          onClick={handleFetchReport}
          className="bg-[#5570F1] text-white px-6 py-2 rounded hover:bg-[#4050d2]"
        >
          Fetch Report
        </button>
      </div>

      {/* Table Title */}
      <h3 className="text-md font-semibold text-gray-700 mt-20">
        Location Attendance Report: {heading}
      </h3>

      {/* Attendance Table */}
      <div className="overflow-x-auto rounded-lg border border-[#D4DDF5] bg-white">
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
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <th key={day} className="p-2 text-center whitespace-nowrap">
                  {day}
                  <br />
                  {getDayName(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guards.length === 0 ? (
              <tr>
                <td colSpan={38} className="text-center py-4 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              guards.map((guard, index) => {
                const counts = { P: 26, A: 1, R: 3, L: 1 };
                return (
                  <tr key={guard.id} className="border-t">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{guard.guardName}</td>
                    <td className="p-2">{guard.mscNo}</td>
                    <td className="p-2">{counts.P}</td>
                    <td className="p-2">{counts.A}</td>
                    <td className="p-2">{counts.R}</td>
                    <td className="p-2">{counts.L}</td>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <td key={day} className="p-2 text-center">
                        {day === 8 || day === 9
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
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
