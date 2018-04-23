program Sqr_Equ_Project;

uses
  Forms,
  Sqr_equ in 'Sqr_equ.pas' {equFrame};

{$R *.res}

begin
  Application.Initialize;
  Application.CreateForm(TequFrame, equFrame);
  Application.Run;
end.
