
import React from "react";

interface PatientRecordsHeaderProps {
  title: string;
  description: string;
}

const PatientRecordsHeader: React.FC<PatientRecordsHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default PatientRecordsHeader;
