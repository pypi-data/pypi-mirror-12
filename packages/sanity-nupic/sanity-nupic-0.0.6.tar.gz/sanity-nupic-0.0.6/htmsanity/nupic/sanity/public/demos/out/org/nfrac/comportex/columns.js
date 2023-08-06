// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.columns');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.nfrac.comportex.synapses');
goog.require('org.nfrac.comportex.topology');
goog.require('clojure.test.check.random');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.inhibition');
/**
 * Generates feed-forward synapses connecting columns to the input bit
 * array.
 * 
 * Connections are made locally by scaling the input space to the
 * column space. Potential synapses are chosen within a radius in
 * input space of `ff-potential-radius` fraction of the longest single
 * dimension, and of those, `ff-init-frac` are chosen from a
 * uniform random distribution.
 * 
 * Initial permanence values are uniformly distributed between
 * `ff-perm-init-lo` and `ff-perm-init-hi`.
 */
org.nfrac.comportex.columns.uniform_ff_synapses = (function org$nfrac$comportex$columns$uniform_ff_synapses(topo,itopo,spec,rng){
var p_hi = cljs.core.cst$kw$ff_DASH_perm_DASH_init_DASH_hi.cljs$core$IFn$_invoke$arity$1(spec);
var p_lo = cljs.core.cst$kw$ff_DASH_perm_DASH_init_DASH_lo.cljs$core$IFn$_invoke$arity$1(spec);
var global_QMARK_ = (cljs.core.cst$kw$ff_DASH_potential_DASH_radius.cljs$core$IFn$_invoke$arity$1(spec) >= 1.0);
var radius = cljs.core.long$((cljs.core.cst$kw$ff_DASH_potential_DASH_radius.cljs$core$IFn$_invoke$arity$1(spec) * cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,org.nfrac.comportex.protocols.dimensions(itopo))));
var frac = cljs.core.cst$kw$ff_DASH_init_DASH_frac.cljs$core$IFn$_invoke$arity$1(spec);
var input_size = org.nfrac.comportex.protocols.size(itopo);
var n_cols = org.nfrac.comportex.protocols.size(topo);
var one_d_QMARK_ = (((1) === cljs.core.count(org.nfrac.comportex.protocols.dimensions(topo)))) || (((1) === cljs.core.count(org.nfrac.comportex.protocols.dimensions(itopo))));
var vec__34509 = org.nfrac.comportex.protocols.dimensions(topo);
var cw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34509,(0),null);
var ch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34509,(1),null);
var vec__34510 = org.nfrac.comportex.protocols.dimensions(itopo);
var iw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34510,(0),null);
var ih = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34510,(1),null);
if(global_QMARK_){
var n_syns = org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((frac * input_size));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (n_syns,p_hi,p_lo,global_QMARK_,radius,frac,input_size,n_cols,one_d_QMARK_,vec__34509,cw,ch,vec__34510,iw,ih){
return (function (col_rng){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (n_syns,p_hi,p_lo,global_QMARK_,radius,frac,input_size,n_cols,one_d_QMARK_,vec__34509,cw,ch,vec__34510,iw,ih){
return (function (rng__$1){
var vec__34511 = clojure.test.check.random.split(rng__$1);
var rng1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34511,(0),null);
var rng2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34511,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$2(rng1,input_size),org.nfrac.comportex.util.rand(rng2,p_lo,p_hi)], null);
});})(n_syns,p_hi,p_lo,global_QMARK_,radius,frac,input_size,n_cols,one_d_QMARK_,vec__34509,cw,ch,vec__34510,iw,ih))
),clojure.test.check.random.split_n(col_rng,n_syns));
});})(n_syns,p_hi,p_lo,global_QMARK_,radius,frac,input_size,n_cols,one_d_QMARK_,vec__34509,cw,ch,vec__34510,iw,ih))
,clojure.test.check.random.split_n(rng,n_cols));
} else {
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(((function (p_hi,p_lo,global_QMARK_,radius,frac,input_size,n_cols,one_d_QMARK_,vec__34509,cw,ch,vec__34510,iw,ih){
return (function (col,col_rng){
var focus_i = ((one_d_QMARK_)?org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((input_size * (col / n_cols))):(function (){var vec__34513 = org.nfrac.comportex.protocols.coordinates_of_index(topo,col);
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34513,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34513,(1),null);
return org.nfrac.comportex.protocols.index_of_coordinates(itopo,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((iw * (cx / cw))),org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((ih * (cy / ch)))], null));
})());
var all_ids = cljs.core.vec(org.nfrac.comportex.protocols.neighbours_indices.cljs$core$IFn$_invoke$arity$3(itopo,focus_i,radius));
var n = org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((frac * cljs.core.count(all_ids)));
var vec__34512 = clojure.test.check.random.split(col_rng);
var rng1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34512,(0),null);
var rng2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34512,(1),null);
var ids = (((frac < 0.4))?org.nfrac.comportex.util.sample(rng1,n,all_ids):(((frac < 1.0))?org.nfrac.comportex.util.reservoir_sample(rng1,n,all_ids):all_ids
));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (focus_i,all_ids,n,vec__34512,rng1,rng2,ids,p_hi,p_lo,global_QMARK_,radius,frac,input_size,n_cols,one_d_QMARK_,vec__34509,cw,ch,vec__34510,iw,ih){
return (function (id,rng__$1){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,org.nfrac.comportex.util.rand(rng__$1,p_lo,p_hi)], null);
});})(focus_i,all_ids,n,vec__34512,rng1,rng2,ids,p_hi,p_lo,global_QMARK_,radius,frac,input_size,n_cols,one_d_QMARK_,vec__34509,cw,ch,vec__34510,iw,ih))
,ids,clojure.test.check.random.split_n(rng2,cljs.core.count(ids))));
});})(p_hi,p_lo,global_QMARK_,radius,frac,input_size,n_cols,one_d_QMARK_,vec__34509,cw,ch,vec__34510,iw,ih))
,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),clojure.test.check.random.split_n(rng,n_cols));
}
});
/**
 * Given a map `exc` of the column overlap counts, multiplies the
 *   excitation value by the corresponding column boosting factor.
 */
