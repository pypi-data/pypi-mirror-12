// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.cells');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.nfrac.comportex.synapses');
goog.require('org.nfrac.comportex.columns');
goog.require('org.nfrac.comportex.topology');
goog.require('clojure.test.check.random');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.inhibition');
/**
 * Default parameters for distal dendrite segments. The
 *   same parameters are also used for proximal segments, but with
 *   different default values.
 * 
 *   * `max-segments` - maximum number of dendrites segments per cell (or
 *   column for proximal dendrites).
 * 
 *   * `max-synapse-count` - maximum number of synapses per segment.
 * 
 *   * `new-synapse-count` - number of synapses on a new dendrite
 *   segment.
 * 
 *   * `stimulus-threshold` - minimum number of active synapses on a
 *   segment for it to become active.
 * 
 *   * `learn-threshold` - minimum number of active synapses on a segment
 *   for it to be reinforced and extended if it is the best matching.
 * 
 *   * `perm-inc` - amount by which to increase synapse permanence to
 *   active sources when reinforcing a segment.
 * 
 *   * `perm-stable-inc` - amount by which to increase a synapse
 *   permanence to stable (predicted) sources.
 * 
 *   * `perm-dec` - amount by which to decrease synapse permanence to
 *   inactive sources when reinforcing a segment.
 * 
 *   * `perm-punish` - amount by which to decrease synapse permanence
 *   when punishing segments in case of failed prediction.
 * 
 *   * `perm-connected` - permanence value at which a synapse is
 *   functionally connected. Permanence values are defined to be between
 *   0 and 1.
 * 
 *   * `perm-init` - permanence value for new synapses on segments.
 * 
 *   * `punish?` - whether to reduce synapse permanence on segments
 *   incorrectly predicting activation.
 * 
 *   * `learn?` - whether to reinforce and grow synapses.
 */
org.nfrac.comportex.cells.dendrite_parameter_defaults = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$perm_DASH_connected,cljs.core.cst$kw$perm_DASH_punish,cljs.core.cst$kw$max_DASH_synapse_DASH_count,cljs.core.cst$kw$max_DASH_segments,cljs.core.cst$kw$perm_DASH_init,cljs.core.cst$kw$new_DASH_synapse_DASH_count,cljs.core.cst$kw$stimulus_DASH_threshold,cljs.core.cst$kw$punish_QMARK_,cljs.core.cst$kw$learn_QMARK_,cljs.core.cst$kw$perm_DASH_dec,cljs.core.cst$kw$learn_DASH_threshold,cljs.core.cst$kw$perm_DASH_inc,cljs.core.cst$kw$perm_DASH_stable_DASH_inc],[0.2,0.002,(22),(5),0.16,(12),(9),true,true,0.01,(7),0.05,0.05]);
/**
 * Default parameter specification map.
 * 
 *   * `input-dimensions` - size of input bit grid as a vector, one
 *   dimensional `[size]`, two dimensional `[width height]`, etc.
 * 
 *   * `column-dimensions` - size of column field as a vector, one
 *   dimensional `[size]` or two dimensional `[width height]`.
 * 
 *   * `ff-potential-radius` - range of potential feed-forward synapse
 *   connections, as a fraction of the longest single dimension in the
 *   input space.
 * 
 *   * `ff-init-frac` - fraction of inputs within radius that will be
 *   part of the initially connected set.
 * 
 *   * `ff-perm-init-hi` - highest initial permanence value on new synapses.
 * 
 *   * `ff-perm-init-lo` - lowest initial permanence value on new synapses.
 * 
 *   * `proximal` - map of parameters for proximal dendrite segments,
 *   see `dendrite-parameter-defaults`.
 * 
 *   *  `distal` - map of parameters for distal dendrite segments,
 *   see `dendrite-parameter-defaults`.
 * 
 *   *  `apical` - map of parameters for apical dendrite segments,
 *   see `dendrite-parameter-defaults`. Ignored unless :use-feedback?
 * 
 *   * `max-boost` - ceiling on the column boosting factor used to
 *   increase activation frequency.
 * 
 *   * `duty-cycle-period` - number of time steps to average over when
 *   updating duty cycles and (thereby) column boosting measures.
 * 
 *   * `boost-active-duty-ratio` - when a column's activation frequency
 *   is below this proportion of the _highest_ of its neighbours, its
 *   boost factor is increased.
 * 
 *   * `boost-active-every` - number of time steps between recalculating
 *   column boosting factors.
 * 
 *   * `inh-radius-every` - number of time steps between recalculating
 *   the effective inhibition radius.
 * 
 *   * `lateral-synapses?` - whether distal synapses can connect
 *   laterally to other cells in this layer.
 * 
 *   * `use-feedback?` - whether distal synapses can connect to top-down
 *   feedback cells.
 * 
 *   * `distal-motor-dimensions` - defines bit field available for
 *   feed-forward motor input to distal synapses.
 * 
 *   * `distal-topdown-dimensions` - defines bit field available for
 *   top-down feedback to distal synapses.
 * 
 *   * `depth` - number of cells per column.
 * 
 *   * `activation-level` - fraction of columns that can be
 *   active (either locally or globally); inhibition kicks in to reduce
 *   it to this level. Does not apply to temporal pooling.
 * 
 *   * `activation-level-max` - maximum fraction of columns that can be
 *   active as temporal pooling progresses. Each step of continued
 *   pooling allocates an extra 50% of `activation-level` until this
 *   maximum is reached.
 * 
 *   * `global-inhibition?` - whether to use the faster global algorithm
 *   for column inhibition (just keep those with highest overlap scores),
 *   or to apply local inhibition (only within a column's neighbours).
 * 
 *   * `inhibition-base-distance` - the distance in columns within which
 *   a cell *will always* inhibit neighbouring cells with lower
 *   excitation. Ignored if `global-inhibition?` is true.
 * 
 *   * `distal-vs-proximal-weight` - scaling to apply to the number of
 *   active distal synapses (on the winning segment) before adding to the
 *   number of active proximal synapses, when selecting active
 *   columns. Set to zero to disable ``prediction-assisted'' activation.
 * 
 *   * `spontaneous-activation?` - if true, cells may become active with
 *   sufficient distal synapse excitation, even in the absence of any
 *   proximal synapse excitation.
 * 
 *   * `dominance-margin` - an amount of excitation (generally measured
 *   in number of active synapses) by which one cell must exceed all
 *   others in the column to be considered dominant. And therefore to
 *   inhibit all other cells in the column.
 * 
 *   * `stable-inbit-frac-threshold` - fraction of proximal input bits
 *   to a layer which must be from stable cells in order to start
 *   temporal pooling.
 * 
 *   * `temporal-pooling-max-exc` - maximum continuing temporal pooling
 *   excitation level.
 * 
 *   * `temporal-pooling-fall` - amount by which a cell's continuing
 *   temporal pooling excitation falls each time step.
 * 
 *   * `temporal-pooling-amp` - multiplier on cell excitation to become
 *   persistent temporal pooling.
 * 
 *   * `random-seed` - the random seed (for reproducible results).
 */
org.nfrac.comportex.cells.parameter_defaults = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$global_DASH_inhibition_QMARK_,cljs.core.cst$kw$ff_DASH_perm_DASH_init_DASH_hi,cljs.core.cst$kw$activation_DASH_level_DASH_max,cljs.core.cst$kw$ff_DASH_perm_DASH_init_DASH_lo,cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio,cljs.core.cst$kw$lateral_DASH_synapses_QMARK_,cljs.core.cst$kw$temporal_DASH_pooling_DASH_max_DASH_exc,cljs.core.cst$kw$random_DASH_seed,cljs.core.cst$kw$column_DASH_dimensions,cljs.core.cst$kw$distal_DASH_vs_DASH_proximal_DASH_weight,cljs.core.cst$kw$ff_DASH_init_DASH_frac,cljs.core.cst$kw$distal,cljs.core.cst$kw$distal_DASH_topdown_DASH_dimensions,cljs.core.cst$kw$use_DASH_feedback_QMARK_,cljs.core.cst$kw$distal_DASH_motor_DASH_dimensions,cljs.core.cst$kw$boost_DASH_active_DASH_every,cljs.core.cst$kw$max_DASH_boost,cljs.core.cst$kw$ff_DASH_potential_DASH_radius,cljs.core.cst$kw$temporal_DASH_pooling_DASH_amp,cljs.core.cst$kw$activation_DASH_level,cljs.core.cst$kw$proximal,cljs.core.cst$kw$input_DASH_dimensions,cljs.core.cst$kw$depth,cljs.core.cst$kw$inhibition_DASH_base_DASH_distance,cljs.core.cst$kw$apical,cljs.core.cst$kw$duty_DASH_cycle_DASH_period,cljs.core.cst$kw$dominance_DASH_margin,cljs.core.cst$kw$spontaneous_DASH_activation_QMARK_,cljs.core.cst$kw$stable_DASH_inbit_DASH_frac_DASH_threshold,cljs.core.cst$kw$inh_DASH_radius_DASH_every,cljs.core.cst$kw$temporal_DASH_pooling_DASH_fall],[true,0.25,0.1,0.1,0.001,true,50.0,(42),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1000)], null),0.0,0.25,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.cells.dendrite_parameter_defaults,cljs.core.cst$kw$learn_QMARK_,true),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),false,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),(1000),1.5,1.0,3.0,0.02,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$perm_DASH_connected,cljs.core.cst$kw$max_DASH_synapse_DASH_count,cljs.core.cst$kw$max_DASH_segments,cljs.core.cst$kw$perm_DASH_init,cljs.core.cst$kw$new_DASH_synapse_DASH_count,cljs.core.cst$kw$stimulus_DASH_threshold,cljs.core.cst$kw$learn_QMARK_,cljs.core.cst$kw$perm_DASH_dec,cljs.core.cst$kw$learn_DASH_threshold,cljs.core.cst$kw$perm_DASH_inc,cljs.core.cst$kw$perm_DASH_stable_DASH_inc],[0.2,(300),(1),0.25,(12),(2),true,0.01,(7),0.04,0.15]),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$define_DASH_me_BANG_], null),(5),(1),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.cells.dendrite_parameter_defaults,cljs.core.cst$kw$learn_QMARK_,false),(1000),(4),false,0.5,(1000),5.0]);
org.nfrac.comportex.cells.better_parameter_defaults = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.nfrac.comportex.cells.parameter_defaults,cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2048)], null),cljs.core.array_seq([cljs.core.cst$kw$depth,(16),cljs.core.cst$kw$distal,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.nfrac.comportex.cells.dendrite_parameter_defaults,cljs.core.cst$kw$max_DASH_segments,(8),cljs.core.array_seq([cljs.core.cst$kw$max_DASH_synapse_DASH_count,(32),cljs.core.cst$kw$new_DASH_synapse_DASH_count,(20),cljs.core.cst$kw$stimulus_DASH_threshold,(13),cljs.core.cst$kw$learn_DASH_threshold,(10)], 0))], 0));
org.nfrac.comportex.cells.distal_sources_widths = (function org$nfrac$comportex$cells$distal_sources_widths(spec){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(cljs.core.cst$kw$lateral_DASH_synapses_QMARK_.cljs$core$IFn$_invoke$arity$1(spec))?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._STAR_,cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(spec),cljs.core.cst$kw$column_DASH_dimensions.cljs$core$IFn$_invoke$arity$1(spec)):(0)),cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,cljs.core.cst$kw$distal_DASH_motor_DASH_dimensions.cljs$core$IFn$_invoke$arity$1(spec))], null);
});
org.nfrac.comportex.cells.cell__GT_id = (function org$nfrac$comportex$cells$cell__GT_id(depth,p__34526){
var vec__34528 = p__34526;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34528,(0),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34528,(1),null);
return ((col * depth) + ci);
});
org.nfrac.comportex.cells.cells__GT_bits = (function org$nfrac$comportex$cells$cells__GT_bits(depth,cells){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.cells.cell__GT_id,depth),cells);
});
org.nfrac.comportex.cells.id__GT_cell = (function org$nfrac$comportex$cells$id__GT_cell(depth,id){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(id,depth),cljs.core.rem(id,depth)], null);
});
/**
 * Returns a vector [k v] where k is one of :this or :ff. In the
 * case of :this, v is [col ci], otherwise v gives the index in the
 * feed-forward distal input field.
 */
org.nfrac.comportex.cells.id__GT_source = (function org$nfrac$comportex$cells$id__GT_source(spec,id){
var vec__34530 = org.nfrac.comportex.cells.distal_sources_widths(spec);
var this_w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34530,(0),null);
var ff_w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34530,(1),null);
if((id < this_w)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$this,org.nfrac.comportex.cells.id__GT_cell(cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(spec),id)], null);
} else {
if((id < (this_w + ff_w))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ff,(id - this_w)], null);
} else {
return null;
}
}
});
/**
 * Returns the number of active cells to which the synapses are
 *   connected, i.e. where synapse permanence is equal to or greater than
 *   `pcon`.
 */
org.nfrac.comportex.cells.segment_activation = (function org$nfrac$comportex$cells$segment_activation(syns,active_bits,pcon){
return org.nfrac.comportex.util.count_filter((function (p__34533){
var vec__34534 = p__34533;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34534,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34534,(1),null);
var and__4670__auto__ = (p >= pcon);
if(and__4670__auto__){
return (active_bits.cljs$core$IFn$_invoke$arity$1 ? active_bits.cljs$core$IFn$_invoke$arity$1(id) : active_bits.call(null,id));
} else {
return and__4670__auto__;
}
}),syns);
});
/**
 * Returns a seq of the segment indexes in the cell with activation at
 *   or above the activation threshold `th`, only considering synapses
 *   with permanence values at or above `pcon`.
 */
org.nfrac.comportex.cells.cell_active_segments = (function org$nfrac$comportex$cells$cell_active_segments(cell_segs,active_bits,th,pcon){
return cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (si,syns){
var act = org.nfrac.comportex.cells.segment_activation(syns,active_bits,pcon);
if((act >= th)){
return si;
} else {
return null;
}
}),cell_segs);
});
/**
 * Finds the segment in the cell having the most active synapses, as
 *   long as is above the activation threshold `min-act`, only considering
 *   synapses with permanence values at or above `pcon`.
 *   Returns
 *   `[seg-index activation synapses]`. If no such segments exist,
 *   returns `[nil 0 {}]`.
 */
org.nfrac.comportex.cells.best_matching_segment = (function org$nfrac$comportex$cells$best_matching_segment(cell_segs,active_bits,min_act,pcon){
var segs = cljs.core.seq(cell_segs);
var si = (0);
var best_si = (0);
var best_act = (0);
var best_syns = null;
while(true){
var temp__4651__auto__ = cljs.core.first(segs);
if(cljs.core.truth_(temp__4651__auto__)){
var syns = temp__4651__auto__;
var act = cljs.core.long$(org.nfrac.comportex.cells.segment_activation(syns,active_bits,pcon));
var best_QMARK_ = (act > best_act);
var G__34535 = cljs.core.next(segs);
var G__34536 = (si + (1));
var G__34537 = ((best_QMARK_)?si:best_si);
var G__34538 = ((best_QMARK_)?act:best_act);
var G__34539 = ((best_QMARK_)?syns:best_syns);
segs = G__34535;
si = G__34536;
best_si = G__34537;
best_act = G__34538;
best_syns = G__34539;
continue;
} else {
if((best_act >= min_act)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [best_si,best_act,best_syns], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,(0),cljs.core.PersistentArrayMap.EMPTY], null);
}
}
break;
}
});
/**
 * Finds the most excited dendrite segment for each cell. Returns
 *   `[cell-exc cell-seg-exc]` where
 * 
 *   * cell-exc is a map from cell-id to best excitation value.
 *   * cell-seg-exc is a map from cell-id to best [seg-path exc].
 */
