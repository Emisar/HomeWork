Var P:real;
    n:integer;

Begin
  P:=1;
  for n:=2 to 100 do P:= P * (1-1/n/n);
  Writeln(P)
End.