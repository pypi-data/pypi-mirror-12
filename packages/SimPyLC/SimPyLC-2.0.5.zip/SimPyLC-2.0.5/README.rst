.. figure:: http://www.qquick.org/simpylc.jpg
	:alt: Screenshot of SimPyLC
	
	**Simulate your PLC controls and controlled systems to save lots of commissioning time**

PLC?
		
Real world industrial control systems DO NOT consist of a bunch of communicating sequential processes. Semaphores, threads and priority jugling are far too error prone to control anything else but a model railway. Most control systems are surprisingly simple, consisting of only one program loop that nevertheless seems to do many things in parallel and with reliable timing. Such a control system is called a PLC (Programmable Logic Controller) and all major industries rely on it. PLC's control trains, cranes, ships and your washing machine.
		
What SimPyLC is not:

SimPyLC does not attempt to mimic any particular PLC instruction set or graphical representation like ladder logic or graphcet. There are enough tools that do. Anyone with experience in the field and an IT background knows that such archaic, bulky, hard to edit representations get in the way of clear thinking. By the way, graphcet is stateful per definition, which is the absolute enemy of safety. Though its bigger brother written in C++ according to exactly the same principles has been reliably controlling container cranes, grab unloaders and production lines for more than 20 years now, SimPyLC is FUNDAMENTALLY UNSUITABLE for controlling real world systems and should never be used as a definitive validation of anything. You're only allowed to use SimPyLC under the conditions specified in the qQuickLicence that's part of the distribution.

What it is:

SimPyLC functionally behaves like a PLC or a set of interconnected PLC's and controlled systems. It is a very powerful tool to gain insight in the behaviour of real time controls and controlled systems. It allows you to force values, to freeze time, to draw timing chars and to visualize your system. This is all done in a very simple and straightforward way. But make no mistake, simulating systems in this way has a track record of reducing months of commissioning time to mere days. SimPyLC is Form Follows Function at its best, it does what it has to do in a robust no-nonsense way. Its sourcecode is tiny and fully open to understanding. The accompanying `SimPyLCHowTo <http://www.qquick.org/simpylchowto>`_ condenses decenia of practical experience in control systems in a few clear design rules that can save you lots of trouble and prevent accidents. In addition to this SimPyLC can generate C code for the Arduino processor boards.

.. figure:: http://www.qquick.org/arduinodue.jpg
	:alt: Picture of Arduino Due
	
	**SimPyLC is able to generate C code for Arduino processor boards, making Arduino development MUCH easier**

So:

Are you looking for impressive graphics: Look elsewhere. Do you want to gain invaluable insight in real time behaviour of controls and control systems with minimal effort: Use SimPyLC, curse at its anachronistic simplicity and grow to love it more and more.

What's new:

- Code generation for Arduino boards added as described in `SimPyLCHowTo <http://www.qquick.org/simpylchowto>`_. Note that this is a beta version due to the addition of Arduino code generation. If you need a stable version and don't need code generation, download 1.2.7.

Bugs fixed:

- Oneshot did not trigger properly, it does now

**Bug reports and feature requests are most welcome and will be taken under serious consideration on a non-committal basis**
		
Requirements for Windows:

1. Install WinPython 2.7, e.g. from https://winpython.github.io
2. (Optional) Copy SimPyLC\\SimPyLC\\QuartzMS.TTF to C:\\Windows\\Fonts
3. (Optional) You can may also add SimPyLC\\SimPyLC to your PYTHONPATH

Requirements for Linux:

1. Install Python 2.7 and PyOpenGL

Usage:

1. Go to directory SimPyLC/simulations/oneArmedRobot
2. Click on world.py or run world.py from the command line

GUI Operation:

- [LEFT CLICK] on a field or [ENTER] gets you into edit mode.
- [LEFT CLICK] or [ENTER] again gets you out of edit mode and into forced mode, values coloured orange are frozen.
- [RIGHT CLICK] or [ESC] gets gets you into released mode, values are thawed again.
- [PGUP] and [PGDN] change the currently viewed control page.

For a test run of oneArmedRobot:

- Enter setpoints in degrees for the joint angles (e.g. torAngSet for the torso of the robot) on the movement control page.
- After that set 'go' to 1 and watch what happens.

If you want to experiment yourself, read `SimPyLCHowTo <http://www.qquick.org/simpylchowto>`_

	.. figure:: http://www.qquick.org/simpylcprog.jpg
		:alt: A sample SimPyLC program
		
		**Coding is text oriented, enabling simple and fast editing, but functional behaviour resembles circuit logic, with elements like markers, timers, oneshots, latches and registers**

Other packages you might like:

- Multi-module Python source code obfuscator https://pypi.python.org/pypi/Opy
- Event driven evaluation nodes https://pypi.python.org/pypi/Eden
