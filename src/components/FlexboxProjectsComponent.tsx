import React, { useState, Suspense } from 'react';
import ragProjectPic from '../assets/rag-drawing.png';
import mcgProjectPic from '../assets/mcg_demo.png';
import RandomAnimationComponent from './animations/RandomAnimationComponent';
import FlipTextAnimationComponent from './animations/FlipTextAnimationComponent';

const PoliticaFactCheckerComponent = React.lazy(() => import('./PoliticaFactCheckerComponent'));
const MarketingContentComponent = React.lazy(() => import('./MarketingContentComponent'));

interface FlexboxProjectsComponentProps {
    name: string;
    link: string;
    timeSpent: string;
    description: string;
    bullets: string[];  // Assuming bullets are strings
}

const FlexboxProjectsComponent: React.FC<FlexboxProjectsComponentProps> = ({
    name,
    link,
    timeSpent,
    description,
    bullets,
}) => {
    
    const [isProjHidden, setIsProjHidden] = useState(false);
    const projectClassName = `project-header-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const hiddenDivClassName = `hidden-div-${name.replace(/\s+/g, '-').toLowerCase()}`;

    const renderComponent = () => {
        if (name === "Political Fact Checker") {
            return (
                <Suspense fallback={<div>Loading...</div>}>
                    <PoliticaFactCheckerComponent projectPic={ragProjectPic} />
                </Suspense>
            );
        } else if (name === "Marketing Content Generator") {
            return (
                <Suspense fallback={<div>Loading...</div>}>
                    <MarketingContentComponent projectPic={mcgProjectPic} />
                </Suspense>
            );
        }
        return null;
    };

    return (
        <div>
            <div className={projectClassName}
                onMouseEnter={() => setIsProjHidden(true)}
                onMouseLeave={() => setIsProjHidden(false)}>
                <div className="row">
                    <div className="cell">
                        <div className="project-title">
                            <FlipTextAnimationComponent isHidden={isProjHidden} defaultText={name} replacementText={link} isLink={true}/>
                        </div>
                    </div>
                    <div className="cell section-column-right">{timeSpent}</div>
                </div>
                {description && description.length > 0 && (
                    <div className="row">
                        <div className="cell column-description">{description}</div>
                    </div>
                )}
                <div
                    className={`${hiddenDivClassName} ${isProjHidden ? 'visible' : 'visible'}`}
                >
                    {renderComponent()}
                </div>
                    <div className="row">
                        <div className="cell column-bullet-list">
                            <ul>
                                {bullets.map((bullet, index) => (
                                    <li key={index}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

            </div>
        </div>
    );
};

export default FlexboxProjectsComponent;
