import React, { Component } from 'react'
import NewsItem from './NewsItem'


export default class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loding: false
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=dff83547e0f14b76af05f3b9d11a3791";
        let data = await fetch(url);
        let parsData = await data.json();
        this.setState({articles: parsData.articles})
    }

    render() {
        return (
            <div className='container my-4'>
                This is news component
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4 mb-5" key={element.url?element.url: ""} >
                            <NewsItem title={element.title? element.title.slice(0, 45): ""} description={element.description?element.description.slice(0, 88): ""} imageUrl={element.urlToImage?element.urlToImage:"https://images.hindustantimes.com/tech/img/2022/09/01/1600x900/asteroid-6075461_1920_1659775367751_1662006640613_1662006640613.jpg"} newsUrl={element.url?element.url:""} />
                        </div>
                    })}
                </div>
            </div>
        )
    }
}
