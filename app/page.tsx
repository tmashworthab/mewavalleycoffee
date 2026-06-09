import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Coffee from "./components/Coffee";
import Origin from "./components/Origin";
import Order from "./components/Order";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Coffee />
        <Origin />
        <Order />
      </main>
      <Footer />
    </>
  );
}
