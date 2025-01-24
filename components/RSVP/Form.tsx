"use client";

import React, { useState } from "react";

interface FormValues {
  name: string;
  attendance: string;
}
const Form: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    attendance: "Yes",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
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
    setFormValues({ name: "", attendance: "Yes" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        ¿Asistirás?
        <select
          name="attendance"
          value={formValues.attendance}
          onChange={handleChange}
        >
          <option value="Yes">Sí</option>
          <option value="No">No</option>
        </select>
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
