import Renderer, { ViewportRect } from "~/interfaces/Renderer.interface"
import { ALU } from "~/logic/circuits/ALU"
import { LineDecoderFourRenderer } from "./LineDecoderFourRenderer"
import { ALUBitwiseANDRenderer, ALUBitwiseORRenderer, ALUBitwiseXORRenderer } from "./ALUBitwiseComponentRenderer"
import { TriStateOutputEnablerRenderer } from "./TriStateOutputEnablerRenderer"
import NetRenderer from "./NetRenderer"
import { EightBitAdderRenderer } from "./EightBitAdderRenderer"

export class ALURenderer implements Renderer {
	x: number
	y: number
	width: number = 5000
	height: number = 5000
	component: ALU

	renderers: Record<string, Renderer> = {}

	constructor(alu: ALU, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = alu

		this.renderers = {
			ld4: new LineDecoderFourRenderer(alu.components.select, 0, 0),
			adder: new EightBitAdderRenderer(alu.components.adder, 100, 2000),
			bwand: new ALUBitwiseANDRenderer(alu.components.bw_and, 2800, 2000),
			bwor: new ALUBitwiseORRenderer(alu.components.bw_or, 3300, 2000),
			bwxor: new ALUBitwiseXORRenderer(alu.components.bw_xor, 3800, 2000),
			bw_and_gate: new TriStateOutputEnablerRenderer(alu.components.bw_and_ts_gate, 2790, 2100),
			bw_or_gate: new TriStateOutputEnablerRenderer(alu.components.bw_or_ts_gate, 3290, 2100),
			bw_xor_gate: new TriStateOutputEnablerRenderer(alu.components.bw_xor_ts_gate, 3790, 2100),
		}

		// adder connections
		for (let i = 0; i < 8; i++) {
			this.renderers[`netadda${i}`] = new NetRenderer(
				alu.data[`a${7 - i}`],
				[
					[
						[this.x + 290 + i * 200, 1510 + i * 20],
						[0, 490 - i * 20],
					],
				],
				true
			)
			this.renderers[`netaddb${i}`] = new NetRenderer(
				alu.data[`b${7 - i}`],
				[
					[
						[this.x + 270 + i * 200, 1710 + i * 20],
						[0, 290 - i * 20],
					],
				],
				true
			)
		}

		for (let i = 0; i < 8; i++) {
			this.renderers[`netina${7 - i}`] = new NetRenderer(alu.data[`a${7 - i}`], [
				[
					[this.x, this.y + 1510 + i * 20],
					[5000, 0],
				],
			])
			this.renderers[`netinb${7 - i}`] = new NetRenderer(alu.data[`b${7 - i}`], [
				[
					[this.x, this.y + 1710 + i * 20],
					[5000, 0],
				],
			])
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
		return vp.intersects(this.x, this.y, this.width, this.height)
	}
}
