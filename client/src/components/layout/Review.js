import React, { useState } from 'react';
import { connect } from 'react-redux';
import { nextCard, removeLastWord, addTime, wordUpdate } from '../../actions/review';


const Review = ({ review: { list, currentWord, translation, id, dueDate, correctCount, loadingList }, nextCard, removeLastWord, addTime, wordUpdate }) => {
    const [word, setWord] = useState('');

    const english = document.getElementById("english");
    const spanish = document.getElementById("spanish");
    const review = document.getElementById("review");

    const updateCount = () => {
        const counter = document.getElementById('counter');
        const speed = 150;

        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const inc = Math.round(target / speed) ;

        if(count < target) {
            counter.innerText = count + inc;
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    }
    
    // Reset the review card
    function resetReview() {
        english.classList.remove('small');
        spanish.classList.remove('correct');
        spanish.blur();
        setWord('');
    }


    const onChange = async (e) => {
        setWord(e.target.value);

        // Correct answer
        if (e.target.value === translation) {

            spanish.classList.add("correct");

            // Get current review list length
            const array = list.length - 1;

            // Get new dueDate
            const newDueDate = await addTime(dueDate, correctCount);

            // Update word in db
            wordUpdate(id, {
                correctCount: correctCount + 1,
                dueDate: newDueDate
            });


            if (array > 0) {
                setTimeout(() => {
                    nextCard(currentWord, array, 'correctAnswer');
                    resetReview();
                }, 1000);


            // Last word in review list
            } else {
                setTimeout(() => {
                    removeLastWord(currentWord);
                    review.classList.remove('review-now');
                    resetReview();
                    updateCount();
                }, 1000);

            }
        }

    }

    const shrinkEnglish = () => {
        english !== null && english.classList.add("small");
        spanish.focus();
    }


    const showTranslation = (e) => {
        if(e.key === 'Enter') {
            spanish.blur();

            if(word === '') {
                setWord(translation);
                const array = list.length - 1;
                    setTimeout(() => {
                        nextCard(currentWord, array, 'incorrectAnswer');
                        resetReview();
                    }, 1000);
            }  
        }       
    }



!loadingList && document.addEventListener('keydown', shrinkEnglish);


return (
    <div className='review' id="review" onKeyDown={shrinkEnglish}>
        <h1 className="english-word" id="english">{currentWord}</h1>
        <input className="review-input" id="spanish" type="text" value={word} onChange={onChange} onKeyPress={showTranslation} onClick={shrinkEnglish} />
    </div>

)
}


const mapStateToProps = state => ({
    review: state.review
})

export default connect(mapStateToProps, { nextCard, removeLastWord, addTime, wordUpdate })(Review);


