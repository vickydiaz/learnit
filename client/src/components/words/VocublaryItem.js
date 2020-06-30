import React, { Fragment } from 'react';
import chevronright from '../../img/icons/chevron-right-icon.png';
import { connect } from 'react-redux';
import DelayLink from 'react-delay-link';

const VocabularyItem = ({title, words}) => {

    const action = () => {
        document.getElementById('slide-vocabulary').classList.add('slide-out');
    }

    return (
        <Fragment>
            <DelayLink delay={300} to={`/vocabulary/${title}`} clickAction={action} replace={false} >
            <li className="vocabulary-list-item">
                <div className="vocabulary-list-item_info">
                    <h2 className="vocabulary-list-item_title">{title}</h2>
                    <p className="vocabulary-list-item_count">{ words.words.filter(word => word.list.title === title).length } Words</p>
                </div>
                <img className="vocabulary-list-item_chevron"  src={chevronright} alt="chevron right" />
            </li>
            </DelayLink>
        </Fragment>
    )
}


const mapStateToProps = state => ({
    words: state.words
})

export default connect(mapStateToProps)(VocabularyItem);