org.nfrac.comportex.cells.best_segment_excitations_and_paths = (function org$nfrac$comportex$cells$best_segment_excitations_and_paths(seg_exc){
var seg_exc__$1 = cljs.core.seq(seg_exc);
var excs = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);
var paths = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);
while(true){
var temp__4651__auto__ = cljs.core.first(seg_exc__$1);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__34541 = temp__4651__auto__;
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34541,(0),null);
var exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34541,(1),null);
var id = cljs.core.pop(path);
var prev_exc = cljs.core.get.cljs$core$IFn$_invoke$arity$3(excs,id,0.0);
if((exc > prev_exc)){
var G__34542 = cljs.core.next(seg_exc__$1);
var G__34543 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(excs,id,exc);
var G__34544 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(paths,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path,exc], null));
seg_exc__$1 = G__34542;
excs = G__34543;
paths = G__34544;
continue;
} else {
var G__34545 = cljs.core.next(seg_exc__$1);
var G__34546 = excs;
var G__34547 = paths;
seg_exc__$1 = G__34545;
excs = G__34546;
paths = G__34547;
continue;
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.persistent_BANG_(excs),cljs.core.persistent_BANG_(paths)], null);
}
break;
}
});
/**
 * Returns a map of column ids to representative excitation values,
 *   being the greatest excitation of its constituent cells or segments.
 */
org.nfrac.comportex.cells.best_by_column = (function org$nfrac$comportex$cells$best_by_column(cell_exc){
return cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,id,exc){
var vec__34549 = id;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34549,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34549,(1),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,col,(function (){var x__5013__auto__ = exc;
var y__5014__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,col,0.0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})());
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cell_exc));
});
/**
 * Combine the proximal and distal excitations in a map of cell id to
 *   excitation, as a weighted sum. Temporal Pooling `tp-exc` is added to
 *   the proximal excitation but is given keyed by cell rather than by
 *   column. Normally only cells with some proximal input are included,
 *   but if `spontaneous-activation?` is true, this is relaxed
 *   (i.e. prediction alone could cause activation).
 * 
 *   * col-exc is keyed by column as [col 0].
 *   * tp-exc is keyed by cell as [col ci].
 */
org.nfrac.comportex.cells.total_excitations = (function org$nfrac$comportex$cells$total_excitations(col_exc,tp_exc,distal_exc,distal_weight,spontaneous_activation_QMARK_,depth){
var has_tp_QMARK_ = cljs.core.seq(tp_exc);
var basic_col_exc = ((has_tp_QMARK_)?cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core._PLUS_,cljs.core.array_seq([col_exc,cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (has_tp_QMARK_){
return (function (p__34569){
var vec__34570 = p__34569;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34570,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34570,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0)], null),(0)], null);
});})(has_tp_QMARK_))
),cljs.core.keys(tp_exc))], 0)):col_exc);
var basic_exc = (function (){var iter__5454__auto__ = ((function (has_tp_QMARK_,basic_col_exc){
return (function org$nfrac$comportex$cells$total_excitations_$_iter__34571(s__34572){
return (new cljs.core.LazySeq(null,((function (has_tp_QMARK_,basic_col_exc){
return (function (){
var s__34572__$1 = s__34572;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__34572__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__34582 = cljs.core.first(xs__5201__auto__);
var vec__34583 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34582,(0),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34583,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34583,(1),null);
var exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34582,(1),null);
var iterys__5450__auto__ = ((function (s__34572__$1,vec__34582,vec__34583,col,_,exc,xs__5201__auto__,temp__4653__auto__,has_tp_QMARK_,basic_col_exc){
return (function org$nfrac$comportex$cells$total_excitations_$_iter__34571_$_iter__34573(s__34574){
return (new cljs.core.LazySeq(null,((function (s__34572__$1,vec__34582,vec__34583,col,_,exc,xs__5201__auto__,temp__4653__auto__,has_tp_QMARK_,basic_col_exc){
return (function (){
var s__34574__$1 = s__34574;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__34574__$1);
if(temp__4653__auto____$1){
var s__34574__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__34574__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__34574__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__34576 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__34575 = (0);
while(true){
if((i__34575 < size__5453__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__34575);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var tp = ((has_tp_QMARK_)?cljs.core.get.cljs$core$IFn$_invoke$arity$3(tp_exc,cell_id,0.0):0.0);
cljs.core.chunk_append(b__34576,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cell_id,(exc + tp)], null));

var G__34588 = (i__34575 + (1));
i__34575 = G__34588;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__34576),org$nfrac$comportex$cells$total_excitations_$_iter__34571_$_iter__34573(cljs.core.chunk_rest(s__34574__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__34576),null);
}
} else {
var ci = cljs.core.first(s__34574__$2);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var tp = ((has_tp_QMARK_)?cljs.core.get.cljs$core$IFn$_invoke$arity$3(tp_exc,cell_id,0.0):0.0);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cell_id,(exc + tp)], null),org$nfrac$comportex$cells$total_excitations_$_iter__34571_$_iter__34573(cljs.core.rest(s__34574__$2)));
}
} else {
return null;
}
break;
}
});})(s__34572__$1,vec__34582,vec__34583,col,_,exc,xs__5201__auto__,temp__4653__auto__,has_tp_QMARK_,basic_col_exc))
,null,null));
});})(s__34572__$1,vec__34582,vec__34583,col,_,exc,xs__5201__auto__,temp__4653__auto__,has_tp_QMARK_,basic_col_exc))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(depth)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$cells$total_excitations_$_iter__34571(cljs.core.rest(s__34572__$1)));
} else {
var G__34589 = cljs.core.rest(s__34572__$1);
s__34572__$1 = G__34589;
continue;
}
} else {
return null;
}
break;
}
});})(has_tp_QMARK_,basic_col_exc))
,null,null));
});})(has_tp_QMARK_,basic_col_exc))
;
return iter__5454__auto__(basic_col_exc);
})();
if((distal_weight === (0))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,basic_exc);
} else {
var basic_exc__$1 = (cljs.core.truth_(spontaneous_activation_QMARK_)?cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.zipmap(cljs.core.keys(distal_exc),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(0.0)),basic_exc):basic_exc);
return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (basic_exc__$1,has_tp_QMARK_,basic_col_exc,basic_exc){
return (function (m,p__34586){
var vec__34587 = p__34586;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34587,(0),null);
var p_exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34587,(1),null);
var d_exc = (distal_exc.cljs$core$IFn$_invoke$arity$2 ? distal_exc.cljs$core$IFn$_invoke$arity$2(id,0.0) : distal_exc.call(null,id,0.0));
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,id,(p_exc + (distal_weight * d_exc)));
});})(basic_exc__$1,has_tp_QMARK_,basic_col_exc,basic_exc))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),basic_exc__$1));
}
});
/**
 * Returns a set of column ids to become active after lateral inhibition.
 */
org.nfrac.comportex.cells.select_active_columns = (function org$nfrac$comportex$cells$select_active_columns(col_exc,topo,activation_level,inh_radius,spec){
var level = activation_level;
var n_on = (function (){var x__5013__auto__ = (1);
var y__5014__auto__ = org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((level * org.nfrac.comportex.protocols.size(topo)));
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
return cljs.core.set((cljs.core.truth_(cljs.core.cst$kw$global_DASH_inhibition_QMARK_.cljs$core$IFn$_invoke$arity$1(spec))?org.nfrac.comportex.inhibition.inhibit_globally(col_exc,n_on):org.nfrac.comportex.inhibition.inhibit_locally(col_exc,topo,inh_radius,cljs.core.cst$kw$inhibition_DASH_base_DASH_distance.cljs$core$IFn$_invoke$arity$1(spec),n_on)));
});
/**
 * Returns a sequence of cell ids to become active in the column.
 *   If no cells have excitation over the threshold, then all become
 *   active (bursting). Otherwise, only cells above the threshold become
 *   active; but if the top excitation exceeds all others by at least
 *   `dominance-margin` then the others are inhibited even if they are
 *   over the threshold.
 */
org.nfrac.comportex.cells.column_active_cells = (function org$nfrac$comportex$cells$column_active_cells(col,cell_exc,depth,threshold,dominance_margin){
var cell_ids = (function (){var iter__5454__auto__ = (function org$nfrac$comportex$cells$column_active_cells_$_iter__34596(s__34597){
return (new cljs.core.LazySeq(null,(function (){
var s__34597__$1 = s__34597;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__34597__$1);
if(temp__4653__auto__){
var s__34597__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__34597__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__34597__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__34599 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__34598 = (0);
while(true){
if((i__34598 < size__5453__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__34598);
cljs.core.chunk_append(b__34599,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));

var G__34602 = (i__34598 + (1));
i__34598 = G__34602;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__34599),org$nfrac$comportex$cells$column_active_cells_$_iter__34596(cljs.core.chunk_rest(s__34597__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__34599),null);
}
} else {
var ci = cljs.core.first(s__34597__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null),org$nfrac$comportex$cells$column_active_cells_$_iter__34596(cljs.core.rest(s__34597__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(depth));
})();
var ids = cell_ids;
var best_ids = cljs.core.List.EMPTY;
var best_exc = -99999.9;
var good_ids = cljs.core.List.EMPTY;
var second_exc = threshold;
while(true){
var temp__4651__auto__ = cljs.core.first(ids);
if(cljs.core.truth_(temp__4651__auto__)){
var id = temp__4651__auto__;
var exc = (cell_exc.cljs$core$IFn$_invoke$arity$2 ? cell_exc.cljs$core$IFn$_invoke$arity$2(id,(0)) : cell_exc.call(null,id,(0)));
var equal_best_QMARK_ = (exc === best_exc);
var new_best_QMARK_ = (exc > best_exc);
var good_QMARK_ = (exc >= threshold);
var G__34603 = cljs.core.next(ids);
var G__34604 = ((equal_best_QMARK_)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(best_ids,id):((new_best_QMARK_)?cljs.core._conj(cljs.core.List.EMPTY,id):best_ids
));
var G__34605 = ((new_best_QMARK_)?exc:best_exc);
var G__34606 = ((good_QMARK_)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(good_ids,id):good_ids);
var G__34607 = ((new_best_QMARK_)?(function (){var x__5013__auto__ = best_exc;
var y__5014__auto__ = second_exc;
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})():((((second_exc < exc)) && ((exc < best_exc)))?exc:second_exc));
ids = G__34603;
best_ids = G__34604;
best_exc = G__34605;
good_ids = G__34606;
second_exc = G__34607;
continue;
} else {
if((best_exc < threshold)){
return cell_ids;
} else {
if(((best_exc - second_exc) >= dominance_margin)){
return best_ids;
} else {
return good_ids;

}
}
}
break;
}
});
/**
 * Determines active cells in the given columns and whether they are bursting.
 *   Returns keys
 *   * `:by-column` - map of column id to seq of active cell ids.
 *   * `:active-cells` - the set of active cell ids.
 *   * `:stable-active-cells` - the set of non-bursting active cells.
 *   * `:burst-cols` - the set of bursting column ids.
 */
org.nfrac.comportex.cells.select_active_cells = (function org$nfrac$comportex$cells$select_active_cells(a_cols,cell_exc,depth,threshold,dominance_margin){
var cols = cljs.core.seq(a_cols);
var col_ac = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);
var ac = cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY);
var sac = cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY);
var b_cols = cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY);
while(true){
var temp__4651__auto__ = cljs.core.first(cols);
if(cljs.core.truth_(temp__4651__auto__)){
var col = temp__4651__auto__;
var this_ac = org.nfrac.comportex.cells.column_active_cells(col,cell_exc,depth,threshold,dominance_margin);
var bursting_QMARK_ = (depth === cljs.core.count(this_ac));
var G__34608 = cljs.core.next(cols);
var G__34609 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(col_ac,col,this_ac);
var G__34610 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,ac,this_ac);
var G__34611 = ((bursting_QMARK_)?sac:cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,sac,this_ac));
var G__34612 = ((bursting_QMARK_)?cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(b_cols,col):b_cols);
cols = G__34608;
col_ac = G__34609;
ac = G__34610;
sac = G__34611;
b_cols = G__34612;
continue;
} else {
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$by_DASH_column,cljs.core.persistent_BANG_(col_ac),cljs.core.cst$kw$active_DASH_cells,cljs.core.persistent_BANG_(ac),cljs.core.cst$kw$stable_DASH_active_DASH_cells,cljs.core.persistent_BANG_(sac),cljs.core.cst$kw$burst_DASH_cols,cljs.core.persistent_BANG_(b_cols)], null);
}
break;
}
});
/**
 * Returns [winner-cell [distal-seg-path exc] [apical-seg-path exc]]
 *   giving the best matching existing segments to learn on, if any.
 */
