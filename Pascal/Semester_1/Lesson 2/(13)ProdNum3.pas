Var S,P:real;
    n:integer;

Begin
  S:=0;
  P:=1;
  for n:=1 to 50 do 
  begin
    P:= P * (2 * n - 1);
    S:= S + 2*n/P;
  end;
  Writeln(S)
End.