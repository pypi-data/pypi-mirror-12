// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.data');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.nfrac.comportex.util');
org.numenta.sanity.comportex.data.all_cell_segments = (function org$numenta$sanity$comportex$data$all_cell_segments(cell_ids,sg){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (cell_id){
return cljs.core.reverse(cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(cljs.core.empty_QMARK_,cljs.core.reverse(org.nfrac.comportex.protocols.cell_segments(sg,cell_id))));
}),cell_ids);
});
org.numenta.sanity.comportex.data.group_synapses = (function org$numenta$sanity$comportex$data$group_synapses(syns,ac,pcon){
return cljs.core.group_by((function (p__38957){
var vec__38958 = p__38957;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38958,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38958,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((p >= pcon))?cljs.core.cst$kw$connected:cljs.core.cst$kw$disconnected),(cljs.core.truth_((ac.cljs$core$IFn$_invoke$arity$1 ? ac.cljs$core$IFn$_invoke$arity$1(id) : ac.call(null,id)))?cljs.core.cst$kw$active:cljs.core.cst$kw$inactive)], null);
}),syns);
});
org.numenta.sanity.comportex.data.active_bits = (function org$numenta$sanity$comportex$data$active_bits(sense_node){
var or__4682__auto__ = cljs.core.seq(org.nfrac.comportex.protocols.bits_value(sense_node));
if(or__4682__auto__){
return or__4682__auto__;
} else {
return org.nfrac.comportex.protocols.motor_bits_value(sense_node);
}
});
org.numenta.sanity.comportex.data.count_segs_in_column = (function org$numenta$sanity$comportex$data$count_segs_in_column(distal_sg,depth,col){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (n,ci){
return (n + org.nfrac.comportex.util.count_filter(cljs.core.seq,org.nfrac.comportex.protocols.cell_segments(distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null))));
}),(0),cljs.core.range.cljs$core$IFn$_invoke$arity$1(depth));
});
org.numenta.sanity.comportex.data.syns_from_source_bit = (function org$numenta$sanity$comportex$data$syns_from_source_bit(htm,sense_id,bit,syn_states){
var active_bit_QMARK_ = cljs.core.boolean$(cljs.core.some(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,bit),org.numenta.sanity.comportex.data.active_bits(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null)))));
var iter__5454__auto__ = ((function (active_bit_QMARK_){
return (function org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38980(s__38981){
return (new cljs.core.LazySeq(null,((function (active_bit_QMARK_){
return (function (){
var s__38981__$1 = s__38981;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__38981__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var rgn_id = cljs.core.first(xs__5201__auto__);
var rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id], null));
var vec__38994 = org.nfrac.comportex.core.layers(rgn);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38994,(0),null);
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
var sg = cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr);
var adjusted_bit = (org.nfrac.comportex.core.ff_base(htm,rgn_id,sense_id) + bit);
var to_segs = org.nfrac.comportex.protocols.targets_connected_from(sg,adjusted_bit);
var predictive_columns = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.prior_predictive_cells(lyr)));
var iterys__5450__auto__ = ((function (s__38981__$1,rgn,vec__38994,lyr_id,lyr,sg,adjusted_bit,to_segs,predictive_columns,rgn_id,xs__5201__auto__,temp__4653__auto__,active_bit_QMARK_){
return (function org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38980_$_iter__38982(s__38983){
return (new cljs.core.LazySeq(null,((function (s__38981__$1,rgn,vec__38994,lyr_id,lyr,sg,adjusted_bit,to_segs,predictive_columns,rgn_id,xs__5201__auto__,temp__4653__auto__,active_bit_QMARK_){
return (function (){
var s__38983__$1 = s__38983;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__38983__$1);
if(temp__4653__auto____$1){
var s__38983__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__38983__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__38983__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__38985 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__38984 = (0);
while(true){
if((i__38984 < size__5453__auto__)){
var vec__38999 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__38984);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38999,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38999,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38999,(2),null);
var seg_path = vec__38999;
var predictive_col_QMARK_ = cljs.core.contains_QMARK_(predictive_columns,col);
if((cljs.core.contains_QMARK_(syn_states,"inactive")) || ((cljs.core.contains_QMARK_(syn_states,"predicted")) && (predictive_col_QMARK_)) || (active_bit_QMARK_)){
var perm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.in_synapses(sg,seg_path),adjusted_bit);
cljs.core.chunk_append(b__38985,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$target_DASH_id,cljs.core.name(rgn_id),cljs.core.cst$kw$target_DASH_lyr,cljs.core.name(lyr_id),cljs.core.cst$kw$target_DASH_col,col,cljs.core.cst$kw$target_DASH_dt,(0),cljs.core.cst$kw$syn_DASH_state,((active_bit_QMARK_)?((predictive_col_QMARK_)?"active-predicted":"active"):((predictive_col_QMARK_)?"predicted":"inactive-syn")),cljs.core.cst$kw$perm,perm], null));

var G__39001 = (i__38984 + (1));
i__38984 = G__39001;
continue;
} else {
var G__39002 = (i__38984 + (1));
i__38984 = G__39002;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__38985),org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38980_$_iter__38982(cljs.core.chunk_rest(s__38983__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__38985),null);
}
} else {
var vec__39000 = cljs.core.first(s__38983__$2);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39000,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39000,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39000,(2),null);
var seg_path = vec__39000;
var predictive_col_QMARK_ = cljs.core.contains_QMARK_(predictive_columns,col);
if((cljs.core.contains_QMARK_(syn_states,"inactive")) || ((cljs.core.contains_QMARK_(syn_states,"predicted")) && (predictive_col_QMARK_)) || (active_bit_QMARK_)){
var perm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.in_synapses(sg,seg_path),adjusted_bit);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$target_DASH_id,cljs.core.name(rgn_id),cljs.core.cst$kw$target_DASH_lyr,cljs.core.name(lyr_id),cljs.core.cst$kw$target_DASH_col,col,cljs.core.cst$kw$target_DASH_dt,(0),cljs.core.cst$kw$syn_DASH_state,((active_bit_QMARK_)?((predictive_col_QMARK_)?"active-predicted":"active"):((predictive_col_QMARK_)?"predicted":"inactive-syn")),cljs.core.cst$kw$perm,perm], null),org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38980_$_iter__38982(cljs.core.rest(s__38983__$2)));
} else {
var G__39003 = cljs.core.rest(s__38983__$2);
s__38983__$1 = G__39003;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__38981__$1,rgn,vec__38994,lyr_id,lyr,sg,adjusted_bit,to_segs,predictive_columns,rgn_id,xs__5201__auto__,temp__4653__auto__,active_bit_QMARK_))
,null,null));
});})(s__38981__$1,rgn,vec__38994,lyr_id,lyr,sg,adjusted_bit,to_segs,predictive_columns,rgn_id,xs__5201__auto__,temp__4653__auto__,active_bit_QMARK_))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(to_segs));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38980(cljs.core.rest(s__38981__$1)));
} else {
var G__39004 = cljs.core.rest(s__38981__$1);
s__38981__$1 = G__39004;
continue;
}
} else {
return null;
}
break;
}
});})(active_bit_QMARK_))
,null,null));
});})(active_bit_QMARK_))
;
return iter__5454__auto__(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fb_DASH_deps,sense_id], null)));
});
org.numenta.sanity.comportex.data.column_segs = (function org$numenta$sanity$comportex$data$column_segs(htm,prev_htm,rgn_id,lyr_id,col,seg_type){
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
var spec = org.nfrac.comportex.protocols.params(lyr);
var dspec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(spec,seg_type);
var stimulus_th = cljs.core.cst$kw$stimulus_DASH_threshold.cljs$core$IFn$_invoke$arity$1(dspec);
var learning_th = cljs.core.cst$kw$learn_DASH_threshold.cljs$core$IFn$_invoke$arity$1(dspec);
var pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(dspec);
var on_bits = (function (){var G__39132 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39132) {
case "apical":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_apical_DASH_state,cljs.core.cst$kw$active_DASH_bits], null));

break;
case "distal":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null));

