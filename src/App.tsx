import "./App.css";
import Slider from "./components/Slider";
const slides = [
  {
    id: 0,
    alt: "image 1",
    url: "https://images.unsplash.com/photo-1538378918848-29dbc0910082?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80",
  },
  {
    id: 1,
    alt: "image 2",
    url: "https://images.unsplash.com/photo-1629774631914-55a9fef0f182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFyY2hpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    alt: "image 3",
    url: "https://images.unsplash.com/photo-1624523874426-863b5bb5b204?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  },
];

function App() {
  return <Slider slides={slides} />;
}

export default App;
