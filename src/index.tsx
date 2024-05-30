import React from "react"
import { createRoot } from "react-dom/client"

import Main from "./components/Main"

const app_element = document.getElementById("app")
if (app_element) {
	const root = createRoot(app_element)
	root.render(<Main />)
}
