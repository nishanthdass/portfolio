import React from 'react';

interface AboutMeCardComponentProps {
    description: string;
    profilePic: string;
}

const AboutMeCardComponent: React.FC<AboutMeCardComponentProps> = ({
    description,
    profilePic,
}) => {
    return (
        <div className="table">
            <div className="row">
                <div className="aboutme-column-left"><img className="profile-pic" src={profilePic} alt="Profile" /></div>
                <div className="aboutme-column-right">{description}</div>
            </div>
        </div>
    );
};

export default AboutMeCardComponent;
