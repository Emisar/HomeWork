object equFrame: TequFrame
  Left = 1131
  Top = 149
  Width = 216
  Height = 189
  Caption = 'Sqr_Equ'
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  PixelsPerInch = 96
  TextHeight = 13
  object Label1: TLabel
    Left = 32
    Top = 16
    Width = 28
    Height = 20
    Caption = 'X +'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -16
    Font.Name = 'MS Sans Serif'
    Font.Style = [fsBold]
    ParentFont = False
  end
  object Label2: TLabel
    Left = 48
    Top = 8
    Width = 6
    Height = 13
    Caption = '2'
  end
  object Label3: TLabel
    Left = 88
    Top = 16
    Width = 28
    Height = 20
    Caption = 'X +'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -16
    Font.Name = 'MS Sans Serif'
    Font.Style = [fsBold]
    ParentFont = False
  end
  object Label4: TLabel
    Left = 144
    Top = 16
    Width = 11
    Height = 20
    Caption = '='
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -16
    Font.Name = 'MS Sans Serif'
    Font.Style = [fsBold]
    ParentFont = False
  end
  object Label5: TLabel
    Left = 8
    Top = 88
    Width = 50
    Height = 16
    Caption = #1054#1090#1074#1077#1090':'
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -13
    Font.Name = 'MS Sans Serif'
    Font.Style = [fsBold]
    ParentFont = False
  end
  object inputA: TEdit
    Left = 8
    Top = 16
    Width = 17
    Height = 21
    AutoSize = False
    MaxLength = 3
    TabOrder = 0
  end
  object inputB: TEdit
    Left = 64
    Top = 16
    Width = 17
    Height = 21
    AutoSize = False
    MaxLength = 3
    TabOrder = 1
  end
  object inputC: TEdit
    Left = 120
    Top = 16
    Width = 17
    Height = 21
    AutoSize = False
    MaxLength = 3
    TabOrder = 2
  end
  object inputD: TEdit
    Left = 160
    Top = 16
    Width = 17
    Height = 21
    AutoSize = False
    MaxLength = 3
    TabOrder = 3
  end
  object enterButton: TButton
    Left = 8
    Top = 48
    Width = 75
    Height = 25
    Caption = #1056#1077#1096#1080#1090#1100
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -11
    Font.Name = 'MS Sans Serif'
    Font.Style = [fsBold]
    ParentFont = False
    TabOrder = 4
    OnClick = enterButtonClick
  end
  object closeButton: TButton
    Left = 104
    Top = 48
    Width = 75
    Height = 25
    Caption = #1047#1072#1082#1088#1099#1090#1100
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -11
    Font.Name = 'MS Sans Serif'
    Font.Style = [fsBold]
    ParentFont = False
    TabOrder = 5
    OnClick = closeButtonClick
  end
  object answerField: TListBox
    Left = 64
    Top = 88
    Width = 113
    Height = 41
    ItemHeight = 13
    TabOrder = 6
  end
end
