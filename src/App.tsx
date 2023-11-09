
import { useEffect, useState } from 'react'
import './App.css'
import { passwordGen } from './utils/passwordGen';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {


  const notify = () => toast("Password copied to clipboard");



  const [passLength, setPassLength] = useState(8); // Min length of password is 8

  const [withNumber, setWithNumber] = useState(false); // generate password with number:boolean

  const [withSpecial, setWithSpecial] = useState(false); // generate password with special characters:boolean

  const [password, setPassword] = useState(''); // to display password

  // Function to call PasswordGen() based on the withNumber,WithCharacter's
  const generatePassword = () => {
    let pass = '';
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphaNumber = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const alphaNumberSpecial = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

    const alphaSpecial = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()";

    if (withSpecial && withNumber) {
      //both number, character's & Alphabet
      pass = passwordGen(passLength, alphaNumberSpecial);

    }
    else if (withNumber) {
      //only number & Alphabet
      pass = passwordGen(passLength, alphaNumber);
    }
    else if (withSpecial) {
      //only character's & Alphabet
      pass = passwordGen(passLength, alphaSpecial);

    }
    else {
      // only Alphabet
      pass = passwordGen(passLength, alpha);
    }
    setPassword(pass);// store the password into state

  };

  useEffect(() => {
    generatePassword();
  }, [passLength, withNumber, withSpecial]);
  // Call the generatePassword(), whenever the Dependencies state is changed.

  return (
    <>
      <ToastContainer />

      <div className='justify-center text-center p-10'>
        <h1 className='text-white font-mono  font-semibold text-5xl'>
          🔑 Password Generator </h1>
      </div>



      <div className="flex min-h-screen min-w-min justify-center items-start font-mono">

        <div className="bg-slate-300 rounded-2xl m-5 p-5 grid-cols-1  gap-5 items-center">
          {/* password field */}
          <div >
            <div className='xl:space-x-10 space-y-4'>
              {/* display Password */}
              <input type="text" className='w-72 text-xl rounded-xl px-3 py-1 focus:outline-none focus:ring focus:ring-yellow-400 focus:bg-amber-50' placeholder='Password' defaultValue={password} readOnly />
              {/* copy button */}
              <button className='bg-yellow-300 p-1 rounded-xl w-20 text-lg  focus:outline-none focus:ring focus:ring-yellow-400' onClick={() => {
                window.navigator.clipboard.writeText(password); notify();
              }}>Copy</button>

            </div>
          </div>
          <div className='m-5 '>
            <div className='text-xl space-y-3'>
              {/* range slider */}

              <div >

                <input type="range" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassLength(Number(e.target.value))
                }} name="passLength" id="passLength" min={8} max={25} value={passLength} /> <label> Length : {passLength}</label>
              </div>
              {/* number check box */}
              <div >
                <input type="checkbox" name="numberCheck" id="numberCheck" checked={withNumber} onChange={() => setWithNumber(!withNumber)} />
                <label> Add number </label>
              </div>
              {/* special char checkbox */}
              <div >
                <input type="checkbox" name="numberCheck" id="numberCheck" checked={withSpecial} onChange={() => setWithSpecial(!withSpecial)} />
                <label> Add special char </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