org.nfrac.comportex.cells.select_winner_cell = (function org$nfrac$comportex$cells$select_winner_cell(ac,distal_state,apical_state,distal_sg,apical_sg,spec,rng){
var full_matching_distal = cljs.core.cst$kw$matching_DASH_seg_DASH_paths.cljs$core$IFn$_invoke$arity$1(distal_state);
var full_matching_apical = cljs.core.cst$kw$matching_DASH_seg_DASH_paths.cljs$core$IFn$_invoke$arity$1(apical_state);
var d_full_matches = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(full_matching_distal,ac);
var a_full_matches = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(full_matching_apical,ac);
var distal_bits = cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(distal_state);
var apical_bits = cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(apical_state);
var min_distal = cljs.core.cst$kw$learn_DASH_threshold.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(spec));
var min_apical = cljs.core.cst$kw$learn_DASH_threshold.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(spec));
var best_partial_distal_segment = ((function (full_matching_distal,full_matching_apical,d_full_matches,a_full_matches,distal_bits,apical_bits,min_distal,min_apical){
return (function (cell_id){
var cell_segs = org.nfrac.comportex.protocols.cell_segments(distal_sg,cell_id);
var vec__34615 = org.nfrac.comportex.cells.best_matching_segment(cell_segs,distal_bits,min_distal,0.0);
var match_si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34615,(0),null);
var exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34615,(1),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34615,(2),null);
if(cljs.core.truth_(match_si)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cell_id,match_si),exc], null);
} else {
return null;
}
});})(full_matching_distal,full_matching_apical,d_full_matches,a_full_matches,distal_bits,apical_bits,min_distal,min_apical))
;
var best_partial_apical_segment = ((function (full_matching_distal,full_matching_apical,d_full_matches,a_full_matches,distal_bits,apical_bits,min_distal,min_apical,best_partial_distal_segment){
return (function (cell_id){
var cell_segs = org.nfrac.comportex.protocols.cell_segments(apical_sg,cell_id);
var vec__34616 = org.nfrac.comportex.cells.best_matching_segment(cell_segs,apical_bits,min_apical,0.0);
var match_si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34616,(0),null);
var exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34616,(1),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34616,(2),null);
if(cljs.core.truth_(match_si)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cell_id,match_si),exc], null);
} else {
return null;
}
});})(full_matching_distal,full_matching_apical,d_full_matches,a_full_matches,distal_bits,apical_bits,min_distal,min_apical,best_partial_distal_segment))
;
var distal_match_STAR_ = (((cljs.core.count(d_full_matches) === (1)))?cljs.core.first(d_full_matches):(((cljs.core.count(d_full_matches) > (1)))?null:(function (){var partial_matches = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(best_partial_distal_segment,ac);
if(cljs.core.seq(partial_matches)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.second,partial_matches);
} else {
return null;
}
})()
));
var apical_match = (cljs.core.truth_(distal_match_STAR_)?(function (){var cell_id = cljs.core.pop(cljs.core.first(distal_match_STAR_));
var temp__4651__auto__ = (full_matching_apical.cljs$core$IFn$_invoke$arity$1 ? full_matching_apical.cljs$core$IFn$_invoke$arity$1(cell_id) : full_matching_apical.call(null,cell_id));
if(cljs.core.truth_(temp__4651__auto__)){
var full_match = temp__4651__auto__;
return full_match;
} else {
return best_partial_apical_segment(cell_id);
}
})():(((cljs.core.count(d_full_matches) > (1)))?((cljs.core.seq(a_full_matches))?org.nfrac.comportex.util.rand_nth(rng,a_full_matches):(function (){var partial_matches = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(best_partial_apical_segment,ac);
if(cljs.core.seq(partial_matches)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.second,partial_matches);
} else {
return null;
}
})()):null
));
var distal_match = (cljs.core.truth_(distal_match_STAR_)?distal_match_STAR_:(((cljs.core.count(d_full_matches) > (1)))?(function (){var cell_id = (cljs.core.truth_(apical_match)?cljs.core.pop(cljs.core.first((apical_match.cljs$core$IFn$_invoke$arity$0 ? apical_match.cljs$core$IFn$_invoke$arity$0() : apical_match.call(null)))):org.nfrac.comportex.util.rand_nth(rng,ac));
var match = (full_matching_distal.cljs$core$IFn$_invoke$arity$1 ? full_matching_distal.cljs$core$IFn$_invoke$arity$1(cell_id) : full_matching_distal.call(null,cell_id));
if(cljs.core.truth_(match)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("fully active distal, if any, should equal active cells"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$sym$match], 0)))].join('')));
}

return match;
})():null
));
var winner_cell = (cljs.core.truth_(distal_match)?cljs.core.pop(cljs.core.first(distal_match)):org.nfrac.comportex.util.rand_nth(rng,ac)
);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [winner_cell,distal_match,apical_match], null);
});
/**
 * Returns keys / nested keys
 * 
 *   * `:col-winners` - maps column id to winning cell id;
 *   * `:winner-seg :distal` - maps cell id to [seg-path exc] for a lateral segment;
 *   * `:winner-seg :apical` - maps cell id to [seg-path exc] for an apical segment;
 * 
 *   These :winner-seg maps contain only the winning cell ids for which an
 *   existing segment matches sufficiently to be learning. Otherwise, a
 *   new (effectively new) segment will be grown.
 */
org.nfrac.comportex.cells.select_winner_cells = (function org$nfrac$comportex$cells$select_winner_cells(col_ac,distal_state,apical_state,learn_state,distal_sg,apical_sg,spec,rng,newly_engaged_QMARK_){
var reset_QMARK_ = cljs.core.empty_QMARK_(cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(distal_state));
var prior_col_winners = (cljs.core.truth_(newly_engaged_QMARK_)?null:cljs.core.cst$kw$col_DASH_winners.cljs$core$IFn$_invoke$arity$1(learn_state));
var col_ac__$1 = col_ac;
var col_winners = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);
var winning_distal = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);
var winning_apical = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);
var rng__$1 = rng;
while(true){
var temp__4651__auto__ = cljs.core.first(col_ac__$1);
if(cljs.core.truth_(temp__4651__auto__)){
var vec__34621 = temp__4651__auto__;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34621,(0),null);
var ac = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34621,(1),null);
if(reset_QMARK_){
var G__34624 = cljs.core.next(col_ac__$1);
var G__34625 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(col_winners,col,cljs.core.first(ac));
var G__34626 = winning_distal;
var G__34627 = winning_apical;
var G__34628 = rng__$1;
col_ac__$1 = G__34624;
col_winners = G__34625;
winning_distal = G__34626;
winning_apical = G__34627;
rng__$1 = G__34628;
continue;
} else {
var prior_winner = cljs.core.get.cljs$core$IFn$_invoke$arity$2(prior_col_winners,col);
var ac__$1 = (cljs.core.truth_((function (){var and__4670__auto__ = prior_winner;
if(cljs.core.truth_(and__4670__auto__)){
return cljs.core.some(((function (col_ac__$1,col_winners,winning_distal,winning_apical,rng__$1,and__4670__auto__,prior_winner,vec__34621,col,ac,temp__4651__auto__,reset_QMARK_,prior_col_winners){
return (function (p1__34617_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__34617_SHARP_,prior_winner);
});})(col_ac__$1,col_winners,winning_distal,winning_apical,rng__$1,and__4670__auto__,prior_winner,vec__34621,col,ac,temp__4651__auto__,reset_QMARK_,prior_col_winners))
,ac);
} else {
return and__4670__auto__;
}
})())?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [prior_winner], null):ac);
var vec__34622 = clojure.test.check.random.split(rng__$1);
var rng_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34622,(0),null);
var rng__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34622,(1),null);
var vec__34623 = org.nfrac.comportex.cells.select_winner_cell(ac__$1,distal_state,apical_state,distal_sg,apical_sg,spec,rng_STAR_);
var winner = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34623,(0),null);
var dmatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34623,(1),null);
var amatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34623,(2),null);
var G__34629 = cljs.core.next(col_ac__$1);
var G__34630 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(col_winners,col,winner);
var G__34631 = (cljs.core.truth_(dmatch)?cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(winning_distal,winner,dmatch):winning_distal);
var G__34632 = (cljs.core.truth_(amatch)?cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(winning_apical,winner,amatch):winning_apical);
var G__34633 = rng__$2;
col_ac__$1 = G__34629;
col_winners = G__34630;
winning_distal = G__34631;
winning_apical = G__34632;
rng__$1 = G__34633;
continue;
}
} else {
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$col_DASH_winners,cljs.core.persistent_BANG_(col_winners),cljs.core.cst$kw$winner_DASH_seg,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$distal,cljs.core.persistent_BANG_(winning_distal),cljs.core.cst$kw$apical,cljs.core.persistent_BANG_(winning_apical)], null)], null);
}
break;
}
});
/**
 * Returns a segment index on the cell at which to grow a new segment,
 *   together with any existing synapses at that index. It may refer to
 *   the end of the existing vector to append to it, or it may refer to
 *   an existing segment that is to be culled before the new one
 *   grows. If the maximum number of segments has been reached, an
 *   existing one is chosen to be replaced based on having the fewest
 *   connected synapses, or fewest synapses to break ties.
 */
org.nfrac.comportex.cells.new_segment_id = (function org$nfrac$comportex$cells$new_segment_id(segs,pcon,max_segs,max_syns){
var segs__$1 = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.seq,segs);
if((cljs.core.count(segs__$1) >= max_segs)){
var si = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.min_key,((function (segs__$1){
return (function (si){
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(segs__$1,si);
var n_conn = org.nfrac.comportex.util.count_filter(((function (syns,segs__$1){
return (function (p1__34634_SHARP_){
return (p1__34634_SHARP_ >= pcon);
});})(syns,segs__$1))
,cljs.core.vals(syns));
return (((n_conn * max_syns) + cljs.core.count(syns)) + (si / cljs.core.count(segs__$1)));
});})(segs__$1))
,cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(segs__$1)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(segs__$1,si)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.count(segs__$1),null], null);
}
});
/**
 * Returns a collection of up to n ids chosen from the learnable
 *   source bits. May be less than `n` if the random samples have
 *   duplicates or some already exist on the segment, or if there are
 *   fewer than `n` learnable cells.
 */
org.nfrac.comportex.cells.segment_new_synapse_source_ids = (function org$nfrac$comportex$cells$segment_new_synapse_source_ids(seg,learnable_bits_vec,n,rng){
if(cljs.core.seq(learnable_bits_vec)){
return cljs.core.remove.cljs$core$IFn$_invoke$arity$2(seg,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.sample(rng,n,learnable_bits_vec)));
} else {
return null;
}
});
/**
 * Given that an additional `grow-n` synapses will be added, checks if
 *   the segment will exceed the maximum allowed number of synapses, and
 *   if so, returns a list of synapse source ids to remove. These are the
 *   ones with lowest permanence.
 */
org.nfrac.comportex.cells.segment_excess_synapse_source_ids = (function org$nfrac$comportex$cells$segment_excess_synapse_source_ids(syns,grow_n,max_syns){
var total = (cljs.core.count(syns) + grow_n);
var excess = (total - max_syns);
if((excess > (0))){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.take.cljs$core$IFn$_invoke$arity$2(excess,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.val,syns)));
} else {
return null;
}
});
/**
 * To punish segments which predicted activation on cells which did
 *   not become active. Ignores any which are still predictive.  Returns
 *   a sequence of SegUpdate records.
 */
org.nfrac.comportex.cells.segment_punishments = (function org$nfrac$comportex$cells$segment_punishments(distal_sg,prior_pc,pc,ac,prior_bits,pcon,stimulus_th){
var bad_cells = clojure.set.difference.cljs$core$IFn$_invoke$arity$variadic(prior_pc,pc,cljs.core.array_seq([ac], 0));
var iter__5454__auto__ = ((function (bad_cells){
return (function org$nfrac$comportex$cells$segment_punishments_$_iter__34646(s__34647){
return (new cljs.core.LazySeq(null,((function (bad_cells){
return (function (){
var s__34647__$1 = s__34647;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__34647__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var cell_id = cljs.core.first(xs__5201__auto__);
var cell_segs = org.nfrac.comportex.protocols.cell_segments(distal_sg,cell_id);
var iterys__5450__auto__ = ((function (s__34647__$1,cell_segs,cell_id,xs__5201__auto__,temp__4653__auto__,bad_cells){
return (function org$nfrac$comportex$cells$segment_punishments_$_iter__34646_$_iter__34648(s__34649){
return (new cljs.core.LazySeq(null,((function (s__34647__$1,cell_segs,cell_id,xs__5201__auto__,temp__4653__auto__,bad_cells){
return (function (){
var s__34649__$1 = s__34649;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__34649__$1);
if(temp__4653__auto____$1){
var s__34649__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__34649__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__34649__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__34651 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__34650 = (0);
while(true){
if((i__34650 < size__5453__auto__)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__34650);
var seg_path = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cell_id,si);
cljs.core.chunk_append(b__34651,org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4(seg_path,cljs.core.cst$kw$punish,null,null));

var G__34657 = (i__34650 + (1));
i__34650 = G__34657;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__34651),org$nfrac$comportex$cells$segment_punishments_$_iter__34646_$_iter__34648(cljs.core.chunk_rest(s__34649__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__34651),null);
}
} else {
var si = cljs.core.first(s__34649__$2);
var seg_path = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cell_id,si);
return cljs.core.cons(org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4(seg_path,cljs.core.cst$kw$punish,null,null),org$nfrac$comportex$cells$segment_punishments_$_iter__34646_$_iter__34648(cljs.core.rest(s__34649__$2)));
}
} else {
return null;
}
break;
}
});})(s__34647__$1,cell_segs,cell_id,xs__5201__auto__,temp__4653__auto__,bad_cells))
,null,null));
});})(s__34647__$1,cell_segs,cell_id,xs__5201__auto__,temp__4653__auto__,bad_cells))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(org.nfrac.comportex.cells.cell_active_segments(cell_segs,prior_bits,stimulus_th,pcon)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$cells$segment_punishments_$_iter__34646(cljs.core.rest(s__34647__$1)));
} else {
var G__34658 = cljs.core.rest(s__34647__$1);
s__34647__$1 = G__34658;
continue;
}
} else {
return null;
}
break;
}
});})(bad_cells))
,null,null));
});})(bad_cells))
;
return iter__5454__auto__(bad_cells);
});
/**
 * Takes the learning `cells` and maps each to a SegUpdate record,
 *   which includes the segment path to learn on, together with lists of
 *   any synapse sources to add or remove. Any matching segments to learn
 *   on are given as `matching-segs`, mapping cell ids to `[seg-path
 *   exc]`. If this is missing for a cell then a new segment will be
 *   grown, perhaps replacing an existing one.
 * 
 *   Note that ''cell-ids'' here may also refer to columns in a proximal
 *   synapse graph, where the convention is [col 0]. Everything else is
 *   the same since proximal synapses graphs can also have multiple
 *   segments [col 0 seg-idx].
 */
