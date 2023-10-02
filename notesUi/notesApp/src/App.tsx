import "./App.css";
import React, { useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "note 1",
      content: "note content",
    },
    {
      id: 2,
      title: "note 2",
      content: "note content",
    },
    {
      id: 3,
      title: "note 3",
      content: "note content",
    },
    {
      id: 4,
      title: "note 4",
      content: "note content",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
  const newNote:Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    setNotes([...notes, newNote])
    setTitle('')
    setContent('')
  }


  return (
    <>
      <h1>Notes App</h1>
      <div className="app-container">
        <form className="note-form" onSubmit={(event) => handleSubmit(event)}>
          <div>
            <label>Titulo de la nota</label>
            <input
              placeholder="titulo"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label>Que quieres escribir?</label>
            <textarea
              value={content}
              placeholder="contenido"
              rows={10}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
          </div>
          <button type="submit">Agregar nota</button>
        </form>
        <div className="notes-grid">
          {notes.map(({ title, content }) => (
            <div className="note-item">
              <div className="notes-header">
                <button>
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
