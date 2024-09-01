import { useState, useEffect } from 'react';

const useSlotMachineAnimation = (
  boxes: string[], 
  defaultTextBoxes: string[], 
  replacementTextBoxes: string[], 
  randomIntArray: number[], 
  randomIntTimeArray: number[], 
  isHidden: boolean
) => {

    // Define the initial array separately
  const initialAnimationIndexArray: number[] = Array.from({ length: boxes.length }, (_, i) => i);

    // Use the initial array to set the state
  const [animationIndexArray, setAnimationIndexArray] = useState<number[]>(initialAnimationIndexArray);

  console.log(animationIndexArray)
  const [currentBoxes, setCurrentBoxes] = useState(boxes);

  const items = [
    '🍭', '❌', '⛄️', '🦄', '🍌',
    '💩', '👻', '😻', '💵', '🤡',    
    '🦖', '🍎', '😂', '🖕',
  ];

  const getSymbol = (listItems, currentIndex) => { 

    return listItems[currentIndex % listItems.length];
  };

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    const rotateCharacter = (i: number, randomInt: number, time: number) => {
      const interval = setInterval(() => {
        setAnimationIndexArray(prevArray => {
          const newArray = [...prevArray];
          if (newArray[i] < randomInt) {
            newArray[i] += 1;
            setCurrentBoxes(prevBoxes => {
              const newBoxes = [...prevBoxes];
              console.log(newArray, animationIndexArray)
              newBoxes[i] = getSymbol(items, newArray[i]);
              return newBoxes;
            });
 
          } else {
            clearInterval(interval);  // Clear interval when done
          }
          return newArray;
        });
      }, time);

      timers.push(interval);
    };

    const rotateBackCharacter = (i: number, time: number) => {
      const interval = setInterval(() => {
        setAnimationIndexArray(prevArray => {
          const newArray = [...prevArray];
          if (newArray[i] > initialAnimationIndexArray[i]) {
            newArray[i] -= 1;
            setCurrentBoxes(prevBoxes => {
              const newBoxes = [...prevBoxes];
              newBoxes[i] = getSymbol(items, newArray[i]);
              return newBoxes;
            });
          } else {
            clearInterval(interval);  // Clear interval when done
          }
          return newArray;
        });
      }, time);

      timers.push(interval);
    };

    if (isHidden) {
      for (let i = 0; i < boxes.length; i++) {
        rotateCharacter(i, randomIntArray[i], randomIntTimeArray[i]);
      }
    } else {
      for (let i = 0; i < boxes.length; i++) {
        rotateBackCharacter(i, randomIntTimeArray[i]);
      }
    }

    return () => timers.forEach(clearInterval);

  }, [isHidden, randomIntArray, randomIntTimeArray]);

  return { currentBoxes };
};

export default useSlotMachineAnimation;
