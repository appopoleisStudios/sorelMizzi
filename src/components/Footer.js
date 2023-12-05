import React from 'react'
import Layout from './Layout'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='w-full border-t-2  dark:bg-dark dark:text-light border-solid border-dark font-medium text-lg sm:text-base'>
        <Layout className='py-8 px-8 flex items-center justify-between lg:flex-col lg:py-6'>
            <span>{new Date().getFullYear()} &copy, All Rights Reserved</span>
            <div className='flex items-center'>
            Build With <span className='text-primary text-2xl px-1 first-letter:'>&#9825;</span> by &nbsp;<Link href={'/'} className='underline underline-offset-2'>Appopoleis Studio</Link>
            </div>
            <Link href={"/"} target='_blank' className='underline underline-offset-2 px-8'>Say Hello</Link>
        </Layout>
    </footer>
  )
}

export default Footer