org.nfrac.comportex.cells.learning_updates = (function org$nfrac$comportex$cells$learning_updates(cells,matching_segs,sg,learnable_bits,rng,p__34659){
var map__34666 = p__34659;
var map__34666__$1 = ((((!((map__34666 == null)))?((((map__34666.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34666.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__34666):map__34666);
var pcon = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34666__$1,cljs.core.cst$kw$perm_DASH_connected);
var min_act = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34666__$1,cljs.core.cst$kw$learn_DASH_threshold);
var new_syns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34666__$1,cljs.core.cst$kw$new_DASH_synapse_DASH_count);
var max_syns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34666__$1,cljs.core.cst$kw$max_DASH_synapse_DASH_count);
var max_segs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34666__$1,cljs.core.cst$kw$max_DASH_segments);
var learnable_bits__$1 = cljs.core.vec(learnable_bits);
var cells__$1 = cljs.core.seq(cells);
var m = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);
var rng__$1 = rng;
while(true){
var temp__4651__auto__ = cljs.core.first(cells__$1);
if(cljs.core.truth_(temp__4651__auto__)){
var cell_id = temp__4651__auto__;
var vec__34668 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(matching_segs,cell_id);
var matching_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34668,(0),null);
var exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34668,(1),null);
var new_segment_QMARK_ = cljs.core.not(matching_path);
var cell_segs = org.nfrac.comportex.protocols.cell_segments(sg,cell_id);
var vec__34669 = ((new_segment_QMARK_)?org.nfrac.comportex.cells.new_segment_id(cell_segs,pcon,max_segs,max_syns):null);
var new_si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34669,(0),null);
var replaced_syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34669,(1),null);
var seg = ((new_segment_QMARK_)?cljs.core.PersistentArrayMap.EMPTY:(function (){var vec__34671 = matching_path;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34671,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34671,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34671,(2),null);
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cell_segs,si);
})());
var grow_n = (function (){var x__5013__auto__ = (new_syns - (function (){var or__4682__auto__ = exc;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return (0);
}
})());
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
var vec__34670 = clojure.test.check.random.split(rng__$1);
var rng_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34670,(0),null);
var rng__$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34670,(1),null);
var grow_source_ids = org.nfrac.comportex.cells.segment_new_synapse_source_ids(seg,learnable_bits__$1,grow_n,rng_STAR_);
var die_source_ids = ((new_segment_QMARK_)?cljs.core.keys(replaced_syns):org.nfrac.comportex.cells.segment_excess_synapse_source_ids(seg,grow_n,max_syns));
var seg_path = ((new_segment_QMARK_)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cell_id,new_si):matching_path);
var G__34672 = cljs.core.next(cells__$1);
var G__34673 = (((new_segment_QMARK_) && ((cljs.core.count(grow_source_ids) < min_act)))?m:cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,cell_id,org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4(seg_path,cljs.core.cst$kw$learn,grow_source_ids,die_source_ids)));
var G__34674 = rng__$2;
cells__$1 = G__34672;
m = G__34673;
rng__$1 = G__34674;
continue;
} else {
return cljs.core.persistent_BANG_(m);
}
break;
}
});
org.nfrac.comportex.cells.learn_distal = (function org$nfrac$comportex$cells$learn_distal(sg,distal_state,cells,matching_segs,dspec,rng){
var learning = org.nfrac.comportex.cells.learning_updates(cells,matching_segs,sg,cljs.core.cst$kw$learnable_DASH_bits.cljs$core$IFn$_invoke$arity$1(distal_state),rng,dspec);
var new_sg = ((cljs.core.seq(learning))?org.nfrac.comportex.protocols.bulk_learn(sg,cljs.core.vals(learning),cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(distal_state),cljs.core.cst$kw$perm_DASH_inc.cljs$core$IFn$_invoke$arity$1(dspec),cljs.core.cst$kw$perm_DASH_dec.cljs$core$IFn$_invoke$arity$1(dspec),cljs.core.cst$kw$perm_DASH_init.cljs$core$IFn$_invoke$arity$1(dspec)):sg);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_sg,learning], null);
});
org.nfrac.comportex.cells.punish_distal = (function org$nfrac$comportex$cells$punish_distal(sg,distal_state,prior_distal_state,prior_active_cells,dspec){
var punishments = org.nfrac.comportex.cells.segment_punishments(sg,cljs.core.cst$kw$pred_DASH_cells.cljs$core$IFn$_invoke$arity$1(prior_distal_state),cljs.core.cst$kw$pred_DASH_cells.cljs$core$IFn$_invoke$arity$1(distal_state),prior_active_cells,cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(prior_distal_state),cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(dspec),cljs.core.cst$kw$stimulus_DASH_threshold.cljs$core$IFn$_invoke$arity$1(dspec));
var new_sg = (cljs.core.truth_(punishments)?org.nfrac.comportex.protocols.bulk_learn(sg,punishments,cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(prior_distal_state),cljs.core.cst$kw$perm_DASH_inc.cljs$core$IFn$_invoke$arity$1(dspec),cljs.core.cst$kw$perm_DASH_punish.cljs$core$IFn$_invoke$arity$1(dspec),cljs.core.cst$kw$perm_DASH_init.cljs$core$IFn$_invoke$arity$1(dspec)):sg);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_sg,punishments], null);
});
org.nfrac.comportex.cells.layer_learn_lateral = (function org$nfrac$comportex$cells$layer_learn_lateral(this$,cells,matching_segs){
var sg = cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(this$);
var dstate = cljs.core.cst$kw$distal_DASH_state.cljs$core$IFn$_invoke$arity$1(this$);
var dspec = cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(this$));
var vec__34677 = clojure.test.check.random.split(cljs.core.cst$kw$rng.cljs$core$IFn$_invoke$arity$1(this$));
var rng_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34677,(0),null);
var rng = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34677,(1),null);
var vec__34678 = org.nfrac.comportex.cells.learn_distal(sg,dstate,cells,matching_segs,dspec,rng_STAR_);
var new_sg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34678,(0),null);
var learning = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34678,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.cst$kw$rng,rng,cljs.core.array_seq([cljs.core.cst$kw$learn_DASH_state,cljs.core.assoc_in(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$learning,cljs.core.cst$kw$distal], null),learning),cljs.core.cst$kw$distal_DASH_sg,new_sg], 0));
});
org.nfrac.comportex.cells.layer_learn_apical = (function org$nfrac$comportex$cells$layer_learn_apical(this$,cells,matching_segs){
var sg = cljs.core.cst$kw$apical_DASH_sg.cljs$core$IFn$_invoke$arity$1(this$);
var dstate = cljs.core.cst$kw$apical_DASH_state.cljs$core$IFn$_invoke$arity$1(this$);
var dspec = cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(this$));
var vec__34681 = clojure.test.check.random.split(cljs.core.cst$kw$rng.cljs$core$IFn$_invoke$arity$1(this$));
var rng_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34681,(0),null);
var rng = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34681,(1),null);
var vec__34682 = org.nfrac.comportex.cells.learn_distal(sg,dstate,cells,matching_segs,dspec,rng_STAR_);
var new_sg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34682,(0),null);
var learning = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34682,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.cst$kw$rng,rng,cljs.core.array_seq([cljs.core.cst$kw$learn_DASH_state,cljs.core.assoc_in(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$learning,cljs.core.cst$kw$apical], null),learning),cljs.core.cst$kw$apical_DASH_sg,new_sg], 0));
});
org.nfrac.comportex.cells.layer_punish_lateral = (function org$nfrac$comportex$cells$layer_punish_lateral(this$){
var sg = cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(this$);
var dstate = cljs.core.cst$kw$distal_DASH_state.cljs$core$IFn$_invoke$arity$1(this$);
var pdstate = cljs.core.cst$kw$prior_DASH_distal_DASH_state.cljs$core$IFn$_invoke$arity$1(this$);
var prior_ac = cljs.core.cst$kw$prior_DASH_active_DASH_cells.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(this$));
var dspec = cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(this$));
var vec__34684 = org.nfrac.comportex.cells.punish_distal(sg,dstate,pdstate,prior_ac,dspec);
var new_sg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34684,(0),null);
var punishments = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34684,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.cst$kw$learn_DASH_state,cljs.core.assoc_in(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$punishments,cljs.core.cst$kw$distal], null),punishments),cljs.core.array_seq([cljs.core.cst$kw$distal_DASH_sg,new_sg], 0));
});
org.nfrac.comportex.cells.layer_punish_apical = (function org$nfrac$comportex$cells$layer_punish_apical(this$){
var sg = cljs.core.cst$kw$apical_DASH_sg.cljs$core$IFn$_invoke$arity$1(this$);
var dstate = cljs.core.cst$kw$apical_DASH_state.cljs$core$IFn$_invoke$arity$1(this$);
var pdstate = cljs.core.cst$kw$prior_DASH_apical_DASH_state.cljs$core$IFn$_invoke$arity$1(this$);
var prior_ac = cljs.core.cst$kw$prior_DASH_active_DASH_cells.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(this$));
var dspec = cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(this$));
var vec__34686 = org.nfrac.comportex.cells.punish_distal(sg,dstate,pdstate,prior_ac,dspec);
var new_sg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34686,(0),null);
var punishments = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34686,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.cst$kw$learn_DASH_state,cljs.core.assoc_in(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$punishments,cljs.core.cst$kw$apical], null),punishments),cljs.core.array_seq([cljs.core.cst$kw$apical_DASH_sg,new_sg], 0));
});
org.nfrac.comportex.cells.layer_learn_proximal = (function org$nfrac$comportex$cells$layer_learn_proximal(this$,cols){
var sg = cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(this$);
var state = cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(this$);
var pspec = cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(this$));
var min_prox = cljs.core.cst$kw$learn_DASH_threshold.cljs$core$IFn$_invoke$arity$1(pspec);
var higher_level_QMARK_ = (cljs.core.cst$kw$max_DASH_segments.cljs$core$IFn$_invoke$arity$1(pspec) > (1));
var active_bits = cljs.core.cst$kw$in_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(state);
var full_matching_segs = cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths.cljs$core$IFn$_invoke$arity$1(state);
var ids = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cols,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1((0)));
var matching_segs = cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (sg,state,pspec,min_prox,higher_level_QMARK_,active_bits,full_matching_segs,ids){
return (function (m,id){
var temp__4651__auto__ = (full_matching_segs.cljs$core$IFn$_invoke$arity$1 ? full_matching_segs.cljs$core$IFn$_invoke$arity$1(id) : full_matching_segs.call(null,id));
if(cljs.core.truth_(temp__4651__auto__)){
var full_match = temp__4651__auto__;
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,id,full_match);
} else {
var cell_segs = org.nfrac.comportex.protocols.cell_segments(sg,id);
var vec__34692 = org.nfrac.comportex.cells.best_matching_segment(cell_segs,active_bits,min_prox,0.0);
var match_si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34692,(0),null);
var exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34692,(1),null);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34692,(2),null);
if(cljs.core.truth_(match_si)){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(id,match_si),exc], null));
} else {
return m;
}
}
});})(sg,state,pspec,min_prox,higher_level_QMARK_,active_bits,full_matching_segs,ids))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),ids));
var vec__34691 = clojure.test.check.random.split(cljs.core.cst$kw$rng.cljs$core$IFn$_invoke$arity$1(this$));
var rng_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34691,(0),null);
var rng = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34691,(1),null);
var prox_learning = org.nfrac.comportex.cells.learning_updates(ids,matching_segs,sg,((higher_level_QMARK_)?cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(state):cljs.core.cst$kw$in_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(state)),rng_STAR_,pspec);
var psg = (function (){var G__34693 = sg;
var G__34693__$1 = ((cljs.core.seq(prox_learning))?org.nfrac.comportex.protocols.bulk_learn(G__34693,cljs.core.vals(prox_learning),cljs.core.cst$kw$in_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(state),cljs.core.cst$kw$perm_DASH_inc.cljs$core$IFn$_invoke$arity$1(pspec),cljs.core.cst$kw$perm_DASH_dec.cljs$core$IFn$_invoke$arity$1(pspec),cljs.core.cst$kw$perm_DASH_init.cljs$core$IFn$_invoke$arity$1(pspec)):G__34693);
if((cljs.core.seq(prox_learning)) && (cljs.core.seq(cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(state))) && ((cljs.core.cst$kw$perm_DASH_stable_DASH_inc.cljs$core$IFn$_invoke$arity$1(pspec) > cljs.core.cst$kw$perm_DASH_inc.cljs$core$IFn$_invoke$arity$1(pspec)))){
return org.nfrac.comportex.protocols.bulk_learn(G__34693__$1,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__34693,G__34693__$1,sg,state,pspec,min_prox,higher_level_QMARK_,active_bits,full_matching_segs,ids,matching_segs,vec__34691,rng_STAR_,rng,prox_learning){
return (function (p1__34687_SHARP_){
return org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(p1__34687_SHARP_),cljs.core.cst$kw$reinforce,null,null);
});})(G__34693,G__34693__$1,sg,state,pspec,min_prox,higher_level_QMARK_,active_bits,full_matching_segs,ids,matching_segs,vec__34691,rng_STAR_,rng,prox_learning))
,cljs.core.vals(prox_learning)),cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(state),(cljs.core.cst$kw$perm_DASH_stable_DASH_inc.cljs$core$IFn$_invoke$arity$1(pspec) - cljs.core.cst$kw$perm_DASH_inc.cljs$core$IFn$_invoke$arity$1(pspec)),cljs.core.cst$kw$perm_DASH_dec.cljs$core$IFn$_invoke$arity$1(pspec),cljs.core.cst$kw$perm_DASH_init.cljs$core$IFn$_invoke$arity$1(pspec));
} else {
return G__34693__$1;
}
})();
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.cst$kw$rng,rng,cljs.core.array_seq([cljs.core.cst$kw$learn_DASH_state,cljs.core.assoc_in(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$learning,cljs.core.cst$kw$proximal], null),prox_learning),cljs.core.cst$kw$proximal_DASH_sg,psg], 0));
});
org.nfrac.comportex.cells.update_inhibition_radius = (function org$nfrac$comportex$cells$update_inhibition_radius(layer){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(layer,cljs.core.cst$kw$inh_DASH_radius,org.nfrac.comportex.inhibition.inhibition_radius(cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(layer),cljs.core.cst$kw$topology.cljs$core$IFn$_invoke$arity$1(layer),cljs.core.cst$kw$input_DASH_topology.cljs$core$IFn$_invoke$arity$1(layer)));
});
org.nfrac.comportex.cells.decay_tp = (function org$nfrac$comportex$cells$decay_tp(tp_exc,fall){
return cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,id,exc){
var e = (exc - fall);
if((e > (0))){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,id,e);
} else {
return m;
}
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),tp_exc));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.cells.LayerActiveState = (function (in_ff_bits,in_stable_ff_bits,out_ff_bits,out_stable_ff_bits,col_overlaps,matching_ff_seg_paths,temporal_pooling_exc,active_cols,burst_cols,col_active_cells,active_cells,timestep,__meta,__extmap,__hash){
this.in_ff_bits = in_ff_bits;
this.in_stable_ff_bits = in_stable_ff_bits;
this.out_ff_bits = out_ff_bits;
this.out_stable_ff_bits = out_stable_ff_bits;
this.col_overlaps = col_overlaps;
this.matching_ff_seg_paths = matching_ff_seg_paths;
this.temporal_pooling_exc = temporal_pooling_exc;
this.active_cols = active_cols;
this.burst_cols = burst_cols;
this.col_active_cells = col_active_cells;
this.active_cells = active_cells;
this.timestep = timestep;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k34695,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__34697 = (((k34695 instanceof cljs.core.Keyword))?k34695.fqn:null);
switch (G__34697) {
case "burst-cols":
return self__.burst_cols;

break;
case "in-ff-bits":
return self__.in_ff_bits;

break;
case "timestep":
return self__.timestep;

break;
case "col-active-cells":
return self__.col_active_cells;

break;
case "matching-ff-seg-paths":
return self__.matching_ff_seg_paths;

break;
case "active-cols":
return self__.active_cols;

break;
case "col-overlaps":
return self__.col_overlaps;

break;
case "active-cells":
return self__.active_cells;

break;
case "temporal-pooling-exc":
return self__.temporal_pooling_exc;

break;
case "in-stable-ff-bits":
return self__.in_stable_ff_bits;

break;
case "out-stable-ff-bits":
return self__.out_stable_ff_bits;

break;
case "out-ff-bits":
return self__.out_ff_bits;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k34695,else__5299__auto__);

}
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.cells.LayerActiveState{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$in_DASH_ff_DASH_bits,self__.in_ff_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits,self__.in_stable_ff_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$out_DASH_ff_DASH_bits,self__.out_ff_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits,self__.out_stable_ff_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$col_DASH_overlaps,self__.col_overlaps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths,self__.matching_ff_seg_paths],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,self__.temporal_pooling_exc],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$active_DASH_cols,self__.active_cols],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$burst_DASH_cols,self__.burst_cols],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$col_DASH_active_DASH_cells,self__.col_active_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$active_DASH_cells,self__.active_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$timestep,self__.timestep],null))], null),self__.__extmap));
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__34694){
var self__ = this;
var G__34694__$1 = this;
return (new cljs.core.RecordIter((0),G__34694__$1,12,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$in_DASH_ff_DASH_bits,cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits,cljs.core.cst$kw$out_DASH_ff_DASH_bits,cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits,cljs.core.cst$kw$col_DASH_overlaps,cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths,cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,cljs.core.cst$kw$active_DASH_cols,cljs.core.cst$kw$burst_DASH_cols,cljs.core.cst$kw$col_DASH_active_DASH_cells,cljs.core.cst$kw$active_DASH_cells,cljs.core.cst$kw$timestep], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (12 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
var self__ = this;
var this__5291__auto____$1 = this;
var h__5117__auto__ = self__.__hash;
if(!((h__5117__auto__ == null))){
return h__5117__auto__;
} else {
var h__5117__auto____$1 = cljs.core.hash_imap(this__5291__auto____$1);
self__.__hash = h__5117__auto____$1;

return h__5117__auto____$1;
}
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
var self__ = this;
var this__5292__auto____$1 = this;
if(cljs.core.truth_((function (){var and__4670__auto__ = other__5293__auto__;
if(cljs.core.truth_(and__4670__auto__)){
var and__4670__auto____$1 = (this__5292__auto____$1.constructor === other__5293__auto__.constructor);
if(and__4670__auto____$1){
return cljs.core.equiv_map(this__5292__auto____$1,other__5293__auto__);
} else {
return and__4670__auto____$1;
}
} else {
return and__4670__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 12, [cljs.core.cst$kw$burst_DASH_cols,null,cljs.core.cst$kw$in_DASH_ff_DASH_bits,null,cljs.core.cst$kw$timestep,null,cljs.core.cst$kw$col_DASH_active_DASH_cells,null,cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths,null,cljs.core.cst$kw$active_DASH_cols,null,cljs.core.cst$kw$col_DASH_overlaps,null,cljs.core.cst$kw$active_DASH_cells,null,cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,null,cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits,null,cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits,null,cljs.core.cst$kw$out_DASH_ff_DASH_bits,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__34694){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__34698 = cljs.core.keyword_identical_QMARK_;
var expr__34699 = k__5304__auto__;
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$in_DASH_ff_DASH_bits,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$in_DASH_ff_DASH_bits,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(G__34694,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,G__34694,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$out_DASH_ff_DASH_bits,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$out_DASH_ff_DASH_bits,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,G__34694,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,G__34694,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$col_DASH_overlaps,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$col_DASH_overlaps,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,G__34694,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,G__34694,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,G__34694,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$active_DASH_cols,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$active_DASH_cols,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,G__34694,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$burst_DASH_cols,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$burst_DASH_cols,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,G__34694,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$col_DASH_active_DASH_cells,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$col_DASH_active_DASH_cells,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,G__34694,self__.active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$active_DASH_cells,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$active_DASH_cells,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,G__34694,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34698.cljs$core$IFn$_invoke$arity$2 ? pred__34698.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$timestep,expr__34699) : pred__34698.call(null,cljs.core.cst$kw$timestep,expr__34699)))){
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,G__34694,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__34694),null));
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
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$in_DASH_ff_DASH_bits,self__.in_ff_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits,self__.in_stable_ff_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$out_DASH_ff_DASH_bits,self__.out_ff_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits,self__.out_stable_ff_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$col_DASH_overlaps,self__.col_overlaps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths,self__.matching_ff_seg_paths],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,self__.temporal_pooling_exc],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$active_DASH_cols,self__.active_cols],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$burst_DASH_cols,self__.burst_cols],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$col_DASH_active_DASH_cells,self__.col_active_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$active_DASH_cells,self__.active_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$timestep,self__.timestep],null))], null),self__.__extmap));
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__34694){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.cells.LayerActiveState(self__.in_ff_bits,self__.in_stable_ff_bits,self__.out_ff_bits,self__.out_stable_ff_bits,self__.col_overlaps,self__.matching_ff_seg_paths,self__.temporal_pooling_exc,self__.active_cols,self__.burst_cols,self__.col_active_cells,self__.active_cells,self__.timestep,G__34694,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.cells.LayerActiveState.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.cells.LayerActiveState.getBasis = (function (){
return new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$in_DASH_ff_DASH_bits,cljs.core.cst$sym$in_DASH_stable_DASH_ff_DASH_bits,cljs.core.cst$sym$out_DASH_ff_DASH_bits,cljs.core.cst$sym$out_DASH_stable_DASH_ff_DASH_bits,cljs.core.cst$sym$col_DASH_overlaps,cljs.core.cst$sym$matching_DASH_ff_DASH_seg_DASH_paths,cljs.core.cst$sym$temporal_DASH_pooling_DASH_exc,cljs.core.cst$sym$active_DASH_cols,cljs.core.cst$sym$burst_DASH_cols,cljs.core.cst$sym$col_DASH_active_DASH_cells,cljs.core.cst$sym$active_DASH_cells,cljs.core.cst$sym$timestep], null);
});

