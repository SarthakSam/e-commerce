import { createContext, useContext, useState } from "react";

const NotificationsContext = createContext({});

export function useNotifications() {
    return useContext(NotificationsContext);
}

export function NotificationsProvider({children}) {
    const [notifications, setNotifications] = useState([]);

    const showNotification = ({message, type}) => {
        setNotifications(notifications => [...notifications, {
            id: (new Date()).toISOString(),
            message,
            type
        }])
    }
    
    const deleteNotification = (id) => {
        setNotifications(notifications => notifications.filter( notification => id !== notification.id ));
    }

    return (
    <NotificationsContext.Provider value = {{ notifications, showNotification, deleteNotification }}>
        {children}
    </NotificationsContext.Provider>
    );
}