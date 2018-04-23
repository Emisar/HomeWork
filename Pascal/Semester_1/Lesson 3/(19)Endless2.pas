Const EPS=0.00000000000001;
Var k,m:integer;
    t,t2,P,S:real;
Begin
  Readln(t);
  t2:=t*t;
  P:=t;
  S:=t;
  k:=1;
  while (abs(p)>=EPS) do
  begin
    k:=k+2;
    P:=-P*t2/k/(k-1);
    S:=S+P;
  end;
  writeln(S);
  writeln(sin(t));  
End.