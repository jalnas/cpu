import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { GateAND } from "../LogicGates"
import Listener from "~/interfaces/Listener.interface"

type EightInputANDInputs = {
	i0: Emitter
	i1: Emitter
	i2: Emitter
	i3: Emitter
	i4: Emitter
	i5: Emitter
	i6: Emitter
	i7: Emitter
}

type EightInputANDComponents = {
	and0: GateAND
	and1: GateAND
	and2: GateAND
	and3: GateAND
	and4: GateAND
	and5: GateAND
	and6: GateAND
}

// An 8 input and gate is constructed of 7 separate chained and gates
export class EightInputAND implements Component, Emitter {
	components: EightInputANDComponents
	inputs: EightInputANDInputs
	listeners: Listener[]

	constructor(inputs: EightInputANDInputs) {
		this.inputs = inputs
		const and0 = new GateAND(inputs.i0, inputs.i1)
		const and1 = new GateAND(inputs.i2, and0)
		const and2 = new GateAND(inputs.i3, and1)
		const and3 = new GateAND(inputs.i4, and2)
		const and4 = new GateAND(inputs.i5, and3)
		const and5 = new GateAND(inputs.i6, and4)
		const and6 = new GateAND(inputs.i7, and5)

		this.components = { and0, and1, and2, and3, and4, and5, and6 }
	}

	get value(): boolean {
		return this.components.and6.value
	}

	addListener(l: Listener): void {
		this.components.and6.listeners.push(l)
	}
}
