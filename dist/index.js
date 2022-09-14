import { ExternalTokenizer, LRParser } from '@lezer/lr';

// This file was generated by lezer-generator. You probably shouldn't edit it.
const StringContent = 1,
  stringInterpolationStart = 75,
  stringEnd = 76,
  StringBlockContent = 2,
  stringBlockInterpolationStart = 77,
  stringBlockEnd = 78;

/* Hand-written tokenizers for Nix tokens that can't be
   expressed by lezer's built-in tokenizer. */

const braceL = 123, dollar = 36, backslash = 92,
  doublequote = 34, singlequote = 39, newline = 10;

// based on javascript template parser
// https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
const stringBlock = new ExternalTokenizer(input => {
  for (let afterDollar = false, i = 0;; i++) {
    let {next} = input;
    if (next < 0) { // next == -1: end of file
      if (i) {
        input.acceptToken(StringBlockContent);
      }
      break
    } else if (next == singlequote) {
      if (input.peek(1) == singlequote) {
        if (i == 0) {
          // end of string
          input.advance(2);
          input.acceptToken(stringBlockEnd);
          break
        }
        if (input.peek(2) == dollar && input.peek(3) == braceL) {
          input.advance(2);
        }
        else {
          input.acceptToken(StringBlockContent);
          // do not advance. '' is needed for stringBlockEnd token
          break
        }
      }
    } else if (next == braceL && afterDollar) {
      if (i == 1) {
        input.acceptToken(stringBlockInterpolationStart, 1);
      }
      else {
        input.acceptToken(StringBlockContent, -1);
      }
      break
    } else if (next == newline && i > 0) {
      // Break up stringBlock strings on lines, to avoid huge tokens
      input.advance(); // add newline to current token
      input.acceptToken(StringBlockContent);
      break
    }
    afterDollar = next == dollar;
    input.advance();
  }
});

