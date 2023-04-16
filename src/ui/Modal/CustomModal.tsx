import { Button, Modal } from 'antd';
import React from 'react'


interface ModalProps {
    children: React.ReactNode | React.ReactNode[];
    title: string;
    onOk: () => void;
    btnTitle: string;
    footer?: React.ReactNode;
}

const CustomModal = ({ children, onOk, btnTitle, title, footer }: ModalProps) => {
    const [open, isOpen] = React.useState<boolean>(false);

    return (
        <>
            <Button onClick={() => isOpen(true)}>{btnTitle}</Button>
            <Modal open={open} centered={true} onCancel={() => isOpen(false)} onOk={() => { onOk(); isOpen(false) }} destroyOnClose={true} title={title} footer={footer}>
                {children}
            </Modal>
        </>

    )
}

export default CustomModal