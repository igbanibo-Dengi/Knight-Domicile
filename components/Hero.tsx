import React from 'react'
import Search from './Search'

const Hero = () => {
    return (
        <section className=' w-full h-[90vh] md:h-[70vh] relative'>
            <div className="text-white gap-8 max-w-[96%] relative mx-auto h-full z-10 bg-[url('/images/hero.jpg')] bg-center bg-cover bg-no-repeat w-full flex flex-col items-center justify-center rounded-md">
                <h2 className='font-bold text-4xl md:text-5xl text-center z-10'>Building Dreams <br /> One Key at a Time</h2>
                <Search />
            </div>
            {/* <div className="absolute h-full w-full top-0 rounded-md bg-black/40" /> */}
        </section>
    )
}

export default Hero