import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import './css/notes.css';// Import custom CSS file for Notes component

const Notes = (props) => {
  const { showAlert } = props;
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchNotes();
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  const refEdit = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", e_title: "", e_description: "", e_tag: "" });

  const updateNote = (currentNote) => {
    refEdit.current.click();
    setNote({ id: currentNote._id, e_title: currentNote.title, e_description: currentNote.description, e_tag: currentNote.tag });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.e_title, note.e_description, note.e_tag);
    refClose.current.click();
    showAlert("Note updated successfully", "success");
  };

  return (
    <>
      {/* Button trigger modal */}
      <button ref={refEdit} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="notes-page">
        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="e_title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="e_title" name='e_title' value={note.e_title} onChange={onChange} minLength={3} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="e_description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="e_description" name='e_description' value={note.e_description} onChange={onChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="e_tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="e_tag" name='e_tag' value={note.e_tag} onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.e_title.length < 3 || note.e_description.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className='row my-5'>
          <h1>Your Notes</h1>
          {notes.length === 0 && <p>No notes to display</p>}
          {notes.map((note) => {
            return <NoteItem key={note._id} showAlert={showAlert} updateNote={updateNote} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes;
