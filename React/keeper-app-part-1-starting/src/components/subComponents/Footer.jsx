import React from "react"

const d = new Date();
const year = d.getFullYear();

function Footer() {
    return <footer >
        <h1>Copyright {year}</h1>
    </footer>
}

export default Footer