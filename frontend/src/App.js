import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Faqs } from "./components/Faqs";
import { TemplateDetails } from "./components/TemplateDetails"
import { About } from "./components/About";
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Faqs />
      <TemplateDetails />
      <About />
    </>
  )
}

export default App;
