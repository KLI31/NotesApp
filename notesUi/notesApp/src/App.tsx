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
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);


  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    
  const newNote:Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    setNotes([newNote, ...notes])
    setTitle('')
    setContent('')
  }


  const handleEditNote = (note:Note) => {
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();

    if(!selectedNote){
      return;
    } 

    const updateNote:Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }

    const updateNotesList = notes.map((note) => 
      note.id === selectedNote.id ? updateNote : note
    )
    setNotes(updateNotesList)
    setTitle('')
    setContent('')
    setSelectedNote(null)
  } 


  const handleCancel = () => {
    setTitle('')
    setContent('') 
    setSelectedNote(null)
  }


  return (
    <>
      <h1>Notes App</h1>
      <div className="app-container">
        <form className="note-form" onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
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
            {selectedNote ? (
              <div className="edit-buttons">
                <button type="submit">Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>
              </div>
            ) : (
              <button type="submit">Agregar nota</button>
            ) }
        </form>
        <div className="notes-grid">
          {notes.map((note) => (
            <div className="note-item" onClick={() => handleEditNote(note)}>
              <div className="notes-header">
                <button>
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
