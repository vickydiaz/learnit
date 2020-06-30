import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveList } from '../../actions/words';

const AddList = ({ saveList }) => {
    const [listTitle, setListTitle] = useState('');
    const slideForm = document.getElementById('slide-form');   
    
    const onChange = (e) => { 
        setListTitle(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(listTitle === '') {
            return console.log('Add Title');
        }

        saveList({
            title: listTitle
        });

        setTimeout(() => {
            slideForm.classList.remove('slide-up-form');
            setListTitle('');
        }, 300);
    }

    return (
    <div className="container">
        <div className="form-container">
            <h1 className="form-heading">Add a new list:</h1>
            <form onSubmit={onSubmit} >
                <input type="text" placeholder="List Name" value={listTitle} onChange={onChange} />
                <button type="submit">Add list</button>
            </form>
        </div>
    </div>
    )
}

export default connect(null, { saveList })(AddList);
