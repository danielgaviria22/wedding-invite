import React from "react";
import Image from "next/image";
import { TGuestInfo } from "@/types/invite.types";

type TConfirmedCardProps = {
  guestInfo: TGuestInfo;
  editable?: boolean;
  onEdit: () => void;
};

export const ConfirmedCard: React.FC<TConfirmedCardProps> = ({
  guestInfo,
  editable = false,
  onEdit,
}) => {
  const { name, email, phone, transport, food, drink } = guestInfo;
  return (
    <article className="relative border border-red-main p-1 mb-8">
      <div className="border-[0.5px] border-red-main p-2">
        <h4 className="font-medium px-2">{name}</h4>
        <p className="font-light text-xs px-2">
          {phone} / {email}
        </p>
        <hr className="my-2 border-dashed border-red-main" />
        <p className="font-light px-2 text-xs">
          <span className="font-medium">Transporte:</span> {transport}
        </p>
        <p className="font-light px-2 text-xs">
          <span className="font-medium">Comida:</span> {food}
        </p>
        <p className="font-light px-2 text-xs">
          <span className="font-medium">Bebidas:</span> {drink}
        </p>
      </div>
      {editable && (
        <button
          type="button"
          onClick={onEdit}
          className="absolute -top-2.5 -right-2.5"
        >
          <Image src="/icons/edit.svg" alt="Edit" />
        </button>
      )}
    </article>
  );
};
