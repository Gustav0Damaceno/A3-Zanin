import { useEffect, useState } from "react";
import { API_URL } from "../api";

interface Note {
  id: number;
  conteudo: string;
  dia_semana: string;
}

export default function DayCard({ dia }: { dia: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  // Carrega notas do dia
  const loadNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes/${dia}`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Erro ao carregar notas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [dia]);

  // Adiciona anotação
  const addNote = async () => {
    if (!text.trim()) return;

    await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dia_semana: dia,
        conteudo: text
      })
    });

    setText("");
    loadNotes();
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        width: 250,
        background: "#fafafa"
      }}
    >
      <h2 style={{ textTransform: "capitalize" }}>{dia}</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua anotação..."
        style={{ width: "100%", height: 60, marginBottom: 8 }}
      />

      <button onClick={addNote} style={{ marginBottom: 12 }}>
        Salvar
      </button>

      {loading ? (
        <p>Carregando...</p>
      ) : notes.length === 0 ? (
        <p>Nenhuma anotação ainda.</p>
      ) : (
        <ul>
          {notes.map((n) => (
            <li key={n.id}>{n.conteudo}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
