///- Support Function and Procedure (SFaP)
/// Модуль с вспомогательными функциями и процедурами
Unit SFaP;

Interface
  Uses Crt;
  /// Красивый ввод чисел
  Procedure InputNumber(x, y: integer; var a: real);
  /// Красивый вывод чисел
  Procedure OutputNumber(x, y: integer; a: real);
  /// Вывод элементов меню
  Procedure PrintMenuElem(typeMenu: String; menuElem: array of String);
  /// Ожидание
  Procedure Wait;
  
Implementation

  Procedure InputNumber(x, y: integer; var a: real);
  begin
    GoToXY(20, 20); Write('Enter the number: '); Readln(a);
    GoToXY(20, 20); ClearLine;
    GoToXY(x, y); Writeln(a:6:2);
  end;
  
  Procedure OutputNumber(x, y: integer; a: real);
  begin
    GoToXY(x, y); Writeln(a:6:2);
  end;
  
  Procedure PrintMenuElem(typeMenu: String; menuElem: array of String);
  var i, x, y: integer;
  begin
    x:= 2; y:= 2;
    ClrScr;
    GoToXY(x, y); Writeln('=== === ' + typeMenu + ' === ===');
    GoToXY(x + 2, y + 2); Writeln('Выберите режим: ');
    for i:= 0 to menuElem.Length-1 do 
    begin
      GoToXY(x + 5, y + 3 + i); Writeln((i + 1) + '. ' + menuElem[i]);
    end;
    GoToXY(x + 5, y + 4 + i); Writeln('0. Выход');
  end;
  
  Procedure Wait;
  begin
    repeat until keyPressed;
    while keyPressed do ReadKey;
  end;
  
End.