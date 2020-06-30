import React, {useEffect} from 'react';
import Landing from '../layout/Landing';
import Review from '../layout/Review';
import { getWords, getLists } from '../../actions/words';
import { getReview } from '../../actions/review';
import { connect } from 'react-redux';

const Home = ({ getWords,  getReview, getLists }) => {
    useEffect(() => {
        getWords();
        getReview();
        getLists();
    }, [getWords, getReview, getLists])

    return (
        <div>
           
            <div id='home-container' className="container">
                <Landing />
                <Review />
            </div>
        </div>
    )
}

export default connect(null, {getWords, getLists, getReview})(Home);