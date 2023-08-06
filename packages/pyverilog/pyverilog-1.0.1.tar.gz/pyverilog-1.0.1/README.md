Pyverilog
==============================

Python-based Hardware Design Processing Toolkit for Verilog HDL

Copyright (C) 2013, Shinya Takamaeda-Yamazaki

E-mail: shinya\_at\_is.naist.jp


License
==============================

Apache License 2.0
(http://www.apache.org/licenses/LICENSE-2.0)

This software package includes PLY-3.4 in "vparser/ply". The license of PLY is BSD.


Publication
==============================

If you use Pyverilog in your research, please cite my paper.

- Shinya Takamaeda-Yamazaki: Pyverilog: A Python-based Hardware Design Processing Toolkit for Verilog HDL, 11th International Symposium on Applied Reconfigurable Computing (ARC 2015) (Poster), Lecture Notes in Computer Science, Vol.9040/2015, pp.451-460, April 2015.
[Paper](http://link.springer.com/chapter/10.1007/978-3-319-16214-0_42)

```
@inproceedings{Takamaeda:2015:ARC:Pyverilog,
title={Pyverilog: A Python-Based Hardware Design Processing Toolkit for Verilog HDL},
author={Takamaeda-Yamazaki, Shinya},
booktitle={Applied Reconfigurable Computing},
month={Apr},
year={2015},
pages={451-460},
volume={9040},
series={Lecture Notes in Computer Science},
publisher={Springer International Publishing},
doi={10.1007/978-3-319-16214-0_42},
url={http://dx.doi.org/10.1007/978-3-319-16214-0_42},
}
```


What's Pyverilog?
==============================

Pyverilog is an open-source hardware design processing toolkit for Verilog HDL. All source codes are written in Python.

Pyverilog includes **(1) code parser, (2) dataflow analyzer, (3) control-flow analyzer and (4) code generator**.
You can create your own design analyzer, code translator and code generator of Verilog HDL based on this toolkit.


Installation
==============================

Requirements
--------------------

- Python: 2.7, 3.4 or later

Python3 is recommended.

- Icarus Verilog: 0.9.7 or later

Install on your platform. For exmple, on Ubuntu:

    sudo apt-get install iverilog

- Jinja2: 2.8 or later
- pytest: 2.8.2 or later
- pytest-pythonpath: 0.7 or later

Install on your python environment by using pip.

    pip install jinja2 pytest pytest-pythonpath

Options
--------------------

- Graphviz: 2.38.0 or later
- Pygraphviz: 1.3.1 or later

These softwares are option for graph visualization in dataflow/graphgen.py and controlflow/controlflow_analyzer.py.

    sudo apt-get install graphviz
    pip install pygraphviz

Install
--------------------

Install Pyverilog.

    python setup.py install


Tools
==============================

This software includes various tools for Verilog HDL design.

* vparser: Code parser to generate AST (Abstract Syntax Tree) from source codes of Verilog HDL.
* dataflow: Dataflow analyzer with an optimizer to remove redundant expressions and some dataflow handling tools.
* controlflow: Control-flow analyzer with condition analyzer that identify when a signal is activated.
* ast\_code\_generator: Verilog HDL code generator from AST.


Getting Started
==============================

First, please prepare a Verilog HDL source file as below. The file name is 'test.v'.
This sample design adds the input value internally whtn the enable signal is asserted. Then is outputs its partial value to the LED.

```verilog
module top
  (
   input CLK, 
   input RST,
   input enable,
   input [31:0] value,
   output [7:0] led
  );
  reg [31:0] count;
  reg [7:0] state;
  assign led = count[23:16];
  always @(posedge CLK) begin
    if(RST) begin
      count <= 0;
      state <= 0;
    end else begin
      if(state == 0) begin
        if(enable) state <= 1;
      end else if(state == 1) begin
        state <= 2;
      end else if(state == 2) begin
        count <= count + value;
        state <= 0;
      end
    end
  end
endmodule
```

Code parser
------------------------------

Let's try syntax analysis. Please type the command as below.

```
python pyverilog/examples/example_parser.py test.v
```

Then you got the result as below. The result of syntax analysis is displayed.

```
Source: 
  Description: 
    ModuleDef: top
      Paramlist: 
      Portlist: 
        Ioport: 
          Input: CLK, False
            Width: 
              IntConst: 0
              IntConst: 0
        Ioport: 
          Input: RST, False
            Width: 
              IntConst: 0
              IntConst: 0
        Ioport: 
          Input: enable, False
            Width: 
              IntConst: 0
              IntConst: 0
        Ioport: 
          Input: value, False
            Width: 
              IntConst: 31
              IntConst: 0
        Ioport: 
          Output: led, False
            Width: 
              IntConst: 7
              IntConst: 0
      Decl: 
        Reg: count, False
          Width: 
            IntConst: 31
            IntConst: 0
      Decl: 
        Reg: state, False
          Width: 
            IntConst: 7
            IntConst: 0
      Assign: 
        Lvalue: 
          Identifier: led
        Rvalue: 
          Partselect: 
            Identifier: count
            IntConst: 23
            IntConst: 16
      Always: 
        SensList: 
          Sens: posedge
            Identifier: CLK
        Block: None
          IfStatement: 
            Identifier: RST
            Block: None
              NonblockingSubstitution: 
                Lvalue: 
                  Identifier: count
                Rvalue: 
                  IntConst: 0
              NonblockingSubstitution: 
                Lvalue: 
                  Identifier: state
                Rvalue: 
                  IntConst: 0
            Block: None
              IfStatement: 
                Eq: 
                  Identifier: state
                  IntConst: 0
                Block: None
                  IfStatement: 
                    Identifier: enable
                    NonblockingSubstitution: 
                      Lvalue: 
                        Identifier: state
                      Rvalue: 
                        IntConst: 1
                IfStatement: 
                  Eq: 
                    Identifier: state
                    IntConst: 1
                  Block: None
                    NonblockingSubstitution: 
                      Lvalue: 
                        Identifier: state
                      Rvalue: 
                        IntConst: 2
                  IfStatement: 
                    Eq: 
                      Identifier: state
                      IntConst: 2
                    Block: None
                      NonblockingSubstitution: 
                        Lvalue: 
                          Identifier: count
                        Rvalue: 
                          Plus: 
                            Identifier: count
                            Identifier: value
                      NonblockingSubstitution: 
                        Lvalue: 
                          Identifier: state
                        Rvalue: 
                          IntConst: 0
```

Dataflow analyzer
------------------------------

Let's try dataflow analysis. Please type the command as below.

```
python pyverilog/examples/example_dataflow_analyzer.py -t top test.v 
```

Then you got the result as below. The result of each signal definition and each signal assignment are displayed.

```
Directive:
Instance:
(top, 'top')
Term:
(Term name:top.led type:{'Output'} msb:(IntConst 7) lsb:(IntConst 0))
(Term name:top.enable type:{'Input'} msb:(IntConst 0) lsb:(IntConst 0))
(Term name:top.CLK type:{'Input'} msb:(IntConst 0) lsb:(IntConst 0))
(Term name:top.count type:{'Reg'} msb:(IntConst 31) lsb:(IntConst 0))
(Term name:top.state type:{'Reg'} msb:(IntConst 7) lsb:(IntConst 0))
(Term name:top.RST type:{'Input'} msb:(IntConst 0) lsb:(IntConst 0))
(Term name:top.value type:{'Input'} msb:(IntConst 31) lsb:(IntConst 0))
Bind:
(Bind dest:top.count tree:(Branch Cond:(Terminal top.RST) True:(IntConst 0) False:(Branch Cond:(Operator Eq Next:(Terminal top.state),(IntConst 0)) False:(Branch Cond:(Operator Eq Next:(Terminal top.state),(IntConst 1)) False:(Branch Cond:(Operator Eq Next:(Terminal top.state),(IntConst 2)) True:(Operator Plus Next:(Terminal top.count),(Terminal top.value)))))))
(Bind dest:top.state tree:(Branch Cond:(Terminal top.RST) True:(IntConst 0) False:(Branch Cond:(Operator Eq Next:(Terminal top.state),(IntConst 0)) True:(Branch Cond:(Terminal top.enable) True:(IntConst 1)) False:(Branch Cond:(Operator Eq Next:(Terminal top.state),(IntConst 1)) True:(IntConst 2) False:(Branch Cond:(Operator Eq Next:(Terminal top.state),(IntConst 2)) True:(IntConst 0))))))
(Bind dest:top.led tree:(Partselect Var:(Terminal top.count) MSB:(IntConst 23) LSB:(IntConst 16)))
```

Let's view the result of dataflow analysis as a picture file. Now we select 'led' as the target. Please type the command as below. In this example, Graphviz and Pygraphviz are installed.

```
python pyverilog/examples/example_graphgen.py -t top -s top.led test.v 
```

Then you got a png file (out.png). The picture shows that the definition of 'led' is a part-selection of 'count' from 23-bit to 16-bit.

![out.png](img/out.png)

Control-flow analyzer
------------------------------

Let's try control-flow analysis. Please type the command as below. In this example, Graphviz and Pygraphviz are installed. If don't use Graphviz, please append "--nograph" option.

```
python pyverilog/examples/example_controlflow_analyzer.py -t top test.v 
```

Then you got the result as below. The result shows that the state machine structure and transition conditions to the next state in the state machine.

```
FSM signal: top.count, Condition list length: 4
FSM signal: top.state, Condition list length: 5
Condition: (Ulnot, Eq), Inferring transition condition
Condition: (Eq, top.enable), Inferring transition condition
Condition: (Ulnot, Ulnot, Eq), Inferring transition condition
# SIGNAL NAME: top.state
# DELAY CNT: 0
0 --(top_enable>'d0)--> 1
1 --None--> 2
2 --None--> 0
Loop
(0, 1, 2)
```

You got also a png file (top_state.png), if you did not append "--nograph". The picture shows that the graphical structure of the state machine.

![top_state.png](img/top_state.png)

Code generator
------------------------------
 
Finally, let's try code generation. Please prepare a Python script as below. The file name is 'test.py'.
A Verilog HDL code is represented by using the AST classes defined in 'vparser.ast'.

```python
import pyverilog.vparser.ast as vast
from pyverilog.ast_code_generator.codegen import ASTCodeGenerator

params = vast.Paramlist(())
clk = vast.Ioport( vast.Input('CLK') )
rst = vast.Ioport( vast.Input('RST') )
width = vast.Width( vast.IntConst('7'), vast.IntConst('0') )
led = vast.Ioport( vast.Output('led', width=width) )
ports = vast.Portlist( (clk, rst, led) )
items = ( vast.Assign( vast.Identifier('led'), vast.IntConst('8') ) ,)
ast = vast.ModuleDef("top", params, ports, items)

codegen = ASTCodeGenerator()
rslt = codegen.visit(ast)
print(rslt)
```

Please type the command as below at the same directory with Pyverilog.

```
python test.py
```

Then Verilog HDL code generated from the AST instances is displayed.

```verilog
module top
(
  input CLK,
  input RST,
  output [7:0] led
);

  assign led = 8;

endmodule
```


Related Project and Site
==============================

[Veriloggen](https://github.com/PyHDI/veriloggen)
- A library for constructing a Verilog HDL source code in Python

[PyCoRAM](https://github.com/PyHDI/PyCoRAM)
- Python-based Portable IP-core Synthesis Framework for FPGA-based Computing

[flipSyrup](https://github.com/shtaxxx/flipSyrup)
- Cycle-Accurate Hardware Simulation Framework on Abstract FPGA Platforms

[Pyverilog_toolbox](https://github.com/fukatani/Pyverilog_toolbox)
- Pyverilog_toolbox is Pyverilog-based verification/design tool, which is developed by Fukatani-san and uses Pyverilog as a fundamental library. Thanks for your contribution!

[shtaxxx.hatenablog.com](http://shtaxxx.hatenablog.com/entry/2014/01/01/045856)
- Blog entry for introduction and examples of Pyverilog (in Japansese)
