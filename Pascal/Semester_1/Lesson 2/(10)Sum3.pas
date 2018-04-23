Var S:real;
    n,k:integer;

Begin
  S:=0;
  for n:=1 to 33 do 
  begin
    k:= 3*n;
    S:= S + 1/(k-2)/(k+1)
  end;
  Writeln(S)
End.