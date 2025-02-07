"use client";

import React, { useState } from "react";
import { Input } from "../Input";
import { Select } from "../Select";

type FormValues = {
  name: string;
  transport: string;
};

const Form: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    transport: "",
  });

  const handleChange =
    (fieldName: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setFormValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
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
    alert(result.message);
    setFormValues({ name: "", transport: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-beige">
      <Input
        label="Nombre Completo"
        type="text"
        value={formValues.name}
        onChange={handleChange("name")}
        required
      />
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
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
