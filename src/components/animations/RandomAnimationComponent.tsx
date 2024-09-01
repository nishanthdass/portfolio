import React, { useRef } from 'react';
import TypingAnimationComponent from './TypingAnimationComponent';
import FlipTextAnimationComponent from './FlipTextAnimationComponent';


const animationComponents = [
    TypingAnimationComponent,
    FlipTextAnimationComponent,

];

const getRandomAnimationComponent = () => {
    const randomIndex = Math.floor(Math.random() * animationComponents.length);
    return animationComponents[randomIndex];
};

const RandomAnimationComponent = ({ isHidden, defaultText, replacementText, isLink }) => {
    const selectedAnimationRef = useRef(getRandomAnimationComponent());

    const SelectedAnimationComponent = selectedAnimationRef.current;



    return (
        <SelectedAnimationComponent
            isHidden={isHidden}
            defaultText={defaultText}
            replacementText={replacementText}
            isLink={isLink}
        />
    );
};

export default RandomAnimationComponent;
