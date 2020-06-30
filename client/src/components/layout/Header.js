import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ url }) => {
   
    return (

        <Link to={url} className='header'>
            <h1>Learn It</h1>
        </Link>
    )
}

const mapStateToProps = state => ({
    url: state.words.url
})

export default connect(mapStateToProps)(Header);
