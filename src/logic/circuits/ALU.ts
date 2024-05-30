import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { EightBitAdder } from "./EightBitAdder"
import { ALUBitwiseAND, ALUBitwiseOR, ALUBitwiseXOR } from "./ALUBitwiseComponents"
import { TriStateOutputEnabler } from "./TriStateOutputEnabler"
import { LineDecoderFour } from "./LineDecoderFour"
import { EightBitBus } from "./EightBitBus"

type ALUDataInputs = {
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

type ALUSignalInputs = {
	s0: Emitter
	s1: Emitter
	s2: Emitter
	s3: Emitter
	fc: Emitter // carry in
}

type ALUComponents = {
	alu_internal_bus: EightBitBus
	select: LineDecoderFour
	adder: EightBitAdder
	bw_and: ALUBitwiseAND
	bw_or: ALUBitwiseOR
	bw_xor: ALUBitwiseXOR
	bw_and_ts_gate: TriStateOutputEnabler
	bw_or_ts_gate: TriStateOutputEnabler
	bw_xor_ts_gate: TriStateOutputEnabler
}

export class ALU implements Component {
	components: ALUComponents
	data: ALUDataInputs
	signals: ALUSignalInputs

	constructor(data: ALUDataInputs, signals: ALUSignalInputs) {
		this.data = data
		this.signals = signals

		const select = new LineDecoderFour({
			i0: signals.s0,
			i1: signals.s1,
			i2: signals.s2,
			i3: signals.s3,
		})

		// Basic Adder
		const adder = new EightBitAdder({
			carry_in: signals.fc,
			a0: data.a0,
			a1: data.a1,
			a2: data.a2,
			a3: data.a3,
			a4: data.a4,
			a5: data.a5,
			a6: data.a6,
			a7: data.a7,
			b0: data.b0,
			b1: data.b1,
			b2: data.b2,
			b3: data.b3,
			b4: data.b4,
			b5: data.b5,
			b6: data.b6,
			b7: data.b7,
		})

		const bw_and = new ALUBitwiseAND(data)
		const bw_or = new ALUBitwiseOR(data)
		const bw_xor = new ALUBitwiseXOR(data)

		const bw_and_ts_gate = new TriStateOutputEnabler({
			enable: select.out.o0,
			i0: bw_and.components.o0,
			i1: bw_and.components.o1,
			i2: bw_and.components.o2,
			i3: bw_and.components.o3,
			i4: bw_and.components.o4,
			i5: bw_and.components.o5,
			i6: bw_and.components.o6,
			i7: bw_and.components.o7,
		})

		const bw_or_ts_gate = new TriStateOutputEnabler({
			enable: select.out.o1,
			i0: bw_or.components.o0,
			i1: bw_or.components.o1,
			i2: bw_or.components.o2,
			i3: bw_or.components.o3,
			i4: bw_or.components.o4,
			i5: bw_or.components.o5,
			i6: bw_or.components.o6,
			i7: bw_or.components.o7,
		})

		const bw_xor_ts_gate = new TriStateOutputEnabler({
			enable: select.out.o2,
			i0: bw_xor.components.o0,
			i1: bw_xor.components.o1,
			i2: bw_xor.components.o2,
			i3: bw_xor.components.o3,
			i4: bw_xor.components.o4,
			i5: bw_xor.components.o5,
			i6: bw_xor.components.o6,
			i7: bw_xor.components.o7,
		})

		const alu_internal_bus = new EightBitBus()

		alu_internal_bus.connectInputs(bw_xor_ts_gate.busInputs)
		alu_internal_bus.connectInputs(bw_or_ts_gate.busInputs)
		alu_internal_bus.connectInputs(bw_and_ts_gate.busInputs)

		this.components = {
			alu_internal_bus,
			select,
			adder,
			bw_and,
			bw_or,
			bw_xor,
			bw_and_ts_gate,
			bw_or_ts_gate,
			bw_xor_ts_gate,
		}
	}
}
