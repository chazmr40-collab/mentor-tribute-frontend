// src/pages/Home.jsx
import { useEffect, useState } from "react";
import sample from "../data/mentors.sample.json";
import { loadItems, saveItems, clearItems, removeItem, exportItems } from "../store/itemsStore";

export default function Home() {
  const [items, setItems] = useState(() => loadItems(sample));

  // ✅ Keep this listener (store dispatches it)
  useEffect(() => {
    const onUpdated = () => setItems(loadItems(sample));
    window.addEventListener("mt-items-updated", onUpdated);
    return () => window.removeEventListener("mt-items-updated", onUpdated);
  }, []);

  function onReset() {
    if (confirm("Reset the demo list back to the sample data?")) {
      clearItems();
      saveItems(sample);      // ✅ puts sample back into localStorage + notifies
      setItems(sample);
    }
  }

  function onExport() {
    const blob = new Blob([exportItems()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mentor-tributes.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function onDelete(id) {
    if (confirm("Delete this tribute?")) {
      setItems(removeItem(id, sample)); // removeItem saves + notifies
    }
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Welcome to the Mentor Tribute demo</h1>
      <p>Use this demo to add tributes. Data is saved to your browser (localStorage).</p>

      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <button onClick={onReset}>Reset Demo</button>
        <button onClick={onExport}>Export JSON</button>
      </div>

      <ul style={{ display: "grid", gap: 12, listStyle: "none", padding: 0 }}>
        {items.map((m) => (
          <li key={m.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <img
              src={m.photo}
              alt={m.name}
              width="72"
              height="72"
              style={{ borderRadius: 8, objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <strong>{m.name}</strong> — {m.role}, {m.organization} {m.years ? `(${m.years})` : ""}
              <div style={{ fontStyle: "italic" }}>“{m.quote}”</div>
            </div>
            <button onClick={() => onDelete(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}



