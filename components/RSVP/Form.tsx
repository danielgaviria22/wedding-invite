"use client";

import React from "react";
import Image from "next/image";
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
import { isValidGuestInfo } from "@/utils/form";
import { FadeInSection } from "../FadeInSection";

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
    validationErrors,
    handleChange,
    handleSelectChange,
    handleConfirm,
    handleAddNewGuest,
    handleEdit,
    handleSubmit,
    setCustomFoodPreference,
    setIsCustomPreferenceChecked,
  } = useFormState({ numberOfGuests, inviteId, initialGuests });

  return (
    <section className="flex justify-center bg-blue-darkest w-full text-blue-light">
      <FadeInSection className="w-full flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-3xl px-10 py-8">
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
          <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center lg:gap-6 lg:mb-6">
            {confirmedGuests.map((guest, i) => (
              <ConfirmedCard
                key={guest.name}
                guestInfo={guest}
                editable={!wasSending}
                onEdit={handleEdit(i)}
              />
            ))}
          </div>

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
                hasError={
                  validationErrors.name !== undefined
                    ? !validationErrors.name
                    : false
                }
              />
              <Input
                label="Telefono"
                type="tel"
                value={formValues.phone}
                placeholder="-"
                onChange={handleChange("phone")}
                required
                hasError={
                  validationErrors.phone !== undefined
                    ? !validationErrors.phone
                    : false
                }
              />
              <Input
                label="Email"
                type="email"
                value={formValues.email}
                placeholder="-"
                onChange={handleChange("email")}
                required
                hasError={
                  validationErrors.email !== undefined
                    ? !validationErrors.email
                    : false
                }
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
                      onChange={handleSelectChange("transport")}
                      options={[
                        { value: "Por mi cuenta", label: "Por mi cuenta" },
                        { value: "Necesito Ayuda", label: "Necesito Ayuda" },
                      ]}
                      required
                      hasError={
                        validationErrors.transport !== undefined
                          ? !validationErrors.transport
                          : false
                      }
                    />
                    <Select
                      label="Preferencias alimenticias"
                      value={formValues.food}
                      onChange={(value) => {
                        handleSelectChange("food")(value);
                        if (value === "Otra") {
                          setCustomFoodPreference("");
                        }
                      }}
                      options={FOOD_RESTRICTION}
                      required
                      hasError={
                        validationErrors.food !== undefined
                          ? !validationErrors.food
                          : false
                      }
                    />
                    {formValues.food === "Otra" && (
                      <Input
                        label="Especifica tu preferencia"
                        type="text"
                        value={customFoodPreference}
                        onChange={(e) =>
                          setCustomFoodPreference(e.target.value)
                        }
                        placeholder="Ej: Sin gluten, Sin nueces, etc."
                        required
                      />
                    )}
                    <Select
                      label="Preferencias de bebidas"
                      value={formValues.drink}
                      onChange={handleSelectChange("drink")}
                      options={DRINK_OPTIONS}
                      required
                      hasError={
                        validationErrors.drink !== undefined
                          ? !validationErrors.drink
                          : false
                      }
                    />
                  </>
                )}
              </div>
            </>
          )}

          {!isFormCompleted && !isAddNewOpen && !wasSending && (
            <button
              type="button"
              className={`${BUTTON_OUTLINE_CLASSES} flex justify-between`}
              onClick={handleAddNewGuest}
            >
              <p>Añadir otro invitado</p>
              <Image src="./icons/add.svg" alt="+" width={24} height={24} />
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
              Si necesitan algún cambio en la información, pueden comunicarse
              con nosotros.
            </p>
          )}
          {!isValidGuestInfo(validationErrors) && (
            <p className="text-center w-80 mx-auto leading-5 mb-10 italic text-sm text-red-error">
              ¡Aún hacen falta campos por llenar!
            </p>
          )}
        </form>
      </FadeInSection>
    </section>
  );
};

export default Form;
