///-Tree Library
/// Библиотека для работы с деревьями
unit TreeLib;

interface

const
  YES_KEY: array of char = ('y', 'Y');    //Символы инициализации
  NO_KEY: array of char = ('n', 'N');     //Символы терминации
  CHAR_KEY: array of char = ('+', '-', '*', '/');   //Символы математических действий
  //Текст ошибок
  ERROR_MESSAGE: array of string = ('Incorrect input!', 'File is not exist!');
  COLUMN_SIZE: byte = 5;    //Размер колонок в таблице

type
  Node = record
    ch: char;
    left, right: byte;
  end;

///-CreateTree(): array of Node;
/// Функция создающая дерево
function CreateTree(): array of Node;
///-SaveTree(Tree: array of Node; Filename: String);
/// Процедура сохраняющая дерево (Tree) в файл с именем (Filename)
procedure SaveTree(Tree: array of Node; Filename: String);
///-LoadTree(Filename: String): array of Node;
/// Функция возращающая дерево и файла с именем (Filename)
function LoadTree(Filename: String): array of Node;
///-ViewTree(Filename: String);
/// Процедура выводащая на экран дерево из файла с именем (Filename)
procedure ViewTree(Filename: String);
///-ViewTree(Tree: array of Node);
/// Процедура выводащая на экран дерево (Tree)
procedure ViewTree(Tree: array of Node);

implementation

procedure Error(num: byte);
begin
  Writeln(ERROR_MESSAGE[num - 1]);
end;

function EditText(s: String): String;
begin
  while (s.Length <> 0) and (s[1] = ' ') do s := s.Remove(0, 1);
  result := s;
end;

procedure WayUpDown(Tree: array of Node; Next: byte);
begin
  if Next <> 0 then
    with Tree[Next - 1] do
    
    begin
      Write(ch);
      WayUpDown(Tree, left);
      WayUpDown(Tree, right);
    end;
end;

procedure WayDownUp(Tree: array of Node; Next: byte);
begin
  if Next <> 0 then
    with Tree[Next - 1] do
    begin
      WayDownUp(Tree, left);
      WayDownUp(Tree, right);
      Write(ch);
    end;
end;

procedure WayHoriz(Tree: array of Node; Next, level: byte);
begin
  if Next <> 0 then with Tree[Next] do
      
      if level = 1 then Write(ch)
      else
      begin
        WayHoriz(Tree, left, level - 1);
        WayHoriz(Tree, right, level - 1);
      end;
end;

function CreateNode(var Tree: array of Node): integer;
var
  ch: char;
  id: integer := Tree.Length;
  left, right: integer;
begin
  ch := ReadlnChar('Enter the node value:');
  if ch in ['0'..'9'] then 
  begin
    SetLength(Tree, id + 1);
    Tree[id].ch := ch;
    Tree[id].left := 0;
    Tree[id].right := 0;
  end
  else if ch in CHAR_KEY then
  begin
    SetLength(Tree, id + 1);
    Tree[id].ch := ch;
    left := CreateNode(Tree);
    Tree[id].left := left;
    right := CreateNode(Tree);
    Tree[id].right := right;
  end
  else Error(1);
  result := id + 1;
end;

function CreateTree(): array of Node;
var
  ch: char;
begin
  SetLength(result, 0);
  while true do
  begin
    ch := ReadlnChar('Create new node? [Y/N]');
    if ch in NO_KEY then break
    else if ch in YES_KEY then CreateNode(result)
    else Error(1);
  end;
end;

procedure SaveTree(Tree: array of Node; Filename: String);
var
  TreeFile: Text;
begin
  assign(TreeFile, Filename);
  if FileExists(Filename) then append(TreeFile)
  else rewrite(TreeFile);
  foreach x: Node in Tree do
    Write(TreeFile, x.ch:COLUMN_SIZE, x.left:COLUMN_SIZE, x.right:COLUMN_SIZE);
  close(TreeFile);
end;

function LoadTree(Filename: String): array of Node;
var
  TreeFile: Text;
  ch: string[COLUMN_SIZE];
  left: string[COLUMN_SIZE];
  right: string[COLUMN_SIZE];
  Tree: array of Node;
begin
  SetLength(Tree, 0);
  assign(TreeFile, Filename);
  if FileExists(Filename) then
  begin
    reset(TreeFile);
    while not EOF(TreeFile) do
    begin
      Read(TreeFile, ch, left, right);
      SetLength(Tree, Tree.Length + 1);
      Tree[Tree.Length - 1].ch := EditText(ch)[1];
      Tree[Tree.Length - 1].left := StrToInt(EditText(left));
      Tree[Tree.Length - 1].right := StrToInt(EditText(right));
    end;
  end
  else Error(2);
  close(TreeFile);
  result:= Tree;
end;

procedure ViewTree(Filename: String);
var
  TreeFile: Text;
  ch: string[COLUMN_SIZE];
  left: string[COLUMN_SIZE];
  right: string[COLUMN_SIZE];
begin
  assign(TreeFile, Filename);
  if FileExists(Filename) then
  begin
    reset(TreeFile);
    while not EOF(TreeFile) do
    begin
      Read(TreeFile, ch, left, right);
      Writeln(ch, left, right);
    end;
  end
  else Error(2);
  close(TreeFile);
end;

procedure ViewTree(Tree: array of Node);
begin
  foreach x: Node in Tree do
    Writeln(x.ch:COLUMN_SIZE, x.left:COLUMN_SIZE, x.right:COLUMN_SIZE);
end;

end.