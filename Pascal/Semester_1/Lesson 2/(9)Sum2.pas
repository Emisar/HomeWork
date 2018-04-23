Var S:real;
    n,k:integer;

Begin
  S:=0;
  for n:=1 to 50 do 
  begin
    k:=2*n;
    S:= S + k/(k-1)/(k+1)/(k+1)
  end;
  Writeln(S)
End.