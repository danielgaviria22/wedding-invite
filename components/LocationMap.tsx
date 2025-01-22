import React from "react";

export const LocationMap = ({
  link,
  className,
}: {
  link: string;
  className: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      <iframe
        src={link}
        className="absolute inset-0 w-full h-full border-0"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};
