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
return cljs.core.group_by((function (p__38764){
var vec__38765 = p__38764;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38765,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38765,(1),null);
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
return (function org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38787(s__38788){
return (new cljs.core.LazySeq(null,((function (active_bit_QMARK_){
return (function (){
var s__38788__$1 = s__38788;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__38788__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var rgn_id = cljs.core.first(xs__5201__auto__);
var rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id], null));
var vec__38801 = org.nfrac.comportex.core.layers(rgn);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38801,(0),null);
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
var sg = cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr);
var adjusted_bit = (org.nfrac.comportex.core.ff_base(htm,rgn_id,sense_id) + bit);
var to_segs = org.nfrac.comportex.protocols.targets_connected_from(sg,adjusted_bit);
var predictive_columns = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,org.nfrac.comportex.protocols.prior_predictive_cells(lyr)));
var iterys__5450__auto__ = ((function (s__38788__$1,rgn,vec__38801,lyr_id,lyr,sg,adjusted_bit,to_segs,predictive_columns,rgn_id,xs__5201__auto__,temp__4653__auto__,active_bit_QMARK_){
return (function org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38787_$_iter__38789(s__38790){
return (new cljs.core.LazySeq(null,((function (s__38788__$1,rgn,vec__38801,lyr_id,lyr,sg,adjusted_bit,to_segs,predictive_columns,rgn_id,xs__5201__auto__,temp__4653__auto__,active_bit_QMARK_){
return (function (){
var s__38790__$1 = s__38790;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__38790__$1);
if(temp__4653__auto____$1){
var s__38790__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__38790__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__38790__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__38792 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__38791 = (0);
while(true){
if((i__38791 < size__5453__auto__)){
var vec__38806 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__38791);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38806,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38806,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38806,(2),null);
var seg_path = vec__38806;
var predictive_col_QMARK_ = cljs.core.contains_QMARK_(predictive_columns,col);
if((cljs.core.contains_QMARK_(syn_states,"inactive")) || ((cljs.core.contains_QMARK_(syn_states,"predicted")) && (predictive_col_QMARK_)) || (active_bit_QMARK_)){
var perm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.in_synapses(sg,seg_path),adjusted_bit);
cljs.core.chunk_append(b__38792,new cljs.core.PersistentArrayMap(null, 6, ["target-id",rgn_id,"target-lyr",lyr_id,"target-col",col,"target-dt",(0),"syn-state",((active_bit_QMARK_)?((predictive_col_QMARK_)?"active-predicted":"active"):((predictive_col_QMARK_)?"predicted":"inactive-syn")),"perm",perm], null));

var G__38808 = (i__38791 + (1));
i__38791 = G__38808;
continue;
} else {
var G__38809 = (i__38791 + (1));
i__38791 = G__38809;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__38792),org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38787_$_iter__38789(cljs.core.chunk_rest(s__38790__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__38792),null);
}
} else {
var vec__38807 = cljs.core.first(s__38790__$2);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38807,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38807,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38807,(2),null);
var seg_path = vec__38807;
var predictive_col_QMARK_ = cljs.core.contains_QMARK_(predictive_columns,col);
if((cljs.core.contains_QMARK_(syn_states,"inactive")) || ((cljs.core.contains_QMARK_(syn_states,"predicted")) && (predictive_col_QMARK_)) || (active_bit_QMARK_)){
var perm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.in_synapses(sg,seg_path),adjusted_bit);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 6, ["target-id",rgn_id,"target-lyr",lyr_id,"target-col",col,"target-dt",(0),"syn-state",((active_bit_QMARK_)?((predictive_col_QMARK_)?"active-predicted":"active"):((predictive_col_QMARK_)?"predicted":"inactive-syn")),"perm",perm], null),org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38787_$_iter__38789(cljs.core.rest(s__38790__$2)));
} else {
var G__38810 = cljs.core.rest(s__38790__$2);
s__38790__$1 = G__38810;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__38788__$1,rgn,vec__38801,lyr_id,lyr,sg,adjusted_bit,to_segs,predictive_columns,rgn_id,xs__5201__auto__,temp__4653__auto__,active_bit_QMARK_))
,null,null));
});})(s__38788__$1,rgn,vec__38801,lyr_id,lyr,sg,adjusted_bit,to_segs,predictive_columns,rgn_id,xs__5201__auto__,temp__4653__auto__,active_bit_QMARK_))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(to_segs));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__38787(cljs.core.rest(s__38788__$1)));
} else {
var G__38811 = cljs.core.rest(s__38788__$1);
s__38788__$1 = G__38811;
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
var on_bits = (function (){var G__38939 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__38939) {
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
return (function org$numenta$sanity$comportex$data$column_segs_$_iter__38940(s__38941){
return (new cljs.core.LazySeq(null,((function (lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning){
return (function (){
var s__38941__$1 = s__38941;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__38941__$1);
if(temp__4653__auto__){
var s__38941__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__38941__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__38941__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__38943 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__38942 = (0);
while(true){
if((i__38942 < size__5453__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__38942);
cljs.core.chunk_append(b__38943,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));

var G__39063 = (i__38942 + (1));
i__38942 = G__39063;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__38943),org$numenta$sanity$comportex$data$column_segs_$_iter__38940(cljs.core.chunk_rest(s__38941__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__38943),null);
}
} else {
var ci = cljs.core.first(s__38941__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null),org$numenta$sanity$comportex$data$column_segs_$_iter__38940(cljs.core.rest(s__38941__$2)));
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
var map__38937 = seg_up;
var map__38937__$1 = ((((!((map__38937 == null)))?((((map__38937.cljs$lang$protocol_mask$partition0$ & (64))) || (map__38937.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__38937):map__38937);
var vec__38938 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38937__$1,cljs.core.cst$kw$target_DASH_id);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38938,(0),null);
var learn_ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38938,(1),null);
var learn_si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38938,(2),null);
var sg_key = (function (){var G__38947 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__38947) {
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function org$numenta$sanity$comportex$data$column_segs_$_iter__38948(s__38949){
return (new cljs.core.LazySeq(null,((function (lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function (){
var s__38949__$1 = s__38949;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__38949__$1);
if(temp__4653__auto__){
var s__38949__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__38949__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__38949__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__38951 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__38950 = (0);
while(true){
if((i__38950 < size__5453__auto__)){
var vec__39008 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__38950);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39008,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39008,(1),null);
var cell_learning_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci);
var p_segs = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p_segs_by_cell,ci);
var use_segs = (((cell_learning_QMARK_) && ((learn_si >= cljs.core.count(p_segs))))?cljs.core.take.cljs$core$IFn$_invoke$arity$2((learn_si + (1)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(p_segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY))):p_segs);
cljs.core.chunk_append(b__38951,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (i__38950,cell_learning_QMARK_,p_segs,use_segs,vec__39008,ci,___$1,c__5452__auto__,size__5453__auto__,b__38951,s__38949__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function org$numenta$sanity$comportex$data$column_segs_$_iter__38948_$_iter__39009(s__39010){
return (new cljs.core.LazySeq(null,((function (i__38950,cell_learning_QMARK_,p_segs,use_segs,vec__39008,ci,___$1,c__5452__auto__,size__5453__auto__,b__38951,s__38949__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function (){
var s__39010__$1 = s__39010;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39010__$1);
if(temp__4653__auto____$1){
var s__39010__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39010__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__39010__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__39012 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__39011 = (0);
while(true){
if((i__39011 < size__5453__auto____$1)){
var vec__39025 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__39011);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39025,(0),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39025,(1),null);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__39026 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39026) : grouped_syns.call(null,G__39026));
})());
var conn_tot = (cljs.core.count((function (){var G__39027 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39027) : grouped_syns.call(null,G__39027));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__39028 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39028) : grouped_syns.call(null,G__39028));
})());
var disc_tot = (cljs.core.count((function (){var G__39029 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39029) : grouped_syns.call(null,G__39029));
})()) + disc_act);
cljs.core.chunk_append(b__39012,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si)),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null));

var G__39065 = (i__39011 + (1));
i__39011 = G__39065;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39012),org$numenta$sanity$comportex$data$column_segs_$_iter__38948_$_iter__39009(cljs.core.chunk_rest(s__39010__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39012),null);
}
} else {
var vec__39030 = cljs.core.first(s__39010__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39030,(0),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39030,(1),null);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__39031 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39031) : grouped_syns.call(null,G__39031));
})());
var conn_tot = (cljs.core.count((function (){var G__39032 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39032) : grouped_syns.call(null,G__39032));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__39033 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39033) : grouped_syns.call(null,G__39033));
})());
var disc_tot = (cljs.core.count((function (){var G__39034 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39034) : grouped_syns.call(null,G__39034));
})()) + disc_act);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si)),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null),org$numenta$sanity$comportex$data$column_segs_$_iter__38948_$_iter__39009(cljs.core.rest(s__39010__$2)));
}
} else {
return null;
}
break;
}
});})(i__38950,cell_learning_QMARK_,p_segs,use_segs,vec__39008,ci,___$1,c__5452__auto__,size__5453__auto__,b__38951,s__38949__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
,null,null));
});})(i__38950,cell_learning_QMARK_,p_segs,use_segs,vec__39008,ci,___$1,c__5452__auto__,size__5453__auto__,b__38951,s__38949__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,use_segs));
})())], null));

