import React from 'react';
import { connect } from 'react-redux';


const VocabularyHeading = ({ count }) => {
    
    const slideUpForm = () => {
        document.getElementById('slide-form').classList.add('slide-up-form');
    }


    return (
        <div className="vocabulary-heading">
            <h1>{count} Words</h1>
            <div className="btn-round btn-gold" onClick={slideUpForm} >
                <i className="fas fa-plus"></i>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    count: state.words.count
})

export default connect(mapStateToProps)(VocabularyHeading);