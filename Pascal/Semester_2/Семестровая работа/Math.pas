unit Math;

interface

type
  PtrP = ^Pn;
  Pn = record
    Coef, Deg: integer;
    Prev: PtrP;
  end;

procedure MakePolynom(var Polynom: PtrP);
procedure ViewPolynom(Polynom: PtrP);
function GetSizePolynom(Polynom: PtrP): integer;
function SumPolynom(Polynom1, Polynom2: PtrP): PtrP;

implementation

procedure MakePolynom(var Polynom: PtrP);
var
  Top: PtrP := nil;
  Coef, Deg: integer;
  Value: String;
begin
  while (true) do
  begin
    Value := ReadlnString('Need more elem? [Y/N]');
    if (Value = 'N') or (Value = 'n') then break
    else if (Value = 'Y') or (Value = 'y') then
    begin
      Coef := ReadlnInteger('Enter the Coef:');
      Deg := ReadlnInteger('Enter the Deg:');
      new(Polynom);
      Polynom^.Coef := Coef;
      Polynom^.Deg := Deg;
      Polynom^.Prev := Top;
      Top := Polynom;
    end
    else Writeln('Wrong answer!');
  end;
end;

procedure ViewPolynom(Polynom: PtrP);
begin
  Write('[ ');
  while (Polynom <> nil) do
  begin
    Write(Polynom^.Coef, 'x^', Polynom^.Deg, ' ');
    Polynom := Polynom^.Prev;
  end;
  Writeln(']');
end;

function GetSizePolynom(Polynom: PtrP): integer;
var
  cnt: integer := 0;
begin
  while (Polynom <> nil) do
  begin
    Polynom := Polynom^.Prev;
    cnt += 1;
  end;
  result := cnt;
end;

function SumPolynom(Polynom1, Polynom2: PtrP): PtrP;
var
  top: PtrP := Polynom1;
  isSum: boolean := false;
begin
  while (Polynom2 <> nil) do
  begin
    isSum := false;
    while (Polynom1 <> nil) and not (isSum) do
    begin
      if (Polynom1^.Deg = Polynom2^.Deg) then
      begin
        Polynom1^.Coef += Polynom2^.Coef;
        isSum := true;
      end;
      Polynom1 := Polynom1^.Prev;
    end;
    if (isSum = false) then
    begin
      new(Polynom1);
      Polynom1^.Coef := Polynom2^.Coef;
      Polynom1^.Deg := Polynom2^.Deg;
      Polynom1^.Prev := top;
      top := Polynom1;
    end;
    Polynom2 := Polynom2^.Prev;
    Polynom1 := top;
  end;
  result := Polynom1;
end;

end.