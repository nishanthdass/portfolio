import React from 'react';

interface FlexboxSkillsComponentProps {
    languages: string;
    frameworks: string;
    tools: string;
}

const FlexboxSkillsComponent: React.FC<FlexboxSkillsComponentProps> = ({
    languages,
    frameworks,
    tools,
}) => {
    return (
        <div className="table">
            <div className="row heading">
                <div className="cell">SKILLS</div>
            </div>
            <div className="row row-skills">
                <div className="cell column-label">Languages:</div>
                <div className="cell column-value">{languages}</div>
            </div>
            <div className="row row-skills">
                <div className="cell column-label">Frameworks:</div>
                <div className="cell column-value">{frameworks}</div>
            </div>
            <div className="row row-skills">
                <div className="cell column-label">Tools:</div>
                <div className="cell column-value">{tools}</div>
            </div>
        </div>
    );
};

export default FlexboxSkillsComponent;
