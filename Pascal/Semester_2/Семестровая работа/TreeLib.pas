unit TreeLib;

interface

const
  YES_KEY: array of char = ('y', 'Y');
  NO_KEY: array of char = ('n', 'N');
  CHAR_KEY: array of char = ('+', '-', '*', '/');
  ERROR_MESSAGE: array of string = ('Incorrect input!');

type
  Node = record
    ch: char;
    left, right: byte;
  end;

procedure CreateTree(var Tree: array of Node);

implementation

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
  else
    Writeln(ERROR_MESSAGE[0]);
  result := id + 1;
end;

procedure CreateTree(var Tree: array of Node);
var
  ch: char;
begin
  SetLength(Tree, 0);
  while true do
  begin
    ch := ReadlnChar('Create new node? [Y/N]');
    if ch in NO_KEY then break
    else if ch in YES_KEY then CreateNode(Tree)
    else Writeln(ERROR_MESSAGE[0]);
  end;
end;

end.