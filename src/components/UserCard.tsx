import React from 'react';
import {UserInfo} from "../service/Models";
import avatar from '../assets/avatar.png';

interface UserCardProps {
    user: UserInfo
}

const UserCard = ({user}: UserCardProps) => {
    return (
        <div className={'userCard'}>
            <img src={user.profile_pic_url || avatar} className={'userAvatar'} />
            <div className={'userCard_info'}>
                <b onClick={() => window.open(`https://instagram.com/${user.username}`, '__blank')}>
                    {user.username}
                </b>
                <p>Внешняя ссылка {user.external_url ? <a href={user.external_url} target='__blank'>{user.external_url}</a> : 'отсутствует'}</p>
                <p>{user.media.length} публикаций</p>
                <p>телефон: {user.public_contact_phone_number || ' не указан'}</p>
                <p>почта: {user.public_email || ' не указана'}</p>
            </div>
        </div>
    )
};

export default UserCard;