break;
case "proximal":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$state,cljs.core.cst$kw$in_DASH_ff_DASH_bits], null));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
var learning = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$learn_DASH_state,cljs.core.cst$kw$learning,seg_type], null));
var cell_ids = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(seg_type,cljs.core.cst$kw$proximal))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0)], null)], null):(function (){var iter__5454__auto__ = ((function (lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning){
return (function org$numenta$sanity$comportex$data$column_segs_$_iter__39133(s__39134){
return (new cljs.core.LazySeq(null,((function (lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning){
return (function (){
var s__39134__$1 = s__39134;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39134__$1);
if(temp__4653__auto__){
var s__39134__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39134__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39134__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39136 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39135 = (0);
while(true){
if((i__39135 < size__5453__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39135);
cljs.core.chunk_append(b__39136,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));

var G__39256 = (i__39135 + (1));
i__39135 = G__39256;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39136),org$numenta$sanity$comportex$data$column_segs_$_iter__39133(cljs.core.chunk_rest(s__39134__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39136),null);
}
} else {
var ci = cljs.core.first(s__39134__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null),org$numenta$sanity$comportex$data$column_segs_$_iter__39133(cljs.core.rest(s__39134__$2)));
}
} else {
return null;
}
break;
}
});})(lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning))
,null,null));
});})(lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.protocols.layer_depth(lyr)));
})());
var seg_up = cljs.core.first(cljs.core.vals(cljs.core.select_keys(learning,cell_ids)));
var map__39130 = seg_up;
var map__39130__$1 = ((((!((map__39130 == null)))?((((map__39130.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39130.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__39130):map__39130);
var vec__39131 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39130__$1,cljs.core.cst$kw$target_DASH_id);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39131,(0),null);
var learn_ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39131,(1),null);
var learn_si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39131,(2),null);
var sg_key = (function (){var G__39140 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39140) {
case "apical":
return cljs.core.cst$kw$apical_DASH_sg;

break;
case "distal":
return cljs.core.cst$kw$distal_DASH_sg;

break;
case "proximal":
return cljs.core.cst$kw$proximal_DASH_sg;

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
var segs_by_cell = org.numenta.sanity.comportex.data.all_cell_segments(cell_ids,cljs.core.get.cljs$core$IFn$_invoke$arity$2(lyr,sg_key));
var p_segs_by_cell = (cljs.core.truth_(prev_htm)?org.numenta.sanity.comportex.data.all_cell_segments(cell_ids,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id,sg_key], null))):null);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function org$numenta$sanity$comportex$data$column_segs_$_iter__39141(s__39142){
return (new cljs.core.LazySeq(null,((function (lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function (){
var s__39142__$1 = s__39142;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39142__$1);
if(temp__4653__auto__){
var s__39142__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39142__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39142__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39144 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39143 = (0);
while(true){
if((i__39143 < size__5453__auto__)){
var vec__39201 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39143);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39201,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39201,(1),null);
var cell_learning_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci);
var p_segs = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p_segs_by_cell,ci);
var use_segs = (((cell_learning_QMARK_) && ((learn_si >= cljs.core.count(p_segs))))?cljs.core.take.cljs$core$IFn$_invoke$arity$2((learn_si + (1)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(p_segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY))):p_segs);
cljs.core.chunk_append(b__39144,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (i__39143,cell_learning_QMARK_,p_segs,use_segs,vec__39201,ci,___$1,c__5452__auto__,size__5453__auto__,b__39144,s__39142__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function org$numenta$sanity$comportex$data$column_segs_$_iter__39141_$_iter__39202(s__39203){
return (new cljs.core.LazySeq(null,((function (i__39143,cell_learning_QMARK_,p_segs,use_segs,vec__39201,ci,___$1,c__5452__auto__,size__5453__auto__,b__39144,s__39142__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function (){
var s__39203__$1 = s__39203;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39203__$1);
if(temp__4653__auto____$1){
var s__39203__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39203__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__39203__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__39205 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__39204 = (0);
while(true){
if((i__39204 < size__5453__auto____$1)){
var vec__39218 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__39204);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39218,(0),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39218,(1),null);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__39219 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39219) : grouped_syns.call(null,G__39219));
})());
var conn_tot = (cljs.core.count((function (){var G__39220 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39220) : grouped_syns.call(null,G__39220));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__39221 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39221) : grouped_syns.call(null,G__39221));
})());
var disc_tot = (cljs.core.count((function (){var G__39222 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39222) : grouped_syns.call(null,G__39222));
})()) + disc_act);
cljs.core.chunk_append(b__39205,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$learn_DASH_seg_QMARK_,(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si)),cljs.core.cst$kw$n_DASH_conn_DASH_act,conn_act,cljs.core.cst$kw$n_DASH_conn_DASH_tot,conn_tot,cljs.core.cst$kw$n_DASH_disc_DASH_act,disc_act,cljs.core.cst$kw$n_DASH_disc_DASH_tot,disc_tot,cljs.core.cst$kw$stimulus_DASH_th,stimulus_th,cljs.core.cst$kw$learning_DASH_th,learning_th], null)], null));

var G__39258 = (i__39204 + (1));
i__39204 = G__39258;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39205),org$numenta$sanity$comportex$data$column_segs_$_iter__39141_$_iter__39202(cljs.core.chunk_rest(s__39203__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39205),null);
}
} else {
var vec__39223 = cljs.core.first(s__39203__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39223,(0),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39223,(1),null);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__39224 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39224) : grouped_syns.call(null,G__39224));
})());
var conn_tot = (cljs.core.count((function (){var G__39225 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39225) : grouped_syns.call(null,G__39225));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__39226 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39226) : grouped_syns.call(null,G__39226));
})());
var disc_tot = (cljs.core.count((function (){var G__39227 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39227) : grouped_syns.call(null,G__39227));
})()) + disc_act);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$learn_DASH_seg_QMARK_,(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si)),cljs.core.cst$kw$n_DASH_conn_DASH_act,conn_act,cljs.core.cst$kw$n_DASH_conn_DASH_tot,conn_tot,cljs.core.cst$kw$n_DASH_disc_DASH_act,disc_act,cljs.core.cst$kw$n_DASH_disc_DASH_tot,disc_tot,cljs.core.cst$kw$stimulus_DASH_th,stimulus_th,cljs.core.cst$kw$learning_DASH_th,learning_th], null)], null),org$numenta$sanity$comportex$data$column_segs_$_iter__39141_$_iter__39202(cljs.core.rest(s__39203__$2)));
}
} else {
return null;
}
break;
}
});})(i__39143,cell_learning_QMARK_,p_segs,use_segs,vec__39201,ci,___$1,c__5452__auto__,size__5453__auto__,b__39144,s__39142__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
,null,null));
});})(i__39143,cell_learning_QMARK_,p_segs,use_segs,vec__39201,ci,___$1,c__5452__auto__,size__5453__auto__,b__39144,s__39142__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,use_segs));
})())], null));

