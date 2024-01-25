import React, { useEffect,useState } from 'react'
import Newsitem from "./Newsitem";
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types'

// document.title = `${this.capfirstlet(this.props.category)} - NewsMonkey`;

const News = (props) => {
 const [articles,setArticles] =useState([])
 const [loading,setLoading] =useState(true)
 const [page,setPage] =useState(1)
 const [totalResults,setTotalResults] =useState(0)
    const capfirstlet = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const  updateNews= async () =>{
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}`;
        setLoading(true )
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(60)
         setArticles( parsedData.articles)
         setTotalResults (parsedData.totalResults)
         setLoading (false)      
        props.setProgress(100)
    }
    useEffect(()=>{ 
        updateNews();
        //eslint-disable-next-line
    },[])
    
    // handlePrevClick = async () => {
    //      this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();

    // }
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}`;
        setPage( page + 1 );

        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles( articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    return (
        <>
            <h1 className="text-center " style={{margin:'90px 0px 40px 0px'}} >NewsMonkey - Top Headlines On {capfirstlet(props.category)} </h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-success" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}
        </>
    )
}
export default News
News.defaultProps = {
    country: 'in',
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}