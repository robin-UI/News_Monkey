import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props;
        return (
            <div>
                <div className="card">
                    <div style={{
                        display: "flex",
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: 0
                    }}>
                    <span className="badge rounded-pill bg-danger" >{source}</span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">
                            {description}
                        </p>
                        <p className="card-text">
                            <small className="text-muted">By {author ? author : "Unknown"} on {new Date(publishedAt).toGMTString()}</small>
                        </p>

                        <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-primary" target="_blank">
                            Read More
                        </a>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default NewsItem