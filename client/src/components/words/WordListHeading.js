import React from 'react';
import { connect } from 'react-redux';
import { openEdit } from '../../actions/words';


const WordListHeading = ({ title, id, count, openEdit }) => {
    
    const toggleOptions = (e) => {
        let toggleElement;
        
        // Bubble up to parent class
        if(e.target.innerText === 'EDIT' || e.target.innerTEXT === 'DELETE') {
            toggleElement =  e.target.parentElement.parentElement;

        } else if (e.target.classList.contains('word-list-heading_options') || 
                   e.target.classList.contains('word-list-heading_count') || 
                   e.target.tagName === 'H1' ) {

            toggleElement = e.target.parentElement;
        
        } else {
            toggleElement =  e.target;
        }

        toggleElement.classList.toggle('show-options');
    }


    const onEdit = () => {
        openEdit('editList', { listTitle: title, listId: id._id });
        
        // Slide up edit form
        document.getElementById('slide-form').classList.add('slide-up-form');
    }



    return (
        <div className="word-list-heading" onClick={toggleOptions}>
            <h1>{title}</h1>
            <p className="word-list-heading_count">{count} Words</p>
            <div className="word-list-heading_options">
                <p className="word-list-heading_edit" onClick={onEdit} >EDIT</p>
                <p className="word-list-heading_delete">DELETE</p>
            </div>
        </div>
    )
}

export default connect(null, { openEdit })(WordListHeading);

