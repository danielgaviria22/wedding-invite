"use client";

import React, { useState } from "react";
import { Input } from "../Input";
import { Select } from "../Select";
import { ConfirmedCard } from "./ConfirmedCard";
import { TGuestInfo } from "@/types/invite.types";

const foodRestriction = [
  { value: "Ninguna", label: "Ninguna" },
  { value: "Vegano", label: "Vegeno" },
  { value: "Vegetariano", label: "Vegetariano" },
  { value: "Otra", label: "Otra" },
];

const drinkOptions = [
  { value: "Whiskey", label: "Whiskey" },
  { value: "Vino", label: "Vino" },
  { value: "Cocktail", label: "Cocktail" },
  { value: "Cerveza", label: "Cerveza" },
  { value: "Tequila", label: "Tequila" },
  { value: "Vodka", label: "Vodka" },
  { value: "No Alcoholica", label: "No Alcoholica" },
];

const defaultFormValue = {
  name: "",
  phone: "",
  email: "",
  transport: "",
  food: "",
  drink: "",
};

type TFormProps = {
  numberOfGuests: number;
  inviteId: string;
};

const Form: React.FC<TFormProps> = ({ numberOfGuests, inviteId }) => {
  const [confirmedGuests, setConfirmedGuests] = useState<Array<TGuestInfo>>([]);
  const [formValues, setFormValues] = useState<TGuestInfo>(defaultFormValue);

  const resetForm = () => {
    setFormValues(defaultFormValue);
  };

  const handleChange =
    (fieldName: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setFormValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    };

  const handleConfirm = () => {
    if (confirmedGuests.length < numberOfGuests) {
      setConfirmedGuests((prevValues) => [...prevValues, formValues]);
      resetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const result = await res.json();
    alert(`${result.message} ${inviteId}`);
    resetForm();
  };

  return (
    <section className="flex justify-center bg-beige w-full text-red-main">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl px-10 pt-20 pb-60"
      >
        <h2 className="text-2xl text-center w-80 leading-5 mx-auto mb-10">
          ¡Queremos confirmar tu asistencia!
        </h2>
        <p className="text-center w-80 mx-auto leading-5 mb-10">
          Ayúdanos rellenando el siguiente formulario.
        </p>
        {confirmedGuests.map((guest) => (
          <ConfirmedCard
            key={guest.email}
            guestInfo={guest}
            editable
            onEdit={() => {}}
          />
        ))}
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
            setFormValues((prevValues) => ({ ...prevValues, transport: value }))
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
          options={foodRestriction}
          required
        />
        <Select
          label="Preferencias de bebidas"
          value={formValues.drink}
          onChange={(value) =>
            setFormValues((prevValues) => ({ ...prevValues, drink: value }))
          }
          options={drinkOptions}
          required
        />
        {confirmedGuests.length < numberOfGuests && (
          <button type="button" onClick={handleConfirm}>
            Confirmar
          </button>
        )}
        {confirmedGuests.length > 0 && <button type="submit">Enviar</button>}
      </form>
    </section>
  );
};

export default Form;
