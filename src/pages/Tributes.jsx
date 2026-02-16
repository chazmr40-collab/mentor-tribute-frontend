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

    // very light validation
    if (!form.name || !form.role || !form.organization) {
      alert("Please fill name, role, and organization.");
      return;
    }

    const id =
      (crypto && crypto.randomUUID && crypto.randomUUID()) || "m" + Date.now();

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

    // go back to Home to see it
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
          <input
            name="organization"
            value={form.organization}
            onChange={onChange}
            required
          />
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
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}


const styles = {
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 8,
    margin: "8px 0 16px"
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 8,
    outline: "none"
  },
  textarea: {
    gridColumn: "1 / -1",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 8,
    outline: "none",
    resize: "vertical"
  },
  button: {
    gridColumn: "1 / -1",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#fafafa",
    cursor: "pointer",
    fontWeight: 600
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 12
  },
  card: {
    border: "1px solid #eee",
    borderRadius: 12,
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    cursor: "pointer"
  },
  muted: { margin: 0, color: "#666", fontSize: 14 },
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "grid",
    placeItems: "center",
    padding: 20
  },
  modal: {
    width: "min(680px, 95vw)",
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  }
};
<button
  onClick={() => {
    // If you used a specific key, replace with that instead of clearing everything.
    localStorage.clear();
    window.location.reload();
  }}
  style={{ marginBottom: 12 }}
>
  Reset demo data
</button>

