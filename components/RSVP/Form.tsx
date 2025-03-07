"use client";

import React from "react";
import { Input } from "../Input";
import { Select } from "../Select";
import { ConfirmedCard } from "./ConfirmedCard";
import { TGuestInfo } from "@/types/invite.types";
import {
  FOOD_RESTRICTION,
  DRINK_OPTIONS,
  BUTTON_OUTLINE_CLASSES,
  BUTTON_PRIMARY_CLASSES,
} from "@/components/RSVP/constants";
import { Switch } from "../Switch";
import { useFormState } from "@/hooks/useFormState";

type TFormProps = {
  numberOfGuests: number;
  inviteId: string;
  initialGuests: Array<TGuestInfo>;
};

const Form: React.FC<TFormProps> = ({
  numberOfGuests,
  inviteId,
  initialGuests,
}) => {
  const {
    confirmedGuests,
    formValues,
    isAddNewOpen,
    guestNumber,
    customFoodPreference,
    isLoading,
    wasSending,
    isCustomPreferenceChecked,
    isFormCompleted,
    showConfirmButton,
    handleChange,
    handleConfirm,
    handleAddNewGuest,
    handleEdit,
    handleSubmit,
    setCustomFoodPreference,
    setIsCustomPreferenceChecked,
    setFormValues,
  } = useFormState({ numberOfGuests, inviteId, initialGuests });

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
            editable={!wasSending}
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
