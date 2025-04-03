export const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2, // Slightly delay the children animation
        staggerChildren: 0.15, // Smooth stagger between children
      },
    },
  };
  
  export const item = {
    hidden: { 
      opacity: 0,  // Add a subtle slide-in from below effect
      scale: 0.9 // Start slightly smaller
    },
    visible: { 
      opacity: 1, 
      y: 0, // Reset position
      scale: 1, // Back to original size
      transition: {
        type: "spring", // Use spring animation for more natural feel
        stiffness: 100, // Adjust spring stiffness
        damping: 10, // Smooth out the bounce effect
      },
    },
  };
  