org.nfrac.comportex.cells.LayerActiveState.cljs$lang$type = true;

org.nfrac.comportex.cells.LayerActiveState.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.cells/LayerActiveState");
});

org.nfrac.comportex.cells.LayerActiveState.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.cells/LayerActiveState");
});

org.nfrac.comportex.cells.__GT_LayerActiveState = (function org$nfrac$comportex$cells$__GT_LayerActiveState(in_ff_bits,in_stable_ff_bits,out_ff_bits,out_stable_ff_bits,col_overlaps,matching_ff_seg_paths,temporal_pooling_exc,active_cols,burst_cols,col_active_cells,active_cells,timestep){
return (new org.nfrac.comportex.cells.LayerActiveState(in_ff_bits,in_stable_ff_bits,out_ff_bits,out_stable_ff_bits,col_overlaps,matching_ff_seg_paths,temporal_pooling_exc,active_cols,burst_cols,col_active_cells,active_cells,timestep,null,null,null));
});

org.nfrac.comportex.cells.map__GT_LayerActiveState = (function org$nfrac$comportex$cells$map__GT_LayerActiveState(G__34696){
return (new org.nfrac.comportex.cells.LayerActiveState(cljs.core.cst$kw$in_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$out_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$active_DASH_cols.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$burst_DASH_cols.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$col_DASH_active_DASH_cells.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$active_DASH_cells.cljs$core$IFn$_invoke$arity$1(G__34696),cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(G__34696),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__34696,cljs.core.cst$kw$in_DASH_ff_DASH_bits,cljs.core.array_seq([cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits,cljs.core.cst$kw$out_DASH_ff_DASH_bits,cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits,cljs.core.cst$kw$col_DASH_overlaps,cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths,cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,cljs.core.cst$kw$active_DASH_cols,cljs.core.cst$kw$burst_DASH_cols,cljs.core.cst$kw$col_DASH_active_DASH_cells,cljs.core.cst$kw$active_DASH_cells,cljs.core.cst$kw$timestep], 0)),null));
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.cells.LayerLearnState = (function (col_winners,winner_seg,learning_cells,learning,punishments,prior_active_cells,timestep,__meta,__extmap,__hash){
this.col_winners = col_winners;
this.winner_seg = winner_seg;
this.learning_cells = learning_cells;
this.learning = learning;
this.punishments = punishments;
this.prior_active_cells = prior_active_cells;
this.timestep = timestep;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k34703,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__34705 = (((k34703 instanceof cljs.core.Keyword))?k34703.fqn:null);
switch (G__34705) {
case "col-winners":
return self__.col_winners;

break;
case "winner-seg":
return self__.winner_seg;

break;
case "learning-cells":
return self__.learning_cells;

break;
case "learning":
return self__.learning;

break;
case "punishments":
return self__.punishments;

break;
case "prior-active-cells":
return self__.prior_active_cells;

break;
case "timestep":
return self__.timestep;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k34703,else__5299__auto__);

}
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.cells.LayerLearnState{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$col_DASH_winners,self__.col_winners],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$winner_DASH_seg,self__.winner_seg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$learning_DASH_cells,self__.learning_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$learning,self__.learning],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$punishments,self__.punishments],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$prior_DASH_active_DASH_cells,self__.prior_active_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$timestep,self__.timestep],null))], null),self__.__extmap));
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__34702){
var self__ = this;
var G__34702__$1 = this;
return (new cljs.core.RecordIter((0),G__34702__$1,7,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$col_DASH_winners,cljs.core.cst$kw$winner_DASH_seg,cljs.core.cst$kw$learning_DASH_cells,cljs.core.cst$kw$learning,cljs.core.cst$kw$punishments,cljs.core.cst$kw$prior_DASH_active_DASH_cells,cljs.core.cst$kw$timestep], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,self__.winner_seg,self__.learning_cells,self__.learning,self__.punishments,self__.prior_active_cells,self__.timestep,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (7 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
var self__ = this;
var this__5291__auto____$1 = this;
var h__5117__auto__ = self__.__hash;
if(!((h__5117__auto__ == null))){
return h__5117__auto__;
} else {
var h__5117__auto____$1 = cljs.core.hash_imap(this__5291__auto____$1);
self__.__hash = h__5117__auto____$1;

return h__5117__auto____$1;
}
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
var self__ = this;
var this__5292__auto____$1 = this;
if(cljs.core.truth_((function (){var and__4670__auto__ = other__5293__auto__;
if(cljs.core.truth_(and__4670__auto__)){
var and__4670__auto____$1 = (this__5292__auto____$1.constructor === other__5293__auto__.constructor);
if(and__4670__auto____$1){
return cljs.core.equiv_map(this__5292__auto____$1,other__5293__auto__);
} else {
return and__4670__auto____$1;
}
} else {
return and__4670__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$prior_DASH_active_DASH_cells,null,cljs.core.cst$kw$punishments,null,cljs.core.cst$kw$timestep,null,cljs.core.cst$kw$winner_DASH_seg,null,cljs.core.cst$kw$learning,null,cljs.core.cst$kw$learning_DASH_cells,null,cljs.core.cst$kw$col_DASH_winners,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,self__.winner_seg,self__.learning_cells,self__.learning,self__.punishments,self__.prior_active_cells,self__.timestep,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__34702){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__34706 = cljs.core.keyword_identical_QMARK_;
var expr__34707 = k__5304__auto__;
if(cljs.core.truth_((pred__34706.cljs$core$IFn$_invoke$arity$2 ? pred__34706.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$col_DASH_winners,expr__34707) : pred__34706.call(null,cljs.core.cst$kw$col_DASH_winners,expr__34707)))){
return (new org.nfrac.comportex.cells.LayerLearnState(G__34702,self__.winner_seg,self__.learning_cells,self__.learning,self__.punishments,self__.prior_active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34706.cljs$core$IFn$_invoke$arity$2 ? pred__34706.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$winner_DASH_seg,expr__34707) : pred__34706.call(null,cljs.core.cst$kw$winner_DASH_seg,expr__34707)))){
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,G__34702,self__.learning_cells,self__.learning,self__.punishments,self__.prior_active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34706.cljs$core$IFn$_invoke$arity$2 ? pred__34706.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$learning_DASH_cells,expr__34707) : pred__34706.call(null,cljs.core.cst$kw$learning_DASH_cells,expr__34707)))){
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,self__.winner_seg,G__34702,self__.learning,self__.punishments,self__.prior_active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34706.cljs$core$IFn$_invoke$arity$2 ? pred__34706.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$learning,expr__34707) : pred__34706.call(null,cljs.core.cst$kw$learning,expr__34707)))){
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,self__.winner_seg,self__.learning_cells,G__34702,self__.punishments,self__.prior_active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34706.cljs$core$IFn$_invoke$arity$2 ? pred__34706.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$punishments,expr__34707) : pred__34706.call(null,cljs.core.cst$kw$punishments,expr__34707)))){
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,self__.winner_seg,self__.learning_cells,self__.learning,G__34702,self__.prior_active_cells,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34706.cljs$core$IFn$_invoke$arity$2 ? pred__34706.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$prior_DASH_active_DASH_cells,expr__34707) : pred__34706.call(null,cljs.core.cst$kw$prior_DASH_active_DASH_cells,expr__34707)))){
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,self__.winner_seg,self__.learning_cells,self__.learning,self__.punishments,G__34702,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34706.cljs$core$IFn$_invoke$arity$2 ? pred__34706.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$timestep,expr__34707) : pred__34706.call(null,cljs.core.cst$kw$timestep,expr__34707)))){
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,self__.winner_seg,self__.learning_cells,self__.learning,self__.punishments,self__.prior_active_cells,G__34702,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,self__.winner_seg,self__.learning_cells,self__.learning,self__.punishments,self__.prior_active_cells,self__.timestep,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__34702),null));
}
}
}
}
}
}
}
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$col_DASH_winners,self__.col_winners],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$winner_DASH_seg,self__.winner_seg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$learning_DASH_cells,self__.learning_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$learning,self__.learning],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$punishments,self__.punishments],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$prior_DASH_active_DASH_cells,self__.prior_active_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$timestep,self__.timestep],null))], null),self__.__extmap));
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__34702){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.cells.LayerLearnState(self__.col_winners,self__.winner_seg,self__.learning_cells,self__.learning,self__.punishments,self__.prior_active_cells,self__.timestep,G__34702,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.cells.LayerLearnState.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.cells.LayerLearnState.getBasis = (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$col_DASH_winners,cljs.core.cst$sym$winner_DASH_seg,cljs.core.cst$sym$learning_DASH_cells,cljs.core.cst$sym$learning,cljs.core.cst$sym$punishments,cljs.core.cst$sym$prior_DASH_active_DASH_cells,cljs.core.cst$sym$timestep], null);
});

org.nfrac.comportex.cells.LayerLearnState.cljs$lang$type = true;

org.nfrac.comportex.cells.LayerLearnState.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.cells/LayerLearnState");
});

org.nfrac.comportex.cells.LayerLearnState.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.cells/LayerLearnState");
});

org.nfrac.comportex.cells.__GT_LayerLearnState = (function org$nfrac$comportex$cells$__GT_LayerLearnState(col_winners,winner_seg,learning_cells,learning,punishments,prior_active_cells,timestep){
return (new org.nfrac.comportex.cells.LayerLearnState(col_winners,winner_seg,learning_cells,learning,punishments,prior_active_cells,timestep,null,null,null));
});