var G__39259 = (i__39143 + (1));
i__39143 = G__39259;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39144),org$numenta$sanity$comportex$data$column_segs_$_iter__39141(cljs.core.chunk_rest(s__39142__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39144),null);
}
} else {
var vec__39228 = cljs.core.first(s__39142__$2);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39228,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39228,(1),null);
var cell_learning_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci);
var p_segs = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p_segs_by_cell,ci);
var use_segs = (((cell_learning_QMARK_) && ((learn_si >= cljs.core.count(p_segs))))?cljs.core.take.cljs$core$IFn$_invoke$arity$2((learn_si + (1)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(p_segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY))):p_segs);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (cell_learning_QMARK_,p_segs,use_segs,vec__39228,ci,___$1,s__39142__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function org$numenta$sanity$comportex$data$column_segs_$_iter__39141_$_iter__39229(s__39230){
return (new cljs.core.LazySeq(null,((function (cell_learning_QMARK_,p_segs,use_segs,vec__39228,ci,___$1,s__39142__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function (){
var s__39230__$1 = s__39230;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39230__$1);
if(temp__4653__auto____$1){
var s__39230__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39230__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39230__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39232 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39231 = (0);
while(true){
if((i__39231 < size__5453__auto__)){
var vec__39245 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39231);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39245,(0),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39245,(1),null);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__39246 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39246) : grouped_syns.call(null,G__39246));
})());
var conn_tot = (cljs.core.count((function (){var G__39247 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39247) : grouped_syns.call(null,G__39247));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__39248 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39248) : grouped_syns.call(null,G__39248));
})());
var disc_tot = (cljs.core.count((function (){var G__39249 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39249) : grouped_syns.call(null,G__39249));
})()) + disc_act);
cljs.core.chunk_append(b__39232,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$learn_DASH_seg_QMARK_,(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si)),cljs.core.cst$kw$n_DASH_conn_DASH_act,conn_act,cljs.core.cst$kw$n_DASH_conn_DASH_tot,conn_tot,cljs.core.cst$kw$n_DASH_disc_DASH_act,disc_act,cljs.core.cst$kw$n_DASH_disc_DASH_tot,disc_tot,cljs.core.cst$kw$stimulus_DASH_th,stimulus_th,cljs.core.cst$kw$learning_DASH_th,learning_th], null)], null));

var G__39260 = (i__39231 + (1));
i__39231 = G__39260;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39232),org$numenta$sanity$comportex$data$column_segs_$_iter__39141_$_iter__39229(cljs.core.chunk_rest(s__39230__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39232),null);
}
} else {
var vec__39250 = cljs.core.first(s__39230__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39250,(0),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39250,(1),null);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__39251 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39251) : grouped_syns.call(null,G__39251));
})());
var conn_tot = (cljs.core.count((function (){var G__39252 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39252) : grouped_syns.call(null,G__39252));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__39253 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39253) : grouped_syns.call(null,G__39253));
})());
var disc_tot = (cljs.core.count((function (){var G__39254 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39254) : grouped_syns.call(null,G__39254));
})()) + disc_act);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$learn_DASH_seg_QMARK_,(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si)),cljs.core.cst$kw$n_DASH_conn_DASH_act,conn_act,cljs.core.cst$kw$n_DASH_conn_DASH_tot,conn_tot,cljs.core.cst$kw$n_DASH_disc_DASH_act,disc_act,cljs.core.cst$kw$n_DASH_disc_DASH_tot,disc_tot,cljs.core.cst$kw$stimulus_DASH_th,stimulus_th,cljs.core.cst$kw$learning_DASH_th,learning_th], null)], null),org$numenta$sanity$comportex$data$column_segs_$_iter__39141_$_iter__39229(cljs.core.rest(s__39230__$2)));
}
} else {
return null;
}
break;
}
});})(cell_learning_QMARK_,p_segs,use_segs,vec__39228,ci,___$1,s__39142__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
,null,null));
});})(cell_learning_QMARK_,p_segs,use_segs,vec__39228,ci,___$1,s__39142__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,use_segs));
})())], null),org$numenta$sanity$comportex$data$column_segs_$_iter__39141(cljs.core.rest(s__39142__$2)));
}
} else {
return null;
}
break;
}
});})(lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
,null,null));
});})(lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__39130,map__39130__$1,vec__39131,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,segs_by_cell));
})());
});
org.numenta.sanity.comportex.data.segment_syns = (function org$numenta$sanity$comportex$data$segment_syns(htm,prev_htm,rgn_id,lyr_id,col,ci,si,syn_states,seg_type){
var regions = cljs.core.cst$kw$regions.cljs$core$IFn$_invoke$arity$1(htm);
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(regions,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null));
var spec = org.nfrac.comportex.protocols.params(lyr);
var dspec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(spec,seg_type);
var pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(dspec);
var pinit = cljs.core.cst$kw$perm_DASH_init.cljs$core$IFn$_invoke$arity$1(dspec);
var on_bits = (function (){var G__39303 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39303) {
case "apical":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_apical_DASH_state,cljs.core.cst$kw$active_DASH_bits], null));

break;
case "distal":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null));

