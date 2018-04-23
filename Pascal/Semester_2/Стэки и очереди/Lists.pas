Program Lists;

Uses Stk, Que, Math;

Var
  Stack: PtrS:= Nil;
  Stack1: PtrS:= Nil;
  Queue: PtrQ:= Nil;
  Polynom1: PtrP:= Nil;
  Polynom2: PtrP:= Nil;
  Polynom3: PtrP:= Nil;

Begin
  MakePolynom(Polynom1);
  ViewPolynom(Polynom1);
  MakePolynom(Polynom2);
  ViewPolynom(Polynom2);
  Polynom3:= SumPolynom(Polynom1, Polynom2);
  ViewPolynom(Polynom3);
End.