var G__39066 = (i__38950 + (1));
i__38950 = G__39066;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__38951),org$numenta$sanity$comportex$data$column_segs_$_iter__38948(cljs.core.chunk_rest(s__38949__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__38951),null);
}
} else {
var vec__39035 = cljs.core.first(s__38949__$2);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39035,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39035,(1),null);
var cell_learning_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci);
var p_segs = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p_segs_by_cell,ci);
var use_segs = (((cell_learning_QMARK_) && ((learn_si >= cljs.core.count(p_segs))))?cljs.core.take.cljs$core$IFn$_invoke$arity$2((learn_si + (1)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(p_segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY))):p_segs);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5454__auto__ = ((function (cell_learning_QMARK_,p_segs,use_segs,vec__39035,ci,___$1,s__38949__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function org$numenta$sanity$comportex$data$column_segs_$_iter__38948_$_iter__39036(s__39037){
return (new cljs.core.LazySeq(null,((function (cell_learning_QMARK_,p_segs,use_segs,vec__39035,ci,___$1,s__38949__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell){
return (function (){
var s__39037__$1 = s__39037;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39037__$1);
if(temp__4653__auto____$1){
var s__39037__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39037__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39037__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39039 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39038 = (0);
while(true){
if((i__39038 < size__5453__auto__)){
var vec__39052 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39038);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39052,(0),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39052,(1),null);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__39053 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39053) : grouped_syns.call(null,G__39053));
})());
var conn_tot = (cljs.core.count((function (){var G__39054 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39054) : grouped_syns.call(null,G__39054));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__39055 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39055) : grouped_syns.call(null,G__39055));
})());
var disc_tot = (cljs.core.count((function (){var G__39056 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39056) : grouped_syns.call(null,G__39056));
})()) + disc_act);
cljs.core.chunk_append(b__39039,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si)),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null));