break;
case "proximal":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$state,cljs.core.cst$kw$in_DASH_ff_DASH_bits], null));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
var depth = org.nfrac.comportex.protocols.layer_depth(lyr);
var learning = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$learn_DASH_state,cljs.core.cst$kw$learning,seg_type], null));
var seg_up = cljs.core.first(cljs.core.vals(cljs.core.select_keys(learning,(function (){var iter__5454__auto__ = ((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning){
return (function org$numenta$sanity$comportex$data$segment_syns_$_iter__39304(s__39305){
return (new cljs.core.LazySeq(null,((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning){
return (function (){
var s__39305__$1 = s__39305;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39305__$1);
if(temp__4653__auto__){
var s__39305__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39305__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39305__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39307 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39306 = (0);
while(true){
if((i__39306 < size__5453__auto__)){
var ci__$1 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39306);
cljs.core.chunk_append(b__39307,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci__$1], null));

var G__39342 = (i__39306 + (1));
i__39306 = G__39342;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39307),org$numenta$sanity$comportex$data$segment_syns_$_iter__39304(cljs.core.chunk_rest(s__39305__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39307),null);
}
} else {
var ci__$1 = cljs.core.first(s__39305__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci__$1], null),org$numenta$sanity$comportex$data$segment_syns_$_iter__39304(cljs.core.rest(s__39305__$2)));
}
} else {
return null;
}
break;
}
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning))
,null,null));
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(depth));
})())));
var map__39301 = seg_up;
var map__39301__$1 = ((((!((map__39301 == null)))?((((map__39301.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39301.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__39301):map__39301);
var vec__39302 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39301__$1,cljs.core.cst$kw$target_DASH_id);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39302,(0),null);
var learn_ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39302,(1),null);
var learn_si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39302,(2),null);
var grow_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39301__$1,cljs.core.cst$kw$grow_DASH_sources);
var learn_seg_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si));
var p_segs = org.nfrac.comportex.protocols.cell_segments(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null)),(function (){var G__39311 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39311) {
case "apical":
return cljs.core.cst$kw$apical_DASH_sg;

break;
case "distal":
return cljs.core.cst$kw$distal_DASH_sg;

break;
case "proximal":
return cljs.core.cst$kw$proximal_DASH_sg;

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})()),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));
var seg = (((si < cljs.core.count(p_segs)))?cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p_segs,si):cljs.core.PersistentArrayMap.EMPTY);
var input_layer_QMARK_ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg){
return (function (p__39312){
var vec__39313 = p__39312;
var rgn_id__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39313,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39313,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id__$1,cljs.core.first(org.nfrac.comportex.core.layers(rgn))], null);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg))
,regions));
var output_layer = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_){
return (function (p__39314){
var vec__39315 = p__39314;
var rgn_id__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39315,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39315,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id__$1,cljs.core.last(org.nfrac.comportex.core.layers(rgn))], null);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_))
,regions));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var source_of_bit = (function (){var G__39316 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39316) {
case "apical":
return org.nfrac.comportex.core.source_of_apical_bit;

break;
case "distal":
return org.nfrac.comportex.core.source_of_distal_bit;

break;
case "proximal":
return ((function (G__39316,regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns){
return (function (htm__$1,rgn_id__$1,lyr_id__$1,i){
if(cljs.core.truth_((function (){var G__39317 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id__$1,lyr_id__$1], null);
return (input_layer_QMARK_.cljs$core$IFn$_invoke$arity$1 ? input_layer_QMARK_.cljs$core$IFn$_invoke$arity$1(G__39317) : input_layer_QMARK_.call(null,G__39317));
})())){
var vec__39318 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm__$1,rgn_id__$1,i,cljs.core.cst$kw$ff_DASH_deps);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39318,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39318,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [src_id,(output_layer.cljs$core$IFn$_invoke$arity$1 ? output_layer.cljs$core$IFn$_invoke$arity$1(src_id) : output_layer.call(null,src_id)),src_i], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id__$1,cljs.core.cst$kw$layer_DASH_4,i], null);
}
});
;})(G__39316,regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns))

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit){
return (function (p__39319){
var vec__39320 = p__39319;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39320,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39320,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,(source_of_bit.cljs$core$IFn$_invoke$arity$4 ? source_of_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,lyr_id,i) : source_of_bit.call(null,htm,rgn_id,lyr_id,i)),p], null);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit))
,syns);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,((learn_seg_QMARK_)?cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit)):null)));
var syn_sources = (function (){var G__39321 = cljs.core.PersistentArrayMap.EMPTY;
var G__39321__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39321,cljs.core.cst$kw$active,(function (){var G__39322 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__39322) : grouped_sourced_syns.call(null,G__39322));
})()):G__39321);
var G__39321__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive-syn"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39321__$1,cljs.core.cst$kw$inactive_DASH_syn,cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__39323 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__39323) : grouped_sourced_syns.call(null,G__39323));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__39324 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__39324) : grouped_sourced_syns.call(null,G__39324));
})():null))):G__39321__$1);
var G__39321__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39321__$2,cljs.core.cst$kw$disconnected,(function (){var G__39325 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__39325) : grouped_sourced_syns.call(null,G__39325));
})()):G__39321__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39321__$3,cljs.core.cst$kw$growing,(grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$growing) : grouped_sourced_syns.call(null,cljs.core.cst$kw$growing)));
} else {
return G__39321__$3;
}
})();
var dt = (function (){var G__39326 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39326) {
case "apical":
return (1);

break;
case "distal":
return (1);

break;
case "proximal":
return (0);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
return org.nfrac.comportex.util.remap(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt){
return (function (source_info){
var iter__5454__auto__ = ((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt){
return (function org$numenta$sanity$comportex$data$segment_syns_$_iter__39327(s__39328){
return (new cljs.core.LazySeq(null,((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt){
return (function (){
var s__39328__$1 = s__39328;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39328__$1);
if(temp__4653__auto__){
var s__39328__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39328__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39328__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39330 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39329 = (0);
while(true){
if((i__39329 < size__5453__auto__)){
var vec__39337 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39329);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39337,(0),null);
var vec__39338 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39337,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39338,(0),null);
var src_lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39338,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39338,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39337,(2),null);
cljs.core.chunk_append(b__39330,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$src_DASH_col,(cljs.core.truth_(src_lyr)?cljs.core.first(org.nfrac.comportex.protocols.source_of_bit(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(regions,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [src_id,src_lyr], null)),src_i)):src_i),cljs.core.cst$kw$src_DASH_id,cljs.core.name(src_id),cljs.core.cst$kw$src_DASH_lyr,(cljs.core.truth_(src_lyr)?cljs.core.name(src_lyr):null),cljs.core.cst$kw$src_DASH_dt,dt,cljs.core.cst$kw$perm,p], null));

var G__39346 = (i__39329 + (1));
i__39329 = G__39346;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39330),org$numenta$sanity$comportex$data$segment_syns_$_iter__39327(cljs.core.chunk_rest(s__39328__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39330),null);
}
} else {
var vec__39339 = cljs.core.first(s__39328__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39339,(0),null);
var vec__39340 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39339,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39340,(0),null);
var src_lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39340,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39340,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39339,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$src_DASH_col,(cljs.core.truth_(src_lyr)?cljs.core.first(org.nfrac.comportex.protocols.source_of_bit(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(regions,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [src_id,src_lyr], null)),src_i)):src_i),cljs.core.cst$kw$src_DASH_id,cljs.core.name(src_id),cljs.core.cst$kw$src_DASH_lyr,(cljs.core.truth_(src_lyr)?cljs.core.name(src_lyr):null),cljs.core.cst$kw$src_DASH_dt,dt,cljs.core.cst$kw$perm,p], null),org$numenta$sanity$comportex$data$segment_syns_$_iter__39327(cljs.core.rest(s__39328__$2)));
}
} else {
return null;
}
break;
}
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt))
,null,null));
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt))
;
return iter__5454__auto__(source_info);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39301,map__39301__$1,vec__39302,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt))
,syn_sources);
});
org.numenta.sanity.comportex.data.inbits_cols_data = (function org$numenta$sanity$comportex$data$inbits_cols_data(htm,prev_htm,path__GT_ids,fetches){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$senses,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = (function org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39465(s__39466){
return (new cljs.core.LazySeq(null,(function (){
var s__39466__$1 = s__39466;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39466__$1);
if(temp__4653__auto__){
var s__39466__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39466__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39466__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39468 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39467 = (0);
while(true){
if((i__39467 < size__5453__auto__)){
var sense_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39467);
var bits_subset = (path__GT_ids.cljs$core$IFn$_invoke$arity$1 ? path__GT_ids.cljs$core$IFn$_invoke$arity$1(sense_id) : path__GT_ids.call(null,sense_id));
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
var ff_rgn_id = cljs.core.first(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fb_DASH_deps,sense_id], null)));
var prev_ff_rgn = (((org.nfrac.comportex.protocols.size(org.nfrac.comportex.protocols.ff_topology(sense)) > (0)))?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,ff_rgn_id], null)):null);
cljs.core.chunk_append(b__39468,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,(function (){var G__39477 = cljs.core.PersistentArrayMap.EMPTY;
if(cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.contains_QMARK_(fetches,"pred-bits-alpha");
if(and__4670__auto__){
return prev_ff_rgn;
} else {
return and__4670__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39477,cljs.core.cst$kw$pred_DASH_bits_DASH_alpha,(function (){var start = org.nfrac.comportex.core.ff_base(htm,ff_rgn_id,sense_id);
var end = (start + org.nfrac.comportex.protocols.size(org.nfrac.comportex.protocols.ff_topology(sense)));
return org.nfrac.comportex.util.remap(((function (i__39467,start,end,G__39477,bits_subset,sense,ff_rgn_id,prev_ff_rgn,sense_id,c__5452__auto__,size__5453__auto__,b__39468,s__39466__$2,temp__4653__auto__){
return (function (p1__39347_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39347_SHARP_ / (8));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39467,start,end,G__39477,bits_subset,sense,ff_rgn_id,prev_ff_rgn,sense_id,c__5452__auto__,size__5453__auto__,b__39468,s__39466__$2,temp__4653__auto__))
,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (i__39467,start,end,G__39477,bits_subset,sense,ff_rgn_id,prev_ff_rgn,sense_id,c__5452__auto__,size__5453__auto__,b__39468,s__39466__$2,temp__4653__auto__){
return (function (p__39478){
var vec__39479 = p__39478;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39479,(0),null);
var votes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39479,(1),null);
if(((start <= id)) && ((id < end))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(id - start),votes], null);
} else {
return null;
}
});})(i__39467,start,end,G__39477,bits_subset,sense,ff_rgn_id,prev_ff_rgn,sense_id,c__5452__auto__,size__5453__auto__,b__39468,s__39466__$2,temp__4653__auto__))
,org.nfrac.comportex.core.predicted_bit_votes(prev_ff_rgn))));
})());
} else {
return G__39477;
}
})()], null));

