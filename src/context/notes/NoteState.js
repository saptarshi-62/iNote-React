import NoteContext from "./noteContext";
import React, { useState } from 'react';

const NoteState = (props) => {
const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
            });
            const json = await response.json();
            console.log(json);

            if (Array.isArray(json)) {
                setNotes(json);
            } else {
                setNotes([]);
                props.showAlert && props.showAlert("Failed to fetch notes", "danger");
            }
        } catch (error) {
            console.error(error.message);
            props.showAlert && props.showAlert("Internal Server Error while fetching notes", "danger");
        }
    }
    //Add a note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const note = await response.json();

            if (note._id) {
                setNotes(notes.concat(note));
                props.showAlert && props.showAlert("Note added successfully", "success");
                getNotes();
            } else if (note.errors) {
                props.showAlert && props.showAlert(note.errors[0].msg, "danger");
            } else {
                props.showAlert && props.showAlert("Failed to add note", "danger");
            }
        } catch (error) {
            console.error(error.message);
            props.showAlert && props.showAlert("Internal Server Error while adding note", "danger");
        }
    }
    //Delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
            });
            const json = await response.json();
            if (json.Success) {
                const newNotes = notes.filter((note) => { return note._id !== id });
                setNotes(newNotes);
                props.showAlert && props.showAlert("Note deleted successfully", "success");
                getNotes();
            } else {
                props.showAlert && props.showAlert("Failed to delete note", "danger");
            }
        } catch (error) {
            console.error(error.message);
            props.showAlert && props.showAlert("Internal Server Error while deleting note", "danger");
        }
    }
    //Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = await response.json();
            console.log(json);
            if (json.note) {
                let newNotes = JSON.parse(JSON.stringify(notes));
                for (let index = 0; index < newNotes.length; index++) {
                    const element = newNotes[index];
                    if (element._id === id) {
                        newNotes[index].title = title;
                        newNotes[index].description = description;
                        newNotes[index].tag = tag;
                        break;
                    }
                }
                setNotes(newNotes);
                props.showAlert && props.showAlert("Note updated successfully", "success");
                getNotes();
            } else {
                props.showAlert && props.showAlert("Failed to update note", "danger");
            }
        } catch (error) {
            console.error(error.message);
            props.showAlert && props.showAlert("Internal Server Error while updating note", "danger");
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
