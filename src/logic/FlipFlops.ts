import Listener from "~/interfaces/Listener.interface"
import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"
import Source from "./Source"

export class DFlipFlop implements Emitter, Listener, Component {
	// the flip flop actually does store its own value, most other components do not
	private _value: boolean = false
	listeners: Listener[] = []
	components: never
	d: Emitter
	clk: Emitter

	// internal signals that exist so we can accurately render the circuit
	// even though it isn't simulated in the standard way
	internal: {
		not0: Source
		and0: Source
		and1: Source
		nor0: Source
		nor1: Source
	}

	constructor(d: Emitter, clk: Emitter) {
		d.addListener(this)
		clk.addListener(this)

		this.d = d
		this.clk = clk

		this.internal = {
			not0: new Source(!this.d.value),
			and0: new Source(false),
			and1: new Source(false),
			nor0: new Source(false),
			nor1: new Source(true),
		}
	}

	get value(): boolean {
		return this._value
	}

	addListener(l: Listener): void {
		this.listeners.push(l)
	}

	update(): void {
		// update internal state for renderer
		this.internal.not0.setState(!this.d.value)
		this.internal.and0.setState(this.clk.value && !this.d.value)
		this.internal.and1.setState(this.clk.value && this.d.value)
		if (this.clk.value) {
			if (this.value != this.d.value) {
				this._value = this.d.value
				this.internal.nor0.setState(this.value)
				this.internal.nor1.setState(!this.value)
				for (const l of this.listeners) {
					l.update()
				}
			}
		}
	}
}
