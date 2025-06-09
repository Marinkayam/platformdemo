import React from "react";
import { useParams } from "react-router-dom";

export default function PortalUserDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Portal User Details</h1>
      <p className="text-lg text-gray-700 mb-2">Viewing details for Portal User ID: <span className="font-mono text-primary-main">{id}</span></p>
      <p className="text-gray-500 text-center">This page is under construction. More details will be displayed here.</p>
    </div>
  );
} 