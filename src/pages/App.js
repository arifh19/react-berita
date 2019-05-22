import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import './App.css'
import {newsApi} from '../data/api';
// import debounce from 'lodash/debounce';
import throttle from 'lodash/debounce';
import store from 'store';
 
class App extends React.Component{
  state = {
    articleData: [],
    loading: true,
    error: false,
    page: 1,
    favoritedArticle: [],
  }

  constructor(props){
    super(props);
    this.onScroll = throttle(this.onScroll, 500);
//    this.onScroll = debounce(this.onScroll, 500);
  }
  componentDidMount(){
    this.fetchNews();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = e => {
    if ((window.innerHeight + window.scrollY) >= 
      (document.body.offsetHeight - 1500) && 
      this.state.articleData.length >0
      ) {
        this.fetchNextPage();
        console.log(window.innerHeight, window.scrollY, document.body.offsetHeight,)
    }
  }
  renderLoading(){
    return <h2 className="text-center mt-4">Loading ...</h2>
  }
  renderKosong(){
    return <h2 className="text-center mt-4">Tidak ada berita</h2>
  }
  renderError(){
    return (
      <div>
        <Header title="Error!"></Header>      
        <h2 className="text-center mt-4">Periksa Sambungan Anda</h2>
    </div>
    ) 
  }
  fetchNews(page=1){
    newsApi(page)
    .then(data=>{
      const {articleData} = this.state;
      const nextData = articleData.concat(data.articles);
      console.log(data);
      this.setState({
        articleData: nextData,
        loading: false,
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
        loading: false,
        error: true,
      })
    });
  }
  fetchNextPage(){
    const {page} = this.state;
    const nextPage = page+1;
    this.fetchNews(nextPage);
    this.setState({
      page:nextPage,
    });
  }

  onFavorite(article){
    const {favoritedArticle} = this.state;
    const favoritedArticleIndex = favoritedArticle.findIndex((currentFavorite)=>{ return currentFavorite === article.url});
    const isAlreadyFavorite = favoritedArticleIndex > -1;
    if(!isAlreadyFavorite){
      favoritedArticle.push(article.url);
      this.setState({favoritedArticle: favoritedArticle});
    }
    else{
      const currentArticleInStorage = favoritedArticle[favoritedArticleIndex];
      const filteredFavoriteArticle = favoritedArticle.filter(
        (article) => article =! currentArticleInStorage
      );
      this.setState({favoritedArticle:filteredFavoriteArticle});

    }
    const currentArticleInStorage = store.get('favorite');
    if (!currentArticleInStorage){
      store.set('favorite',[article]);
    }
    else{
      if(!isAlreadyFavorite){
        store.set('favorite',[article, ...currentArticleInStorage]);
      } else {
        const filteredArticleStorage = currentArticleInStorage.filter(
          storageArticle => storageArticle.url =! article.url
        );
        store.set('favorite', filteredArticleStorage);
      }
    }
  }
  render(){
    const { loading, articleData, error } = this.state;
    const isEmpty = !loading && articleData.length===0;
    if(error){ return this.renderError()}
    return (
      <div className="App">
        <Header title="Berita Baru"></Header>
        <div className="news-container px-4 pb-2">
          {loading && this.renderLoading()}
          {error && this.renderError()}
          {isEmpty  && this.renderKosong()}
          {!loading && articleData.map((article)=>{
            return <Card 
              image={article.urlToImage}
              title={article.title}
              author={article.author}
              isFavorite={this.state.favoritedArticle.includes(article.url)}
              description = {article.description}
              published = {article.publishedAt}
              url = {article.url}
              onFavorite = {()=> this.onFavorite(article)}
            />
          })}
        </div>
        {!loading && !isEmpty && (
          <div className="mb-5 mt-5 text-center">
              <button onClick={()=>this.fetchNextPage()} className="btn btn-outline-primary btn-lg">
                Load More
              </button>
          </div> 
        )}

      </div>
    );
  }
}
export default App;
