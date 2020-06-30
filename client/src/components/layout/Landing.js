import React, { Fragment, useEffect } from 'react'
import goldCircle from '../../img/graphics/gold-circle.png';
import silverCircle from '../../img/graphics/silver-circle.png';
import Footer from './Footer';
import { connect } from 'react-redux';
import { startReview } from '../../actions/review';

const Landing = ({ words: { spanish, english, count, loading }, startReview, review: {list, loadingList} }) => {

    const counter = document.getElementById('counter');
    
    if(counter !== null) {
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
        updateCount();
    }
    

    const gold = (
        <Fragment>
            <div className="landing_review">
                <h2 className="landing_review--title">All done!</h2>
                <img className="landing_review--circle" src={goldCircle} />
                <div className="landing_review--tag">
                <p><span id="counter" data-target={count}>{count}</span> Words<span className="check-mark" id="check-mark">✓</span></p>
                </div>
            </div>
    </Fragment>
    )

    const silver = (
        <Fragment>
            <div className="landing_review" onClick={startReview}>
                <h2 className="landing_review--title">Study!</h2>
                <img className="landing_review--circle" src={silverCircle} />
                <div className="landing_review--tag" id="silver-tag">
                    <p>{list.length}</p>
                </div>
            </div>
        </Fragment>
    )


    return (
        <div className="landing">
            
                { !loading && !loadingList ? list.length === 0 ? gold : silver : '' }
                

            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    words: state.words,
    review: state.review
})

export default connect(mapStateToProps, {startReview})(Landing);

