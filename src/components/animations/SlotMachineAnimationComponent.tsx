import React, { useState } from 'react';
import useSlotMachineAnimation from '../../hooks/useSlotMachineAnimation';
import './SlotMachineAnimationComponent.css';
// import { checkLink } from '../../utils/checkLink';

interface SlotMachineAnimationComponentProps {
    isHidden: boolean;
    defaultText: string;
    replacementText: string;
    isLink: boolean;
}

const SlotMachineAnimationComponent: React.FC<SlotMachineAnimationComponentProps> = ({ isHidden, defaultText, replacementText, isLink }) => {
    // Replace spaces with non-breaking spaces
    defaultText = defaultText.replace(/ /g, "\u00A0");
    replacementText = replacementText.replace(/ /g, "\u00A0");

    const generateRandomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Determine the length based on the longer text
    const boxes = new Array(Math.max(defaultText.length, replacementText.length)).fill('');

    // Generate the array of random values on initial load only
    const [randomIntArray] = useState(() => 
        new Array(boxes.length).fill(0).map(() => generateRandomInt(15, 24))
    );

    // Generate the array of random values on initial load only
    const [randomIntTimeArray] = useState(() => 
        new Array(boxes.length).fill(0).map(() => generateRandomInt(150, 170))
    );

    const defaultTextBoxes = []
    const replacementTextBoxes = []

    for (let i = 0; i < boxes.length; i++) {
        let defaultChar = ''
        let replacementChar = ''
        if (defaultText[i]) {
            defaultChar = defaultText[i]
            defaultTextBoxes[i] = defaultChar
        } else {
            defaultChar = "\u00A0"
            defaultTextBoxes[i] = defaultChar
        }
        if (replacementText[i]) {
            replacementChar = replacementText[i]
            replacementTextBoxes[i] = replacementChar
        } else {
            replacementChar = "\u00A0"
            replacementTextBoxes[i] = replacementChar
        }
    }
    // console.log(defaultTextBoxes)
    // console.log(replacementTextBoxes)
    // console.log(randomIntArray)

    const { currentBoxes } = useSlotMachineAnimation(boxes, defaultTextBoxes, replacementTextBoxes, randomIntArray, randomIntTimeArray, isHidden);

    return (
        <div className="slot-machine">
            {currentBoxes.map((box, index) => (
                <div key={index} className="slot-box">
                    {box}
                </div>
            ))}
        </div>
    );
};

export default SlotMachineAnimationComponent;