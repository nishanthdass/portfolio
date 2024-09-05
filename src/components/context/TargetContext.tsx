import React, { createContext, useContext, useState, useCallback } from "react";

// Interface for the target context
interface TargetContextType {
  targetId: string | null;
  setTargetId: (id: string | null) => void;
  collisions: Record<string, string[]>; // Stores collision IDs per element
  setCollisionIds: (id: string, collisionIds: string[]) => void; // Updates collision IDs
}

// Interface for animating context
interface AnimatingContextType {
  animatingPositions: Record<string, { left: number; top: number; right: number; bottom: number, className: string }>;
  setAnimatingPosition: (id: string, newPosition: { left: number; top: number; right: number; bottom: number, className: string }) => void;
}

// Creating contexts
const TargetContext = createContext<TargetContextType | undefined>(undefined);
const AnimatingContext = createContext<AnimatingContextType | undefined>(undefined);

// Provider for managing targetId
export const TargetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [targetId, setTargetId] = useState<string | null>(null);
  const [collisions, setCollisions] = useState<Record<string, string[]>>({}); // State to store collisions


  const updateTargetId = useCallback((id: string | null) => {
    setTargetId(id);
  }, []);

    // Method to update collision IDs
  const updateCollisionIds = useCallback((id: string, collisionIds: string[]) => {
    setCollisions((prevCollisions) => ({
      ...prevCollisions,
      [id]: collisionIds,
    }));
    // console.log(`Collisions updated for ${id}: `, collisionIds);
  }, []);

  return (
    <TargetContext.Provider value={{ targetId, setTargetId: updateTargetId, collisions, setCollisionIds: updateCollisionIds }}>
      {children}
    </TargetContext.Provider>
  );
};

// Provider for managing animating positions
export const AnimatingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animatingPositions, setAnimatingPositions] = useState<
    Record<string, { left: number; top: number; right: number; bottom: number, className: string }>
  >({});

  const setAnimatingPosition = useCallback((id: string, newPosition: { left: number; top: number; right: number; bottom: number , className: string}) => {
    setAnimatingPositions((prev) => ({
      ...prev,
      [id]: newPosition,
    }));
  }, []);

  return (
    <AnimatingContext.Provider value={{ animatingPositions, setAnimatingPosition }}>
      {children}
    </AnimatingContext.Provider>
  );
};

// Custom hook to use Target context
export const useTarget = () => {
  const context = useContext(TargetContext);
  if (!context) {
    throw new Error("useTarget must be used within a TargetProvider");
  }
  return context;
};

// Custom hook to use Animating context
export const useAnimating = () => {
  const context = useContext(AnimatingContext);
  if (!context) {
    throw new Error("useAnimating must be used within an AnimatingProvider");
  }
  return context;
};
