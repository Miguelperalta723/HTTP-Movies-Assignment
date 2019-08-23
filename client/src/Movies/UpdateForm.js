import React, { useState, useEffect } from 'react';
import axios from "axios";

const UpdateMovie = props => {
    const [updateMovie, setUpdateMovie] = useState({ id: 0, title: '', director: '', metascore: 0, stars: [] });

    // const fetchMovie = id => {
    //     axios
    //         .get(`http://localhost:5000/api/movies/${id}`)
    //         .then(res => {
    //             console.log('res in edit movie', res)
    //             setEdit({ ...res.data, id: id });
    //         })
    //         .catch(err => console.log(err.response));
    // };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                console.log('res', res)
                setUpdateMovie({ ...res.data, id: props.match.params.id });
            })
            .catch(err => console.log(err.response));
    }, []);

    const handleChange = e => {
        setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.value });
    }

    const handleChangeStars = (e, i) => {
        let starsChange = updateMovie.stars.slice();
        starsChange[i] = e.target.value;
        setUpdateMovie({ ...updateMovie, stars: starsChange });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, updateMovie)
            .then(res => {
                console.log(res);
                setUpdateMovie({ id: 0, title: '', director: '', metascore: 0, stars: [] });
                props.history.push('/');
            })
            .catch(err => console.log("error", err.response));
    }

    return (
        <form className='movieForm' onSubmit={handleSubmit}>
            <div className='input'>
                <label htmlFor='title'>Title: </label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={updateMovie.title}
                        onChange={handleChange}
                    />
            </div>
            <div className='input'>
                <label htmlFor='director'>Director: </label>
                    <input
                    type='text'
                    name='director'
                    id='director'
                    value={updateMovie.director}
                    onChange={handleChange}
                    />
            </div>
            <div className='input'>
                <label htmlFor='metascore'>Metascore: </label>
                    <input
                    type='number'
                    name='metascore'
                    id='metascore'
                    value={updateMovie.metascore}
                    onChange={handleChange}
                    />
            </div>
            <div className='input'>
            <label htmlFor='stars'>Stars: </label>
                {updateMovie.stars.map((star, i) => {
                    return (
                        <div>
                            <input
                            type='text'
                            name={`stars`}
                            value={star}
                            onChange={(e) => handleChangeStars(e, i)}
                            />
                        </div>
                    )
                })}
            </div>
            <button>Update</button>
        </form>
    );
}

export default UpdateMovie;