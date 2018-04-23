Var S:real;
    n:integer;

Begin
  S:=0;
  for n:=1 to 100 do S:=S + 1/n/n;
  writeln(S)
End.