var G__39577 = (i__39467 + (1));
i__39467 = G__39577;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39468),org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39465(cljs.core.chunk_rest(s__39466__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39468),null);
}
} else {
var sense_id = cljs.core.first(s__39466__$2);
var bits_subset = (path__GT_ids.cljs$core$IFn$_invoke$arity$1 ? path__GT_ids.cljs$core$IFn$_invoke$arity$1(sense_id) : path__GT_ids.call(null,sense_id));
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
var ff_rgn_id = cljs.core.first(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fb_DASH_deps,sense_id], null)));
var prev_ff_rgn = (((org.nfrac.comportex.protocols.size(org.nfrac.comportex.protocols.ff_topology(sense)) > (0)))?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,ff_rgn_id], null)):null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,(function (){var G__39480 = cljs.core.PersistentArrayMap.EMPTY;
if(cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.contains_QMARK_(fetches,"pred-bits-alpha");
if(and__4670__auto__){
return prev_ff_rgn;
} else {
return and__4670__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39480,cljs.core.cst$kw$pred_DASH_bits_DASH_alpha,(function (){var start = org.nfrac.comportex.core.ff_base(htm,ff_rgn_id,sense_id);
var end = (start + org.nfrac.comportex.protocols.size(org.nfrac.comportex.protocols.ff_topology(sense)));
return org.nfrac.comportex.util.remap(((function (start,end,G__39480,bits_subset,sense,ff_rgn_id,prev_ff_rgn,sense_id,s__39466__$2,temp__4653__auto__){
return (function (p1__39347_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39347_SHARP_ / (8));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(start,end,G__39480,bits_subset,sense,ff_rgn_id,prev_ff_rgn,sense_id,s__39466__$2,temp__4653__auto__))
,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (start,end,G__39480,bits_subset,sense,ff_rgn_id,prev_ff_rgn,sense_id,s__39466__$2,temp__4653__auto__){
return (function (p__39481){
var vec__39482 = p__39481;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39482,(0),null);
var votes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39482,(1),null);
if(((start <= id)) && ((id < end))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(id - start),votes], null);
} else {
return null;
}
});})(start,end,G__39480,bits_subset,sense,ff_rgn_id,prev_ff_rgn,sense_id,s__39466__$2,temp__4653__auto__))
,org.nfrac.comportex.core.predicted_bit_votes(prev_ff_rgn))));
})());
} else {
return G__39480;
}
})()], null),org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39465(cljs.core.rest(s__39466__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(org.nfrac.comportex.core.sense_keys(htm));
})()),cljs.core.cst$kw$regions,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = (function org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39483(s__39484){
return (new cljs.core.LazySeq(null,(function (){
var s__39484__$1 = s__39484;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39484__$1);
if(temp__4653__auto__){
var s__39484__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39484__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39484__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39486 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39485 = (0);
while(true){
if((i__39485 < size__5453__auto__)){
var rgn_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39485);
var rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id], null));
cljs.core.chunk_append(b__39486,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (i__39485,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39483_$_iter__39533(s__39534){
return (new cljs.core.LazySeq(null,((function (i__39485,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (){
var s__39534__$1 = s__39534;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39534__$1);
if(temp__4653__auto____$1){
var s__39534__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39534__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__39534__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__39536 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__39535 = (0);
while(true){
if((i__39535 < size__5453__auto____$1)){
var lyr_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__39535);
var cols_subset = (function (){var G__39547 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null);
return (path__GT_ids.cljs$core$IFn$_invoke$arity$1 ? path__GT_ids.cljs$core$IFn$_invoke$arity$1(G__39547) : path__GT_ids.call(null,G__39547));
})();
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
var spec = org.nfrac.comportex.protocols.params(lyr);
cljs.core.chunk_append(b__39536,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,(function (){var G__39548 = cljs.core.PersistentArrayMap.EMPTY;
var G__39548__$1 = ((cljs.core.contains_QMARK_(fetches,"overlaps-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39548,cljs.core.cst$kw$overlaps_DASH_columns_DASH_alpha,org.nfrac.comportex.util.remap(((function (i__39535,i__39485,G__39548,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39348_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39348_SHARP_ / (16));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39535,i__39485,G__39548,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.persistent_BANG_(cljs.core.reduce_kv(((function (i__39535,i__39485,G__39548,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (m,p__39549,v){
var vec__39550 = p__39549;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39550,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39550,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39550,(2),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,col,(function (){var x__5013__auto__ = v;
var y__5014__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,col,(0));
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})());
});})(i__39535,i__39485,G__39548,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr)))))):G__39548);
var G__39548__$2 = ((cljs.core.contains_QMARK_(fetches,"boost-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39548__$1,cljs.core.cst$kw$boost_DASH_columns_DASH_alpha,cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.float$,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39535,i__39485,G__39548,G__39548__$1,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39349_SHARP_){
return ((p1__39349_SHARP_ - (1)) / (cljs.core.cst$kw$max_DASH_boost.cljs$core$IFn$_invoke$arity$1(spec) - (1)));
});})(i__39535,i__39485,G__39548,G__39548__$1,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.cst$kw$boosts.cljs$core$IFn$_invoke$arity$1(lyr))))):G__39548__$1);
var G__39548__$3 = ((cljs.core.contains_QMARK_(fetches,"active-freq-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39548__$2,cljs.core.cst$kw$active_DASH_freq_DASH_columns_DASH_alpha,cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39535,i__39485,G__39548,G__39548__$1,G__39548__$2,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39350_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = ((2) * p1__39350_SHARP_);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39535,i__39485,G__39548,G__39548__$1,G__39548__$2,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr)))):G__39548__$2);
var G__39548__$4 = ((cljs.core.contains_QMARK_(fetches,"n-segments-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39548__$3,cljs.core.cst$kw$n_DASH_segments_DASH_columns_DASH_alpha,cljs.core.zipmap(cols_subset,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39535,i__39485,G__39548,G__39548__$1,G__39548__$2,G__39548__$3,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39352_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39352_SHARP_ / 16.0);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39535,i__39485,G__39548,G__39548__$1,G__39548__$2,G__39548__$3,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39535,i__39485,G__39548,G__39548__$1,G__39548__$2,G__39548__$3,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39351_SHARP_){
return org.numenta.sanity.comportex.data.count_segs_in_column(cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr),org.nfrac.comportex.protocols.layer_depth(lyr),p1__39351_SHARP_);
});})(i__39535,i__39485,G__39548,G__39548__$1,G__39548__$2,G__39548__$3,cols_subset,lyr,spec,lyr_id,c__5452__auto____$1,size__5453__auto____$1,b__39536,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cols_subset)))):G__39548__$3);
var G__39548__$5 = ((cljs.core.contains_QMARK_(fetches,"tp-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39548__$4,cljs.core.cst$kw$tp_DASH_columns,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.temporal_pooling_cells(lyr))):G__39548__$4);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39548__$5,cljs.core.cst$kw$break_QMARK_,cljs.core.empty_QMARK_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null))));

})()], null));

