// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.notebook');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('org.numenta.sanity.viz_canvas');
goog.require('org.numenta.sanity.demos.runner');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.numenta.sanity.bridge.remote');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.numenta.sanity.selection');
goog.require('cognitect.transit');
goog.require('org.nfrac.comportex.util');
goog.require('clojure.walk');
cljs.core.enable_console_print_BANG_();
org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.notebook.remote_target__GT_chan = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
org.numenta.sanity.demos.notebook.connect = (function org$numenta$sanity$demos$notebook$connect(url){
var G__65720 = org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_;
var G__65721 = org.numenta.sanity.bridge.remote.init(url);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65720,G__65721) : cljs.core.reset_BANG_.call(null,G__65720,G__65721));
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.connect', org.numenta.sanity.demos.notebook.connect);
org.numenta.sanity.demos.notebook.read_transit_str = (function org$numenta$sanity$demos$notebook$read_transit_str(s){
return cognitect.transit.read(cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$json),s);
});
org.numenta.sanity.demos.notebook.display_inbits = (function org$numenta$sanity$demos$notebook$display_inbits(el,serialized){
var vec__65723 = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
var dims = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65723,(0),null);
var state__GT_bits = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65723,(1),null);
var d_opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65723,(2),null);
return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.inbits_display,dims,state__GT_bits,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$drawing.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.default_viz_options),d_opts], 0))], null),el);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.display_inbits', org.numenta.sanity.demos.notebook.display_inbits);
org.numenta.sanity.demos.notebook.release_inbits = (function org$numenta$sanity$demos$notebook$release_inbits(el){
return reagent.core.unmount_component_at_node(el);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.release_inbits', org.numenta.sanity.demos.notebook.release_inbits);
org.numenta.sanity.demos.notebook.add_viz = (function org$numenta$sanity$demos$notebook$add_viz(el,serialized){
var vec__65943 = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
var journal_target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65943,(0),null);
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65943,(1),null);
var into_journal = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var into_viz = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.notebook.remote_target__GT_chan,cljs.core.assoc,journal_target,into_journal);

(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_) : cljs.core.deref.call(null,org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_)).call(null,journal_target,into_journal);

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-steps",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function (state_66076){
var state_val_66077 = (state_66076[(1)]);
if((state_val_66077 === (7))){
var state_66076__$1 = state_66076;
var statearr_66078_66160 = state_66076__$1;
(statearr_66078_66160[(2)] = false);

(statearr_66078_66160[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (1))){
var state_66076__$1 = state_66076;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66076__$1,(2),response_c);
} else {
if((state_val_66077 === (4))){
var state_66076__$1 = state_66076;
var statearr_66079_66161 = state_66076__$1;
(statearr_66079_66161[(2)] = false);

(statearr_66079_66161[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (15))){
var inst_65996 = (state_66076[(7)]);
var inst_66011 = (state_66076[(8)]);
var inst_65995 = (state_66076[(9)]);
var inst_66033 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66034 = [org.numenta.sanity.viz_canvas.viz_timeline,inst_65995,inst_65996,inst_66011];
var inst_66035 = (new cljs.core.PersistentVector(null,4,(5),inst_66033,inst_66034,null));
var state_66076__$1 = state_66076;
var statearr_66080_66162 = state_66076__$1;
(statearr_66080_66162[(2)] = inst_66035);

(statearr_66080_66162[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (13))){
var state_66076__$1 = state_66076;
var statearr_66081_66163 = state_66076__$1;
(statearr_66081_66163[(2)] = org.numenta.sanity.viz_canvas.default_viz_options);

(statearr_66081_66163[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (6))){
var state_66076__$1 = state_66076;
var statearr_66082_66164 = state_66076__$1;
(statearr_66082_66164[(2)] = true);

(statearr_66082_66164[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (17))){
var inst_66023 = (state_66076[(10)]);
var inst_66028 = (state_66076[(11)]);
var inst_65996 = (state_66076[(7)]);
var inst_66011 = (state_66076[(8)]);
var inst_65991 = (state_66076[(12)]);
var inst_65995 = (state_66076[(9)]);
var inst_66038 = (state_66076[(2)]);
var inst_66039 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66040 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66041 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66042 = [cljs.core.cst$kw$style];
var inst_66043 = [cljs.core.cst$kw$border,cljs.core.cst$kw$vertical_DASH_align];
var inst_66044 = ["none","top"];
var inst_66045 = cljs.core.PersistentHashMap.fromArrays(inst_66043,inst_66044);
var inst_66046 = [inst_66045];
var inst_66047 = cljs.core.PersistentHashMap.fromArrays(inst_66042,inst_66046);
var inst_66048 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66049 = [org.numenta.sanity.demos.runner.world_pane,inst_65995,inst_65996];
var inst_66050 = (new cljs.core.PersistentVector(null,3,(5),inst_66048,inst_66049,null));
var inst_66051 = [cljs.core.cst$kw$td,inst_66047,inst_66050];
var inst_66052 = (new cljs.core.PersistentVector(null,3,(5),inst_66041,inst_66051,null));
var inst_66053 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66054 = [cljs.core.cst$kw$style];
var inst_66055 = [cljs.core.cst$kw$border,cljs.core.cst$kw$vertical_DASH_align];
var inst_66056 = ["none","top"];
var inst_66057 = cljs.core.PersistentHashMap.fromArrays(inst_66055,inst_66056);
var inst_66058 = [inst_66057];
var inst_66059 = cljs.core.PersistentHashMap.fromArrays(inst_66054,inst_66058);
var inst_66060 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66061 = [cljs.core.cst$kw$tabIndex];
var inst_66062 = [(0)];
var inst_66063 = cljs.core.PersistentHashMap.fromArrays(inst_66061,inst_66062);
var inst_66064 = [org.numenta.sanity.viz_canvas.viz_canvas,inst_66063,inst_65995,inst_65996,inst_65991,inst_66011,into_viz,null,into_journal];
var inst_66065 = (new cljs.core.PersistentVector(null,9,(5),inst_66060,inst_66064,null));
var inst_66066 = [cljs.core.cst$kw$td,inst_66059,inst_66065];
var inst_66067 = (new cljs.core.PersistentVector(null,3,(5),inst_66053,inst_66066,null));
var inst_66068 = [cljs.core.cst$kw$tr,inst_66052,inst_66067];
var inst_66069 = (new cljs.core.PersistentVector(null,3,(5),inst_66040,inst_66068,null));
var inst_66070 = [cljs.core.cst$kw$table,inst_66069];
var inst_66071 = (new cljs.core.PersistentVector(null,2,(5),inst_66039,inst_66070,null));
var inst_66072 = [cljs.core.cst$kw$div,inst_66028,inst_66038,inst_66071];
var inst_66073 = (new cljs.core.PersistentVector(null,4,(5),inst_66023,inst_66072,null));
var inst_66074 = reagent.core.render.cljs$core$IFn$_invoke$arity$2(inst_66073,el);
var state_66076__$1 = state_66076;
return cljs.core.async.impl.ioc_helpers.return_chan(state_66076__$1,inst_66074);
} else {
if((state_val_66077 === (3))){
var inst_65948 = (state_66076[(13)]);
var inst_65954 = inst_65948.cljs$lang$protocol_mask$partition0$;
var inst_65955 = (inst_65954 & (64));
var inst_65956 = inst_65948.cljs$core$ISeq$;
var inst_65957 = (inst_65955) || (inst_65956);
var state_66076__$1 = state_66076;
if(cljs.core.truth_(inst_65957)){
var statearr_66083_66165 = state_66076__$1;
(statearr_66083_66165[(1)] = (6));

} else {
var statearr_66084_66166 = state_66076__$1;
(statearr_66084_66166[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (12))){
var inst_66002 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66003 = [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode];
var inst_66004 = (new cljs.core.PersistentVector(null,2,(5),inst_66002,inst_66003,null));
var inst_66005 = cljs.core.assoc_in(org.numenta.sanity.viz_canvas.default_viz_options,inst_66004,cljs.core.cst$kw$two_DASH_d);
var state_66076__$1 = state_66076;
var statearr_66085_66167 = state_66076__$1;
(statearr_66085_66167[(2)] = inst_66005);

(statearr_66085_66167[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (2))){
var inst_65947 = (state_66076[(14)]);
var inst_65948 = (state_66076[(13)]);
var inst_65947__$1 = (state_66076[(2)]);
var inst_65948__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_65947__$1,(0),null);
var inst_65949 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_65947__$1,(1),null);
var inst_65951 = (inst_65948__$1 == null);
var inst_65952 = cljs.core.not(inst_65951);
var state_66076__$1 = (function (){var statearr_66086 = state_66076;
(statearr_66086[(14)] = inst_65947__$1);

(statearr_66086[(15)] = inst_65949);

(statearr_66086[(13)] = inst_65948__$1);

return statearr_66086;
})();
if(inst_65952){
var statearr_66087_66168 = state_66076__$1;
(statearr_66087_66168[(1)] = (3));

} else {
var statearr_66088_66169 = state_66076__$1;
(statearr_66088_66169[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (11))){
var inst_65947 = (state_66076[(14)]);
var inst_65970 = (state_66076[(16)]);
var inst_65949 = (state_66076[(15)]);
var inst_65948 = (state_66076[(13)]);
var inst_65969 = (state_66076[(17)]);
var inst_65971 = (state_66076[(18)]);
var inst_65995 = (state_66076[(9)]);
var inst_65969__$1 = (state_66076[(2)]);
var inst_65970__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_65969__$1,"regions");
var inst_65971__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_65969__$1,"senses");
var inst_65972 = [cljs.core.cst$kw$regions,cljs.core.cst$kw$senses];
var inst_65973 = cljs.core.PersistentHashMap.EMPTY;
var inst_65978 = (function (){var vec__65944 = inst_65947;
var st = inst_65948;
var all_steps = inst_65949;
var r = inst_65947;
var map__65945 = inst_65969__$1;
var regions = inst_65970__$1;
var senses = inst_65971__$1;
return ((function (vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function org$numenta$sanity$demos$notebook$add_viz_$_iter__65974(s__65975){
return (new cljs.core.LazySeq(null,((function (vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var s__65975__$1 = s__65975;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__65975__$1);
if(temp__4653__auto__){
var s__65975__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__65975__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__65975__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__65977 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__65976 = (0);
while(true){
if((i__65976 < size__5453__auto__)){
var vec__66113 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__65976);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66113,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66113,(1),null);
cljs.core.chunk_append(b__65977,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (i__65976,vec__66113,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__65977,s__65975__$2,temp__4653__auto__,vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function org$numenta$sanity$demos$notebook$add_viz_$_iter__65974_$_iter__66114(s__66115){
return (new cljs.core.LazySeq(null,((function (i__65976,vec__66113,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__65977,s__65975__$2,temp__4653__auto__,vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var s__66115__$1 = s__66115;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__66115__$1);
if(temp__4653__auto____$1){
var s__66115__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__66115__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__66115__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__66117 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__66116 = (0);
while(true){
if((i__66116 < size__5453__auto____$1)){
var vec__66122 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__66116);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66122,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66122,(1),null);
cljs.core.chunk_append(b__66117,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null));

var G__66170 = (i__66116 + (1));
i__66116 = G__66170;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66117),org$numenta$sanity$demos$notebook$add_viz_$_iter__65974_$_iter__66114(cljs.core.chunk_rest(s__66115__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66117),null);
}
} else {
var vec__66123 = cljs.core.first(s__66115__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66123,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66123,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null),org$numenta$sanity$demos$notebook$add_viz_$_iter__65974_$_iter__66114(cljs.core.rest(s__66115__$2)));
}
} else {
return null;
}
break;
}
});})(i__65976,vec__66113,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__65977,s__65975__$2,temp__4653__auto__,vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
,null,null));
});})(i__65976,vec__66113,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__65977,s__65975__$2,temp__4653__auto__,vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
;
return iter__5454__auto__(rgn);
})())], null));

var G__66171 = (i__65976 + (1));
i__65976 = G__66171;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__65977),org$numenta$sanity$demos$notebook$add_viz_$_iter__65974(cljs.core.chunk_rest(s__65975__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__65977),null);
}
} else {
var vec__66124 = cljs.core.first(s__65975__$2);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66124,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66124,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (vec__66124,rgn_id,rgn,s__65975__$2,temp__4653__auto__,vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function org$numenta$sanity$demos$notebook$add_viz_$_iter__65974_$_iter__66125(s__66126){
return (new cljs.core.LazySeq(null,((function (vec__66124,rgn_id,rgn,s__65975__$2,temp__4653__auto__,vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var s__66126__$1 = s__66126;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__66126__$1);
if(temp__4653__auto____$1){
var s__66126__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__66126__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66126__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66128 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66127 = (0);
while(true){
if((i__66127 < size__5453__auto__)){
var vec__66133 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66127);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66133,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66133,(1),null);
cljs.core.chunk_append(b__66128,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null));

var G__66172 = (i__66127 + (1));
i__66127 = G__66172;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66128),org$numenta$sanity$demos$notebook$add_viz_$_iter__65974_$_iter__66125(cljs.core.chunk_rest(s__66126__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66128),null);
}
} else {
var vec__66134 = cljs.core.first(s__66126__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66134,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66134,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null),org$numenta$sanity$demos$notebook$add_viz_$_iter__65974_$_iter__66125(cljs.core.rest(s__66126__$2)));
}
} else {
return null;
}
break;
}
});})(vec__66124,rgn_id,rgn,s__65975__$2,temp__4653__auto__,vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
,null,null));
});})(vec__66124,rgn_id,rgn,s__65975__$2,temp__4653__auto__,vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
;
return iter__5454__auto__(rgn);
})())], null),org$numenta$sanity$demos$notebook$add_viz_$_iter__65974(cljs.core.rest(s__65975__$2)));
}
} else {
return null;
}
break;
}
});})(vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
,null,null));
});
;})(vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_65979 = (inst_65978.cljs$core$IFn$_invoke$arity$1 ? inst_65978.cljs$core$IFn$_invoke$arity$1(inst_65970__$1) : inst_65978.call(null,inst_65970__$1));
var inst_65980 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(inst_65973,inst_65979);
var inst_65981 = cljs.core.PersistentHashMap.EMPTY;
var inst_65986 = (function (){var vec__65944 = inst_65947;
var st = inst_65948;
var all_steps = inst_65949;
var r = inst_65947;
var map__65945 = inst_65969__$1;
var regions = inst_65970__$1;
var senses = inst_65971__$1;
return ((function (vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,inst_65978,inst_65979,inst_65980,inst_65981,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function org$numenta$sanity$demos$notebook$add_viz_$_iter__65982(s__65983){
return (new cljs.core.LazySeq(null,((function (vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,inst_65978,inst_65979,inst_65980,inst_65981,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var s__65983__$1 = s__65983;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__65983__$1);
if(temp__4653__auto__){
var s__65983__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__65983__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__65983__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__65985 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__65984 = (0);
while(true){
if((i__65984 < size__5453__auto__)){
var vec__66139 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__65984);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66139,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66139,(1),null);
cljs.core.chunk_append(b__65985,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null));

var G__66173 = (i__65984 + (1));
i__65984 = G__66173;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__65985),org$numenta$sanity$demos$notebook$add_viz_$_iter__65982(cljs.core.chunk_rest(s__65983__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__65985),null);
}
} else {
var vec__66140 = cljs.core.first(s__65983__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66140,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66140,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null),org$numenta$sanity$demos$notebook$add_viz_$_iter__65982(cljs.core.rest(s__65983__$2)));
}
} else {
return null;
}
break;
}
});})(vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,inst_65978,inst_65979,inst_65980,inst_65981,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
,null,null));
});
;})(vec__65944,st,all_steps,r,map__65945,regions,senses,inst_65947,inst_65970,inst_65949,inst_65948,inst_65969,inst_65971,inst_65995,inst_65969__$1,inst_65970__$1,inst_65971__$1,inst_65972,inst_65973,inst_65978,inst_65979,inst_65980,inst_65981,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_65987 = (inst_65986.cljs$core$IFn$_invoke$arity$1 ? inst_65986.cljs$core$IFn$_invoke$arity$1(inst_65971__$1) : inst_65986.call(null,inst_65971__$1));
var inst_65988 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(inst_65981,inst_65987);
var inst_65989 = [inst_65980,inst_65988];
var inst_65990 = cljs.core.PersistentHashMap.fromArrays(inst_65972,inst_65989);
var inst_65991 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_65990);
var inst_65992 = clojure.walk.keywordize_keys(inst_65949);
var inst_65993 = cljs.core.reverse(inst_65992);
var inst_65994 = cljs.core.vec(inst_65993);
var inst_65995__$1 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_65994);
var inst_65996 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.selection.blank_selection);
var inst_65998 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_65995__$1) : cljs.core.deref.call(null,inst_65995__$1));
var inst_65999 = cljs.core.count(inst_65998);
var inst_66000 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),inst_65999);
var state_66076__$1 = (function (){var statearr_66141 = state_66076;
(statearr_66141[(16)] = inst_65970__$1);

(statearr_66141[(7)] = inst_65996);

(statearr_66141[(12)] = inst_65991);

(statearr_66141[(17)] = inst_65969__$1);

(statearr_66141[(18)] = inst_65971__$1);

(statearr_66141[(9)] = inst_65995__$1);

return statearr_66141;
})();
if(inst_66000){
var statearr_66142_66174 = state_66076__$1;
(statearr_66142_66174[(1)] = (12));

} else {
var statearr_66143_66175 = state_66076__$1;
(statearr_66143_66175[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (9))){
var inst_65948 = (state_66076[(13)]);
var inst_65966 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_65948);
var state_66076__$1 = state_66076;
var statearr_66144_66176 = state_66076__$1;
(statearr_66144_66176[(2)] = inst_65966);

(statearr_66144_66176[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (5))){
var inst_65964 = (state_66076[(2)]);
var state_66076__$1 = state_66076;
if(cljs.core.truth_(inst_65964)){
var statearr_66145_66177 = state_66076__$1;
(statearr_66145_66177[(1)] = (9));

} else {
var statearr_66146_66178 = state_66076__$1;
(statearr_66146_66178[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (14))){
var inst_65947 = (state_66076[(14)]);
var inst_65970 = (state_66076[(16)]);
var inst_65996 = (state_66076[(7)]);
var inst_65949 = (state_66076[(15)]);
var inst_66011 = (state_66076[(8)]);
var inst_65991 = (state_66076[(12)]);
var inst_65948 = (state_66076[(13)]);
var inst_65969 = (state_66076[(17)]);
var inst_65971 = (state_66076[(18)]);
var inst_65995 = (state_66076[(9)]);
var inst_66008 = (state_66076[(2)]);
var inst_66009 = (function (){var selection = inst_65996;
var vec__65944 = inst_65947;
var senses = inst_65971;
var r = inst_65947;
var base_opts = inst_66008;
var step_template = inst_65991;
var all_steps = inst_65949;
var regions = inst_65970;
var steps = inst_65995;
var map__65945 = inst_65969;
var st = inst_65948;
return ((function (selection,vec__65944,senses,r,base_opts,step_template,all_steps,regions,steps,map__65945,st,inst_65947,inst_65970,inst_65996,inst_65949,inst_66011,inst_65991,inst_65948,inst_65969,inst_65971,inst_65995,inst_66008,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function() { 
var G__66179__delegate = function (xs){
var last_non_nil = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(cljs.core.nil_QMARK_),cljs.core.reverse(xs)));
if(cljs.core.coll_QMARK_(last_non_nil)){
return last_non_nil;
} else {
return cljs.core.last(xs);
}
};
var G__66179 = function (var_args){
var xs = null;
if (arguments.length > 0) {
var G__66180__i = 0, G__66180__a = new Array(arguments.length -  0);
while (G__66180__i < G__66180__a.length) {G__66180__a[G__66180__i] = arguments[G__66180__i + 0]; ++G__66180__i;}
  xs = new cljs.core.IndexedSeq(G__66180__a,0);
} 
return G__66179__delegate.call(this,xs);};
G__66179.cljs$lang$maxFixedArity = 0;
G__66179.cljs$lang$applyTo = (function (arglist__66181){
var xs = cljs.core.seq(arglist__66181);
return G__66179__delegate(xs);
});
G__66179.cljs$core$IFn$_invoke$arity$variadic = G__66179__delegate;
return G__66179;
})()
;
;})(selection,vec__65944,senses,r,base_opts,step_template,all_steps,regions,steps,map__65945,st,inst_65947,inst_65970,inst_65996,inst_65949,inst_66011,inst_65991,inst_65948,inst_65969,inst_65971,inst_65995,inst_66008,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_66010 = org.nfrac.comportex.util.deep_merge_with.cljs$core$IFn$_invoke$arity$variadic(inst_66009,cljs.core.array_seq([inst_66008,opts], 0));
var inst_66011__$1 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_66010);
var inst_66013 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_65991) : cljs.core.deref.call(null,inst_65991));
var inst_66014 = cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(inst_66013);
var inst_66015 = cljs.core.seq(inst_66014);
var inst_66016 = cljs.core.first(inst_66015);
var inst_66017 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_66016,(0),null);
var inst_66018 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_66016,(1),null);
var inst_66019 = cljs.core.keys(inst_66018);
var inst_66020 = cljs.core.first(inst_66019);
var inst_66021 = (function (){var selection = inst_65996;
var vec__65944 = inst_65947;
var senses = inst_65971;
var vec__66012 = inst_66016;
var r = inst_65947;
var base_opts = inst_66008;
var step_template = inst_65991;
var all_steps = inst_65949;
var regions = inst_65970;
var steps = inst_65995;
var viz_options = inst_66011__$1;
var layer_id = inst_66020;
var rgn = inst_66018;
var map__65945 = inst_65969;
var st = inst_65948;
var region_key = inst_66017;
return ((function (selection,vec__65944,senses,vec__66012,r,base_opts,step_template,all_steps,regions,steps,viz_options,layer_id,rgn,map__65945,st,region_key,inst_65947,inst_65970,inst_65996,inst_65949,inst_66011,inst_65991,inst_65948,inst_65969,inst_65971,inst_65995,inst_66008,inst_66009,inst_66010,inst_66011__$1,inst_66013,inst_66014,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function (p1__65724_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.empty(p1__65724_SHARP_),new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$dt,(0),cljs.core.cst$kw$region,region_key,cljs.core.cst$kw$layer,layer_id,cljs.core.cst$kw$model_DASH_id,cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))))], null));
});
;})(selection,vec__65944,senses,vec__66012,r,base_opts,step_template,all_steps,regions,steps,viz_options,layer_id,rgn,map__65945,st,region_key,inst_65947,inst_65970,inst_65996,inst_65949,inst_66011,inst_65991,inst_65948,inst_65969,inst_65971,inst_65995,inst_66008,inst_66009,inst_66010,inst_66011__$1,inst_66013,inst_66014,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_66022 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(inst_65996,inst_66021);
var inst_66023 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66024 = [cljs.core.cst$kw$on_DASH_click,cljs.core.cst$kw$on_DASH_key_DASH_down,cljs.core.cst$kw$tabIndex];
var inst_66025 = (function (){var selection = inst_65996;
var vec__65944 = inst_65947;
var senses = inst_65971;
var r = inst_65947;
var base_opts = inst_66008;
var step_template = inst_65991;
var all_steps = inst_65949;
var regions = inst_65970;
var steps = inst_65995;
var viz_options = inst_66011__$1;
var map__65945 = inst_65969;
var st = inst_65948;
return ((function (selection,vec__65944,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,map__65945,st,inst_65947,inst_65970,inst_65996,inst_65949,inst_66011,inst_65991,inst_65948,inst_65969,inst_65971,inst_65995,inst_66008,inst_66009,inst_66010,inst_66011__$1,inst_66013,inst_66014,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,inst_66023,inst_66024,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_viz,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$background_DASH_clicked], null));
});
;})(selection,vec__65944,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,map__65945,st,inst_65947,inst_65970,inst_65996,inst_65949,inst_66011,inst_65991,inst_65948,inst_65969,inst_65971,inst_65995,inst_66008,inst_66009,inst_66010,inst_66011__$1,inst_66013,inst_66014,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,inst_66023,inst_66024,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_66026 = (function (){var selection = inst_65996;
var vec__65944 = inst_65947;
var senses = inst_65971;
var r = inst_65947;
var base_opts = inst_66008;
var step_template = inst_65991;
var all_steps = inst_65949;
var regions = inst_65970;
var steps = inst_65995;
var viz_options = inst_66011__$1;
var map__65945 = inst_65969;
var st = inst_65948;
return ((function (selection,vec__65944,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,map__65945,st,inst_65947,inst_65970,inst_65996,inst_65949,inst_66011,inst_65991,inst_65948,inst_65969,inst_65971,inst_65995,inst_66008,inst_66009,inst_66010,inst_66011__$1,inst_66013,inst_66014,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,inst_66023,inst_66024,inst_66025,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function (p1__65725_SHARP_){
return org.numenta.sanity.viz_canvas.viz_key_down(p1__65725_SHARP_,into_viz);
});
;})(selection,vec__65944,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,map__65945,st,inst_65947,inst_65970,inst_65996,inst_65949,inst_66011,inst_65991,inst_65948,inst_65969,inst_65971,inst_65995,inst_66008,inst_66009,inst_66010,inst_66011__$1,inst_66013,inst_66014,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,inst_66023,inst_66024,inst_66025,state_val_66077,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_66027 = [inst_66025,inst_66026,(1)];
var inst_66028 = cljs.core.PersistentHashMap.fromArrays(inst_66024,inst_66027);
var inst_66029 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_65995) : cljs.core.deref.call(null,inst_65995));
var inst_66030 = cljs.core.count(inst_66029);
var inst_66031 = (inst_66030 > (1));
var state_66076__$1 = (function (){var statearr_66147 = state_66076;
(statearr_66147[(10)] = inst_66023);

(statearr_66147[(11)] = inst_66028);

(statearr_66147[(8)] = inst_66011__$1);

(statearr_66147[(19)] = inst_66022);

return statearr_66147;
})();
if(cljs.core.truth_(inst_66031)){
var statearr_66148_66182 = state_66076__$1;
(statearr_66148_66182[(1)] = (15));

} else {
var statearr_66149_66183 = state_66076__$1;
(statearr_66149_66183[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (16))){
var state_66076__$1 = state_66076;
var statearr_66150_66184 = state_66076__$1;
(statearr_66150_66184[(2)] = null);

(statearr_66150_66184[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (10))){
var inst_65948 = (state_66076[(13)]);
var state_66076__$1 = state_66076;
var statearr_66151_66185 = state_66076__$1;
(statearr_66151_66185[(2)] = inst_65948);

(statearr_66151_66185[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66077 === (8))){
var inst_65961 = (state_66076[(2)]);
var state_66076__$1 = state_66076;
var statearr_66152_66186 = state_66076__$1;
(statearr_66152_66186[(2)] = inst_65961);

(statearr_66152_66186[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
;
return ((function (switch__35847__auto__,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c){
return (function() {
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____0 = (function (){
var statearr_66156 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_66156[(0)] = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__);

(statearr_66156[(1)] = (1));

return statearr_66156;
});
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____1 = (function (state_66076){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66076);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66157){if((e66157 instanceof Object)){
var ex__35851__auto__ = e66157;
var statearr_66158_66187 = state_66076;
(statearr_66158_66187[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66076);

return cljs.core.cst$kw$recur;
} else {
throw e66157;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66188 = state_66076;
state_66076 = G__66188;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__ = function(state_66076){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____1.call(this,state_66076);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
})();
var state__35963__auto__ = (function (){var statearr_66159 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66159[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_66159;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,vec__65943,journal_target,opts,into_journal,into_viz,response_c))
);

return c__35961__auto__;
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.add_viz', org.numenta.sanity.demos.notebook.add_viz);
org.numenta.sanity.demos.notebook.release_viz = (function org$numenta$sanity$demos$notebook$release_viz(el,serialized){
reagent.core.unmount_component_at_node(el);

var journal_target = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
cljs.core.async.close_BANG_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.notebook.remote_target__GT_chan) : cljs.core.deref.call(null,org.numenta.sanity.demos.notebook.remote_target__GT_chan)),journal_target));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.notebook.remote_target__GT_chan,cljs.core.dissoc,journal_target);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.release_viz', org.numenta.sanity.demos.notebook.release_viz);
org.numenta.sanity.demos.notebook.exported_viz = (function org$numenta$sanity$demos$notebook$exported_viz(el){
var cnvs = cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(el.getElementsByTagName("canvas"));
var copy_el = document.createElement("div");
copy_el.innerHTML = el.innerHTML;

var seq__66195_66201 = cljs.core.seq(cnvs);
var chunk__66197_66202 = null;
var count__66198_66203 = (0);
var i__66199_66204 = (0);
while(true){
if((i__66199_66204 < count__66198_66203)){
var cnv_66205 = chunk__66197_66202.cljs$core$IIndexed$_nth$arity$2(null,i__66199_66204);
var victim_el_66206 = (copy_el.getElementsByTagName("canvas")[(0)]);
var img_el_66207 = document.createElement("img");
img_el_66207.setAttribute("src",cnv_66205.toDataURL("image/png"));

var temp__4653__auto___66208 = victim_el_66206.getAttribute("style");
if(cljs.core.truth_(temp__4653__auto___66208)){
var style_66209 = temp__4653__auto___66208;
img_el_66207.setAttribute("style",style_66209);
} else {
}

victim_el_66206.parentNode.replaceChild(img_el_66207,victim_el_66206);

var G__66210 = seq__66195_66201;
var G__66211 = chunk__66197_66202;
var G__66212 = count__66198_66203;
var G__66213 = (i__66199_66204 + (1));
seq__66195_66201 = G__66210;
chunk__66197_66202 = G__66211;
count__66198_66203 = G__66212;
i__66199_66204 = G__66213;
continue;
} else {
var temp__4653__auto___66214 = cljs.core.seq(seq__66195_66201);
if(temp__4653__auto___66214){
var seq__66195_66215__$1 = temp__4653__auto___66214;
if(cljs.core.chunked_seq_QMARK_(seq__66195_66215__$1)){
var c__5485__auto___66216 = cljs.core.chunk_first(seq__66195_66215__$1);
var G__66217 = cljs.core.chunk_rest(seq__66195_66215__$1);
var G__66218 = c__5485__auto___66216;
var G__66219 = cljs.core.count(c__5485__auto___66216);
var G__66220 = (0);
seq__66195_66201 = G__66217;
chunk__66197_66202 = G__66218;
count__66198_66203 = G__66219;
i__66199_66204 = G__66220;
continue;
} else {
var cnv_66221 = cljs.core.first(seq__66195_66215__$1);
var victim_el_66222 = (copy_el.getElementsByTagName("canvas")[(0)]);
var img_el_66223 = document.createElement("img");
img_el_66223.setAttribute("src",cnv_66221.toDataURL("image/png"));

var temp__4653__auto___66224__$1 = victim_el_66222.getAttribute("style");
if(cljs.core.truth_(temp__4653__auto___66224__$1)){
var style_66225 = temp__4653__auto___66224__$1;
img_el_66223.setAttribute("style",style_66225);
} else {
}

victim_el_66222.parentNode.replaceChild(img_el_66223,victim_el_66222);

var G__66226 = cljs.core.next(seq__66195_66215__$1);
var G__66227 = null;
var G__66228 = (0);
var G__66229 = (0);
seq__66195_66201 = G__66226;
chunk__66197_66202 = G__66227;
count__66198_66203 = G__66228;
i__66199_66204 = G__66229;
continue;
}
} else {
}
}
break;
}

return copy_el.innerHTML;
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.exported_viz', org.numenta.sanity.demos.notebook.exported_viz);
