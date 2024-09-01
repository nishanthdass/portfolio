import React from 'react';
import AppLayout from '../layouts/AppLayout';
import FlexboxTableComponent from '../components/FlexboxTableComponent';
import projects from '../data/projects';
import description from '../data/description';
import profilePic from '../assets/profilepic.jpeg';


const HomePage: React.FC = () => {
    const title = "Nishanth Dass";
    const subtitle = "Brooklyn, NY | (803) 873-5707 | nishanthdass@gmail.com | github.com/nishanthdass";
    let fullName = "Nishanth Dass";
    let aboutMe = "about me";
    const university = "Oregon State University";
    const gpa = "4.0 Cumulative GPA";
    const degree = "Bachelor of Science in Computer Science";
    const timeSpent = "January 2021 – September 2024";
    const coursework = "Cloud Computing, Data Structures, Algorithmic Analysis, CI/CD, Web Development, Databases Management, Operating Systems & Object-Oriented Programming";
    const languages = "Python, C. C++, Assembly, JavaScript, TypeScript, SQL";
    const frameworks = "Flask, React, Langchain, Express.js, MongoDB, matplotlib, NumPy, Irvine32";
    const tools = "Git, Jupiter Notebook, Jira, Docker, Postman, Google Cloud Platform, Unix/Linux";

    return (
        <AppLayout>
            <FlexboxTableComponent
                title={title}
                subtitle={subtitle}
                fullName={fullName}
                aboutMe={aboutMe}
                profilePic={profilePic}
                description={description}
                university={university}
                gpa={gpa}
                degree={degree}
                timeSpent={timeSpent}
                coursework={coursework}
                languages={languages}
                frameworks={frameworks}
                tools={tools}
                projects={projects} 
            />
        </AppLayout>
    );
};

export default HomePage;
