Const CYCLE=100;
Var k:integer;
    t,P,S:real;
Begin
  readln(t);
  P:=1;
  S:=1;
  for k:=1 to CYCLE do
  begin
    P:=P*t/k;
    S:=S+P;
  end;
  Writeln(S);
  Writeln(exp(t));
End.