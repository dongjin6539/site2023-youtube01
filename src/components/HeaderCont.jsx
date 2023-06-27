import React from 'react';
import { Link } from 'react-router-dom';

import { AiFillYoutube } from 'react-icons/ai';

const HeaderCont = () => {
    return (
        <header id="header">
            <h1 className="logo">
                <Link to="/">
                    <AiFillYoutube className="icon" />
                    SDJ Youtube
                </Link>
            </h1>
            <div className="search">
                <label className="glass" htmlFor=""></label>
                <input
                    type="text"
                    id="searchInput"
                    className="input__search"
                    placeholder="유튜브 검색하기"
                    title="검색"
                />
            </div>
        </header>
    );
};

export default HeaderCont;
