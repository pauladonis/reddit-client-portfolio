import React from 'react';

  
class Comments extends React.Component {
  
    render(){

        return (
            <div>{this.props.comment.data.body}</div>
        )
    
    }

}

export default Comments;