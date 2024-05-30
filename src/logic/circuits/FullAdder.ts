import { GateXOR, GateAND, GateOR } from "~/logic/LogicGates"
import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

export default class FullAdder implements Component {
	inputs: { s0: Emitter; s1: Emitter; c0: Emitter }

	components: {
		xor0: GateXOR
		xor1: GateXOR
		and0: GateAND
		and1: GateAND
		or0: GateOR
	}

	out: Emitter
	carry: Emitter

	constructor(s0: Emitter, s1: Emitter, c0: Emitter) {
		this.inputs = { s0, s1, c0 }

		const xor0 = new GateXOR(s0, s1)
		const xor1 = new GateXOR(c0, xor0)
		const and1 = new GateAND(c0, xor0)
		const and0 = new GateAND(s0, s1)
		const or0 = new GateOR(and0, and1)

		this.components = { xor0, xor1, and0, and1, or0 }
		this.out = xor1
		this.carry = or0
	}
}
