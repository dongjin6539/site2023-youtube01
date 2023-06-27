import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
import { PiHeartStraight } from 'react-icons/pi';
import { BiChevronDownCircle } from 'react-icons/bi';

const VideoConts = () => {
    const [videoDetail, setVideoDetail] = useState(null);
    const [channelImage, setChannelImage] = useState(null);
    const [subscriberCount, setSubscriberCount] = useState(null); // 구독자 수 상태값 추가
    const { id } = useParams();

    useEffect(() => {
        fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
        )
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setVideoDetail(result.items[0]);
                fetchChannelInfo(result.items[0].snippet.channelId); // 채널 정보를 가져오는 함수 호출
            })
            .catch(error => console.log(error));
    }, [id]);

    const fetchChannelInfo = channelId => {
        fetch(
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
        )
            .then(response => response.json())
            .then(result => {
                setChannelImage(result.items[0].snippet.thumbnails.default.url);
                setSubscriberCount(result.items[0].statistics.subscriberCount); // 구독자 수 상태값 설정
            })
            .catch(error => console.log(error));
    };

    if (!videoDetail?.snippet || !channelImage || !subscriberCount) return <Loader />; // 채널 이미지 로딩 중에도 로더 표시

    const {
        snippet: { title, channelId, channelTitle, description },
        statistics: { viewCount, likeCount },
    } = videoDetail;

    return (
        <section className="videoConts">
            <div className="container">
                <div className="video__sub">
                    <div className="left">
                        <div className="play">
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} />
                        </div>
                        <div className="desc">
                            <h3>{title}</h3>
                            <div className="channer">
                                <Link to={`/channel/${channelId}`}>
                                    <img src={channelImage} alt="Channel Thumbnail" /> {/* 채널 이미지 표시 */}
                                    {channelTitle}
                                </Link>
                                <div className="text">
                                    <span>구독자 {subscriberCount}명</span> {/* 구독자 수 표시 */}
                                    <span>
                                        <BiChevronDownCircle className="icon" />
                                        조회수 {viewCount}회
                                    </span>
                                    <span>
                                        <PiHeartStraight className="icon" />
                                        좋아요 {likeCount}회
                                    </span>
                                </div>
                            </div>
                            <div className="description">{description}</div>
                        </div>
                    </div>
                    <div className="right"></div>
                </div>
            </div>
        </section>
    );
};

export default VideoConts;
