import React from 'react';
import useTextReverseAnimation from '../../hooks/useTextReverseAnimation';
import './FlipTextAnimationComponent.css';
import { checkLink } from '../../utils/checkLink';

interface FlipTextAnimationComponentProps {
    isHidden: boolean;
    defaultText: string;
    replacementText: string;
    isLink: boolean;
}

const FlipTextAnimationComponent: React.FC<FlipTextAnimationComponentProps> = ({ isHidden, defaultText, replacementText, isLink }) => {
    // Replace spaces with non-breaking spaces
    defaultText = defaultText.replace(/ /g, "\u00A0");
    replacementText = replacementText.replace(/ /g, "\u00A0");

    const { currentTitle, animationIndex, isAnimating } = useTextReverseAnimation(defaultText, replacementText, isHidden);

    const { isClickable, handleClick } = checkLink(
        currentTitle,
        replacementText,
        isLink
    );

    

    return (
        <div onClick={handleClick} style={{ cursor: isClickable ? 'pointer' : 'default' }}>
            {currentTitle.split('').map((char, index) => {
                let className = '';

                if (isAnimating) {
                    if (index === animationIndex) {
                        className = 'flip-out'; // Current character flips out
                    } else if (index === animationIndex + 1) {
                        className = 'flip-in flip-in-active'; // Next character flips in
                    }
                }

                return (
                    <span key={index} className={className}>
                        {char}
                    </span>
                );
            })}
        </div>
    );
};

export default FlipTextAnimationComponent;
