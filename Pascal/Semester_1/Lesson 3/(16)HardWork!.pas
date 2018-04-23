Const CYCLE=100;
Var k,m:integer;
    t,t2,S,P:real;
Begin
  Readln(t);
  t2:=t*t;
  P:=t;
  S:=t;
  for k:=1 to CYCLE do
  begin
    m:=2*k+1;
    P:=-P*t2/m/(m-1);
    S:=S+P;
  end;
  writeln(S);
  writeln(sin(t));
End.