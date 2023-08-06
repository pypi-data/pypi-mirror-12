// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.demos.q_learning_2d');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.cells');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.demos.q_learning_1d');
goog.require('cljs.core.async');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
org.nfrac.comportex.demos.q_learning_2d.input_dim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(10),(40)], null);
org.nfrac.comportex.demos.q_learning_2d.grid_w = (7);
org.nfrac.comportex.demos.q_learning_2d.grid_h = (7);
org.nfrac.comportex.demos.q_learning_2d.n_on_bits = (40);
org.nfrac.comportex.demos.q_learning_2d.coord_radius = (5);
org.nfrac.comportex.demos.q_learning_2d.surface_coord_scale = (5);
org.nfrac.comportex.demos.q_learning_2d.empty_reward = (-3);
org.nfrac.comportex.demos.q_learning_2d.hazard_reward = (-200);
org.nfrac.comportex.demos.q_learning_2d.finish_reward = (200);
org.nfrac.comportex.demos.q_learning_2d.surface = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,(function (){var iter__5454__auto__ = (function org$nfrac$comportex$demos$q_learning_2d$iter__66172(s__66173){
return (new cljs.core.LazySeq(null,(function (){
var s__66173__$1 = s__66173;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__66173__$1);
if(temp__4653__auto__){
var s__66173__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__66173__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66173__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66175 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66174 = (0);
while(true){
if((i__66174 < size__5453__auto__)){
var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66174);
cljs.core.chunk_append(b__66175,(function (){var iter__5454__auto__ = ((function (i__66174,x,c__5452__auto__,size__5453__auto__,b__66175,s__66173__$2,temp__4653__auto__){
return (function org$nfrac$comportex$demos$q_learning_2d$iter__66172_$_iter__66198(s__66199){
return (new cljs.core.LazySeq(null,((function (i__66174,x,c__5452__auto__,size__5453__auto__,b__66175,s__66173__$2,temp__4653__auto__){
return (function (){
var s__66199__$1 = s__66199;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__66199__$1);
if(temp__4653__auto____$1){
var s__66199__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__66199__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__66199__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__66201 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__66200 = (0);
while(true){
if((i__66200 < size__5453__auto____$1)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__66200);
cljs.core.chunk_append(b__66201,(function (){var G__66206 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1))], null),G__66206)){
return org.nfrac.comportex.demos.q_learning_2d.finish_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)) - (2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__66206)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__66206)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2)) - (1))], null),G__66206)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(0)], null),G__66206)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
return org.nfrac.comportex.demos.q_learning_2d.empty_reward;

}
}
}
}
}
})());

var G__66218 = (i__66200 + (1));
i__66200 = G__66218;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66201),org$nfrac$comportex$demos$q_learning_2d$iter__66172_$_iter__66198(cljs.core.chunk_rest(s__66199__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66201),null);
}
} else {
var y = cljs.core.first(s__66199__$2);
return cljs.core.cons((function (){var G__66207 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1))], null),G__66207)){
return org.nfrac.comportex.demos.q_learning_2d.finish_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)) - (2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__66207)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__66207)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2)) - (1))], null),G__66207)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(0)], null),G__66207)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
return org.nfrac.comportex.demos.q_learning_2d.empty_reward;

}
}
}
}
}
})(),org$nfrac$comportex$demos$q_learning_2d$iter__66172_$_iter__66198(cljs.core.rest(s__66199__$2)));
}
} else {
return null;
}
break;
}
});})(i__66174,x,c__5452__auto__,size__5453__auto__,b__66175,s__66173__$2,temp__4653__auto__))
,null,null));
});})(i__66174,x,c__5452__auto__,size__5453__auto__,b__66175,s__66173__$2,temp__4653__auto__))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.q_learning_2d.grid_h));
})());

var G__66219 = (i__66174 + (1));
i__66174 = G__66219;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66175),org$nfrac$comportex$demos$q_learning_2d$iter__66172(cljs.core.chunk_rest(s__66173__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66175),null);
}
} else {
var x = cljs.core.first(s__66173__$2);
return cljs.core.cons((function (){var iter__5454__auto__ = ((function (x,s__66173__$2,temp__4653__auto__){
return (function org$nfrac$comportex$demos$q_learning_2d$iter__66172_$_iter__66208(s__66209){
return (new cljs.core.LazySeq(null,((function (x,s__66173__$2,temp__4653__auto__){
return (function (){
var s__66209__$1 = s__66209;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__66209__$1);
if(temp__4653__auto____$1){
var s__66209__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__66209__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66209__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66211 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66210 = (0);
while(true){
if((i__66210 < size__5453__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66210);
cljs.core.chunk_append(b__66211,(function (){var G__66216 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1))], null),G__66216)){
return org.nfrac.comportex.demos.q_learning_2d.finish_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)) - (2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__66216)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__66216)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2)) - (1))], null),G__66216)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(0)], null),G__66216)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
return org.nfrac.comportex.demos.q_learning_2d.empty_reward;

}
}
}
}
}
})());

