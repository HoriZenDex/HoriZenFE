"use client"

import "./loadingStyle.css"
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Image from "next/image";




export default function Page() {

    return (

        <div className="container" >


        <div className="center">


           <div        className="center-image" >
          <div className="flex items-center" >
          <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Horizen2-pzkuPFBk7x9tcoJWPNPHEq5cIeQrHP.png"
                alt="Center Image"

            />
             <h3 className="font-bold text-lg bg-gradient-to-r from-[#03ceb3] to-[#9370db] text-transparent bg-clip-text">
                  HoriZen
                </h3>
          </div>
  <div className="w-full h-2 bg-gray-200 rounded-lg overflow-hidden">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="h-full bg-gradient-to-r from-[#03ceb3] to-[#9370db]"
      />
    </div>

        <p className="text-xs text-cosmic-cyan " >


        <Typewriter
          words={[
            "We are HoriZen",
            "A Web3-powered NFT Video DEX!",
             "Born at the Celestia Mammothon!"]}
          loop={true}
          typeSpeed={40}
          deleteSpeed={40}
          delaySpeed={500}
        />
        ...
        </p>
           </div>



            <div className="orbit">
                <Image
                    src="/celestiaLogo.jpg"
                    alt="GitHub"
                    className="orbit-icon"
                    style={{ "--i": 0 }}
                    width={30}
                    height={30}
                />
                <Image
                    src="/celestiaLogo.jpg"
                    alt="Notion"
                    className="orbit-icon"
                    style={{ "--i": 1 }}
                    width={30}
                    height={30}
                />
                <Image
                    src="/celestiaLogo.jpg"
                    alt="Reddit"
                    className="orbit-icon"
                    style={{ "--i": 2 }}
                    width={30}
                    height={30}
                />
                <Image
                    src="/celestiaLogo.jpg"
                    alt="Twitter"
                    className="orbit-icon"
                    style={{ "--i": 3 }}
                    width={30}
                    height={30}
                />
                <Image
                    src="/celestiaLogo.jpg"
                    alt="Medium"
                    className="orbit-icon"
                    style={{ "--i": 4 }}
                    width={30}
                    height={30}
                />
            </div>
        </div>

        </div>
    );
}
