import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { Register } from "./Register"
import { LineDecoder } from "./LineDecoder"

type MemoryAddressDecoderInputs = {
	enable: Emitter
	clk: Emitter
	i0: Emitter
	i1: Emitter
	i2: Emitter
	i3: Emitter
	i4: Emitter
	i5: Emitter
	i6: Emitter
	i7: Emitter
}

type MemoryAddressDecoderInternalComponents = {
	r: Register
	ld: LineDecoder
}

export class MemoryAddressDecoder implements Component {
	components: MemoryAddressDecoderInternalComponents
	inputs: MemoryAddressDecoderInputs

	out: Emitter[]

	constructor(inputs: MemoryAddressDecoderInputs) {
		this.inputs = inputs

		const r = new Register(inputs)
		const ld = new LineDecoder({
			i0: r.components.d0,
			i1: r.components.d1,
			i2: r.components.d2,
			i3: r.components.d3,
			i4: r.components.d4,
			i5: r.components.d5,
			i6: r.components.d6,
			i7: r.components.d7,
		})

		this.components = { r, ld }
	}
}
