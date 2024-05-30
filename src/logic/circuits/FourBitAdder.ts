import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import FullAdder from "~/logic/circuits/FullAdder"
import HalfAdder from "~/logic/circuits/HalfAdder"

export class FourBitAdder implements Component {
	components: {
		h0: HalfAdder
		f0: FullAdder
		f1: FullAdder
		f2: FullAdder
	}

	constructor(inputs: Emitter[]) {
		const h0 = new HalfAdder(inputs[0], inputs[1])
		const f0 = new FullAdder(inputs[2], inputs[3], h0.carry)
		const f1 = new FullAdder(inputs[4], inputs[5], f0.carry)
		const f2 = new FullAdder(inputs[6], inputs[7], f1.carry)

		this.components = { h0, f0, f1, f2 }
	}
}
