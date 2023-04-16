import { notification } from 'antd';
import { createContext, useContext } from 'react'

const NotificationContext = createContext({
    message: "",
    desc: "",
    severity: "",
    duration: "",
    openNotification: (message, desc, severity, duration) => { },
})

export function useNotification() {
    return useContext(NotificationContext)
}

export function NotificationProvider(props) {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message, desc, severity, duration) => {
        switch (severity) {
            case "error":
                return api.error({
                    message: `${message}`,
                    description: `${desc}`,
                    placement: 'topRight',
                    duration: duration,
                });
            case "success":
                return api.success({
                    message: `${message}`,
                    description: `${desc}`,
                    placement: 'topRight',
                    duration: duration,
                });
            case "info":
                return api.info({
                    message: `${message}`,
                    description: `${desc}`,
                    placement: 'topRight',
                    duration: duration,
                });
            default:
                return api.warning({
                    message: `${message}`,
                    description: `${desc}`,
                    placement: 'topRight',
                    duration: duration,
                });
        }

    };

    const context = {
        openNotification,
    };

    return (
        <NotificationContext.Provider value={context}>
            {contextHolder}
            {props.children}
        </NotificationContext.Provider>
    );
}
