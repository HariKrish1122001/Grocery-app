import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBell, FaCheckCircle } from 'react-icons/fa';
import Cookies from "js-cookie";

// Styled components (same as previous)

const NotificationsPageContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const NotificationsTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: #999;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
`;

const NotificationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${(props) => (props.read ? '#fff' : '#eef6ff')};
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  box-shadow: ${(props) =>
    props.read ? '0 2px 5px rgba(0, 0, 0, 0.1)' : '0 4px 15px rgba(0, 122, 255, 0.2)'}; 
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: ${(props) =>
      props.read
        ? '0 5px 15px rgba(0, 0, 0, 0.1)'
        : '0 8px 20px rgba(0, 122, 255, 0.2)'};
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }
`;

const NotificationContent = styled.div`
  flex-grow: 1;
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const NotificationTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => (props.read ? '#666' : '#0070f3')};
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NotificationMessage = styled.div`
  font-size: 16px;
  color: ${(props) => (props.read ? '#888' : '#333')};
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 80%;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 100%;
  }
`;

const NotificationDate = styled.div`
  font-size: 14px;
  color: #999;
  margin-top: 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const NotificationIcon = styled.div`
  color: ${(props) => (props.read ? '#ddd' : '#0070f3')};
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  transition: color 0.3s ease;
  @media (max-width: 768px) {
    font-size: 24px;
    margin-left: 0;
    margin-top: 10px;
  }
`;

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get("token");
        
          // If there's no token, redirect to the login page
          if (!token) {
            navigate("/login");
            return;
          }

        const response = await axios.get('/api/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('API Response:', response.data); // Log API response for debugging
        const fetchedNotifications = response.data.data;

        const savedStatus = JSON.parse(localStorage.getItem('notificationsReadStatus')) || {};

        const updatedNotifications = fetchedNotifications.map(notification => {
          return {
            ...notification,
            read: savedStatus[notification._id] || notification.read
          };
        });

        setNotifications(updatedNotifications);
        setLoading(false);
      } catch (err) {
      
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Save read/unread status to localStorage
  const toggleReadStatus = (id) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = prevNotifications.map((notification) =>
        notification._id === id
          ? { ...notification, read: !notification.read }
          : notification
      );

      // Update localStorage with the new read/unread status
      const savedStatus = JSON.parse(localStorage.getItem('notificationsReadStatus')) || {};
      savedStatus[id] = !savedStatus[id];

      localStorage.setItem('notificationsReadStatus', JSON.stringify(savedStatus));

      return updatedNotifications;
    });
  };

  const handleNotificationClick = (notification) => {
    const notificationPage = notification.page || '/';
    toggleReadStatus(notification._id);

    const fullPath = `http://localhost:3000${notificationPage}`;
    window.location.href = fullPath;
  };

  if (loading) {
    return   <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <div
      style={{
        border: '8px solid #f3f3f3', 
        borderTop: '8px solid #fff', 
        borderRadius: '50%',
        width: '50px',  
        height: '50px',
        animation: 'spin 1s linear infinite', 
      }}
    ></div>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <NotificationsPageContainer className='mt-5 mb-5'>
      <NotificationsTitle>Notifications</NotificationsTitle>
      {notifications.length === 0 ? (
        <p >No notifications available.</p>
      ) : (
        <NotificationsList>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              read={notification.read}
              onClick={() => handleNotificationClick(notification)}
            >
              <NotificationContent>
                <NotificationTitle read={notification.read}>
                  {notification.title}
                </NotificationTitle>
                <NotificationMessage read={notification.read}>
                  {notification.body}
                </NotificationMessage>
                <NotificationDate>
                  {new Date(notification.date).toLocaleString()}
                </NotificationDate>
              </NotificationContent>
              <NotificationIcon read={notification.read}>
                {notification.read ? (
                  <FaCheckCircle style={{ color: 'green' }} />
                ) : (
                  <FaBell />
                )}
              </NotificationIcon>
            </NotificationItem>
          ))}
        </NotificationsList>
      )}
    </NotificationsPageContainer>
  );
};

export default NotificationsPage;
