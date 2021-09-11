import React, { useEffect, useContext } from 'react'
import { subscriptionsContext } from './subscriptionsContext'
import { membersContext } from './membersContext'
import subscriptionsUtils from '../utils/subscriptionsUtils'
import MemberComp from './MemberComp'
const AllMemberComp = (props) => {
    const [members, setMembers] = useContext(membersContext)
    const [subscriptions, setSubscriptions] = useContext(subscriptionsContext)
    let membersToRender;

    useEffect(async () => {
        if (props.match.params.id) {
            let member = await subscriptionsUtils.getMemberById(props.match.params.id)
            setMembers([...members, member]);
            let subscriptions = await subscriptionsUtils.getAllSubs();
            setSubscriptions(subscriptions);
        } else {
            let members = await subscriptionsUtils.getAllMembers();
            setMembers(members);
            let subscriptions = await subscriptionsUtils.getAllSubs();
            setSubscriptions(subscriptions);
        }
    }, [])

    // passes the data to membercomp, gets back delete from memberscomp and deletes the member and the subscription

    membersToRender = members.map((member) => {
        return <div key={member._id}><MemberComp member={member}
            isDelete={async (id) => {
                await subscriptionsUtils.deleteMember(id)
                let members = await subscriptionsUtils.getAllMembers()
                setMembers(members)
                let subs = await subscriptionsUtils.getAllSubs()
                if (subs.find(sub => sub.memberId == id)) {
                    let subToDelete = subs.find(sub => sub.memberId == id)
                    await subscriptionsUtils.deleteSub(subToDelete._id)
                }

            }}
        />
        </div>
    })
    return (
        <div>
            {membersToRender}
        </div>
    )
}
export default AllMemberComp