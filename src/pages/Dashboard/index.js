import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import styled from 'styled-components';

import io from 'socket.io-client';

export default function Dashboard() {
    const [ spots, setSpots ] = useState([]);
    const [ requests, setRequests] = useState([]);

    const userid = localStorage.getItem('userid');

    const socket = useMemo( () => io('http://192.168.0.3:3333', {
        query : { userid }
    }), [userid]);

    useEffect( () => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });      
    }
    , [requests, socket]);

	useEffect( () => {

		(async function loadSpots() {
			const userid = localStorage.getItem('userid');
			const response = await api.get('/dashboard', {
				headers: {
					userid
				}
			});
            
			setSpots(response.data);

		})();

	}, [] );

    async function handleAccept(bookingId, userid) {
        await api.post(`/bookings/${bookingId}/approvals`, null, { 
            headers: { userid }
        });

        setRequests(requests.filter( request => request._id !== bookingId ));
    }

    async function handleReject(bookingId, userid) {
        await api.post(`/bookings/${bookingId}/rejections`, null, { 
            headers: { userid }
        });

        setRequests(requests.filter( request => request._id !== bookingId ));
    }

  return (
    <>
        <Notifications >
            { 
                requests.map( request => (
                    <NotificationsList key={request._id}>
                        <NotificationsParagraph>
                            <NotificationsStrong>{request.user.email}</NotificationsStrong> está solicitando uma reserva em <NotificationsStrong>{request.spot.company}</NotificationsStrong> para a data <NotificationsStrong>{request.date}</NotificationsStrong>
                        </NotificationsParagraph>
                        <NotificationsButton className="accept" onClick={() => handleAccept(request._id, userid)}>Aceitar</NotificationsButton>
                        <NotificationsButton className="reject" onClick={() => handleReject(request._id, userid)}>Rejeitar</NotificationsButton>
                    </NotificationsList>
                ))
            }
        </Notifications>
        <SpotList>
            { spots.map( spot => (
                <SpotListItem key={spot._id}>
                    <HeaderImg style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                    <Strong>{spot.company}</Strong>
                    <Span>{spot.price ? `R$ ${spot.price}/dia` : `Gratuito`}</Span>
                </SpotListItem>
            ))}
        </SpotList>
        <Link to="/new">
            <button className="btn" type="button">
                Cadastrar novo Spot        
            </button>
        </Link>
    </>
  )
}

const Notifications = styled.ul`
    list-style: none;
    margin-bottom: 15px;
`;

const NotificationsList = styled.li`
    font-size: 16px;
    line-height: 24px;
`;

const NotificationsParagraph = styled.p``;

const NotificationsStrong = styled.strong``;

const NotificationsButton = styled.button`
    margin-right: 10px;
    border: 0;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;

    &.accept {
        color: #84C870;
    }

    &.reject {
        color: #E55E5E;
    }
`;

const SpotList = styled.ul`
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    margin-bottom: 30px;
`;

const SpotListItem = styled.li`
    display: flex;
    flex-direction: column;
`;

const HeaderImg = styled.header`
    width: 100%;
    height: 120px;
    background-size: cover;
    border-radius: 4px;
`;

const Strong = styled.strong`
    margin-top: 10px;
    font-size: 24px;
    color: #444;
`;

const Span = styled.span`
    font-size: 15px;
    color: #999;
`;
