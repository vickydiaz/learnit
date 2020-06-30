import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { saveWord, updateWord, clearEdit, saveList, updateList } from '../../actions/words';


const AddWords = ({ listTitle, listId, saveWord, englishState, spanishState, wordIdState, listTitleState, listIdState, editMode, updateWord, clearEdit, saveList, updateList }) => {

    // useState [Add Word]
    const [formDataWord, setFormDataWord] = useState({
        spanish: englishState,
        english: spanishState
    })

    const { spanish, english } = formDataWord;

    // useState [Add List]
    const [formDataList, setFormDataList] = useState(listTitleState);


    // Load Word & List edit data from state
    useEffect(() => {
        setFormDataWord({
            spanish: spanishState,
            english: englishState
        });

        setFormDataList(listTitleState);
    }, [editMode])


    // Handle onChange word edits 
    const onWordChange = (e) => {

        setFormDataWord({
            ...formDataWord,
            [e.target.name]: e.target.value
        })
    }


    // Handle onChange list edits
    const onListChange = (e) => {
        setFormDataList(e.target.value);
    }


    // Handle onSubmit word edits
    const onWordSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (spanish === '' || english === '') {
            console.log('Fill out all fields');
        }

        // Create a new word
        if (editMode === 'createWord') {
            saveWord(listTitle, {
                spanish,
                english,
                list: listId._id
            });

            setTimeout(() => {
                document.getElementById('spanish').focus();
                setFormDataWord({
                    spanish: '',
                    english: ''
                })
            }, 300);
        }

        // Edit existing word
        if (editMode === 'editWord') {
            updateWord(listTitle, wordIdState, {
                spanish,
                english
            });

            setTimeout(() => {
                document.getElementById('slide-form').classList.remove('slide-up-form');
                clearEdit();
            }, 300);
        }
    }


    // Handle onSubmit list edits
    const onListSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (formDataList === '') {
            console.log('Fill out all fields');
        }

        // Create a new list
        if (editMode === 'createList') {
            saveList({
                title: listTitle
            });

            setTimeout(() => {
                document.getElementById('slide-form').classList.remove('slide-up-form');
                clearEdit();
            }, 300);
        }

        // Edit existing list
        if (editMode === 'editList') {
           updateList(listIdState, { title: formDataList });

            setTimeout(() => {
                document.getElementById('slide-form').classList.remove('slide-up-form');
                clearEdit();
            }, 300);
        }
    }

    const wordForm = (
        <Fragment>
            <h1 className="form-heading">{editMode === 'editWord' ? 'Update word:' : listTitle}</h1>
            <form onSubmit={onWordSubmit}>
                <input id="spanish" type="text" placeholder="Spanish" name="spanish" value={spanish} onChange={onWordChange} />
                <input type="text" placeholder="English" name="english" value={english} onChange={onWordChange} />
                <button type="submit">{editMode === 'editWord' ? 'Update word' : 'Add word'}</button>
            </form>
        </Fragment>
    )

    const listForm = (
        <Fragment>
            <h1 className="form-heading">{editMode === 'editList' ? 'Update list name:' : 'Add a new list:'}</h1>
            <form onSubmit={onListSubmit} >
                <input type="text" placeholder="List Name" value={formDataList} onChange={onListChange} />
                <button type="submit">{editMode === 'editList' ? 'Update list' : 'Add list'}</button>
            </form>
        </Fragment>
    )

    return (
        <div className="container">
            <div className="form-container">

                {
                    editMode === 'createWord' || editMode === 'editWord' ? wordForm : listForm
                }

            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    editMode: state.words.editMode,

    // Word State
    spanishState: state.words.editWord.spanish,
    englishState: state.words.editWord.english,
    wordIdState: state.words.editWord._id,

    // List State
    listTitleState: state.words.editList.listTitle,
    listIdState: state.words.editList.listId

})

export default connect(mapStateToProps, { saveWord, updateWord, clearEdit, saveList, updateList })(AddWords);