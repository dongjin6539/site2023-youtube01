import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Videos from './Videos';
import Loader from './Loader';

const SearchConts = () => {
    const [videos, setVideos] = useState(null);
    const { searchTerm } = useParams();

    useEffect(() => {
        fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchTerm}&type=video&videoDuration=medium&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
        )
            .then(response => response.json())
            .then(result => {
                console.log(searchTerm);
                setVideos(result.items);
            })
            .catch(error => console.log(error));
    }, [searchTerm]);

    if (!videos) return <Loader />;

    return (
        <main id="main">
            <section id="search">
                <h2>검색어 : {searchTerm}</h2>
                <Videos videos={videos} />
            </section>
        </main>
    );
};

export default SearchConts;
