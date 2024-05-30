import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"

import { MemoryCell } from "~/logic/circuits/MemoryCell"

import { ANDGateRenderer } from "~/renderers/GateRenderers"
import NetworkRenderer from "./NetworkRenderer"
import { DFlipFlopRenderer } from "./DFlipFlopRenderer"

export class MemoryCellRenderer implements Renderer {
	x: number
	y: number
	width: number = 1600
	height: number = 500
	component: MemoryCell

	renderers: Record<string, Renderer>

	constructor(m: MemoryCell, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = m

		let renderers: Record<string, Renderer> = {
			select: new ANDGateRenderer(m.components.select, this.x + 40, this.y + 90, RenderDirection.RIGHT),
			write: new ANDGateRenderer(m.components.write, this.x + 120, this.y + 60, RenderDirection.RIGHT),
			clk: new ANDGateRenderer(m.components.clk, this.x + 200, this.y + 20, RenderDirection.RIGHT),
			read: new ANDGateRenderer(m.components.read, this.x + 120, this.y + 120, RenderDirection.RIGHT),
		}

		for (let i = 0; i < 8; i++) {
			renderers[`i${i}`] = new ANDGateRenderer(
				m.components[`i${i}`],
				this.x + 240 + i * 160,
				this.y + 100,
				RenderDirection.DOWN
			)
			renderers[`d${i}`] = new DFlipFlopRenderer(
				m.components[`d${i}`],
				this.x + 230 + i * 160,
				this.y + 140,
				RenderDirection.DOWN
			)
			// renderers[`o${i}`] = new ANDGateRenderer(
			// 	m.components[`i${i}`],
			// 	this.x + 240 + i * 160,
			// 	this.y + 420,
			// 	RenderDirection.DOWN
			// )
		}

		// add input nets
		renderers.net0 = new NetworkRenderer(m.inputs.clk, this.x, this.y + 30, [[[200, 0]]])
		renderers.net4 = new NetworkRenderer(m.inputs.read, this.x, this.y + 150, [[[120, 0]]])
		renderers.net2 = new NetworkRenderer(m.inputs.col, this.x, this.y + 100, [[[40, 0]]])
		renderers.net3 = new NetworkRenderer(m.inputs.row, this.x, this.y + 120, [[[40, 0]]])
		renderers.net1 = new NetworkRenderer(m.inputs.write, this.x, this.y + 70, [[[120, 0]]])
		renderers.net5 = new NetworkRenderer(m.components.select, this.x + 80, this.y + 110, [
			[
				[20, 0],
				[0, 20],
				[20, 0],
			],
			[
				[20, 0],
				[0, -20],
				[20, 0],
			],
		])

		// add clock nets
		renderers.net6 = new NetworkRenderer(m.components.clk, this.x + 240, this.y + 40, [
			[
				[1260, 0],
				[0, 100],
			],
		])
		for (let i = 0; i < 7; i++) {
			renderers[`net${i + 7}`] = new NetworkRenderer(m.components.clk, this.x + 380 + i * 160, this.y + 40, [
				[[0, 100]],
			])
		}

		this.renderers = renderers
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		//ctx.translate(vp.x, vp.y)
		// we first do object-specific rendering
		//ctx.strokeRect(this.x, this.y, this.width, this.height)
		// then call the sub-renderers
		for (const r of Object.values(this.renderers)) {
			if (r.inViewport(vp)) {
				r.render(ctx, vp)
			}
		}

		ctx.restore()
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}
}
