import "./App.css";
import React, { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notes')
        const notes:Note[] = await response.json()
        setNotes(notes)
      } catch (e) {
        console.log(e)
      }
    }

    fetchNotes()
  }, [])



  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, content})
      })

      const newNote = await response.json()
  
      setNotes([newNote, ...notes])
      setTitle('')
      setContent('')
    } catch (e) {
      console.log(e)
    }

  
  }


  const handleEditNote = (note:Note) => {
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if(!selectedNote){
      return;
    } 
    

    try {

      const response = await fetch(`http://localhost:5000/api/notes/${selectedNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, content})
      })

      const updateNote = await response.json()

      const updateNotesList = notes.map((note) => 
      note.id === selectedNote.id ? updateNote : note
    )
    setNotes(updateNotesList)
    setTitle('')
    setContent('')
    setSelectedNote(null)
    } catch (e) {
      console.log(e)
    }

  
  } 


  const handleCancel = () => {
    setTitle('')
    setContent('') 
    setSelectedNote(null)
  }

  const handleDeleteNote = async ( event:React.MouseEvent, noteId: number ) => {
    event.stopPropagation()
    try {
      await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
    })

    const updateNotesList = notes.filter((note) => note.id !== noteId)
    setNotes(updateNotesList)  
    } catch (e) {
      console.log(e)  
    }


    
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
                <button onClick={(event) => handleDeleteNote(event, note.id)}>
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
