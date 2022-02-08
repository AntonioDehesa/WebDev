import React from "react"
import Header from "./subComponents/Header.jsx"
import Footer from "./subComponents/Footer.jsx"
import Note from "./subComponents/Note.jsx"

import notes from "../notes.js"

function App() {
    return (<div>
        <div>
            <Header/>
        </div>
        <h1>Hello App</h1>
        {notes.map(note => <Note key = {note.key} Title={note.title} Content={note.content}/>)}
        <div>
            <Footer/>
        </div>
    </div>);
}

export default App