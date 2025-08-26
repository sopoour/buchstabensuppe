import Hero from '@app/components/sections/Hero';
import { NextPage } from 'next';
import Live from '@app/components/sections/Live';
import About from '@app/components/sections/About';
import AudioSample from '@app/components/sections/AudioSample';
import Videos from '@app/components/sections/Videos';
import Contact from '@app/components/sections/Contact';

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Live />
      <AudioSample />
      <Videos />
      <Contact />
    </>
  );
};

export default Home;
