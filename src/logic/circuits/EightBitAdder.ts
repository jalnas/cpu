import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import FullAdder from "./FullAdder"

type EightBitAdderInputs = {
	carry_in: Emitter
	a0: Emitter
	a1: Emitter
	a2: Emitter
	a3: Emitter
	a4: Emitter
	a5: Emitter
	a6: Emitter
	a7: Emitter
	b0: Emitter
	b1: Emitter
	b2: Emitter
	b3: Emitter
	b4: Emitter
	b5: Emitter
	b6: Emitter
	b7: Emitter
}

type EightBitAdderComponents = {
	f0: FullAdder
	f1: FullAdder
	f2: FullAdder
	f3: FullAdder
	f4: FullAdder
	f5: FullAdder
	f6: FullAdder
	f7: FullAdder
}

export class EightBitAdder implements Component {
	components: EightBitAdderComponents
	inputs: EightBitAdderInputs

	constructor(inputs: EightBitAdderInputs) {
		this.inputs = inputs

		const f0 = new FullAdder(inputs.a0, inputs.b0, inputs.carry_in)
		const f1 = new FullAdder(inputs.a1, inputs.b1, f0.carry)
		const f2 = new FullAdder(inputs.a2, inputs.b2, f1.carry)
		const f3 = new FullAdder(inputs.a3, inputs.b3, f2.carry)
		const f4 = new FullAdder(inputs.a4, inputs.b4, f3.carry)
		const f5 = new FullAdder(inputs.a5, inputs.b5, f4.carry)
		const f6 = new FullAdder(inputs.a6, inputs.b6, f5.carry)
		const f7 = new FullAdder(inputs.a7, inputs.b7, f6.carry)

		this.components = { f0, f1, f2, f3, f4, f5, f6, f7 }
	}
}
