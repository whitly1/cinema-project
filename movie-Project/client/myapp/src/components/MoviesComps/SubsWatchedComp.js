import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import subscriptionsUtils from '../utils/subscriptionsUtils';
const SubsWatchedComp = (props) => {
    let subToRender;
    let membersProms = [];
    const [members, setMembers] = useState([])

    // checks all the subs who have the movie in their movies array and displays them

    useEffect(async () => {
        let subs = await subscriptionsUtils.getAllSubs();
        let filtered = [];
        subs.forEach(sub => {
            if (sub.movies.some(movie => movie.movieId == props.movie._id)) {
                filtered = [...filtered, sub]
            }
        })

        membersProms = filtered.map(async (sub) => {
            return {
                id: sub.memberId,
                name: await subscriptionsUtils.getMemberNameById(sub.memberId),
                dateOfMovie: sub.movies.find(movie => movie.movieId == props.movie._id).dateOfMovie
            }

        })
        setMembers(await Promise.all([...membersProms]));
    }, [])

    subToRender = members.map((member, i) => {
        return <li key={i}><Link to={`/MainPage/SubscriptionsPage/AllMembersPage/${member.id}`}>{member.name}</Link>,{member.dateOfMovie.slice(8).slice(0, 2) + "/" + member.dateOfMovie.slice(5).slice(0, 2) + "/" + member.dateOfMovie.slice(0, 4)}</li>
    })

    return (
        <div style={{ border: "2px solid black", width: "300px" }}>
            <span><b>Subscriptions Watched</b></span>
            <ul>
                {subToRender}
            </ul>
        </div>
    )
}
export default SubsWatchedComp