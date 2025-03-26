import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add global styles for fonts
const style = document.createElement('style');
style.textContent = `
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
