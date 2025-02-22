import { useState, useEffect } from 'react';

const TypewriterEffect = ({ response }: any) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 50; // Adjust the speed (milliseconds per character)

  useEffect(() => {
    if (!response) return; // Skip if no response

    setDisplayedText('');
    let index = 0;

    const interval = setInterval(() => {
      if (index < response.length - 1) {
        setDisplayedText((prev) => prev + response[index]);
        index++;
      } else {
        clearInterval(interval); // Stop when the full text is displayed
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [response]);

  return (
    <div className="chat-response">
      <p>{displayedText}</p>
    </div>
  );
};

export default TypewriterEffect;
