// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.inhibition');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.nfrac.comportex.util');
org.nfrac.comportex.inhibition.numeric_span = (function org$nfrac$comportex$inhibition$numeric_span(xs){
return (cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,xs) - cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.min,xs));
});
/**
 * Returns the span over the input bit array to which this column has
 * connected synapses. Takes the maximum span in any one dimension.
 */
org.nfrac.comportex.inhibition.column_receptive_field_size = (function org$nfrac$comportex$inhibition$column_receptive_field_size(sg,itopo,col){
var ids = org.nfrac.comportex.protocols.sources_connected_to(sg,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0),(0)], null));
var coords = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.coordinates_of_index,itopo),ids);
if(cljs.core.seq(coords)){
if(typeof cljs.core.first(coords) === 'number'){
return org.nfrac.comportex.inhibition.numeric_span(coords);
} else {
var m = cljs.core.count(org.nfrac.comportex.protocols.dimensions(itopo));
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,(function (){var iter__5454__auto__ = ((function (m,ids,coords){
return (function org$nfrac$comportex$inhibition$column_receptive_field_size_$_iter__34390(s__34391){
return (new cljs.core.LazySeq(null,((function (m,ids,coords){
return (function (){
var s__34391__$1 = s__34391;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__34391__$1);
if(temp__4653__auto__){
var s__34391__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__34391__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__34391__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__34393 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__34392 = (0);
while(true){
if((i__34392 < size__5453__auto__)){
var j = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__34392);
cljs.core.chunk_append(b__34393,org.nfrac.comportex.inhibition.numeric_span(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__34392,j,c__5452__auto__,size__5453__auto__,b__34393,s__34391__$2,temp__4653__auto__,m,ids,coords){
return (function (p1__34383_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p1__34383_SHARP_,j);
});})(i__34392,j,c__5452__auto__,size__5453__auto__,b__34393,s__34391__$2,temp__4653__auto__,m,ids,coords))
,coords)));

var G__34396 = (i__34392 + (1));
i__34392 = G__34396;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__34393),org$nfrac$comportex$inhibition$column_receptive_field_size_$_iter__34390(cljs.core.chunk_rest(s__34391__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__34393),null);
}
} else {
var j = cljs.core.first(s__34391__$2);
return cljs.core.cons(org.nfrac.comportex.inhibition.numeric_span(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (j,s__34391__$2,temp__4653__auto__,m,ids,coords){
return (function (p1__34383_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p1__34383_SHARP_,j);
});})(j,s__34391__$2,temp__4653__auto__,m,ids,coords))
,coords)),org$nfrac$comportex$inhibition$column_receptive_field_size_$_iter__34390(cljs.core.rest(s__34391__$2)));
}
} else {
return null;
}
break;
}
});})(m,ids,coords))
,null,null));
});})(m,ids,coords))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(m));
})());
}
} else {
return (0);
}
});
org.nfrac.comportex.inhibition.avg_receptive_field_size = (function org$nfrac$comportex$inhibition$avg_receptive_field_size(sg,topo,itopo){
return org.nfrac.comportex.util.mean(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.inhibition.column_receptive_field_size,sg,itopo),cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.protocols.size(topo))));
});
/**
 * The radius in column space defining neighbouring columns, based on
 * the average receptive field size. Specifically, neighbouring
 * columns are defined by sharing at least 50% of their receptive
 * fields, on average.
 * 
 * * `sg` is the synapse graph linking the inputs to targets.
 * 
 * * `topo` is the topology of the targets (e.g. columns).
 * 
 * * `itopo` is the topology of the inputs.
 */
org.nfrac.comportex.inhibition.inhibition_radius = (function org$nfrac$comportex$inhibition$inhibition_radius(sg,topo,itopo){
var shared_frac = 0.5;
var max_dim = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,org.nfrac.comportex.protocols.dimensions(topo));
var max_idim = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,org.nfrac.comportex.protocols.dimensions(itopo));
var arfs = org.nfrac.comportex.inhibition.avg_receptive_field_size(sg,topo,itopo);
var cols_diameter = (max_dim * (arfs / max_idim));
var cols_radius = cljs.core.quot(cols_diameter,(2));
var x__5013__auto__ = org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((cols_radius * (1.0 - shared_frac)));
var y__5014__auto__ = (1);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
});
/**
 * Returns the set of column ids which should become active given the
 * map of column excitations `exc`, and the target activation rate
 * `level`. Global inhibition is applied, i.e. the top N columns by
 * excitation are selected.
 */
org.nfrac.comportex.inhibition.inhibit_globally = (function org$nfrac$comportex$inhibition$inhibit_globally(exc,n_on){
return org.nfrac.comportex.util.top_n_keys_by_value(n_on,exc);
});
/**
 * Threshold excitation level at which a cell with excitation `x`
 * inhibits a neighbour cell at a distance `dist` columns away.
 */
