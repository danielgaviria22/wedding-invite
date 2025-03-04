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
  const [guestNumber, setGuestNumber] = useState<number>(-1);
  const [customFoodPreference, setCustomFoodPreference] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [wasSending, setWasSending] = useState(false);
  const [isCustomPreferenceChecked, setIsCustomPreferenceChecked] =
    useState(false);

  const isFormCompleted = useMemo(
    () => confirmedGuests.length === numberOfGuests,
    [confirmedGuests.length, numberOfGuests]
  );

  const showConfirmButton = useMemo(
    () =>
      (confirmedGuests.length < numberOfGuests && isAddNewOpen) ||
      guestNumber >= 0,
    [confirmedGuests.length, numberOfGuests, isAddNewOpen, guestNumber]
  );

  const resetForm = () => {
    setFormValues(DEFAULT_FORM_VALUE);
    setCustomFoodPreference("");
  };

  const handleChange =
    (fieldName: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setFormValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    };

  const handleConfirm = () => {
    if (confirmedGuests.length >= numberOfGuests && guestNumber < 0) {
      return;
    }
    const updatedValues = {
      ...formValues,
      food: formValues.food === "Otra" ? customFoodPreference : formValues.food,
    };
    const validatedInfo = validateGuestInfo(updatedValues);
    if (isValidGuestInfo(validatedInfo)) {
      if (guestNumber < 0) {
        setConfirmedGuests((prevValues) => [...prevValues, updatedValues]);
        setIsAddNewOpen(false);
        resetForm();
        return;
      }
      const newConfirmedGuest = confirmedGuests;
      newConfirmedGuest[guestNumber] = updatedValues;
      setConfirmedGuests(newConfirmedGuest);
      setIsAddNewOpen(false);
      setGuestNumber(-1);
      resetForm();
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

  const handleEdit = (index: number) => () => {
    setGuestNumber(index);
    setIsAddNewOpen(true);
    setFormValues(confirmedGuests[index]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guests: confirmedGuests, invite: inviteId }),
    });

    const result = await res.json();
    setIsLoading(false);
    if (result.message === "Success") {
      alert(`Su confirmación ha sido enviada con éxito`);
      setWasSending(true);
    } else {
      alert(`Upps. Ha ocurrido un error. Vuelva a intentar en unos minutos`);
    }
    resetForm();
  };

  return (
    <section className="flex justify-center bg-beige w-full text-red-main">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl px-10 pt-20 pb-60"
      >
        <h2 className="text-2xl text-center w-80 leading-5 mx-auto mb-10">
          {wasSending
            ? "¡Gracias por confirmar tu asistencia!"
            : "¡Queremos confirmar tu asistencia!"}
        </h2>
        <p className="text-center w-80 mx-auto leading-5 mb-10">
          {wasSending
            ? "Estamos emocionados por compartir este momento especial con:"
            : "Ayúdanos rellenando el siguiente formulario."}
        </p>
        {confirmedGuests.map((guest, i) => (
          <ConfirmedCard
            key={guest.name}
            guestInfo={guest}
            editable
            onEdit={handleEdit(i)}
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
            {confirmedGuests.length > 0 && guestNumber < 0 && (
              <Switch
                onToggle={(checked) => setIsCustomPreferenceChecked(checked)}
                isChecked={isCustomPreferenceChecked}
              >
                Personaliza las preferencias
              </Switch>
            )}
            <div className="mt-6">
              {(confirmedGuests.length === 0 ||
                guestNumber >= 0 ||
                isCustomPreferenceChecked) && (
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
                    onChange={(value) => {
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        food: value,
                      }));
                      // Si el valor seleccionado es "Otra", habilita el campo de entrada
                      if (value === "Otra") {
                        setCustomFoodPreference("");
                      }
                    }}
                    options={FOOD_RESTRICTION}
                    required
                  />
                  {formValues.food === "Otra" && (
                    <Input
                      label="Especifica tu preferencia"
                      type="text"
                      value={customFoodPreference}
                      onChange={(e) => setCustomFoodPreference(e.target.value)}
                      placeholder="Ej: Sin gluten, Sin nueces, etc."
                      required
                    />
                  )}
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
        {showConfirmButton && (
          <button
            type="button"
            className={BUTTON_PRIMARY_CLASSES}
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        )}
        {confirmedGuests.length > 0 && !isAddNewOpen && !wasSending && (
          <button type="submit" className={BUTTON_PRIMARY_CLASSES}>
            {isLoading ? "...Cargando" : "Enviar"}
          </button>
        )}
        {wasSending && (
          <p className="text-center w-80 mx-auto leading-5 mb-10 italic text-sm">
            Si necesitan algún cambio en la información, pueden comunicarse con
            nosotros.
          </p>
        )}
      </form>
    </section>
  );
};

export default Form;
