import Footer from '@/components/Footer';
import NavBars from '@/components/NavBars';
import '../styles/globals.css';
import {Montserrat} from "next/font/google";
import Head from 'next/head';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
})

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name='viewport' content='width=device, initial-scale=1' />
    
    </Head>
    <main className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
       
        <Component {...pageProps}/>
        <Footer/>
    </main>
    </>
  )
}
