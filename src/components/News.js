  import React, { Component } from 'react'
  import NewsItem from './NewsItem'
  import Spinner from './Spinner';
  
  export default class News extends Component {
    constructor(props){
      super(props);
      this.state={
        articles:[],
        loading:false,
        page:1,
        totalResults:0,
        lastSearch:'',
        lastArticleTime:null,
        newArticlesCount:0,
        showNewAlert:false
      }
     }

    async componentDidMount(){
     await this.fetchArticles();
     this.pollInterval = setInterval(this.checkForNewArticles, 60000); // every 60s
    }
  componentWillUnmount() {
   clearInterval(this.pollInterval);
  }

     async componentDidUpdate(prevProps) {
      if (prevProps.searchQuery !== this.props.searchQuery) {
        this.setState({ page: 1 }, this.fetchArticles);
      }
     }

     fetchArticles = async () => {
      let { page } = this.state;
      let { searchQuery, category } = this.props;
      let url = '';
      if (searchQuery && searchQuery.trim() !== '') {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=ce3325100b7048659e7c552185c36483&page=${page}&pageSize=20`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category || 'business'}&apiKey=ce3325100b7048659e7c552185c36483&page=${page}&pageSize=20`;
      }
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      let articles = parsedData.articles || [];
      let lastArticleTime = articles.length > 0 ? articles[0].publishedAt : null;
      this.setState({
        articles,
        totalResults: parsedData.totalResults || 0,
        loading: false,
        lastSearch: searchQuery || '',
        lastArticleTime,
        newArticlesCount: 0,
        showNewAlert: false
      });
     }
     checkForNewArticles = async () => {
      let { searchQuery, category } = this.props;
      let url = '';
      if (searchQuery && searchQuery.trim() !== '') {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=ce3325100b7048659e7c552185c36483&page=1&pageSize=20`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category || 'business'}&apiKey=ce3325100b7048659e7c552185c36483&page=1&pageSize=20`;
      }
      let data = await fetch(url);
      let parsedData = await data.json();
      let articles = parsedData.articles || [];
      let latestTime = articles.length > 0 ? articles[0].publishedAt : null;
      if (latestTime && latestTime !== this.state.lastArticleTime) {
        // Count new articles
        let count = 0;
        for (let article of articles) {
          if (article.publishedAt === this.state.lastArticleTime) break;
          count++;
        }
        this.setState({ newArticlesCount: count, showNewAlert: true });
      }
     }

      handlePreviousClick = async() =>{
        await this.setState({ page: this.state.page - 1 }, this.fetchArticles);
     }

     handleNextClick = async () =>{
      if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)){
        return;
      }
      await this.setState({ page: this.state.page + 1 }, this.fetchArticles);
     }
      
     }

    highlightText = (text, term) => {
      if (!term || !text) return text;
      const regex = new RegExp(`(${term})`, 'gi');
      return text.split(regex).map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : part
      );
    }

    render() {
      const { loading, articles } = this.state;
      const { searchQuery, favorites = [], onToggleFavorite } = this.props;
      return (
        <div className='container my-3'>
          <h2>NewsMoneky - Top Headlines</h2>
          <div className="mb-2 text-secondary">
            Total articles found: <strong>{this.state.totalResults}</strong>
          </div>
          {loading && <Spinner />}
          {!loading && articles.length === 0 && (
            <div className="alert alert-info mt-4">No results found.</div>
          )}
          {this.state.showNewAlert && this.state.newArticlesCount > 0 && (
            <div className="alert alert-success mt-2" role="alert">
              {this.state.newArticlesCount} new article(s) available. <button className="btn btn-sm btn-primary ms-2" onClick={this.fetchArticles}>Refresh</button>
            </div>
          )}
          <div className='row'>
            {!loading && articles.map((element) => {
              const isFavorite = favorites.some(fav => fav.url === element.url);
              return (
                <div className='col-md-4' key={element.url}>
                  <NewsItem
                    title={this.highlightText(element.title, searchQuery)}
                    description={this.highlightText(element.description, searchQuery)}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    isFavorite={isFavorite}
                    onToggleFavorite={() => onToggleFavorite && onToggleFavorite(element)}
                  />
                </div>
              );
            })}
          </div>
          {/* Pagination removed for infinite scroll */}
        </div>
      );
    }
  }
    