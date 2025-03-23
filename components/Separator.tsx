import React from "react";

type TSeparatorProps = {
  rotated?: boolean;
};

export const Separator: React.FC<TSeparatorProps> = ({ rotated = false }) => {
  if (rotated) {
    return (
      <>
        <div className="w-full h-[2px] bg-red-main mt-[3px]"></div>
        <div className="w-full h-px bg-red-main mt-[3px]"></div>
      </>
    );
  }

  return (
    <>
      <div className="w-full h-px bg-red-main mb-[3px]"></div>
      <div className="w-full h-[2px] bg-red-main mb-[3px]"></div>
    </>
  );
};
