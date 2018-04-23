Const EPS=0.000001;
Var k:integer;
    t,S,P:real;
Begin
  Readln(t);
  S:=0;
  P:=1;
  k:=0;
  while (abs(P/k)>=EPS) do
  begin
    k:=k+1;
    P:=P*t;
    S:=S+P/k;
  end;
  Writeln(S);
End.