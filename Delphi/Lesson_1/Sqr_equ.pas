unit Sqr_equ;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls;

type
  TequFrame = class(TForm)
    inputA: TEdit;
    Label1: TLabel;
    Label2: TLabel;
    inputB: TEdit;
    Label3: TLabel;
    inputC: TEdit;
    Label4: TLabel;
    inputD: TEdit;
    enterButton: TButton;
    closeButton: TButton;
    answerField: TListBox;
    Label5: TLabel;
    procedure closeButtonClick(Sender: TObject);
    procedure enterButtonClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  equFrame: TequFrame;

implementation

procedure SqrEqu(a, b, c: real; output: TListBox);
var
  i: integer;
  D: real;
  answer: array [1..2] of String;
begin
  if (a <> 0) then
  begin
    D:= a * a - 4 * b * c;
    if (D < 0) then answer[1]:= 'D < 0';
    if (D = 0) then answer[1]:= 'x = ' + FloatToStr(-b / 2 / a);
    if (D > 0) then
    begin
      answer[1]:= 'x1 = ' + FloatToStr((-b + sqrt(D)) / 2 / a);
      answer[2]:= 'x2 = ' + FloatToStr((-b - sqrt(D)) / 2 / a);
    end;
  end
  else answer[1]:= 'Enter A!';
  output.Clear;
  for i:= 1 to 2 do
  output.Items.Add(answer[i]);
end;

{$R *.dfm}

procedure TequFrame.closeButtonClick(Sender: TObject);
begin
   equFrame.Close;
end;

procedure TequFrame.enterButtonClick(Sender: TObject);
var
  a, b, c: real;
begin
  a:= 0; b:= 0; c:= 0;
  if (inputA.Text <> '') and (inputA.Text <> '0') then a:= StrToFloat(inputA.Text);
  if (inputB.Text <> '') and (inputB.Text <> '0') then b:= StrToFloat(inputB.Text);
  if (inputC.Text <> '') and (inputC.Text <> '0') then c:= StrToFloat(inputC.Text);
  if (inputD.Text <> '') and (inputD.Text <> '0') then c:= c - StrToFloat(inputD.Text);
  SqrEqu(a, b, c, answerField);
end;

end.
