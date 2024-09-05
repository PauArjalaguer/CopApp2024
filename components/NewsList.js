import React, { useState, useEffect } from 'react'
import { NewsListItem } from './NewsListItem'
import { LoadingComponent } from './LoadingComponent';
import { http_query } from '../functions/http';
const styles = require('../styles/stylesheet');

export const NewsList = () => {
    let [news, setNews] = useState([]);
    let [isLoadingNews, setIsLoadingNews] = useState(true);

    const fetchNewsData = () => {
        query = "select id, title, subtitle,content, pathimage, insertdate from news limit 0,25";
        params = [];
        let response = http_query(query, params).then((res) => { setNews(res[0].results.rows); setIsLoadingNews(false) });
    }
    useEffect(() => {
        fetchNewsData();
    }, [])
    return (
        <>{isLoadingNews ? <LoadingComponent loadText='Carregant noticies'></LoadingComponent> : null}
            {news?.map(
                n => (
                    <NewsListItem id={n[0]} title={n[1]} subtitle={n[2]} image={n[4]} text={n[3]} date={n[5]} key={n[1]}
                    />
                )
            )
            }</>
    )
}