export const FOOD_RESTRICTION = [
  { value: "Ninguna", label: "Ninguna" },
  { value: "Vegano", label: "Vegeno" },
  { value: "Vegetariano", label: "Vegetariano" },
  { value: "Otra", label: "Otra" },
];

export const DRINK_OPTIONS = [
  { value: "Whiskey", label: "Whiskey" },
  { value: "Vino", label: "Vino" },
  { value: "Cocktail", label: "Cocktail" },
  { value: "Cerveza", label: "Cerveza" },
  { value: "Tequila", label: "Tequila" },
  { value: "Vodka", label: "Vodka" },
  { value: "No Alcoholica", label: "No Alcoholica" },
];

export const DEFAULT_FORM_VALUE = {
  name: "",
  phone: "",
  email: "",
  transport: "",
  food: "",
  drink: "",
};

export const BUTTON_CLASSES =
  "w-full block px-4 py-2.5 mb-4 border border-red-main border-b-2 border-r-2";
export const BUTTON_PRIMARY_CLASSES = `${BUTTON_CLASSES} font-medium bg-red-light text-beige`;
export const BUTTON_OUTLINE_CLASSES = `${BUTTON_CLASSES} text-red-main`;
