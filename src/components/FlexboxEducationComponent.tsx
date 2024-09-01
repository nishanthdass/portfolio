import React from 'react';

interface FlexboxEducationComponentProps {
    university: string;
    gpa: string;
    degree: string;
    timeSpent: string;
    coursework: string;
}

const FlexboxEducationComponent: React.FC<FlexboxEducationComponentProps> = ({
    university,
    gpa,
    degree,
    timeSpent,
    coursework,
}) => {
    return (
        <div className="table">
            <div className="row heading">
                <div className="cell">EDUCATION</div>
            </div>
            <div className="row">
                <div className="cell section-column-left">{university}</div>
                <div className="cell section-column-right">{gpa}</div>
            </div>
            <div className="row">
                <div className="cell section-column-left">{degree}</div>
                <div className="cell section-column-right">{timeSpent}</div>
            </div>
            <div className="row">
                <div className="cell column-coursework-label">Coursework:</div>
                <div className="cell column-coursework-value">{coursework}</div>
            </div>
        </div>
    );
};

export default FlexboxEducationComponent;
