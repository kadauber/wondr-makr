import React, { PropsWithChildren } from 'react';

export interface WMButtonProps {
    className?: string;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

export default function WMButton(props: PropsWithChildren<WMButtonProps>) {
    return <button className={`pointer pa1 ${props.className ?? ""}`} onClick={props.onClick}>
        {props.children}
    </button>
}