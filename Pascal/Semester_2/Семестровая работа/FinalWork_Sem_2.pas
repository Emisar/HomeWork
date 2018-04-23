{Семестровая работа №2
По дисциплине "Технологии программирования"
Студента 1 курса ИМИТиФ Группы ВМ-11
Сорокина А.А.}

program FinalWork_Sem_2;

Uses 
  Stk, Que, fwl, TreeLib, Favor, Crt;

const
  ERROR_MESSAGE: array of String = ('Incorrect input value!', 'This item isn''t exist');

// ===== ===== ===== ===== Support Procedures ===== ===== ===== =====
///-Wait;
/// Останавливает поток и ждёт нажатия любой клавиши
procedure Wait;
begin
  repeat until keyPressed;
  while keyPressed do ReadKey;
end;

///-Error(n: byte);
/// Выводит сообщение об ошибке по переданному указателю "n"
procedure Error(n: byte);
begin
  ClrScr;
  Writeln(ERROR_MESSAGE[n - 1]);
  Wait;
end;

///-PrintMenu(Head: String; MenuElem: array of String);
/// Производит вывод заголовка (Head) и элементов (MenuElem) меню на экран с нумерацией
/// Нулевой элемент - "Выход"
procedure PrintMenu(Head: String; MenuElem: array of String);
begin
  ClrScr;
  Writeln('===== ', Head, ' =====');
  for i: integer := 0 to MenuElem.Length - 1 do
    Writeln(' ', i + 1, '. ', MenuElem[i]);
  Writeln(' 0. Exit');
  Writeln('====== ====== ======');
end;

// ===== ===== ===== ===== Menu Procedures ===== ===== ===== =====

///-FavorMenu;
/// Меню модуля Favor
procedure FavorMenu;
var
  Head: String := 'Favor Menu';
  MenuElem: array of String := ('Stack To Queue', 'Queue To Stack', 'Stack To File', 'Queue To File', 'Bad Students');
  ch: char;
  Stack: PtrS := nil;
  Queue: PtrQ := nil;
  FileName: String;
begin
  while true do
  begin
    PrintMenu(Head, MenuElem);
    ch := ReadlnChar('Enter the number:');
    if ch in ['0'..'9'] then
    begin
      ClrScr;
      case ch of
        '1': 
          begin
            MakeStack(Stack);
            Write('Stack: '); ViewStack(Stack);
            Queue := StackToQueue(Stack, Queue);
            Write('Queue: '); ViewQueue(Queue);
          end;
        '2':
          begin
            MakeQueue(Queue);
            Write('Queue: '); ViewQueue(Queue);
            Stack := QueueToStack(Queue, Stack);
            Write('Stack: '); ViewStack(Stack);
          end;
        '3':
          begin
            MakeStack(Stack);
            Write('Stack: '); ViewStack(Stack);
            StackToFile(Stack, 'StackFile.txt');
            Write('File: '); ViewFile('StackFile.txt');
          end;
        '4':
          begin
            MakeQueue(Queue);
            Write('Queue: '); ViewQueue(Queue);
            QueueToFile(Queue, 'QueueFile.txt');
            Write('File: '); ViewFile('QueueFile.txt');
          end;
        '5':
          begin
            FileName := ReadlnString('Enter the File Name:');
            EraseFile(FileName);
            MakeAndEditFile(FileName);
            ViewFile(FileName);
            BadStudents(FileName, ReadlnInteger('Enter the number of bad marks:'));
          end;
        '0': break;
      else
        Error(2);
      end;
      Wait;
    end
    else
      Error(1);
  end;
end;

///-StkMenu;
/// Меню модуля Stk
procedure StkMenu;
var
  Head: String := 'Stack Menu';
  MenuElem: array of String := ('Create Stack', 'Add Into Stack', 'Remove From Stack', 'Split Stack', 'Concat Stack');
  ch: char;
  Stack_1: PtrS := nil;
  Stack_2: PtrS := nil;
begin
  while true do
  begin
    PrintMenu(Head, MenuElem);
    ch := ReadlnChar('Enter the number:');
    if ch in ['0'..'9'] then
    begin
      ClrScr;
      case ch of
        '1': 
          begin
            MakeStack(Stack_1);
            Write('Stack: '); ViewStack(Stack_1);
          end;
        '2': 
          begin
            MakeStack(Stack_1);
            Write('Stack: '); ViewStack(Stack_1);
            AddStackElem(Stack_1, ReadlnInteger('Enter the position:'));
            Write('Stack: '); ViewStack(Stack_1);
          end;
        '3': 
          begin
            MakeStack(Stack_1);
            Write('Stack: '); ViewStack(Stack_1);
            DeleteStackElem(Stack_1, ReadlnInteger('Enter the position:'));
            Write('Stack: '); ViewStack(Stack_1);
          end;
        '4': 
          begin
            MakeStack(Stack_1);
            Write('Stack_1: '); ViewStack(Stack_1);
            Stack_2 := SplitStack(Stack_1, ReadlnInteger('Enter the position:'));
            Write('Stack_1: '); ViewStack(Stack_1);
            Write('Stack_2: '); ViewStack(Stack_2);
          end;
        '5': 
          begin
            MakeStack(Stack_1);
            Write('Stack_1: '); ViewStack(Stack_1);
            MakeStack(Stack_2);
            Write('Stack_2: '); ViewStack(Stack_2);
            ConcatStack(Stack_1, Stack_2);
            Write('Stack_1: '); ViewStack(Stack_1);
          end;
        '0': break;
      else
        Error(2);
      end;
      Wait;
    end
    else
      Error(1);
  end;
