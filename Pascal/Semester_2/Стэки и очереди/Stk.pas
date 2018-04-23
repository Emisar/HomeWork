///-Stack
///Модуль для работы со стеками
unit Stk;

interface

type
  ///-Pointer Stack (PtrS)
  ///Ссылка на объект типа stack
  PtrS = ^St;
  ///-Stack [Inf, Prev]
  ///Объект содержащий целочисленное значение(Inf) и ссылку на предыдущий элемент стека(Prev)
  St = record
    Inf: integer;
    Prev: PtrS;
  end;

const
  ///-END_KEY = 0
  ///Число для завершения ввода стека
  END_KEY = 0;
  ///-ERROR_MESSAGE = 'Error! Please enter the correct number!'
  ///Сообщение об ошибке ввода
  ERROR_MESSAGE = 'Error! Please enter the correct number!';

///-MakeStack(Stack)
///Процедура позволяющая создавать стек 
///*Для остановки ввода введите 0*
procedure MakeStack(var Stack: PtrS);
///-MakeStack(param,Stack)
///Процедура выводящая приглашение к вводу и позволяющая создавать стек 
///*Для остановки ввода введите 0*
procedure MakeStack(param: String; var Stack: PtrS);
///-AddStackTop(Stack)
///Процедура добавляющая в начало имеющегося стека новый элемент
procedure AddStackTop(var Stack: PtrS);
///-AddStackTop(param, Stack)
///Процедура выводящая приглашение к вводу и добавляющая в начало имеющегося стека новый элемент
procedure AddStackTop(param: String; var Stack: PtrS);
///-AddStackRear(Stack)
///Процедура добавляющая в конец имеющегося стека новый элемент
procedure AddStackRear(var Stack: PtrS);
///-AddStackRear(param, Stack)
///Процедура выводящая приглашение к вводу и добавляющая в конец имеющегося стека новый элемент
procedure AddStackRear(param: String; var Stack: PtrS);
///-AddStackElem(Stack, pos)
///Процедура добавляющая в выбранную позицию стека новый элемент
procedure AddStackElem(var Stack: PtrS; pos: integer);
///-AddStackElem(param, Stack, pos)
///Процедура выводящая приглашение к вводу и добавляющая в выбранную позицию стека новый элемент
procedure AddStackElem(param: String; var Stack: PtrS; pos: integer);
///-ViewStack(Stack)
///Процедура для вывода всего стека
procedure ViewStack(Stack: PtrS);
///-DeleteStack(Stack)
///Процедура удаляющая стек
procedure DeleteStack(var Stack: PtrS);
///-DeleteStackTop(Stack)
///Процедура удаляющая первый элемент стека
procedure DeleteStackTop(var Stack: PtrS);
///-DeleteStackRear(Queue)
///Процедура удаляющая последний элемент стека
procedure DeleteStackRear(var Stack: PtrS);
///-DeleteStackElem(Stack, pos)
///Процедура удаляющая элемент стека из выбранной позиции
procedure DeleteStackElem(var Stack: PtrS; pos: integer);
///-SetStackElemValue(Stack, pos, Value): integer
///Процедура меняющая значение выбранного элемента стека
procedure SetStackElemValue(Stack: PtrS; pos, Value: integer);
///-StackSize(Stack): integer
///Функция возвращающая размер стека
function GetStackSize(Stack: PtrS): integer;
///-GetStackElem(Stack, pos): PtrS
///Функция возвращающая выбранный элемент стека
function GetStackElem(Stack: PtrS; pos: integer): PtrS;
///-GetStackElemValue(Stack, pos): integer
///Функция возвращающая значение выбранного элемента стека
function GetStackElemValue(Stack: PtrS; pos: integer): integer;
///-SplitStack(Stack, pos): PtrS
///Функция разделяющая один стек на два и возвращающая второй
///Все элементы первого стека стоящие после указанной позиции переходят во втой стек
function SplitStack(Stack: PtrS; pos: integer): PtrS;
///-ConcatStack(Stack1, Stack2: PtrS): PtrS
///Функция возвращающая результат соединения двух стеков
///Все элементы второго стека переходят в конец первого стека
function ConcatStack(Stack1, Stack2: PtrS): PtrS;

implementation

procedure MakeStack(var Stack: PtrS);
var
  Top: PtrS := nil;
  Value: integer;
begin
  while (true) do
  begin
    Value := ReadlnInteger('Enter the number:');
    if (Value = END_KEY) then break
    else
    begin
      New(Stack);
      Stack^.Inf := Value;
      Stack^.Prev := Top;
      Top := Stack;
    end;
  end;
end;

procedure MakeStack(param: String; var Stack: PtrS);
var
  Top: PtrS := nil;
  Value: integer;
begin
  while (true) do
  begin
    Value := ReadlnInteger(param);
    if (Value = END_KEY) then break
    else
    begin
      New(Stack);
      Stack^.Inf := Value;
      Stack^.Prev := Top;
      Top := Stack;
    end;
  end;
end;

procedure AddStackTop(var Stack: PtrS);
var
  Prev: PtrS := Stack;
  Value: integer;
begin
  Value := ReadlnInteger('Enter the number:');
  if (Value <> END_KEY) then
  begin
    New(Stack);
    Stack^.Inf := Value;
    Stack^.Prev := Prev;
  end;
end;

procedure AddStackTop(param: String; var Stack: PtrS);
var
  Prev: PtrS := Stack;
  Value: integer;
