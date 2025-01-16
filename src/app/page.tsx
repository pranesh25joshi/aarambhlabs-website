'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HexBackground } from '@/components/hex-background'
import { ScrambleText } from '@/components/scramble-text'
import { Mountain } from 'lucide-react'
import Image from 'next/image'
import logo from "@/lib/transparent AarambhLabs logo.png"

export default function Home() {
  const [score, setScore] = useState(0)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HexBackground onScoreUpdate={setScore} />

      <header className="w-full p-4 flex justify-between items-center relative z-10">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="AarambhLabs" width={50} height={50} />
          <span className="font-bold text-xl text-black ">arambhLabs</span>
        </Link>
        <Link
          href="https://www.notion.so/your-knowledge-base-link"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-transform transform hover:scale-105 border border-black hover:shadow-lg hover:shadow-blue-500/50"
        >
          Knowledge Base
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center relative z-10">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
            Bringing Ideas and AI Agents <br /> On-Chain
          </h1>

          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto">
            Unleash the power of decentralized AI agents and transform your ideas into reality.
          </p>

          <button className="group relative inline-flex items-center justify-center bg-white border border-black px-6 py-3 text-sm font-medium tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
            <Link href="https://x.com/AarambhLabs" target="_blank" rel="noopener noreferrer">

              <ScrambleText text="→ KNOW MORE ABOUT US" />
            </Link>
          </button>

          {/* <div className="mt-8 text-xl text-black">
            Score: {score}
          </div> */}

          {/* <p className="text-sm text-gray-300 max-w-md mx-auto">
            Click on the appearing lines to score points! The faster you click, the more points you'll earn.
          </p> */}

        </div>
      </main>
    </div>
  )
}

