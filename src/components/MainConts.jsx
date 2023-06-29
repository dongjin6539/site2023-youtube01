import React, { useState, useEffect } from 'react';
import { Category, Videos } from './';
// import Loader from './Loader';

const MainConts = () => {
    const [selectCategory, setSelectCategory] = useState('헬스 유튜브');
    const [videos, setYoutubes] = useState([]);

    useEffect(() => {
        fetchVideos(selectCategory); // selectCategory가 변경될 때마다 fetchVideos 함수를 호출합니다.
    }, [selectCategory]);

    const fetchVideos = category => {
        const searchQuery = encodeURIComponent(category);
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&type=video&videoDuration=medium&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
        // const url = 'https://webstoryboy.github.io/site-youtube01/src/utils/test.json';
        fetch(url)
            .then(response => response.json())
            .then(result => {
                // console.log(result.items);
                setYoutubes(result.items);
            })
            .catch(error => console.log(error));
    };

    // if (!videos?.items) return <Loader />;

    return (
        <main id="main">
            <aside id="aside">
                <Category selectCategory={selectCategory} setSelectCategory={setSelectCategory} />
            </aside>
            <section id="contents">
                <h2>{selectCategory}</h2>
                <Videos videos={videos} selectCategory={selectCategory} />
            </section>
        </main>
    );
};

export default MainConts;
