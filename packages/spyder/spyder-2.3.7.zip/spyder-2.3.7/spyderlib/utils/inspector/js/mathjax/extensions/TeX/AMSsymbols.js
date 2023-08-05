/*
 *  /MathJax/extensions/TeX/AMSsymbols.js
 *  
 *  Copyright (c) 2012 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Extension["TeX/AMSsymbols"]={version:"2.0"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a=MathJax.ElementJax.mml,b=MathJax.InputJax.TeX.Definitions;b.Add({mathchar0mi:{digamma:"03DD",varkappa:"03F0",varGamma:["0393",{mathvariant:a.VARIANT.ITALIC}],varDelta:["0394",{mathvariant:a.VARIANT.ITALIC}],varTheta:["0398",{mathvariant:a.VARIANT.ITALIC}],varLambda:["039B",{mathvariant:a.VARIANT.ITALIC}],varXi:["039E",{mathvariant:a.VARIANT.ITALIC}],varPi:["03A0",{mathvariant:a.VARIANT.ITALIC}],varSigma:["03A3",{mathvariant:a.VARIANT.ITALIC}],varUpsilon:["03A5",{mathvariant:a.VARIANT.ITALIC}],varPhi:["03A6",{mathvariant:a.VARIANT.ITALIC}],varPsi:["03A8",{mathvariant:a.VARIANT.ITALIC}],varOmega:["03A9",{mathvariant:a.VARIANT.ITALIC}],beth:"2136",gimel:"2137",daleth:"2138",backprime:["2035",{variantForm:true}],hslash:["210F",{variantForm:true}],varnothing:["2205",{variantForm:true}],blacktriangle:"25B2",triangledown:"25BD",blacktriangledown:"25BC",square:"25A1",Box:"25A1",blacksquare:"25A0",lozenge:"25CA",Diamond:"25CA",blacklozenge:"29EB",circledS:["24C8",{mathvariant:a.VARIANT.NORMAL}],bigstar:"2605",sphericalangle:"2222",measuredangle:"2221",nexists:"2204",complement:"2201",mho:"2127",eth:["00F0",{mathvariant:a.VARIANT.NORMAL}],Finv:"2132",diagup:"2571",Game:"2141",diagdown:"2572",Bbbk:["006B",{mathvariant:a.VARIANT.DOUBLESTRUCK}],yen:"00A5",circledR:"00AE",checkmark:"2713",maltese:"2720"},mathchar0mo:{dotplus:"2214",ltimes:"22C9",smallsetminus:["2216",{variantForm:true}],rtimes:"22CA",Cap:"22D2",doublecap:"22D2",leftthreetimes:"22CB",Cup:"22D3",doublecup:"22D3",rightthreetimes:"22CC",barwedge:"22BC",curlywedge:"22CF",veebar:"22BB",curlyvee:"22CE",doublebarwedge:"2A5E",boxminus:"229F",circleddash:"229D",boxtimes:"22A0",circledast:"229B",boxdot:"22A1",circledcirc:"229A",boxplus:"229E",centerdot:"22C5",divideontimes:"22C7",intercal:"22BA",leqq:"2266",geqq:"2267",leqslant:"2A7D",geqslant:"2A7E",eqslantless:"2A95",eqslantgtr:"2A96",lesssim:"2272",gtrsim:"2273",lessapprox:"2A85",gtrapprox:"2A86",approxeq:"224A",lessdot:"22D6",gtrdot:"22D7",lll:"22D8",llless:"22D8",ggg:"22D9",gggtr:"22D9",lessgtr:"2276",gtrless:"2277",lesseqgtr:"22DA",gtreqless:"22DB",lesseqqgtr:"2A8B",gtreqqless:"2A8C",doteqdot:"2251",Doteq:"2251",eqcirc:"2256",risingdotseq:"2253",circeq:"2257",fallingdotseq:"2252",triangleq:"225C",backsim:"223D",thicksim:["223C",{variantForm:true}],backsimeq:"22CD",thickapprox:["2248",{variantForm:true}],subseteqq:"2AC5",supseteqq:"2AC6",Subset:"22D0",Supset:"22D1",sqsubset:"228F",sqsupset:"2290",preccurlyeq:"227C",succcurlyeq:"227D",curlyeqprec:"22DE",curlyeqsucc:"22DF",precsim:"227E",succsim:"227F",precapprox:"2AB7",succapprox:"2AB8",vartriangleleft:"22B2",lhd:"22B2",vartriangleright:"22B3",rhd:"22B3",trianglelefteq:"22B4",unlhd:"22B4",trianglerighteq:"22B5",unrhd:"22B5",vDash:"22A8",Vdash:"22A9",Vvdash:"22AA",smallsmile:"2323",shortmid:["2223",{variantForm:true}],smallfrown:"2322",shortparallel:["2225",{variantForm:true}],bumpeq:"224F",between:"226C",Bumpeq:"224E",pitchfork:"22D4",varpropto:"221D",backepsilon:"220D",blacktriangleleft:"25C0",blacktriangleright:"25B6",therefore:"2234",because:"2235",eqsim:"2242",vartriangle:["25B3",{variantForm:true}],Join:"22C8",nless:"226E",ngtr:"226F",nleq:"2270",ngeq:"2271",nleqslant:["2A87",{variantForm:true}],ngeqslant:["2A88",{variantForm:true}],nleqq:["2270",{variantForm:true}],ngeqq:["2271",{variantForm:true}],lneq:"2A87",gneq:"2A88",lneqq:"2268",gneqq:"2269",lvertneqq:["2268",{variantForm:true}],gvertneqq:["2269",{variantForm:true}],lnsim:"22E6",gnsim:"22E7",lnapprox:"2A89",gnapprox:"2A8A",nprec:"2280",nsucc:"2281",npreceq:["22E0",{variantForm:true}],nsucceq:["22E1",{variantForm:true}],precneqq:"2AB5",succneqq:"2AB6",precnsim:"22E8",succnsim:"22E9",precnapprox:"2AB9",succnapprox:"2ABA",nsim:"2241",ncong:"2246",nshortmid:["2224",{variantForm:true}],nshortparallel:["2226",{variantForm:true}],nmid:"2224",nparallel:"2226",nvdash:"22AC",nvDash:"22AD",nVdash:"22AE",nVDash:"22AF",ntriangleleft:"22EA",ntriangleright:"22EB",ntrianglelefteq:"22EC",ntrianglerighteq:"22ED",nsubseteq:"2288",nsupseteq:"2289",nsubseteqq:["2288",{variantForm:true}],nsupseteqq:["2289",{variantForm:true}],subsetneq:"228A",supsetneq:"228B",varsubsetneq:["228A",{variantForm:true}],varsupsetneq:["228B",{variantForm:true}],subsetneqq:"2ACB",supsetneqq:"2ACC",varsubsetneqq:["2ACB",{variantForm:true}],varsupsetneqq:["2ACC",{variantForm:true}],leftleftarrows:"21C7",rightrightarrows:"21C9",leftrightarrows:"21C6",rightleftarrows:"21C4",Lleftarrow:"21DA",Rrightarrow:"21DB",twoheadleftarrow:"219E",twoheadrightarrow:"21A0",leftarrowtail:"21A2",rightarrowtail:"21A3",looparrowleft:"21AB",looparrowright:"21AC",leftrightharpoons:"21CB",rightleftharpoons:["21CC",{variantForm:true}],curvearrowleft:"21B6",curvearrowright:"21B7",circlearrowleft:"21BA",circlearrowright:"21BB",Lsh:"21B0",Rsh:"21B1",upuparrows:"21C8",downdownarrows:"21CA",upharpoonleft:"21BF",upharpoonright:"21BE",downharpoonleft:"21C3",restriction:"21BE",multimap:"22B8",downharpoonright:"21C2",leftrightsquigarrow:"21AD",rightsquigarrow:"21DD",leadsto:"21DD",dashrightarrow:"21E2",dashleftarrow:"21E0",nleftarrow:"219A",nrightarrow:"219B",nLeftarrow:"21CD",nRightarrow:"21CF",nleftrightarrow:"21AE",nLeftrightarrow:"21CE"},delimiter:{"\\ulcorner":"231C","\\urcorner":"231D","\\llcorner":"231E","\\lrcorner":"231F"},macros:{implies:["Macro","\\;\\Longrightarrow\\;"],impliedby:["Macro","\\;\\Longleftarrow\\;"]}},null,true);var c=a.mo.OPTYPES.REL;MathJax.Hub.Insert(a.mo.prototype,{OPTABLE:{infix:{"\u2322":c,"\u2323":c,"\u25B3":c,"\uE006":c,"\uE007":c,"\uE00C":c,"\uE00D":c,"\uE00E":c,"\uE00F":c,"\uE010":c,"\uE011":c,"\uE016":c,"\uE017":c,"\uE018":c,"\uE019":c,"\uE01A":c,"\uE01B":c,"\uE04B":c,"\uE04F":c}}});MathJax.Hub.Startup.signal.Post("TeX AMSsymbols Ready")});MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var a=MathJax.OutputJax["HTML-CSS"];var b=a.FONTDATA.VARIANT;if(a.fontInUse==="TeX"){b["-TeX-variant"]={fonts:["MathJax_AMS","MathJax_Main","MathJax_Size1"],remap:{8808:57356,8809:57357,8816:57361,8817:57358,10887:57360,10888:57359,8740:57350,8742:57351,8840:57366,8841:57368,8842:57370,8843:57371,10955:57367,10956:57369,988:57352,1008:57353}};if(a.msieIE6){MathJax.Hub.Insert(b["-TeX-variant"].remap,{8592:[58049,"-WinIE6"],8594:[58048,"-WinIE6"],8739:[58050,"-WinIE6"],8741:[58051,"-WinIE6"],8764:[58052,"-WinIE6"],9651:[58067,"-WinIE6"]})}}if(a.fontInUse==="STIX"){MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var c=MathJax.InputJax.TeX.Definitions;c.mathchar0mi.varnothing="2205";c.mathchar0mi.hslash="210F";c.mathchar0mi.blacktriangle="25B4";c.mathchar0mi.blacktriangledown="25BE";c.mathchar0mi.square="25FB";c.mathchar0mi.blacksquare="25FC";c.mathchar0mi.vartriangle=["25B3",{mathsize:"71%"}];c.mathchar0mi.triangledown=["25BD",{mathsize:"71%"}];c.mathchar0mo.blacktriangleleft="25C2";c.mathchar0mo.blacktriangleright="25B8";c.mathchar0mo.smallsetminus="2216";MathJax.Hub.Insert(b["-STIX-variant"],{remap:{10887:57360,10888:57359,8816:57361,8817:57358,8928:57419,8929:57423,8840:57366,8841:57368}})})}});MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var b=MathJax.OutputJax.SVG;var a=b.FONTDATA.VARIANT;a["-TeX-variant"]={fonts:["MathJax_AMS","MathJax_Main","MathJax_Size1"],remap:{8808:57356,8809:57357,8816:57361,8817:57358,10887:57360,10888:57359,8740:57350,8742:57351,8840:57366,8841:57368,8842:57370,8843:57371,10955:57367,10956:57369,988:57352,1008:57353}}});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/AMSsymbols.js");

