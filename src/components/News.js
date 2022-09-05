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
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category} | News-Monkey`
    }

    updateNews = async() => {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({page: this.state.page + 1 })
        let data = await fetch(url);
        let parsData = await data.json();
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
                    {/* {this.props.setProgress(30)} */}
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4 mb-5" key={element.url} >
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/tech/img/2022/09/01/1600x900/asteroid-6075461_1920_1659775367751_1662006640613_1662006640613.jpg"} newsUrl={element.url ? element.url : ""} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>


            </div>
        )
    }
}
