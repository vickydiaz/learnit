import React, { Fragment, useEffect } from 'react';
import WordListHeading from '../words/WordListHeading';
import WordListItem from '../words/WordListItem';
import { connect } from 'react-redux';
import AddWords from './AddWords';
import { setURL, getWords, getLists, clearEdit, openEdit } from '../../actions/words';

const WordList = ({ match, words: { words, lists }, setURL, getWords, getLists, clearEdit, openEdit }) => {
    useEffect(() => {
        setURL();
        getWords();
        getLists();
        document.getElementById('slide-wordlist').classList.add('slide-in');
    }, [])
    
    const slideUpForm = () => {
        document.getElementById('slide-form').classList.add('slide-up-form');
        openEdit('createWord');
    }

    const slideDownForm = (e) => {
        if(e.target.classList.contains('container')) {

            // Slide Form container down
            document.getElementById('slide-form').classList.remove('slide-up-form');

            // Clear form data
            clearEdit();
        }
    }

    return (
        <Fragment>
            <div id="slide-wordlist" className="container pre-slide-in"  onClick={slideDownForm}>
                <WordListHeading 
                    title={match.params.title} 
                    count={words.filter(word => word.list.title === match.params.title).length} 
                    id = {lists.filter(list => list.title === match.params.title)[0]}
                 />
                <ul className="word-list">
                    {
                        words
                        .filter(word => word.list.title === match.params.title)
                        .map(word => (
                             <WordListItem key={word._id} word={word} />
                        ))
                    }
                   
                </ul>

                <div className="slide-form" id="slide-form">
                    <AddWords listTitle={match.params.title} listId = {lists.filter(list => list.title === match.params.title)[0]} />
                </div>

            </div>

            <div className="btn-round btn-gold fixed-bottom"  onClick={slideUpForm} >
                <i className="fas fa-plus"></i>
            </div>
        </Fragment>
    )
}


const mapStateToProps = state => ({
    words: state.words
})

export default connect(mapStateToProps, { setURL, getWords, getLists, clearEdit, openEdit })(WordList);