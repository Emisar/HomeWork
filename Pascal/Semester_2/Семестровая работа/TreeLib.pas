///-Tree Library
/// Библиотека для работы с деревьями
unit TreeLib;

interface

const
  YES_KEY: array of char = ('y', 'Y');    //Символы инициализации
  NO_KEY: array of char = ('n', 'N');     //Символы терминации
  CHAR_KEY: array of char = ('+', '-', '*', '/');   //Символы математических действий
  //Текст ошибок
  ERROR_MESSAGE: array of string = ('Incorrect input!', 'File is not exist!', 'Node is not exist!');
  COLUMN_SIZE: byte = 5;//Размер колонок в таблице

type
  NodeId = record
    ch: char;
    left, right: byte;
  end;
  
  PtrN = ^NodeAdress;
  NodeAdress = record
    ch: char;
    value: integer;
    left, right: PtrN;
  end;

///-CreateTree(var Tree: array of NodeId);
/// Процедура создающая дерево
procedure CreateTree(var Tree: array of NodeId);
///-CreateTree(var Tree: PtrN);
/// Процедура создающая дерево
procedure CreateTree(var Tree: PtrN);
///-SaveTree(Tree: array of NodeId; Filename: String);
/// Процедура сохраняющая дерево (Tree) в файл с именем (Filename)
procedure CreateSearchingTree(var Tree: PtrN);
///-CreateSearchingTree(var Tree: PtrN);
/// Процедура создающая дерево для поиска значений
procedure SaveTree(Tree: array of NodeId; Filename: String);
///-LoadTree(Filename: String): array of NodeId;
/// Функция возращающая дерево и файла с именем (Filename)
function LoadTree(Filename: String): array of NodeId;
///-ViewTree(Filename: String);
/// Процедура выводащая на экран дерево из файла с именем (Filename)
procedure ViewTree(Filename: String);
///-ViewTree(Tree: array of NodeId);
/// Процедура выводащая на экран дерево (Tree)
procedure ViewTree(Tree: array of NodeId);
///-ViewTree(Tree: PtrN);
/// Процедура выводащая на экран дерево (Tree)
procedure ViewTree(Tree: PtrN);
///-SearchNode(Tree: PtrN; NodeValue: char);
/// Функция поиска нужного значения в дереве
function SearchNode(Tree: PtrN; NodeValue: integer): integer;

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

procedure WayUpDown(Tree: array of NodeId; Next: byte);
begin
  if Next <> 0 then
    with Tree[Next - 1] do 
    begin
      Write(ch);
      WayUpDown(Tree, left);
      WayUpDown(Tree, right);
    end;
end;

procedure WayDownUp(Tree: array of NodeId; Next: byte);
begin
  if Next <> 0 then
    with Tree[Next - 1] do
    begin
      WayDownUp(Tree, left);
      WayDownUp(Tree, right);
      Write(ch);
    end;
end;

procedure WayHoriz(Tree: array of NodeId; Next, level: byte);
begin
  if Next <> 0 then with Tree[Next] do
      if level = 1 then Write(ch)
      else
      begin
        WayHoriz(Tree, left, level - 1);
        WayHoriz(Tree, right, level - 1);
      end;
end;

function CreateNode(var Tree: array of NodeId): integer;
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

function CreateNode(): PtrN;
var
  Tree: PtrN := nil;
  ch: char;
  left, right: PtrN;
begin
  ch := ReadlnChar('Enter the node value:');
  if ch in ['0'..'9'] then 
  begin
    new(Tree);
    Tree^.ch := ch;
    Tree^.left := nil;
    Tree^.right := nil;
  end
  else if ch in CHAR_KEY then
  begin
    new(Tree);
    Tree^.ch := ch;
    left := CreateNode();
    Tree^.left := left;
    right := CreateNode();
    Tree^.right := right;
  end
  else Error(1);
  result := Tree;
end;

function CreateSearchingNode(Tree: PtrN; value: integer): PtrN;
var
  left, right: PtrN;
begin
  if (Tree = nil) then 
  begin
    new(Tree);
    Tree^.value:= value;
    Tree^.left:= nil;
    Tree^.right:=nil;
  end
  else if (value < Tree^.value) then
  begin
    left:= CreateSearchingNode(Tree^.left, value);
    Tree^.left:= left;
  end
  else if (value > Tree^.value) then
  begin
    right:= CreateSearchingNode(Tree^.right, value);
    Tree^.right:= right;
  end;
  result := Tree;
end;

procedure CreateTree(var Tree: array of NodeId);
begin
  SetLength(Tree, 0);
  CreateNode(Tree);
end;

procedure CreateTree(var Tree: PtrN);
begin
  Tree := CreateNode();
end;

procedure CreateSearchingTree(var Tree: PtrN);
var
  ch: char;
  value: integer;
begin
  while true do
  begin
    ch:= readlnChar('Need more nodes? [Y/N]:');
    if (ch in NO_KEY) then break
    else if (ch in YES_KEY) then
    begin
      value:= readlnInteger('Enter the node:');
      Tree:= CreateSearchingNode(Tree, value);
    end
    else error(1);
  end;
end;

procedure SaveTree(Tree: array of NodeId; Filename: String);
var
  TreeFile: Text;
begin
  assign(TreeFile, Filename);
  if FileExists(Filename) then append(TreeFile)
  else rewrite(TreeFile);
  foreach x: NodeId in Tree do
    Write(TreeFile, x.ch:COLUMN_SIZE, x.left:COLUMN_SIZE, x.right:COLUMN_SIZE);
  close(TreeFile);
end;

function LoadTree(Filename: String): array of NodeId;
var
  TreeFile: Text;
  ch: string[COLUMN_SIZE];
  left: string[COLUMN_SIZE];
  right: string[COLUMN_SIZE];
  Tree: array of NodeId;
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
  result := Tree;
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

procedure ViewTree(Tree: array of NodeId);
begin
  foreach x: NodeId in Tree do
    Writeln(x.ch:COLUMN_SIZE, x.left:COLUMN_SIZE, x.right:COLUMN_SIZE);
end;

procedure ViewTree(Tree: PtrN);
begin
  Writeln('Char: ', Tree^.ch:COLUMN_SIZE);
  Writeln('Value: ', Tree^.value:COLUMN_SIZE);
  if not (Tree^.left = nil) then ViewTree(Tree^.left);
  if not (Tree^.right = nil) then ViewTree(Tree^.right);
end;

function SearchNode(Tree: PtrN; NodeValue: integer): integer;
begin
  if (Tree^.value = NodeValue) then
    result:= Tree^.value
  else if (Tree^.value > NodeValue) then
    result:= SearchNode(Tree^.left, NodeValue)
  else if (Tree^.value < NodeValue) then
    result:= SearchNode(Tree^.right, NodeValue)
  else 
    result:= 0;
end;

end.