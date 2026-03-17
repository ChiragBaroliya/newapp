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
        lastSearch:''
      }
     }

     async componentDidMount(){
      await this.fetchArticles();
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
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
        lastSearch: searchQuery || ''
      });
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
          {loading && <Spinner />}
          {!loading && articles.length === 0 && (
            <div className="alert alert-info mt-4">No results found.</div>
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
          <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}> &larr; Previous</button>
            <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
      );
    }
  }
    