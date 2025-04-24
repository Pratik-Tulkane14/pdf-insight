import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import logo from "/gemini.svg"
const Navbar: React.FC = () => {
  return (
    <header className='flex justify-between items-center px-4 py-3'>
      <img src={logo} alt="logo" className='h-10 w-10' />
      <div className="flex gap-3 items-center">

        <SignedOut>
          <div className="curser-pointer rounded-lg px-4 py-1 border-1 text-black bg-white">
            <SignInButton />
          </div>
          <div className="curser-pointer rounded-lg px-4 py-1 border-1 text-black bg-white">
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              baseTheme: dark,
            }}
          />
        </SignedIn>
      </div>

    </header>
  )
}

export default Navbar