var G__66220 = (i__66210 + (1));
i__66210 = G__66220;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66211),org$nfrac$comportex$demos$q_learning_2d$iter__66172_$_iter__66208(cljs.core.chunk_rest(s__66209__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66211),null);
}
} else {
var y = cljs.core.first(s__66209__$2);
return cljs.core.cons((function (){var G__66217 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1))], null),G__66217)){
return org.nfrac.comportex.demos.q_learning_2d.finish_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)) - (2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__66217)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__66217)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2)) - (1))], null),G__66217)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(0)], null),G__66217)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
return org.nfrac.comportex.demos.q_learning_2d.empty_reward;

}
}
}
}
}
})(),org$nfrac$comportex$demos$q_learning_2d$iter__66172_$_iter__66208(cljs.core.rest(s__66209__$2)));
}
} else {
return null;
}
break;
}
});})(x,s__66173__$2,temp__4653__auto__))
,null,null));
});})(x,s__66173__$2,temp__4653__auto__))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.q_learning_2d.grid_h));
})(),org$nfrac$comportex$demos$q_learning_2d$iter__66172(cljs.core.rest(s__66173__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.q_learning_2d.grid_w));
})());
org.nfrac.comportex.demos.q_learning_2d.initial_inval = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$z,(0),cljs.core.cst$kw$action,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(0),cljs.core.cst$kw$dy,(0)], null)], null);
org.nfrac.comportex.demos.q_learning_2d.spec = new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(30),(30)], null),cljs.core.cst$kw$depth,(4),cljs.core.cst$kw$distal_DASH_punish_QMARK_,true,cljs.core.cst$kw$duty_DASH_cycle_DASH_period,(300),cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio,0.01,cljs.core.cst$kw$ff_DASH_potential_DASH_radius,0.15,cljs.core.cst$kw$ff_DASH_init_DASH_frac,0.5], null);
org.nfrac.comportex.demos.q_learning_2d.action_spec = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$global_DASH_inhibition_QMARK_,cljs.core.cst$kw$ff_DASH_perm_DASH_init_DASH_hi,cljs.core.cst$kw$q_DASH_alpha,cljs.core.cst$kw$freeze_QMARK_,cljs.core.cst$kw$ff_DASH_perm_DASH_init_DASH_lo,cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio,cljs.core.cst$kw$temporal_DASH_pooling_DASH_max_DASH_exc,cljs.core.cst$kw$column_DASH_dimensions,cljs.core.cst$kw$ff_DASH_init_DASH_frac,cljs.core.cst$kw$q_DASH_discount,cljs.core.cst$kw$boost_DASH_active_DASH_every,cljs.core.cst$kw$max_DASH_boost,cljs.core.cst$kw$ff_DASH_potential_DASH_radius,cljs.core.cst$kw$activation_DASH_level,cljs.core.cst$kw$proximal,cljs.core.cst$kw$depth,cljs.core.cst$kw$duty_DASH_cycle_DASH_period],[true,0.45,0.75,true,0.35,0.05,0.0,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(4),(10)], null),0.5,0.9,(1),3.0,(1),0.2,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$perm_DASH_inc,0.05,cljs.core.cst$kw$perm_DASH_dec,0.05,cljs.core.cst$kw$perm_DASH_connected,0.1], null),(1),(250)]);
org.nfrac.comportex.demos.q_learning_2d.direction__GT_action = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$up,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(0),cljs.core.cst$kw$dy,(-1)], null),cljs.core.cst$kw$down,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(0),cljs.core.cst$kw$dy,(1)], null),cljs.core.cst$kw$left,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(-1),cljs.core.cst$kw$dy,(0)], null),cljs.core.cst$kw$right,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(1),cljs.core.cst$kw$dy,(0)], null)], null);
org.nfrac.comportex.demos.q_learning_2d.possible_directions = (function org$nfrac$comportex$demos$q_learning_2d$possible_directions(p__66221){
var vec__66224 = p__66221;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66224,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66224,(1),null);
var G__66225 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$down,null,cljs.core.cst$kw$up,null,cljs.core.cst$kw$right,null,cljs.core.cst$kw$left,null], null), null);
var G__66225__$1 = (((x === (0)))?cljs.core.disj.cljs$core$IFn$_invoke$arity$2(G__66225,cljs.core.cst$kw$left):G__66225);
var G__66225__$2 = (((y === (0)))?cljs.core.disj.cljs$core$IFn$_invoke$arity$2(G__66225__$1,cljs.core.cst$kw$up):G__66225__$1);
var G__66225__$3 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1))))?cljs.core.disj.cljs$core$IFn$_invoke$arity$2(G__66225__$2,cljs.core.cst$kw$right):G__66225__$2);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(y,(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1)))){
return cljs.core.disj.cljs$core$IFn$_invoke$arity$2(G__66225__$3,cljs.core.cst$kw$down);
} else {
return G__66225__$3;
}
});
org.nfrac.comportex.demos.q_learning_2d.column__GT_signal = cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),(function (){var iter__5454__auto__ = (function org$nfrac$comportex$demos$q_learning_2d$iter__66226(s__66227){
return (new cljs.core.LazySeq(null,(function (){
var s__66227__$1 = s__66227;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__66227__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var motion = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__66227__$1,motion,xs__5201__auto__,temp__4653__auto__){
return (function org$nfrac$comportex$demos$q_learning_2d$iter__66226_$_iter__66228(s__66229){
return (new cljs.core.LazySeq(null,((function (s__66227__$1,motion,xs__5201__auto__,temp__4653__auto__){
return (function (){
var s__66229__$1 = s__66229;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__66229__$1);
if(temp__4653__auto____$1){
var s__66229__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__66229__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66229__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66231 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66230 = (0);
while(true){
if((i__66230 < size__5453__auto__)){
var influence = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66230);
cljs.core.chunk_append(b__66231,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [motion,influence], null));

var G__66237 = (i__66230 + (1));
i__66230 = G__66237;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66231),org$nfrac$comportex$demos$q_learning_2d$iter__66226_$_iter__66228(cljs.core.chunk_rest(s__66229__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66231),null);
}
} else {
var influence = cljs.core.first(s__66229__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [motion,influence], null),org$nfrac$comportex$demos$q_learning_2d$iter__66226_$_iter__66228(cljs.core.rest(s__66229__$2)));
}
} else {
return null;
}
break;
}
});})(s__66227__$1,motion,xs__5201__auto__,temp__4653__auto__))
,null,null));
});})(s__66227__$1,motion,xs__5201__auto__,temp__4653__auto__))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((10),1.0)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$demos$q_learning_2d$iter__66226(cljs.core.rest(s__66227__$1)));
} else {
var G__66238 = cljs.core.rest(s__66227__$1);
s__66227__$1 = G__66238;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$up,cljs.core.cst$kw$down,cljs.core.cst$kw$left,cljs.core.cst$kw$right], null));
})());
org.nfrac.comportex.demos.q_learning_2d.select_action = (function org$nfrac$comportex$demos$q_learning_2d$select_action(htm,curr_pos){
var alyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,cljs.core.cst$kw$action,cljs.core.cst$kw$layer_DASH_3], null));
var acols = org.nfrac.comportex.protocols.active_columns(alyr);
var signals = cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.demos.q_learning_2d.column__GT_signal,acols);
var poss = org.nfrac.comportex.demos.q_learning_2d.possible_directions(curr_pos);
var G__66246 = cljs.core.key(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.val,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(poss,cljs.core.key),cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (alyr,acols,signals,poss){
return (function (m,p__66247){
var vec__66248 = p__66247;
var motion = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66248,(0),null);
var influence = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66248,(1),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,motion,(cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,motion,(0)) + influence));
});})(alyr,acols,signals,poss))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),signals)))));
return (org.nfrac.comportex.demos.q_learning_2d.direction__GT_action.cljs$core$IFn$_invoke$arity$1 ? org.nfrac.comportex.demos.q_learning_2d.direction__GT_action.cljs$core$IFn$_invoke$arity$1(G__66246) : org.nfrac.comportex.demos.q_learning_2d.direction__GT_action.call(null,G__66246));
});
org.nfrac.comportex.demos.q_learning_2d.apply_action = (function org$nfrac$comportex$demos$q_learning_2d$apply_action(inval){
var x = cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval);
var y = cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval);
var dx = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var dy = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var next_x = (function (){var x__5013__auto__ = (function (){var x__5020__auto__ = (x + dx);
var y__5021__auto__ = (org.nfrac.comportex.demos.q_learning_2d.grid_w - (1));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
var next_y = (function (){var x__5013__auto__ = (function (){var x__5020__auto__ = (y + dy);
var y__5021__auto__ = (org.nfrac.comportex.demos.q_learning_2d.grid_h - (1));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
var next_z = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.demos.q_learning_2d.surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [next_x,next_y], null));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$x,next_x,cljs.core.array_seq([cljs.core.cst$kw$y,next_y,cljs.core.cst$kw$z,next_z], 0));
});
org.nfrac.comportex.demos.q_learning_2d.make_model = (function org$nfrac$comportex$demos$q_learning_2d$make_model(){
var sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.encoders.vec_selector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$x,cljs.core.cst$kw$y], 0)),org.nfrac.comportex.encoders.coordinate_encoder(org.nfrac.comportex.demos.q_learning_2d.input_dim,org.nfrac.comportex.demos.q_learning_2d.n_on_bits,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.q_learning_2d.surface_coord_scale,org.nfrac.comportex.demos.q_learning_2d.surface_coord_scale], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.q_learning_2d.coord_radius,org.nfrac.comportex.demos.q_learning_2d.coord_radius], null))], null);
var dx_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$action,cljs.core.cst$kw$dx], null),org.nfrac.comportex.encoders.linear_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(100)], null),(30),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(-1),(1)], null))], null);
var dy_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$action,cljs.core.cst$kw$dy], null),org.nfrac.comportex.encoders.linear_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(100)], null),(30),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(-1),(1)], null))], null);
var msensor = org.nfrac.comportex.encoders.sensor_cat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([dx_sensor,dy_sensor], 0));
return org.nfrac.comportex.core.region_network(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$rgn_DASH_1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,cljs.core.cst$kw$motor], null),cljs.core.cst$kw$action,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rgn_DASH_1], null)], null),cljs.core.constantly(org.nfrac.comportex.core.sensory_region),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$rgn_DASH_1,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.demos.q_learning_2d.spec,cljs.core.cst$kw$lateral_DASH_synapses_QMARK_,false),cljs.core.cst$kw$action,org.nfrac.comportex.demos.q_learning_2d.action_spec], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input,sensor], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$input,sensor,cljs.core.cst$kw$motor,msensor], null));
});
org.nfrac.comportex.demos.q_learning_2d.htm_step_with_action_selection = (function org$nfrac$comportex$demos$q_learning_2d$htm_step_with_action_selection(world_c){
return (function (htm,inval){
var htm_a = org.nfrac.comportex.protocols.htm_learn(org.nfrac.comportex.protocols.htm_activate(org.nfrac.comportex.protocols.htm_sense(htm,inval,cljs.core.cst$kw$sensory)));
var reward = (0.01 * cljs.core.cst$kw$z.cljs$core$IFn$_invoke$arity$1(inval));
var terminal_state_QMARK_ = (org.nfrac.comportex.util.abs(cljs.core.cst$kw$z.cljs$core$IFn$_invoke$arity$1(inval)) >= (100));
var upd_htm = (cljs.core.truth_(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval))?org.nfrac.comportex.demos.q_learning_1d.q_learn(htm_a,htm,reward):cljs.core.assoc_in(htm_a,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,cljs.core.cst$kw$action,cljs.core.cst$kw$layer_DASH_3,cljs.core.cst$kw$Q_DASH_info], null),cljs.core.PersistentArrayMap.EMPTY));
var info = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(upd_htm,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,cljs.core.cst$kw$action,cljs.core.cst$kw$layer_DASH_3,cljs.core.cst$kw$Q_DASH_info], null));
var newQ = (function (){var x__5020__auto__ = (function (){var x__5013__auto__ = (cljs.core.cst$kw$Q_DASH_old.cljs$core$IFn$_invoke$arity$2(info,(0)) + cljs.core.cst$kw$adj.cljs$core$IFn$_invoke$arity$2(info,(0)));
var y__5014__auto__ = -1.0;
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
var y__5021__auto__ = 1.0;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
var Q_map = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.select_keys(inval,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x,cljs.core.cst$kw$y,cljs.core.cst$kw$action], null)),newQ);
var action = org.nfrac.comportex.demos.q_learning_2d.select_action(upd_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval)], null));
var inval_with_action = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$action,action,cljs.core.array_seq([cljs.core.cst$kw$prev_DASH_action,cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.cst$kw$Q_DASH_map,Q_map], 0));
var new_inval_66251 = ((terminal_state_QMARK_)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.demos.q_learning_2d.initial_inval,cljs.core.cst$kw$Q_DASH_map,Q_map):org.nfrac.comportex.demos.q_learning_2d.apply_action(inval_with_action));
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(world_c,new_inval_66251);

var G__66250 = upd_htm;
var G__66250__$1 = org.nfrac.comportex.protocols.htm_sense(G__66250,inval_with_action,cljs.core.cst$kw$motor)
;
var G__66250__$2 = org.nfrac.comportex.protocols.htm_depolarise(G__66250__$1)
;
if(terminal_state_QMARK_){
return org.nfrac.comportex.protocols.break$(G__66250__$2,cljs.core.cst$kw$tm);
} else {
return G__66250__$2;
}
});
});
