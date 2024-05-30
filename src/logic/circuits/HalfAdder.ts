import { GateXOR, GateAND } from "~/logic/LogicGates"
import Emitter from "~/interfaces/Emitter.interface"
import Component from "~/interfaces/Component.interface"

export default class HalfAdder implements Component {
	inputs: { s0: Emitter; s1: Emitter }

	components: {
		xor0: GateXOR
		and0: GateAND
	}

	out: Emitter
	carry: Emitter

	constructor(s0: Emitter, s1: Emitter) {
		const xor0 = new GateXOR(s0, s1)
		const and0 = new GateAND(s0, s1)

		this.inputs = { s0, s1 }
		this.components = { xor0, and0 }
		this.out = xor0
		this.carry = and0
	}
}
