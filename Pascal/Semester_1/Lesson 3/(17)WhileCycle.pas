Const EPS=0.000001;
Var k:integer;
    t,P,S:real;
Begin
  Readln(t);
  P:=1;
  S:=1;
  While (abs(P)>=EPS) do
  begin
    k:=k+1;
    P:=P*t/k;
    S:=S+P;
  end;
  Writeln(S);
  Writeln(exp(t));
End.