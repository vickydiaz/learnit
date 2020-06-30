import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { openEdit, deleteWord } from '../../actions/words';

const WordListItem = ({ word: { english, spanish, _id }, openEdit, deleteWord }) => {

    const toggleOptions = (e) => {

        let toggleElement;

        if(e.target.tagName === 'P' || e.target.tagName === 'H2') {
            toggleElement =  e.target.parentElement;
        } else {
            toggleElement =  e.target;
        }

        const listItems = document.querySelectorAll('.word-list-item');

        listItems.forEach(item => {
            if(item.classList.contains('show-options') && !item.classList.contains(toggleElement.classList[1])) {
                item.classList.remove('show-options');
            }
        })

        if(e.target.tagName === 'P' || e.target.tagName === 'H2') {
            e.target.parentElement.classList.toggle('show-options');
        } else {
            e.target.classList.toggle('show-options');
        }
    }

    const onEdit = () => {

        // Load words into editMode
        openEdit('editWord', {
            spanish,
            english,
            _id
        });

        // Slide up edit form
        document.getElementById('slide-form').classList.add('slide-up-form');
    }

    const onDelete = () => {
        deleteWord(_id);
    }


    return (

        <Fragment>
            <li className={`word-list-item ${_id}`}  onClick={toggleOptions}>
                <h2 className="word-list-item_spanish">{spanish}</h2>
                <p className="word-list-item_english">{english}</p>
                <div className="word-list-item_options">
                    <p className="word-list-item_edit" onClick={onEdit} >EDIT</p>
                    <p className="word-list-item_delete" onClick={onDelete} >DELETE</p>
                </div>

            </li>
        </Fragment>
    )
}


export default connect(null, { openEdit, deleteWord })(WordListItem);