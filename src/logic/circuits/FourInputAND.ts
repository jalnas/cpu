import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { GateAND } from "../LogicGates"
import Listener from "~/interfaces/Listener.interface"

type FourInputANDInputs = {
	i0: Emitter
	i1: Emitter
	i2: Emitter
	i3: Emitter
}

type FourInputANDComponents = {
	and0: GateAND
	and1: GateAND
	and2: GateAND
}

// A 4 input and gate is constructed of 3 separate chained and gates
export class FourInputAND implements Component, Emitter {
	components: FourInputANDComponents
	inputs: FourInputANDInputs
	listeners: Listener[] = []

	constructor(inputs: FourInputANDInputs) {
		this.inputs = inputs
		const and0 = new GateAND(inputs.i0, inputs.i1)
		const and1 = new GateAND(inputs.i2, and0)
		const and2 = new GateAND(inputs.i3, and1)

		this.components = { and0, and1, and2 }
	}

	get value(): boolean {
		return this.components.and2.value
	}

	addListener(l: Listener): void {
		this.components.and2.listeners.push(l)
	}
}
