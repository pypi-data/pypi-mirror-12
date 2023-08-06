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
var G__65722 = org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_;
var G__65723 = org.numenta.sanity.bridge.remote.init(url);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65722,G__65723) : cljs.core.reset_BANG_.call(null,G__65722,G__65723));
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.connect', org.numenta.sanity.demos.notebook.connect);
org.numenta.sanity.demos.notebook.read_transit_str = (function org$numenta$sanity$demos$notebook$read_transit_str(s){
return cognitect.transit.read(cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$json),s);
});
org.numenta.sanity.demos.notebook.display_inbits = (function org$numenta$sanity$demos$notebook$display_inbits(el,serialized){
var vec__65725 = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
var dims = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65725,(0),null);
var state__GT_bits = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65725,(1),null);
var d_opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65725,(2),null);
return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.inbits_display,dims,state__GT_bits,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$drawing.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.default_viz_options),d_opts], 0))], null),el);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.display_inbits', org.numenta.sanity.demos.notebook.display_inbits);
org.numenta.sanity.demos.notebook.release_inbits = (function org$numenta$sanity$demos$notebook$release_inbits(el){
return reagent.core.unmount_component_at_node(el);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.release_inbits', org.numenta.sanity.demos.notebook.release_inbits);
org.numenta.sanity.demos.notebook.add_viz = (function org$numenta$sanity$demos$notebook$add_viz(el,serialized){
var vec__65945 = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
var journal_target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65945,(0),null);
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65945,(1),null);
var into_journal = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var into_viz = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.notebook.remote_target__GT_chan,cljs.core.assoc,journal_target,into_journal);

(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_) : cljs.core.deref.call(null,org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_)).call(null,journal_target,into_journal);

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-steps",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function (state_66078){
var state_val_66079 = (state_66078[(1)]);
if((state_val_66079 === (7))){
var state_66078__$1 = state_66078;
var statearr_66080_66162 = state_66078__$1;
(statearr_66080_66162[(2)] = false);

(statearr_66080_66162[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (1))){
var state_66078__$1 = state_66078;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66078__$1,(2),response_c);
} else {
if((state_val_66079 === (4))){
var state_66078__$1 = state_66078;
var statearr_66081_66163 = state_66078__$1;
(statearr_66081_66163[(2)] = false);

(statearr_66081_66163[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (15))){
var inst_65998 = (state_66078[(7)]);
var inst_66013 = (state_66078[(8)]);
var inst_65997 = (state_66078[(9)]);
var inst_66035 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66036 = [org.numenta.sanity.viz_canvas.viz_timeline,inst_65997,inst_65998,inst_66013];
var inst_66037 = (new cljs.core.PersistentVector(null,4,(5),inst_66035,inst_66036,null));
var state_66078__$1 = state_66078;
var statearr_66082_66164 = state_66078__$1;
(statearr_66082_66164[(2)] = inst_66037);

(statearr_66082_66164[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (13))){
var state_66078__$1 = state_66078;
var statearr_66083_66165 = state_66078__$1;
(statearr_66083_66165[(2)] = org.numenta.sanity.viz_canvas.default_viz_options);

(statearr_66083_66165[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (6))){
var state_66078__$1 = state_66078;
var statearr_66084_66166 = state_66078__$1;
(statearr_66084_66166[(2)] = true);

(statearr_66084_66166[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (17))){
var inst_66030 = (state_66078[(10)]);
var inst_65993 = (state_66078[(11)]);
var inst_65998 = (state_66078[(7)]);
var inst_66013 = (state_66078[(8)]);
var inst_66025 = (state_66078[(12)]);
var inst_65997 = (state_66078[(9)]);
var inst_66040 = (state_66078[(2)]);
var inst_66041 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66042 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66043 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66044 = [cljs.core.cst$kw$style];
var inst_66045 = [cljs.core.cst$kw$border,cljs.core.cst$kw$vertical_DASH_align];
var inst_66046 = ["none","top"];
var inst_66047 = cljs.core.PersistentHashMap.fromArrays(inst_66045,inst_66046);
var inst_66048 = [inst_66047];
var inst_66049 = cljs.core.PersistentHashMap.fromArrays(inst_66044,inst_66048);
var inst_66050 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66051 = [org.numenta.sanity.demos.runner.world_pane,inst_65997,inst_65998];
var inst_66052 = (new cljs.core.PersistentVector(null,3,(5),inst_66050,inst_66051,null));
var inst_66053 = [cljs.core.cst$kw$td,inst_66049,inst_66052];
var inst_66054 = (new cljs.core.PersistentVector(null,3,(5),inst_66043,inst_66053,null));
var inst_66055 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66056 = [cljs.core.cst$kw$style];
var inst_66057 = [cljs.core.cst$kw$border,cljs.core.cst$kw$vertical_DASH_align];
var inst_66058 = ["none","top"];
var inst_66059 = cljs.core.PersistentHashMap.fromArrays(inst_66057,inst_66058);
var inst_66060 = [inst_66059];
var inst_66061 = cljs.core.PersistentHashMap.fromArrays(inst_66056,inst_66060);
var inst_66062 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66063 = [cljs.core.cst$kw$tabIndex];
var inst_66064 = [(0)];
var inst_66065 = cljs.core.PersistentHashMap.fromArrays(inst_66063,inst_66064);
var inst_66066 = [org.numenta.sanity.viz_canvas.viz_canvas,inst_66065,inst_65997,inst_65998,inst_65993,inst_66013,into_viz,null,into_journal];
var inst_66067 = (new cljs.core.PersistentVector(null,9,(5),inst_66062,inst_66066,null));
var inst_66068 = [cljs.core.cst$kw$td,inst_66061,inst_66067];
var inst_66069 = (new cljs.core.PersistentVector(null,3,(5),inst_66055,inst_66068,null));
var inst_66070 = [cljs.core.cst$kw$tr,inst_66054,inst_66069];
var inst_66071 = (new cljs.core.PersistentVector(null,3,(5),inst_66042,inst_66070,null));
var inst_66072 = [cljs.core.cst$kw$table,inst_66071];
var inst_66073 = (new cljs.core.PersistentVector(null,2,(5),inst_66041,inst_66072,null));
var inst_66074 = [cljs.core.cst$kw$div,inst_66030,inst_66040,inst_66073];
var inst_66075 = (new cljs.core.PersistentVector(null,4,(5),inst_66025,inst_66074,null));
var inst_66076 = reagent.core.render.cljs$core$IFn$_invoke$arity$2(inst_66075,el);
var state_66078__$1 = state_66078;
return cljs.core.async.impl.ioc_helpers.return_chan(state_66078__$1,inst_66076);
} else {
if((state_val_66079 === (3))){
var inst_65950 = (state_66078[(13)]);
var inst_65956 = inst_65950.cljs$lang$protocol_mask$partition0$;
var inst_65957 = (inst_65956 & (64));
var inst_65958 = inst_65950.cljs$core$ISeq$;
var inst_65959 = (inst_65957) || (inst_65958);
var state_66078__$1 = state_66078;
if(cljs.core.truth_(inst_65959)){
var statearr_66085_66167 = state_66078__$1;
(statearr_66085_66167[(1)] = (6));

} else {
var statearr_66086_66168 = state_66078__$1;
(statearr_66086_66168[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (12))){
var inst_66004 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66005 = [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode];
var inst_66006 = (new cljs.core.PersistentVector(null,2,(5),inst_66004,inst_66005,null));
var inst_66007 = cljs.core.assoc_in(org.numenta.sanity.viz_canvas.default_viz_options,inst_66006,cljs.core.cst$kw$two_DASH_d);
var state_66078__$1 = state_66078;
var statearr_66087_66169 = state_66078__$1;
(statearr_66087_66169[(2)] = inst_66007);

(statearr_66087_66169[(1)] = (14));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (2))){
var inst_65949 = (state_66078[(14)]);
var inst_65950 = (state_66078[(13)]);
var inst_65949__$1 = (state_66078[(2)]);
var inst_65950__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_65949__$1,(0),null);
var inst_65951 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_65949__$1,(1),null);
var inst_65953 = (inst_65950__$1 == null);
var inst_65954 = cljs.core.not(inst_65953);
var state_66078__$1 = (function (){var statearr_66088 = state_66078;
(statearr_66088[(14)] = inst_65949__$1);

(statearr_66088[(15)] = inst_65951);

(statearr_66088[(13)] = inst_65950__$1);

return statearr_66088;
})();
if(inst_65954){
var statearr_66089_66170 = state_66078__$1;
(statearr_66089_66170[(1)] = (3));

} else {
var statearr_66090_66171 = state_66078__$1;
(statearr_66090_66171[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (11))){
var inst_65972 = (state_66078[(16)]);
var inst_65973 = (state_66078[(17)]);
var inst_65949 = (state_66078[(14)]);
var inst_65951 = (state_66078[(15)]);
var inst_65950 = (state_66078[(13)]);
var inst_65997 = (state_66078[(9)]);
var inst_65971 = (state_66078[(18)]);
var inst_65971__$1 = (state_66078[(2)]);
var inst_65972__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_65971__$1,"regions");
var inst_65973__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_65971__$1,"senses");
var inst_65974 = [cljs.core.cst$kw$regions,cljs.core.cst$kw$senses];
var inst_65975 = cljs.core.PersistentHashMap.EMPTY;
var inst_65980 = (function (){var vec__65946 = inst_65949;
var st = inst_65950;
var all_steps = inst_65951;
var r = inst_65949;
var map__65947 = inst_65971__$1;
var regions = inst_65972__$1;
var senses = inst_65973__$1;
return ((function (vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function org$numenta$sanity$demos$notebook$add_viz_$_iter__65976(s__65977){
return (new cljs.core.LazySeq(null,((function (vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var s__65977__$1 = s__65977;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__65977__$1);
if(temp__4653__auto__){
var s__65977__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__65977__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__65977__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__65979 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__65978 = (0);
while(true){
if((i__65978 < size__5453__auto__)){
var vec__66115 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__65978);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66115,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66115,(1),null);
cljs.core.chunk_append(b__65979,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (i__65978,vec__66115,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__65979,s__65977__$2,temp__4653__auto__,vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function org$numenta$sanity$demos$notebook$add_viz_$_iter__65976_$_iter__66116(s__66117){
return (new cljs.core.LazySeq(null,((function (i__65978,vec__66115,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__65979,s__65977__$2,temp__4653__auto__,vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var s__66117__$1 = s__66117;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__66117__$1);
if(temp__4653__auto____$1){
var s__66117__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__66117__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__66117__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__66119 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__66118 = (0);
while(true){
if((i__66118 < size__5453__auto____$1)){
var vec__66124 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__66118);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66124,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66124,(1),null);
cljs.core.chunk_append(b__66119,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null));

var G__66172 = (i__66118 + (1));
i__66118 = G__66172;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66119),org$numenta$sanity$demos$notebook$add_viz_$_iter__65976_$_iter__66116(cljs.core.chunk_rest(s__66117__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66119),null);
}
} else {
var vec__66125 = cljs.core.first(s__66117__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66125,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66125,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null),org$numenta$sanity$demos$notebook$add_viz_$_iter__65976_$_iter__66116(cljs.core.rest(s__66117__$2)));
}
} else {
return null;
}
break;
}
});})(i__65978,vec__66115,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__65979,s__65977__$2,temp__4653__auto__,vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
,null,null));
});})(i__65978,vec__66115,rgn_id,rgn,c__5452__auto__,size__5453__auto__,b__65979,s__65977__$2,temp__4653__auto__,vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
;
return iter__5454__auto__(rgn);
})())], null));

var G__66173 = (i__65978 + (1));
i__65978 = G__66173;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__65979),org$numenta$sanity$demos$notebook$add_viz_$_iter__65976(cljs.core.chunk_rest(s__65977__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__65979),null);
}
} else {
var vec__66126 = cljs.core.first(s__65977__$2);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66126,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66126,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (vec__66126,rgn_id,rgn,s__65977__$2,temp__4653__auto__,vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function org$numenta$sanity$demos$notebook$add_viz_$_iter__65976_$_iter__66127(s__66128){
return (new cljs.core.LazySeq(null,((function (vec__66126,rgn_id,rgn,s__65977__$2,temp__4653__auto__,vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var s__66128__$1 = s__66128;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__66128__$1);
if(temp__4653__auto____$1){
var s__66128__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__66128__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66128__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66130 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66129 = (0);
while(true){
if((i__66129 < size__5453__auto__)){
var vec__66135 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66129);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66135,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66135,(1),null);
cljs.core.chunk_append(b__66130,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null));

var G__66174 = (i__66129 + (1));
i__66129 = G__66174;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66130),org$numenta$sanity$demos$notebook$add_viz_$_iter__65976_$_iter__66127(cljs.core.chunk_rest(s__66128__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66130),null);
}
} else {
var vec__66136 = cljs.core.first(s__66128__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66136,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66136,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null),org$numenta$sanity$demos$notebook$add_viz_$_iter__65976_$_iter__66127(cljs.core.rest(s__66128__$2)));
}
} else {
return null;
}
break;
}
});})(vec__66126,rgn_id,rgn,s__65977__$2,temp__4653__auto__,vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
,null,null));
});})(vec__66126,rgn_id,rgn,s__65977__$2,temp__4653__auto__,vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
;
return iter__5454__auto__(rgn);
})())], null),org$numenta$sanity$demos$notebook$add_viz_$_iter__65976(cljs.core.rest(s__65977__$2)));
}
} else {
return null;
}
break;
}
});})(vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
,null,null));
});
;})(vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_65981 = (inst_65980.cljs$core$IFn$_invoke$arity$1 ? inst_65980.cljs$core$IFn$_invoke$arity$1(inst_65972__$1) : inst_65980.call(null,inst_65972__$1));
var inst_65982 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(inst_65975,inst_65981);
var inst_65983 = cljs.core.PersistentHashMap.EMPTY;
var inst_65988 = (function (){var vec__65946 = inst_65949;
var st = inst_65950;
var all_steps = inst_65951;
var r = inst_65949;
var map__65947 = inst_65971__$1;
var regions = inst_65972__$1;
var senses = inst_65973__$1;
return ((function (vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,inst_65980,inst_65981,inst_65982,inst_65983,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function org$numenta$sanity$demos$notebook$add_viz_$_iter__65984(s__65985){
return (new cljs.core.LazySeq(null,((function (vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,inst_65980,inst_65981,inst_65982,inst_65983,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var s__65985__$1 = s__65985;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__65985__$1);
if(temp__4653__auto__){
var s__65985__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__65985__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__65985__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__65987 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__65986 = (0);
while(true){
if((i__65986 < size__5453__auto__)){
var vec__66141 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__65986);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66141,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66141,(1),null);
cljs.core.chunk_append(b__65987,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null));

var G__66175 = (i__65986 + (1));
i__65986 = G__66175;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__65987),org$numenta$sanity$demos$notebook$add_viz_$_iter__65984(cljs.core.chunk_rest(s__65985__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__65987),null);
}
} else {
var vec__66142 = cljs.core.first(s__65985__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66142,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66142,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null),org$numenta$sanity$demos$notebook$add_viz_$_iter__65984(cljs.core.rest(s__65985__$2)));
}
} else {
return null;
}
break;
}
});})(vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,inst_65980,inst_65981,inst_65982,inst_65983,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
,null,null));
});
;})(vec__65946,st,all_steps,r,map__65947,regions,senses,inst_65972,inst_65973,inst_65949,inst_65951,inst_65950,inst_65997,inst_65971,inst_65971__$1,inst_65972__$1,inst_65973__$1,inst_65974,inst_65975,inst_65980,inst_65981,inst_65982,inst_65983,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_65989 = (inst_65988.cljs$core$IFn$_invoke$arity$1 ? inst_65988.cljs$core$IFn$_invoke$arity$1(inst_65973__$1) : inst_65988.call(null,inst_65973__$1));
var inst_65990 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(inst_65983,inst_65989);
var inst_65991 = [inst_65982,inst_65990];
var inst_65992 = cljs.core.PersistentHashMap.fromArrays(inst_65974,inst_65991);
var inst_65993 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_65992);
var inst_65994 = clojure.walk.keywordize_keys(inst_65951);
var inst_65995 = cljs.core.reverse(inst_65994);
var inst_65996 = cljs.core.vec(inst_65995);
var inst_65997__$1 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_65996);
var inst_65998 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.selection.blank_selection);
var inst_66000 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_65997__$1) : cljs.core.deref.call(null,inst_65997__$1));
var inst_66001 = cljs.core.count(inst_66000);
var inst_66002 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),inst_66001);
var state_66078__$1 = (function (){var statearr_66143 = state_66078;
(statearr_66143[(16)] = inst_65972__$1);

(statearr_66143[(17)] = inst_65973__$1);

(statearr_66143[(11)] = inst_65993);

(statearr_66143[(7)] = inst_65998);

(statearr_66143[(9)] = inst_65997__$1);

(statearr_66143[(18)] = inst_65971__$1);

return statearr_66143;
})();
if(inst_66002){
var statearr_66144_66176 = state_66078__$1;
(statearr_66144_66176[(1)] = (12));

} else {
var statearr_66145_66177 = state_66078__$1;
(statearr_66145_66177[(1)] = (13));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (9))){
var inst_65950 = (state_66078[(13)]);
var inst_65968 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_65950);
var state_66078__$1 = state_66078;
var statearr_66146_66178 = state_66078__$1;
(statearr_66146_66178[(2)] = inst_65968);

