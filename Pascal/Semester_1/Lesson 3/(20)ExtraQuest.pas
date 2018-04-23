Const CYCLE=100;
Var k:integer;
    t,S,P:real;
Begin
  Readln(t);
  S:=0;
  P:=1;
  for k:=1 to CYCLE do
  begin
    P:=P*t;
    S:=S+P/k;
  end;
  Writeln(S);
End.