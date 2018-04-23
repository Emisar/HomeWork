///- Vector
/// Модуль для работы с векторами
Unit Vect;

Interface
  Uses Crt, SFaP;
  Const
    /// Константа размера
    n = 3;
  Type
    ///- Vector <x, y, z>
    /// Математическая величина, характеризующаяся численным значением и направлением
    Vector = array [1..n] of Real;
  
  /// Производит ввод вектора a в строку с координатами x, y
  Procedure ReadVector(x, y: integer; Var a: Vector);
  /// Производит вывод вектора a в строку с координатами x, y
  Procedure WriteVector(x, y: integer; a: Vector);
  /// Возвращает сумму векторов x и y
  Function AddVector(x, y: Vector): Vector;
  /// Возвращает разность векторов x и y
  Function SubVector(x, y: Vector): Vector;
  /// Возвращает векторное произведение векторов x и y
  Function VectProd(x, y: Vector): Vector;
  /// Возвращает результат возведения вектора x в степень degree
  Function VectPow(x: Vector; degree: real): Vector;
  /// Возвращает скалярное произведение векторов x и y
  Function ScalProd(x, y: Vector): real;
  /// Возвращает смешанное произведение векторов a, b и c
  Function MixProd(a, b, c: Vector): real;
  /// Возвращает модуль вектора
  Function ModulVector(x: Vector): real;
  /// Выводит меню для вектора
  Procedure MenuVector();

Implementation

  Procedure ReadVector(x, y: integer; Var a: Vector);
  Var i: integer;
  begin
    GoToXY(x, y); Writeln('<');
    for i:= 1 to n do
    begin
      GoToXY(20, 20); Write('Enter the ' + i + ' number of Vector: '); Readln(a[i]);
      GoToXY(x + 1 + (i - 1) * 8, y); Write(a[i]:6:2);
      if (i <> n) then Writeln(', ');
      GoToXY(20, 20); Write('                                    ');
    end;
    GoToXY(x + 23, y); Writeln('>');
  end;
  
  Procedure WriteVector(x, y: integer; a: Vector);
  Var i: integer;
  begin
    GoToXY(x, y); Writeln('<');
    for i:= 1 to n do
    begin
      GoToXY(x + 1 + (i - 1) * 8, y); Write(a[i]:6:2);
      if (i <> n) then Writeln(', ');
    end;
    GoToXY(x + 23, y); Writeln('>');
  end;
  
  Function AddVector(x, y: Vector): Vector;
  Var i: integer;
      z: Vector;
  begin
    for i:= 1 to n do z[i]:= x[i] + y[i];
    AddVector:= z;
  end;
  
  Function SubVector(x, y: Vector): Vector;
  Var i: integer;
      z: Vector;
  begin
    for i:= 1 to n do z[i]:= x[i] - y[i];
    SubVector:= z;
  end;
  
  Function VectProd(x, y: Vector): Vector;
  Var z: Vector;
  begin
    z[1]:= x[2] * y[3] - x[3] * y[2];
    z[2]:= x[3] * y[1] - x[1] * y[3];
    z[3]:= x[1] * y[2] - x[2] * y[1];
    VectProd:= z;
  end;
  
  Function VectPow(x: Vector; degree: real): Vector;
  Var i, n: integer;
      factor: Vector;
  begin
    factor:= x;
    n:= Round(degree);
    for i:= 2 to n do VectPow:= VectProd(x, factor);
    if (n = 0) then 
    begin
      for i:= 1 to n do factor[i]:= 1;
      VectPow:= factor;
    end;
  end;
  
  Function ScalProd(x, y: Vector): real;
  Var i: integer;
      S: real;
  begin
    S:= 0;
    for i:= 1 to n do S:= S + x[i] * y[i];
    ScalProd:= S;
  end;
  
  Function MixProd(a, b, c: Vector): real;
  begin
    MixProd:= ScalProd(VectProd(a, b), c);
  end;
  
  Function ModulVector(x: Vector): real;
  begin
    ModulVector:= sqrt(ScalProd(x, x));
  end;

  Procedure MenuVector();
  Var menuElem: array of String;
      mode: integer;
      a, b, c: Vector;
      x: real;
      menuOpen: boolean;
  begin
    SetLength(menuElem, 7);
    menuElem[0] := 'Сложение';
    menuElem[1] := 'Вычитание'; 
    menuElem[2] := 'Векторное произведение';
    menuElem[3] := 'Возведение в степень';
    menuElem[4] := 'Скалярное произведение';
    menuElem[5] := 'Смешанное произведение';
    menuElem[6] := 'Модуль';
    menuOpen := true;
    while menuOpen do
    begin
      PrintMenuElem('Вектора' ,menuElem);
      Readln(mode);
      ClrScr;
      case mode of 
        1: begin 
             GoToXY(2, 2); Writeln('Первое слагаемое: '); ReadVector(20, 2, a);
             GoToXY(2, 3); Writeln('Второе слагаемое: '); ReadVector(20, 3, b);
             GoToXY(2, 5); Writeln('Сумма: '); WriteVector(20, 5, AddVector(a, b));
             Wait;
           end;
        2: begin
             GoToXY(2, 2); Writeln('Уменьшаемое: '); ReadVector(20, 2, a);
             GoToXY(2, 3); Writeln('Вычитаемое: ');ReadVector(20, 3, b);
             GoToXY(2, 5); Writeln('Разность: '); WriteVector(20, 5, SubVector(a, b));
             Wait;
           end;
        3: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadVector(20, 2, a);
             GoToXY(2, 3); Writeln('Второй множитель: '); ReadVector(20, 3, b);
             GoToXY(2, 5); Writeln('Произведение: '); WriteVector(20, 5, VectProd(a, b));
             Wait;
           end;
        4: begin
             GoToXY(2, 2); Writeln('Основание: '); ReadVector(20, 2, a);
             GoToXY(2, 3); Writeln('Показатель: '); InputNumber(20, 3, x);
             GoToXY(2, 5); Writeln('Результат: '); WriteVector(20, 5, VectPow(a, x));
             Wait;
           end;
        5: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadVector(20, 2, a);
             GoToXY(2, 3); Writeln('Второй множитель: '); ReadVector(20, 3, b);
             GoToXY(2, 5); Writeln('Произведение: '); OutputNumber(20, 5, ScalProd(a, b));
             Wait;
           end;
        6: begin
             GoToXY(2, 2); Writeln('Первый множитель: '); ReadVector(20, 2, a);
             GoToXY(2, 3); Writeln('Второй множитель: '); ReadVector(20, 3, b);
             GoToXY(2, 4); Writeln('Третий множитель: '); ReadVector(20, 4, c);
             GoToXY(2, 6); Writeln('Произведение: '); OutputNumber(20, 6, MixProd(a, b, c));
             Wait;
           end;
        7: begin
             GoToXY(2, 2); Writeln('Число: '); ReadVector(20, 2, a);
             GoToXY(2, 5); Writeln('Модуль числа: '); OutputNumber(20, 5, ModulVector(a));
             Wait;
           end;
        0: menuOpen:= false;
        else
        begin
          Writeln('Некорректный ввод! Выберите один из элементов меню!');
          Wait;
        end;
      end;
    end;
  end;

End.