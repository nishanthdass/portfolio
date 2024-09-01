import { useState, useEffect } from 'react';

const useTextAnimation = (defaultText: string, replacementText: string, isHidden: boolean) => {
    const [currentTitle, setCurrentTitle] = useState(defaultText);
    const [animationIndex, setAnimationIndex] = useState(defaultText.length);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isTypingMode, setIsTypingMode] = useState(false);

    useEffect(() => {
            let animationTimer: NodeJS.Timeout;

            const handleTyping = (text: string) => {
                if (animationIndex < text.length) {
                    setAnimationIndex((prevIndex) => prevIndex + 1);
                    setCurrentTitle(text.slice(0, animationIndex + 1));
                } else {   
                    setIsAnimating(false); // Stop animating once typing is complete
                }
            };

            const handleDeleting = () => {
                if (animationIndex > 0) {
                    setAnimationIndex((prevIndex) => prevIndex - 1);
                    setCurrentTitle(currentTitle.slice(0, animationIndex - 1));
                } else {
                    setIsTypingMode(true);
                    setIsAnimating(false);
                    setAnimationIndex(0); // Reset index for typing
                }
            };

            if (isHidden) {
                if (!isTypingMode) {
                    setIsAnimating(true);
                    animationTimer = setTimeout(handleDeleting, 100);
                    
                } else {
                    setIsAnimating(true);
                    animationTimer = setTimeout(() => handleTyping(replacementText), 100);
                }
            } else {
                
                if (!isTypingMode) {
                    setIsAnimating(true);
                    animationTimer = setTimeout(() => handleTyping(defaultText), 100);
                } else {
                    setIsAnimating(true);
                    animationTimer = setTimeout(handleDeleting, 100);
                    if (currentTitle === "") {
                        setIsTypingMode(false);
                    }
                }
            }

            return () => clearTimeout(animationTimer);
        }, [isHidden, animationIndex, isTypingMode, currentTitle]);

        return { currentTitle, isAnimating };
};

export default useTextAnimation;
