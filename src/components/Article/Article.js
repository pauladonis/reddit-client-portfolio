import React from 'react';
import Comments from '../Comments/Comments';
import './Article.css';

class Article extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            comments: null,
            showComment: false
        }

        this.getComments = this.getComments.bind(this);
    }

    async componentDidMount(){
        this.setState({article: this.props.article  });
    }
    
    async getComments(){
        let url = "https://www.reddit.com/r/" + this.props.article.data.subreddit + "/comments/"+ this.props.article.data.id +  ".json";
        const response = await fetch(url);
        const data =  await response.json();
        let articleComments = data[1].data.children ? data[1].data.children : [];
        this.setState({comments:articleComments,showComment:!this.state.showComment});
    }

    
    render(){
       
        return (
            <div className="Articles">
                <div>
                    <a href={"https://reddit.com" + this.props.article.data.permalink}>
                        <h4>{this.props.article.data.title}</h4>
                    </a>
                    <img alt='' src={this.props.article.data.thumbnail}></img>
                    <button onClick={this.getComments}>Comments</button>
                </div>
                {this.state.comments && this.state.showComment &&
                    this.state.comments.map((comment, key) => {
                    return(
                        <div>
                            <Comments key={key} className="Comment" comment={comment}/>
                        </div>
                    )})}
            </div>
            
        )
    }

}

export default Article;