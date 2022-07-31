'use strict';const ohm=require('ohm-js');const result=ohm.createNamespace();result.SkipToken=ohm.makeRecipe(["grammar",{"source":"SkipToken {  \n  Root = \"\"\n  \n  /* override */\n  space := whitespace | lineTerminator | comment\n  \n  /* comment */\n  comment = multiLineComment | singleLineComment\n\n  multiLineComment = \"/*\" (~\"*/\" any)* \"*/\"\n  singleLineComment = \"//\" (~lineTerminator any)*\n  \n  /* special character */\n  whitespace = \"\\t\"\n             | \"\\x0B\"    -- verticalTab\n             | \"\\x0C\"    -- formFeed\n             | \" \"\n             | \"\\u00A0\"  -- noBreakSpace\n             | \"\\uFEFF\"  -- byteOrderMark\n             | unicodeSpaceSeparator\n\n  lineTerminator = \"\\n\" | \"\\r\" | \"\\u2028\" | \"\\u2029\"\n  lineTerminatorSequence = \"\\n\" | \"\\r\" ~\"\\n\" | \"\\u2028\" | \"\\u2029\" | \"\\r\\n\"\n  \n  unicodeSpaceSeparator = \"\\u2000\"..\"\\u200B\" | \"\\u3000\"\n}"},"SkipToken",null,"Root",{"Root":["define",{"sourceInterval":[16,25]},null,[],["terminal",{"sourceInterval":[23,25]},""]],"space":["override",{"sourceInterval":[48,94]},null,[],["alt",{"sourceInterval":[57,94]},["app",{"sourceInterval":[57,67]},"whitespace",[]],["app",{"sourceInterval":[70,84]},"lineTerminator",[]],["app",{"sourceInterval":[87,94]},"comment",[]]]],"comment":["define",{"sourceInterval":[116,162]},null,[],["alt",{"sourceInterval":[126,162]},["app",{"sourceInterval":[126,142]},"multiLineComment",[]],["app",{"sourceInterval":[145,162]},"singleLineComment",[]]]],"multiLineComment":["define",{"sourceInterval":[166,207]},null,[],["seq",{"sourceInterval":[185,207]},["terminal",{"sourceInterval":[185,189]},"/*"],["star",{"sourceInterval":[190,202]},["seq",{"sourceInterval":[191,200]},["not",{"sourceInterval":[191,196]},["terminal",{"sourceInterval":[192,196]},"*/"]],["app",{"sourceInterval":[197,200]},"any",[]]]],["terminal",{"sourceInterval":[203,207]},"*/"]]],"singleLineComment":["define",{"sourceInterval":[210,257]},null,[],["seq",{"sourceInterval":[230,257]},["terminal",{"sourceInterval":[230,234]},"//"],["star",{"sourceInterval":[235,257]},["seq",{"sourceInterval":[236,255]},["not",{"sourceInterval":[236,251]},["app",{"sourceInterval":[237,251]},"lineTerminator",[]]],["app",{"sourceInterval":[252,255]},"any",[]]]]]],"whitespace_verticalTab":["define",{"sourceInterval":[322,346]},null,[],["terminal",{"sourceInterval":[322,328]},"\u000b"]],"whitespace_formFeed":["define",{"sourceInterval":[362,383]},null,[],["terminal",{"sourceInterval":[362,368]},"\f"]],"whitespace_noBreakSpace":["define",{"sourceInterval":[418,443]},null,[],["terminal",{"sourceInterval":[418,426]}," "]],"whitespace_byteOrderMark":["define",{"sourceInterval":[459,485]},null,[],["terminal",{"sourceInterval":[459,467]},"﻿"]],"whitespace":["define",{"sourceInterval":[289,522]},null,[],["alt",{"sourceInterval":[302,522]},["terminal",{"sourceInterval":[302,306]},"\t"],["app",{"sourceInterval":[322,328]},"whitespace_verticalTab",[]],["app",{"sourceInterval":[362,368]},"whitespace_formFeed",[]],["terminal",{"sourceInterval":[399,402]}," "],["app",{"sourceInterval":[418,426]},"whitespace_noBreakSpace",[]],["app",{"sourceInterval":[459,467]},"whitespace_byteOrderMark",[]],["app",{"sourceInterval":[501,522]},"unicodeSpaceSeparator",[]]]],"lineTerminator":["define",{"sourceInterval":[526,576]},null,[],["alt",{"sourceInterval":[543,576]},["terminal",{"sourceInterval":[543,547]},"\n"],["terminal",{"sourceInterval":[550,554]},"\r"],["terminal",{"sourceInterval":[557,565]},"\u2028"],["terminal",{"sourceInterval":[568,576]},"\u2029"]]],"lineTerminatorSequence":["define",{"sourceInterval":[579,652]},null,[],["alt",{"sourceInterval":[604,652]},["terminal",{"sourceInterval":[604,608]},"\n"],["seq",{"sourceInterval":[611,621]},["terminal",{"sourceInterval":[611,615]},"\r"],["not",{"sourceInterval":[616,621]},["terminal",{"sourceInterval":[617,621]},"\n"]]],["terminal",{"sourceInterval":[624,632]},"\u2028"],["terminal",{"sourceInterval":[635,643]},"\u2029"],["terminal",{"sourceInterval":[646,652]},"\r\n"]]],"unicodeSpaceSeparator":["define",{"sourceInterval":[658,711]},null,[],["alt",{"sourceInterval":[682,711]},["range",{"sourceInterval":[682,700]}," ","​"],["terminal",{"sourceInterval":[703,711]},"　"]]]}]);result.Atomic=ohm.makeRecipe(["grammar",{"source":"Atomic <: SkipToken {\n  atomic = addedAtomic | pureAtomic\n  \n  pureAtomic = number | unit | operator | string | jsIdentifier\n  addedAtomic = props\n  \n  /* props | number */\n  generatedNumber = props | number\n    \n  /* props */\n  props = \"props\" \"(\" jsIdentifier \")\"\n  \n  /* paren */\n  bparen = \"(\"\n  eparen = \")\"\n  \n  /* numeral */\n  number = \n    | \"-\" digit+ -- negative\n    | digit+ -- positive\n  \n  /* unit */\n  unit = lowerCase | \"%\"\n  \n  /* operator */\n  operator = \"-\" | \"+\" | \"*\" | \"**\" | \"/\"\n  \n  /* string */\n  string = lowerCase | kebabCase | pascalCase | camelCase\n  lowerCase = lower+\n  kebabCase = lower (\"-\" | lower)*\n  pascalCase = (upper (lower | digit)*)+\n  camelCase = lower (letter | digit)*\n  \n  /* jsIdentifier */\n  jsIdentifier = letter (letter | digit | \"_\")*\n}"},"Atomic",result.SkipToken,"Root",{"atomic":["define",{"sourceInterval":[24,57]},null,[],["alt",{"sourceInterval":[33,57]},["app",{"sourceInterval":[33,44]},"addedAtomic",[]],["app",{"sourceInterval":[47,57]},"pureAtomic",[]]]],"pureAtomic":["define",{"sourceInterval":[63,124]},null,[],["alt",{"sourceInterval":[76,124]},["app",{"sourceInterval":[76,82]},"number",[]],["app",{"sourceInterval":[85,89]},"unit",[]],["app",{"sourceInterval":[92,100]},"operator",[]],["app",{"sourceInterval":[103,109]},"string",[]],["app",{"sourceInterval":[112,124]},"jsIdentifier",[]]]],"addedAtomic":["define",{"sourceInterval":[127,146]},null,[],["app",{"sourceInterval":[141,146]},"props",[]]],"generatedNumber":["define",{"sourceInterval":[175,207]},null,[],["alt",{"sourceInterval":[193,207]},["app",{"sourceInterval":[193,198]},"props",[]],["app",{"sourceInterval":[201,207]},"number",[]]]],"props":["define",{"sourceInterval":[229,265]},null,[],["seq",{"sourceInterval":[237,265]},["terminal",{"sourceInterval":[237,244]},"props"],["terminal",{"sourceInterval":[245,248]},"("],["app",{"sourceInterval":[249,261]},"jsIdentifier",[]],["terminal",{"sourceInterval":[262,265]},")"]]],"bparen":["define",{"sourceInterval":[285,297]},null,[],["terminal",{"sourceInterval":[294,297]},"("]],"eparen":["define",{"sourceInterval":[300,312]},null,[],["terminal",{"sourceInterval":[309,312]},")"]],"number_negative":["define",{"sourceInterval":[350,372]},null,[],["seq",{"sourceInterval":[350,360]},["terminal",{"sourceInterval":[350,353]},"-"],["plus",{"sourceInterval":[354,360]},["app",{"sourceInterval":[354,359]},"digit",[]]]]],"number_positive":["define",{"sourceInterval":[379,397]},null,[],["plus",{"sourceInterval":[379,385]},["app",{"sourceInterval":[379,384]},"digit",[]]]],"number":["define",{"sourceInterval":[334,397]},null,[],["alt",{"sourceInterval":[348,397]},["app",{"sourceInterval":[350,360]},"number_negative",[]],["app",{"sourceInterval":[379,385]},"number_positive",[]]]],"unit":["define",{"sourceInterval":[416,438]},null,[],["alt",{"sourceInterval":[423,438]},["app",{"sourceInterval":[423,432]},"lowerCase",[]],["terminal",{"sourceInterval":[435,438]},"%"]]],"operator":["define",{"sourceInterval":[461,500]},null,[],["alt",{"sourceInterval":[472,500]},["terminal",{"sourceInterval":[472,475]},"-"],["terminal",{"sourceInterval":[478,481]},"+"],["terminal",{"sourceInterval":[484,487]},"*"],["terminal",{"sourceInterval":[490,494]},"**"],["terminal",{"sourceInterval":[497,500]},"/"]]],"string":["define",{"sourceInterval":[521,576]},null,[],["alt",{"sourceInterval":[530,576]},["app",{"sourceInterval":[530,539]},"lowerCase",[]],["app",{"sourceInterval":[542,551]},"kebabCase",[]],["app",{"sourceInterval":[554,564]},"pascalCase",[]],["app",{"sourceInterval":[567,576]},"camelCase",[]]]],"lowerCase":["define",{"sourceInterval":[579,597]},null,[],["plus",{"sourceInterval":[591,597]},["app",{"sourceInterval":[591,596]},"lower",[]]]],"kebabCase":["define",{"sourceInterval":[600,632]},null,[],["seq",{"sourceInterval":[612,632]},["app",{"sourceInterval":[612,617]},"lower",[]],["star",{"sourceInterval":[618,632]},["alt",{"sourceInterval":[619,630]},["terminal",{"sourceInterval":[619,622]},"-"],["app",{"sourceInterval":[625,630]},"lower",[]]]]]],"pascalCase":["define",{"sourceInterval":[635,673]},null,[],["plus",{"sourceInterval":[648,673]},["seq",{"sourceInterval":[649,671]},["app",{"sourceInterval":[649,654]},"upper",[]],["star",{"sourceInterval":[655,671]},["alt",{"sourceInterval":[656,669]},["app",{"sourceInterval":[656,661]},"lower",[]],["app",{"sourceInterval":[664,669]},"digit",[]]]]]]],"camelCase":["define",{"sourceInterval":[676,711]},null,[],["seq",{"sourceInterval":[688,711]},["app",{"sourceInterval":[688,693]},"lower",[]],["star",{"sourceInterval":[694,711]},["alt",{"sourceInterval":[695,709]},["app",{"sourceInterval":[695,701]},"letter",[]],["app",{"sourceInterval":[704,709]},"digit",[]]]]]],"jsIdentifier":["define",{"sourceInterval":[738,783]},null,[],["seq",{"sourceInterval":[753,783]},["app",{"sourceInterval":[753,759]},"letter",[]],["star",{"sourceInterval":[760,783]},["alt",{"sourceInterval":[761,781]},["app",{"sourceInterval":[761,767]},"letter",[]],["app",{"sourceInterval":[770,775]},"digit",[]],["terminal",{"sourceInterval":[778,781]},"_"]]]]]}]);result.Primitive=ohm.makeRecipe(["grammar",{"source":"Primitive <: Atomic {\n  Formula = \n    | WrapTerm operator Formula -- expression\n    | WrapTerm\n  WrapTerm =\n    | bparen AtomicFormula eparen -- expression\n    | numeral\n  AtomicFormula = \n    | numeral operator AtomicFormula -- expression\n    | numeral\n  numeral = \n    | numeralWithUnit \n    | generatedNumber\n  numeralWithUnit = generatedNumber unit\n  \n  generatedLiteral = props | literal\n  literal = \"\\\"\" (~\"\\\"\" any)* \"\\\"\"\n}"},"Primitive",result.Atomic,"Root",{"Formula_expression":["define",{"sourceInterval":[41,80]},null,[],["seq",{"sourceInterval":[41,66]},["app",{"sourceInterval":[41,49]},"WrapTerm",[]],["app",{"sourceInterval":[50,58]},"operator",[]],["app",{"sourceInterval":[59,66]},"Formula",[]]]],"Formula":["define",{"sourceInterval":[24,95]},null,[],["alt",{"sourceInterval":[39,95]},["app",{"sourceInterval":[41,66]},"Formula_expression",[]],["app",{"sourceInterval":[87,95]},"WrapTerm",[]]]],"WrapTerm_expression":["define",{"sourceInterval":[115,156]},null,[],["seq",{"sourceInterval":[115,142]},["app",{"sourceInterval":[115,121]},"bparen",[]],["app",{"sourceInterval":[122,135]},"AtomicFormula",[]],["app",{"sourceInterval":[136,142]},"eparen",[]]]],"WrapTerm":["define",{"sourceInterval":[98,170]},null,[],["alt",{"sourceInterval":[113,170]},["app",{"sourceInterval":[115,142]},"WrapTerm_expression",[]],["app",{"sourceInterval":[163,170]},"numeral",[]]]],"AtomicFormula_expression":["define",{"sourceInterval":[196,240]},null,[],["seq",{"sourceInterval":[196,226]},["app",{"sourceInterval":[196,203]},"numeral",[]],["app",{"sourceInterval":[204,212]},"operator",[]],["app",{"sourceInterval":[213,226]},"AtomicFormula",[]]]],"AtomicFormula":["define",{"sourceInterval":[173,254]},null,[],["alt",{"sourceInterval":[194,254]},["app",{"sourceInterval":[196,226]},"AtomicFormula_expression",[]],["app",{"sourceInterval":[247,254]},"numeral",[]]]],"numeral":["define",{"sourceInterval":[257,312]},null,[],["alt",{"sourceInterval":[272,312]},["app",{"sourceInterval":[274,289]},"numeralWithUnit",[]],["app",{"sourceInterval":[297,312]},"generatedNumber",[]]]],"numeralWithUnit":["define",{"sourceInterval":[315,353]},null,[],["seq",{"sourceInterval":[333,353]},["app",{"sourceInterval":[333,348]},"generatedNumber",[]],["app",{"sourceInterval":[349,353]},"unit",[]]]],"generatedLiteral":["define",{"sourceInterval":[359,393]},null,[],["alt",{"sourceInterval":[378,393]},["app",{"sourceInterval":[378,383]},"props",[]],["app",{"sourceInterval":[386,393]},"literal",[]]]],"literal":["define",{"sourceInterval":[396,428]},null,[],["seq",{"sourceInterval":[406,428]},["terminal",{"sourceInterval":[406,410]},"\""],["star",{"sourceInterval":[411,423]},["seq",{"sourceInterval":[412,421]},["not",{"sourceInterval":[412,417]},["terminal",{"sourceInterval":[413,417]},"\""]],["app",{"sourceInterval":[418,421]},"any",[]]]],["terminal",{"sourceInterval":[424,428]},"\""]]]}]);result.SyrmedCssInterface=ohm.makeRecipe(["grammar",{"source":"SyrmedCssInterface <: Primitive {\n  pureAtomic += collectionKeyword | combinator | constantSelector\n  addedAtomic += tagSelector\n  \n  /* -------------------------------------------------------------------------- */\n  /* selector list                                                              */\n  /* -------------------------------------------------------------------------- */\n  \n  SelectorList = Selector (\",\" Selector)*\n  \n  /* -------------------------------------------------------------------------- */\n  /* selector                                                                   */\n  /* -------------------------------------------------------------------------- */\n  \n  /* Selector */\n  Selector = CombinationSelector | EnumSelector\n  CombinationSelector = EnumSelector Combine+\n  Combine = combinator ~\"&\" EnumSelector\n  EnumSelector = \n    | basicSelector* PredicateSelector -- predicate\n    | basicSelector+\n  PredicateSelector = PseudoSelector | attributeSelector\n  basicSelector = tagSelector | constantSelector\n  \n  /* tagSelector */\n  tagSelector = htmlTagSelector | jsxTagSelector\n  htmlTagSelector = lower (digit | lower)*\n  jsxTagSelector = pascalCase\n  \n  /* atomic Selector */\n  constantSelector = rootSelector | universalSelector\n  rootSelector = \"&\"\n  universalSelector = \"*\"\n  \n  /* -------------------------------------------------------------------------- */\n  /* attribute                                                                  */\n  /* -------------------------------------------------------------------------- */\n  \n  /* attributeSelector */\n  attributeSelector = attributePredicate+\n  \n  attributePredicate = \n    | \"[\" kebabCase equal generatedLiteral \"]\" -- value\n    | \"[\" kebabCase \"]\" -- has\n    \n  equal = \"=\" | \"*=\" | \"$=\" | \"~=\"\n  \n  /* -------------------------------------------------------------------------- */\n  /* pseudo                                                                     */\n  /* -------------------------------------------------------------------------- */\n  \n  /* Pseudo Selector */\n  PseudoSelector = Pseudo+\n  \n  /* Pseudo */\n  Pseudo = \n    | \"::\" kebabCase (\"(\" PseudoArg \")\")* -- element\n    | \":\" kebabCase (\"(\" PseudoArg \")\")* -- class\n  PseudoArg = nth | props | Selector | letter+ | digit+ \n  \n  /* nth */\n  nth = (nthTerm | generatedNumber | operator)+\n  nthTerm = number* \"n\"\n  \n  /* -------------------------------------------------------------------------- */\n  /* combinator                                                                 */\n  /* -------------------------------------------------------------------------- */\n  combinator = adjacentSiblijngCombinator | generalSiblijngCombinator | childCombinator | columnCombinator\n  adjacentSiblijngCombinator = \"+\"\n  generalSiblijngCombinator = \"~\"\n  childCombinator = \">\"\n  columnCombinator = \"||\"\n  \n  /* -------------------------------------------------------------------------- */\n  /* PropertyName                                                               */\n  /* -------------------------------------------------------------------------- */\n  \n  PropertyName = kebabCase | collectionKeyword\n  collectionKeyword = \"@\" \"collection\"\n  \n  /* -------------------------------------------------------------------------- */\n  /* PropertyValue                                                              */\n  /* -------------------------------------------------------------------------- */\n  \n  PropertyValue = PropertyValueFunc | Formula | kebabCase | pascalCase\n  PropertyValueFunc = kebabCase \"(\" Formula (\",\" Formula)* \")\"\n}"},"SyrmedCssInterface",result.Primitive,"Root",{"pureAtomic":["extend",{"sourceInterval":[36,99]},null,[],["alt",{"sourceInterval":[50,99]},["app",{"sourceInterval":[50,67]},"collectionKeyword",[]],["app",{"sourceInterval":[70,80]},"combinator",[]],["app",{"sourceInterval":[83,99]},"constantSelector",[]]]],"addedAtomic":["extend",{"sourceInterval":[102,128]},null,[],["app",{"sourceInterval":[117,128]},"tagSelector",[]]],"SelectorList":["define",{"sourceInterval":[386,425]},null,[],["seq",{"sourceInterval":[401,425]},["app",{"sourceInterval":[401,409]},"Selector",[]],["star",{"sourceInterval":[410,425]},["seq",{"sourceInterval":[411,423]},["terminal",{"sourceInterval":[411,414]},","],["app",{"sourceInterval":[415,423]},"Selector",[]]]]]],"Selector":["define",{"sourceInterval":[700,745]},null,[],["alt",{"sourceInterval":[711,745]},["app",{"sourceInterval":[711,730]},"CombinationSelector",[]],["app",{"sourceInterval":[733,745]},"EnumSelector",[]]]],"CombinationSelector":["define",{"sourceInterval":[748,791]},null,[],["seq",{"sourceInterval":[770,791]},["app",{"sourceInterval":[770,782]},"EnumSelector",[]],["plus",{"sourceInterval":[783,791]},["app",{"sourceInterval":[783,790]},"Combine",[]]]]],"Combine":["define",{"sourceInterval":[794,832]},null,[],["seq",{"sourceInterval":[804,832]},["app",{"sourceInterval":[804,814]},"combinator",[]],["not",{"sourceInterval":[815,819]},["terminal",{"sourceInterval":[816,819]},"&"]],["app",{"sourceInterval":[820,832]},"EnumSelector",[]]]],"EnumSelector_predicate":["define",{"sourceInterval":[857,902]},null,[],["seq",{"sourceInterval":[857,889]},["star",{"sourceInterval":[857,871]},["app",{"sourceInterval":[857,870]},"basicSelector",[]]],["app",{"sourceInterval":[872,889]},"PredicateSelector",[]]]],"EnumSelector":["define",{"sourceInterval":[835,923]},null,[],["alt",{"sourceInterval":[855,923]},["app",{"sourceInterval":[857,889]},"EnumSelector_predicate",[]],["plus",{"sourceInterval":[909,923]},["app",{"sourceInterval":[909,922]},"basicSelector",[]]]]],"PredicateSelector":["define",{"sourceInterval":[926,980]},null,[],["alt",{"sourceInterval":[946,980]},["app",{"sourceInterval":[946,960]},"PseudoSelector",[]],["app",{"sourceInterval":[963,980]},"attributeSelector",[]]]],"basicSelector":["define",{"sourceInterval":[983,1029]},null,[],["alt",{"sourceInterval":[999,1029]},["app",{"sourceInterval":[999,1010]},"tagSelector",[]],["app",{"sourceInterval":[1013,1029]},"constantSelector",[]]]],"tagSelector":["define",{"sourceInterval":[1055,1101]},null,[],["alt",{"sourceInterval":[1069,1101]},["app",{"sourceInterval":[1069,1084]},"htmlTagSelector",[]],["app",{"sourceInterval":[1087,1101]},"jsxTagSelector",[]]]],"htmlTagSelector":["define",{"sourceInterval":[1104,1144]},null,[],["seq",{"sourceInterval":[1122,1144]},["app",{"sourceInterval":[1122,1127]},"lower",[]],["star",{"sourceInterval":[1128,1144]},["alt",{"sourceInterval":[1129,1142]},["app",{"sourceInterval":[1129,1134]},"digit",[]],["app",{"sourceInterval":[1137,1142]},"lower",[]]]]]],"jsxTagSelector":["define",{"sourceInterval":[1147,1174]},null,[],["app",{"sourceInterval":[1164,1174]},"pascalCase",[]]],"constantSelector":["define",{"sourceInterval":[1204,1255]},null,[],["alt",{"sourceInterval":[1223,1255]},["app",{"sourceInterval":[1223,1235]},"rootSelector",[]],["app",{"sourceInterval":[1238,1255]},"universalSelector",[]]]],"rootSelector":["define",{"sourceInterval":[1258,1276]},null,[],["terminal",{"sourceInterval":[1273,1276]},"&"]],"universalSelector":["define",{"sourceInterval":[1279,1302]},null,[],["terminal",{"sourceInterval":[1299,1302]},"*"]],"attributeSelector":["define",{"sourceInterval":[1586,1625]},null,[],["plus",{"sourceInterval":[1606,1625]},["app",{"sourceInterval":[1606,1624]},"attributePredicate",[]]]],"attributePredicate_value":["define",{"sourceInterval":[1659,1708]},null,[],["seq",{"sourceInterval":[1659,1699]},["terminal",{"sourceInterval":[1659,1662]},"["],["app",{"sourceInterval":[1663,1672]},"kebabCase",[]],["app",{"sourceInterval":[1673,1678]},"equal",[]],["app",{"sourceInterval":[1679,1695]},"generatedLiteral",[]],["terminal",{"sourceInterval":[1696,1699]},"]"]]],"attributePredicate_has":["define",{"sourceInterval":[1715,1739]},null,[],["seq",{"sourceInterval":[1715,1732]},["terminal",{"sourceInterval":[1715,1718]},"["],["app",{"sourceInterval":[1719,1728]},"kebabCase",[]],["terminal",{"sourceInterval":[1729,1732]},"]"]]],"attributePredicate":["define",{"sourceInterval":[1631,1739]},null,[],["alt",{"sourceInterval":[1657,1739]},["app",{"sourceInterval":[1659,1699]},"attributePredicate_value",[]],["app",{"sourceInterval":[1715,1732]},"attributePredicate_has",[]]]],"equal":["define",{"sourceInterval":[1747,1779]},null,[],["alt",{"sourceInterval":[1755,1779]},["terminal",{"sourceInterval":[1755,1758]},"="],["terminal",{"sourceInterval":[1761,1765]},"*="],["terminal",{"sourceInterval":[1768,1772]},"$="],["terminal",{"sourceInterval":[1775,1779]},"~="]]],"PseudoSelector":["define",{"sourceInterval":[2061,2085]},null,[],["plus",{"sourceInterval":[2078,2085]},["app",{"sourceInterval":[2078,2084]},"Pseudo",[]]]],"Pseudo_element":["define",{"sourceInterval":[2122,2168]},null,[],["seq",{"sourceInterval":[2122,2157]},["terminal",{"sourceInterval":[2122,2126]},"::"],["app",{"sourceInterval":[2127,2136]},"kebabCase",[]],["star",{"sourceInterval":[2137,2157]},["seq",{"sourceInterval":[2138,2155]},["terminal",{"sourceInterval":[2138,2141]},"("],["app",{"sourceInterval":[2142,2151]},"PseudoArg",[]],["terminal",{"sourceInterval":[2152,2155]},")"]]]]],"Pseudo_class":["define",{"sourceInterval":[2175,2218]},null,[],["seq",{"sourceInterval":[2175,2209]},["terminal",{"sourceInterval":[2175,2178]},":"],["app",{"sourceInterval":[2179,2188]},"kebabCase",[]],["star",{"sourceInterval":[2189,2209]},["seq",{"sourceInterval":[2190,2207]},["terminal",{"sourceInterval":[2190,2193]},"("],["app",{"sourceInterval":[2194,2203]},"PseudoArg",[]],["terminal",{"sourceInterval":[2204,2207]},")"]]]]],"Pseudo":["define",{"sourceInterval":[2106,2218]},null,[],["alt",{"sourceInterval":[2120,2218]},["app",{"sourceInterval":[2122,2157]},"Pseudo_element",[]],["app",{"sourceInterval":[2175,2209]},"Pseudo_class",[]]]],"PseudoArg":["define",{"sourceInterval":[2221,2274]},null,[],["alt",{"sourceInterval":[2233,2274]},["app",{"sourceInterval":[2233,2236]},"nth",[]],["app",{"sourceInterval":[2239,2244]},"props",[]],["app",{"sourceInterval":[2247,2255]},"Selector",[]],["plus",{"sourceInterval":[2258,2265]},["app",{"sourceInterval":[2258,2264]},"letter",[]]],["plus",{"sourceInterval":[2268,2274]},["app",{"sourceInterval":[2268,2273]},"digit",[]]]]],"nth":["define",{"sourceInterval":[2293,2338]},null,[],["plus",{"sourceInterval":[2299,2338]},["alt",{"sourceInterval":[2300,2336]},["app",{"sourceInterval":[2300,2307]},"nthTerm",[]],["app",{"sourceInterval":[2310,2325]},"generatedNumber",[]],["app",{"sourceInterval":[2328,2336]},"operator",[]]]]],"nthTerm":["define",{"sourceInterval":[2341,2362]},null,[],["seq",{"sourceInterval":[2351,2362]},["star",{"sourceInterval":[2351,2358]},["app",{"sourceInterval":[2351,2357]},"number",[]]],["terminal",{"sourceInterval":[2359,2362]},"n"]]],"combinator":["define",{"sourceInterval":[2617,2721]},null,[],["alt",{"sourceInterval":[2630,2721]},["app",{"sourceInterval":[2630,2656]},"adjacentSiblijngCombinator",[]],["app",{"sourceInterval":[2659,2684]},"generalSiblijngCombinator",[]],["app",{"sourceInterval":[2687,2702]},"childCombinator",[]],["app",{"sourceInterval":[2705,2721]},"columnCombinator",[]]]],"adjacentSiblijngCombinator":["define",{"sourceInterval":[2724,2756]},null,[],["terminal",{"sourceInterval":[2753,2756]},"+"]],"generalSiblijngCombinator":["define",{"sourceInterval":[2759,2790]},null,[],["terminal",{"sourceInterval":[2787,2790]},"~"]],"childCombinator":["define",{"sourceInterval":[2793,2814]},null,[],["terminal",{"sourceInterval":[2811,2814]},">"]],"columnCombinator":["define",{"sourceInterval":[2817,2840]},null,[],["terminal",{"sourceInterval":[2836,2840]},"||"]],"PropertyName":["define",{"sourceInterval":[3098,3142]},null,[],["alt",{"sourceInterval":[3113,3142]},["app",{"sourceInterval":[3113,3122]},"kebabCase",[]],["app",{"sourceInterval":[3125,3142]},"collectionKeyword",[]]]],"collectionKeyword":["define",{"sourceInterval":[3145,3181]},null,[],["seq",{"sourceInterval":[3165,3181]},["terminal",{"sourceInterval":[3165,3168]},"@"],["terminal",{"sourceInterval":[3169,3181]},"collection"]]],"PropertyValue":["define",{"sourceInterval":[3439,3507]},null,[],["alt",{"sourceInterval":[3455,3507]},["app",{"sourceInterval":[3455,3472]},"PropertyValueFunc",[]],["app",{"sourceInterval":[3475,3482]},"Formula",[]],["app",{"sourceInterval":[3485,3494]},"kebabCase",[]],["app",{"sourceInterval":[3497,3507]},"pascalCase",[]]]],"PropertyValueFunc":["define",{"sourceInterval":[3510,3570]},null,[],["seq",{"sourceInterval":[3530,3570]},["app",{"sourceInterval":[3530,3539]},"kebabCase",[]],["terminal",{"sourceInterval":[3540,3543]},"("],["app",{"sourceInterval":[3544,3551]},"Formula",[]],["star",{"sourceInterval":[3552,3566]},["seq",{"sourceInterval":[3553,3564]},["terminal",{"sourceInterval":[3553,3556]},","],["app",{"sourceInterval":[3557,3564]},"Formula",[]]]],["terminal",{"sourceInterval":[3567,3570]},")"]]]}]);result.DeclarationBlock=ohm.makeRecipe(["grammar",{"source":"DeclarationBlock <: SyrmedCssInterface {\n  DeclarationBlock = \"{\" Declaration+ \"}\"\n  \n  Declaration = PropertyName \":\" PropertyValue+ \";\"\n}"},"DeclarationBlock",result.SyrmedCssInterface,"Root",{"DeclarationBlock":["define",{"sourceInterval":[43,82]},null,[],["seq",{"sourceInterval":[62,82]},["terminal",{"sourceInterval":[62,65]},"{"],["plus",{"sourceInterval":[66,78]},["app",{"sourceInterval":[66,77]},"Declaration",[]]],["terminal",{"sourceInterval":[79,82]},"}"]]],"Declaration":["define",{"sourceInterval":[88,137]},null,[],["seq",{"sourceInterval":[102,137]},["app",{"sourceInterval":[102,114]},"PropertyName",[]],["terminal",{"sourceInterval":[115,118]},":"],["plus",{"sourceInterval":[119,133]},["app",{"sourceInterval":[119,132]},"PropertyValue",[]]],["terminal",{"sourceInterval":[134,137]},";"]]]}]);result.RuleSet=ohm.makeRecipe(["grammar",{"source":"RuleSet <: DeclarationBlock {\n  RuleSet = SelectorList DeclarationBlock\n}"},"RuleSet",result.DeclarationBlock,"Root",{"RuleSet":["define",{"sourceInterval":[32,71]},null,[],["seq",{"sourceInterval":[42,71]},["app",{"sourceInterval":[42,54]},"SelectorList",[]],["app",{"sourceInterval":[55,71]},"DeclarationBlock",[]]]]}]);result.RuleSetStatement=ohm.makeRecipe(["grammar",{"source":"RuleSetStatement <: RuleSet {\n  pureAtomic += else | invert\n  addedAtomic += truthy | falsy | exist\n  \n  /* -------------------------------------------------------------------------- */\n  /* ruleset statement                                                          */\n  /* -------------------------------------------------------------------------- */\n  \n  RuleSetStatement = \n    | ifAnnotation RuleSet RuleSet invert -- invert\n    | ifAnnotation RuleSet else RuleSet -- if_else\n    | ifAnnotation RuleSet -- if\n    | RuleSet\n  \n  /* -------------------------------------------------------------------------- */\n  /* annotation                                                                 */\n  /* -------------------------------------------------------------------------- */\n  ifAnnotation = truthy | falsy | exist\n    \n  truthy = \"@\" \"truthy\" \"(\" jsIdentifier \")\"\n  falsy = \"@\" \"falsy\" \"(\" jsIdentifier\")\"\n  exist = \"@\" \"exist\" \"(\" jsIdentifier \")\"\n  else = \"@\" \"else\"\n  invert = \"@\" \"invert\"\n}"},"RuleSetStatement",result.RuleSet,"Root",{"pureAtomic":["extend",{"sourceInterval":[32,59]},null,[],["alt",{"sourceInterval":[46,59]},["app",{"sourceInterval":[46,50]},"else",[]],["app",{"sourceInterval":[53,59]},"invert",[]]]],"addedAtomic":["extend",{"sourceInterval":[62,99]},null,[],["alt",{"sourceInterval":[77,99]},["app",{"sourceInterval":[77,83]},"truthy",[]],["app",{"sourceInterval":[86,91]},"falsy",[]],["app",{"sourceInterval":[94,99]},"exist",[]]]],"RuleSetStatement_invert":["define",{"sourceInterval":[383,428]},null,[],["seq",{"sourceInterval":[383,418]},["app",{"sourceInterval":[383,395]},"ifAnnotation",[]],["app",{"sourceInterval":[396,403]},"RuleSet",[]],["app",{"sourceInterval":[404,411]},"RuleSet",[]],["app",{"sourceInterval":[412,418]},"invert",[]]]],"RuleSetStatement_if_else":["define",{"sourceInterval":[435,479]},null,[],["seq",{"sourceInterval":[435,468]},["app",{"sourceInterval":[435,447]},"ifAnnotation",[]],["app",{"sourceInterval":[448,455]},"RuleSet",[]],["app",{"sourceInterval":[456,460]},"else",[]],["app",{"sourceInterval":[461,468]},"RuleSet",[]]]],"RuleSetStatement_if":["define",{"sourceInterval":[486,512]},null,[],["seq",{"sourceInterval":[486,506]},["app",{"sourceInterval":[486,498]},"ifAnnotation",[]],["app",{"sourceInterval":[499,506]},"RuleSet",[]]]],"RuleSetStatement":["define",{"sourceInterval":[357,526]},null,[],["alt",{"sourceInterval":[381,526]},["app",{"sourceInterval":[383,418]},"RuleSetStatement_invert",[]],["app",{"sourceInterval":[435,468]},"RuleSetStatement_if_else",[]],["app",{"sourceInterval":[486,506]},"RuleSetStatement_if",[]],["app",{"sourceInterval":[519,526]},"RuleSet",[]]]],"ifAnnotation":["define",{"sourceInterval":[781,818]},null,[],["alt",{"sourceInterval":[796,818]},["app",{"sourceInterval":[796,802]},"truthy",[]],["app",{"sourceInterval":[805,810]},"falsy",[]],["app",{"sourceInterval":[813,818]},"exist",[]]]],"truthy":["define",{"sourceInterval":[826,868]},null,[],["seq",{"sourceInterval":[835,868]},["terminal",{"sourceInterval":[835,838]},"@"],["terminal",{"sourceInterval":[839,847]},"truthy"],["terminal",{"sourceInterval":[848,851]},"("],["app",{"sourceInterval":[852,864]},"jsIdentifier",[]],["terminal",{"sourceInterval":[865,868]},")"]]],"falsy":["define",{"sourceInterval":[871,910]},null,[],["seq",{"sourceInterval":[879,910]},["terminal",{"sourceInterval":[879,882]},"@"],["terminal",{"sourceInterval":[883,890]},"falsy"],["terminal",{"sourceInterval":[891,894]},"("],["app",{"sourceInterval":[895,907]},"jsIdentifier",[]],["terminal",{"sourceInterval":[907,910]},")"]]],"exist":["define",{"sourceInterval":[913,953]},null,[],["seq",{"sourceInterval":[921,953]},["terminal",{"sourceInterval":[921,924]},"@"],["terminal",{"sourceInterval":[925,932]},"exist"],["terminal",{"sourceInterval":[933,936]},"("],["app",{"sourceInterval":[937,949]},"jsIdentifier",[]],["terminal",{"sourceInterval":[950,953]},")"]]],"else":["define",{"sourceInterval":[956,973]},null,[],["seq",{"sourceInterval":[963,973]},["terminal",{"sourceInterval":[963,966]},"@"],["terminal",{"sourceInterval":[967,973]},"else"]]],"invert":["define",{"sourceInterval":[976,997]},null,[],["seq",{"sourceInterval":[985,997]},["terminal",{"sourceInterval":[985,988]},"@"],["terminal",{"sourceInterval":[989,997]},"invert"]]]}]);result.Namespace=ohm.makeRecipe(["grammar",{"source":"Namespace <: RuleSetStatement {\n  Namespace<TagName> = \"<\" TagName \">\" space* RuleSetStatement* space* \"</\" TagName \">\"\n}"},"Namespace",result.RuleSetStatement,"Root",{"Namespace":["define",{"sourceInterval":[34,119]},null,["TagName"],["seq",{"sourceInterval":[55,119]},["terminal",{"sourceInterval":[55,58]},"<"],["param",{"sourceInterval":[59,66]},0],["terminal",{"sourceInterval":[67,70]},">"],["star",{"sourceInterval":[71,77]},["app",{"sourceInterval":[71,76]},"space",[]]],["star",{"sourceInterval":[78,95]},["app",{"sourceInterval":[78,94]},"RuleSetStatement",[]]],["star",{"sourceInterval":[96,102]},["app",{"sourceInterval":[96,101]},"space",[]]],["terminal",{"sourceInterval":[103,107]},"</"],["param",{"sourceInterval":[108,115]},0],["terminal",{"sourceInterval":[116,119]},">"]]]}]);result.Syrm=ohm.makeRecipe(["grammar",{"source":"Syrm <: Namespace {\n  Root := Block*\n  \n  Block = CascadeBlock | CollectionBlock | Block\n  \n  CascadeBlock = \"<Cascade>\" space* RuleSetStatement* space* \"</Cascade>\"\n  CollectionBlock = \"<Collection>\" space* Namespace<pascalCase>* space* \"</Collection>\"\n}"},"Syrm",result.Namespace,"Root",{"Root":["override",{"sourceInterval":[22,36]},null,[],["star",{"sourceInterval":[30,36]},["app",{"sourceInterval":[30,35]},"Block",[]]]],"Block":["define",{"sourceInterval":[42,88]},null,[],["alt",{"sourceInterval":[50,88]},["app",{"sourceInterval":[50,62]},"CascadeBlock",[]],["app",{"sourceInterval":[65,80]},"CollectionBlock",[]],["app",{"sourceInterval":[83,88]},"Block",[]]]],"CascadeBlock":["define",{"sourceInterval":[94,165]},null,[],["seq",{"sourceInterval":[109,165]},["terminal",{"sourceInterval":[109,120]},"<Cascade>"],["star",{"sourceInterval":[121,127]},["app",{"sourceInterval":[121,126]},"space",[]]],["star",{"sourceInterval":[128,145]},["app",{"sourceInterval":[128,144]},"RuleSetStatement",[]]],["star",{"sourceInterval":[146,152]},["app",{"sourceInterval":[146,151]},"space",[]]],["terminal",{"sourceInterval":[153,165]},"</Cascade>"]]],"CollectionBlock":["define",{"sourceInterval":[168,253]},null,[],["seq",{"sourceInterval":[186,253]},["terminal",{"sourceInterval":[186,200]},"<Collection>"],["star",{"sourceInterval":[201,207]},["app",{"sourceInterval":[201,206]},"space",[]]],["star",{"sourceInterval":[208,230]},["app",{"sourceInterval":[208,229]},"Namespace",[["app",{"sourceInterval":[218,228]},"pascalCase",[]]]]],["star",{"sourceInterval":[231,237]},["app",{"sourceInterval":[231,236]},"space",[]]],["terminal",{"sourceInterval":[238,253]},"</Collection>"]]]}]);module.exports=result;