org.nfrac.comportex.inhibition.inhibits_exc = (function org$nfrac$comportex$inhibition$inhibits_exc(x,dist,max_dist,base_dist){
var z = (1.0 - ((function (){var x__5013__auto__ = 0.0;
var y__5014__auto__ = (dist - base_dist);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})() / (max_dist - base_dist)));
return (x * z);
});
org.nfrac.comportex.inhibition.map__GT_vec = (function org$nfrac$comportex$inhibition$map__GT_vec(n,m){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(m,cljs.core.range.cljs$core$IFn$_invoke$arity$1(n));
});
org.nfrac.comportex.inhibition.vec__GT_map = (function org$nfrac$comportex$inhibition$vec__GT_map(v){
return cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,i,x){
if(cljs.core.truth_(x)){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,i,x);
} else {
return m;
}
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),v));
});
org.nfrac.comportex.inhibition.mask_out_inhibited_by_col = (function org$nfrac$comportex$inhibition$mask_out_inhibited_by_col(emask,col,x,topo,inh_radius,inh_base_dist){
var coord = org.nfrac.comportex.protocols.coordinates_of_index(topo,col);
var x__$1 = x;
var inh_radius__$1 = inh_radius;
var inh_base_dist__$1 = inh_base_dist;
var nbs = org.nfrac.comportex.protocols.neighbours.cljs$core$IFn$_invoke$arity$4(topo,coord,(inh_radius__$1 | (0)),(0));
var emask__$1 = emask;
while(true){
var temp__4651__auto__ = cljs.core.first(nbs);
if(cljs.core.truth_(temp__4651__auto__)){
var nb_coord = temp__4651__auto__;
var nb_col = org.nfrac.comportex.protocols.index_of_coordinates(topo,nb_coord);
var temp__4651__auto____$1 = (emask__$1.cljs$core$IFn$_invoke$arity$1 ? emask__$1.cljs$core$IFn$_invoke$arity$1(nb_col) : emask__$1.call(null,nb_col));
if(cljs.core.truth_(temp__4651__auto____$1)){
var nb_x = temp__4651__auto____$1;
var dist = org.nfrac.comportex.protocols.coord_distance(topo,coord,nb_coord);
if((nb_x <= org.nfrac.comportex.inhibition.inhibits_exc(x__$1,dist,inh_radius__$1,inh_base_dist__$1))){
var G__34397 = cljs.core.next(nbs);
var G__34398 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(emask__$1,nb_col,null);
nbs = G__34397;
emask__$1 = G__34398;
continue;
} else {
var G__34399 = cljs.core.next(nbs);
var G__34400 = emask__$1;
nbs = G__34399;
emask__$1 = G__34400;
continue;
}
} else {
var G__34401 = cljs.core.next(nbs);
var G__34402 = emask__$1;
nbs = G__34401;
emask__$1 = G__34402;
continue;
}
} else {
return emask__$1;
}
break;
}
});
/**
 * Returns the set of column ids which should become active given the
 * map of column excitations `exc` and the column topology. Applies
 * local inhibition to remove any columns dominated by their
 * neighbours.
 */
org.nfrac.comportex.inhibition.inhibit_locally = (function org$nfrac$comportex$inhibition$inhibit_locally(exc,topo,inh_radius,inh_base_dist,n_on){
var sel_cols = cljs.core.List.EMPTY;
var more_cols = cljs.core.keys(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$3(cljs.core.val,cljs.core._GT_,exc));
var emask = cljs.core.transient$(org.nfrac.comportex.inhibition.map__GT_vec(org.nfrac.comportex.protocols.size(topo),exc));
while(true){
if((cljs.core.count(sel_cols) < n_on)){
var temp__4651__auto__ = cljs.core.first(more_cols);
if(cljs.core.truth_(temp__4651__auto__)){
var col = temp__4651__auto__;
var temp__4651__auto____$1 = (emask.cljs$core$IFn$_invoke$arity$1 ? emask.cljs$core$IFn$_invoke$arity$1(col) : emask.call(null,col));
if(cljs.core.truth_(temp__4651__auto____$1)){
var x = temp__4651__auto____$1;
var G__34403 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(sel_cols,col);
var G__34404 = cljs.core.next(more_cols);
var G__34405 = org.nfrac.comportex.inhibition.mask_out_inhibited_by_col(emask,col,x,topo,inh_radius,inh_base_dist);
sel_cols = G__34403;
more_cols = G__34404;
emask = G__34405;
continue;
} else {
var G__34406 = sel_cols;
var G__34407 = cljs.core.next(more_cols);
var G__34408 = emask;
sel_cols = G__34406;
more_cols = G__34407;
emask = G__34408;
continue;
}
} else {
return sel_cols;
}
} else {
return sel_cols;
}
break;
}
});