// based on javascript template parser
// https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
const string = new ExternalTokenizer(input => {
  for (let afterDollar = false, i = 0;; i++) {
    let {next} = input;
    if (next < 0) {
      if (i) input.acceptToken(StringContent);
      break
    } else if (next == doublequote) {
      if (i) input.acceptToken(StringContent);
      else input.acceptToken(stringEnd, 1);
      break
    } else if (next == braceL && afterDollar) {
      if (i == 1) input.acceptToken(stringInterpolationStart, 1);
      else input.acceptToken(StringContent, -1);
      break
    } else if (next == newline && i) {
      // Break up template strings on lines, to avoid huge tokens
      input.advance();
      input.acceptToken(StringContent);
      break
    } else if (next == backslash) {
      input.advance();
    }
    afterDollar = next == dollar;
    input.advance();
  }
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_Identifier = {__proto__:null,assert:180, with:184, let:186, inherit:206, in:214, if:218, then:220, else:222, __curPos:264, true:424, false:426, null:428, rec:438, or:444};
const parser = LRParser.deserialize({
  version: 13,
  states: "KhQ]QSOOO/UQWO'#DZO/rOPO'#EaO/}QSO'#CtO/}QSO'#CuO7aQWO'#ElOOQO'#FV'#FVOOQO'#D['#D[OOQO'#D]'#D]OOQO'#D^'#D^O7wOQO'#G{OOQO'#Dc'#DcOOQO'#HO'#HOOOQO'#Dj'#DjO]QSO'#DlO>[QSO'#DoOOQO'#FT'#FTOOQO'#FS'#FSOEmQWO'#FSOFWQWO'#EpOOQO'#FR'#FROOQO'#Ep'#EpOOQO'#El'#ElOOQO'#EP'#EPQOQSOOOGpQSO'#DnOOQO'#DY'#DYOOQO'#D_'#D_OOQO'#D`'#D`OOQO'#Da'#DaOOQO'#De'#DeO]QSO'#CjO]QSO'#CkOH[QSO'#ClO]QSO'#CsOOQO'#Db'#DbOHmQSO'#DmO]QSO,58|OHrQSO,59TO]QSO'#CoOOOP'#Ds'#DsOHwOPO,5:{OOQO,5:{,5:{OItQWO,59`OOQO'#DZ'#DZOJnQSO'#DnOLQQWO,59aO/}QSO,59bO/}QSO,59cO/}QSO,59dO/}QSO,59eO/}QSO,59fO/}QSO,59gO/}QSO,59hO/}QSO,59iO/}QSO,59jO/}QSO,59kO/}QSO,59mO/}QSO,59nO/}QSO,59oO/}QSO,59pO/}QSO,59qOLkQSO,59lOLvQSO'#DdOOOQ'#Dv'#DvO!%bOQO,5=gOOQO,5=g,5=gO!%mQSO,5:WOOQO,5:Z,5:ZO!%rQSO,5:ZOLkQSO,59sOOQO,59r,59rO!%yQ`O'#CfOOQO'#ES'#ESO!&[QSO'#DqO!&dQSO'#CeO!&dQSO'#CeOOQO'#Ce'#CeO!&lQSO'#CpOOQO'#E`'#E`O!-WQ`O'#E_OOQO'#Dr'#DrO!-`QSO'#E^O!-tQSO,59OO!-yQSO'#CmO!.OQSO,5:YOOQO'#Cn'#CnO!.TQSO'#CqO!.fQSO,59UO!.kQSO,59VO!.pQSO,59WO!.uQSO,59_OJnQSO,5:XOOQO1G.h1G.hO!.zQSO1G.oO!/YQWO,59ZOOOP-E7q-E7qOOQO1G0g1G0gO!0SQWO1G.|O!0yQWO1G.}O!2_QWO1G/OO!3yQWO1G/PO!5eQWO1G/QO!7PQWO1G/RO!7|QWO1G/SO!8sQWO1G/TO!9jQWO1G/UO!:oQWO1G/VO!<aQWO1G/XOOQO1G/Y1G/YO!>RQWO1G/ZO!?mQWO1G/[O!AXQWO1G/]O!IYQWO'#E_OOQO1G/W1G/WO!IsQpO'#DZO!KUQpO'#ElO!K]QpO,5:OO!KbQpO'#FSO!KlQpO'#EpOOOQ-E7t-E7tOOQO1G3R1G3ROOQO1G/r1G/rOOQO'#Dw'#DwO!LuQSO1G/uOOQO1G/u1G/uO#&WQWO1G/_O!&lQSO,59RO#&qQSO'#DtO#&|Q`O,5:yO#'UQSO'#CfOOQO,5:],5:]OOQO,59P,59PO#'aQSO,59POOQO-E7o-E7oO#'iQSO,59PO#'qQ!bO'#DZO#(RQSO,59[O#)[Q!bO'#ElO#)fQ!bO'#FSO#)sQ!bO'#EpOOQO-E7p-E7pO#+PQSO1G.jO]QSO,59XOOQO1G/t1G/tO#+XQSO'#EhOOQO'#Du'#DuO#+gQSO,59]O]QSO,59^O]QSO1G.pO]QSO1G.qO]QSO1G.rO]QSO1G.yO#+lQSO1G/sO#+qQSO7+$ZOOOP1G.u1G.uO#3WQWO,5:yO#3qQpO,59`O#4[QpO,59aOOOQ1G/j1G/jOOQO-E7u-E7uOOQO7+%a7+%aO8SQSO7+%bOOQO1G.m1G.mOOQO,5:`,5:`OOQO-E7r-E7rOOQO1G.k1G.kP#4fQSO'#DqO#4kQSO1G.kOOQO1G.v1G.vO#4sQ!bO,59`O#5aQ!bO,59aO]QSO7+$UO#5nQSO7+$YO#5sQSO1G.sOOQO-E7s-E7sOOQO1G.w1G.wO#5xQSO1G.xOOQO7+$[7+$[OOQO7+$]7+$]OOQO7+$^7+$^O#5}QSO7+$eOOQO7+%_7+%_O#6SQSO<<GuO#6|QpO1G.|O#7dQpO1G.}O#7zQpO1G/OO#8hQpO1G/PO#9UQpO1G/QO#9rQpO1G/RO#:`QpO1G/SO#:vQpO1G/TO#;^QpO1G/UO#;eQpO1G/VO#<RQpO1G/XO#<iQpO1G/ZO#<yQpO1G/[O#=ZQpO1G/]O#=kQpO'#E_O#=rQpO1G/_OOQO<<H|<<H|OOQO7+$V7+$VO#>qQ!bO1G.|O#?[Q!bO1G.}O#?uQ!bO1G/OO#@fQ!bO1G/PO#AVQ!bO1G/QO#AvQ!bO1G/RO#BgQ!bO1G/SO#CQQ!bO1G/TO#CkQ!bO1G/UO#CuQ!bO1G/VO#DfQ!bO1G/XO#EPQ!bO1G/ZO#EdQ!bO1G/[O#EwQ!bO1G/]O#F[Q!bO'#E_O#FfQ!bO1G/_OOQO<<Gp<<GpO#FsQSO<<GtOOQO7+$_7+$_O#FxQSO7+$dO]QSO<<HPO]QSOAN=aO#GWQpO,5:yO#G_Q!bO,5:yO]QSOAN=`O#GiQSO<<HOOOQOAN=kAN=kOOQOG22{G22{OOQOG22zG22zOOQOAN=jAN=jO#GnQSO'#CtO#GxQSO'#CtO#GnQSO'#CuO#GxQSO'#CuOLvQSO,58|O!&lQSO,58|O#GnQSO,59bO#GxQSO,59bO#GnQSO,59cO#GxQSO,59cO#GnQSO,59dO#GxQSO,59dO#GnQSO,59eO#GxQSO,59eO#GnQSO,59fO#GxQSO,59fO#GnQSO,59gO#GxQSO,59gO#GnQSO,59hO#GxQSO,59hO#GnQSO,59iO#GxQSO,59iO#GnQSO,59jO#GxQSO,59jO#GnQSO,59kO#GxQSO,59kO#GnQSO,59mO#GxQSO,59mO#GnQSO,59nO#GxQSO,59nO#GnQSO,59oO#GxQSO,59oO#GnQSO,59pO#GxQSO,59pO#GnQSO,59qO#GxQSO,59qO#HSQSO,59lO#H_QSO,59lO#HSQSO,59sO#H_QSO,59sOLvQSO1G.pO!&lQSO1G.pOLvQSO1G.qO!&lQSO1G.qOLvQSO1G.rO!&lQSO1G.rO8SQSO7+%bO8SQSO7+%bOLvQSO7+$UO!&lQSO7+$UOLvQSO<<HPO!&lQSO<<HPOLvQSOAN=aO!&lQSOAN=aOLvQSOAN=`O!&lQSOAN=`O#HjQSO,59UO#HoQSO,59UO#HtQSO,59VO#HyQSO,59VO#IOQSO,59WO#ITQSO,59WO#IYQSO1G.jO#IbQSO1G.jO#IjQSO7+$eO#IoQSO7+$eO#ItQSO<<GuO#IyQSO<<GuO#JOQSO<<GtO#JTQSO<<GtO]QSO'#CjO]QSO'#CjO]QSO'#CkO]QSO'#CkOH[QSO'#ClOH[QSO'#ClO#JYQSO,59OO#J_QSO,59OO]QSO1G.yO]QSO1G.yO#JdQSO7+$ZO#JiQSO7+$ZO#JnQSO7+$YO#JsQSO7+$YOGpQSO'#DnOGpQSO'#DnO#JxQSO,59_O#J}QSO,59_O!.zQSO1G.oO!.zQSO1G.oO]QSO'#CsO]QSO'#CsO#KSQSO,59TO#KXQSO,59T",
  stateData: "#K`~O!rOSROSSOS~OVPO!Y[O!Z[O![[O!][O!_]O!uiO!|oO#OpO#PqO#UQO#]^O#arO#eRO#fSO#xjO#zUO#{UO#|UO#}UO$OUO$PUO$QUO$RUO$SUO$TUO$UUO$VUO$WUO$XUO$YUO$ZUO$[UO$]UO$^UO$_UO$`UO$aUO$bUO$cUO$dUO$eUO$fUO$gUO$hUO$iUO$jUO$kUO$lUO$mUO$nUO$oUO$pUO$qUO$rUO$sUO$tUO$uUO$vUO$wUO$xUO$yUO$zUO${UO$|UO$}UO%OUO%PUO%QUO%RUO%SUO%TUO%UUO%VUO%WUO%XUO%YUO%ZUO%[UO%]UO%^UO%_UO%`UO%aUO%bUO%cUO%dUO%eUO%fUO%gUO%hUO%iUO%jWO%kXO%lkO%mlO%nmO%pYO%stO%t_O~OV}X!Y}X!Z}X![}X!]}X!_}X!u}X!w}X#U}X#X}X#]}X#f}X#g}X#h}X#i}X#j}X#k}X#l}X#m}X#n}X#o}X#p}X#q}X#r}X#s}X#t}X#x}X#z}X#{}X#|}X#}}X$O}X$P}X$Q}X$R}X$S}X$T}X$U}X$V}X$W}X$X}X$Y}X$Z}X$[}X$]}X$^}X$_}X$`}X$a}X$b}X$c}X$d}X$e}X$f}X$g}X$h}X$i}X$j}X$k}X$l}X$m}X$n}X$o}X$p}X$q}X$r}X$s}X$t}X$u}X$v}X$w}X$x}X$y}X$z}X${}X$|}X$}}X%O}X%P}X%Q}X%R}X%S}X%T}X%U}X%V}X%W}X%X}X%Y}X%Z}X%[}X%]}X%^}X%_}X%`}X%a}X%b}X%c}X%d}X%e}X%f}X%g}X%h}X%i}X%j}X%k}X%l}X%m}X%n}X%p}X%s}X%t}X~O!tuO!{vO!l}X#^}X!}}X#b}X#V}X#c}X~P'wOPxO!mwO!nzO~OV|O!Y[O!Z[O![[O!][O!_]O!u}O#UQO#]^O#eRO#fSO#xjO#zUO#{UO#|UO#}UO$OUO$PUO$QUO$RUO$SUO$TUO$UUO$VUO$WUO$XUO$YUO$ZUO$[UO$]UO$^UO$_UO$`UO$aUO$bUO$cUO$dUO$eUO$fUO$gUO$hUO$iUO$jUO$kUO$lUO$mUO$nUO$oUO$pUO$qUO$rUO$sUO$tUO$uUO$vUO$wUO$xUO$yUO$zUO${UO$|UO$}UO%OUO%PUO%QUO%RUO%SUO%TUO%UUO%VUO%WUO%XUO%YUO%ZUO%[UO%]UO%^UO%_UO%`UO%aUO%bUO%cUO%dUO%eUO%fUO%gUO%hUO%iUO%jWO%kXO%lkO%mlO%nmO%pYO%stO%t_O~O!w!`O#f![O#g!PO#h!QO#i!RO#j!SO#k!TO#l!UO#m!VO#n!WO#o!XO#p!YO#q!ZO#r!]O#s!^O#t!_O~O!l#`X#^#`X!}#`X#b#`X#V#`X#c#`X~P6]OQ!bO!o!aO!p!dO~OV|O!Y[O!Z[O![[O!][O!_]O!u}O#UQO#]^O#xjO#zUO#{UO#|UO#}UO$OUO$PUO$QUO$RUO$SUO$TUO$UUO$VUO$WUO$XUO$YUO$ZUO$[UO$]UO$^UO$_UO$`UO$aUO$bUO$cUO$dUO$eUO$fUO$gUO$hUO$iUO$jUO$kUO$lUO$mUO$nUO$oUO$pUO$qUO$rUO$sUO$tUO$uUO$vUO$wUO$xUO$yUO$zUO${UO$|UO$}UO%OUO%PUO%QUO%RUO%SUO%TUO%UUO%VUO%WUO%XUO%YUO%ZUO%[UO%]UO%^UO%_UO%`UO%aUO%bUO%cUO%dUO%eUO%fUO%gUO%hUO%iUO%jWO%kXO%lkO%mlO%nmO%pYO%stO%t_O~O%u!fO~P8SOV#vX!Y#vX!Z#vX![#vX!]#vX!_#vX!u#vX!w#vX#U#vX#]#vX#f#vX#g#vX#h#vX#i#vX#j#vX#k#vX#l#vX#m#vX#n#vX#o#vX#p#vX#q#vX#r#vX#s#vX#t#vX#x#vX#z#vX#{#vX#|#vX#}#vX$O#vX$P#vX$Q#vX$R#vX$S#vX$T#vX$U#vX$V#vX$W#vX$X#vX$Y#vX$Z#vX$[#vX$]#vX$^#vX$_#vX$`#vX$a#vX$b#vX$c#vX$d#vX$e#vX$f#vX$g#vX$h#vX$i#vX$j#vX$k#vX$l#vX$m#vX$n#vX$o#vX$p#vX$q#vX$r#vX$s#vX$t#vX$u#vX$v#vX$w#vX$x#vX$y#vX$z#vX${#vX$|#vX$}#vX%O#vX%P#vX%Q#vX%R#vX%S#vX%T#vX%U#vX%V#vX%W#vX%X#vX%Y#vX%Z#vX%[#vX%]#vX%^#vX%_#vX%`#vX%a#vX%b#vX%c#vX%d#vX%e#vX%f#vX%g#vX%h#vX%i#vX%j#vX%k#vX%l#vX%m#vX%n#vX%p#vX%s#vX%t#vX~O#X!hO!l#vX#^#vX!}#vX#b#vX#V#vX#c#vX~P>cO!l#dX!w#dX#f#dX#g#dX#h#dX#i#dX#j#dX#k#dX#l#dX#m#dX#n#dX#o#dX#p#dX#q#dX#r#dX#s#dX#t#dX#^#dX!}#dX#b#dX#V#dX#c#dX~P8SOV!jO!x!lO!y!oO#UQO#W!pO#Z!yO!zXP!z#QP~OV!rO#UQO#W!pO#Z!yO#_#QP~O!u#OO~O!u#QO~OPxO!mwO!n#TO~O#gha#hha#iha#jha#kha#lha#mha#nha#oha#pha~O!w!`O#f![O#q!ZO#r!]O#s!^O#t!_O!lha#^ha!}ha#bha#Vha#cha~PISOV!rO#UQO#W!pO#Z!yO!z#QP~O!wia#gia#hia#iia#jia#kia#lia#mia#nia#oia#pia#qia#ria#sia#tia~O#f![O!lia#^ia!}ia#bia#Via#cia~PKPOV#eO#UQO#W!pO~OV#gO!Y[O!Z[O![[O!][O!_]O!u'xO!|'jO#O'lO#P'nO#UQO#]^O#a(OO#e&QO#f&SO#xjO#zUO#{UO#|UO#}UO$OUO$PUO$QUO$RUO$SUO$TUO$UUO$VUO$WUO$XUO$YUO$ZUO$[UO$]UO$^UO$_UO$`UO$aUO$bUO$cUO$dUO$eUO$fUO$gUO$hUO$iUO$jUO$kUO$lUO$mUO$nUO$oUO$pUO$qUO$rUO$sUO$tUO$uUO$vUO$wUO$xUO$yUO$zUO${UO$|UO$}UO%OUO%PUO%QUO%RUO%SUO%TUO%UUO%VUO%WUO%XUO%YUO%ZUO%[UO%]UO%^UO%_UO%`UO%aUO%bUO%cUO%dUO%eUO%fUO%gUO%hUO%iUO%jWO%kXO%lkO%mlO%nmO%pYO%stO%t_O~OQ!bO!o!aO!p#mO~O#^#nO~O%u#qO~P8SO!w#sO#X#tO!xYX!zYX#Y#RX~OV#vO!y#xO~O!x#yO!zXX~OV#|O!Y[O!Z[O![[O!][O!_]O!u'yO!|'kO#O'mO#P'oO#UQO#]^O#a(PO#e&RO#f&TO#xjO#zUO#{UO#|UO#}UO$OUO$PUO$QUO$RUO$SUO$TUO$UUO$VUO$WUO$XUO$YUO$ZUO$[UO$]UO$^UO$_UO$`UO$aUO$bUO$cUO$dUO$eUO$fUO$gUO$hUO$iUO$jUO$kUO$lUO$mUO$nUO$oUO$pUO$qUO$rUO$sUO$tUO$uUO$vUO$wUO$xUO$yUO$zUO${UO$|UO$}UO%OUO%PUO%QUO%RUO%SUO%TUO%UUO%VUO%WUO%XUO%YUO%ZUO%[UO%]UO%^UO%_UO%`UO%aUO%bUO%cUO%dUO%eUO%fUO%gUO%hUO%iUO%jWO%kXO%lkO%mlO%nmO%pYO%stO%t_O~O#X#tO#Y#RX~OV!rO#UQO#W!pO#Z!yO!z#QX#_#QX~O!z$SO~O#Y$TO~O!z$UO~OV#eO#UQO#W!pO#]$YO!}#[P~O!}$ZO~O!}$[O~O#_$]O~O#b$^O~OV#vO!x!lO!y!oO!zXP~O#V$aO~O!w!`O#f![O#i!RO#j!SO#k!TO#l!UO#p!YO#q!ZO#r!]O#s!^O#t!_O~O!lji#gji#hji#mji#nji#oji#^ji!}ji#bji#Vji#cji~P!/_O!lki#gki#hki#mki#nki#oki#^ki!}ki#bki#Vki#cki~P!/_O#gli#hli#ili#jli#kli#lli#mli#nli#oli~O!w!`O#f![O#p!YO#q!ZO#r!]O#s!^O#t!_O!lli#^li!}li#bli#Vli#cli~P!1pO#gmi#hmi#imi#jmi#kmi#lmi#mmi#nmi#omi~O!w!`O#f![O#p!YO#q!ZO#r!]O#s!^O#t!_O!lmi#^mi!}mi#bmi#Vmi#cmi~P!3[O#gni#hni#ini#jni#kni#lni#mni#nni#oni~O!w!`O#f![O#p!YO#q!ZO#r!]O#s!^O#t!_O!lni#^ni!}ni#bni#Vni#cni~P!4vO#goi#hoi#ioi#joi#koi#loi#moi#noi#ooi~O!w!`O#f![O#p!YO#q!ZO#r!]O#s!^O#t!_O!loi#^oi!}oi#boi#Voi#coi~P!6bO#g!PO#h!QO!lpi#mpi#npi#opi#^pi!}pi#bpi#Vpi#cpi~P!/_O#g!PO#h!QO#m!VO!lqi#nqi#oqi#^qi!}qi#bqi#Vqi#cqi~P!/_O!lri#^ri!}ri#bri#Vri#cri~P6]O#gsi#hsi#isi#jsi#ksi#lsi#msi#nsi#osi~O!w!`O#f![O#p!YO#q!ZO#r!]O#s!^O#t!_O!lsi#^si!}si#bsi#Vsi#csi~P!:QO#gui#hui#iui#jui#kui#lui#mui#nui#oui#pui#qui~O!w!`O#f![O#r!]O#s!^O#t!_O!lui#^ui!}ui#bui#Vui#cui~P!;lO#gwi#hwi#iwi#jwi#kwi#lwi#mwi#nwi#owi#pwi#qwi#rwi#swi~O!w!`O#f![O#t!_O!lwi#^wi!}wi#bwi#Vwi#cwi~P!=WO#gxi#hxi#ixi#jxi#kxi#lxi#mxi#nxi#oxi#pxi#qxi#rxi#sxi~O!w!`O#f![O#t!_O!lxi#^xi!}xi#bxi#Vxi#cxi~P!>rO#gyi#hyi#iyi#jyi#kyi#lyi#myi#nyi#oyi#pyi#qyi#ryi#syi~O!w!`O#f![O#t!_O!lyi#^yi!}yi#byi#Vyi#cyi~P!@^O#X#tO!w#RX#f#RX#g#RX#h#RX#i#RX#j#RX#k#RX#l#RX#m#RX#n#RX#o#RX#p#RX#q#RX#r#RX#s#RX#t#RXV#RX!Y#RX!Z#RX![#RX!]#RX!_#RX!u#RX#U#RX#]#RX#x#RX#z#RX#{#RX#|#RX#}#RX$O#RX$P#RX$Q#RX$R#RX$S#RX$T#RX$U#RX$V#RX$W#RX$X#RX$Y#RX$Z#RX$[#RX$]#RX$^#RX$_#RX$`#RX$a#RX$b#RX$c#RX$d#RX$e#RX$f#RX$g#RX$h#RX$i#RX$j#RX$k#RX$l#RX$m#RX$n#RX$o#RX$p#RX$q#RX$r#RX$s#RX$t#RX$u#RX$v#RX$w#RX$x#RX$y#RX$z#RX${#RX$|#RX$}#RX%O#RX%P#RX%Q#RX%R#RX%S#RX%T#RX%U#RX%V#RX%W#RX%X#RX%Y#RX%Z#RX%[#RX%]#RX%^#RX%_#RX%`#RX%a#RX%b#RX%c#RX%d#RX%e#RX%f#RX%g#RX%h#RX%i#RX%j#RX%k#RX%l#RX%m#RX%n#RX%p#RX%s#RX%t#RX%v#RX~O!l#RX!}#RX#W#RX#^#RX#b#RX#V#RX#c#RX~P!AxO!t&UO!{(QO%q}X~P'wO!w&vO#f&nO#g&WO#h&YO#i&[O#j&^O#k&`O#l&bO#m&dO#n&fO#o&hO#p&jO#q&lO#r&pO#s&rO#t&tO~O%q#`X~P!JQO%q$eO~O#X&xO%q#vX~P>cO!w#dX#f#dX#g#dX#h#dX#i#dX#j#dX#k#dX#l#dX#m#dX#n#dX#o#dX#p#dX#q#dX#r#dX#s#dX#t#dX%q#dX~P8SO%u$gO~P8SOV{i!Y{i!Z{i![{i!]{i!_{i!u{i!w{i#U{i#]{i#f{i#g{i#h{i#i{i#j{i#k{i#l{i#m{i#n{i#o{i#p{i#q{i#r{i#s{i#t{i#x{i#z{i#{{i#|{i#}{i$O{i$P{i$Q{i$R{i$S{i$T{i$U{i$V{i$W{i$X{i$Y{i$Z{i$[{i$]{i$^{i$_{i$`{i$a{i$b{i$c{i$d{i$e{i$f{i$g{i$h{i$i{i$j{i$k{i$l{i$m{i$n{i$o{i$p{i$q{i$r{i$s{i$t{i$u{i$v{i$w{i$x{i$y{i$z{i${{i$|{i$}{i%O{i%P{i%Q{i%R{i%S{i%T{i%U{i%V{i%W{i%X{i%Y{i%Z{i%[{i%]{i%^{i%_{i%`{i%a{i%b{i%c{i%d{i%e{i%f{i%g{i%h{i%i{i%j{i%k{i%l{i%m{i%n{i%p{i%s{i%t{i~O%v$hO!l{i#^{i!}{i#b{i#V{i#c{i~P!L|OV$jO#UQO#W!pO~O#X#tO#Y#Ra~O!w#sO!xYX!zYX~OV#vO!y$lO~O!x$nO!zXa~O!t&VO!{(RO!z}X!x}X~P'wO!z$oO~O!w&wO#f&oO#g&XO#h&ZO#i&]O#j&_O#k&aO#l&cO#m&eO#n&gO#o&iO#p&kO#q&mO#r&qO#s&sO#t&uO~O!z#`X!x#`X~P#(WO#X&yO!z#vX!x#vX~P>cO!w#dX!z#dX#f#dX#g#dX#h#dX#i#dX#j#dX#k#dX#l#dX#m#dX#n#dX#o#dX#p#dX#q#dX#r#dX#s#dX#t#dX!x#dX~P8SO!t$rO!{$sO~OV#eO#UQO#W!pO!}#[X~O!}$vO~O!z$|O~O!z$}O~O#X#tO!w#Ra#f#Ra#g#Ra#h#Ra#i#Ra#j#Ra#k#Ra#l#Ra#m#Ra#n#Ra#o#Ra#p#Ra#q#Ra#r#Ra#s#Ra#t#RaV#Ra!Y#Ra!Z#Ra![#Ra!]#Ra!_#Ra!u#Ra#U#Ra#]#Ra#x#Ra#z#Ra#{#Ra#|#Ra#}#Ra$O#Ra$P#Ra$Q#Ra$R#Ra$S#Ra$T#Ra$U#Ra$V#Ra$W#Ra$X#Ra$Y#Ra$Z#Ra$[#Ra$]#Ra$^#Ra$_#Ra$`#Ra$a#Ra$b#Ra$c#Ra$d#Ra$e#Ra$f#Ra$g#Ra$h#Ra$i#Ra$j#Ra$k#Ra$l#Ra$m#Ra$n#Ra$o#Ra$p#Ra$q#Ra$r#Ra$s#Ra$t#Ra$u#Ra$v#Ra$w#Ra$x#Ra$y#Ra$z#Ra${#Ra$|#Ra$}#Ra%O#Ra%P#Ra%Q#Ra%R#Ra%S#Ra%T#Ra%U#Ra%V#Ra%W#Ra%X#Ra%Y#Ra%Z#Ra%[#Ra%]#Ra%^#Ra%_#Ra%`#Ra%a#Ra%b#Ra%c#Ra%d#Ra%e#Ra%f#Ra%g#Ra%h#Ra%i#Ra%j#Ra%k#Ra%l#Ra%m#Ra%n#Ra%p#Ra%s#Ra%t#Ra%v#Ra~O!l#Ra!}#Ra#W#Ra#^#Ra#b#Ra#V#Ra#c#Ra~P#+vO!w&vO#f&nO#q&lO#r&pO#s&rO#t&tO%qha~PISO#f&nO%qia~PKPOV#vO~OV#vO!y%aO~O!w&wO#f&oO#q&mO#r&qO#s&sO#t&uO!zha!xha~PISO#f&oO!zia!xia~PKPOV%sO~O!}%tO~O#^%uO~O#c%vO~O!t%wO~O!w&vO#f&nO#i&[O#j&^O#k&`O#l&bO#p&jO#q&lO#r&pO#s&rO#t&tO~O#gji#hji#mji#nji#oji%qji~P#6XO#gki#hki#mki#nki#oki%qki~P#6XO!w&vO#f&nO#p&jO#q&lO#r&pO#s&rO#t&tO%qli~P!1pO!w&vO#f&nO#p&jO#q&lO#r&pO#s&rO#t&tO%qmi~P!3[O!w&vO#f&nO#p&jO#q&lO#r&pO#s&rO#t&tO%qni~P!4vO!w&vO#f&nO#p&jO#q&lO#r&pO#s&rO#t&tO%qoi~P!6bO#g&WO#h&YO#mpi#npi#opi%qpi~P#6XO#g&WO#h&YO#m&dO#nqi#oqi%qqi~P#6XO%qri~P!JQO!w&vO#f&nO#p&jO#q&lO#r&pO#s&rO#t&tO%qsi~P!:QO!w&vO#f&nO#r&pO#s&rO#t&tO%qui~P!;lO!w&vO#f&nO#t&tO%qwi~P!=WO!w&vO#f&nO#t&tO%qxi~P!>rO!w&vO#f&nO#t&tO%qyi~P!@^O%q#RX~P!AxO%v'QO%q{i~P!L|O!w&wO#f&oO#i&]O#j&_O#k&aO#l&cO#p&kO#q&mO#r&qO#s&sO#t&uO~O!zji#gji#hji#mji#nji#oji!xji~P#=|O!zki#gki#hki#mki#nki#oki!xki~P#=|O!w&wO#f&oO#p&kO#q&mO#r&qO#s&sO#t&uO!zli!xli~P!1pO!w&wO#f&oO#p&kO#q&mO#r&qO#s&sO#t&uO!zmi!xmi~P!3[O!w&wO#f&oO#p&kO#q&mO#r&qO#s&sO#t&uO!zni!xni~P!4vO!w&wO#f&oO#p&kO#q&mO#r&qO#s&sO#t&uO!zoi!xoi~P!6bO#g&XO#h&ZO!zpi#mpi#npi#opi!xpi~P#=|O#g&XO#h&ZO#m&eO!zqi#nqi#oqi!xqi~P#=|O!zri!xri~P#(WO!w&wO#f&oO#p&kO#q&mO#r&qO#s&sO#t&uO!zsi!xsi~P!:QO!w&wO#f&oO#r&qO#s&sO#t&uO!zui!xui~P!;lO!w&wO#f&oO#t&uO!zwi!xwi~P!=WO!w&wO#f&oO#t&uO!zxi!xxi~P!>rO!w&wO#f&oO#t&uO!zyi!xyi~P!@^O!z#RX!x#RX~P!AxO%v'RO!z{i!x{i~P!L|O!t%zO~OV#eO#UQO#W!pO!}#[P~O%q#Ra~P#+vO!z#Ra!x#Ra~P#+vO!}&PO~O#e&QO#f&SO~P8SO#e&RO#f&TO~P8SOV%^O#UQO#W!pO~OV%pO#UQO#W!pO~O!}&zO~O!}&{O~O!}&|O~O!}&}O~O#_'OO~O#_'PO~O!t'SO!{'vO~O!t'TO!{'wO~O#c'UO~O#c'VO~O!t'WO~O!t'XO~O!t'YO~O!t'ZO~O!z'bO~O!z'cO~O!z'fO~O!z'gO~OV'hO~OV'iO~O#b'rO~O#b'sO~O!u'|O~O!u'}O~O#X~",
  goto: "Lz%sPPPPPP%tP%t&t'W'W%t%t%t%t%t'd'o(U'o'd'd(Y)Y)Y)Y)Y)Y)Y)Y)Y)Y)Y)Y)Y)Y)Y)Y)Y)Y)Y+_-d/o/o/o/o/o/o/o/o/o/o1}/oPPPP/oP/o/o/o/o-d2R2b2o2u3Y3a3gPPPPPPP3mPP5uPPPPPPPPP6T6g7V7tPPPPPP:iPPP%tPPP:oPPPPPPPPPPPPPPPP?OAXChPFOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPH^PPJl!{gO^opruw!a!p#s$T$Y$Z$[$]$^$r%v%w%z&U&V&z&{&|&}'O'P'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(PQ!uiQ$`#QQ'p'xQ'q'yQ't'|R'u'}e!ki!l#Q#y$m$n'x'y'|'}c!siq}!t#O'n'o'x'yw!qiq}!`!h!t!y#O#t$V%u&v&w&x&y'n'o'x'yTxQy!{fO^opruw!a!p#s$T$Y$Z$[$]$^$r%v%w%z&U&V&z&{&|&}'O'P'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(P%VeORS^opruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_!a!p#s$T$Y$Z$[$]$^$r%v%w%z&Q&R&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&z&{&|&}'O'P'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(P%VdORS^opruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_!a!p#s$T$Y$Z$[$]$^$r%v%w%z&Q&R&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&z&{&|&}'O'P'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(P%caORS^copruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_!a!p#k#s$Q$T$Y$Z$[$]$^$h$r%v%w%z&Q&R&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&z&{&|&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(P%i`ORS^_copruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_!a!g!p#k#p#s$Q$T$Y$Z$[$]$^$h$r%v%w%z&Q&R&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&z&{&|&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(PT!bY!c[!mi#Q'x'y'|'}S#z!m#{R#{!n`!tiq}#O'n'o'x'yR$R!tQyQR#SyS#u!j!rQ$b#eW$k#u$b%x%yQ%x%^R%y%pS$V!y%uR$u$VQ!cYR#l!cQ#p!gR$f#pQhOQ!e^Q!zoQ!{pQ!}rU#Pu&U&VQ#RwQ#i!aQ#}!pQ$i#sQ$t$TQ$w$YU$x$Z&z&{U$y$[&|&}U$z$]'O'PQ${$^U%r$r'S'TU%|%v'U'VU%}%w'W'XU&O%z'Y'ZQ'['jQ']'kQ'^'lQ'_'mQ'd'rQ'e'sQ'z(OR'{(P[!ni#Q'x'y'|'}X#w!l#y$m$nW!wi}'x'yQ!|qQ$_#OQ'`'nR'a'ob!viq}!t#O'n'o'x'yU#f!`&v&wQ#r!hU$W!y$V%uQ%_&xR%q&yb!riq}!t#O'n'o'x'yY#e!`!h!y$V%uQ$j#tS%^&v&xT%p&w&y%hsORS^_copruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_!a!g!p#k#p#s$Q$T$Y$Z$[$]$^$h$r%v%w%z&Q&R&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&z&{&|&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(Pw!xiq}!`!h!t!y#O#t$V%u&v&w&x&y'n'o'x'yQ$X!yR%{%u!STO^opruw$T$Y$Z$[$]$^$r%v%w%z'j'k'l'm'r's(O(PQ{RQ!OSQ#U!PQ#V!QQ#W!RQ#X!SQ#Y!TQ#Z!UQ#[!VQ#]!WQ#^!XQ#_!YQ#`!ZU#a![&n&oQ#b!]Q#c!^Q#d!_b#h!a&U&z&|'O'S'U'W'Yd$O!p#s&V&{&}'P'T'V'X'ZQ$c&QQ$d&SQ$p&RQ$q&TQ%O&WQ%P&YQ%Q&[Q%R&^Q%S&`Q%T&bQ%U&dQ%V&fQ%W&hQ%X&jQ%Y&lQ%Z&pQ%[&rQ%]&tQ%b&XQ%c&ZQ%d&]Q%e&_Q%f&aQ%g&cQ%h&eQ%i&gQ%j&iQ%k&kQ%l&mQ%m&qQ%n&sR%o&u!vcORS^opruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_$T$Y$Z$[$]$^$r%v%w%z'j'k'l'm'r's(O(P!U#k!a&Q&S&U&W&Y&[&^&`&b&d&f&h&j&l&n&p&r&t&z&|'O'S'U'W'Y!X$Q!p#s&R&T&V&X&Z&]&_&a&c&e&g&i&k&m&o&q&s&u&{&}'P'T'V'X'Z%UdORS^opruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_!a!p#s$T$Y$Z$[$]$^$r%v%w%z&Q&R&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&z&{&|&}'O'P'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(PU!ic#k$QV%`$h'Q'R!zbORS^copruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_$T$Y$Z$[$]$^$h$r%v%w%z'j'k'l'm'r's(O(PQ!g_!Y#j!a#k&Q&S&U&W&Y&[&^&`&b&d&f&h&j&l&n&p&r&t&z&|'O'Q'S'U'W'YS#o!g#p!]$P!p#s$Q&R&T&V&X&Z&]&_&a&c&e&g&i&k&m&o&q&s&u&{&}'P'R'T'V'X'Z%iVORS^_copruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_!a!g!p#k#p#s$Q$T$Y$Z$[$]$^$h$r%v%w%z&Q&R&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&z&{&|&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(P%iZORS^_copruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_!a!g!p#k#p#s$Q$T$Y$Z$[$]$^$h$r%v%w%z&Q&R&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&z&{&|&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(P%inORS^_copruw!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!_!a!g!p#k#p#s$Q$T$Y$Z$[$]$^$h$r%v%w%z&Q&R&S&T&U&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&z&{&|&}'O'P'Q'R'S'T'U'V'W'X'Y'Z'j'k'l'm'r's(O(P",
  nodeNames: "⚠ StringContent StringBlockContent Comment CommentBlock Nix Lambda Identifier Lambda Formals Formal Formal Lambda Lambda Assert With Let Attr String StringInterpolation AttrInterpolation AttrInherit AttrInheritFrom If OpNot CallNeg OpEq OpNEq CallLT CallLE CallGT CallGE OpAnd OpOr OpImpl OpUpdate OpHasAttr ConcatStrings CallSub CallMul CallDiv OpConcatLists Call Select Pos Var Primop Int Float TRUE FALSE NULL String IndentedString StringBlockInterpolation Path PathAbsolute PathRelative PathLibrary PathHome String URI Parens RecAttrSet AttrSet List SelectOr",
  maxTerm: 222,
  skippedNodes: [0,3,4],
  repeatNodeCount: 7,
  tokenData: "!EQ~RyX^#rpq#rqr$grs$tst$ytu%Uvw%awx%lxy%wyz%|z{&R{|&W|}&e}!O&j!O!P&w!P!Q)U!Q![+j![!]+{!]!^,Q!^!_,V!_!`-z!`!a.X!a!b.f!b!c.k!c!}.p!}#O2d#P#Q2i#R#S2n#T#o.p#o#p!CZ#p#q!C`#q#r!Ck#r#s!Ct#y#z#r$f$g#r#BY#BZ#r$IS$I_#r$I|$JO#r$JT$JU#r$KV$KW#r&FU&FV#r~#wY!r~X^#rpq#r#y#z#r$f$g#r#BY#BZ#r$IS$I_#r$I|$JO#r$JT$JU#r$KV$KW#r&FU&FV#rk$lP#eP!_!`$oj$tO#hj~$yO#U~~%OQR~OY$yZ~$y~%XP#o#p%[~%aO#W~~%dPvw%g~%lO#m~~%oPwx%r~%wO%p~~%|O#]~~&RO#^~~&WO#r~~&]P#q~{|&`~&eO#t~~&jO!x~~&oP#f~!`!a&r~&wO#o~~&|R#Xn!O!P'V!P!Q'b!Q![(hP'YP!O!P']P'bO!yP~'eR!O!P'n!c!}(P#T#o(P~'sS!Z~!O!P'n!P!Q'b!c!}(P#T#o(P~(UU!Z~}!O(P!O!P'n!P!Q'b!Q![(P!c!}(P#T#o(P~(mR%k~!Q![(h!g!h(v#X#Y(v~(yP!Q![(|~)RP%k~!Q![(|~)ZT#s~z{)j!O!P*_!P!Q+e!c!}*|#T#o*|~)mROz)jz{)v{~)j~)yTOz)jz{)v{!P)j!P!Q*Y!Q~)j~*_OS~~*dS!Y~!O!P*_!P!Q*p!c!}*|#T#o*|~*sR!O!P*_!c!}*|#T#o*|~+RU!Y~}!O*|!O!P*_!P!Q*p!Q![*|!c!}*|#T#o*|~+jO#p~~+oQ%j~!O!P+u!Q![+j~+xP!Q![(h~,QO!t~~,VO!}~~,[S#i~!O!P,h!_!`-u!c!}-W#T#o-W~,kT!O!P,h!P!Q,z!`!a-p!c!}-W#T#o-W~,}R!O!P,h!c!}-W#T#o-W~-ZV}!O-W!O!P,h!P!Q,z!Q![-W!`!a-p!c!}-W#T#o-W~-uO![~~-zO#j~o.PP#YT!_!`.Sj.XO#gj~.^P#k~!_!`.a~.fO#l~~.kO!w~~.pO!{~~.uUV~{|/X}!O.p!Q![.p![!]/n!c!}.p#T#o.p~/[U{|/X}!O/X!Q![/X![!]/n!c!}/X#T#o/X~/qdqr1Ptu1Puv1Pvw1Pwx1Pz{1P{|1P|}1P}!O1P!O!P1P!P!Q1P!Q![1P![!]1P!_!`1P!a!b1P!b!c1P!c!}1P#R#S1P#T#o1P#r#s1P~1Ud!_~qr1Ptu1Puv1Pvw1Pwx1Pz{1P{|1P|}1P}!O1P!O!P1P!P!Q1P!Q![1P![!]1P!_!`1P!a!b1P!b!c1P!c!}1P#R#S1P#T#o1P#r#s1P~2iO%t~~2nO%u~~2qP#R#S2t~2wa#T#U3|#U#V8e#V#W9|#W#X@]#X#YAf#Y#ZB]#Z#[Hb#[#]Lq#]#^! j#`#a!(u#a#b!+r#d#e!-g#f#g!1O#g#h!4R#h#i!9|#i#j!?m#n#o!Ap~4PS#W#X4]#`#a6U#b#c6a#h#i6l~4`P#W#X4c~4hP%V~!g!h4k~4nP#f#g4q~4tP#f#g4w~4zP#c#d4}~5QP#f#g5T~5WP!e!f5Z~5^P#c#d5a~5dP#b#c5g~5jP#h#i5m~5pP#X#Y5s~5vP#l#m5y~5|P#h#i6P~6UO$S~~6XP#`#a6[~6aO%P~~6dP#m#n6g~6lO%O~~6oP#h#i6r~6uP#f#g6x~6{Q!p!q7R!x!y7p~7UP#T#U7X~7[P#a#b7_~7bP#X#Y7e~7hP#g#h7k~7pO$i~~7sP#T#U7v~7yP#`#a7|~8PP#i#j8S~8VP#X#Y8Y~8]P#g#h8`~8eO$j~~8hP#]#^8k~8nP#h#i8q~8tR!c!d8}!q!r9`!z!{9k~9QP#b#c9T~9WP#W#X9Z~9`O%Z~~9cP#f#g9f~9kO%[~~9nP#c#d9q~9tP#f#g9w~9|O%]~~:PR#T#U:Y#X#Y;T#c#d;f~:]P#h#i:`~:cP!c!d:f~:iP#h#i:l~:oP#h#i:r~:uP#f#g:x~:{P#g#h;O~;TO$q~~;WP#]#^;Z~;^P#`#a;a~;fO$T~~;iQ#a#b;o#b#c=`~;rP#d#e;u~;xP#T#U;{~<OP#f#g<R~<UP#X#Y<X~<[P!x!y<_~<bP#X#Y<e~<hP#f#g<k~<nP#g#h<q~<tP#]#^<w~<zP#c#d<}~=QP#b#c=T~=WP#g#h=Z~=`O%g~~=cP#V#W=f~=iP#T#U=l~=oP#h#i=r~=uR!n!o>O!o!p>m!u!v?O~>RP#]#^>U~>XP#g#h>[~>_P#h#i>b~>eP#g#h>h~>mO${~~>pP#T#U>s~>vP#d#e>y~?OO%U~~?RP#h#i?U~?XP#f#g?[~?_P#]#^?b~?eP#b#c?h~?kP#Z#[?n~?qP#g#h?t~?wP!u!v?z~?}P#X#Y@Q~@TP#d#e@W~@]O%d~~@`Q#X#Y@f#]#^AZ~@iP#X#Y@l~@oP#d#e@r~@uP!u!v@x~@{P#X#YAO~ARP#e#fAU~AZO$Y~~A^P#j#kAa~AfO%Y~~AiP#`#aAl~AoP#X#YAr~AuP#a#bAx~A}P$z~!c!dBQ~BTP#h#iBW~B]O$v~~B`T#]#^Bo#`#aD|#c#dEe#f#gFS#i#jF}~BrQ#`#aBx#b#cDX~B{P#h#iCO~CRP#X#YCU~CXP#f#gC[~CaP$y~!u!vCd~CgP#c#dCj~CmP#i#jCp~CsP#f#gCv~CyP#V#WC|~DPP#X#YDS~DXO$g~~D[P#W#XD_~DbP!h!iDe~DhP#]#^Dk~DnP#`#aDq~DtP#X#YDw~D|O$`~~EPP#c#dES~EVP#c#dEY~E]P#f#gE`~EeO$U~~EhP#`#aEk~EnP#W#XEq~EtP#`#aEw~EzPwxE}~FSO$}~~FVP#c#dFY~F]P#a#bF`~FcP!l!mFf~FiP!u!vFl~FoP!q!rFr~FuP!p!qFx~F}O$e~~GQP#b#cGT~GWP#V#WGZ~G^P#h#iGa~GdP#]#^Gg~GjP#c#dGm~GpP#b#cGs~GvP!c!dGy~G|P#f#gHP~HSP#Z#[HV~HYP#g#hH]~HbO$r~~HeQ#X#YHk#f#gK|~HnQ#b#cHt#h#iJy~HwQ!n!oH}#X#YIf~IQP#]#^IT~IWP#g#hIZ~I^P#h#iIa~IfO%Q~~IiP#f#gIl~IoP#]#^Ir~IuP#V#WIx~I{P!e!fJO~JRP#`#aJU~JXP#c#dJ[~J_P#g#hJb~JeP#i#jJh~JkP#f#gJn~JqP#X#YJt~JyO$R~~J|Q!c!dKS!g!hKk~KVP#h#iKY~K]P#h#iK`~KcP#f#gKf~KkO$k~~KnP#b#cKq~KtP#j#kKw~K|O$W~~LPP#c#dLS~LVP#i#jLY~L]P#d#eL`~LcP!d!eLf~LiP#m#nLl~LqO%T~~LtQ#T#ULz#X#Y! X~L}P#g#hMQ~MTQ!c!dMZ#[#]Mr~M^P#h#iMa~MdP#h#iMg~MjP#f#gMm~MrO$m~~MuQ!h!iM{!u!vNd~NOP#]#^NR~NUP#`#aNX~N[P#X#YN_~NdO$a~~NgP#h#iNj~NmP#f#gNp~NsP#]#^Nv~NyP#b#cN|~! PP#Z#[! S~! XO%a~~! [P#T#U! _~! bP#W#X! e~! jO$w~~! mQ#b#c! s#g#h!#d~! vP#h#i! y~! |P#X#Y!!P~!!SP#f#g!!V~!!YP#g#h!!]~!!`P#X#Y!!c~!!fP#V#W!!i~!!lP#h#i!!o~!!rP!c!d!!u~!!xP#h#i!!{~!#OP#h#i!#R~!#UP#f#g!#X~!#[P#g#h!#_~!#dO$p~~!#gV!c!d!#|!d!e!$k!h!i!%S!k!l!&o!n!o!'Q!r!s!'i!u!v!(Q~!$PP#h#i!$S~!$VP#h#i!$Y~!$]P#f#g!$`~!$cP#g#h!$f~!$kO$n~~!$nP#c#d!$q~!$tP#c#d!$w~!$zP#`#a!$}~!%SO$P~~!%VQ#`#a!%]#i#j!%t~!%`P#c#d!%c~!%fP#T#U!%i~!%lP#h#i!%o~!%tO#}~~!%wP#b#c!%z~!%}P#V#W!&Q~!&TP#h#i!&W~!&ZP#]#^!&^~!&aP#c#d!&d~!&gP#b#c!&j~!&oO#{~~!&rP#b#c!&u~!&xP#h#i!&{~!'QO#|~~!'TP#]#^!'W~!'ZP#g#h!'^~!'aP#h#i!'d~!'iO$u~~!'lP#T#U!'o~!'rP#h#i!'u~!'xP#[#]!'{~!(QO$Q~~!(TP#h#i!(W~!(ZP#f#g!(^~!(aP#]#^!(d~!(gP#b#c!(j~!(mP#Z#[!(p~!(uO$O~~!(xQ#X#Y!)O#]#^!*e~!)RQ#b#c!)X#g#h!)p~!)[P#Z#[!)_~!)bP#h#i!)e~!)hP#[#]!)k~!)pO$|~~!)sP#g#h!)v~!)yP!v!w!)|~!*PP#[#]!*S~!*VP#T#U!*Y~!*]P#b#c!*`~!*eO%^~~!*hP#g#h!*k~!*nP#h#i!*q~!*tP!v!w!*w~!*zP#c#d!*}~!+QP!c!d!+T~!+WP#h#i!+Z~!+^P#h#i!+a~!+dP#f#g!+g~!+jP#g#h!+m~!+rO$o~~!+uQ#T#U!+{#i#j!-[~!,OQ#d#e!,U#h#i!,y~!,XP!c!d!,[~!,_P#h#i!,b~!,eP#h#i!,h~!,kP#f#g!,n~!,qP#g#h!,t~!,yO$s~~!,|P#V#W!-P~!-SP#[#]!-V~!-[O%b~~!-_P#`#a!-b~!-gO%X~~!-jP#T#U!-m~!-pQ#f#g!-v#h#i!/{~!-yQ#g#h!.P#h#i!/W~!.SP#X#Y!.V~!.YP!f!g!.]~!.`P#f#g!.c~!.fP#j#k!.i~!.lP!p!q!.o~!.rP#T#U!.u~!.xP#a#b!.{~!/OP#X#Y!/R~!/WO%f~~!/ZP#]#^!/^~!/aP#h#i!/d~!/gP#]#^!/j~!/mP#c#d!/p~!/sP#b#c!/v~!/{O%S~~!0OP#[#]!0R~!0WP$h~!g!h!0Z~!0^P#l#m!0a~!0dP#]#^!0g~!0jP#g#h!0m~!0pP#h#i!0s~!0vP#g#h!0y~!1OO$^~~!1RP#X#Y!1U~!1XQ#T#U!1_#d#e!2h~!1bP#W#X!1e~!1hQ!f!g!1n!h!i!2P~!1qP#]#^!1t~!1wP#f#g!1z~!2PO$b~~!2SP#]#^!2V~!2YP#`#a!2]~!2`P#X#Y!2c~!2hO$_~~!2kP#`#a!2n~!2qP#T#U!2t~!2wP#V#W!2z~!2}P#X#Y!3Q~!3TP!u!v!3W~!3ZP#h#i!3^~!3aP#f#g!3d~!3gP#]#^!3j~!3mP#b#c!3p~!3sP#Z#[!3v~!3yP#g#h!3|~!4RO%e~~!4UT#X#Y!4e#c#d!4p#d#e!5R#h#i!6h#i#j!8y~!4hP#e#f!4k~!4pO$X~~!4sP#f#g!4v~!4yP#h#i!4|~!5RO%R~~!5UP#`#a!5X~!5[P#]#^!5_~!5bP#h#i!5e~!5jP%c~!x!y!5m~!5pP#X#Y!5s~!5vP#f#g!5y~!5|P#g#h!6P~!6SP#]#^!6V~!6YP#c#d!6]~!6`P#b#c!6c~!6hO%h~~!6kQ#c#d!6q#f#g!7l~!6tP#f#g!6w~!6zP#X#Y!6}~!7QP!r!s!7T~!7WP#T#U!7Z~!7^P#h#i!7a~!7dP#[#]!7g~!7lO$]~~!7oP#]#^!7r~!7uP#b#c!7x~!7{P#Z#[!8O~!8RP!n!o!8U~!8XP#X#Y!8[~!8_P#b#c!8b~!8eP#Z#[!8h~!8kP#h#i!8n~!8qP#[#]!8t~!8yO%`~~!8|P#U#V!9P~!9UP%W~#g#h!9X~!9[P#h#i!9_~!9bP#f#g!9e~!9hP#]#^!9k~!9nP#b#c!9q~!9tP#Z#[!9w~!9|O%_~~!:PS#T#U!:]#c#d!:n#f#g!<w#m#n!?O~!:`P#]#^!:c~!:fP#`#a!:i~!:nO$x~~!:qS!h!i!:}!l!m!;f!r!s!;}!z!{!<f~!;QP#]#^!;T~!;WP#`#a!;Z~!;^P#X#Y!;a~!;fO$f~~!;iP!u!v!;l~!;oP!q!r!;r~!;uP!p!q!;x~!;}O$d~~!<QP#T#U!<T~!<WP#h#i!<Z~!<^P#[#]!<a~!<fO$[~~!<iP!o!p!<l~!<oP!n!o!<r~!<wO$c~~!<zQ#T#U!=Q#m#n!>a~!=TP#V#W!=W~!=ZP#X#Y!=^~!=cP$Z~!x!y!=f~!=iP#X#Y!=l~!=oP#f#g!=r~!=uP#U#V!=x~!={P#c#d!>O~!>RP#g#h!>U~!>XP#X#Y!>[~!>aO%i~~!>dP!g!h!>g~!>jP#j#k!>m~!>pP#T#U!>s~!>vP#`#a!>y~!?OO$V~~!?RP#d#e!?U~!?XP#X#Y!?[~!?_P!q!r!?b~!?eP#Y#Z!?h~!?mO#z~~!?pP#b#c!?s~!?vP#g#h!?y~!?|P#T#U!@P~!@SP#Y#Z!@V~!@YP#X#Y!@]~!@`P!i!j!@c~!@fP#X#Y!@i~!@lP#h#i!@o~!@rP!c!d!@u~!@xP#h#i!@{~!AOP#h#i!AR~!AUP#f#g!AX~!A[P!r!s!A_~!AbP#c#d!Ae~!AhP#g#h!Ak~!ApO$l~~!AsP#]#^!Av~!AyP#d#e!A|~!BPP!c!d!BS~!BVP#h#i!BY~!B]P#h#i!B`~!BcP#f#g!Bf~!BiP#g#h!Bl~!BoP!y!z!Br~!BuP#]#^!Bx~!B{P#h#i!CO~!CRP#[#]!CU~!CZO$t~~!C`O!u~~!CcP#p#q!Cf~!CkO#n~o!CtO!ze%qW#VQ~!CwP!P!Q!Cz~!C}R!O!P!DW!c!}!Di#T#o!Di~!D]S!]~!O!P!DW!P!Q!Cz!c!}!Di#T#o!Di~!DnU!]~}!O!Di!O!P!DW!P!Q!Cz!Q![!Di!c!}!Di#T#o!Di",
  tokenizers: [string, stringBlock, 0, 1, 2, 3, 4],
  topRules: {"Nix":[0,5]},
  specialized: [{term: 7, get: value => spec_Identifier[value] || -1}],
  tokenPrec: 6178
});

//import * as props from "./props" // FIXME
const props = null;

export { parser, props };
