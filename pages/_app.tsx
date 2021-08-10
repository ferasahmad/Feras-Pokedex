import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../comps/Navbar';
import Image from "next/image";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="content">
      {/* <Image 
        className="background-image"
        src="/background.png" 
        layout="fill" 
        objectFit="cover" 
        objectPosition="center"
        alt=""
      /> */}
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}
export default MyApp
