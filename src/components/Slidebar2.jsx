import React from 'react'

export default function Slidebar2(props) {

    const noteElements = props.notes.map(note => {
        return (
            <div key={note.id}
            
            className={`title ${note.id === props.currentNote.id ? "selected note" : ""}`}
            >
            
            onClick={() => props.setCurrentNoteId(note.id)}
            </div>
        )
    })

  return (
    <div>Slidebar2</div>
  )
}