begin
  Value := ReadlnInteger(param);
  if (Value <> END_KEY) then
  begin
    New(Stack);
    Stack^.Inf := Value;
    Stack^.Prev := Prev;
  end;
end;

procedure AddStackRear(var Stack: PtrS);
var
  Rear: PtrS;
  Top: PtrS := Stack;
  Value: integer;
begin
  if (Stack <> nil) then Rear := GetStackElem(Stack, GetStackSize(Stack));
  Value := ReadlnInteger('Enter the number:');
  if (Value <> END_KEY) then
  begin
    New(Stack);
    Stack^.Inf := Value;
    Stack^.Prev := nil;
    if (Rear <> nil) then Rear^.Prev := Stack;
  end;
  if (Top <> nil) then Stack := Top;
end;

procedure AddStackRear(param: String; var Stack: PtrS);
var
  Rear: PtrS;
  Top: PtrS := Stack;
  Value: integer;
begin
  if (Stack <> nil) then Rear := GetStackElem(Stack, GetStackSize(Stack));
  Value := ReadlnInteger(param);
  if (Value <> END_KEY) then
  begin
    New(Stack);
    Stack^.Inf := Value;
    Stack^.Prev := nil;
    if (Rear <> nil) then Rear^.Prev := Stack;
  end;
  if (Top <> nil) then Stack := Top;
end;

procedure AddStackElem(var Stack: PtrS; pos: integer);
var
  Top: PtrS := Stack;
  Value: integer;
begin
  if (pos > GetStackSize(Stack)) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else if (pos = 1) then AddStackTop(Stack)
  else if (pos = GetStackSize(Stack)) then AddStackRear(Stack)
  else
  begin
    Value := ReadlnInteger('Enter the number:');
    if (Value <> END_KEY) then
    begin
      New(Stack);
      Stack^.Inf := Value;
      Stack^.Prev := GetStackElem(Stack, pos);
      GetStackElem(Stack, pos - 1)^.Prev := Stack;
    end;
    Stack := Top;
  end;
end;

procedure AddStackElem(param: String; var Stack: PtrS; pos: integer);
var
  Top: PtrS := Stack;
  Value: integer;
begin
  if (pos > GetStackSize(Stack)) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else if (pos = 1) then AddStackTop(Stack)
  else if (pos = GetStackSize(Stack)) then AddStackRear(Stack)
  else
  begin
    Value := ReadlnInteger(param);
    if (Value <> END_KEY) then
    begin
      New(Stack);
      Stack^.Inf := Value;
      Stack^.Prev := GetStackElem(Stack, pos);
      GetStackElem(Stack, pos - 1)^.Prev := Stack;
    end;
    Stack := Top;
  end;
end;

procedure ViewStack(Stack: PtrS);
begin
  Write('[ ');
  while (Stack <> nil) do
  begin
    Write(Stack^.Inf, ' ');
    Stack := Stack^.Prev;
  end;
  Writeln(']');
end;

procedure DeleteStack(var Stack: PtrS);
begin
  Stack := nil;
end;

procedure DeleteStackTop(var Stack: PtrS);
begin
  Stack := Stack^.Prev;
end;

procedure DeleteStackRear(var Stack: PtrS);
begin
  if (GetStackSize(Stack) = 1) then Stack := nil
  else GetStackElem(Stack, GetStackSize(Stack) - 1)^.Prev := nil;
end;

procedure DeleteStackElem(var Stack: PtrS; pos: integer);
begin
  if (pos > GetStackSize(Stack)) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else if (pos = 1) then DeleteStackTop(Stack)
  else if (pos = GetStackSize(Stack)) then DeleteStackRear(Stack)
  else GetStackElem(Stack, pos - 1)^.Prev := GetStackElem(Stack, pos + 1);
end;

procedure SetStackElemValue(Stack: PtrS; pos, Value: integer);
var
  size: integer := GetStackSize(Stack);
begin
  if (pos > size) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else GetStackElem(Stack, pos)^.Inf := Value;
end;

function GetStackSize(Stack: PtrS): integer;
var
  Cnt: integer := 0;
begin
  while (Stack <> nil) do
  begin
    Stack := Stack^.Prev;
    Cnt += 1;
  end;
  result := Cnt;
end;

function GetStackElem(Stack: PtrS; pos: integer): PtrS;
begin
  while (pos > 1) do
  begin
    Stack := Stack^.Prev;
    pos -= 1;
  end;
  result := Stack;
end;

function GetStackElemValue(Stack: PtrS; pos: integer): integer;
var
  size: integer := GetStackSize(Stack);
begin
  if (pos > size) or (pos < 1) then 
  begin
    Writeln(ERROR_MESSAGE);
    result := -1;
  end
  else
  begin
    Stack := GetStackElem(Stack, pos);
    result := Stack^.Inf;
  end;
end;

function SplitStack(Stack: PtrS; pos: integer): PtrS;
Begin
  if (pos > GetStackSize(Stack)) or (pos < 1) then Writeln(ERROR_MESSAGE)
  else 
  begin
    result:= GetStackElem(Stack, pos)^.Prev;
    GetStackElem(Stack, pos)^.Prev:= nil;
  end;
End;

function ConcatStack(Stack1, Stack2: PtrS): PtrS;
Begin
  GetStackElem(Stack1, GetStackSize(Stack1))^.Prev:= Stack2;
  result:= Stack1;
End;

End.  