end;

///-QueMenu;
/// Меню модуля Que
procedure QueMenu;
var
  Head: String := 'Queue Menu';
  MenuElem: array of String := ('Create Queue', 'Add Into Queue', 'Remove from Queue', 'Split Queue', 'Concat Queue');
  ch: char;
  Queue_1: PtrQ := nil;
  Queue_2: PtrQ := nil;
begin
  while true do
  begin
    PrintMenu(Head, MenuElem);
    ch := ReadlnChar('Enter the number:');
    if ch in ['0'..'9'] then
    begin
      ClrScr;
      case ch of
        '1': 
          begin
            MakeQueue(Queue_1);
            Write('Queue: '); ViewQueue(Queue_1);
          end;
        '2': 
          begin
            MakeQueue(Queue_1);
            Write('Queue: '); ViewQueue(Queue_1);
            AddQueueElem(Queue_1, ReadlnInteger('Enter the position:'));
            Write('Queue: '); ViewQueue(Queue_1);
          end;
        '3': 
          begin
            MakeQueue(Queue_1);
            Write('Queue: '); ViewQueue(Queue_1);
            DeleteQueueElem(Queue_1, ReadlnInteger('Enter the position:'));
            Write('Queue: '); ViewQueue(Queue_1);
          end;
        '4': 
          begin
            MakeQueue(Queue_1);
            Write('Queue_1: '); ViewQueue(Queue_1);
            Queue_2 := SplitQueue(Queue_1, ReadlnInteger('Enter the position:'));
            Write('Queue_1: '); ViewQueue(Queue_1);
            Write('Queue_2: '); ViewQueue(Queue_2);
          end;
        '5': 
          begin
            MakeQueue(Queue_1);
            Write('Queue_1: '); ViewQueue(Queue_1);
            MakeQueue(Queue_2);
            Write('Queue_2: '); ViewQueue(Queue_2);
            ConcatQueue(Queue_1, Queue_2);
            Write('Queue_1: '); ViewQueue(Queue_1);
          end;
        '0': break;
      else
        Error(2);
      end;
      wait;
    end
    else
      Error(1);
  end;
end;

///-fwlMenu;
/// Меню модуля fwl
procedure fwlMenu;
var
  Head: String := 'File System Menu';
  MenuElem: array of String := ('Make File', 'Edit File', 'Erase File');
  ch: char;
  FileName: String;
begin
  while true do
  begin
    PrintMenu(Head, MenuElem);
    ch := ReadlnChar('Enter the number:');
    if ch in ['0'..'9'] then
    begin
      ClrScr;
      case ch of
        '1': 
          begin
            FileName := ReadlnString('Enter the File Name:');
            EraseFile(FileName);
            MakeAndEditFile(FileName);
            ViewFile(FileName);
          end;
        '2': 
          begin
            FileName := ReadlnString('Enter the File Name:');
            MakeAndEditFile(FileName);
            ViewFile(FileName);
          end;
        '3': 
          begin
            FileName := ReadlnString('Enter the File Name:');
            EraseFile(FileName);
          end;
        '0': break;
      else
        Error(2);
      end;
      Wait;
    end
    else
      Error(1);
  end;
end;

///-TreeLibMenu;
/// Меню модуля TreeLib
procedure TreeLibMenu;
var
  Head: String := 'Tree Menu';
  MenuElem: array of String := ('Create Tree');
  ch: char;
  Tree: array of Node;
begin
  while true do
  begin
    PrintMenu(Head, MenuElem);
    ch := ReadlnChar('Enter the number:');
    if ch in ['0'..'9'] then
    begin
      ClrScr;
      case ch of
        '1':
          begin
            CreateTree(Tree);
            Writeln(Tree);
          end;
        '0': break;
      else
        Error(2);
      end;
      Wait;
    end
    else
      Error(1);
  end;
end;

///-MainMenu;
/// Главное меню программы
procedure MainMenu;
var
  Head: String := 'Main Menu';
  MenuElem: array of String := ('Stack', 'Queue', 'File System', 'Favorite', 'Tree Menu');
  ch: char;
begin
  while true do
  begin
    PrintMenu(Head, MenuElem);
    ch := ReadlnChar('Enter the number:');
    if ch in ['0'..'9'] then
    begin
      ClrScr;
      case ch of
        '1': StkMenu;
        '2': QueMenu;
        '3': fwlMenu;
        '4': FavorMenu;
        '5': TreeLibMenu;
        '0': break;
      else
        Error(2);
      end;
    end
    else
      Error(1);
  end;
end;

// ===== ===== ===== ===== Main Program ===== ===== ===== =====

begin
  MainMenu;
end.