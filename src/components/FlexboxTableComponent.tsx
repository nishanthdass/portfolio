import React from 'react';
import FlexboxHeaderComponent from './FlexboxHeaderComponent';
import FlexboxEducationComponent from './FlexboxEducationComponent';
import FlexboxSkillsComponent from './FlexboxSkillComponent';
import FlexboxProjectsComponent from './FlexboxProjectsComponent';
import './FlexboxTableComponent.css';
import './FlexboxHeaderComponent.css';
import './FlexboxEducationComponent.css';
import './FlexboxSkillsComponent.css';
import './FlexboxProjectsComponent.css';
import './PoliticalFactCheckerComponent.css';


interface Project {
    name: string;
    link: string;
    timeSpent: string;
    description: string;
    bullets: string[];
}
// Define the type for the props
interface FlexboxTableComponentProps {
    title: string;
    subtitle: string;
    fullName: string;
    aboutMe: string;
    profilePic: string;
    description: string;
    university: string;
    gpa: string;
    degree: string;
    timeSpent: string;
    coursework: string;
    languages: string;
    frameworks: string;
    tools: string;
    projects: Project[];
}

const FlexboxTableComponent: React.FC<FlexboxTableComponentProps> = ({
    title,
    subtitle,
    fullName,
    aboutMe,
    profilePic,
    description,
    university,
    gpa,
    degree,
    timeSpent,
    coursework,
    languages,
    frameworks,
    tools,
    projects // Accept projects as a prop
}) => {
    return (
        <div className="flexbox-table">
            <FlexboxHeaderComponent 
                title={title} 
                subtitle={subtitle} 
                fullName={fullName}
                aboutMe={aboutMe}
                profilePic={profilePic}
                description={description}
                />
            <FlexboxEducationComponent 
                university={university}
                gpa={gpa}
                degree={degree}
                timeSpent={timeSpent}
                coursework={coursework}
            />
            <FlexboxSkillsComponent
                languages={languages}
                frameworks={frameworks}
                tools={tools}
            />
            <div className="table">
            <div className="row heading">
                <div className="cell">PROJECTS</div>
            </div>
            {projects.map((project, index) => (
                <FlexboxProjectsComponent
                    key={index}
                    name={project.name}
                    link={project.link}
                    timeSpent={project.timeSpent}
                    description={project.description}
                    bullets={project.bullets}
                />
            ))}
            </div>
        </div>
    );
};

export default FlexboxTableComponent;
