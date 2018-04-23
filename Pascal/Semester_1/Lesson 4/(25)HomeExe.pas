Const EPS = 0.000001;
Var k:integer;
    t, t2, nu, nu4, S, P, q:real;
Begin
  Readln(t);
  t2:=t*t;
  Readln(nu);
  nu4:=sqr(sqr(nu));
  S:=t;
  P:=t;
  q:=sqr(nu) * nu;
  k:=0;
  while(abs(P) >= EPS) do
  begin
    k:=k+2;
    P:=-P*q*t2/k/(k+1);
    q:=q*nu4;
    S:=S+P;
  end;
  Writeln(S);
End.