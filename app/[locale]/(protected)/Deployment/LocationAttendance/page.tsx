"use client";

import React, { useState } from "react";
import {
  DailyLocationAttendanceTable,
  GuardAttendance,
} from "./DailyLocationAttendanceTable";

export default function DailyPage() {
  const [guards, setGuards] = useState<GuardAttendance[]>([
    {
      id: 1,
      mscNo: "MSC-00251",
      guardName: "Zaffar Khan",
      shift: "Morning",
      status: "P",
    },
    {
      id: 2,
      mscNo: "MSC-00251",
      guardName: "Zaffar Khan",
      shift: "Morning",
      status: "P",
    },
    {
      id: 3,
      mscNo: "MSC-00251",
      guardName: "Zaffar Khan",
      shift: "Morning",
      status: "P",
    },
  ]);

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <DailyLocationAttendanceTable guards={guards} onChange={setGuards} />
    </div>
  );
}
