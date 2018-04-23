Const EPS = 0.000001;
Var k:integer;
    t, nu, P, q, S:real;
    
Begin
  Readln(t);
  Readln(nu);
  P:=1;
  q:=1/nu;
  S:=1;
  k:=0;
  while (abs(P) >= EPS) do
  begin
    k:=k+1;
    q:=q*nu;
    p:=p*t*q/k;
    S:=S+P;
  end;
  writeln(S);
End.    