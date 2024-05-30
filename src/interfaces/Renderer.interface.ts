import Component from "./Component.interface"
import { Rect, Vec } from "~/utils/Utils"

// hack to make the autocomplete not use Rect
export interface ViewportRect extends Rect {}

export enum RenderDirection {
	UP,
	RIGHT,
	DOWN,
	LEFT,
}

export default interface Renderer {
	// I don't like not having the freedom to name the component within the renderer
	// maybe it could be removed entirely? maybe it could be renamed somehow?
	component: Component
	x: number
	y: number
	width: number
	height: number
	renderers?: Record<string, Renderer>

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void
	inViewport(vp: ViewportRect): boolean
}

export default interface BetterRenderer {}
