import { TGuestInfo, TGuestValidation } from "@/types/invite.types";

export const validateGuestInfo = (guestInfo: TGuestInfo): TGuestValidation => {
  return Object.keys(guestInfo).reduce((acc, key) => {
    acc[key as keyof TGuestValidation] =
      guestInfo[key as keyof TGuestInfo].trim() !== "";
    return acc;
  }, {} as TGuestValidation);
};

export const isValidGuestInfo = (validation: TGuestValidation): boolean => {
  return Object.values(validation).every(Boolean);
};
