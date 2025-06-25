"use client";

import React, { useState } from "react";
import {
  GuardAttendance,
  LocationAttendanceReportTable,
} from "./LocationAttendanceReportTable";

export default function Page() {
  const [guards, setGuards] = useState<GuardAttendance[]>([
    { id: 1, mscNo: "MSC-002512", guardName: "Zahid Khan", status: "P" },
    { id: 2, mscNo: "MSC-002512", guardName: "Muneeb Ubaid", status: "P" },
    { id: 3, mscNo: "MSC-002512", guardName: "Raza Khan", status: "P" },
    { id: 4, mscNo: "MSC-002512", guardName: "Naveed", status: "P" },
    { id: 5, mscNo: "MSC-002512", guardName: "Zubair", status: "P" },
    { id: 6, mscNo: "MSC-002512", guardName: "Kashan Khan", status: "P" },
    { id: 7, mscNo: "MSC-002512", guardName: "Umair Rind", status: "P" },
    { id: 8, mscNo: "MSC-002512", guardName: "Ahsan Ummer", status: "P" },
  ]);

  return (
    <div className="p-6 max-w-full">
      <LocationAttendanceReportTable guards={guards} />
    </div>
  );
}
