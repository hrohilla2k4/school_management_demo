import React, { useState, useEffect } from 'react';

function TypingEffect({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingInterval = 100; // Adjust the typing speed (milliseconds per character)

    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingInterval);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [charIndex, text]);

  return (
    <div className="display-3">
      {displayText && <p>Welcome {displayText}</p>}
    </div>
  );
}

export default TypingEffect;
