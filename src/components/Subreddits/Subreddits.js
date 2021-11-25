import React from 'react';
import './Subreddits.css';

class Subreddits extends React.Component{
    
    render(){

        return (
            <div className="Subreddits">
                <h4 onClick={() => {this.props.changeArticles(this.props.subreddit)}}>{this.props.subreddit.data.url}</h4>
            </div>
        )
    
    }

}

export default Subreddits;