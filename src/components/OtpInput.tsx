// otp-input.tsx

import React, { useRef, useState, useEffect } from 'react';

const maxPinLength = 8; // Adjust this value as needed

type InputRef = Record<number, HTMLInputElement | null>;

const OtpInput = () => {
  const [password, setPassword] = useState<number[]>(Array(maxPinLength).fill(-1));
  const inpRefs = useRef<InputRef>({});
  const [activeInput, setActiveInput] = useState<number>(-1);

  useEffect(() => {
    if (activeInput >= 0 && activeInput < maxPinLength) {
      inpRefs.current[activeInput]?.focus();
    }
  }, [activeInput]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newPass = [...password];
      newPass[index] = -1;
      setPassword(newPass);
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        setActiveInput(prevIndex);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value[e.target.value.length - 1] ?? '');
    if (!isNaN(value)) {
      const newPass = [...password];
      newPass[index] = value;
      setPassword(newPass);
      const nextIndex = index + 1;
      if (nextIndex < maxPinLength) {
        setActiveInput(nextIndex);
      } else {
        // Optionally handle completion here (e.g., submit)
      }
    }
  };

  const handleSumit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    console.log(password.join(''));
  };

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <h2 className='text-2xl font-bold mb-4'>Verify your email</h2>
      <p className='mb-8'>Enter the 8 digit code you have received on swa***@gmail.com</p>
      <form onSubmit={handleSumit} className='flex flex-col items-center justify-center'>
        <div className='flex space-x-2 mb-8'>
          {password.map((digit, index) => (
            <div key={index} className='w-10 h-14 bg-white border-2 border-gray-300 rounded'>
              <input
                ref={(el) => inpRefs.current[index] = el}
                onFocus={() => setActiveInput(index)}
                onBlur={() => setActiveInput(-1)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => handleChange(e, index)}
                className='w-full h-full text-center text-xl outline-none bg-transparent'
                id={`pin_${index}`}
                type='text' // Changed to text to handle individual digit input
                value={digit !== -1 ? digit : ""}
                autoComplete="off"
                maxLength={1}
              />
            </div>
          ))}
        </div>
        <button type='submit' className='w-full bg-black text-white p-3 rounded text-lg uppercase tracking-wider hover:bg-gray-700'>
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpInput;