var G__39578 = (i__39535 + (1));
i__39535 = G__39578;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39536),org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39483_$_iter__39533(cljs.core.chunk_rest(s__39534__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39536),null);
}
} else {
var lyr_id = cljs.core.first(s__39534__$2);
var cols_subset = (function (){var G__39551 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null);
return (path__GT_ids.cljs$core$IFn$_invoke$arity$1 ? path__GT_ids.cljs$core$IFn$_invoke$arity$1(G__39551) : path__GT_ids.call(null,G__39551));
})();
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
var spec = org.nfrac.comportex.protocols.params(lyr);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,(function (){var G__39552 = cljs.core.PersistentArrayMap.EMPTY;
var G__39552__$1 = ((cljs.core.contains_QMARK_(fetches,"overlaps-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39552,cljs.core.cst$kw$overlaps_DASH_columns_DASH_alpha,org.nfrac.comportex.util.remap(((function (i__39485,G__39552,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39348_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39348_SHARP_ / (16));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39485,G__39552,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.persistent_BANG_(cljs.core.reduce_kv(((function (i__39485,G__39552,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (m,p__39553,v){
var vec__39554 = p__39553;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39554,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39554,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39554,(2),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,col,(function (){var x__5013__auto__ = v;
var y__5014__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,col,(0));
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})());
});})(i__39485,G__39552,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr)))))):G__39552);
var G__39552__$2 = ((cljs.core.contains_QMARK_(fetches,"boost-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39552__$1,cljs.core.cst$kw$boost_DASH_columns_DASH_alpha,cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.float$,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39485,G__39552,G__39552__$1,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39349_SHARP_){
return ((p1__39349_SHARP_ - (1)) / (cljs.core.cst$kw$max_DASH_boost.cljs$core$IFn$_invoke$arity$1(spec) - (1)));
});})(i__39485,G__39552,G__39552__$1,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.cst$kw$boosts.cljs$core$IFn$_invoke$arity$1(lyr))))):G__39552__$1);
var G__39552__$3 = ((cljs.core.contains_QMARK_(fetches,"active-freq-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39552__$2,cljs.core.cst$kw$active_DASH_freq_DASH_columns_DASH_alpha,cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39485,G__39552,G__39552__$1,G__39552__$2,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39350_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = ((2) * p1__39350_SHARP_);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39485,G__39552,G__39552__$1,G__39552__$2,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr)))):G__39552__$2);
var G__39552__$4 = ((cljs.core.contains_QMARK_(fetches,"n-segments-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39552__$3,cljs.core.cst$kw$n_DASH_segments_DASH_columns_DASH_alpha,cljs.core.zipmap(cols_subset,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39485,G__39552,G__39552__$1,G__39552__$2,G__39552__$3,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39352_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39352_SHARP_ / 16.0);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39485,G__39552,G__39552__$1,G__39552__$2,G__39552__$3,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39485,G__39552,G__39552__$1,G__39552__$2,G__39552__$3,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__){
return (function (p1__39351_SHARP_){
return org.numenta.sanity.comportex.data.count_segs_in_column(cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr),org.nfrac.comportex.protocols.layer_depth(lyr),p1__39351_SHARP_);
});})(i__39485,G__39552,G__39552__$1,G__39552__$2,G__39552__$3,cols_subset,lyr,spec,lyr_id,s__39534__$2,temp__4653__auto____$1,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,cols_subset)))):G__39552__$3);
var G__39552__$5 = ((cljs.core.contains_QMARK_(fetches,"tp-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39552__$4,cljs.core.cst$kw$tp_DASH_columns,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.temporal_pooling_cells(lyr))):G__39552__$4);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39552__$5,cljs.core.cst$kw$break_QMARK_,cljs.core.empty_QMARK_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null))));

})()], null),org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39483_$_iter__39533(cljs.core.rest(s__39534__$2)));
}
} else {
return null;
}
break;
}
});})(i__39485,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
,null,null));
});})(i__39485,rgn,rgn_id,c__5452__auto__,size__5453__auto__,b__39486,s__39484__$2,temp__4653__auto__))
;
return iter__5454__auto__(org.nfrac.comportex.core.layers(rgn));
})())], null));

var G__39579 = (i__39485 + (1));
i__39485 = G__39579;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39486),org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39483(cljs.core.chunk_rest(s__39484__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39486),null);
}
} else {
var rgn_id = cljs.core.first(s__39484__$2);
var rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39483_$_iter__39555(s__39556){
return (new cljs.core.LazySeq(null,((function (rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (){
var s__39556__$1 = s__39556;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39556__$1);
if(temp__4653__auto____$1){
var s__39556__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39556__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39556__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39558 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39557 = (0);
while(true){
if((i__39557 < size__5453__auto__)){
var lyr_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39557);
var cols_subset = (function (){var G__39569 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null);
return (path__GT_ids.cljs$core$IFn$_invoke$arity$1 ? path__GT_ids.cljs$core$IFn$_invoke$arity$1(G__39569) : path__GT_ids.call(null,G__39569));
})();
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
var spec = org.nfrac.comportex.protocols.params(lyr);
cljs.core.chunk_append(b__39558,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,(function (){var G__39570 = cljs.core.PersistentArrayMap.EMPTY;
var G__39570__$1 = ((cljs.core.contains_QMARK_(fetches,"overlaps-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39570,cljs.core.cst$kw$overlaps_DASH_columns_DASH_alpha,org.nfrac.comportex.util.remap(((function (i__39557,G__39570,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39348_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39348_SHARP_ / (16));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39557,G__39570,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.persistent_BANG_(cljs.core.reduce_kv(((function (i__39557,G__39570,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (m,p__39571,v){
var vec__39572 = p__39571;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39572,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39572,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39572,(2),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,col,(function (){var x__5013__auto__ = v;
var y__5014__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,col,(0));
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})());
});})(i__39557,G__39570,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr)))))):G__39570);
var G__39570__$2 = ((cljs.core.contains_QMARK_(fetches,"boost-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39570__$1,cljs.core.cst$kw$boost_DASH_columns_DASH_alpha,cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.float$,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39557,G__39570,G__39570__$1,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39349_SHARP_){
return ((p1__39349_SHARP_ - (1)) / (cljs.core.cst$kw$max_DASH_boost.cljs$core$IFn$_invoke$arity$1(spec) - (1)));
});})(i__39557,G__39570,G__39570__$1,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.cst$kw$boosts.cljs$core$IFn$_invoke$arity$1(lyr))))):G__39570__$1);
var G__39570__$3 = ((cljs.core.contains_QMARK_(fetches,"active-freq-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39570__$2,cljs.core.cst$kw$active_DASH_freq_DASH_columns_DASH_alpha,cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39557,G__39570,G__39570__$1,G__39570__$2,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39350_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = ((2) * p1__39350_SHARP_);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39557,G__39570,G__39570__$1,G__39570__$2,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr)))):G__39570__$2);
var G__39570__$4 = ((cljs.core.contains_QMARK_(fetches,"n-segments-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39570__$3,cljs.core.cst$kw$n_DASH_segments_DASH_columns_DASH_alpha,cljs.core.zipmap(cols_subset,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39557,G__39570,G__39570__$1,G__39570__$2,G__39570__$3,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39352_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39352_SHARP_ / 16.0);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(i__39557,G__39570,G__39570__$1,G__39570__$2,G__39570__$3,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__39557,G__39570,G__39570__$1,G__39570__$2,G__39570__$3,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39351_SHARP_){
return org.numenta.sanity.comportex.data.count_segs_in_column(cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr),org.nfrac.comportex.protocols.layer_depth(lyr),p1__39351_SHARP_);
});})(i__39557,G__39570,G__39570__$1,G__39570__$2,G__39570__$3,cols_subset,lyr,spec,lyr_id,c__5452__auto__,size__5453__auto__,b__39558,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cols_subset)))):G__39570__$3);
var G__39570__$5 = ((cljs.core.contains_QMARK_(fetches,"tp-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39570__$4,cljs.core.cst$kw$tp_DASH_columns,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.temporal_pooling_cells(lyr))):G__39570__$4);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39570__$5,cljs.core.cst$kw$break_QMARK_,cljs.core.empty_QMARK_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null))));

})()], null));

