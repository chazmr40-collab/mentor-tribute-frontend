// src/pages/Tributes.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sample from "../data/mentors.sample.json";
import { addItem } from "../store/itemsStore";

export default function Tributes() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    organization: "",
    years: "",
    quote: "",
    photo: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.role || !form.organization) {
      alert("Please fill name, role, and organization.");
      return;
    }

    const id = crypto?.randomUUID?.() || "m" + Date.now();

    addItem(
      {
        id,
        name: form.name.trim(),
        role: form.role.trim(),
        organization: form.organization.trim(),
        years: form.years.trim(),
        quote: form.quote.trim(),
        photo:
          form.photo.trim() ||
          `https://picsum.photos/seed/${encodeURIComponent(form.name)}/300/300`,
      },
      sample
    );

    // ✅ This is why it feels like a “reset” — it navigates Home after saving
    navigate("/");
  }

  return (
    <main style={{ padding: 16, maxWidth: 640 }}>
      <h1>Add a Tribute</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Name *
          <input name="name" value={form.name} onChange={onChange} required />
        </label>

        <label>
          Role/Title *
          <input name="role" value={form.role} onChange={onChange} required />
        </label>

        <label>
          Organization *
          <input name="organization" value={form.organization} onChange={onChange} required />
        </label>

        <label>
          Years (e.g., 2005–2012)
          <input name="years" value={form.years} onChange={onChange} />
        </label>

        <label>
          Quote
          <input name="quote" value={form.quote} onChange={onChange} />
        </label>

        <label>
          Photo URL (optional)
          <input name="photo" value={form.photo} onChange={onChange} />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Save Tribute</button>
          <button type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </main>
  );
}






