# odin-calculator
Browser calculator project for The Odin Project: https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator


I took the Windows calculator app as my model and replicated its buttons (except the MC/MR/M+/M- row as I have no idea what that even does).
It might've been nice to have its feature of showing the user the previous parts of the operation they're in the middle of, but, I, uh,
decided that was out of scope for this.


The instructions warning not to use the eval() function suggest the idea was to feed everything into an "number operator number" type buffer
and then find a way to evaluate that from a string without using said function, but I decided early on to use separate variables, i.e.
pressing an operator assigns it to the operator variable, entering another number puts the previous one in a buffer, and pressing another
operator with both buffer and operator already present will evaluate that calculation and save the new operator.


Half of the "extra credit" (decimal points, backspace button) was already covered by emulating the Windows app, but my first thought
on reading the instructions was "without keyboard support, this is useless", so of course I added that too. Including
support for entering a comma as the decimal separator which will be the case with several languages' keyboard layouts.


My variables tracking originally led to some funny behaviour when just mashing operators and the equals sign. While adding the
currently present number to itself when pressing plus equals could be considered a feature, the calculator app I was basing
this on does not do this, so I cleaned that up. Had to add "lastButtonPressed" as an additional variable to fix some other
undesired behaviour when pushing odd sequences of buttons, but I *THINK* it's all fixed now.


The appearance is nothing special, but I hope it's OK. It's a calculator.
