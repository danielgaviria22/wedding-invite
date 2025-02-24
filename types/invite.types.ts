export type TInviteData = {
  id: string;
  invitationRecipient: string;
  numberOfGuests: number;
};

export type TGuestInfo = {
  name: string;
  phone: string;
  email: string;
  transport: string;
  food: string;
  drink: string;
};

export type TGuestValidation = {
  name: boolean;
  phone: boolean;
  email: boolean;
  transport: boolean;
  food: boolean;
  drink: boolean;
};
