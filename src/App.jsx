import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const[password, setPassword] = useState("");


  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    if(numberAllowed) str+= "0123456789";
    if(charAllowed) str+= "!@#$%&-_"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);
  //useCallback helps to optimize, memoize in the cache, dont compare its array with useEffect array.. we put setPassword in the dependency array because we want it to put 
  //it in the memory and optimize

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPassToClipboard = useCallback(()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,21);
    window.navigator.clipboard.writeText(password);   //sirf itta bhi likhte toh chal jaata par passwordRef ka use hum optimization ke liye kar rahe hai
  }, [password])
  



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outiline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPassToClipboard()}
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={5}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e)=> setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              />
              <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              />
              <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
