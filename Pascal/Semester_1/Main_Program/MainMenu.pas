Program MainMenu;

Uses Crt, SFaP, Cplx, Vect;

Var menuElem: array of String;
    mode: integer;
    menuOpen: boolean;

begin
  SetLength(menuElem, 4);
  menuElem[0] := 'Комплексные числа';
  menuElem[1] := 'Комплексные матрицы'; 
  menuElem[2] := 'Вектора';
  menuElem[3] := 'Комплексные вектора';
  menuOpen := true;
  while menuOpen do
  begin
    PrintMenuElem('Главное меню', menuElem);
    Readln(mode);
    ClrScr;
    case mode of 
      1: MenuComplex;
      2: MenuComplexMatrix;
      3: MenuVector;
      4: MenuComplexVector;
      0: menuOpen:= false;
      else
      begin
        Writeln('Некорректный ввод! Выберите один из элементов меню!');
        Wait;
      end;
    end;
  end;
End.