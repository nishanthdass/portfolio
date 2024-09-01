import { useState, useEffect } from 'react';

const useTextReverseAnimation = (defaultText: string, replacementText: string, isHidden: boolean) => {
    const [currentTitle, setCurrentTitle] = useState(defaultText);
    const [animationIndex, setAnimationIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    const normalizeString = (str: string) => {
        return str.replace(/\u00A0/g, '').trim();
    };


    useEffect(() => {
        let animationTimer: NodeJS.Timeout;

        const rotateCharacter = (text: string) => {
            animationTimer = setTimeout(() => {
                if (animationIndex < replacementText.length || animationIndex < text.length ) {
                    setAnimationIndex((prevIndex) => prevIndex + 1);
                    // console.log(text[animationIndex], replacementText[animationIndex])
                    
                    if (replacementText[animationIndex]) {
                        if (animationIndex < text.length) {
                            let myString = text.slice(0, animationIndex) + text.slice(animationIndex).replace(text[animationIndex], replacementText[animationIndex]);
                            // console.log(myString)
                            setCurrentTitle(myString);
                        } else {
                            let myString = text + replacementText[animationIndex];
                            // console.log(myString)
                            setCurrentTitle(myString);
                        }
            
                    } else {
                        let myString = text.slice(0, animationIndex) + text.slice(animationIndex).replace(text[animationIndex], "\u00A0");
                        setCurrentTitle(myString);
                    }
                } else {
                    setIsAnimating(false);
                }
            }, 100);
        };

        const rotateBackCharacter = (text: string) => {
            animationTimer = setTimeout(() => {
                if (animationIndex >= 0) {
                    setAnimationIndex((prevIndex) => prevIndex - 1);
                    if (defaultText[animationIndex]) {
                        let myString = text.slice(0, animationIndex) + text.slice(animationIndex).replace(text[animationIndex], defaultText[animationIndex]);
                        setCurrentTitle(myString);
                    } else {
                        let myString = text.slice(0, animationIndex) + text.slice(animationIndex).replace(text[animationIndex], "\u00A0");
                        setCurrentTitle(myString);
                    }
                } else {
                    // console.log(animationIndex, text[animationIndex], replacementText[animationIndex], defaultText[animationIndex])
                    setIsRotating(true);
                    setIsAnimating(false);
                    setAnimationIndex(0);
                }
            }, 100);
            // console.log("rotating back.", " Text: ", text,". animationIndex: ", animationIndex)
        };

        if (isHidden) {
            if (!isRotating) {
                // console.log("1")
                setIsAnimating(true);
                rotateCharacter(currentTitle);
                
            } else {
                // console.log("2")
                setIsAnimating(true);
                rotateCharacter(currentTitle);
                setIsAnimating(true);
            }
        } else {
            if (!isRotating) {
                // console.log("3")
                setIsAnimating(true);
                rotateBackCharacter(currentTitle);
            } else {
                // console.log("4")
                // console.log(currentTitle, defaultText, normalizeString(currentTitle) !== normalizeString(defaultText))
                if (normalizeString(currentTitle) !== normalizeString(defaultText)) {
                    setIsAnimating(true);
                    rotateBackCharacter(currentTitle);
                } else {
                    setIsAnimating(false);
                }
                
        }
    }
        return () => clearTimeout(animationTimer);
    }, [isHidden, animationIndex, currentTitle, isRotating]);
    return { currentTitle, animationIndex, isAnimating };
};

export default useTextReverseAnimation;
