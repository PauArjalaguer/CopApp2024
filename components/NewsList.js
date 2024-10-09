import React, { useState, useEffect } from 'react'
import { NewsListItem } from './NewsListItem'
import { LoadingComponent } from './LoadingComponent';
import { http_query } from '../functions/http';
const styles = require('../styles/stylesheet');

export const NewsList = () => {
    let [news, setNews] = useState([]);
    let [isLoadingNews, setIsLoadingNews] = useState(true);

    const fetchNewsData = () => {

        query = "https://clubolesapati.cat/API/apiNoticies.php?top=10&headline=1";
        params = [];
        let response = http_query(query, params).then((res) => {
            setNews(res);
            setIsLoadingNews(false)
        });
    }
    useEffect(() => {
        fetchNewsData();
    }, [])
    return (
        <>{isLoadingNews ? <LoadingComponent loadText='Carregant noticies'></LoadingComponent> : null}
            {news?.map(
                n => (
                    <NewsListItem id={n['id']} title={n['title']} subtitle={n['subtitle']} image={n['pathImage']} text={n['content']} date={n['UpdateDate']} key={n['id']}
                    />
                )
            )
            }</>
    )
}