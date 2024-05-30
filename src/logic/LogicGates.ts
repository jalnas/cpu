import Listener from "~/interfaces/Listener.interface"
import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

// not gate is the only single-input gate
// we still need a common interface for the gates
export class GateNOT implements Emitter, Listener, Component {
	private _value: boolean
	listeners: Listener[] = []
	components: never
	input: Emitter

	constructor(input: Emitter) {
		input.addListener(this)
		this.input = input

		this._value = this.output()
	}

	get value(): boolean {
		return this._value
	}

	addListener(l: Listener): void {
		this.listeners.push(l)
	}

	output(): boolean {
		return !this.input.value
	}

	update(): void {
		this._value = this.output()
		for (const l of this.listeners) {
			l.update()
		}
	}
}

abstract class Gate implements Emitter, Listener, Component {
	private _value: boolean
	listeners: Listener[] = []
	components: never
	a: Emitter
	b: Emitter

	constructor(a: Emitter, b: Emitter) {
		a.addListener(this)
		b.addListener(this)

		this.a = a
		this.b = b

		this._value = this.output()
	}

	get value(): boolean {
		return this._value
	}

	addListener(l: Listener): void {
		this.listeners.push(l)
	}

	update(): void {
		const output = this.output()
		if (this._value != output) {
			this._value = output
			for (const l of this.listeners) {
				l.update()
			}
		}
	}
	abstract output(): boolean
}

export class GateAND extends Gate {
	output(): boolean {
		return this.a.value && this.b.value
	}
}

export class GateNAND extends Gate {
	output(): boolean {
		return !(this.a.value && this.b.value)
	}
}

export class GateOR extends Gate {
	output(): boolean {
		return this.a.value || this.b.value
	}
}

export class GateNOR extends Gate {
	output(): boolean {
		return !(this.a.value || this.b.value)
	}
}

export class GateXOR extends Gate {
	output(): boolean {
		return this.a.value != this.b.value
	}
}
export class GateXNOR extends Gate {
	output(): boolean {
		return !(this.a.value != this.b.value)
	}
}
