import React from 'react';

interface MarketingContentComponentProps {
    projectPic: string;
}

const MarketingContentComponent: React.FC<MarketingContentComponentProps> = ({
    projectPic,
}) => {
    return (
        <div className="table">
            <div className="row">
                <div className="project-column">
                    <img className="mcg-project-frame" src={projectPic} alt="Political Fact Checker illustration" />
                </div>
            </div>
        </div>
    );
};

export default MarketingContentComponent;
