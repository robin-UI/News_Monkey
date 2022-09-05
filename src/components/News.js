import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'


export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loding: true,
            page: 0,
            totalResults: 0
        }
        document.title = `${this.props.category} | News-Monkey`
    }

    updateNews = async() => {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0232ff8ad274f4ab644d9f4a24645d3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(50)
        let parsData = await data.json();
        this.setState({
            articles: parsData.articles,
            totalResults: parsData.totalResults,
            loding: false
        })
        this.props.setProgress(100)
    }

    componentDidMount() {
        this.updateNews();
    }

    // handlePrevClick = () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }

    

    // handleNextClick = () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        console.log(this.state.page);
        this.setState({page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0232ff8ad274f4ab644d9f4a24645d3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsData = await data.json();
        console.log(this.state.page);
        this.setState({
            articles: this.state.articles.concat(parsData.articles),
            totalResults: parsData.totalResults,
        })
    };

    render() {
        return (
            <div className='container my-4'>
                <h1 className="text-center my-5">Top {this.props.category} news Headline</h1>
                {this.state.loding && <Spinner/>}
                <InfiniteScroll 
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4 mb-5" key={element.url} >
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/tech/img/2022/09/01/1600x900/asteroid-6075461_1920_1659775367751_1662006640613_1662006640613.jpg"} newsUrl={element.url ? element.url : ""} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>




                {/* <div className="container d-flex justify-content-evenly">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary me-3" onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick} >Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}
