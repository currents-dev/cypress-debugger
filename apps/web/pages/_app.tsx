import { AppProps } from "next/app";
import '../styles/global.scss';
import "rrweb-player/dist/style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
