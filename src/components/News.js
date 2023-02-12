  import React, { Component } from 'react'
import NewsItem from './NewsItem'
  
  export default class News extends Component {
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false
        }
     }

     async componentDidMount(){
      let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ce3325100b7048659e7c552185c36483&page=1&&pagesize=20";
      let data = await fetch(url);
      let parsedData= await data.json();
      this.setState({articles : parsedData.articles, page:1, totalResults : parsedData.totalResults})
     }

      handlePreviousClick = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ce3325100b7048659e7c552185c36483&page=${this.state.page - 1}&pagesize=20`;
        let data = await fetch(url);
        let parsedData= await data.json();
        this.setState({
          articles : parsedData.articles,
          page:this.state.page - 1
        })
     }

     handleNextClick =async () =>{
      if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)){

      }   
      else {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ce3325100b7048659e7c552185c36483&page=${this.state.page + 1}&pagesize=20`;
        let data = await fetch(url);
        let parsedData= await data.json();
        this.setState({
          articles : parsedData.articles,
          page:this.state.page + 1
        })
      } 
      
     }

    render() {
      return (
        <div className='container my-3'>
          <h2>NewsMoneky - Top Headlines</h2>
          <div className='row'>
          {this.state.articles.map((element)=> 
          {
            return   <div className='col-md-4' key={element.url}>
            <NewsItem  title={element.title} 
            description={  element.description} 
            imageUrl={element.urlToImage}
            newsUrl={element.url}
            ></NewsItem>
            </div>
          })}
          
          </div>
          <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}> &larr; Previous</button>
            <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
      )
    }
  }
    