org.nfrac.comportex.columns.apply_overlap_boosting = (function org$nfrac$comportex$columns$apply_overlap_boosting(exc,boosts){
return cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,id,x){
var vec__34515 = id;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34515,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34515,(1),null);
var b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(boosts,col);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,id,(x * b));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),exc));
});
org.nfrac.comportex.columns.ff_new_synapse_ids = (function org$nfrac$comportex$columns$ff_new_synapse_ids(rng,ff_bits,curr_ids_set,col,itopo,focus_coord,radius,n_grow){
var ids = cljs.core.List.EMPTY;
var on_bits = org.nfrac.comportex.util.shuffle(rng,ff_bits);
while(true){
if((cljs.core.empty_QMARK_(on_bits)) || ((cljs.core.count(ids) >= n_grow))){
return ids;
} else {
var id = cljs.core.first(ff_bits);
if(cljs.core.truth_((curr_ids_set.cljs$core$IFn$_invoke$arity$1 ? curr_ids_set.cljs$core$IFn$_invoke$arity$1(id) : curr_ids_set.call(null,id)))){
var G__34516 = ids;
var G__34517 = cljs.core.next(on_bits);
ids = G__34516;
on_bits = G__34517;
continue;
} else {
var coord = org.nfrac.comportex.protocols.coordinates_of_index(itopo,id);
var dist = org.nfrac.comportex.protocols.coord_distance(itopo,coord,focus_coord);
if((dist < radius)){
var G__34518 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ids,id);
var G__34519 = cljs.core.next(on_bits);
ids = G__34518;
on_bits = G__34519;
continue;
} else {
var G__34520 = ids;
var G__34521 = cljs.core.next(on_bits);
ids = G__34520;
on_bits = G__34521;
continue;
}
}
}
break;
}
});
org.nfrac.comportex.columns.grow_new_synapses = (function org$nfrac$comportex$columns$grow_new_synapses(rng,ff_sg,col,ff_bits,itopo,radius,n_cols,n_grow,pinit){
var input_size = org.nfrac.comportex.protocols.size(itopo);
var focus_i = org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((input_size * (col / n_cols)));
var focus_coord = org.nfrac.comportex.protocols.coordinates_of_index(itopo,focus_i);
var new_ids = org.nfrac.comportex.columns.ff_new_synapse_ids(rng,ff_bits,org.nfrac.comportex.protocols.in_synapses(ff_sg,col),col,itopo,focus_coord,radius,n_grow);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,new_ids], null);
});
org.nfrac.comportex.columns.boost_active_global = (function org$nfrac$comportex$columns$boost_active_global(ads,spec){
var a_th = cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio.cljs$core$IFn$_invoke$arity$1(spec);
var maxb = cljs.core.cst$kw$max_DASH_boost.cljs$core$IFn$_invoke$arity$1(spec);
var max_ad = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(0),ads);
var crit_ad = (a_th * max_ad);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (a_th,maxb,max_ad,crit_ad){
return (function (ad){
var x__5013__auto__ = (maxb - ((maxb - (1)) * (ad / crit_ad)));
var y__5014__auto__ = 1.0;
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
});})(a_th,maxb,max_ad,crit_ad))
,ads);
});
/**
 * Recalculates boost factors for each column based on its frequency
 * of activation (active duty cycle) compared to the maximum from its
 * neighbours.
 */
org.nfrac.comportex.columns.boost_active = (function org$nfrac$comportex$columns$boost_active(lyr){
var global_QMARK_ = (cljs.core.cst$kw$ff_DASH_potential_DASH_radius.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(lyr)) >= (1));
if(!((cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(lyr)) > (0)))){
return lyr;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(lyr,cljs.core.cst$kw$boosts,org.nfrac.comportex.columns.boost_active_global(cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr),cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(lyr)));
}
});
/**
 * Records a set of events with indices `is` in the vector `v`
 * according to duty cycle period `period`. As in NuPIC, the formula
 * is
 * 
 * <pre>
 * y[t] = (period-1) * y[t-1]  +  1
 *     --------------------------
 *       period
 * </pre>
 */
org.nfrac.comportex.columns.update_duty_cycles = (function org$nfrac$comportex$columns$update_duty_cycles(v,is,period){
var d = (1.0 / period);
var decay = (d * (period - (1)));
return org.nfrac.comportex.util.update_each(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (d,decay){
return (function (p1__34522_SHARP_){
return (p1__34522_SHARP_ * decay);
});})(d,decay))
,v),is,((function (d,decay){
return (function (p1__34523_SHARP_){
return (p1__34523_SHARP_ + d);
});})(d,decay))
);
});