org.nfrac.comportex.cells.map__GT_LayerLearnState = (function org$nfrac$comportex$cells$map__GT_LayerLearnState(G__34704){
return (new org.nfrac.comportex.cells.LayerLearnState(cljs.core.cst$kw$col_DASH_winners.cljs$core$IFn$_invoke$arity$1(G__34704),cljs.core.cst$kw$winner_DASH_seg.cljs$core$IFn$_invoke$arity$1(G__34704),cljs.core.cst$kw$learning_DASH_cells.cljs$core$IFn$_invoke$arity$1(G__34704),cljs.core.cst$kw$learning.cljs$core$IFn$_invoke$arity$1(G__34704),cljs.core.cst$kw$punishments.cljs$core$IFn$_invoke$arity$1(G__34704),cljs.core.cst$kw$prior_DASH_active_DASH_cells.cljs$core$IFn$_invoke$arity$1(G__34704),cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(G__34704),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__34704,cljs.core.cst$kw$col_DASH_winners,cljs.core.array_seq([cljs.core.cst$kw$winner_DASH_seg,cljs.core.cst$kw$learning_DASH_cells,cljs.core.cst$kw$learning,cljs.core.cst$kw$punishments,cljs.core.cst$kw$prior_DASH_active_DASH_cells,cljs.core.cst$kw$timestep], 0)),null));
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.cells.LayerDistalState = (function (active_bits,learnable_bits,cell_exc,pred_cells,matching_seg_paths,timestep,__meta,__extmap,__hash){
this.active_bits = active_bits;
this.learnable_bits = learnable_bits;
this.cell_exc = cell_exc;
this.pred_cells = pred_cells;
this.matching_seg_paths = matching_seg_paths;
this.timestep = timestep;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k34711,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__34713 = (((k34711 instanceof cljs.core.Keyword))?k34711.fqn:null);
switch (G__34713) {
case "active-bits":
return self__.active_bits;

break;
case "learnable-bits":
return self__.learnable_bits;

break;
case "cell-exc":
return self__.cell_exc;

break;
case "pred-cells":
return self__.pred_cells;

break;
case "matching-seg-paths":
return self__.matching_seg_paths;

break;
case "timestep":
return self__.timestep;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k34711,else__5299__auto__);

}
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.cells.LayerDistalState{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$active_DASH_bits,self__.active_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$learnable_DASH_bits,self__.learnable_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$cell_DASH_exc,self__.cell_exc],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$pred_DASH_cells,self__.pred_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$matching_DASH_seg_DASH_paths,self__.matching_seg_paths],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$timestep,self__.timestep],null))], null),self__.__extmap));
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__34710){
var self__ = this;
var G__34710__$1 = this;
return (new cljs.core.RecordIter((0),G__34710__$1,6,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$active_DASH_bits,cljs.core.cst$kw$learnable_DASH_bits,cljs.core.cst$kw$cell_DASH_exc,cljs.core.cst$kw$pred_DASH_cells,cljs.core.cst$kw$matching_DASH_seg_DASH_paths,cljs.core.cst$kw$timestep], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.cells.LayerDistalState(self__.active_bits,self__.learnable_bits,self__.cell_exc,self__.pred_cells,self__.matching_seg_paths,self__.timestep,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (6 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
var self__ = this;
var this__5291__auto____$1 = this;
var h__5117__auto__ = self__.__hash;
if(!((h__5117__auto__ == null))){
return h__5117__auto__;
} else {
var h__5117__auto____$1 = cljs.core.hash_imap(this__5291__auto____$1);
self__.__hash = h__5117__auto____$1;

return h__5117__auto____$1;
}
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
var self__ = this;
var this__5292__auto____$1 = this;
if(cljs.core.truth_((function (){var and__4670__auto__ = other__5293__auto__;
if(cljs.core.truth_(and__4670__auto__)){
var and__4670__auto____$1 = (this__5292__auto____$1.constructor === other__5293__auto__.constructor);
if(and__4670__auto____$1){
return cljs.core.equiv_map(this__5292__auto____$1,other__5293__auto__);
} else {
return and__4670__auto____$1;
}
} else {
return and__4670__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$pred_DASH_cells,null,cljs.core.cst$kw$learnable_DASH_bits,null,cljs.core.cst$kw$active_DASH_bits,null,cljs.core.cst$kw$matching_DASH_seg_DASH_paths,null,cljs.core.cst$kw$timestep,null,cljs.core.cst$kw$cell_DASH_exc,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.cells.LayerDistalState(self__.active_bits,self__.learnable_bits,self__.cell_exc,self__.pred_cells,self__.matching_seg_paths,self__.timestep,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__34710){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__34714 = cljs.core.keyword_identical_QMARK_;
var expr__34715 = k__5304__auto__;
if(cljs.core.truth_((pred__34714.cljs$core$IFn$_invoke$arity$2 ? pred__34714.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$active_DASH_bits,expr__34715) : pred__34714.call(null,cljs.core.cst$kw$active_DASH_bits,expr__34715)))){
return (new org.nfrac.comportex.cells.LayerDistalState(G__34710,self__.learnable_bits,self__.cell_exc,self__.pred_cells,self__.matching_seg_paths,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34714.cljs$core$IFn$_invoke$arity$2 ? pred__34714.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$learnable_DASH_bits,expr__34715) : pred__34714.call(null,cljs.core.cst$kw$learnable_DASH_bits,expr__34715)))){
return (new org.nfrac.comportex.cells.LayerDistalState(self__.active_bits,G__34710,self__.cell_exc,self__.pred_cells,self__.matching_seg_paths,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34714.cljs$core$IFn$_invoke$arity$2 ? pred__34714.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cell_DASH_exc,expr__34715) : pred__34714.call(null,cljs.core.cst$kw$cell_DASH_exc,expr__34715)))){
return (new org.nfrac.comportex.cells.LayerDistalState(self__.active_bits,self__.learnable_bits,G__34710,self__.pred_cells,self__.matching_seg_paths,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34714.cljs$core$IFn$_invoke$arity$2 ? pred__34714.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$pred_DASH_cells,expr__34715) : pred__34714.call(null,cljs.core.cst$kw$pred_DASH_cells,expr__34715)))){
return (new org.nfrac.comportex.cells.LayerDistalState(self__.active_bits,self__.learnable_bits,self__.cell_exc,G__34710,self__.matching_seg_paths,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34714.cljs$core$IFn$_invoke$arity$2 ? pred__34714.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$matching_DASH_seg_DASH_paths,expr__34715) : pred__34714.call(null,cljs.core.cst$kw$matching_DASH_seg_DASH_paths,expr__34715)))){
return (new org.nfrac.comportex.cells.LayerDistalState(self__.active_bits,self__.learnable_bits,self__.cell_exc,self__.pred_cells,G__34710,self__.timestep,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34714.cljs$core$IFn$_invoke$arity$2 ? pred__34714.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$timestep,expr__34715) : pred__34714.call(null,cljs.core.cst$kw$timestep,expr__34715)))){
return (new org.nfrac.comportex.cells.LayerDistalState(self__.active_bits,self__.learnable_bits,self__.cell_exc,self__.pred_cells,self__.matching_seg_paths,G__34710,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.cells.LayerDistalState(self__.active_bits,self__.learnable_bits,self__.cell_exc,self__.pred_cells,self__.matching_seg_paths,self__.timestep,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__34710),null));
}
}
}
}
}
}
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$active_DASH_bits,self__.active_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$learnable_DASH_bits,self__.learnable_bits],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$cell_DASH_exc,self__.cell_exc],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$pred_DASH_cells,self__.pred_cells],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$matching_DASH_seg_DASH_paths,self__.matching_seg_paths],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$timestep,self__.timestep],null))], null),self__.__extmap));
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__34710){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.cells.LayerDistalState(self__.active_bits,self__.learnable_bits,self__.cell_exc,self__.pred_cells,self__.matching_seg_paths,self__.timestep,G__34710,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.cells.LayerDistalState.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.cells.LayerDistalState.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$active_DASH_bits,cljs.core.cst$sym$learnable_DASH_bits,cljs.core.cst$sym$cell_DASH_exc,cljs.core.cst$sym$pred_DASH_cells,cljs.core.cst$sym$matching_DASH_seg_DASH_paths,cljs.core.cst$sym$timestep], null);
});

org.nfrac.comportex.cells.LayerDistalState.cljs$lang$type = true;

org.nfrac.comportex.cells.LayerDistalState.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.cells/LayerDistalState");
});

org.nfrac.comportex.cells.LayerDistalState.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.cells/LayerDistalState");
});

org.nfrac.comportex.cells.__GT_LayerDistalState = (function org$nfrac$comportex$cells$__GT_LayerDistalState(active_bits,learnable_bits,cell_exc,pred_cells,matching_seg_paths,timestep){
return (new org.nfrac.comportex.cells.LayerDistalState(active_bits,learnable_bits,cell_exc,pred_cells,matching_seg_paths,timestep,null,null,null));
});

org.nfrac.comportex.cells.map__GT_LayerDistalState = (function org$nfrac$comportex$cells$map__GT_LayerDistalState(G__34712){
return (new org.nfrac.comportex.cells.LayerDistalState(cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(G__34712),cljs.core.cst$kw$learnable_DASH_bits.cljs$core$IFn$_invoke$arity$1(G__34712),cljs.core.cst$kw$cell_DASH_exc.cljs$core$IFn$_invoke$arity$1(G__34712),cljs.core.cst$kw$pred_DASH_cells.cljs$core$IFn$_invoke$arity$1(G__34712),cljs.core.cst$kw$matching_DASH_seg_DASH_paths.cljs$core$IFn$_invoke$arity$1(G__34712),cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(G__34712),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__34712,cljs.core.cst$kw$active_DASH_bits,cljs.core.array_seq([cljs.core.cst$kw$learnable_DASH_bits,cljs.core.cst$kw$cell_DASH_exc,cljs.core.cst$kw$pred_DASH_cells,cljs.core.cst$kw$matching_DASH_seg_DASH_paths,cljs.core.cst$kw$timestep], 0)),null));
});

