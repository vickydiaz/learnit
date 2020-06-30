import React, { useEffect } from 'react';
import VocabularyHeading from '../words/VocabularyHeading';
import VocabularyItem from '../words/VocublaryItem';
import { connect } from 'react-redux';
import { getWords, getLists, setURL } from '../../actions/words';
import AddList from './AddList';




const Vocabulary = ({ lists, getWords, getLists, setURL }) => {
    

    useEffect(() => {
        getWords();
        getLists();
        setURL();
    }, [getWords, getLists])


    const slideDownForm = (e) => {
        if(e.target.classList.contains('container')) {
            const slideForm = document.getElementById('slide-form');
            slideForm.classList.remove('slide-up-form');
        }
    }

    return (
        <div>
            <div id="slide-vocabulary" className="container" onClick={slideDownForm}>
                
                    <VocabularyHeading />
                    <ul className="vocabulary-list">
                        {
                            lists.map(list => (
                                <VocabularyItem key={list._id} title={list.title} />
                            ))
                        }

                    </ul>
                <div className="slide-form" id="slide-form">
                    <AddList />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    lists: state.words.lists
})

export default connect(mapStateToProps, { getLists, getWords, setURL })(Vocabulary);