var G__39067 = (i__39038 + (1));
i__39038 = G__39067;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39039),org$numenta$sanity$comportex$data$column_segs_$_iter__38948_$_iter__39036(cljs.core.chunk_rest(s__39037__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39039),null);
}
} else {
var vec__39057 = cljs.core.first(s__39037__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39057,(0),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39057,(1),null);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__39058 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39058) : grouped_syns.call(null,G__39058));
})());
var conn_tot = (cljs.core.count((function (){var G__39059 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39059) : grouped_syns.call(null,G__39059));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__39060 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39060) : grouped_syns.call(null,G__39060));
})());
var disc_tot = (cljs.core.count((function (){var G__39061 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__39061) : grouped_syns.call(null,G__39061));
})()) + disc_act);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si)),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null),org$numenta$sanity$comportex$data$column_segs_$_iter__38948_$_iter__39036(cljs.core.rest(s__39037__$2)));
}
} else {
return null;
}
break;
}
});})(cell_learning_QMARK_,p_segs,use_segs,vec__39035,ci,___$1,s__38949__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
,null,null));
});})(cell_learning_QMARK_,p_segs,use_segs,vec__39035,ci,___$1,s__38949__$2,temp__4653__auto__,lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,use_segs));
})())], null),org$numenta$sanity$comportex$data$column_segs_$_iter__38948(cljs.core.rest(s__38949__$2)));
}
} else {
return null;
}
break;
}
});})(lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
,null,null));
});})(lyr,spec,dspec,stimulus_th,learning_th,pcon,on_bits,learning,cell_ids,seg_up,map__38937,map__38937__$1,vec__38938,_,learn_ci,learn_si,sg_key,segs_by_cell,p_segs_by_cell))
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
var on_bits = (function (){var G__39110 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39110) {
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
return (function org$numenta$sanity$comportex$data$segment_syns_$_iter__39111(s__39112){
return (new cljs.core.LazySeq(null,((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning){
return (function (){
var s__39112__$1 = s__39112;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39112__$1);
if(temp__4653__auto__){
var s__39112__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39112__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39112__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39114 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39113 = (0);
while(true){
if((i__39113 < size__5453__auto__)){
var ci__$1 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39113);
cljs.core.chunk_append(b__39114,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci__$1], null));

var G__39149 = (i__39113 + (1));
i__39113 = G__39149;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39114),org$numenta$sanity$comportex$data$segment_syns_$_iter__39111(cljs.core.chunk_rest(s__39112__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39114),null);
}
} else {
var ci__$1 = cljs.core.first(s__39112__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci__$1], null),org$numenta$sanity$comportex$data$segment_syns_$_iter__39111(cljs.core.rest(s__39112__$2)));
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
var map__39108 = seg_up;
var map__39108__$1 = ((((!((map__39108 == null)))?((((map__39108.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39108.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__39108):map__39108);
var vec__39109 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39108__$1,cljs.core.cst$kw$target_DASH_id);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39109,(0),null);
var learn_ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39109,(1),null);
var learn_si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39109,(2),null);
var grow_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39108__$1,cljs.core.cst$kw$grow_DASH_sources);
var learn_seg_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ci,learn_ci)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(si,learn_si));
var p_segs = org.nfrac.comportex.protocols.cell_segments(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null)),(function (){var G__39118 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39118) {
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
var input_layer_QMARK_ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg){
return (function (p__39119){
var vec__39120 = p__39119;
var rgn_id__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39120,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39120,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id__$1,cljs.core.first(org.nfrac.comportex.core.layers(rgn))], null);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg))
,regions));
var output_layer = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_){
return (function (p__39121){
var vec__39122 = p__39121;
var rgn_id__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39122,(0),null);
var rgn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39122,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id__$1,cljs.core.last(org.nfrac.comportex.core.layers(rgn))], null);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_))
,regions));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var source_of_bit = (function (){var G__39123 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39123) {
case "apical":
return org.nfrac.comportex.core.source_of_apical_bit;

break;
case "distal":
return org.nfrac.comportex.core.source_of_distal_bit;

break;
case "proximal":
return ((function (G__39123,regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns){
return (function (htm__$1,rgn_id__$1,lyr_id__$1,i){
if(cljs.core.truth_((function (){var G__39124 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id__$1,lyr_id__$1], null);
return (input_layer_QMARK_.cljs$core$IFn$_invoke$arity$1 ? input_layer_QMARK_.cljs$core$IFn$_invoke$arity$1(G__39124) : input_layer_QMARK_.call(null,G__39124));
})())){
var vec__39125 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm__$1,rgn_id__$1,i,cljs.core.cst$kw$ff_DASH_deps);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39125,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39125,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [src_id,(output_layer.cljs$core$IFn$_invoke$arity$1 ? output_layer.cljs$core$IFn$_invoke$arity$1(src_id) : output_layer.call(null,src_id)),src_i], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id__$1,cljs.core.cst$kw$layer_DASH_4,i], null);
}
});
;})(G__39123,regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns))

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit){
return (function (p__39126){
var vec__39127 = p__39126;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39127,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39127,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,(source_of_bit.cljs$core$IFn$_invoke$arity$4 ? source_of_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,lyr_id,i) : source_of_bit.call(null,htm,rgn_id,lyr_id,i)),p], null);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit))
,syns);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,((learn_seg_QMARK_)?cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit)):null)));
var syn_sources = (function (){var G__39128 = cljs.core.PersistentArrayMap.EMPTY;
var G__39128__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39128,"active",(function (){var G__39129 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__39129) : grouped_sourced_syns.call(null,G__39129));
})()):G__39128);
var G__39128__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive-syn"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39128__$1,"inactive-syn",cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__39130 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__39130) : grouped_sourced_syns.call(null,G__39130));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__39131 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__39131) : grouped_sourced_syns.call(null,G__39131));
})():null))):G__39128__$1);
var G__39128__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39128__$2,"disconnected",(function (){var G__39132 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__39132) : grouped_sourced_syns.call(null,G__39132));
})()):G__39128__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39128__$3,"growing",(grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$growing) : grouped_sourced_syns.call(null,cljs.core.cst$kw$growing)));
} else {
return G__39128__$3;
}
})();
var dt = (function (){var G__39133 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__39133) {
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
return org.nfrac.comportex.util.remap(((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt){
return (function (source_info){
var iter__5454__auto__ = ((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt){
return (function org$numenta$sanity$comportex$data$segment_syns_$_iter__39134(s__39135){
return (new cljs.core.LazySeq(null,((function (regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt){
return (function (){
var s__39135__$1 = s__39135;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39135__$1);
if(temp__4653__auto__){
var s__39135__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39135__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39135__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39137 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39136 = (0);
while(true){
if((i__39136 < size__5453__auto__)){
var vec__39144 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39136);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39144,(0),null);
var vec__39145 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39144,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39145,(0),null);
var src_lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39145,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39145,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39144,(2),null);
cljs.core.chunk_append(b__39137,new cljs.core.PersistentArrayMap(null, 5, ["src-col",(cljs.core.truth_(src_lyr)?cljs.core.first(org.nfrac.comportex.protocols.source_of_bit(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(regions,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [src_id,src_lyr], null)),src_i)):src_i),"src-id",src_id,"src-lyr",(cljs.core.truth_(src_lyr)?src_lyr:null),"src-dt",dt,"perm",p], null));

var G__39153 = (i__39136 + (1));
i__39136 = G__39153;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39137),org$numenta$sanity$comportex$data$segment_syns_$_iter__39134(cljs.core.chunk_rest(s__39135__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39137),null);
}
} else {
var vec__39146 = cljs.core.first(s__39135__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39146,(0),null);
var vec__39147 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39146,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39147,(0),null);
var src_lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39147,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39147,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39146,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 5, ["src-col",(cljs.core.truth_(src_lyr)?cljs.core.first(org.nfrac.comportex.protocols.source_of_bit(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(regions,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [src_id,src_lyr], null)),src_i)):src_i),"src-id",src_id,"src-lyr",(cljs.core.truth_(src_lyr)?src_lyr:null),"src-dt",dt,"perm",p], null),org$numenta$sanity$comportex$data$segment_syns_$_iter__39134(cljs.core.rest(s__39135__$2)));
}
} else {
return null;
}
break;
}
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt))
,null,null));
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt))
;
return iter__5454__auto__(source_info);
});})(regions,lyr,spec,dspec,pcon,pinit,on_bits,depth,learning,seg_up,map__39108,map__39108__$1,vec__39109,_,learn_ci,learn_si,grow_sources,learn_seg_QMARK_,p_segs,seg,input_layer_QMARK_,output_layer,grouped_syns,source_of_bit,grouped_sourced_syns,syn_sources,dt))
,syn_sources);
});
org.numenta.sanity.comportex.data.cell_excitation_data = (function org$numenta$sanity$comportex$data$cell_excitation_data(htm,prior_htm,rgn_id,lyr_id,sel_col){
var wc = org.nfrac.comportex.protocols.winner_cells(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null)));
var wc_PLUS_ = (cljs.core.truth_(sel_col)?(function (){var prior_wc = org.nfrac.comportex.protocols.winner_cells(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prior_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null)));
var sel_cell = (function (){var or__4682__auto__ = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (prior_wc,wc){
return (function (p__39160){
var vec__39161 = p__39160;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39161,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39161,(1),null);
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
return new cljs.core.PersistentArrayMap(null, 2, ["senses",cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (sense_keys){
return (function (st,p__39178){
var vec__39179 = p__39178;
var ordinal = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39179,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39179,(1),null);
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(st,sense_id,new cljs.core.PersistentArrayMap(null, 2, ["dimensions",org.nfrac.comportex.protocols.dims_of(sense),"ordinal",ordinal], null));
});})(sense_keys))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),sense_keys)),"regions",cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (sense_keys){
return (function (rt,p__39180){
var vec__39181 = p__39180;
var ordinal = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39181,(0),null);
var vec__39182 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39181,(1),null);
var rgn_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39182,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39182,(1),null);
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
return cljs.core.assoc_in(rt,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null),new cljs.core.PersistentArrayMap(null, 3, ["spec",org.nfrac.comportex.protocols.params(lyr),"dimensions",org.nfrac.comportex.protocols.dims_of(lyr),"ordinal",(ordinal + cljs.core.count(sense_keys))], null));
});})(sense_keys))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),(function (){var iter__5454__auto__ = ((function (sense_keys){
return (function org$numenta$sanity$comportex$data$step_template_data_$_iter__39183(s__39184){
return (new cljs.core.LazySeq(null,((function (sense_keys){
return (function (){
var s__39184__$1 = s__39184;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39184__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var rgn_id = cljs.core.first(xs__5201__auto__);
var rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id], null));
var iterys__5450__auto__ = ((function (s__39184__$1,rgn,rgn_id,xs__5201__auto__,temp__4653__auto__,sense_keys){
return (function org$numenta$sanity$comportex$data$step_template_data_$_iter__39183_$_iter__39185(s__39186){
return (new cljs.core.LazySeq(null,((function (s__39184__$1,rgn,rgn_id,xs__5201__auto__,temp__4653__auto__,sense_keys){
return (function (){
var s__39186__$1 = s__39186;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39186__$1);
if(temp__4653__auto____$1){
var s__39186__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39186__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39186__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39188 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39187 = (0);
while(true){
if((i__39187 < size__5453__auto__)){
var lyr_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39187);
cljs.core.chunk_append(b__39188,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null));

var G__39194 = (i__39187 + (1));
i__39187 = G__39194;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39188),org$numenta$sanity$comportex$data$step_template_data_$_iter__39183_$_iter__39185(cljs.core.chunk_rest(s__39186__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39188),null);
}
} else {
var lyr_id = cljs.core.first(s__39186__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rgn_id,lyr_id], null),org$numenta$sanity$comportex$data$step_template_data_$_iter__39183_$_iter__39185(cljs.core.rest(s__39186__$2)));
}
} else {
return null;
}
break;
}
});})(s__39184__$1,rgn,rgn_id,xs__5201__auto__,temp__4653__auto__,sense_keys))
,null,null));
});})(s__39184__$1,rgn,rgn_id,xs__5201__auto__,temp__4653__auto__,sense_keys))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(org.nfrac.comportex.core.layers(rgn)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$comportex$data$step_template_data_$_iter__39183(cljs.core.rest(s__39184__$1)));
} else {
var G__39195 = cljs.core.rest(s__39184__$1);
s__39184__$1 = G__39195;
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
org.numenta.sanity.comportex.data.cell__GT_id = (function org$numenta$sanity$comportex$data$cell__GT_id(depth,p__39196){
var vec__39198 = p__39196;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39198,(0),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39198,(1),null);
return ((col * depth) + ci);
});
org.numenta.sanity.comportex.data.cell_cells_transitions = (function org$numenta$sanity$comportex$data$cell_cells_transitions(distal_sg,depth,n_cols){
var all_cell_ids = (function (){var iter__5454__auto__ = (function org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39210(s__39211){
return (new cljs.core.LazySeq(null,(function (){
var s__39211__$1 = s__39211;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__39211__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var col = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__39211__$1,col,xs__5201__auto__,temp__4653__auto__){
return (function org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39210_$_iter__39212(s__39213){
return (new cljs.core.LazySeq(null,((function (s__39211__$1,col,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__39213__$1 = s__39213;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__39213__$1);
if(temp__4653__auto____$1){
var s__39213__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39213__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__39213__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__39215 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__39214 = (0);
while(true){
if((i__39214 < size__5453__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__39214);
cljs.core.chunk_append(b__39215,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));

var G__39221 = (i__39214 + (1));
i__39214 = G__39221;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39215),org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39210_$_iter__39212(cljs.core.chunk_rest(s__39213__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39215),null);
}
} else {
var ci = cljs.core.first(s__39213__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null),org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39210_$_iter__39212(cljs.core.rest(s__39213__$2)));
}
} else {
return null;
}
break;
}
});})(s__39211__$1,col,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__39211__$1,col,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(depth)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__39210(cljs.core.rest(s__39211__$1)));
} else {
var G__39222 = cljs.core.rest(s__39211__$1);
s__39211__$1 = G__39222;
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p__39226){
var vec__39227 = p__39226;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39227,(0),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39227,(1),null);
return (n >= (1));
})),to_sdr_frac_sums);
}),cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,from_cell,to_sdrs_fracs){
return cljs.core.reduce_kv((function (m__$1,from_sdr,from_frac){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m__$1,from_sdr,cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core._PLUS_,cljs.core.array_seq([cljs.core.get.cljs$core$IFn$_invoke$arity$3(m__$1,from_sdr,cljs.core.PersistentArrayMap.EMPTY),org.nfrac.comportex.util.remap((function (p1__39223_SHARP_){
return (p1__39223_SHARP_ * from_frac);
}),to_sdrs_fracs)], 0)));
}),m,(cell_sdr_fracs.cljs$core$IFn$_invoke$arity$1 ? cell_sdr_fracs.cljs$core$IFn$_invoke$arity$1(from_cell) : cell_sdr_fracs.call(null,from_cell)));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cell_sdrs_xns)));
});
org.numenta.sanity.comportex.data.freqs__GT_fracs = (function org$numenta$sanity$comportex$data$freqs__GT_fracs(freqs){
var total = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.vals(freqs));
return org.nfrac.comportex.util.remap(((function (total){
return (function (p1__39228_SHARP_){
return (p1__39228_SHARP_ / total);
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