org.nfrac.comportex.cells.empty_active_state = org.nfrac.comportex.cells.map__GT_LayerActiveState(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$active_DASH_cells,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$active_DASH_cols,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths,cljs.core.PersistentArrayMap.EMPTY], null));
org.nfrac.comportex.cells.empty_learn_state = org.nfrac.comportex.cells.map__GT_LayerLearnState(new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$col_DASH_winners,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$learning_DASH_cells,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$learning,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$punishments,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$prior_DASH_active_DASH_cells,cljs.core.PersistentHashSet.EMPTY], null));
org.nfrac.comportex.cells.empty_distal_state = org.nfrac.comportex.cells.map__GT_LayerDistalState(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$active_DASH_bits,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$cell_DASH_exc,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$pred_DASH_cells,cljs.core.PersistentHashSet.EMPTY,cljs.core.cst$kw$matching_DASH_seg_DASH_paths,cljs.core.PersistentArrayMap.EMPTY], null));
org.nfrac.comportex.cells.compute_active_state = (function org$nfrac$comportex$cells$compute_active_state(state,ff_bits,stable_ff_bits,proximal_sg,distal_state,apical_state,boosts,topology,inh_radius,spec){
var col_seg_overlaps = org.nfrac.comportex.protocols.excitations(proximal_sg,ff_bits,cljs.core.cst$kw$stimulus_DASH_threshold.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(spec)));
var vec__34721 = org.nfrac.comportex.cells.best_segment_excitations_and_paths(col_seg_overlaps);
var raw_col_exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34721,(0),null);
var ff_seg_paths = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34721,(1),null);
var col_exc = org.nfrac.comportex.columns.apply_overlap_boosting(raw_col_exc,boosts);
var tp_exc = cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc.cljs$core$IFn$_invoke$arity$1(state);
var d_a_cell_exc = (cljs.core.truth_(cljs.core.cst$kw$use_DASH_feedback_QMARK_.cljs$core$IFn$_invoke$arity$1(spec))?cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core._PLUS_,cljs.core.array_seq([cljs.core.cst$kw$cell_DASH_exc.cljs$core$IFn$_invoke$arity$1(distal_state),cljs.core.select_keys(cljs.core.cst$kw$cell_DASH_exc.cljs$core$IFn$_invoke$arity$1(apical_state),cljs.core.keys(cljs.core.cst$kw$cell_DASH_exc.cljs$core$IFn$_invoke$arity$1(distal_state)))], 0)):cljs.core.cst$kw$cell_DASH_exc.cljs$core$IFn$_invoke$arity$1(distal_state));
var abs_cell_exc = org.nfrac.comportex.cells.total_excitations(col_exc,tp_exc,d_a_cell_exc,cljs.core.cst$kw$distal_DASH_vs_DASH_proximal_DASH_weight.cljs$core$IFn$_invoke$arity$1(spec),cljs.core.cst$kw$spontaneous_DASH_activation_QMARK_.cljs$core$IFn$_invoke$arity$1(spec),cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(spec));
var a_cols = org.nfrac.comportex.cells.select_active_columns(org.nfrac.comportex.cells.best_by_column(abs_cell_exc),topology,cljs.core.cst$kw$activation_DASH_level.cljs$core$IFn$_invoke$arity$1(spec),inh_radius,spec);
var depth = cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(spec);
var map__34722 = org.nfrac.comportex.cells.select_active_cells(a_cols,cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core._PLUS_,cljs.core.array_seq([d_a_cell_exc,tp_exc], 0)),depth,cljs.core.cst$kw$stimulus_DASH_threshold.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(spec)),cljs.core.cst$kw$dominance_DASH_margin.cljs$core$IFn$_invoke$arity$1(spec));
var map__34722__$1 = ((((!((map__34722 == null)))?((((map__34722.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34722.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__34722):map__34722);
var col_ac = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34722__$1,cljs.core.cst$kw$by_DASH_column);
var ac = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34722__$1,cljs.core.cst$kw$active_DASH_cells);
var burst_cols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34722__$1,cljs.core.cst$kw$burst_DASH_cols);
var stable_ac = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34722__$1,cljs.core.cst$kw$stable_DASH_active_DASH_cells);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.cells.map__GT_LayerActiveState(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$burst_DASH_cols,cljs.core.cst$kw$in_DASH_ff_DASH_bits,cljs.core.cst$kw$timestep,cljs.core.cst$kw$col_DASH_active_DASH_cells,cljs.core.cst$kw$matching_DASH_ff_DASH_seg_DASH_paths,cljs.core.cst$kw$active_DASH_cols,cljs.core.cst$kw$col_DASH_overlaps,cljs.core.cst$kw$active_DASH_cells,cljs.core.cst$kw$in_DASH_stable_DASH_ff_DASH_bits,cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits,cljs.core.cst$kw$out_DASH_ff_DASH_bits],[burst_cols,ff_bits,(cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(state) + (1)),col_ac,ff_seg_paths,a_cols,raw_col_exc,ac,stable_ff_bits,cljs.core.set(org.nfrac.comportex.cells.cells__GT_bits(depth,stable_ac)),cljs.core.set(org.nfrac.comportex.cells.cells__GT_bits(depth,ac))])),abs_cell_exc], null);
});
org.nfrac.comportex.cells.compute_active_state_and_tp = (function org$nfrac$comportex$cells$compute_active_state_and_tp(state,ff_bits,stable_ff_bits,proximal_sg,distal_state,apical_state,boosts,topology,inh_radius,spec){
var higher_level_QMARK_ = (cljs.core.cst$kw$max_DASH_segments.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(spec)) > (1));
var engaged_QMARK_ = (!(higher_level_QMARK_)) || ((cljs.core.count(stable_ff_bits) >= (cljs.core.count(ff_bits) * cljs.core.cst$kw$stable_DASH_inbit_DASH_frac_DASH_threshold.cljs$core$IFn$_invoke$arity$1(spec))));
var newly_engaged_QMARK_ = (!(higher_level_QMARK_)) || ((engaged_QMARK_) && ((cljs.core.not(cljs.core.cst$kw$engaged_QMARK_.cljs$core$IFn$_invoke$arity$1(state))) || (cljs.core.empty_QMARK_(cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc.cljs$core$IFn$_invoke$arity$1(state)))));
var tp_exc = (function (){var G__34729 = ((newly_engaged_QMARK_)?cljs.core.PersistentArrayMap.EMPTY:cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc.cljs$core$IFn$_invoke$arity$1(state));
return org.nfrac.comportex.cells.decay_tp(G__34729,cljs.core.cst$kw$temporal_DASH_pooling_DASH_fall.cljs$core$IFn$_invoke$arity$1(spec));

})();
var activation_level = (function (){var base_level = cljs.core.cst$kw$activation_DASH_level.cljs$core$IFn$_invoke$arity$1(spec);
var prev_ncols = cljs.core.count(cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.keys(cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc.cljs$core$IFn$_invoke$arity$1(state)))));
var prev_level = (prev_ncols / org.nfrac.comportex.protocols.size(topology));
if((newly_engaged_QMARK_) || (!(engaged_QMARK_))){
return base_level;
} else {
var x__5020__auto__ = cljs.core.cst$kw$activation_DASH_level_DASH_max.cljs$core$IFn$_invoke$arity$1(spec);
var y__5021__auto__ = (prev_level + base_level);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
}
})();
var vec__34728 = org.nfrac.comportex.cells.compute_active_state(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(state,cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,tp_exc),ff_bits,stable_ff_bits,proximal_sg,distal_state,apical_state,boosts,topology,inh_radius,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec,cljs.core.cst$kw$activation_DASH_level,activation_level));
var next_state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34728,(0),null);
var abs_cell_exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34728,(1),null);
var ac = cljs.core.cst$kw$active_DASH_cells.cljs$core$IFn$_invoke$arity$1(next_state);
var next_tp_exc = ((higher_level_QMARK_)?(function (){var new_ac = ((newly_engaged_QMARK_)?ac:clojure.set.difference.cljs$core$IFn$_invoke$arity$2(ac,cljs.core.cst$kw$active_DASH_cells.cljs$core$IFn$_invoke$arity$1(state)));
var amp = cljs.core.cst$kw$temporal_DASH_pooling_DASH_amp.cljs$core$IFn$_invoke$arity$1(spec);
var max_exc = cljs.core.cst$kw$temporal_DASH_pooling_DASH_max_DASH_exc.cljs$core$IFn$_invoke$arity$1(spec);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.select_keys(tp_exc,ac),cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (new_ac,amp,max_exc,higher_level_QMARK_,engaged_QMARK_,newly_engaged_QMARK_,tp_exc,activation_level,vec__34728,next_state,abs_cell_exc,ac){
return (function (p__34730){
var vec__34731 = p__34730;
var cell = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34731,(0),null);
var exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34731,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cell,(function (){var x__5020__auto__ = (exc * amp);
var y__5021__auto__ = max_exc;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})()], null);
});})(new_ac,amp,max_exc,higher_level_QMARK_,engaged_QMARK_,newly_engaged_QMARK_,tp_exc,activation_level,vec__34728,next_state,abs_cell_exc,ac))
),cljs.core.select_keys(abs_cell_exc,new_ac));
})():cljs.core.PersistentArrayMap.EMPTY);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(next_state,cljs.core.cst$kw$engaged_QMARK_,engaged_QMARK_,cljs.core.array_seq([cljs.core.cst$kw$newly_DASH_engaged_QMARK_,newly_engaged_QMARK_,cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc,next_tp_exc], 0));
});
org.nfrac.comportex.cells.compute_distal_state = (function org$nfrac$comportex$cells$compute_distal_state(sg,active_bits,learnable_bits,dspec,t){
var seg_exc = org.nfrac.comportex.protocols.excitations(sg,active_bits,cljs.core.cst$kw$stimulus_DASH_threshold.cljs$core$IFn$_invoke$arity$1(dspec));
var vec__34733 = org.nfrac.comportex.cells.best_segment_excitations_and_paths(seg_exc);
var cell_exc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34733,(0),null);
var seg_paths = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34733,(1),null);
var pc = cljs.core.set(cljs.core.keys(cell_exc));
return org.nfrac.comportex.cells.map__GT_LayerDistalState(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$active_DASH_bits,cljs.core.set(active_bits),cljs.core.cst$kw$learnable_DASH_bits,cljs.core.set(learnable_bits),cljs.core.cst$kw$cell_DASH_exc,cell_exc,cljs.core.cst$kw$matching_DASH_seg_DASH_paths,seg_paths,cljs.core.cst$kw$pred_DASH_cells,pc,cljs.core.cst$kw$timestep,t], null));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {org.nfrac.comportex.protocols.PParameterised}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.nfrac.comportex.protocols.PFeedForward}
 * @implements {org.nfrac.comportex.protocols.PTemporal}
 * @implements {cljs.core.ICounted}
 * @implements {org.nfrac.comportex.protocols.PLayerOfCells}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {org.nfrac.comportex.protocols.PFeedBack}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {org.nfrac.comportex.protocols.PInterruptable}
 * @implements {org.nfrac.comportex.protocols.PTopological}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.cells.LayerOfCells = (function (spec,rng,topology,input_topology,inh_radius,boosts,active_duty_cycles,proximal_sg,distal_sg,apical_sg,state,distal_state,prior_distal_state,apical_state,prior_apical_state,learn_state,__meta,__extmap,__hash){
this.spec = spec;
this.rng = rng;
this.topology = topology;
this.input_topology = input_topology;
this.inh_radius = inh_radius;
this.boosts = boosts;
this.active_duty_cycles = active_duty_cycles;
this.proximal_sg = proximal_sg;
this.distal_sg = distal_sg;
this.apical_sg = apical_sg;
this.state = state;
this.distal_state = distal_state;
this.prior_distal_state = prior_distal_state;
this.apical_state = apical_state;
this.prior_apical_state = prior_apical_state;
this.learn_state = learn_state;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k34735,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__34737 = (((k34735 instanceof cljs.core.Keyword))?k34735.fqn:null);
switch (G__34737) {
case "rng":
return self__.rng;

break;
case "boosts":
return self__.boosts;

break;
case "inh-radius":
return self__.inh_radius;

break;
case "apical-state":
return self__.apical_state;

break;
case "distal-state":
return self__.distal_state;

break;
case "active-duty-cycles":
return self__.active_duty_cycles;

break;
case "learn-state":
return self__.learn_state;

break;
case "state":
return self__.state;

break;
case "proximal-sg":
return self__.proximal_sg;

break;
case "spec":
return self__.spec;

break;
case "distal-sg":
return self__.distal_sg;

break;
case "prior-distal-state":
return self__.prior_distal_state;

break;
case "input-topology":
return self__.input_topology;

break;
case "apical-sg":
return self__.apical_sg;

break;
case "prior-apical-state":
return self__.prior_apical_state;

break;
case "topology":
return self__.topology;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k34735,else__5299__auto__);

}
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.cst$kw$topology.cljs$core$IFn$_invoke$arity$1(this$__$1);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.cells.LayerOfCells{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$spec,self__.spec],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$rng,self__.rng],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topology,self__.topology],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$input_DASH_topology,self__.input_topology],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$inh_DASH_radius,self__.inh_radius],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$boosts,self__.boosts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$active_DASH_duty_DASH_cycles,self__.active_duty_cycles],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$proximal_DASH_sg,self__.proximal_sg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$distal_DASH_sg,self__.distal_sg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$apical_DASH_sg,self__.apical_sg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$state,self__.state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$distal_DASH_state,self__.distal_state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$prior_DASH_distal_DASH_state,self__.prior_distal_state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$apical_DASH_state,self__.apical_state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$prior_DASH_apical_DASH_state,self__.prior_apical_state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$learn_DASH_state,self__.learn_state],null))], null),self__.__extmap));
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__34734){
var self__ = this;
var G__34734__$1 = this;
return (new cljs.core.RecordIter((0),G__34734__$1,16,new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$spec,cljs.core.cst$kw$rng,cljs.core.cst$kw$topology,cljs.core.cst$kw$input_DASH_topology,cljs.core.cst$kw$inh_DASH_radius,cljs.core.cst$kw$boosts,cljs.core.cst$kw$active_DASH_duty_DASH_cycles,cljs.core.cst$kw$proximal_DASH_sg,cljs.core.cst$kw$distal_DASH_sg,cljs.core.cst$kw$apical_DASH_sg,cljs.core.cst$kw$state,cljs.core.cst$kw$distal_DASH_state,cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$apical_DASH_state,cljs.core.cst$kw$prior_DASH_apical_DASH_state,cljs.core.cst$kw$learn_DASH_state], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PInterruptable$ = true;

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PInterruptable$break$arity$2 = (function (this$,mode){
var self__ = this;
var this$__$1 = this;
var G__34738 = (((mode instanceof cljs.core.Keyword))?mode.fqn:null);
switch (G__34738) {
case "tm":
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$distal_DASH_state,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.cells.empty_distal_state,cljs.core.cst$kw$timestep,cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.state)));

break;
case "fb":
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$apical_DASH_state,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.cells.empty_distal_state,cljs.core.cst$kw$timestep,cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.state)));

