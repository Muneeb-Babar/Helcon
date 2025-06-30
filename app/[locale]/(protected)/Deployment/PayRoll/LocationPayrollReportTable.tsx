"use client";

import React, { useEffect, useState } from "react";

interface GuardPayroll {
  id: number;
  name: string;
  mscNo: string;
  clientId: string;
  locationId: string;
  locationName: string;
  category: string;
  shift: string;
  P: number;
  A: number;
  R: number;
  L: number;
  overTime: number;
  allowance: number;
  guzH: number;
  netSalary: number;
  total: number;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function PayrollReport() {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [daysInMonth, setDaysInMonth] = useState<number>(0);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const guardsData: GuardPayroll[] = [
    {
      id: 1,
      name: "Zahid Khan",
      mscNo: "002512",
      clientId: "MSC-002512",
      locationId: "MSC-002512",
      locationName: "Loc 1",
      category: "Un-Armed",
      shift: "MSC-002512",
      P: 26,
      A: 1,
      R: 3,
      L: 1,
      overTime: 0,
      allowance: 0,
      guzH: 0,
      netSalary: 30000,
      total: 30000,
    },
    // Additional entries here...
  ];

  const filteredGuards = selectedLocation
    ? guardsData.filter((g) => g.locationName === selectedLocation)
    : guardsData;

  useEffect(() => {
    if (selectedMonth) {
      const monthIndex = months.indexOf(selectedMonth);
      const year = new Date().getFullYear();
      const days = new Date(year, monthIndex + 1, 0).getDate();
      setDaysInMonth(days);
    }
  }, [selectedMonth]);

  const currentDate = new Date().toLocaleDateString("en-GB");
  const currentTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-[#EAF1FC] p-8 rounded-lg space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Office ID", value: "Auto" },
          { label: "Supervisor ID", value: "Auto" },
          { label: "Date", value: currentDate },
          { label: "Time", value: currentTime },
        ].map(({ label, value }, i) => (
          <div key={i}>
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

      <h2 className="text-lg font-semibold text-gray-900">
        Location Attendance Report
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Select Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full p-2 rounded bg-[#EEF1FD]"
          >
            <option value="">Select</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">NO of Days</label>
          <input
            className="w-full p-2 rounded bg-[#EEF1FD]"
            value={daysInMonth || "Select"}
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Do you want to Fetch Specific Location Attendance Report If Yes then please select location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-2 rounded bg-[#EEF1FD]"
          >
            <option value="">Select</option>
            <option value="Loc 1">Loc 1</option>
            <option value="Loc 2">Loc 2</option>
          </select>
        </div>
        <button className="bg-[#4F6DF5] text-white px-6 py-2 rounded hover:bg-blue-700">
          Fetch Report
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#D4DDF5]">
        <table className="min-w-[1200px] text-sm text-left border border-[#D4DDF5] shadow-sm rounded-lg overflow-hidden">
  <thead className="bg-[#EEF0FF] text-gray-700 font-semibold text-xs uppercase tracking-wide">
    <tr>
      {[
        "S.No", "Name", "MSC No.", "Client ID", "Location Id", "location Name",
        "Category", "Shift", "P", "A", "R", "L", "Over Time", "Allowance",
        "Guz. H", "Net Salary", "Over Time", "Allowance", "Guz. H", "Total"
      ].map((header, idx) => (
        <th key={idx} className="px-3 py-2 border border-[#D4DDF5] text-center whitespace-nowrap">
          {header}
        </th>
      ))}
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 text-gray-800">
    {filteredGuards.map((g, index) => (
      <tr key={g.id} className="hover:bg-[#f4f7ff] transition duration-150 ease-in-out">
        <td className="px-3 py-2 text-center">{index + 1}</td>
        <td className="px-3 py-2">{g.name}</td>
        <td className="px-3 py-2 text-center">{g.mscNo}</td>
        <td className="px-3 py-2 text-center">{g.clientId}</td>
        <td className="px-3 py-2 text-center">{g.locationId}</td>
        <td className="px-3 py-2 text-center">{g.locationName}</td>
        <td className="px-3 py-2 text-center">{g.category}</td>
        <td className="px-3 py-2 text-center">{g.shift}</td>
        <td className="px-3 py-2 text-center">{g.P}</td>
        <td className="px-3 py-2 text-center">{g.A}</td>
        <td className="px-3 py-2 text-center">{g.R}</td>
        <td className="px-3 py-2 text-center">{g.L}</td>
        <td className="px-3 py-2 text-center">{g.overTime}</td>
        <td className="px-3 py-2 text-center">{g.allowance}</td>
        <td className="px-3 py-2 text-center">{g.guzH}</td>
        <td className="px-3 py-2 text-center font-medium text-green-600">{g.netSalary.toLocaleString()}</td>
        <td className="px-3 py-2 text-center">{g.overTime}</td>
        <td className="px-3 py-2 text-center">{g.allowance}</td>
        <td className="px-3 py-2 text-center">{g.guzH}</td>
        <td className="px-3 py-2 text-center font-semibold text-blue-700">{g.total.toLocaleString()}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
}
