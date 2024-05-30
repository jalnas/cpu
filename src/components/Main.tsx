import React, { useState } from "react"
import CircuitViewer from "./CircuitViewer"

import Circuit from "~/interfaces/Circuit.interface"
import { RegisterCircuit } from "~/circuits/RegisterCircuit"
//import { ALUCircuit } from "~/circuits/ALUCircuit"
import { MemoryCellCircuit } from "~/circuits/MemoryCellCircuit"

import "./Main.scss"

export default function Main() {
	const [circuit, setCircuit] = useState<Circuit>(new RegisterCircuit())

	return (
		<>
			<CircuitViewer circuit={circuit} />
		</>
	)
}