break;
case "tp":
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(this$__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$state,cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc], null),cljs.core.empty);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(mode)].join('')));

}
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (16 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$ = true;

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$layer_activate$arity$3 = (function (this$,ff_bits,stable_ff_bits){
var self__ = this;
var this$__$1 = this;
var new_state = org.nfrac.comportex.cells.compute_active_state_and_tp(self__.state,ff_bits,stable_ff_bits,self__.proximal_sg,self__.distal_state,self__.apical_state,self__.boosts,self__.topology,self__.inh_radius,self__.spec);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$state,new_state);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$layer_depolarise$arity$4 = (function (this$,distal_ff_bits,apical_fb_bits,apical_fb_wc_bits){
var self__ = this;
var this$__$1 = this;
var depth = cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(self__.spec);
var widths = org.nfrac.comportex.cells.distal_sources_widths(self__.spec);
var distal_bits = org.nfrac.comportex.util.align_indices.cljs$core$IFn$_invoke$arity$2(widths,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(cljs.core.cst$kw$lateral_DASH_synapses_QMARK_.cljs$core$IFn$_invoke$arity$1(self__.spec))?cljs.core.cst$kw$out_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(self__.state):cljs.core.PersistentVector.EMPTY),distal_ff_bits], null));
var wc = cljs.core.vals(cljs.core.cst$kw$col_DASH_winners.cljs$core$IFn$_invoke$arity$1(self__.learn_state));
var distal_lbits = org.nfrac.comportex.util.align_indices.cljs$core$IFn$_invoke$arity$2(widths,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(cljs.core.cst$kw$lateral_DASH_synapses_QMARK_.cljs$core$IFn$_invoke$arity$1(self__.spec))?org.nfrac.comportex.cells.cells__GT_bits(depth,wc):cljs.core.PersistentVector.EMPTY),distal_ff_bits], null));
var apical_bits = (cljs.core.truth_(cljs.core.cst$kw$use_DASH_feedback_QMARK_.cljs$core$IFn$_invoke$arity$1(self__.spec))?apical_fb_bits:cljs.core.PersistentVector.EMPTY);
var apical_lbits = (cljs.core.truth_(cljs.core.cst$kw$use_DASH_feedback_QMARK_.cljs$core$IFn$_invoke$arity$1(self__.spec))?apical_fb_wc_bits:cljs.core.PersistentVector.EMPTY);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(this$__$1,cljs.core.cst$kw$prior_DASH_distal_DASH_state,self__.distal_state,cljs.core.array_seq([cljs.core.cst$kw$prior_DASH_apical_DASH_state,self__.apical_state,cljs.core.cst$kw$distal_DASH_state,org.nfrac.comportex.cells.compute_distal_state(self__.distal_sg,distal_bits,distal_lbits,cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(self__.spec),cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.state)),cljs.core.cst$kw$apical_DASH_state,org.nfrac.comportex.cells.compute_distal_state(self__.apical_sg,apical_bits,apical_lbits,cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(self__.spec),cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.state))], 0));
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$temporal_pooling_cells$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(cljs.core.cst$kw$engaged_QMARK_.cljs$core$IFn$_invoke$arity$1(self__.state))){
return cljs.core.keys(cljs.core.cst$kw$temporal_DASH_pooling_DASH_exc.cljs$core$IFn$_invoke$arity$1(self__.state));
} else {
return null;
}
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$bursting_columns$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$burst_DASH_cols.cljs$core$IFn$_invoke$arity$1(self__.state);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$winner_cells$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.set(cljs.core.vals(cljs.core.cst$kw$col_DASH_winners.cljs$core$IFn$_invoke$arity$1(self__.learn_state)));
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$layer_learn$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var a_cols = cljs.core.cst$kw$active_DASH_cols.cljs$core$IFn$_invoke$arity$1(self__.state);
var col_ac = cljs.core.cst$kw$col_DASH_active_DASH_cells.cljs$core$IFn$_invoke$arity$1(self__.state);
var newly_engaged_QMARK_ = cljs.core.cst$kw$newly_DASH_engaged_QMARK_.cljs$core$IFn$_invoke$arity$1(self__.state);
var vec__34739 = clojure.test.check.random.split(self__.rng);
var rng_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34739,(0),null);
var rng__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34739,(1),null);
var map__34740 = org.nfrac.comportex.cells.select_winner_cells(col_ac,self__.distal_state,self__.apical_state,self__.learn_state,self__.distal_sg,self__.apical_sg,self__.spec,rng_STAR_,newly_engaged_QMARK_);
var map__34740__$1 = ((((!((map__34740 == null)))?((((map__34740.cljs$lang$protocol_mask$partition0$ & (64))) || (map__34740.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__34740):map__34740);
var col_winners = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34740__$1,cljs.core.cst$kw$col_DASH_winners);
var winner_seg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34740__$1,cljs.core.cst$kw$winner_DASH_seg);
var old_winners = cljs.core.vals(cljs.core.cst$kw$col_DASH_winners.cljs$core$IFn$_invoke$arity$1(self__.learn_state));
var new_winners = cljs.core.vals(col_winners);
var lc = (cljs.core.truth_(newly_engaged_QMARK_)?new_winners:cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(old_winners),new_winners));
var depth = cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(self__.spec);
var out_wc_bits = cljs.core.set(org.nfrac.comportex.cells.cells__GT_bits(depth,cljs.core.vals(col_winners)));
var timestep = cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.state);
var G__34742 = this$__$1;
var G__34742__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__34742,cljs.core.cst$kw$learn_DASH_state,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.nfrac.comportex.cells.empty_learn_state,cljs.core.cst$kw$col_DASH_winners,col_winners,cljs.core.array_seq([cljs.core.cst$kw$winner_DASH_seg,winner_seg,cljs.core.cst$kw$learning_DASH_cells,lc,cljs.core.cst$kw$out_DASH_wc_DASH_bits,out_wc_bits,cljs.core.cst$kw$prior_DASH_active_DASH_cells,cljs.core.cst$kw$active_DASH_cells.cljs$core$IFn$_invoke$arity$1(self__.state),cljs.core.cst$kw$timestep,timestep], 0)),cljs.core.array_seq([cljs.core.cst$kw$rng,rng__$1], 0))
;
var G__34742__$2 = (cljs.core.truth_(cljs.core.cst$kw$learn_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(self__.spec)))?org.nfrac.comportex.cells.layer_learn_lateral(G__34742__$1,lc,cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(winner_seg)):G__34742__$1);
var G__34742__$3 = (cljs.core.truth_(cljs.core.cst$kw$learn_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(self__.spec)))?org.nfrac.comportex.cells.layer_learn_apical(G__34742__$2,lc,cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(winner_seg)):G__34742__$2);
var G__34742__$4 = (cljs.core.truth_(cljs.core.cst$kw$punish_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(self__.spec)))?org.nfrac.comportex.cells.layer_punish_lateral(G__34742__$3):G__34742__$3);
var G__34742__$5 = (cljs.core.truth_(cljs.core.cst$kw$punish_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(self__.spec)))?org.nfrac.comportex.cells.layer_punish_apical(G__34742__$4):G__34742__$4);
var G__34742__$6 = (cljs.core.truth_((function (){var and__4670__auto__ = cljs.core.cst$kw$engaged_QMARK_.cljs$core$IFn$_invoke$arity$1(self__.state);
if(cljs.core.truth_(and__4670__auto__)){
return cljs.core.cst$kw$learn_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(self__.spec));
} else {
return and__4670__auto__;
}
})())?org.nfrac.comportex.cells.layer_learn_proximal(G__34742__$5,a_cols):G__34742__$5);
var G__34742__$7 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$5(G__34742__$6,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$active_DASH_duty_DASH_cycles], null),org.nfrac.comportex.columns.update_duty_cycles,cljs.core.cst$kw$active_DASH_cols.cljs$core$IFn$_invoke$arity$1(self__.state),cljs.core.cst$kw$duty_DASH_cycle_DASH_period.cljs$core$IFn$_invoke$arity$1(self__.spec))
;
var G__34742__$8 = (((cljs.core.mod(timestep,cljs.core.cst$kw$boost_DASH_active_DASH_every.cljs$core$IFn$_invoke$arity$1(self__.spec)) === (0)))?org.nfrac.comportex.columns.boost_active(G__34742__$7):G__34742__$7);
if((cljs.core.mod(timestep,cljs.core.cst$kw$inh_DASH_radius_DASH_every.cljs$core$IFn$_invoke$arity$1(self__.spec)) === (0))){
return org.nfrac.comportex.cells.update_inhibition_radius(G__34742__$8);
} else {
return G__34742__$8;
}
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$layer_depth$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(self__.spec);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$active_columns$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$active_DASH_cols.cljs$core$IFn$_invoke$arity$1(self__.state);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$prior_predictive_cells$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var t_1 = (cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.state) - (1));
if((t_1 === cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.prior_distal_state))){
return cljs.core.cst$kw$pred_DASH_cells.cljs$core$IFn$_invoke$arity$1(self__.prior_distal_state);
} else {
if((t_1 === cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.distal_state))){
return cljs.core.cst$kw$pred_DASH_cells.cljs$core$IFn$_invoke$arity$1(self__.distal_state);
} else {
return null;
}
}
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$active_cells$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$active_DASH_cells.cljs$core$IFn$_invoke$arity$1(self__.state);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PLayerOfCells$predictive_cells$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if((cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.state) === cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.distal_state))){
return cljs.core.cst$kw$pred_DASH_cells.cljs$core$IFn$_invoke$arity$1(self__.distal_state);
} else {
return null;
}
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
var self__ = this;
var this__5291__auto____$1 = this;
var h__5117__auto__ = self__.__hash;
if(!((h__5117__auto__ == null))){
return h__5117__auto__;
} else {
var h__5117__auto____$1 = cljs.core.hash_imap(this__5291__auto____$1);
self__.__hash = h__5117__auto____$1;

return h__5117__auto____$1;
}
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
var self__ = this;
var this__5292__auto____$1 = this;
if(cljs.core.truth_((function (){var and__4670__auto__ = other__5293__auto__;
if(cljs.core.truth_(and__4670__auto__)){
var and__4670__auto____$1 = (this__5292__auto____$1.constructor === other__5293__auto__.constructor);
if(and__4670__auto____$1){
return cljs.core.equiv_map(this__5292__auto____$1,other__5293__auto__);
} else {
return and__4670__auto____$1;
}
} else {
return and__4670__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PParameterised$ = true;

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PParameterised$params$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.spec;
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PFeedForward$ = true;

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PFeedForward$ff_topology$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return org.nfrac.comportex.topology.make_topology(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.dims_of(this$__$1),org.nfrac.comportex.protocols.layer_depth(this$__$1)));
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PFeedForward$bits_value$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$out_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(self__.state);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PFeedForward$stable_bits_value$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$out_DASH_stable_DASH_ff_DASH_bits.cljs$core$IFn$_invoke$arity$1(self__.state);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PFeedForward$source_of_bit$arity$2 = (function (_,i){
var self__ = this;
var ___$1 = this;
return org.nfrac.comportex.cells.id__GT_cell(cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(self__.spec),i);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PTemporal$ = true;

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PTemporal$timestep$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(self__.state);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 16, [cljs.core.cst$kw$rng,null,cljs.core.cst$kw$boosts,null,cljs.core.cst$kw$inh_DASH_radius,null,cljs.core.cst$kw$apical_DASH_state,null,cljs.core.cst$kw$distal_DASH_state,null,cljs.core.cst$kw$active_DASH_duty_DASH_cycles,null,cljs.core.cst$kw$learn_DASH_state,null,cljs.core.cst$kw$state,null,cljs.core.cst$kw$proximal_DASH_sg,null,cljs.core.cst$kw$spec,null,cljs.core.cst$kw$distal_DASH_sg,null,cljs.core.cst$kw$prior_DASH_distal_DASH_state,null,cljs.core.cst$kw$input_DASH_topology,null,cljs.core.cst$kw$apical_DASH_sg,null,cljs.core.cst$kw$prior_DASH_apical_DASH_state,null,cljs.core.cst$kw$topology,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PFeedBack$ = true;

org.nfrac.comportex.cells.LayerOfCells.prototype.org$nfrac$comportex$protocols$PFeedBack$wc_bits_value$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.cst$kw$out_DASH_wc_DASH_bits.cljs$core$IFn$_invoke$arity$1(self__.learn_state);
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__34734){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__34743 = cljs.core.keyword_identical_QMARK_;
var expr__34744 = k__5304__auto__;
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$spec,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$spec,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(G__34734,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$rng,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$rng,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,G__34734,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topology,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$topology,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,G__34734,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$input_DASH_topology,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$input_DASH_topology,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,G__34734,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$inh_DASH_radius,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$inh_DASH_radius,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,G__34734,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$boosts,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$boosts,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,G__34734,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$active_DASH_duty_DASH_cycles,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$active_DASH_duty_DASH_cycles,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,G__34734,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$proximal_DASH_sg,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$proximal_DASH_sg,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,G__34734,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$distal_DASH_sg,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$distal_DASH_sg,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,G__34734,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$apical_DASH_sg,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$apical_DASH_sg,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,G__34734,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$state,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$state,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,G__34734,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$distal_DASH_state,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$distal_DASH_state,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,G__34734,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$prior_DASH_distal_DASH_state,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$prior_DASH_distal_DASH_state,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,G__34734,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$apical_DASH_state,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$apical_DASH_state,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,G__34734,self__.prior_apical_state,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$prior_DASH_apical_DASH_state,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$prior_DASH_apical_DASH_state,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,G__34734,self__.learn_state,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34743.cljs$core$IFn$_invoke$arity$2 ? pred__34743.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$learn_DASH_state,expr__34744) : pred__34743.call(null,cljs.core.cst$kw$learn_DASH_state,expr__34744)))){
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,G__34734,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__34734),null));
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
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$spec,self__.spec],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$rng,self__.rng],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topology,self__.topology],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$input_DASH_topology,self__.input_topology],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$inh_DASH_radius,self__.inh_radius],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$boosts,self__.boosts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$active_DASH_duty_DASH_cycles,self__.active_duty_cycles],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$proximal_DASH_sg,self__.proximal_sg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$distal_DASH_sg,self__.distal_sg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$apical_DASH_sg,self__.apical_sg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$state,self__.state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$distal_DASH_state,self__.distal_state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$prior_DASH_distal_DASH_state,self__.prior_distal_state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$apical_DASH_state,self__.apical_state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$prior_DASH_apical_DASH_state,self__.prior_apical_state],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$learn_DASH_state,self__.learn_state],null))], null),self__.__extmap));
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__34734){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.cells.LayerOfCells(self__.spec,self__.rng,self__.topology,self__.input_topology,self__.inh_radius,self__.boosts,self__.active_duty_cycles,self__.proximal_sg,self__.distal_sg,self__.apical_sg,self__.state,self__.distal_state,self__.prior_distal_state,self__.apical_state,self__.prior_apical_state,self__.learn_state,G__34734,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.cells.LayerOfCells.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.cells.LayerOfCells.getBasis = (function (){
return new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$spec,cljs.core.cst$sym$rng,cljs.core.cst$sym$topology,cljs.core.cst$sym$input_DASH_topology,cljs.core.cst$sym$inh_DASH_radius,cljs.core.cst$sym$boosts,cljs.core.cst$sym$active_DASH_duty_DASH_cycles,cljs.core.cst$sym$proximal_DASH_sg,cljs.core.cst$sym$distal_DASH_sg,cljs.core.cst$sym$apical_DASH_sg,cljs.core.cst$sym$state,cljs.core.cst$sym$distal_DASH_state,cljs.core.cst$sym$prior_DASH_distal_DASH_state,cljs.core.cst$sym$apical_DASH_state,cljs.core.cst$sym$prior_DASH_apical_DASH_state,cljs.core.cst$sym$learn_DASH_state], null);
});

org.nfrac.comportex.cells.LayerOfCells.cljs$lang$type = true;

org.nfrac.comportex.cells.LayerOfCells.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.cells/LayerOfCells");
});

org.nfrac.comportex.cells.LayerOfCells.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.cells/LayerOfCells");
});

org.nfrac.comportex.cells.__GT_LayerOfCells = (function org$nfrac$comportex$cells$__GT_LayerOfCells(spec,rng,topology,input_topology,inh_radius,boosts,active_duty_cycles,proximal_sg,distal_sg,apical_sg,state,distal_state,prior_distal_state,apical_state,prior_apical_state,learn_state){
return (new org.nfrac.comportex.cells.LayerOfCells(spec,rng,topology,input_topology,inh_radius,boosts,active_duty_cycles,proximal_sg,distal_sg,apical_sg,state,distal_state,prior_distal_state,apical_state,prior_apical_state,learn_state,null,null,null));
});

org.nfrac.comportex.cells.map__GT_LayerOfCells = (function org$nfrac$comportex$cells$map__GT_LayerOfCells(G__34736){
return (new org.nfrac.comportex.cells.LayerOfCells(cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$rng.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$topology.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$input_DASH_topology.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$inh_DASH_radius.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$boosts.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$apical_DASH_sg.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$state.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$distal_DASH_state.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$prior_DASH_distal_DASH_state.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$apical_DASH_state.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$prior_DASH_apical_DASH_state.cljs$core$IFn$_invoke$arity$1(G__34736),cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(G__34736),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__34736,cljs.core.cst$kw$spec,cljs.core.array_seq([cljs.core.cst$kw$rng,cljs.core.cst$kw$topology,cljs.core.cst$kw$input_DASH_topology,cljs.core.cst$kw$inh_DASH_radius,cljs.core.cst$kw$boosts,cljs.core.cst$kw$active_DASH_duty_DASH_cycles,cljs.core.cst$kw$proximal_DASH_sg,cljs.core.cst$kw$distal_DASH_sg,cljs.core.cst$kw$apical_DASH_sg,cljs.core.cst$kw$state,cljs.core.cst$kw$distal_DASH_state,cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$apical_DASH_state,cljs.core.cst$kw$prior_DASH_apical_DASH_state,cljs.core.cst$kw$learn_DASH_state], 0)),null));
});

org.nfrac.comportex.cells.init_layer_state = (function org$nfrac$comportex$cells$init_layer_state(spec){
var spec__$1 = org.nfrac.comportex.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([org.nfrac.comportex.cells.parameter_defaults,spec], 0));
var input_topo = org.nfrac.comportex.topology.make_topology(cljs.core.cst$kw$input_DASH_dimensions.cljs$core$IFn$_invoke$arity$1(spec__$1));
var col_topo = org.nfrac.comportex.topology.make_topology(cljs.core.cst$kw$column_DASH_dimensions.cljs$core$IFn$_invoke$arity$1(spec__$1));
var n_cols = org.nfrac.comportex.protocols.size(col_topo);
var depth = cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(spec__$1);
var n_distal = ((cljs.core.truth_(cljs.core.cst$kw$lateral_DASH_synapses_QMARK_.cljs$core$IFn$_invoke$arity$1(spec__$1))?(n_cols * depth):(0)) + cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,cljs.core.cst$kw$distal_DASH_motor_DASH_dimensions.cljs$core$IFn$_invoke$arity$1(spec__$1)));
var n_apical = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,cljs.core.cst$kw$distal_DASH_topdown_DASH_dimensions.cljs$core$IFn$_invoke$arity$1(spec__$1));
var vec__34749 = clojure.test.check.random.split(clojure.test.check.random.make_random.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$random_DASH_seed.cljs$core$IFn$_invoke$arity$1(spec__$1)));
var rng = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34749,(0),null);
var rng_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34749,(1),null);
var col_prox_syns = org.nfrac.comportex.columns.uniform_ff_synapses(col_topo,input_topo,spec__$1,rng_STAR_);
var proximal_sg = org.nfrac.comportex.synapses.col_segs_synapse_graph(col_prox_syns,n_cols,cljs.core.cst$kw$max_DASH_segments.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(spec__$1)),org.nfrac.comportex.protocols.size(input_topo),cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(spec__$1)),false);
var distal_sg = org.nfrac.comportex.synapses.cell_segs_synapse_graph(n_cols,depth,cljs.core.cst$kw$max_DASH_segments.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(spec__$1)),n_distal,cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(spec__$1)),true);
var apical_sg = org.nfrac.comportex.synapses.cell_segs_synapse_graph(n_cols,depth,cljs.core.cst$kw$max_DASH_segments.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(spec__$1)),n_apical,cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(spec__$1)),true);
var state = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.cells.empty_active_state,cljs.core.cst$kw$timestep,(0));
var learn_state = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.cells.empty_learn_state,cljs.core.cst$kw$timestep,(0));
var distal_state = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.cells.empty_distal_state,cljs.core.cst$kw$timestep,(0));
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$rng,cljs.core.cst$kw$boosts,cljs.core.cst$kw$inh_DASH_radius,cljs.core.cst$kw$distal_DASH_state,cljs.core.cst$kw$active_DASH_duty_DASH_cycles,cljs.core.cst$kw$learn_DASH_state,cljs.core.cst$kw$state,cljs.core.cst$kw$proximal_DASH_sg,cljs.core.cst$kw$spec,cljs.core.cst$kw$distal_DASH_sg,cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$input_DASH_topology,cljs.core.cst$kw$apical_DASH_sg,cljs.core.cst$kw$topology],[rng,cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(n_cols,1.0)),(1),distal_state,cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(n_cols,0.0)),learn_state,state,proximal_sg,spec__$1,distal_sg,distal_state,input_topo,apical_sg,col_topo]);
});
org.nfrac.comportex.cells.layer_of_cells = (function org$nfrac$comportex$cells$layer_of_cells(spec){
return org.nfrac.comportex.cells.update_inhibition_radius(org.nfrac.comportex.cells.map__GT_LayerOfCells(org.nfrac.comportex.cells.init_layer_state(spec)));
});
