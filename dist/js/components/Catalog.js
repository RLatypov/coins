import React from 'react';
import { Link } from 'react-router-dom';

const tilesData = [
    {
        img: '/images/eu-countries/eu-regular.jpg',
        title: 'Euro regular',
        link: '/euro-regular'
    },
    {
        img: '/images/eu-years/eu-years.jpg',
        title: 'Euro commemorative',
        link: '/euro-commemorative'
    }
];

class Catalog extends React.Component {
    render () {
        return (
            <div className='grid'>
                {tilesData.map((tile) => (
                    <Link to={tile.link} className='grid-tile' key={tile.img}>
                        <img className='grid-img' src={tile.img} />
                        <span className='grid-title'>{tile.title}</span>
                    </Link>
                ))}
            </div>
        );
    }
}

export default Catalog;
