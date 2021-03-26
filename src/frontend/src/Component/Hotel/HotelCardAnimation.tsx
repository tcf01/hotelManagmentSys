import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { Class } from '../redux/hotel/state';

export function HotelCardAnimation(props: any) {
    const { className, elem } = props;
    const [flipped, set] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? -180 : 0}deg)`,
        config: { mass: 5, tension: 1000, friction: 80 },
    });
    return (
        <div
            className={className}
            onMouseEnter={() => set(flipped => true)}
            onMouseLeave={() => set(flipped => false)}
        >
            <a.div
                style={{
                    opacity: opacity.to(o => 1 - o),
                    transform,
                }}
                className={'c front'}
            >
                <div className="basicInfo">
                    <div className="hotelPic">
                        <img src="http://bit.ly/2LQQe20" alt="" />
                    </div>
                    <div className="contactInfo">
                        <div className={`hotel chiName`}>{elem.chiName}</div>
                        <div className={`hotel engName`}>{elem.engName}</div>
                    </div>
                </div>
            </a.div>

            <a.div
                style={{
                    opacity,
                    transform: transform.to(t => `${t} rotateY(180deg)`),
                }}
                className={'c back'}
            >
                <div className="telephoneSection">
                    <div className="headerText">電話：</div>
                    <div className="number">{elem.telephone}</div>
                </div>
                <div className="classes">
                    級別：
                    <select>
                        {elem.classes.map((eachClass: Class, index: number) => (
                            <option value={`${eachClass.className}`} key={index}>
                                {eachClass.className}
                            </option>
                        ))}
                    </select>
                </div>
            </a.div>
        </div>
    );
}
