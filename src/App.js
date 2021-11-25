import React from 'react';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import Subreddits from './components/Subreddits/Subreddits';
import Article from './components/Article/Article';

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state= {
      searchField:'',
      articles: null,
      subreddits: null,
      loading: null
    }
    
    this.changeArticles = this.changeArticles.bind(this);
  }
  

  async componentDidMount() {
    const articlesUrl = "https://www.reddit.com/r/aquarium.json";
    const articleResponse = await fetch(articlesUrl);
    const articleData = await articleResponse.json();
    this.setState({articles: articleData.data.children, loading:false});

    const subredditsUrl = "https://www.reddit.com/subreddits.json";
    const subredditsResponse = await fetch(subredditsUrl);
    const subredditsData = await subredditsResponse.json();
    this.setState({subreddits: subredditsData.data.children});
  }
  
  async changeArticles(subreddit) {
    const subUrl = subreddit.data.url.substring(0, subreddit.data.url.length - 1);
    const articleChangeUrl = `https://www.reddit.com${subUrl}.json`;
    const articleChangeResponse = await fetch(articleChangeUrl);
    const articleChangeData = await articleChangeResponse.json();
    this.setState({articles: articleChangeData.data.children});
  }

  render() {
    var filteredArticles=[];
    if(this.state.loading || !this.state.articles) {   
      return (
        <div>Loading</div>
      );
    }

    var filteredSubreddits=[];
    if(this.state.loading || !this.state.subreddits) {   
      return (
        <div>Loading</div>
      );
    }

    filteredArticles = this.state.articles.filter(article => (article.data.title.toLowerCase().includes(this.state.searchField.toLowerCase())));
    filteredArticles = filteredArticles ? filteredArticles : this.state.articles;

    filteredSubreddits = this.state.subreddits.filter(subreddit => (subreddit.data.title.toLowerCase().includes(this.state.searchField.toLowerCase())));
    filteredSubreddits = filteredSubreddits ? filteredSubreddits : this.state.subreddits;

      return (
        <div>
              <SearchBar placeholder="Search..."
                          handleChange={(e) => this.setState({searchField:e.target.value})}/>
          <h3 className="App">
            <div className="Content">
                <div className="Articles">
                  <h3>Articles</h3>
                    {filteredArticles &&
                      filteredArticles.map((article, key) => {
                        return(
                          <div> 
                             <Article  key={key} article={article} />
                          </div>
                        )
                      })
                    }
                </div>
                <div className="Subreddits">
                  <h3>Subreddits</h3>
                    {filteredSubreddits && 
                      filteredSubreddits.map((subreddit, key) => {
                        return(
                          <div>
                            <Subreddits changeArticles={(e) => {
                              this.changeArticles(e);
                            }} key={key} subreddit={subreddit} />
                          </div>
                        )
                      })
                    }
                </div>           
              </div>
          </h3>
        </div>
      )
  } 
}



export default App;