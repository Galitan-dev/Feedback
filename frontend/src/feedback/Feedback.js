import { Component } from "react";
import "./Feedback.css";
import blackStar from "./star/black.png";
import yellowStar from "./star/yellow.png";

/** @param {{ profilePicture: string, author: string, title: string, body: string, createdAt: Date, stars: number }} props */
export default class Feedback extends Component {
    render() {
        return <div className={this.props.body.length > 300 ?
                (this.props.body.length > 600 ? "⭐ very-tall" : "⭐ tall") 
                : "⭐"}>
            <div className="⭐-header">
                <div className="⭐-author">
                    <img className="⭐-author-picture" alt="Author" src={this.props.profilePicture} />
                    <h3 className="⭐-author-name">{this.props.author}</h3>
                </div>

                <div className="⭐-title">
                    <h1 className="⭐-title-content">{this.props.title}</h1>
                    <div className="⭐-stars">{
                        new Array(5).fill(null).map((_, i) =>
                            <img key={"star-" + i} className="⭐-stars-star" src={i < this.props.stars ? yellowStar : blackStar} alt="star"></img>,
                        )
                    }</div>
                </div>
            </div>
            <p className="⭐-body">{this.props.body}</p>
            <p className="⭐-createdAt">{this.props.createdAt.toLocaleDateString()}</p>
        </div>
    }
}
