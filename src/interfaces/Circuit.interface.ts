import Component from "./Component.interface"
import Renderer from "./Renderer.interface"
import Emitter from "./Emitter.interface"
import InputController from "~/InputController"

export default interface Circuit {
	components: Record<string, Component>
	inputs: Record<string, Emitter>
	renderer: Renderer

	// swap this keymap thing for a better input controller class
	keymap: Record<string, keyof Circuit["inputs"]>
	//controller: InputController

	// iterate the state object and set the internal signal states accordingly
	updateInternalState(signals: ExternalSignals): void
}

export type ExternalSignals = Record<string, boolean>
