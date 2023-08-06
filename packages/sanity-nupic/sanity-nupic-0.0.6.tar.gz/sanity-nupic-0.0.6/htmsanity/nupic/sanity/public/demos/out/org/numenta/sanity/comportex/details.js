// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.details');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.protocols');
org.numenta.sanity.comportex.details.to_fixed = (function org$numenta$sanity$comportex$details$to_fixed(n,digits){
return n.toFixed(digits);
});
org.numenta.sanity.comportex.details.detail_text = (function org$numenta$sanity$comportex$details$detail_text(htm,prior_htm,rgn_id,lyr_id,col){
var rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id], null));
var lyr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(rgn,lyr_id);
var depth = org.nfrac.comportex.protocols.layer_depth(lyr);
var in$ = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(htm);
var in_bits = cljs.core.cst$kw$in_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr));
var in_sbits = cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr));
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.flatten(cljs.core.PersistentVector.fromArray(["__Selection__",[cljs.core.str("* timestep "),cljs.core.str(org.nfrac.comportex.protocols.timestep(rgn))].join(''),[cljs.core.str("* column "),cljs.core.str((function (){var or__4682__auto__ = col;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "nil";
}
})())].join(''),"","__Input__",[cljs.core.str(in$)].join(''),[cljs.core.str("("),cljs.core.str(cljs.core.count(in_bits)),cljs.core.str(" bits, of which "),cljs.core.str(cljs.core.count(in_sbits)),cljs.core.str(" stable)")].join(''),(cljs.core.truth_(cljs.core.cst$kw$newly_DASH_engaged_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr)))?"= newly engaged":(cljs.core.truth_(cljs.core.cst$kw$engaged_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr)))?"= continuing engaged":"= not engaged"
)),"","__Input bits__",[cljs.core.str(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(in_bits))].join(''),"","__Active columns__",[cljs.core.str(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.protocols.active_columns(lyr)))].join(''),"","__Bursting columns__",[cljs.core.str(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.protocols.bursting_columns(lyr)))].join(''),"","__Winner cells__",[cljs.core.str(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.protocols.winner_cells(lyr)))].join(''),"","__Proximal learning__",(function (){var iter__5454__auto__ = ((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62620(s__62621){
return (new cljs.core.LazySeq(null,((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62621__$1 = s__62621;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62621__$1);
if(temp__4653__auto__){
var s__62621__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62621__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62621__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62623 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62622 = (0);
while(true){
if((i__62622 < size__5453__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62622);
cljs.core.chunk_append(b__62623,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''));

var G__62974 = (i__62622 + (1));
i__62622 = G__62974;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62623),org$numenta$sanity$comportex$details$detail_text_$_iter__62620(cljs.core.chunk_rest(s__62621__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62623),null);
}
} else {
var seg_up = cljs.core.first(s__62621__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62620(cljs.core.rest(s__62621__$2)));
}
} else {
return null;
}
break;
}
});})(rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.vals(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learning.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr))))));
})(),"","__Distal learning__",(function (){var iter__5454__auto__ = ((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62626(s__62627){
return (new cljs.core.LazySeq(null,((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62627__$1 = s__62627;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62627__$1);
if(temp__4653__auto__){
var s__62627__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62627__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62627__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62629 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62628 = (0);
while(true){
if((i__62628 < size__5453__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62628);
cljs.core.chunk_append(b__62629,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''));

var G__62975 = (i__62628 + (1));
i__62628 = G__62975;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62629),org$numenta$sanity$comportex$details$detail_text_$_iter__62626(cljs.core.chunk_rest(s__62627__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62629),null);
}
} else {
var seg_up = cljs.core.first(s__62627__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62626(cljs.core.rest(s__62627__$2)));
}
} else {
return null;
}
break;
}
});})(rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.vals(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learning.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr))))));
})(),"","__Distal punishments__",(function (){var iter__5454__auto__ = ((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62632(s__62633){
return (new cljs.core.LazySeq(null,((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62633__$1 = s__62633;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62633__$1);
if(temp__4653__auto__){
var s__62633__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62633__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62633__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62635 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62634 = (0);
while(true){
if((i__62634 < size__5453__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62634);
cljs.core.chunk_append(b__62635,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up))].join(''));

var G__62976 = (i__62634 + (1));
i__62634 = G__62976;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62635),org$numenta$sanity$comportex$details$detail_text_$_iter__62632(cljs.core.chunk_rest(s__62633__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62635),null);
}
} else {
var seg_up = cljs.core.first(s__62633__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62632(cljs.core.rest(s__62633__$2)));
}
} else {
return null;
}
break;
}
});})(rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$punishments.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr)))));
})(),"","__TP excitation__",[cljs.core.str(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr))))].join(''),"",(cljs.core.truth_((function (){var and__4670__auto__ = col;
if(cljs.core.truth_(and__4670__auto__)){
return prior_htm;
} else {
return and__4670__auto__;
}
})())?(function (){var p_lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prior_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,rgn_id,lyr_id], null));
var p_prox_sg = cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(p_lyr);
var p_distal_sg = cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(p_lyr);
var d_pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.protocols.params(p_lyr)));
var ff_pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.protocols.params(p_lyr)));
var bits = cljs.core.cst$kw$in_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr));
var sig_bits = cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr));
var d_bits = cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prior_DASH_distal_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr));
var d_lbits = cljs.core.cst$kw$learnable_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prior_DASH_distal_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr));
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, ["__Column overlap__",[cljs.core.str(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(lyr)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0)], null)))].join(''),"","__Selected column__","__Connected ff-synapses__",(function (){var iter__5454__auto__ = ((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62638(s__62639){
return (new cljs.core.LazySeq(null,((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62639__$1 = s__62639;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62639__$1);
if(temp__4653__auto__){
var s__62639__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62639__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62639__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62641 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62640 = (0);
while(true){
if((i__62640 < size__5453__auto__)){
var vec__62674 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62640);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62674,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62674,(1),null);
if(cljs.core.seq(syns)){
cljs.core.chunk_append(b__62641,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("FF segment "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62640,s__62639__$1,vec__62674,si,syns,c__5452__auto__,size__5453__auto__,b__62641,s__62639__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62638_$_iter__62675(s__62676){
return (new cljs.core.LazySeq(null,((function (i__62640,s__62639__$1,vec__62674,si,syns,c__5452__auto__,size__5453__auto__,b__62641,s__62639__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62676__$1 = s__62676;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62676__$1);
if(temp__4653__auto____$1){
var s__62676__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62676__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62676__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62678 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62677 = (0);
while(true){
if((i__62677 < size__5453__auto____$1)){
var vec__62685 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62677);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62685,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62685,(1),null);
var vec__62686 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62686,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62686,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62678,[cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''));

var G__62977 = (i__62677 + (1));
i__62677 = G__62977;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62678),org$numenta$sanity$comportex$details$detail_text_$_iter__62638_$_iter__62675(cljs.core.chunk_rest(s__62676__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62678),null);
}
} else {
var vec__62687 = cljs.core.first(s__62676__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62687,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62687,(1),null);
var vec__62688 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62688,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62688,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62638_$_iter__62675(cljs.core.rest(s__62676__$2)));
}
} else {
return null;
}
break;
}
});})(i__62640,s__62639__$1,vec__62674,si,syns,c__5452__auto__,size__5453__auto__,b__62641,s__62639__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62640,s__62639__$1,vec__62674,si,syns,c__5452__auto__,size__5453__auto__,b__62641,s__62639__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__62978 = (i__62640 + (1));
i__62640 = G__62978;
continue;
} else {
var G__62979 = (i__62640 + (1));
i__62640 = G__62979;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62641),org$numenta$sanity$comportex$details$detail_text_$_iter__62638(cljs.core.chunk_rest(s__62639__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62641),null);
}
} else {
var vec__62689 = cljs.core.first(s__62639__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62689,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62689,(1),null);
if(cljs.core.seq(syns)){
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("FF segment "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (s__62639__$1,vec__62689,si,syns,s__62639__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62638_$_iter__62690(s__62691){
return (new cljs.core.LazySeq(null,((function (s__62639__$1,vec__62689,si,syns,s__62639__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62691__$1 = s__62691;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62691__$1);
if(temp__4653__auto____$1){
var s__62691__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62691__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62691__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62693 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62692 = (0);
while(true){
if((i__62692 < size__5453__auto__)){
var vec__62700 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62692);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62700,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62700,(1),null);
var vec__62701 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62701,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62701,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62693,[cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''));

var G__62980 = (i__62692 + (1));
i__62692 = G__62980;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62693),org$numenta$sanity$comportex$details$detail_text_$_iter__62638_$_iter__62690(cljs.core.chunk_rest(s__62691__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62693),null);
}
} else {
var vec__62702 = cljs.core.first(s__62691__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62702,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62702,(1),null);
var vec__62703 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62703,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62703,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62638_$_iter__62690(cljs.core.rest(s__62691__$2)));
}
} else {
return null;
}
break;
}
});})(s__62639__$1,vec__62689,si,syns,s__62639__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(s__62639__$1,vec__62689,si,syns,s__62639__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62638(cljs.core.rest(s__62639__$2)));
} else {
var G__62981 = cljs.core.rest(s__62639__$2);
s__62639__$1 = G__62981;
continue;
}
}
} else {
return null;
}
break;
}
});})(p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,org.nfrac.comportex.protocols.cell_segments(p_prox_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0)], null))));
})(),"__Cells and their distal dendrite segments__",(function (){var iter__5454__auto__ = ((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62704(s__62705){
return (new cljs.core.LazySeq(null,((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62705__$1 = s__62705;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62705__$1);
if(temp__4653__auto__){
var s__62705__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62705__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62705__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62707 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62706 = (0);
while(true){
if((i__62706 < size__5453__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62706);
var segs = org.nfrac.comportex.protocols.cell_segments(p_distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));
cljs.core.chunk_append(b__62707,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("CELL "),cljs.core.str(ci)].join(''),[cljs.core.str(cljs.core.count(segs)),cljs.core.str(" = "),cljs.core.str(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,segs))].join(''),(function (){var iter__5454__auto__ = ((function (i__62706,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62842(s__62843){
return (new cljs.core.LazySeq(null,((function (i__62706,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62843__$1 = s__62843;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62843__$1);
if(temp__4653__auto____$1){
var s__62843__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62843__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62843__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62845 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62844 = (0);
while(true){
if((i__62844 < size__5453__auto____$1)){
var vec__62878 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62844);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62878,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62878,(1),null);
cljs.core.chunk_append(b__62845,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62844,i__62706,vec__62878,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62845,s__62843__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62842_$_iter__62879(s__62880){
return (new cljs.core.LazySeq(null,((function (i__62844,i__62706,vec__62878,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62845,s__62843__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62880__$1 = s__62880;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62880__$1);
if(temp__4653__auto____$2){
var s__62880__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62880__$2)){
var c__5452__auto____$2 = cljs.core.chunk_first(s__62880__$2);
var size__5453__auto____$2 = cljs.core.count(c__5452__auto____$2);
var b__62882 = cljs.core.chunk_buffer(size__5453__auto____$2);
if((function (){var i__62881 = (0);
while(true){
if((i__62881 < size__5453__auto____$2)){
var vec__62889 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$2,i__62881);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62889,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62889,(1),null);
var vec__62890 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62890,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62890,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62890,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62882,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62982 = (i__62881 + (1));
i__62881 = G__62982;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62882),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62842_$_iter__62879(cljs.core.chunk_rest(s__62880__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62882),null);
}
} else {
var vec__62891 = cljs.core.first(s__62880__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62891,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62891,(1),null);
var vec__62892 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62892,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62892,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62892,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62842_$_iter__62879(cljs.core.rest(s__62880__$2)));
}
} else {
return null;
}
break;
}
});})(i__62844,i__62706,vec__62878,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62845,s__62843__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62844,i__62706,vec__62878,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62845,s__62843__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__62983 = (i__62844 + (1));
i__62844 = G__62983;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62845),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62842(cljs.core.chunk_rest(s__62843__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62845),null);
}
} else {
var vec__62893 = cljs.core.first(s__62843__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62893,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62893,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62706,vec__62893,si,syns,s__62843__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62842_$_iter__62894(s__62895){
return (new cljs.core.LazySeq(null,((function (i__62706,vec__62893,si,syns,s__62843__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62895__$1 = s__62895;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62895__$1);
if(temp__4653__auto____$2){
var s__62895__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62895__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62895__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62897 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62896 = (0);
while(true){
if((i__62896 < size__5453__auto____$1)){
var vec__62904 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62896);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62904,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62904,(1),null);
var vec__62905 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62905,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62905,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62905,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62897,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62984 = (i__62896 + (1));
i__62896 = G__62984;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62897),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62842_$_iter__62894(cljs.core.chunk_rest(s__62895__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62897),null);
}
} else {
var vec__62906 = cljs.core.first(s__62895__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62906,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62906,(1),null);
var vec__62907 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62907,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62907,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62907,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62842_$_iter__62894(cljs.core.rest(s__62895__$2)));
}
} else {
return null;
}
break;
}
});})(i__62706,vec__62893,si,syns,s__62843__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62706,vec__62893,si,syns,s__62843__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62842(cljs.core.rest(s__62843__$2)));
}
} else {
return null;
}
break;
}
});})(i__62706,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62706,segs,ci,c__5452__auto__,size__5453__auto__,b__62707,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,segs));
})()], null));

var G__62985 = (i__62706 + (1));
i__62706 = G__62985;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62707),org$numenta$sanity$comportex$details$detail_text_$_iter__62704(cljs.core.chunk_rest(s__62705__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62707),null);
}
} else {
var ci = cljs.core.first(s__62705__$2);
var segs = org.nfrac.comportex.protocols.cell_segments(p_distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("CELL "),cljs.core.str(ci)].join(''),[cljs.core.str(cljs.core.count(segs)),cljs.core.str(" = "),cljs.core.str(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,segs))].join(''),(function (){var iter__5454__auto__ = ((function (segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62908(s__62909){
return (new cljs.core.LazySeq(null,((function (segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62909__$1 = s__62909;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62909__$1);
if(temp__4653__auto____$1){
var s__62909__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62909__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62909__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62911 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62910 = (0);
while(true){
if((i__62910 < size__5453__auto__)){
var vec__62944 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62910);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62944,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62944,(1),null);
cljs.core.chunk_append(b__62911,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62910,vec__62944,si,syns,c__5452__auto__,size__5453__auto__,b__62911,s__62909__$2,temp__4653__auto____$1,segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62908_$_iter__62945(s__62946){
return (new cljs.core.LazySeq(null,((function (i__62910,vec__62944,si,syns,c__5452__auto__,size__5453__auto__,b__62911,s__62909__$2,temp__4653__auto____$1,segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62946__$1 = s__62946;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62946__$1);
if(temp__4653__auto____$2){
var s__62946__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62946__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62946__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62948 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62947 = (0);
while(true){
if((i__62947 < size__5453__auto____$1)){
var vec__62955 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62947);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62955,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62955,(1),null);
var vec__62956 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62956,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62956,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62956,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62948,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62986 = (i__62947 + (1));
i__62947 = G__62986;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62948),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62908_$_iter__62945(cljs.core.chunk_rest(s__62946__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62948),null);
}
} else {
var vec__62957 = cljs.core.first(s__62946__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62957,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62957,(1),null);
var vec__62958 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62958,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62958,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62958,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62908_$_iter__62945(cljs.core.rest(s__62946__$2)));
}
} else {
return null;
}
break;
}
});})(i__62910,vec__62944,si,syns,c__5452__auto__,size__5453__auto__,b__62911,s__62909__$2,temp__4653__auto____$1,segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62910,vec__62944,si,syns,c__5452__auto__,size__5453__auto__,b__62911,s__62909__$2,temp__4653__auto____$1,segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__62987 = (i__62910 + (1));
i__62910 = G__62987;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62911),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62908(cljs.core.chunk_rest(s__62909__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62911),null);
}
} else {
var vec__62959 = cljs.core.first(s__62909__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62959,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62959,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (vec__62959,si,syns,s__62909__$2,temp__4653__auto____$1,segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62908_$_iter__62960(s__62961){
return (new cljs.core.LazySeq(null,((function (vec__62959,si,syns,s__62909__$2,temp__4653__auto____$1,segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62961__$1 = s__62961;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62961__$1);
if(temp__4653__auto____$2){
var s__62961__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62961__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62961__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62963 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62962 = (0);
while(true){
if((i__62962 < size__5453__auto__)){
var vec__62970 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62962);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62970,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62970,(1),null);
var vec__62971 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62971,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62971,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62971,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62963,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62988 = (i__62962 + (1));
i__62962 = G__62988;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62963),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62908_$_iter__62960(cljs.core.chunk_rest(s__62961__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62963),null);
}
} else {
var vec__62972 = cljs.core.first(s__62961__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62972,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62972,(1),null);
var vec__62973 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62973,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62973,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62973,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62908_$_iter__62960(cljs.core.rest(s__62961__$2)));
}
} else {
return null;
}
break;
}
});})(vec__62959,si,syns,s__62909__$2,temp__4653__auto____$1,segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(vec__62959,si,syns,s__62909__$2,temp__4653__auto____$1,segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62704_$_iter__62908(cljs.core.rest(s__62909__$2)));
}
} else {
return null;
}
break;
}
});})(segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(segs,ci,s__62705__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,segs));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62704(cljs.core.rest(s__62705__$2)));
}
} else {
return null;
}
break;
}
});})(p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.protocols.layer_depth(lyr)));
})()], null);
})():null),"","__spec__",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.sort.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.protocols.params(rgn)))], true))));
});
