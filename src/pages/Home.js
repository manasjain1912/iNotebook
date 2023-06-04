import React from 'react';
import AddNote from '../components/AddNote';
import Notes from '../components/Notes';

const Home = (props) => {
  const {showAlert} = props;
  return (
   <div className='container'>
    <AddNote showAlert={showAlert}/>
    <Notes showAlert={showAlert}/>
   </div>
  )
}

export default Home