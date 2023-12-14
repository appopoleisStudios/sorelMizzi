import Footer from '@/components/Footer';
import NavBars from '@/components/NavBars';
import '../styles/globals.css';
import Head from 'next/head';
import TransitionEffect from '@/components/transition';



export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name='viewport' content='width=device, initial-scale=1' />
    
    </Head>
    <main className={` bg-dark w-full min-h-screen`}>
        <TransitionEffect/>
        <Component {...pageProps}/>
        <Footer/>
    </main>
    </>
  )
}
