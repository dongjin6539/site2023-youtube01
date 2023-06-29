import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const onKeyPress = e => {
        if (e.charCode === 13) {
            handelSearch();
        }
    };

    const handelSearch = () => {
        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <div className="search" onKeyPress={onKeyPress}>
            <label className="glass" htmlFor="searchInput">
                <AiOutlineSearch />
            </label>
            <input
                type="text"
                id="searchInput"
                className="input__search"
                placeholder="유튜브 검색하기"
                title="검색"
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
