import React from 'react'
import Split from 'react-split'
import Editor from './components/Editor'
import Sidebar from './components/Sidebar'
import { nanoid } from 'nanoid'
import "react-mde/lib/styles/css/react-mde-all.css";

export default function App2() {

    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    )

    const [currentNoteId, setCurrentId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    React.useEffect(() => {
            localStorage.setItem("notes", JSON.stringify(notes))
    },[notes])

    function createNewNote () {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }

        setNotes(prev => [newNote, ...prev])
        setCurrentId(newNote.id)
    }

    function updateNote (text) {
        setNotes(prevNotes => {
            const newArr = []
            for (let i = 0; i < prevNotes.length; i++){
                const current = prevNotes[i]
                if (current.id === currentNoteId) {
                    newArr.unshift({...current, body:text})
                }

                else{
                    newArr.push(current)
                }
            }

            return newArr
        })
    }

    function findCurrentNote () {
        return notes.find(prevNotes => {
            return (prevNotes.id === currentNoteId)
        }) || notes[0]
    }

    function deleteNote (event, noteId) {
        event.stopPropagation()
        setNotes( prev=> prev.filter( note => note.id !== noteId ) )
    }
    

    return (
        <main>
            {
            notes.length > 0 
            &&
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
            </Split>}
                
            {
            notes.length == 0
            
            &&

            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            }
        </main>
    )
}
