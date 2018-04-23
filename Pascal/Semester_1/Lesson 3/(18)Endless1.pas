Const EPS=0.000000000001;
Var k,m:integer;
    t,t2,P,S:real;
Begin
  Readln(t);
  t2:=t*t;
  P:=1;
  S:=1;
  While (abs(p)>=EPS) do
  begin
    k:=k+1;
    m:=2*k;
    P:=-P*t2/m/(m-1);
    S:=S+P;
  end;
  Writeln(S);
  writeln(cos(t));
End.