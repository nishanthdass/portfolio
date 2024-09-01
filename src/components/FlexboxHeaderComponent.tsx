import React, { useState } from 'react';
import './FlexboxHeaderComponent.css';
import AboutMeCardComponent from './AboutMeCardComponent';
import SlotMachineAnimationComponent from './animations/SlotMachineAnimationComponent';
import TypingAnimationComponent from './animations/TypingAnimationComponent';

interface FlexboxHeaderComponentProps {
    title: string;
    subtitle: string;
    fullName: string;
    aboutMe: string;
    profilePic: string;
    description: string;
}

const FlexboxHeaderComponent: React.FC<FlexboxHeaderComponentProps> = ({
    subtitle,
    fullName,
    aboutMe,
    profilePic,
    description,
}) => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <div 
            className="header" 
            onMouseEnter={() => setIsHidden(true)}
            onMouseLeave={() => setIsHidden(false)}
        >
            <div className={`header-title`}>
                <TypingAnimationComponent isHidden={isHidden} defaultText={fullName} replacementText={aboutMe} isLink={false} />
            </div>
            <div className="header-subtitle">{subtitle}</div>
            <div className={`hidden-div ${isHidden ? 'visible' : ''}`}>
                <div>
                    <AboutMeCardComponent description={description} profilePic={profilePic}/>
                </div>
            </div>
        </div>
    );
};

export default FlexboxHeaderComponent;
