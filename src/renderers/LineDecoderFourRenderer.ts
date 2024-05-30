import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"
import { LineDecoderFour } from "~/logic/circuits/LineDecoderFour"
import { NOTGateRenderer } from "./GateRenderers"
import { FourInputANDRenderer } from "./FourInputANDRenderer"
import NetRenderer from "./NetRenderer"

export class LineDecoderFourRenderer implements Renderer {
	x: number
	y: number
	width: number = 440
	height: number = 1400
	component: LineDecoderFour

	renderers: Record<string, Renderer> = {}

	constructor(ld: LineDecoderFour, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = ld

		const rail_offset = 0

		for (let i = 0; i < 4; i++) {
			this.renderers[`neti${i}`] = new NetRenderer(ld.inputs[`i${i}`], [
				[
					[this.x + rail_offset + 50 + 60 * i, this.y],
					[0, this.height - 10],
				],
				[
					[this.x + rail_offset + 50 + 60 * i, this.y + 20],
					[-30, 0],
					[0, 20],
				],
			])
			this.renderers[`netno${i}`] = new NetRenderer(ld.components[`not${i}`], [
				[
					[this.x + rail_offset + 20 + 60 * i, this.y + 80],
					[0, this.height - 90],
				],
			])
			this.renderers[`not${i}`] = new NOTGateRenderer(
				ld.components[`not${i}`],
				this.x + rail_offset + 60 * i,
				this.y + 40,
				RenderDirection.DOWN
			)
		}

		// and 8 input and renderers with lines!!
		for (let i = 0; i < 16; i++) {
			this.renderers[`fia${i}`] = new FourInputANDRenderer(ld.out[`o${i}`], this.x + 240, this.y + 100 + 80 * i)
			for (let j = 0; j < 4; j++) {
				// if this line is connected to the regular or the inverted input
				if (i & (0x8 >> j)) {
					this.renderers[`fia${i}net${j}`] = new NetRenderer(
						ld.inputs[`i${j}`],
						[
							[
								[this.x + 210, this.y + 110 + 80 * i + 20 * j],
								[20, 0],
							],
						],
						i < 15
					)
				} else {
					this.renderers[`fia${i}net${j}`] = new NetRenderer(
						ld.components[`not${j}`],
						[
							[
								[this.x + 210, this.y + 110 + 80 * i + 20 * j],
								[20, 0],
							],
						],
						true // this is incorrect, some voodoo is required
					)
				}
			}
		}
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		// we first do object-specific rendering
		// ctx.translate(vp.x, vp.y)
		// ctx.strokeRect(this.x, this.y, this.width, this.height)
		// ctx.translate(-vp.x, -vp.y)
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
