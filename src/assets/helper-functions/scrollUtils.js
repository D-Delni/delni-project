
export const blockScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.overflowX = "hidden"; // Prevent horizontal scroll
    document.documentElement.style.overflow = "hidden"; // Prevent vertical scroll
    document.documentElement.style.overflowX = "hidden"; // Prevent horizontal scroll
};
  
export const restoreScroll = () => {
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "auto"; // Restore horizontal scroll
    document.documentElement.style.overflow = "auto"; // Restore vertical scroll
    document.documentElement.style.overflowX = "auto"; // Restore horizontal scroll
};
  

export const blockScrollX = () => {
    document.body.style.overflowX = "hidden"; // Prevent horizontal scroll
    document.documentElement.style.overflowX = "hidden"; // Prevent horizontal scroll
};
  