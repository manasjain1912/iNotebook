import React from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Edit from '@mui/icons-material/Edit';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const {showAlert}=props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div style={{ marginLeft: '20px', color: 'black' }}>
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div className="row">
                            <div className='col-md-5 ' onClick={() => { deleteNote(note._id);
                            showAlert("Note deleted successfully","success"); }}>
                                <DeleteOutlinedIcon />
                            </div>
                            <div className='col-md-5 ' onClick={() => { updateNote(note) }}>
                                <Edit />
                            </div>
                        </div>
                    </div>
                    <p className="card-text"> {note.description}</p>
                </div>
            </div>
        </div>
        </div>
    )
}
