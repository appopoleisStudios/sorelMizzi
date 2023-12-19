import React from 'react'
import Layout from './Layout'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='w-full border-t-2  bg-dark text-gold border-solid border-dark font-medium text-lg sm:text-base'>
        <Layout className='py-8 px-8 bg-dark text-yello-500 flex items-center justify-between lg:flex-col lg:py-6'>
            <span>{new Date().getFullYear()} © All Rights Reserved</span>
            <div className='flex items-center'>
            Built With <span className='text-primary text-2xl px-1 first-letter:'>&#9825;</span> by &nbsp;<Link href={'https://appopoleis.net/'} target='blank' className='underline underline-offset-2'>Appopoleis Studio&apos;s</Link>
            </div>
        </Layout>
    </footer>
  )
}

export default Footer
