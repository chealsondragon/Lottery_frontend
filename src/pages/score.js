import React, { useEffect, useState } from 'react'

import Container from '@mui/material/Container';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/reducers/users';

function Score() {
    const [allScores, setAllScores] = useState([]);
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.users.loginedUserInfo)
    const userList = useSelector((state)=>state.users.userList)
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    useEffect(() => {
        
        dispatch(fetchUser({config}))
        async function fetchScoreData() {
            const scores = await axios.post('http://127.0.0.1:8000/api/users/getallscore/', {
            }, config)
                .then(res => res.data)
                .catch(error => console.log(error));
            setAllScores(scores);
        }
        fetchScoreData();
    }, [])
    return (
        <Container component="main" maxWidth="md" className='mt-5'>
            {allScores.length > 0 ? (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Score</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allScores.map((score, index) => (
                                <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td>{score._id}</td>
                                    <td>{score.name}</td>
                                    <td>{score.score}</td>
                                    <td>{score.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )
                : (<></>)}
        </Container>
    )
}

export default Score