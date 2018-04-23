Var S,P:real;
    n:integer;

Begin
  S:=0;
  P:=1;
  for n:=1 to 14 do 
  begin
    P:= P / n;
    S:= S + (n+1) * P
  end;
  Writeln(S)
End.