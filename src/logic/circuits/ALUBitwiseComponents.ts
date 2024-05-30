import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { GateAND, GateOR, GateXOR } from "../LogicGates"

type ALUBitwiseInputs = {
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

type ALUBitwiseOutput = {
	o0: Emitter
	o1: Emitter
	o2: Emitter
	o3: Emitter
	o4: Emitter
	o5: Emitter
	o6: Emitter
	o7: Emitter
}

export class ALUBitwiseAND implements Component {
	components: ALUBitwiseOutput

	constructor(inputs: ALUBitwiseInputs) {
		for (let i = 0; i < 8; i++) {
			this.components = { ...this.components, [`o${i}`]: new GateAND(inputs[`a${i}`], inputs[`b${i}`]) }
		}
	}
}

export class ALUBitwiseOR implements Component {
	components: ALUBitwiseOutput

	constructor(inputs: ALUBitwiseInputs) {
		for (let i = 0; i < 8; i++) {
			this.components = { ...this.components, [`o${i}`]: new GateOR(inputs[`a${i}`], inputs[`b${i}`]) }
		}
	}
}

export class ALUBitwiseXOR implements Component {
	components: ALUBitwiseOutput

	constructor(inputs: ALUBitwiseInputs) {
		for (let i = 0; i < 8; i++) {
			this.components = { ...this.components, [`o${i}`]: new GateXOR(inputs[`a${i}`], inputs[`b${i}`]) }
		}
	}
}
