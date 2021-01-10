import React, { useState } from 'react';

export interface DotSelectorProps {
    id: string;
    value: number;
    onChange: (value: number) => void;
    className?: string;
}

export default function WMDotSelector(props: DotSelectorProps) {
    const [hoverCount, setHoverCount] = useState(1);
    const [hovering, setHovering] = useState(false);


    const dotClick = (i: number) => {
        setHovering(false);
        props.onChange(i);
    };

    const enter = (i: number) => {
        setHoverCount(i);
        setHovering(true);
    };

    const exit = (i: number) => {
        setHovering(false);
    };

    const dots = [];
    for (var i = 1; i <= 5; i++) {
        const consti = i;
        const filled = i <= (hovering ? hoverCount : props.value);

        dots[i] = <div className="dib pointer w1" key={i}
            onClick={() => dotClick(consti)}
            onMouseEnter={() => enter(consti)}
            onMouseLeave={() => exit(consti)}
        >
            {filled ? '\u25CF' : '\u25CB'}
        </div>;
    }

    return (
        <div className={`usn ${props.className ?? ""}`} style={hovering ? { color: '#aaa' } : {}} id={props.id}>
            {dots}
        </div>
    );
}