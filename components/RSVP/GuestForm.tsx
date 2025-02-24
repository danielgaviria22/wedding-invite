"use client";

import React, { useState } from "react";
import { Input } from "../Input";
import { Select } from "../Select";
import { ConfirmedCard } from "./ConfirmedCard";
import { TGuestInfo } from "@/types/invite.types";
import { FOOD_RESTRICTION, DRINK_OPTIONS } from "./utils/constants";

type TGuestFormProps = {
  guest: TGuestInfo;
  enabledEdit: boolean;
  onEdit: () => void;
};

export const GuestForm: React.FC<TGuestFormProps> = ({
  guest,
  onEdit,
  enabledEdit,
}) => {
  const [formValues, setFormValues] = useState<TGuestInfo>(guest);
  const [isEditTurnedOn, setIsEditTurnedOn] = useState(false);

  const handleChange =
    (fieldName: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setFormValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    };

  const handleEdit = () => {
    onEdit();
  };

  return (
    <div className="flex justify-center bg-beige w-full text-red-main">
      {!isEditTurnedOn ? (
        <ConfirmedCard
          guestInfo={guest}
          editable={enabledEdit}
          onEdit={() => setIsEditTurnedOn(true)}
        />
      ) : (
        <>
          <h3 className="font-medium mb-4">Información Invitado</h3>
          <Input
            label="Nombre Completo"
            type="text"
            value={formValues.name}
            placeholder="-"
            onChange={handleChange("name")}
            required
          />
          <Input
            label="Telefono"
            type="tel"
            value={formValues.phone}
            placeholder="-"
            onChange={handleChange("phone")}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formValues.email}
            placeholder="-"
            onChange={handleChange("email")}
            required
          />
          <h3 className="font-medium mb-4 mt-6">Preferencias</h3>
          <Select
            label="Transporte al evento"
            value={formValues.transport}
            onChange={(value) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                transport: value,
              }))
            }
            options={[
              { value: "Por mi cuenta", label: "Por mi cuenta" },
              { value: "Necesito Ayuda", label: "Necesito Ayuda" },
            ]}
            required
          />
          <Select
            label="Preferencias alimenticias"
            value={formValues.food}
            onChange={(value) =>
              setFormValues((prevValues) => ({ ...prevValues, food: value }))
            }
            options={FOOD_RESTRICTION}
            required
          />
          <Select
            label="Preferencias de bebidas"
            value={formValues.drink}
            onChange={(value) =>
              setFormValues((prevValues) => ({ ...prevValues, drink: value }))
            }
            options={DRINK_OPTIONS}
            required
          />
          <button type="button" onClick={handleEdit}>
            Editar
          </button>
          <button type="submit">Cancelar</button>
        </>
      )}
    </div>
  );
};
