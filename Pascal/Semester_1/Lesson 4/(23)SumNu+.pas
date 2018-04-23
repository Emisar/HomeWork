Const EPS = 0.000001;
Var k:integer;
    t, nu, P, q, S:real;
    
Begin
  Readln(t);
  Readln(nu);
  P:=1;
  q:=1;
  S:=1;
  k:=0;
  while (abs(P) >= EPS) do
  begin
    q:=q*nu;
    k:=k+1;
    p:=p*t*q/k;
    S:=S+P;
  end;
  writeln(S);
End.    