var G__39580 = (i__39557 + (1));
i__39557 = G__39580;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39558),org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39483_$_iter__39555(cljs.core.chunk_rest(s__39556__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39558),null);
}
} else {
var lyr_id = cljs.core.first(s__39556__$2);
var cols_subset = (function (){var G__39573 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null);
return (path__GT_ids.cljs$core$IFn$_invoke$arity$1 ? path__GT_ids.cljs$core$IFn$_invoke$arity$1(G__39573) : path__GT_ids.call(null,G__39573));
})();
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
var spec = org.nfrac.comportex.protocols.params(lyr);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,(function (){var G__39574 = cljs.core.PersistentArrayMap.EMPTY;
var G__39574__$1 = ((cljs.core.contains_QMARK_(fetches,"overlaps-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39574,cljs.core.cst$kw$overlaps_DASH_columns_DASH_alpha,org.nfrac.comportex.util.remap(((function (G__39574,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39348_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39348_SHARP_ / (16));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(G__39574,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.persistent_BANG_(cljs.core.reduce_kv(((function (G__39574,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (m,p__39575,v){
var vec__39576 = p__39575;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39576,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39576,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39576,(2),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,col,(function (){var x__5013__auto__ = v;
var y__5014__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,col,(0));
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})());
});})(G__39574,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr)))))):G__39574);
var G__39574__$2 = ((cljs.core.contains_QMARK_(fetches,"boost-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39574__$1,cljs.core.cst$kw$boost_DASH_columns_DASH_alpha,cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.float$,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__39574,G__39574__$1,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39349_SHARP_){
return ((p1__39349_SHARP_ - (1)) / (cljs.core.cst$kw$max_DASH_boost.cljs$core$IFn$_invoke$arity$1(spec) - (1)));
});})(G__39574,G__39574__$1,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.cst$kw$boosts.cljs$core$IFn$_invoke$arity$1(lyr))))):G__39574__$1);
var G__39574__$3 = ((cljs.core.contains_QMARK_(fetches,"active-freq-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39574__$2,cljs.core.cst$kw$active_DASH_freq_DASH_columns_DASH_alpha,cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__39574,G__39574__$1,G__39574__$2,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39350_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = ((2) * p1__39350_SHARP_);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(G__39574,G__39574__$1,G__39574__$2,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr)))):G__39574__$2);
var G__39574__$4 = ((cljs.core.contains_QMARK_(fetches,"n-segments-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39574__$3,cljs.core.cst$kw$n_DASH_segments_DASH_columns_DASH_alpha,cljs.core.zipmap(cols_subset,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__39574,G__39574__$1,G__39574__$2,G__39574__$3,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39352_SHARP_){
var x__5020__auto__ = 1.0;
var y__5021__auto__ = (p1__39352_SHARP_ / 16.0);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});})(G__39574,G__39574__$1,G__39574__$2,G__39574__$3,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__39574,G__39574__$1,G__39574__$2,G__39574__$3,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__){
return (function (p1__39351_SHARP_){
return org.numenta.sanity.comportex.data.count_segs_in_column(cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr),org.nfrac.comportex.protocols.layer_depth(lyr),p1__39351_SHARP_);
});})(G__39574,G__39574__$1,G__39574__$2,G__39574__$3,cols_subset,lyr,spec,lyr_id,s__39556__$2,temp__4653__auto____$1,rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,cols_subset)))):G__39574__$3);
var G__39574__$5 = ((cljs.core.contains_QMARK_(fetches,"tp-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39574__$4,cljs.core.cst$kw$tp_DASH_columns,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.temporal_pooling_cells(lyr))):G__39574__$4);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39574__$5,cljs.core.cst$kw$break_QMARK_,cljs.core.empty_QMARK_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null))));

})()], null),org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39483_$_iter__39555(cljs.core.rest(s__39556__$2)));
}
} else {
return null;
}
break;
}
});})(rgn,rgn_id,s__39484__$2,temp__4653__auto__))
,null,null));
});})(rgn,rgn_id,s__39484__$2,temp__4653__auto__))
;
return iter__5454__auto__(org.nfrac.comportex.core.layers(rgn));
})())], null),org$numenta$sanity$comportex$data$inbits_cols_data_$_iter__39483(cljs.core.rest(s__39484__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(org.nfrac.comportex.core.region_keys.cljs$core$IFn$_invoke$arity$1(htm));
})())], null);
});
org.numenta.sanity.comportex.data.cell_excitation_data = (function org$numenta$sanity$comportex$data$cell_excitation_data(htm,prior_htm,rgn_id,lyr_id,sel_col){
var wc = org.nfrac.comportex.protocols.winner_cells(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null)));
var wc_PLUS_ = (cljs.core.truth_(sel_col)?(function (){var prior_wc = org.nfrac.comportex.protocols.winner_cells(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prior_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null)));
var sel_cell = (function (){var or__4682__auto__ = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (prior_wc,wc){
return (function (p__39587){
var vec__39588 = p__39587;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39588,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39588,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(col,sel_col);
});})(prior_wc,wc))
,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(prior_wc,wc)));
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sel_col,(0)], null);
}
})();
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(wc,sel_cell);
})():wc);
return org.nfrac.comportex.core.cell_excitation_breakdowns(htm,prior_htm,rgn_id,lyr_id,wc_PLUS_);
});
org.numenta.sanity.comportex.data.step_template_data = (function org$numenta$sanity$comportex$data$step_template_data(htm){
var sense_keys = org.nfrac.comportex.core.sense_keys(htm);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$senses,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (sense_keys){
return (function (st,p__39605){
var vec__39606 = p__39605;
var ordinal = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39606,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39606,(1),null);
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(st,sense_id,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dimensions,org.nfrac.comportex.protocols.dims_of(sense),cljs.core.cst$kw$ordinal,ordinal], null));
});})(sense_keys))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),sense_keys)),cljs.core.cst$kw$regions,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (sense_keys){
return (function (rt,p__39607){
var vec__39608 = p__39607;
var ordinal = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39608,(0),null);
var vec__39609 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39608,(1),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39609,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39609,(1),null);
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
return cljs.core.assoc_in(rt,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$spec,org.nfrac.comportex.protocols.params(lyr),cljs.core.cst$kw$dimensions,org.nfrac.comportex.protocols.dims_of(lyr),cljs.core.cst$kw$ordinal,(ordinal + cljs.core.count(sense_keys))], null));
});})(sense_keys))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),(function (){var iter__5454__auto__ = ((function (sense_keys){
return (function org$numenta$sanity$comportex$data$step_template_data_$_iter__39610(s__39611){
return (new cljs.core.LazySeq(null,((function (sense_keys){
return (function (){
var s__39611__$1 = s__39611;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39611__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var rgn_id = cljs.core.first(xs__5201__auto__);
var rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id], null));
var iterys__5450__auto__ = ((function (s__39611__$1,rgn,rgn_id,xs__5201__auto__,temp__4653__auto__,sense_keys){
return (function org$numenta$sanity$comportex$data$step_template_data_$_iter__39610_$_iter__39612(s__39613){
return (new cljs.core.LazySeq(null,((function (s__39611__$1,rgn,rgn_id,xs__5201__auto__,temp__4653__auto__,sense_keys){
return (function (){
var s__39613__$1 = s__39613;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39613__$1);
if(temp__4653__auto____$1){
var s__39613__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39613__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39613__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39615 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39614 = (0);
while(true){
if((i__39614 < size__5453__auto__)){
var lyr_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39614);
cljs.core.chunk_append(b__39615,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null));

var G__39621 = (i__39614 + (1));
i__39614 = G__39621;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39615),org$numenta$sanity$comportex$data$step_template_data_$_iter__39610_$_iter__39612(cljs.core.chunk_rest(s__39613__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39615),null);
}
} else {
var lyr_id = cljs.core.first(s__39613__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null),org$numenta$sanity$comportex$data$step_template_data_$_iter__39610_$_iter__39612(cljs.core.rest(s__39613__$2)));
}
} else {
return null;
}
break;
}
});})(s__39611__$1,rgn,rgn_id,xs__5201__auto__,temp__4653__auto__,sense_keys))
,null,null));
});})(s__39611__$1,rgn,rgn_id,xs__5201__auto__,temp__4653__auto__,sense_keys))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(org.nfrac.comportex.core.layers(rgn)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$comportex$data$step_template_data_$_iter__39610(cljs.core.rest(s__39611__$1)));
} else {
var G__39622 = cljs.core.rest(s__39611__$1);
s__39611__$1 = G__39622;
continue;
}
} else {
return null;
}
break;
}
});})(sense_keys))
,null,null));
});})(sense_keys))
;
return iter__5454__auto__(org.nfrac.comportex.core.region_keys.cljs$core$IFn$_invoke$arity$1(htm));
})()))], null);
});
org.numenta.sanity.comportex.data.cell__GT_id = (function org$numenta$sanity$comportex$data$cell__GT_id(depth,p__39623){
var vec__39625 = p__39623;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39625,(0),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39625,(1),null);
return ((col * depth) + ci);
});
org.numenta.sanity.comportex.data.cell_cells_transitions = (function org$numenta$sanity$comportex$data$cell_cells_transitions(distal_sg,depth,n_cols){
var all_cell_ids = (function (){var iter__5454__auto__ = (function org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39637(s__39638){
return (new cljs.core.LazySeq(null,(function (){
var s__39638__$1 = s__39638;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39638__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var col = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__39638__$1,col,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39637_$_iter__39639(s__39640){
return (new cljs.core.LazySeq(null,((function (s__39638__$1,col,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__39640__$1 = s__39640;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39640__$1);
if(temp__4653__auto____$1){
var s__39640__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39640__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39640__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39642 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39641 = (0);
while(true){
if((i__39641 < size__5453__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39641);
cljs.core.chunk_append(b__39642,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));

var G__39648 = (i__39641 + (1));
i__39641 = G__39648;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39642),org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39637_$_iter__39639(cljs.core.chunk_rest(s__39640__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39642),null);
}
} else {
var ci = cljs.core.first(s__39640__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null),org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39637_$_iter__39639(cljs.core.rest(s__39640__$2)));
}
} else {
return null;
}
break;
}
});})(s__39638__$1,col,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__39638__$1,col,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(depth)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39637(cljs.core.rest(s__39638__$1)));
} else {
var G__39649 = cljs.core.rest(s__39638__$1);
s__39638__$1 = G__39649;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_cols));
})();
return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (all_cell_ids){
return (function (m,from_cell){
var source_id = org.numenta.sanity.comportex.data.cell__GT_id(depth,from_cell);
var to_segs = org.nfrac.comportex.protocols.targets_connected_from(distal_sg,source_id);
var to_cells = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.pop,to_segs);
if(cljs.core.seq(to_cells)){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,from_cell,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,from_cell,cljs.core.PersistentHashSet.EMPTY),to_cells));
} else {
return m;
}
});})(all_cell_ids))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),all_cell_ids));
});
org.numenta.sanity.comportex.data.cell_sdr_transitions = (function org$numenta$sanity$comportex$data$cell_sdr_transitions(cell_cells_xns,cell_sdr_fracs){
return cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,from_cell,to_cells){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,from_cell,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.merge_with,cljs.core.max,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cell_sdr_fracs,to_cells)));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cell_cells_xns));
});
org.numenta.sanity.comportex.data.sdr_sdr_transitions = (function org$numenta$sanity$comportex$data$sdr_sdr_transitions(cell_sdrs_xns,cell_sdr_fracs){
return org.nfrac.comportex.util.remap((function (to_sdr_frac_sums){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p__39653){
var vec__39654 = p__39653;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39654,(0),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39654,(1),null);
return (n >= (1));
})),to_sdr_frac_sums);
}),cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,from_cell,to_sdrs_fracs){
return cljs.core.reduce_kv((function (m__$1,from_sdr,from_frac){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m__$1,from_sdr,cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core._PLUS_,cljs.core.array_seq([cljs.core.get.cljs$core$IFn$_invoke$arity$3(m__$1,from_sdr,cljs.core.PersistentArrayMap.EMPTY),org.nfrac.comportex.util.remap((function (p1__39650_SHARP_){
return (p1__39650_SHARP_ * from_frac);
}),to_sdrs_fracs)], 0)));
}),m,(cell_sdr_fracs.cljs$core$IFn$_invoke$arity$1 ? cell_sdr_fracs.cljs$core$IFn$_invoke$arity$1(from_cell) : cell_sdr_fracs.call(null,from_cell)));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cell_sdrs_xns)));
});
org.numenta.sanity.comportex.data.freqs__GT_fracs = (function org$numenta$sanity$comportex$data$freqs__GT_fracs(freqs){
var total = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.vals(freqs));
return org.nfrac.comportex.util.remap(((function (total){
return (function (p1__39655_SHARP_){
return (p1__39655_SHARP_ / total);
});})(total))
,freqs);
});
/**
 * Argument cell-sdr-counts is a map from cell id to the SDRs it
 *   participates in. Each value gives the frequencies map by SDR id
 *   for that cell.
 * 
 *   Returns the SDR to SDR transitions, derived from the distal synapse
 *   graph. It is a map from an SDR id to any subsequent SDRs, each
 *   mapped to the number of connected synapses, weighted by the
 *   specificity of both the source and target cells to those SDRs.
 */
org.numenta.sanity.comportex.data.transitions_data = (function org$numenta$sanity$comportex$data$transitions_data(htm,rgn_id,lyr_id,cell_sdr_counts){
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
var depth = org.nfrac.comportex.protocols.layer_depth(lyr);
var distal_sg = cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr);
var cell_sdr_fracs = org.nfrac.comportex.util.remap(org.numenta.sanity.comportex.data.freqs__GT_fracs,cell_sdr_counts);
return org.numenta.sanity.comportex.data.sdr_sdr_transitions(org.numenta.sanity.comportex.data.cell_sdr_transitions(org.numenta.sanity.comportex.data.cell_cells_transitions(distal_sg,depth,org.nfrac.comportex.protocols.size_of(lyr)),cell_sdr_fracs),cell_sdr_fracs);
});
