"use client"

import Hero from "@/app/modules/Hero"
import Navbar from "@/app/modules/Navbar"
import { useEffect } from "react"

const Home = () => {

  useEffect(() => {
    alert("After first try to interact with server - wait up to 2 minutes to let free-hosted backend service to load up :)")
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
    </>
  )
}

export default Home
