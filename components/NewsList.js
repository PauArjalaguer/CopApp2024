import React, { useState, useEffect } from 'react'
import { NewsListItem } from './NewsListItem'

const styles = require('../styles/stylesheet');

export const NewsList = () => {
    let [items, setItems] = useState([]);
    const fetchNewsData = () => {
        // console.log("Fetch news");
        fetch("http://clubolesapati.cat/API/apiNoticies.php?top=10&headline=1")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setItems(data);
                console.log(items);

            })
    }
    useEffect(() => {
        fetchNewsData();
    }, [])
    return (
        <>

            {items?.map(
                n => (
                    < NewsListItem id={n.id} title={n.title} subtitle={n.subtitle} image={n.pathImage} text={n.text} date={n.time}
                        key={n.id}
                    ></NewsListItem>
                )
            )
            }

        </>
    )
}