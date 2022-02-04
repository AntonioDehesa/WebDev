import React from "react"
import Header from "./subComponents/Header.jsx"
import Footer from "./subComponents/Footer.jsx"
import Note from "./subComponents/Note.jsx"
function App() {
    return <div>
        <div>
            <Header/>
        </div>
        <h1>Hello App</h1>
        <Note/>
        <div>
            <Footer/>
        </div>
    </div>
}

export default App