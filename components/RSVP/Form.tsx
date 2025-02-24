"use client";

import React, { useMemo, useState } from "react";
import { Input } from "../Input";
import { Select } from "../Select";
import { ConfirmedCard } from "./ConfirmedCard";
import { TGuestInfo } from "@/types/invite.types";
import {
  FOOD_RESTRICTION,
  DRINK_OPTIONS,
  DEFAULT_FORM_VALUE,
  BUTTON_OUTLINE_CLASSES,
  BUTTON_PRIMARY_CLASSES,
} from "./utils/constants";
import { Switch } from "../Switch";
import { isValidGuestInfo, validateGuestInfo } from "./utils/form";

type TFormProps = {
  numberOfGuests: number;
  inviteId: string;
};

const Form: React.FC<TFormProps> = ({ numberOfGuests, inviteId }) => {
  const [confirmedGuests, setConfirmedGuests] = useState<Array<TGuestInfo>>([]);
  const [formValues, setFormValues] = useState<TGuestInfo>(DEFAULT_FORM_VALUE);
  const [isAddNewOpen, setIsAddNewOpen] = useState(true);

  //const [isLoading, setIsLoading] = useState(false);
  //const [wasSending, setWasSending] = useState(false);
  const [isCustomPreferenceChecked, setIsCustomPreferenceChecked] =
    useState(false);

  const isFormCompleted = useMemo(
    () => confirmedGuests.length === numberOfGuests,
    [confirmedGuests.length, numberOfGuests]
  );

  const resetForm = () => {
    setFormValues(DEFAULT_FORM_VALUE);
  };

  const handleChange =
    (fieldName: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setFormValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    };

  const handleConfirm = () => {
    if (confirmedGuests.length >= numberOfGuests) {
      return;
    }
    const validatedInfo = validateGuestInfo(formValues);
    if (isValidGuestInfo(validatedInfo)) {
      setConfirmedGuests((prevValues) => [...prevValues, formValues]);
      setIsAddNewOpen(false);
      resetForm();
      return;
    }
  };

  const handleAddNewGuest = () => {
    setIsAddNewOpen(true);
    const previousGuestInfo = confirmedGuests[confirmedGuests.length - 1];
    if (previousGuestInfo) {
      setIsCustomPreferenceChecked(false);
      setFormValues((value) => ({
        ...value,
        drink: previousGuestInfo.drink,
        transport: previousGuestInfo.transport,
        food: previousGuestInfo.food,
      }));
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
            key={guest.name}
            guestInfo={guest}
            editable
            onEdit={() => {}}
          />
        ))}
        {isAddNewOpen && (
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
            {confirmedGuests.length > 0 && (
              <Switch
                onToggle={(checked) => setIsCustomPreferenceChecked(checked)}
                isChecked={isCustomPreferenceChecked}
              >
                Personaliza las preferencias
              </Switch>
            )}
            <div className="mt-6">
              {(confirmedGuests.length === 0 || isCustomPreferenceChecked) && (
                <>
                  <h3 className="font-medium mb-4">Preferencias</h3>
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
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        food: value,
                      }))
                    }
                    options={FOOD_RESTRICTION}
                    required
                  />
                  <Select
                    label="Preferencias de bebidas"
                    value={formValues.drink}
                    onChange={(value) =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        drink: value,
                      }))
                    }
                    options={DRINK_OPTIONS}
                    required
                  />
                </>
              )}
            </div>
          </>
        )}

        {!isFormCompleted && !isAddNewOpen && (
          <button
            type="button"
            className={BUTTON_OUTLINE_CLASSES}
            onClick={handleAddNewGuest}
          >
            Añadir otro invitado
          </button>
        )}
        {confirmedGuests.length < numberOfGuests && isAddNewOpen && (
          <button
            type="button"
            className={BUTTON_PRIMARY_CLASSES}
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        )}
        {confirmedGuests.length > 0 && !isAddNewOpen && (
          <button type="submit" className={BUTTON_PRIMARY_CLASSES}>
            Enviar
          </button>
        )}
      </form>
    </section>
  );
};

export default Form;
