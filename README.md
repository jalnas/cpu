# Circuit Simulator

![Four bit memory](https://github.com/jalnas/cpu/assets/13324898/9423f5f7-9045-4ac8-a182-739113f2bdc5)

I have always wanted to build a gate-by-gate circuit simulator where I build a working 8-bit processor that I can run programs on. Ideally in my own higher level language that compiles down to an assembler language.

Obviously being able to zoom into the circuit to the gate level is a majority of the fun, so this project is attempting to build a reasonably manageable viewer for such a simulation.

Current stage has support for the seven basic logic gates ([/src/logic/LogicGates.ts](https://github.com/jalnas/cpu/blob/master/src/logic/LogicGates.ts))
which can all be assembled into assemblies like [adders](https://github.com/jalnas/cpu/blob/master/src/logic/circuits/HalfAdder.ts), demuxers, etc.

It also supports tri state logic for shared bus lines.

The circuit propagates updates by notifying downstream components for re-evaluation when an output is changed.

Only components visible in the viewport are rendered.
