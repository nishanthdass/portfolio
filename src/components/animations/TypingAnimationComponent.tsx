import React from 'react';
import useTextAnimation from '../../hooks/useTextAnimation';
import './TypingAnimationComponent.css'
import { checkLink } from '../../utils/checkLink';

interface TypingAnimationComponentProps {
    isHidden: boolean;
    defaultText: string;
    replacementText: string;
    isLink: boolean;
}

const TypingAnimationComponent: React.FC<TypingAnimationComponentProps> = ({ isHidden, defaultText, replacementText, isLink }) => {
    const { currentTitle, isAnimating } = useTextAnimation(defaultText, replacementText, isHidden);

    // Apply 'none-animation' if both isHidden and isAnimating are false
    const className = (!isHidden && !isAnimating) ? 'none-animation' : 'typing-animation';

    
    const { isClickable, handleClick } = checkLink(
        currentTitle,
        replacementText,
        isLink
    );

    return (
        <div onClick={handleClick} style={{ cursor: isClickable ? 'pointer' : 'default' }}>
            <div className={className}>
                {currentTitle}
            </div>
        </div>
    );
};

export default TypingAnimationComponent;
