Const CYCLE=100;
Var k,m:integer;
    t,t2,P,S:real;
Begin
  Readln(t);
  t2:=t*t;
  P:=1;
  S:=1;
  for k:=1 to CYCLE do
  begin
    m:=2*k;
    P:=-P*t2/m/(m-1);
    S:=S+P;
  end;
  Writeln(S);
  writeln(cos(t));
End.