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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62618(s__62619){
return (new cljs.core.LazySeq(null,((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62619__$1 = s__62619;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62619__$1);
if(temp__4653__auto__){
var s__62619__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62619__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62619__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62621 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62620 = (0);
while(true){
if((i__62620 < size__5453__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62620);
cljs.core.chunk_append(b__62621,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''));

var G__62972 = (i__62620 + (1));
i__62620 = G__62972;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62621),org$numenta$sanity$comportex$details$detail_text_$_iter__62618(cljs.core.chunk_rest(s__62619__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62621),null);
}
} else {
var seg_up = cljs.core.first(s__62619__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62618(cljs.core.rest(s__62619__$2)));
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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62624(s__62625){
return (new cljs.core.LazySeq(null,((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62625__$1 = s__62625;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62625__$1);
if(temp__4653__auto__){
var s__62625__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62625__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62625__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62627 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62626 = (0);
while(true){
if((i__62626 < size__5453__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62626);
cljs.core.chunk_append(b__62627,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''));

var G__62973 = (i__62626 + (1));
i__62626 = G__62973;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62627),org$numenta$sanity$comportex$details$detail_text_$_iter__62624(cljs.core.chunk_rest(s__62625__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62627),null);
}
} else {
var seg_up = cljs.core.first(s__62625__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62624(cljs.core.rest(s__62625__$2)));
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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62630(s__62631){
return (new cljs.core.LazySeq(null,((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62631__$1 = s__62631;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62631__$1);
if(temp__4653__auto__){
var s__62631__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62631__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62631__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62633 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62632 = (0);
while(true){
if((i__62632 < size__5453__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62632);
cljs.core.chunk_append(b__62633,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up))].join(''));

var G__62974 = (i__62632 + (1));
i__62632 = G__62974;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62633),org$numenta$sanity$comportex$details$detail_text_$_iter__62630(cljs.core.chunk_rest(s__62631__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62633),null);
}
} else {
var seg_up = cljs.core.first(s__62631__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62630(cljs.core.rest(s__62631__$2)));
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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62636(s__62637){
return (new cljs.core.LazySeq(null,((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62637__$1 = s__62637;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62637__$1);
if(temp__4653__auto__){
var s__62637__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62637__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62637__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62639 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62638 = (0);
while(true){
if((i__62638 < size__5453__auto__)){
var vec__62672 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62638);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62672,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62672,(1),null);
if(cljs.core.seq(syns)){
cljs.core.chunk_append(b__62639,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("FF segment "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62638,s__62637__$1,vec__62672,si,syns,c__5452__auto__,size__5453__auto__,b__62639,s__62637__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62636_$_iter__62673(s__62674){
return (new cljs.core.LazySeq(null,((function (i__62638,s__62637__$1,vec__62672,si,syns,c__5452__auto__,size__5453__auto__,b__62639,s__62637__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62674__$1 = s__62674;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62674__$1);
if(temp__4653__auto____$1){
var s__62674__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62674__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62674__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62676 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62675 = (0);
while(true){
if((i__62675 < size__5453__auto____$1)){
var vec__62683 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62675);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62683,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62683,(1),null);
var vec__62684 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62684,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62684,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62676,[cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''));

var G__62975 = (i__62675 + (1));
i__62675 = G__62975;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62676),org$numenta$sanity$comportex$details$detail_text_$_iter__62636_$_iter__62673(cljs.core.chunk_rest(s__62674__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62676),null);
}
} else {
var vec__62685 = cljs.core.first(s__62674__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62685,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62685,(1),null);
var vec__62686 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62686,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62686,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62636_$_iter__62673(cljs.core.rest(s__62674__$2)));
}
} else {
return null;
}
break;
}
});})(i__62638,s__62637__$1,vec__62672,si,syns,c__5452__auto__,size__5453__auto__,b__62639,s__62637__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62638,s__62637__$1,vec__62672,si,syns,c__5452__auto__,size__5453__auto__,b__62639,s__62637__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__62976 = (i__62638 + (1));
i__62638 = G__62976;
continue;
} else {
var G__62977 = (i__62638 + (1));
i__62638 = G__62977;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62639),org$numenta$sanity$comportex$details$detail_text_$_iter__62636(cljs.core.chunk_rest(s__62637__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62639),null);
}
} else {
var vec__62687 = cljs.core.first(s__62637__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62687,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62687,(1),null);
if(cljs.core.seq(syns)){
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("FF segment "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (s__62637__$1,vec__62687,si,syns,s__62637__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62636_$_iter__62688(s__62689){
return (new cljs.core.LazySeq(null,((function (s__62637__$1,vec__62687,si,syns,s__62637__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62689__$1 = s__62689;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62689__$1);
if(temp__4653__auto____$1){
var s__62689__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62689__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62689__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62691 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62690 = (0);
while(true){
if((i__62690 < size__5453__auto__)){
var vec__62698 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62690);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62698,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62698,(1),null);
var vec__62699 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62699,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62699,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62691,[cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''));

var G__62978 = (i__62690 + (1));
i__62690 = G__62978;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62691),org$numenta$sanity$comportex$details$detail_text_$_iter__62636_$_iter__62688(cljs.core.chunk_rest(s__62689__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62691),null);
}
} else {
var vec__62700 = cljs.core.first(s__62689__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62700,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62700,(1),null);
var vec__62701 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62701,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62701,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62636_$_iter__62688(cljs.core.rest(s__62689__$2)));
}
} else {
return null;
}
break;
}
});})(s__62637__$1,vec__62687,si,syns,s__62637__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(s__62637__$1,vec__62687,si,syns,s__62637__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62636(cljs.core.rest(s__62637__$2)));
} else {
var G__62979 = cljs.core.rest(s__62637__$2);
s__62637__$1 = G__62979;
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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62702(s__62703){
return (new cljs.core.LazySeq(null,((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62703__$1 = s__62703;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62703__$1);
if(temp__4653__auto__){
var s__62703__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62703__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62703__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62705 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62704 = (0);
while(true){
if((i__62704 < size__5453__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62704);
var segs = org.nfrac.comportex.protocols.cell_segments(p_distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));
cljs.core.chunk_append(b__62705,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("CELL "),cljs.core.str(ci)].join(''),[cljs.core.str(cljs.core.count(segs)),cljs.core.str(" = "),cljs.core.str(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,segs))].join(''),(function (){var iter__5454__auto__ = ((function (i__62704,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62840(s__62841){
return (new cljs.core.LazySeq(null,((function (i__62704,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62841__$1 = s__62841;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62841__$1);
if(temp__4653__auto____$1){
var s__62841__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62841__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62841__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62843 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62842 = (0);
while(true){
if((i__62842 < size__5453__auto____$1)){
var vec__62876 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62842);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62876,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62876,(1),null);
cljs.core.chunk_append(b__62843,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62842,i__62704,vec__62876,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62843,s__62841__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62840_$_iter__62877(s__62878){
return (new cljs.core.LazySeq(null,((function (i__62842,i__62704,vec__62876,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62843,s__62841__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62878__$1 = s__62878;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62878__$1);
if(temp__4653__auto____$2){
var s__62878__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62878__$2)){
var c__5452__auto____$2 = cljs.core.chunk_first(s__62878__$2);
var size__5453__auto____$2 = cljs.core.count(c__5452__auto____$2);
var b__62880 = cljs.core.chunk_buffer(size__5453__auto____$2);
if((function (){var i__62879 = (0);
while(true){
if((i__62879 < size__5453__auto____$2)){
var vec__62887 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$2,i__62879);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62887,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62887,(1),null);
var vec__62888 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62888,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62888,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62888,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62880,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62980 = (i__62879 + (1));
i__62879 = G__62980;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62880),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62840_$_iter__62877(cljs.core.chunk_rest(s__62878__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62880),null);
}
} else {
var vec__62889 = cljs.core.first(s__62878__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62889,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62889,(1),null);
var vec__62890 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62890,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62890,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62890,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62840_$_iter__62877(cljs.core.rest(s__62878__$2)));
}
} else {
return null;
}
break;
}
});})(i__62842,i__62704,vec__62876,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62843,s__62841__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62842,i__62704,vec__62876,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62843,s__62841__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__62981 = (i__62842 + (1));
i__62842 = G__62981;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62843),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62840(cljs.core.chunk_rest(s__62841__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62843),null);
}
} else {
var vec__62891 = cljs.core.first(s__62841__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62891,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62891,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62704,vec__62891,si,syns,s__62841__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62840_$_iter__62892(s__62893){
return (new cljs.core.LazySeq(null,((function (i__62704,vec__62891,si,syns,s__62841__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62893__$1 = s__62893;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62893__$1);
if(temp__4653__auto____$2){
var s__62893__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62893__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62893__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62895 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62894 = (0);
while(true){
if((i__62894 < size__5453__auto____$1)){
var vec__62902 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62894);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62902,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62902,(1),null);
var vec__62903 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62903,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62903,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62903,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62895,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62982 = (i__62894 + (1));
i__62894 = G__62982;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62895),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62840_$_iter__62892(cljs.core.chunk_rest(s__62893__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62895),null);
}
} else {
var vec__62904 = cljs.core.first(s__62893__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62904,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62904,(1),null);
var vec__62905 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62905,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62905,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62905,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62840_$_iter__62892(cljs.core.rest(s__62893__$2)));
}
} else {
return null;
}
break;
}
});})(i__62704,vec__62891,si,syns,s__62841__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62704,vec__62891,si,syns,s__62841__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62840(cljs.core.rest(s__62841__$2)));
}
} else {
return null;
}
break;
}
});})(i__62704,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62704,segs,ci,c__5452__auto__,size__5453__auto__,b__62705,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,segs));
})()], null));

var G__62983 = (i__62704 + (1));
i__62704 = G__62983;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62705),org$numenta$sanity$comportex$details$detail_text_$_iter__62702(cljs.core.chunk_rest(s__62703__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62705),null);
}
} else {
var ci = cljs.core.first(s__62703__$2);
var segs = org.nfrac.comportex.protocols.cell_segments(p_distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("CELL "),cljs.core.str(ci)].join(''),[cljs.core.str(cljs.core.count(segs)),cljs.core.str(" = "),cljs.core.str(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,segs))].join(''),(function (){var iter__5454__auto__ = ((function (segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62906(s__62907){
return (new cljs.core.LazySeq(null,((function (segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62907__$1 = s__62907;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62907__$1);
if(temp__4653__auto____$1){
var s__62907__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62907__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62907__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62909 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62908 = (0);
while(true){
if((i__62908 < size__5453__auto__)){
var vec__62942 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62908);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62942,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62942,(1),null);
cljs.core.chunk_append(b__62909,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62908,vec__62942,si,syns,c__5452__auto__,size__5453__auto__,b__62909,s__62907__$2,temp__4653__auto____$1,segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62906_$_iter__62943(s__62944){
return (new cljs.core.LazySeq(null,((function (i__62908,vec__62942,si,syns,c__5452__auto__,size__5453__auto__,b__62909,s__62907__$2,temp__4653__auto____$1,segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62944__$1 = s__62944;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62944__$1);
if(temp__4653__auto____$2){
var s__62944__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62944__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62944__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62946 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62945 = (0);
while(true){
if((i__62945 < size__5453__auto____$1)){
var vec__62953 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62945);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62953,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62953,(1),null);
var vec__62954 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62954,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62954,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62954,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62946,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62984 = (i__62945 + (1));
i__62945 = G__62984;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62946),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62906_$_iter__62943(cljs.core.chunk_rest(s__62944__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62946),null);
}
} else {
var vec__62955 = cljs.core.first(s__62944__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62955,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62955,(1),null);
var vec__62956 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62956,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62956,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62956,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62906_$_iter__62943(cljs.core.rest(s__62944__$2)));
}
} else {
return null;
}
break;
}
});})(i__62908,vec__62942,si,syns,c__5452__auto__,size__5453__auto__,b__62909,s__62907__$2,temp__4653__auto____$1,segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62908,vec__62942,si,syns,c__5452__auto__,size__5453__auto__,b__62909,s__62907__$2,temp__4653__auto____$1,segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__62985 = (i__62908 + (1));
i__62908 = G__62985;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62909),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62906(cljs.core.chunk_rest(s__62907__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62909),null);
}
} else {
var vec__62957 = cljs.core.first(s__62907__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62957,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62957,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (vec__62957,si,syns,s__62907__$2,temp__4653__auto____$1,segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62906_$_iter__62958(s__62959){
return (new cljs.core.LazySeq(null,((function (vec__62957,si,syns,s__62907__$2,temp__4653__auto____$1,segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62959__$1 = s__62959;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62959__$1);
if(temp__4653__auto____$2){
var s__62959__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62959__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62959__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62961 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62960 = (0);
while(true){
if((i__62960 < size__5453__auto__)){
var vec__62968 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62960);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62968,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62968,(1),null);
var vec__62969 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62969,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62969,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62969,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62961,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62986 = (i__62960 + (1));
i__62960 = G__62986;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62961),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62906_$_iter__62958(cljs.core.chunk_rest(s__62959__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62961),null);
}
} else {
var vec__62970 = cljs.core.first(s__62959__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62970,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62970,(1),null);
var vec__62971 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62971,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62971,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62971,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62906_$_iter__62958(cljs.core.rest(s__62959__$2)));
}
} else {
return null;
}
break;
}
});})(vec__62957,si,syns,s__62907__$2,temp__4653__auto____$1,segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(vec__62957,si,syns,s__62907__$2,temp__4653__auto____$1,segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62702_$_iter__62906(cljs.core.rest(s__62907__$2)));
}
} else {
return null;
}
break;
}
});})(segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(segs,ci,s__62703__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,segs));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62702(cljs.core.rest(s__62703__$2)));
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
