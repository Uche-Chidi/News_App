import React from 'react'
import Link from 'next/link'
import { GiHamburgerMenu } from "react-icons/gi";


export default function Navbar() {
  return (
    <section className='mx-4 md:px-24'>
        <div className='flex justify-between py-5 text-center'>
            <div>
                <Link href="/">
                    <h1 className='font-extrabold text-4xl'>G.</h1>
                </Link>
            </div>
            <div className='hidden md:block'>
                <ul className='flex flex-row gap-5 cursor-pointer justify-center'>
                    <Link href="/allNews">
                        <li>All News</li>
                    </Link>
                    <li>Popular</li>
                    <li>Trending</li>
                    <li>Categories</li>
                    <li>About</li>
                </ul>
            </div>
            <div className='md:hidden block'>
                <GiHamburgerMenu />
            </div>
        </div>
    </section>
  )
}
