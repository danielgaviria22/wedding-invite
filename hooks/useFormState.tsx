import { useEffect, useMemo, useState } from "react";
import { TGuestInfo } from "@/types/invite.types";
import { isValidGuestInfo, validateGuestInfo } from "../utils/form";

type UseFormStateProps = {
  numberOfGuests: number;
  inviteId: string;
  initialGuests: Array<TGuestInfo>;
};

const DEFAULT_FORM_VALUE = {
  name: "",
  phone: "",
  email: "",
  transport: "",
  food: "",
  drink: "",
};

export const useFormState = ({
  numberOfGuests,
  inviteId,
  initialGuests,
}: UseFormStateProps) => {
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

  useEffect(() => {
    if (initialGuests.length > 0) {
      setConfirmedGuests(initialGuests);
      setIsAddNewOpen(false);
      setWasSending(true);
    }
  }, [initialGuests]);

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
      setConfirmedGuests([...newConfirmedGuest]);
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

  return {
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
  };
};
