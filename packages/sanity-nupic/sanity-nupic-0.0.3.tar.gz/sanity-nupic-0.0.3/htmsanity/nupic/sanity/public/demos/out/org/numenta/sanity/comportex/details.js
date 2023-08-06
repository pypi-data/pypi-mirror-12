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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62613(s__62614){
return (new cljs.core.LazySeq(null,((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62614__$1 = s__62614;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62614__$1);
if(temp__4653__auto__){
var s__62614__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62614__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62614__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62616 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62615 = (0);
while(true){
if((i__62615 < size__5453__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62615);
cljs.core.chunk_append(b__62616,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''));

var G__62967 = (i__62615 + (1));
i__62615 = G__62967;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62616),org$numenta$sanity$comportex$details$detail_text_$_iter__62613(cljs.core.chunk_rest(s__62614__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62616),null);
}
} else {
var seg_up = cljs.core.first(s__62614__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62613(cljs.core.rest(s__62614__$2)));
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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62619(s__62620){
return (new cljs.core.LazySeq(null,((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62620__$1 = s__62620;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62620__$1);
if(temp__4653__auto__){
var s__62620__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62620__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62620__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62622 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62621 = (0);
while(true){
if((i__62621 < size__5453__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62621);
cljs.core.chunk_append(b__62622,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''));

var G__62968 = (i__62621 + (1));
i__62621 = G__62968;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62622),org$numenta$sanity$comportex$details$detail_text_$_iter__62619(cljs.core.chunk_rest(s__62620__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62622),null);
}
} else {
var seg_up = cljs.core.first(s__62620__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62619(cljs.core.rest(s__62620__$2)));
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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62625(s__62626){
return (new cljs.core.LazySeq(null,((function (rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62626__$1 = s__62626;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62626__$1);
if(temp__4653__auto__){
var s__62626__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62626__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62626__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62628 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62627 = (0);
while(true){
if((i__62627 < size__5453__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62627);
cljs.core.chunk_append(b__62628,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up))].join(''));

var G__62969 = (i__62627 + (1));
i__62627 = G__62969;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62628),org$numenta$sanity$comportex$details$detail_text_$_iter__62625(cljs.core.chunk_rest(s__62626__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62628),null);
}
} else {
var seg_up = cljs.core.first(s__62626__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62625(cljs.core.rest(s__62626__$2)));
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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62631(s__62632){
return (new cljs.core.LazySeq(null,((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62632__$1 = s__62632;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62632__$1);
if(temp__4653__auto__){
var s__62632__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62632__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62632__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62634 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62633 = (0);
while(true){
if((i__62633 < size__5453__auto__)){
var vec__62667 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62633);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62667,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62667,(1),null);
if(cljs.core.seq(syns)){
cljs.core.chunk_append(b__62634,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("FF segment "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62633,s__62632__$1,vec__62667,si,syns,c__5452__auto__,size__5453__auto__,b__62634,s__62632__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62631_$_iter__62668(s__62669){
return (new cljs.core.LazySeq(null,((function (i__62633,s__62632__$1,vec__62667,si,syns,c__5452__auto__,size__5453__auto__,b__62634,s__62632__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62669__$1 = s__62669;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62669__$1);
if(temp__4653__auto____$1){
var s__62669__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62669__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62669__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62671 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62670 = (0);
while(true){
if((i__62670 < size__5453__auto____$1)){
var vec__62678 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62670);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62678,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62678,(1),null);
var vec__62679 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62679,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62679,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62671,[cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''));

var G__62970 = (i__62670 + (1));
i__62670 = G__62970;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62671),org$numenta$sanity$comportex$details$detail_text_$_iter__62631_$_iter__62668(cljs.core.chunk_rest(s__62669__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62671),null);
}
} else {
var vec__62680 = cljs.core.first(s__62669__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62680,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62680,(1),null);
var vec__62681 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62681,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62681,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62631_$_iter__62668(cljs.core.rest(s__62669__$2)));
}
} else {
return null;
}
break;
}
});})(i__62633,s__62632__$1,vec__62667,si,syns,c__5452__auto__,size__5453__auto__,b__62634,s__62632__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62633,s__62632__$1,vec__62667,si,syns,c__5452__auto__,size__5453__auto__,b__62634,s__62632__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__62971 = (i__62633 + (1));
i__62633 = G__62971;
continue;
} else {
var G__62972 = (i__62633 + (1));
i__62633 = G__62972;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62634),org$numenta$sanity$comportex$details$detail_text_$_iter__62631(cljs.core.chunk_rest(s__62632__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62634),null);
}
} else {
var vec__62682 = cljs.core.first(s__62632__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62682,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62682,(1),null);
if(cljs.core.seq(syns)){
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("FF segment "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (s__62632__$1,vec__62682,si,syns,s__62632__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62631_$_iter__62683(s__62684){
return (new cljs.core.LazySeq(null,((function (s__62632__$1,vec__62682,si,syns,s__62632__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62684__$1 = s__62684;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62684__$1);
if(temp__4653__auto____$1){
var s__62684__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62684__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62684__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62686 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62685 = (0);
while(true){
if((i__62685 < size__5453__auto__)){
var vec__62693 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62685);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62693,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62693,(1),null);
var vec__62694 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62694,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62694,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62686,[cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''));

var G__62973 = (i__62685 + (1));
i__62685 = G__62973;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62686),org$numenta$sanity$comportex$details$detail_text_$_iter__62631_$_iter__62683(cljs.core.chunk_rest(s__62684__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62686),null);
}
} else {
var vec__62695 = cljs.core.first(s__62684__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62695,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62695,(1),null);
var vec__62696 = org.nfrac.comportex.core.source_of_incoming_bit.cljs$core$IFn$_invoke$arity$4(htm,rgn_id,id,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62696,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62696,(1),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(sig_bits,id))?" S":((cljs.core.contains_QMARK_(bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62631_$_iter__62683(cljs.core.rest(s__62684__$2)));
}
} else {
return null;
}
break;
}
});})(s__62632__$1,vec__62682,si,syns,s__62632__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(s__62632__$1,vec__62682,si,syns,s__62632__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62631(cljs.core.rest(s__62632__$2)));
} else {
var G__62974 = cljs.core.rest(s__62632__$2);
s__62632__$1 = G__62974;
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
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62697(s__62698){
return (new cljs.core.LazySeq(null,((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62698__$1 = s__62698;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__62698__$1);
if(temp__4653__auto__){
var s__62698__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__62698__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62698__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62700 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62699 = (0);
while(true){
if((i__62699 < size__5453__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62699);
var segs = org.nfrac.comportex.protocols.cell_segments(p_distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));
cljs.core.chunk_append(b__62700,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("CELL "),cljs.core.str(ci)].join(''),[cljs.core.str(cljs.core.count(segs)),cljs.core.str(" = "),cljs.core.str(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,segs))].join(''),(function (){var iter__5454__auto__ = ((function (i__62699,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62835(s__62836){
return (new cljs.core.LazySeq(null,((function (i__62699,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62836__$1 = s__62836;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62836__$1);
if(temp__4653__auto____$1){
var s__62836__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62836__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62836__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62838 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62837 = (0);
while(true){
if((i__62837 < size__5453__auto____$1)){
var vec__62871 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62837);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62871,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62871,(1),null);
cljs.core.chunk_append(b__62838,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62837,i__62699,vec__62871,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62838,s__62836__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62835_$_iter__62872(s__62873){
return (new cljs.core.LazySeq(null,((function (i__62837,i__62699,vec__62871,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62838,s__62836__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62873__$1 = s__62873;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62873__$1);
if(temp__4653__auto____$2){
var s__62873__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62873__$2)){
var c__5452__auto____$2 = cljs.core.chunk_first(s__62873__$2);
var size__5453__auto____$2 = cljs.core.count(c__5452__auto____$2);
var b__62875 = cljs.core.chunk_buffer(size__5453__auto____$2);
if((function (){var i__62874 = (0);
while(true){
if((i__62874 < size__5453__auto____$2)){
var vec__62882 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$2,i__62874);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62882,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62882,(1),null);
var vec__62883 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62883,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62883,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62883,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62875,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62975 = (i__62874 + (1));
i__62874 = G__62975;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62875),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62835_$_iter__62872(cljs.core.chunk_rest(s__62873__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62875),null);
}
} else {
var vec__62884 = cljs.core.first(s__62873__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62884,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62884,(1),null);
var vec__62885 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62885,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62885,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62885,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62835_$_iter__62872(cljs.core.rest(s__62873__$2)));
}
} else {
return null;
}
break;
}
});})(i__62837,i__62699,vec__62871,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62838,s__62836__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62837,i__62699,vec__62871,si,syns,c__5452__auto____$1,size__5453__auto____$1,b__62838,s__62836__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__62976 = (i__62837 + (1));
i__62837 = G__62976;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62838),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62835(cljs.core.chunk_rest(s__62836__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62838),null);
}
} else {
var vec__62886 = cljs.core.first(s__62836__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62886,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62886,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62699,vec__62886,si,syns,s__62836__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62835_$_iter__62887(s__62888){
return (new cljs.core.LazySeq(null,((function (i__62699,vec__62886,si,syns,s__62836__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62888__$1 = s__62888;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62888__$1);
if(temp__4653__auto____$2){
var s__62888__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62888__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62888__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62890 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62889 = (0);
while(true){
if((i__62889 < size__5453__auto____$1)){
var vec__62897 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62889);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62897,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62897,(1),null);
var vec__62898 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62898,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62898,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62898,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62890,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62977 = (i__62889 + (1));
i__62889 = G__62977;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62890),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62835_$_iter__62887(cljs.core.chunk_rest(s__62888__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62890),null);
}
} else {
var vec__62899 = cljs.core.first(s__62888__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62899,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62899,(1),null);
var vec__62900 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62900,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62900,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62900,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62835_$_iter__62887(cljs.core.rest(s__62888__$2)));
}
} else {
return null;
}
break;
}
});})(i__62699,vec__62886,si,syns,s__62836__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62699,vec__62886,si,syns,s__62836__$2,temp__4653__auto____$1,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62835(cljs.core.rest(s__62836__$2)));
}
} else {
return null;
}
break;
}
});})(i__62699,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62699,segs,ci,c__5452__auto__,size__5453__auto__,b__62700,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,segs));
})()], null));

var G__62978 = (i__62699 + (1));
i__62699 = G__62978;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62700),org$numenta$sanity$comportex$details$detail_text_$_iter__62697(cljs.core.chunk_rest(s__62698__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62700),null);
}
} else {
var ci = cljs.core.first(s__62698__$2);
var segs = org.nfrac.comportex.protocols.cell_segments(p_distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("CELL "),cljs.core.str(ci)].join(''),[cljs.core.str(cljs.core.count(segs)),cljs.core.str(" = "),cljs.core.str(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,segs))].join(''),(function (){var iter__5454__auto__ = ((function (segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62901(s__62902){
return (new cljs.core.LazySeq(null,((function (segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62902__$1 = s__62902;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__62902__$1);
if(temp__4653__auto____$1){
var s__62902__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__62902__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62902__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62904 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62903 = (0);
while(true){
if((i__62903 < size__5453__auto__)){
var vec__62937 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62903);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62937,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62937,(1),null);
cljs.core.chunk_append(b__62904,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (i__62903,vec__62937,si,syns,c__5452__auto__,size__5453__auto__,b__62904,s__62902__$2,temp__4653__auto____$1,segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62901_$_iter__62938(s__62939){
return (new cljs.core.LazySeq(null,((function (i__62903,vec__62937,si,syns,c__5452__auto__,size__5453__auto__,b__62904,s__62902__$2,temp__4653__auto____$1,segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62939__$1 = s__62939;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62939__$1);
if(temp__4653__auto____$2){
var s__62939__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62939__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__62939__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__62941 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__62940 = (0);
while(true){
if((i__62940 < size__5453__auto____$1)){
var vec__62948 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__62940);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62948,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62948,(1),null);
var vec__62949 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62949,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62949,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62949,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62941,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62979 = (i__62940 + (1));
i__62940 = G__62979;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62941),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62901_$_iter__62938(cljs.core.chunk_rest(s__62939__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62941),null);
}
} else {
var vec__62950 = cljs.core.first(s__62939__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62950,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62950,(1),null);
var vec__62951 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62951,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62951,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62951,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62901_$_iter__62938(cljs.core.rest(s__62939__$2)));
}
} else {
return null;
}
break;
}
});})(i__62903,vec__62937,si,syns,c__5452__auto__,size__5453__auto__,b__62904,s__62902__$2,temp__4653__auto____$1,segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(i__62903,vec__62937,si,syns,c__5452__auto__,size__5453__auto__,b__62904,s__62902__$2,temp__4653__auto____$1,segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__62980 = (i__62903 + (1));
i__62903 = G__62980;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62904),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62901(cljs.core.chunk_rest(s__62902__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62904),null);
}
} else {
var vec__62952 = cljs.core.first(s__62902__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62952,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62952,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__5454__auto__ = ((function (vec__62952,si,syns,s__62902__$2,temp__4653__auto____$1,segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62901_$_iter__62953(s__62954){
return (new cljs.core.LazySeq(null,((function (vec__62952,si,syns,s__62902__$2,temp__4653__auto____$1,segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits){
return (function (){
var s__62954__$1 = s__62954;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__62954__$1);
if(temp__4653__auto____$2){
var s__62954__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__62954__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__62954__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__62956 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__62955 = (0);
while(true){
if((i__62955 < size__5453__auto__)){
var vec__62963 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__62955);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62963,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62963,(1),null);
var vec__62964 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62964,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62964,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62964,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
cljs.core.chunk_append(b__62956,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''));

var G__62981 = (i__62955 + (1));
i__62955 = G__62981;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__62956),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62901_$_iter__62953(cljs.core.chunk_rest(s__62954__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__62956),null);
}
} else {
var vec__62965 = cljs.core.first(s__62954__$2);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62965,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62965,(1),null);
var vec__62966 = org.nfrac.comportex.core.source_of_distal_bit(htm,rgn_id,lyr_id,id);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62966,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62966,(1),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62966,(2),null);
var src_rgn = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,src_k], null));
var src_id = (cljs.core.truth_(src_rgn)?org.nfrac.comportex.protocols.source_of_bit(src_rgn,src_i):src_i);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_id),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,id))?" L":((cljs.core.contains_QMARK_(d_bits,id))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62901_$_iter__62953(cljs.core.rest(s__62954__$2)));
}
} else {
return null;
}
break;
}
});})(vec__62952,si,syns,s__62902__$2,temp__4653__auto____$1,segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(vec__62952,si,syns,s__62902__$2,temp__4653__auto____$1,segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62697_$_iter__62901(cljs.core.rest(s__62902__$2)));
}
} else {
return null;
}
break;
}
});})(segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
,null,null));
});})(segs,ci,s__62698__$2,temp__4653__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,bits,sig_bits,d_bits,d_lbits,rgn,lyr,depth,in$,in_bits,in_sbits))
;
return iter__5454__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,segs));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__62697(cljs.core.rest(s__62698__$2)));
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