(statearr_66146_66178[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (5))){
var inst_65966 = (state_66078[(2)]);
var state_66078__$1 = state_66078;
if(cljs.core.truth_(inst_65966)){
var statearr_66147_66179 = state_66078__$1;
(statearr_66147_66179[(1)] = (9));

} else {
var statearr_66148_66180 = state_66078__$1;
(statearr_66148_66180[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (14))){
var inst_65972 = (state_66078[(16)]);
var inst_65973 = (state_66078[(17)]);
var inst_65993 = (state_66078[(11)]);
var inst_65949 = (state_66078[(14)]);
var inst_65951 = (state_66078[(15)]);
var inst_65998 = (state_66078[(7)]);
var inst_66013 = (state_66078[(8)]);
var inst_65950 = (state_66078[(13)]);
var inst_65997 = (state_66078[(9)]);
var inst_65971 = (state_66078[(18)]);
var inst_66010 = (state_66078[(2)]);
var inst_66011 = (function (){var selection = inst_65998;
var senses = inst_65973;
var r = inst_65949;
var base_opts = inst_66010;
var step_template = inst_65993;
var all_steps = inst_65951;
var regions = inst_65972;
var steps = inst_65997;
var map__65947 = inst_65971;
var st = inst_65950;
var vec__65946 = inst_65949;
return ((function (selection,senses,r,base_opts,step_template,all_steps,regions,steps,map__65947,st,vec__65946,inst_65972,inst_65973,inst_65993,inst_65949,inst_65951,inst_65998,inst_66013,inst_65950,inst_65997,inst_65971,inst_66010,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function() { 
var G__66181__delegate = function (xs){
var last_non_nil = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(cljs.core.nil_QMARK_),cljs.core.reverse(xs)));
if(cljs.core.coll_QMARK_(last_non_nil)){
return last_non_nil;
} else {
return cljs.core.last(xs);
}
};
var G__66181 = function (var_args){
var xs = null;
if (arguments.length > 0) {
var G__66182__i = 0, G__66182__a = new Array(arguments.length -  0);
while (G__66182__i < G__66182__a.length) {G__66182__a[G__66182__i] = arguments[G__66182__i + 0]; ++G__66182__i;}
  xs = new cljs.core.IndexedSeq(G__66182__a,0);
} 
return G__66181__delegate.call(this,xs);};
G__66181.cljs$lang$maxFixedArity = 0;
G__66181.cljs$lang$applyTo = (function (arglist__66183){
var xs = cljs.core.seq(arglist__66183);
return G__66181__delegate(xs);
});
G__66181.cljs$core$IFn$_invoke$arity$variadic = G__66181__delegate;
return G__66181;
})()
;
;})(selection,senses,r,base_opts,step_template,all_steps,regions,steps,map__65947,st,vec__65946,inst_65972,inst_65973,inst_65993,inst_65949,inst_65951,inst_65998,inst_66013,inst_65950,inst_65997,inst_65971,inst_66010,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_66012 = org.nfrac.comportex.util.deep_merge_with.cljs$core$IFn$_invoke$arity$variadic(inst_66011,cljs.core.array_seq([inst_66010,opts], 0));
var inst_66013__$1 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_66012);
var inst_66015 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_65993) : cljs.core.deref.call(null,inst_65993));
var inst_66016 = cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(inst_66015);
var inst_66017 = cljs.core.seq(inst_66016);
var inst_66018 = cljs.core.first(inst_66017);
var inst_66019 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_66018,(0),null);
var inst_66020 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_66018,(1),null);
var inst_66021 = cljs.core.keys(inst_66020);
var inst_66022 = cljs.core.first(inst_66021);
var inst_66023 = (function (){var selection = inst_65998;
var senses = inst_65973;
var r = inst_65949;
var base_opts = inst_66010;
var step_template = inst_65993;
var all_steps = inst_65951;
var regions = inst_65972;
var steps = inst_65997;
var viz_options = inst_66013__$1;
var layer_id = inst_66022;
var vec__66014 = inst_66018;
var rgn = inst_66020;
var map__65947 = inst_65971;
var st = inst_65950;
var vec__65946 = inst_65949;
var region_key = inst_66019;
return ((function (selection,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,layer_id,vec__66014,rgn,map__65947,st,vec__65946,region_key,inst_65972,inst_65973,inst_65993,inst_65949,inst_65951,inst_65998,inst_66013,inst_65950,inst_65997,inst_65971,inst_66010,inst_66011,inst_66012,inst_66013__$1,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function (p1__65726_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.empty(p1__65726_SHARP_),new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$dt,(0),cljs.core.cst$kw$region,region_key,cljs.core.cst$kw$layer,layer_id,cljs.core.cst$kw$model_DASH_id,cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))))], null));
});
;})(selection,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,layer_id,vec__66014,rgn,map__65947,st,vec__65946,region_key,inst_65972,inst_65973,inst_65993,inst_65949,inst_65951,inst_65998,inst_66013,inst_65950,inst_65997,inst_65971,inst_66010,inst_66011,inst_66012,inst_66013__$1,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_66024 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(inst_65998,inst_66023);
var inst_66025 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66026 = [cljs.core.cst$kw$on_DASH_click,cljs.core.cst$kw$on_DASH_key_DASH_down,cljs.core.cst$kw$tabIndex];
var inst_66027 = (function (){var selection = inst_65998;
var senses = inst_65973;
var r = inst_65949;
var base_opts = inst_66010;
var step_template = inst_65993;
var all_steps = inst_65951;
var regions = inst_65972;
var steps = inst_65997;
var viz_options = inst_66013__$1;
var map__65947 = inst_65971;
var st = inst_65950;
var vec__65946 = inst_65949;
return ((function (selection,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,map__65947,st,vec__65946,inst_65972,inst_65973,inst_65993,inst_65949,inst_65951,inst_65998,inst_66013,inst_65950,inst_65997,inst_65971,inst_66010,inst_66011,inst_66012,inst_66013__$1,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,inst_66023,inst_66024,inst_66025,inst_66026,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_viz,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$background_DASH_clicked], null));
});
;})(selection,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,map__65947,st,vec__65946,inst_65972,inst_65973,inst_65993,inst_65949,inst_65951,inst_65998,inst_66013,inst_65950,inst_65997,inst_65971,inst_66010,inst_66011,inst_66012,inst_66013__$1,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,inst_66023,inst_66024,inst_66025,inst_66026,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_66028 = (function (){var selection = inst_65998;
var senses = inst_65973;
var r = inst_65949;
var base_opts = inst_66010;
var step_template = inst_65993;
var all_steps = inst_65951;
var regions = inst_65972;
var steps = inst_65997;
var viz_options = inst_66013__$1;
var map__65947 = inst_65971;
var st = inst_65950;
var vec__65946 = inst_65949;
return ((function (selection,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,map__65947,st,vec__65946,inst_65972,inst_65973,inst_65993,inst_65949,inst_65951,inst_65998,inst_66013,inst_65950,inst_65997,inst_65971,inst_66010,inst_66011,inst_66012,inst_66013__$1,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,inst_66023,inst_66024,inst_66025,inst_66026,inst_66027,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function (p1__65727_SHARP_){
return org.numenta.sanity.viz_canvas.viz_key_down(p1__65727_SHARP_,into_viz);
});
;})(selection,senses,r,base_opts,step_template,all_steps,regions,steps,viz_options,map__65947,st,vec__65946,inst_65972,inst_65973,inst_65993,inst_65949,inst_65951,inst_65998,inst_66013,inst_65950,inst_65997,inst_65971,inst_66010,inst_66011,inst_66012,inst_66013__$1,inst_66015,inst_66016,inst_66017,inst_66018,inst_66019,inst_66020,inst_66021,inst_66022,inst_66023,inst_66024,inst_66025,inst_66026,inst_66027,state_val_66079,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_66029 = [inst_66027,inst_66028,(1)];
var inst_66030 = cljs.core.PersistentHashMap.fromArrays(inst_66026,inst_66029);
var inst_66031 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_65997) : cljs.core.deref.call(null,inst_65997));
var inst_66032 = cljs.core.count(inst_66031);
var inst_66033 = (inst_66032 > (1));
var state_66078__$1 = (function (){var statearr_66149 = state_66078;
(statearr_66149[(10)] = inst_66030);

(statearr_66149[(8)] = inst_66013__$1);

(statearr_66149[(12)] = inst_66025);

(statearr_66149[(19)] = inst_66024);

return statearr_66149;
})();
if(cljs.core.truth_(inst_66033)){
var statearr_66150_66184 = state_66078__$1;
(statearr_66150_66184[(1)] = (15));

} else {
var statearr_66151_66185 = state_66078__$1;
(statearr_66151_66185[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (16))){
var state_66078__$1 = state_66078;
var statearr_66152_66186 = state_66078__$1;
(statearr_66152_66186[(2)] = null);

(statearr_66152_66186[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (10))){
var inst_65950 = (state_66078[(13)]);
var state_66078__$1 = state_66078;
var statearr_66153_66187 = state_66078__$1;
(statearr_66153_66187[(2)] = inst_65950);

(statearr_66153_66187[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66079 === (8))){
var inst_65963 = (state_66078[(2)]);
var state_66078__$1 = state_66078;
var statearr_66154_66188 = state_66078__$1;
(statearr_66154_66188[(2)] = inst_65963);

(statearr_66154_66188[(1)] = (5));


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
});})(c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
;
return ((function (switch__35847__auto__,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c){
return (function() {
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____0 = (function (){
var statearr_66158 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_66158[(0)] = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__);

(statearr_66158[(1)] = (1));

return statearr_66158;
});
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____1 = (function (state_66078){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66078);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66159){if((e66159 instanceof Object)){
var ex__35851__auto__ = e66159;
var statearr_66160_66189 = state_66078;
(statearr_66160_66189[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66078);

return cljs.core.cst$kw$recur;
} else {
throw e66159;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66190 = state_66078;
state_66078 = G__66190;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__ = function(state_66078){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____1.call(this,state_66078);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
})();
var state__35963__auto__ = (function (){var statearr_66161 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66161[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_66161;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,vec__65945,journal_target,opts,into_journal,into_viz,response_c))
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

var seq__66197_66203 = cljs.core.seq(cnvs);
var chunk__66199_66204 = null;
var count__66200_66205 = (0);
var i__66201_66206 = (0);
while(true){
if((i__66201_66206 < count__66200_66205)){
var cnv_66207 = chunk__66199_66204.cljs$core$IIndexed$_nth$arity$2(null,i__66201_66206);
var victim_el_66208 = (copy_el.getElementsByTagName("canvas")[(0)]);
var img_el_66209 = document.createElement("img");
img_el_66209.setAttribute("src",cnv_66207.toDataURL("image/png"));

var temp__4653__auto___66210 = victim_el_66208.getAttribute("style");
if(cljs.core.truth_(temp__4653__auto___66210)){
var style_66211 = temp__4653__auto___66210;
img_el_66209.setAttribute("style",style_66211);
} else {
}

victim_el_66208.parentNode.replaceChild(img_el_66209,victim_el_66208);

var G__66212 = seq__66197_66203;
var G__66213 = chunk__66199_66204;
var G__66214 = count__66200_66205;
var G__66215 = (i__66201_66206 + (1));
seq__66197_66203 = G__66212;
chunk__66199_66204 = G__66213;
count__66200_66205 = G__66214;
i__66201_66206 = G__66215;
continue;
} else {
var temp__4653__auto___66216 = cljs.core.seq(seq__66197_66203);
if(temp__4653__auto___66216){
var seq__66197_66217__$1 = temp__4653__auto___66216;
if(cljs.core.chunked_seq_QMARK_(seq__66197_66217__$1)){
var c__5485__auto___66218 = cljs.core.chunk_first(seq__66197_66217__$1);
var G__66219 = cljs.core.chunk_rest(seq__66197_66217__$1);
var G__66220 = c__5485__auto___66218;
var G__66221 = cljs.core.count(c__5485__auto___66218);
var G__66222 = (0);
seq__66197_66203 = G__66219;
chunk__66199_66204 = G__66220;
count__66200_66205 = G__66221;
i__66201_66206 = G__66222;
continue;
} else {
var cnv_66223 = cljs.core.first(seq__66197_66217__$1);
var victim_el_66224 = (copy_el.getElementsByTagName("canvas")[(0)]);
var img_el_66225 = document.createElement("img");
img_el_66225.setAttribute("src",cnv_66223.toDataURL("image/png"));

var temp__4653__auto___66226__$1 = victim_el_66224.getAttribute("style");
if(cljs.core.truth_(temp__4653__auto___66226__$1)){
var style_66227 = temp__4653__auto___66226__$1;
img_el_66225.setAttribute("style",style_66227);
} else {
}

victim_el_66224.parentNode.replaceChild(img_el_66225,victim_el_66224);

var G__66228 = cljs.core.next(seq__66197_66217__$1);
var G__66229 = null;
var G__66230 = (0);
var G__66231 = (0);
seq__66197_66203 = G__66228;
chunk__66199_66204 = G__66229;
count__66200_66205 = G__66230;
i__66201_66206 = G__66231;
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
