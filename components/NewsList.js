import React, { useState, useEffect } from 'react'
import { NewsListItem } from './NewsListItem'

const styles = require('../styles/stylesheet');

export const NewsList = () => {
    let [items, setItems] = useState([]);
    const fetchNewsData = () => {
        // console.log("Fetch news");
        fetch("http://jok.cat/api/news/efs_masquefa/15")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setItems(data);
               // console.log(items);

            })
    }
    useEffect(() => {
        fetchNewsData();
    }, [])
    return (
        <>

            {items?.map(
                n => (
                    <NewsListItem id={n.idNew} title={n.newsTitle} subtitle={n.newsSubtitle} image={n.newsImage} text={n.newsContent} date={n.newsDateTime}
                        key={n.idNew}
                    ></NewsListItem>
                )
            )
            }

        </>
    )
}