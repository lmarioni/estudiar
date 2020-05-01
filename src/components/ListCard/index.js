import React from "react";
import "./styles.scss";
import { Link } from "@reach/router";


export const ListCard = ({
    badgeImage = '',
    linkUrl = '',
    icon = '',
    title = '',
    subtitle = '',
    description = '',
    action = ''
}) => {

    const getTitleBadge = (title) => {
        const titleBadge = title.includes(':') ? title.split(':')[1].trim() : title;
        return titleBadge.substring(0, 1);
    }

    const metaBadge =
        icon ? (icon) :
            badgeImage ?
                <img src={badgeImage} width='100%' className="card-icon icon icon-blog text-center" alt={`Icono de ${title}`} /> :
                title ?
                    <div className="card-icon icon icon-blog text-center"><span className="badge-text">{getTitleBadge(title)}</span></div> :
                    '';
    return (
        <div className="card preview-card fade-in" context="main">
            <div className="card-meta">
                {metaBadge}
                <div className="card-data">
                    <h4 className="card-title">
                        <Link className="preview-card-wrapper" to={linkUrl}> {title}  </Link>
                    </h4>
                    {<p className="tag-list">{subtitle}</p>}
                </div>
            </div>
            <div className="card-description">
                <div> {description} </div>
                <div> {action} </div>
            </div>
        </div>
    )
}