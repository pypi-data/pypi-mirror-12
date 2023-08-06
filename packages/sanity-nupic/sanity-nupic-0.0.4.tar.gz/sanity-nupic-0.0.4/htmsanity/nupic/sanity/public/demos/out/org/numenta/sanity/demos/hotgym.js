// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.hotgym');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('org.nfrac.comportex.cells');
goog.require('reagent.core');
goog.require('org.numenta.sanity.viz_canvas');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.protocols');
goog.require('goog.net.XhrIo');
goog.require('org.numenta.sanity.comportex.data');
goog.require('org.nfrac.comportex.topology');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
goog.require('cljs.reader');
org.numenta.sanity.demos.hotgym.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.hotgym.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.hotgym.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
/**
 * By example:
 *   Given 7.2, returns (7, 8, 6, 9, 5, 10, ...),
 *   Given 7.7, returns (8, 7, 9, 6, 10, 5, ...)
 */
org.numenta.sanity.demos.hotgym.middle_out_range = (function org$numenta$sanity$demos$hotgym$middle_out_range(v){
var start = cljs.core.long$(Math.round(v));
var rounded_down_QMARK_ = (v > start);
var up = cljs.core.iterate(cljs.core.inc,start);
var down = cljs.core.iterate(cljs.core.dec,start);
if(rounded_down_QMARK_){
return cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(down,cljs.core.drop.cljs$core$IFn$_invoke$arity$2((1),up));
} else {
return cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(up,cljs.core.drop.cljs$core$IFn$_invoke$arity$2((1),down));
}
});
org.numenta.sanity.demos.hotgym.multiples_within_radius = (function org$numenta$sanity$demos$hotgym$multiples_within_radius(center,radius,multiples_of){
var lower_bound = (center - radius);
var upper_bound = (center + radius);
return cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(((function (lower_bound,upper_bound){
return (function (p1__64421_SHARP_){
return ((lower_bound <= p1__64421_SHARP_)) && ((p1__64421_SHARP_ <= upper_bound));
});})(lower_bound,upper_bound))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,multiples_of),org.numenta.sanity.demos.hotgym.middle_out_range((center / multiples_of))));
});
/**
 * Move items from `from` to `coll` until its size reaches `max-size`
 *   or we run out of items. Specifically supports sets and maps, which don't
 *   always grow when an item is added.
 */
org.numenta.sanity.demos.hotgym.into_bounded = (function org$numenta$sanity$demos$hotgym$into_bounded(coll,max_size,from){
var coll__$1 = coll;
var from__$1 = from;
while(true){
var n_remaining = (max_size - cljs.core.count(coll__$1));
if(cljs.core.truth_((function (){var and__4670__auto__ = (n_remaining > (0));
if(and__4670__auto__){
return cljs.core.not_empty(from__$1);
} else {
return and__4670__auto__;
}
})())){
var vec__64423 = cljs.core.split_at(n_remaining,from__$1);
var taken = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64423,(0),null);
var untaken = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64423,(1),null);
var G__64424 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(coll__$1,taken);
var G__64425 = untaken;
coll__$1 = G__64424;
from__$1 = G__64425;
continue;
} else {
return coll__$1;
}
break;
}
});
/**
 * Place a bit in the center.
 *   Distribute bits around the center until we've used half of the remainder.
 *   Double the density. Distribute again until we've used half of the remainder.
 *   Double the density. ...
 *   Continue until all active bits are distributed or all bits are active.
 * 
 *   Strategically choose bit positions so that the intersections between
 *   various ranges will select the same bits.
 */
org.numenta.sanity.demos.hotgym.sampled_window = (function org$numenta$sanity$demos$hotgym$sampled_window(center,n_bits,target_n_active,bit_radius){
var chosen = cljs.core.PersistentHashSet.fromArray([center], true);
var density = (((target_n_active - cljs.core.count(chosen)) / ((2) * bit_radius)) / (2));
while(true){
var remaining = (target_n_active - cljs.core.count(chosen));
var multiples_of = cljs.core.long$(((1) / density));
if(((remaining > (0))) && ((multiples_of > (0)))){
var half_remaining = cljs.core.quot(remaining,(2));
var n_take = (((cljs.core.odd_QMARK_(remaining)) || (cljs.core.odd_QMARK_(half_remaining)))?remaining:half_remaining);
var G__64427 = org.numenta.sanity.demos.hotgym.into_bounded(chosen,(n_take + cljs.core.count(chosen)),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (chosen,density,half_remaining,n_take,remaining,multiples_of){
return (function (p1__64426_SHARP_){
return (((0) <= p1__64426_SHARP_)) && ((p1__64426_SHARP_ <= (n_bits - (1))));
});})(chosen,density,half_remaining,n_take,remaining,multiples_of))
,org.numenta.sanity.demos.hotgym.multiples_within_radius(center,bit_radius,multiples_of)));
var G__64428 = (density * (2));
chosen = G__64427;
density = G__64428;
continue;
} else {
return chosen;
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.nfrac.comportex.protocols.PEncoder}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {org.nfrac.comportex.protocols.PTopological}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.demos.hotgym.SamplingLinearEncoder = (function (topo,n_active,lower,upper,radius,__meta,__extmap,__hash){
this.topo = topo;
this.n_active = n_active;
this.lower = lower;
this.upper = upper;
this.radius = radius;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k64430,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__64432 = (((k64430 instanceof cljs.core.Keyword))?k64430.fqn:null);
switch (G__64432) {
case "topo":
return self__.topo;

break;
case "n-active":
return self__.n_active;

break;
case "lower":
return self__.lower;

break;
case "upper":
return self__.upper;

break;
case "radius":
return self__.radius;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k64430,else__5299__auto__);

}
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.topo;
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.numenta.sanity.demos.hotgym.SamplingLinearEncoder{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$lower,self__.lower],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$upper,self__.upper],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$radius,self__.radius],null))], null),self__.__extmap));
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__64429){
var self__ = this;
var G__64429__$1 = this;
return (new cljs.core.RecordIter((0),G__64429__$1,5,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$lower,cljs.core.cst$kw$upper,cljs.core.cst$kw$radius], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.radius,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (5 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$ = true;

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(x)){
var n_bits = org.nfrac.comportex.protocols.size(self__.topo);
var domain_width = (self__.upper - self__.lower);
var center = cljs.core.long$(((((function (){var x__5020__auto__ = (function (){var x__5013__auto__ = x;
var y__5014__auto__ = self__.lower;
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
var y__5021__auto__ = self__.upper;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})() - self__.lower) / domain_width) * n_bits));
var bit_radius = (self__.radius * (org.nfrac.comportex.protocols.size(self__.topo) / domain_width));
return org.numenta.sanity.demos.hotgym.sampled_window(center,n_bits,self__.n_active,bit_radius);
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(null);
}
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$decode$arity$3 = (function (this$,bit_votes,n){
var self__ = this;
var this$__$1 = this;
var span = (self__.upper - self__.lower);
var values = cljs.core.range.cljs$core$IFn$_invoke$arity$3(self__.lower,self__.upper,(((((5) < span)) && ((span < (250))))?(1):(span / (50))));
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,org.nfrac.comportex.encoders.decode_by_brute_force(this$__$1,values,bit_votes));
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$upper,null,cljs.core.cst$kw$topo,null,cljs.core.cst$kw$radius,null,cljs.core.cst$kw$lower,null,cljs.core.cst$kw$n_DASH_active,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.radius,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__64429){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__64433 = cljs.core.keyword_identical_QMARK_;
var expr__64434 = k__5304__auto__;
if(cljs.core.truth_((pred__64433.cljs$core$IFn$_invoke$arity$2 ? pred__64433.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__64434) : pred__64433.call(null,cljs.core.cst$kw$topo,expr__64434)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(G__64429,self__.n_active,self__.lower,self__.upper,self__.radius,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__64433.cljs$core$IFn$_invoke$arity$2 ? pred__64433.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__64434) : pred__64433.call(null,cljs.core.cst$kw$n_DASH_active,expr__64434)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,G__64429,self__.lower,self__.upper,self__.radius,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__64433.cljs$core$IFn$_invoke$arity$2 ? pred__64433.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$lower,expr__64434) : pred__64433.call(null,cljs.core.cst$kw$lower,expr__64434)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,G__64429,self__.upper,self__.radius,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__64433.cljs$core$IFn$_invoke$arity$2 ? pred__64433.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$upper,expr__64434) : pred__64433.call(null,cljs.core.cst$kw$upper,expr__64434)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,G__64429,self__.radius,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__64433.cljs$core$IFn$_invoke$arity$2 ? pred__64433.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$radius,expr__64434) : pred__64433.call(null,cljs.core.cst$kw$radius,expr__64434)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,G__64429,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.radius,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__64429),null));
}
}
}
}
}
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$lower,self__.lower],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$upper,self__.upper],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$radius,self__.radius],null))], null),self__.__extmap));
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__64429){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.radius,G__64429,self__.__extmap,self__.__hash));
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$topo,cljs.core.cst$sym$n_DASH_active,cljs.core.cst$sym$lower,cljs.core.cst$sym$upper,cljs.core.cst$sym$radius], null);
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.cljs$lang$type = true;

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.demos.hotgym/SamplingLinearEncoder");
});

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.numenta.sanity.demos.hotgym/SamplingLinearEncoder");
});

org.numenta.sanity.demos.hotgym.__GT_SamplingLinearEncoder = (function org$numenta$sanity$demos$hotgym$__GT_SamplingLinearEncoder(topo,n_active,lower,upper,radius){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(topo,n_active,lower,upper,radius,null,null,null));
});

org.numenta.sanity.demos.hotgym.map__GT_SamplingLinearEncoder = (function org$numenta$sanity$demos$hotgym$map__GT_SamplingLinearEncoder(G__64431){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__64431),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__64431),cljs.core.cst$kw$lower.cljs$core$IFn$_invoke$arity$1(G__64431),cljs.core.cst$kw$upper.cljs$core$IFn$_invoke$arity$1(G__64431),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(G__64431),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__64431,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$lower,cljs.core.cst$kw$upper,cljs.core.cst$kw$radius], 0)),null));
});

/**
 * A linear encoder that samples the surrounding radius, rather than
 *   activating all of it. Sampling density decreases as distance increases.
 * 
 *   * `dimensions` is the size of the encoder in bits along one or more
 *  dimensions, a vector e.g. [500].
 * 
 *   * `n-active` is the number of bits to be active.
 * 
 *   * `[lower upper]` gives the numeric range to cover. The input number
 *  will be clamped to this range.
 * 
 *   * `radius` describes the range to sample.
 * 
 *   Recommendations:
 * 
 *   * `lower` and `upper` should be `radius` below and above the actual
 *  lower and upper bounds. Otherwise the radius will extend off the
 *  number line, creating representations that behave a bit differently
 *  from the rest.
 */
org.numenta.sanity.demos.hotgym.sampling_linear_encoder = (function org$numenta$sanity$demos$hotgym$sampling_linear_encoder(dimensions,n_active,p__64437,radius){
var vec__64439 = p__64437;
var lower = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64439,(0),null);
var upper = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64439,(1),null);
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.numenta.sanity.demos.hotgym.map__GT_SamplingLinearEncoder(new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$n_DASH_active,n_active,cljs.core.cst$kw$lower,lower,cljs.core.cst$kw$upper,upper,cljs.core.cst$kw$radius,radius], null));
});
org.numenta.sanity.demos.hotgym.anomaly_score = (function org$numenta$sanity$demos$hotgym$anomaly_score(p__64440){
var map__64443 = p__64440;
var map__64443__$1 = ((((!((map__64443 == null)))?((((map__64443.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64443.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64443):map__64443);
var active = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64443__$1,cljs.core.cst$kw$active);
var active_predicted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64443__$1,cljs.core.cst$kw$active_DASH_predicted);
var total = (active + active_predicted);
if((total > (0))){
return (active / total);
} else {
return (1);
}
});
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_ = (function org$numenta$sanity$demos$hotgym$consider_consumption_BANG_(step__GT_scores,step,consumption){
var candidate = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$consumption,consumption], null);
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var model_id = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(step);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["consider-future",model_id,candidate,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,candidate,out_c,model_id){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,candidate,out_c,model_id){
return (function (state_64483){
var state_val_64484 = (state_64483[(1)]);
if((state_val_64484 === (1))){
var state_64483__$1 = state_64483;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_64483__$1,(2),out_c);
} else {
if((state_val_64484 === (2))){
var inst_64472 = (state_64483[(2)]);
var inst_64473 = cljs.core.seq(inst_64472);
var inst_64474 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_64473,(0),null);
var inst_64475 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_64474,(0),null);
var inst_64476 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_64474,(1),null);
var inst_64477 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_64478 = [step,consumption];
var inst_64479 = (new cljs.core.PersistentVector(null,2,(5),inst_64477,inst_64478,null));
var inst_64480 = org.numenta.sanity.demos.hotgym.anomaly_score(inst_64476);
var inst_64481 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(step__GT_scores,cljs.core.assoc_in,inst_64479,inst_64480);
var state_64483__$1 = (function (){var statearr_64485 = state_64483;
(statearr_64485[(7)] = inst_64475);

return statearr_64485;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_64483__$1,inst_64481);
} else {
return null;
}
}
});})(c__35961__auto__,candidate,out_c,model_id))
;
return ((function (switch__35847__auto__,c__35961__auto__,candidate,out_c,model_id){
return (function() {
var org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_64489 = [null,null,null,null,null,null,null,null];
(statearr_64489[(0)] = org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto__);

(statearr_64489[(1)] = (1));

return statearr_64489;
});
var org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto____1 = (function (state_64483){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_64483);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e64490){if((e64490 instanceof Object)){
var ex__35851__auto__ = e64490;
var statearr_64491_64493 = state_64483;
(statearr_64491_64493[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_64483);

return cljs.core.cst$kw$recur;
} else {
throw e64490;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__64494 = state_64483;
state_64483 = G__64494;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto__ = function(state_64483){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto____1.call(this,state_64483);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,candidate,out_c,model_id))
})();
var state__35963__auto__ = (function (){var statearr_64492 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_64492[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_64492;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,candidate,out_c,model_id))
);

return c__35961__auto__;
});
org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
org.numenta.sanity.demos.hotgym.try_last_value_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
org.numenta.sanity.demos.hotgym.n_predictions = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((3));
org.numenta.sanity.demos.hotgym.unit_width = (8);
org.numenta.sanity.demos.hotgym.cx = (org.numenta.sanity.demos.hotgym.unit_width / (2));
org.numenta.sanity.demos.hotgym.max_r = org.numenta.sanity.demos.hotgym.cx;
org.numenta.sanity.demos.hotgym.actual_svg = (function org$numenta$sanity$demos$hotgym$actual_svg(step,top,unit_height){
var actual_consumption = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(step,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input_DASH_value,cljs.core.cst$kw$consumption], null));
var y_actual = ((top - actual_consumption) * unit_height);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y_actual - 1.5),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,(3),cljs.core.cst$kw$fill,"black"], null)], null);
});
org.numenta.sanity.demos.hotgym.prediction_svg = (function org$numenta$sanity$demos$hotgym$prediction_svg(y_scores){
var min_score = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.min,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,y_scores));
var candidates = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (min_score){
return (function (p__64499){
var vec__64500 = p__64499;
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64500,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64500,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(score,min_score);
});})(min_score))
,y_scores));
var vec__64498 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(candidates,cljs.core.quot(cljs.core.count(candidates),(2)));
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64498,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y - (1)),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,(2),cljs.core.cst$kw$fill,"#78B4FB"], null)], null);
});
org.numenta.sanity.demos.hotgym.anomaly_gradient_svg = (function org$numenta$sanity$demos$hotgym$anomaly_gradient_svg(y_scores){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$hotgym$anomaly_gradient_svg_$_iter__64519(s__64520){
return (new cljs.core.LazySeq(null,(function (){
var s__64520__$1 = s__64520;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64520__$1);
if(temp__4653__auto__){
var s__64520__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64520__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64520__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64522 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64521 = (0);
while(true){
if((i__64521 < size__5453__auto__)){
var vec__64531 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64521);
var vec__64532 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64531,(0),null);
var y1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64532,(0),null);
var score1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64532,(1),null);
var vec__64533 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64531,(1),null);
var y2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64533,(0),null);
var score2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64533,(1),null);
var grad_id = [cljs.core.str(cljs.core.random_uuid())].join('');
cljs.core.chunk_append(b__64522,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$defs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$linearGradient,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$id,grad_id,cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$x2,(0),cljs.core.cst$kw$y2,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"0%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"100%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score2], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(org.numenta.sanity.demos.hotgym.cx - org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$y,y1,cljs.core.cst$kw$width,((2) * org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$height,(y2 - y1),cljs.core.cst$kw$fill,[cljs.core.str("url(#"),cljs.core.str(grad_id),cljs.core.str(")")].join('')], null)], null)], null));

var G__64537 = (i__64521 + (1));
i__64521 = G__64537;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64522),org$numenta$sanity$demos$hotgym$anomaly_gradient_svg_$_iter__64519(cljs.core.chunk_rest(s__64520__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64522),null);
}
} else {
var vec__64534 = cljs.core.first(s__64520__$2);
var vec__64535 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64534,(0),null);
var y1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64535,(0),null);
var score1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64535,(1),null);
var vec__64536 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64534,(1),null);
var y2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64536,(0),null);
var score2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64536,(1),null);
var grad_id = [cljs.core.str(cljs.core.random_uuid())].join('');
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$defs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$linearGradient,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$id,grad_id,cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$x2,(0),cljs.core.cst$kw$y2,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"0%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"100%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score2], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(org.numenta.sanity.demos.hotgym.cx - org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$y,y1,cljs.core.cst$kw$width,((2) * org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$height,(y2 - y1),cljs.core.cst$kw$fill,[cljs.core.str("url(#"),cljs.core.str(grad_id),cljs.core.str(")")].join('')], null)], null)], null),org$numenta$sanity$demos$hotgym$anomaly_gradient_svg_$_iter__64519(cljs.core.rest(s__64520__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,y_scores)));
})());
});
org.numenta.sanity.demos.hotgym.anomaly_samples_svg = (function org$numenta$sanity$demos$hotgym$anomaly_samples_svg(ys){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$hotgym$anomaly_samples_svg_$_iter__64544(s__64545){
return (new cljs.core.LazySeq(null,(function (){
var s__64545__$1 = s__64545;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64545__$1);
if(temp__4653__auto__){
var s__64545__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64545__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64545__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64547 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64546 = (0);
while(true){
if((i__64546 < size__5453__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64546);
cljs.core.chunk_append(b__64547,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$circle,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$fill,"brown",cljs.core.cst$kw$cx,org.numenta.sanity.demos.hotgym.cx,cljs.core.cst$kw$cy,y,cljs.core.cst$kw$r,1.5], null)], null));

var G__64550 = (i__64546 + (1));
i__64546 = G__64550;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64547),org$numenta$sanity$demos$hotgym$anomaly_samples_svg_$_iter__64544(cljs.core.chunk_rest(s__64545__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64547),null);
}
} else {
var y = cljs.core.first(s__64545__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$circle,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$fill,"brown",cljs.core.cst$kw$cx,org.numenta.sanity.demos.hotgym.cx,cljs.core.cst$kw$cy,y,cljs.core.cst$kw$r,1.5], null)], null),org$numenta$sanity$demos$hotgym$anomaly_samples_svg_$_iter__64544(cljs.core.rest(s__64545__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(ys);
})());
});
org.numenta.sanity.demos.hotgym.consumption_axis_svg = (function org$numenta$sanity$demos$hotgym$consumption_axis_svg(h,bottom,top){
var label_every = (10);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__5454__auto__ = ((function (label_every){
return (function org$numenta$sanity$demos$hotgym$consumption_axis_svg_$_iter__64557(s__64558){
return (new cljs.core.LazySeq(null,((function (label_every){
return (function (){
var s__64558__$1 = s__64558;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64558__$1);
if(temp__4653__auto__){
var s__64558__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64558__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64558__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64560 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64559 = (0);
while(true){
if((i__64559 < size__5453__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64559);
cljs.core.chunk_append(b__64560,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$x,(-5),cljs.core.cst$kw$y,(h * ((1) - ((i - bottom) / (top - bottom)))),cljs.core.cst$kw$dy,"0.35em",cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$fill,"rgb(104, 104, 104)",cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,"bold"], null),cljs.core.cst$kw$text_DASH_anchor,"end"], null),[cljs.core.str(i)].join('')], null));

var G__64563 = (i__64559 + (1));
i__64559 = G__64563;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64560),org$numenta$sanity$demos$hotgym$consumption_axis_svg_$_iter__64557(cljs.core.chunk_rest(s__64558__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64560),null);
}
} else {
var i = cljs.core.first(s__64558__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$x,(-5),cljs.core.cst$kw$y,(h * ((1) - ((i - bottom) / (top - bottom)))),cljs.core.cst$kw$dy,"0.35em",cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$fill,"rgb(104, 104, 104)",cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,"bold"], null),cljs.core.cst$kw$text_DASH_anchor,"end"], null),[cljs.core.str(i)].join('')], null),org$numenta$sanity$demos$hotgym$consumption_axis_svg_$_iter__64557(cljs.core.rest(s__64558__$2)));
}
} else {
return null;
}
break;
}
});})(label_every))
,null,null));
});})(label_every))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$3(bottom,top,label_every));
})());
});
org.numenta.sanity.demos.hotgym.extend_past_px = (30);
org.numenta.sanity.demos.hotgym.horizontal_label = (function org$numenta$sanity$demos$hotgym$horizontal_label(x,y,w,transition_QMARK_,contents_above,contents_below){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$position,"relative"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$left,x,cljs.core.cst$kw$top,(y - 0.5),cljs.core.cst$kw$width,((w - x) + org.numenta.sanity.demos.hotgym.extend_past_px),cljs.core.cst$kw$transition_DASH_property,(cljs.core.truth_(transition_QMARK_)?"top":"none"),cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$height,(1),cljs.core.cst$kw$background_DASH_color,"black"], null)], null)], null)], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$hotgym$horizontal_label_$_iter__64574(s__64575){
return (new cljs.core.LazySeq(null,(function (){
var s__64575__$1 = s__64575;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64575__$1);
if(temp__4653__auto__){
var s__64575__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64575__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64575__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64577 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64576 = (0);
while(true){
if((i__64576 < size__5453__auto__)){
var vec__64582 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64576);
var contents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64582,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64582,(1),null);
if(cljs.core.truth_(contents)){
cljs.core.chunk_append(b__64577,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,y,cljs.core.cst$kw$transition_DASH_property,(cljs.core.truth_(transition_QMARK_)?"top":"none"),cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,w,cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,top,cljs.core.cst$kw$transition_DASH_property,"top",cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,(4)], null)], null),contents], null)], null));

var G__64584 = (i__64576 + (1));
i__64576 = G__64584;
continue;
} else {
var G__64585 = (i__64576 + (1));
i__64576 = G__64585;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64577),org$numenta$sanity$demos$hotgym$horizontal_label_$_iter__64574(cljs.core.chunk_rest(s__64575__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64577),null);
}
} else {
var vec__64583 = cljs.core.first(s__64575__$2);
var contents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64583,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64583,(1),null);
if(cljs.core.truth_(contents)){
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,y,cljs.core.cst$kw$transition_DASH_property,(cljs.core.truth_(transition_QMARK_)?"top":"none"),cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,w,cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,top,cljs.core.cst$kw$transition_DASH_property,"top",cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,(4)], null)], null),contents], null)], null),org$numenta$sanity$demos$hotgym$horizontal_label_$_iter__64574(cljs.core.rest(s__64575__$2)));
} else {
var G__64586 = cljs.core.rest(s__64575__$2);
s__64575__$1 = G__64586;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [contents_above,"-2.7em"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [contents_below,"0.2em"], null)], null));
})());
});
org.numenta.sanity.demos.hotgym.y__GT_consumption = (function org$numenta$sanity$demos$hotgym$y__GT_consumption(y,h,top,bottom){
return ((((1) - (y / h)) * (top - bottom)) + bottom);
});
org.numenta.sanity.demos.hotgym.consumption__GT_y = (function org$numenta$sanity$demos$hotgym$consumption__GT_y(consumption,top,unit_height){
return ((top - consumption) * unit_height);
});
org.numenta.sanity.demos.hotgym.anomaly_radar_pane = (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane(){
var step__GT_scores = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hover_i = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var hover_y = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.steps,cljs.core.cst$kw$org$numenta$sanity$demos$hotgym_SLASH_fetch_DASH_anomaly_DASH_radar,((function (step__GT_scores,hover_i,hover_y){
return (function (_,___$1,___$2,steps_v){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(step__GT_scores,cljs.core.select_keys,steps_v);

var seq__64801 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.contains_QMARK_,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores))),steps_v));
var chunk__64803 = null;
var count__64804 = (0);
var i__64805 = (0);
while(true){
if((i__64805 < count__64804)){
var step = chunk__64803.cljs$core$IIndexed$_nth$arity$2(null,i__64805);
var out_c_65015 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var model_id_65016 = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(step);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["decode-predictive-columns",model_id_65016,cljs.core.cst$kw$power_DASH_consumption,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.n_predictions) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.n_predictions)),org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c_65015,true)], null));

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(-10));

org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(110));
} else {
}

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_last_value_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_last_value_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(step,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input_DASH_value,cljs.core.cst$kw$consumption], null)));
} else {
}

var c__35961__auto___65017 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (seq__64801,chunk__64803,count__64804,i__64805,c__35961__auto___65017,out_c_65015,model_id_65016,step,step__GT_scores,hover_i,hover_y){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (seq__64801,chunk__64803,count__64804,i__64805,c__35961__auto___65017,out_c_65015,model_id_65016,step,step__GT_scores,hover_i,hover_y){
return (function (state_64851){
var state_val_64852 = (state_64851[(1)]);
if((state_val_64852 === (7))){
var inst_64847 = (state_64851[(2)]);
var state_64851__$1 = state_64851;
var statearr_64853_65018 = state_64851__$1;
(statearr_64853_65018[(2)] = inst_64847);

(statearr_64853_65018[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (1))){
var state_64851__$1 = state_64851;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_64851__$1,(2),out_c_65015);
} else {
if((state_val_64852 === (4))){
var inst_64849 = (state_64851[(2)]);
var state_64851__$1 = state_64851;
return cljs.core.async.impl.ioc_helpers.return_chan(state_64851__$1,inst_64849);
} else {
if((state_val_64852 === (13))){
var inst_64842 = (state_64851[(2)]);
var state_64851__$1 = state_64851;
var statearr_64854_65019 = state_64851__$1;
(statearr_64854_65019[(2)] = inst_64842);

(statearr_64854_65019[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (6))){
var inst_64815 = (state_64851[(7)]);
var inst_64828 = (state_64851[(8)]);
var inst_64828__$1 = cljs.core.seq(inst_64815);
var state_64851__$1 = (function (){var statearr_64855 = state_64851;
(statearr_64855[(8)] = inst_64828__$1);

return statearr_64855;
})();
if(inst_64828__$1){
var statearr_64856_65020 = state_64851__$1;
(statearr_64856_65020[(1)] = (8));

} else {
var statearr_64857_65021 = state_64851__$1;
(statearr_64857_65021[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (3))){
var inst_64818 = (state_64851[(9)]);
var inst_64817 = (state_64851[(10)]);
var inst_64820 = (inst_64818 < inst_64817);
var inst_64821 = inst_64820;
var state_64851__$1 = state_64851;
if(cljs.core.truth_(inst_64821)){
var statearr_64858_65022 = state_64851__$1;
(statearr_64858_65022[(1)] = (5));

} else {
var statearr_64859_65023 = state_64851__$1;
(statearr_64859_65023[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (12))){
var inst_64828 = (state_64851[(8)]);
var inst_64837 = cljs.core.first(inst_64828);
var inst_64838 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_64837);
var inst_64839 = cljs.core.next(inst_64828);
var inst_64815 = inst_64839;
var inst_64816 = null;
var inst_64817 = (0);
var inst_64818 = (0);
var state_64851__$1 = (function (){var statearr_64860 = state_64851;
(statearr_64860[(9)] = inst_64818);

(statearr_64860[(11)] = inst_64838);

(statearr_64860[(12)] = inst_64816);

(statearr_64860[(7)] = inst_64815);

(statearr_64860[(10)] = inst_64817);

return statearr_64860;
})();
var statearr_64861_65024 = state_64851__$1;
(statearr_64861_65024[(2)] = null);

(statearr_64861_65024[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (2))){
var inst_64812 = (state_64851[(2)]);
var inst_64813 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value,inst_64812);
var inst_64814 = cljs.core.seq(inst_64813);
var inst_64815 = inst_64814;
var inst_64816 = null;
var inst_64817 = (0);
var inst_64818 = (0);
var state_64851__$1 = (function (){var statearr_64862 = state_64851;
(statearr_64862[(9)] = inst_64818);

(statearr_64862[(12)] = inst_64816);

(statearr_64862[(7)] = inst_64815);

(statearr_64862[(10)] = inst_64817);

return statearr_64862;
})();
var statearr_64863_65025 = state_64851__$1;
(statearr_64863_65025[(2)] = null);

(statearr_64863_65025[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (11))){
var inst_64828 = (state_64851[(8)]);
var inst_64832 = cljs.core.chunk_first(inst_64828);
var inst_64833 = cljs.core.chunk_rest(inst_64828);
var inst_64834 = cljs.core.count(inst_64832);
var inst_64815 = inst_64833;
var inst_64816 = inst_64832;
var inst_64817 = inst_64834;
var inst_64818 = (0);
var state_64851__$1 = (function (){var statearr_64867 = state_64851;
(statearr_64867[(9)] = inst_64818);

(statearr_64867[(12)] = inst_64816);

(statearr_64867[(7)] = inst_64815);

(statearr_64867[(10)] = inst_64817);

return statearr_64867;
})();
var statearr_64868_65026 = state_64851__$1;
(statearr_64868_65026[(2)] = null);

(statearr_64868_65026[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (9))){
var state_64851__$1 = state_64851;
var statearr_64869_65027 = state_64851__$1;
(statearr_64869_65027[(2)] = null);

(statearr_64869_65027[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (5))){
var inst_64818 = (state_64851[(9)]);
var inst_64816 = (state_64851[(12)]);
var inst_64815 = (state_64851[(7)]);
var inst_64817 = (state_64851[(10)]);
var inst_64823 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_64816,inst_64818);
var inst_64824 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_64823);
var inst_64825 = (inst_64818 + (1));
var tmp64864 = inst_64816;
var tmp64865 = inst_64815;
var tmp64866 = inst_64817;
var inst_64815__$1 = tmp64865;
var inst_64816__$1 = tmp64864;
var inst_64817__$1 = tmp64866;
var inst_64818__$1 = inst_64825;
var state_64851__$1 = (function (){var statearr_64870 = state_64851;
(statearr_64870[(9)] = inst_64818__$1);

(statearr_64870[(13)] = inst_64824);

(statearr_64870[(12)] = inst_64816__$1);

(statearr_64870[(7)] = inst_64815__$1);

(statearr_64870[(10)] = inst_64817__$1);

return statearr_64870;
})();
var statearr_64871_65028 = state_64851__$1;
(statearr_64871_65028[(2)] = null);

(statearr_64871_65028[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (10))){
var inst_64845 = (state_64851[(2)]);
var state_64851__$1 = state_64851;
var statearr_64872_65029 = state_64851__$1;
(statearr_64872_65029[(2)] = inst_64845);

(statearr_64872_65029[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64852 === (8))){
var inst_64828 = (state_64851[(8)]);
var inst_64830 = cljs.core.chunked_seq_QMARK_(inst_64828);
var state_64851__$1 = state_64851;
if(inst_64830){
var statearr_64873_65030 = state_64851__$1;
(statearr_64873_65030[(1)] = (11));

} else {
var statearr_64874_65031 = state_64851__$1;
(statearr_64874_65031[(1)] = (12));

}

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
});})(seq__64801,chunk__64803,count__64804,i__64805,c__35961__auto___65017,out_c_65015,model_id_65016,step,step__GT_scores,hover_i,hover_y))
;
return ((function (seq__64801,chunk__64803,count__64804,i__64805,switch__35847__auto__,c__35961__auto___65017,out_c_65015,model_id_65016,step,step__GT_scores,hover_i,hover_y){
return (function() {
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_64878 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_64878[(0)] = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__);

(statearr_64878[(1)] = (1));

return statearr_64878;
});
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____1 = (function (state_64851){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_64851);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e64879){if((e64879 instanceof Object)){
var ex__35851__auto__ = e64879;
var statearr_64880_65032 = state_64851;
(statearr_64880_65032[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_64851);

return cljs.core.cst$kw$recur;
} else {
throw e64879;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__65033 = state_64851;
state_64851 = G__65033;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__ = function(state_64851){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____1.call(this,state_64851);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__;
})()
;})(seq__64801,chunk__64803,count__64804,i__64805,switch__35847__auto__,c__35961__auto___65017,out_c_65015,model_id_65016,step,step__GT_scores,hover_i,hover_y))
})();
var state__35963__auto__ = (function (){var statearr_64881 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_64881[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___65017);

return statearr_64881;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(seq__64801,chunk__64803,count__64804,i__64805,c__35961__auto___65017,out_c_65015,model_id_65016,step,step__GT_scores,hover_i,hover_y))
);


var G__65034 = seq__64801;
var G__65035 = chunk__64803;
var G__65036 = count__64804;
var G__65037 = (i__64805 + (1));
seq__64801 = G__65034;
chunk__64803 = G__65035;
count__64804 = G__65036;
i__64805 = G__65037;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__64801);
if(temp__4653__auto__){
var seq__64801__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__64801__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__64801__$1);
var G__65038 = cljs.core.chunk_rest(seq__64801__$1);
var G__65039 = c__5485__auto__;
var G__65040 = cljs.core.count(c__5485__auto__);
var G__65041 = (0);
seq__64801 = G__65038;
chunk__64803 = G__65039;
count__64804 = G__65040;
i__64805 = G__65041;
continue;
} else {
var step = cljs.core.first(seq__64801__$1);
var out_c_65042 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var model_id_65043 = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(step);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["decode-predictive-columns",model_id_65043,cljs.core.cst$kw$power_DASH_consumption,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.n_predictions) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.n_predictions)),org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c_65042,true)], null));

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(-10));

org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(110));
} else {
}

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_last_value_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_last_value_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(step,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input_DASH_value,cljs.core.cst$kw$consumption], null)));
} else {
}

var c__35961__auto___65044 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (seq__64801,chunk__64803,count__64804,i__64805,c__35961__auto___65044,out_c_65042,model_id_65043,step,seq__64801__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (seq__64801,chunk__64803,count__64804,i__64805,c__35961__auto___65044,out_c_65042,model_id_65043,step,seq__64801__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y){
return (function (state_64926){
var state_val_64927 = (state_64926[(1)]);
if((state_val_64927 === (7))){
var inst_64922 = (state_64926[(2)]);
var state_64926__$1 = state_64926;
var statearr_64928_65045 = state_64926__$1;
(statearr_64928_65045[(2)] = inst_64922);

(statearr_64928_65045[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (1))){
var state_64926__$1 = state_64926;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_64926__$1,(2),out_c_65042);
} else {
if((state_val_64927 === (4))){
var inst_64924 = (state_64926[(2)]);
var state_64926__$1 = state_64926;
return cljs.core.async.impl.ioc_helpers.return_chan(state_64926__$1,inst_64924);
} else {
if((state_val_64927 === (13))){
var inst_64917 = (state_64926[(2)]);
var state_64926__$1 = state_64926;
var statearr_64929_65046 = state_64926__$1;
(statearr_64929_65046[(2)] = inst_64917);

(statearr_64929_65046[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (6))){
var inst_64903 = (state_64926[(7)]);
var inst_64890 = (state_64926[(8)]);
var inst_64903__$1 = cljs.core.seq(inst_64890);
var state_64926__$1 = (function (){var statearr_64930 = state_64926;
(statearr_64930[(7)] = inst_64903__$1);

return statearr_64930;
})();
if(inst_64903__$1){
var statearr_64931_65047 = state_64926__$1;
(statearr_64931_65047[(1)] = (8));

} else {
var statearr_64932_65048 = state_64926__$1;
(statearr_64932_65048[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (3))){
var inst_64893 = (state_64926[(9)]);
var inst_64892 = (state_64926[(10)]);
var inst_64895 = (inst_64893 < inst_64892);
var inst_64896 = inst_64895;
var state_64926__$1 = state_64926;
if(cljs.core.truth_(inst_64896)){
var statearr_64933_65049 = state_64926__$1;
(statearr_64933_65049[(1)] = (5));

} else {
var statearr_64934_65050 = state_64926__$1;
(statearr_64934_65050[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (12))){
var inst_64903 = (state_64926[(7)]);
var inst_64912 = cljs.core.first(inst_64903);
var inst_64913 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_64912);
var inst_64914 = cljs.core.next(inst_64903);
var inst_64890 = inst_64914;
var inst_64891 = null;
var inst_64892 = (0);
var inst_64893 = (0);
var state_64926__$1 = (function (){var statearr_64935 = state_64926;
(statearr_64935[(11)] = inst_64913);

(statearr_64935[(12)] = inst_64891);

(statearr_64935[(8)] = inst_64890);

(statearr_64935[(9)] = inst_64893);

(statearr_64935[(10)] = inst_64892);

return statearr_64935;
})();
var statearr_64936_65051 = state_64926__$1;
(statearr_64936_65051[(2)] = null);

(statearr_64936_65051[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (2))){
var inst_64887 = (state_64926[(2)]);
var inst_64888 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value,inst_64887);
var inst_64889 = cljs.core.seq(inst_64888);
var inst_64890 = inst_64889;
var inst_64891 = null;
var inst_64892 = (0);
var inst_64893 = (0);
var state_64926__$1 = (function (){var statearr_64937 = state_64926;
(statearr_64937[(12)] = inst_64891);

(statearr_64937[(8)] = inst_64890);

(statearr_64937[(9)] = inst_64893);

(statearr_64937[(10)] = inst_64892);

return statearr_64937;
})();
var statearr_64938_65052 = state_64926__$1;
(statearr_64938_65052[(2)] = null);

(statearr_64938_65052[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (11))){
var inst_64903 = (state_64926[(7)]);
var inst_64907 = cljs.core.chunk_first(inst_64903);
var inst_64908 = cljs.core.chunk_rest(inst_64903);
var inst_64909 = cljs.core.count(inst_64907);
var inst_64890 = inst_64908;
var inst_64891 = inst_64907;
var inst_64892 = inst_64909;
var inst_64893 = (0);
var state_64926__$1 = (function (){var statearr_64942 = state_64926;
(statearr_64942[(12)] = inst_64891);

(statearr_64942[(8)] = inst_64890);

(statearr_64942[(9)] = inst_64893);

(statearr_64942[(10)] = inst_64892);

return statearr_64942;
})();
var statearr_64943_65053 = state_64926__$1;
(statearr_64943_65053[(2)] = null);

(statearr_64943_65053[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (9))){
var state_64926__$1 = state_64926;
var statearr_64944_65054 = state_64926__$1;
(statearr_64944_65054[(2)] = null);

(statearr_64944_65054[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (5))){
var inst_64891 = (state_64926[(12)]);
var inst_64890 = (state_64926[(8)]);
var inst_64893 = (state_64926[(9)]);
var inst_64892 = (state_64926[(10)]);
var inst_64898 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_64891,inst_64893);
var inst_64899 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_64898);
var inst_64900 = (inst_64893 + (1));
var tmp64939 = inst_64891;
var tmp64940 = inst_64890;
var tmp64941 = inst_64892;
var inst_64890__$1 = tmp64940;
var inst_64891__$1 = tmp64939;
var inst_64892__$1 = tmp64941;
var inst_64893__$1 = inst_64900;
var state_64926__$1 = (function (){var statearr_64945 = state_64926;
(statearr_64945[(13)] = inst_64899);

(statearr_64945[(12)] = inst_64891__$1);

(statearr_64945[(8)] = inst_64890__$1);

(statearr_64945[(9)] = inst_64893__$1);

(statearr_64945[(10)] = inst_64892__$1);

return statearr_64945;
})();
var statearr_64946_65055 = state_64926__$1;
(statearr_64946_65055[(2)] = null);

(statearr_64946_65055[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (10))){
var inst_64920 = (state_64926[(2)]);
var state_64926__$1 = state_64926;
var statearr_64947_65056 = state_64926__$1;
(statearr_64947_65056[(2)] = inst_64920);

(statearr_64947_65056[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64927 === (8))){
var inst_64903 = (state_64926[(7)]);
var inst_64905 = cljs.core.chunked_seq_QMARK_(inst_64903);
var state_64926__$1 = state_64926;
if(inst_64905){
var statearr_64948_65057 = state_64926__$1;
(statearr_64948_65057[(1)] = (11));

} else {
var statearr_64949_65058 = state_64926__$1;
(statearr_64949_65058[(1)] = (12));

}

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
});})(seq__64801,chunk__64803,count__64804,i__64805,c__35961__auto___65044,out_c_65042,model_id_65043,step,seq__64801__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y))
;
return ((function (seq__64801,chunk__64803,count__64804,i__64805,switch__35847__auto__,c__35961__auto___65044,out_c_65042,model_id_65043,step,seq__64801__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y){
return (function() {
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_64953 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_64953[(0)] = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__);

(statearr_64953[(1)] = (1));

return statearr_64953;
});
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____1 = (function (state_64926){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_64926);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e64954){if((e64954 instanceof Object)){
var ex__35851__auto__ = e64954;
var statearr_64955_65059 = state_64926;
(statearr_64955_65059[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_64926);

return cljs.core.cst$kw$recur;
} else {
throw e64954;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__65060 = state_64926;
state_64926 = G__65060;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__ = function(state_64926){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____1.call(this,state_64926);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__35848__auto__;
})()
;})(seq__64801,chunk__64803,count__64804,i__64805,switch__35847__auto__,c__35961__auto___65044,out_c_65042,model_id_65043,step,seq__64801__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y))
})();
var state__35963__auto__ = (function (){var statearr_64956 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_64956[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___65044);

return statearr_64956;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(seq__64801,chunk__64803,count__64804,i__64805,c__35961__auto___65044,out_c_65042,model_id_65043,step,seq__64801__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y))
);


var G__65061 = cljs.core.next(seq__64801__$1);
var G__65062 = null;
var G__65063 = (0);
var G__65064 = (0);
seq__64801 = G__65061;
chunk__64803 = G__65062;
count__64804 = G__65063;
i__64805 = G__65064;
continue;
}
} else {
return null;
}
}
break;
}
});})(step__GT_scores,hover_i,hover_y))
);

return ((function (step__GT_scores,hover_i,hover_y){
return (function (){
var h = (400);
var draw_steps = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.viz_options) : cljs.core.deref.call(null,org.numenta.sanity.main.viz_options)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$draw_DASH_steps], null));
var w = (org.numenta.sanity.demos.hotgym.unit_width * draw_steps);
var h_pad_top = (15);
var h_pad_bottom = (8);
var w_pad_left = (20);
var w_pad_right = (42);
var top = (110);
var bottom = (-10);
var unit_height = (h / (top - bottom));
var label_every = (10);
var center_dt = cljs.core.cst$kw$dt.cljs$core$IFn$_invoke$arity$1(cljs.core.peek((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.selection) : cljs.core.deref.call(null,org.numenta.sanity.main.selection))));
var dt0 = (function (){var x__5013__auto__ = (-1);
var y__5014__auto__ = (center_dt - cljs.core.quot(draw_steps,(2)));
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
var center_i = (center_dt - dt0);
var draw_dts = cljs.core.range.cljs$core$IFn$_invoke$arity$2(dt0,(function (){var x__5020__auto__ = (dt0 + draw_steps);
var y__5021__auto__ = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})());
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$position,"relative",cljs.core.cst$kw$width,((w_pad_left + w) + w_pad_right)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,(0),cljs.core.cst$kw$left,(0),cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),"power-consumption"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$svg,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$height,((h + h_pad_top) + h_pad_bottom),cljs.core.cst$kw$width,((w + w_pad_left) + w_pad_right)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate("),cljs.core.str(w_pad_left),cljs.core.str(","),cljs.core.str(h_pad_top),cljs.core.str(")")].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption_axis_svg,h,bottom,top], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__5454__auto__ = ((function (h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64957(s__64958){
return (new cljs.core.LazySeq(null,((function (h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (){
var s__64958__$1 = s__64958;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64958__$1);
if(temp__4653__auto__){
var s__64958__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64958__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64958__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64960 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64959 = (0);
while(true){
if((i__64959 < size__5453__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64959);
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(draw_dts,i);
var from_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),(dt + (1)),null);
var y_scores = (cljs.core.truth_(from_step)?(function (){var iter__5454__auto__ = ((function (i__64959,dt,from_step,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64957_$_iter__64985(s__64986){
return (new cljs.core.LazySeq(null,((function (i__64959,dt,from_step,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (){
var s__64986__$1 = s__64986;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__64986__$1);
if(temp__4653__auto____$1){
var s__64986__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__64986__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__64986__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__64988 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__64987 = (0);
while(true){
if((i__64987 < size__5453__auto____$1)){
var vec__64993 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__64987);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64993,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64993,(1),null);
cljs.core.chunk_append(b__64988,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null));

var G__65065 = (i__64987 + (1));
i__64987 = G__65065;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64988),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64957_$_iter__64985(cljs.core.chunk_rest(s__64986__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64988),null);
}
} else {
var vec__64994 = cljs.core.first(s__64986__$2);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64994,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64994,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64957_$_iter__64985(cljs.core.rest(s__64986__$2)));
}
} else {
return null;
}
break;
}
});})(i__64959,dt,from_step,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,null,null));
});})(i__64959,dt,from_step,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
;
return iter__5454__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores)),from_step)));
})():null);
cljs.core.chunk_append(b__64960,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate("),cljs.core.str((org.numenta.sanity.demos.hotgym.unit_width * ((draw_steps - (1)) - i))),cljs.core.str(",0)")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,(function (){var G__64995 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,h,cljs.core.cst$kw$fill,"white"], null);
if(cljs.core.truth_(from_step)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__64995,cljs.core.cst$kw$on_DASH_click,((function (i__64959,G__64995,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
return org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,from_step,org.numenta.sanity.demos.hotgym.y__GT_consumption(y,h,top,bottom));
});})(i__64959,G__64995,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.array_seq([cljs.core.cst$kw$on_DASH_mouse_DASH_move,((function (i__64959,G__64995,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,i) : cljs.core.reset_BANG_.call(null,hover_i,i));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,y) : cljs.core.reset_BANG_.call(null,hover_y,y));
});})(i__64959,G__64995,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (i__64959,G__64995,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,null) : cljs.core.reset_BANG_.call(null,hover_i,null));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,null) : cljs.core.reset_BANG_.call(null,hover_y,null));
});})(i__64959,G__64995,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64960,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
], 0));
} else {
return G__64995;
}
})()], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$pointer_DASH_events,"none"], null)], null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_gradient_svg,y_scores], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_samples_svg,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,y_scores)], null):null),(((((0) <= dt)) && ((dt < cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps))))))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.actual_svg,cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),dt),top,unit_height], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.prediction_svg,y_scores], null):null)], null)], null));

var G__65066 = (i__64959 + (1));
i__64959 = G__65066;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64960),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64957(cljs.core.chunk_rest(s__64958__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64960),null);
}
} else {
var i = cljs.core.first(s__64958__$2);
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(draw_dts,i);
var from_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),(dt + (1)),null);
var y_scores = (cljs.core.truth_(from_step)?(function (){var iter__5454__auto__ = ((function (dt,from_step,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64957_$_iter__64996(s__64997){
return (new cljs.core.LazySeq(null,((function (dt,from_step,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (){
var s__64997__$1 = s__64997;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__64997__$1);
if(temp__4653__auto____$1){
var s__64997__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__64997__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64997__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64999 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64998 = (0);
while(true){
if((i__64998 < size__5453__auto__)){
var vec__65004 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64998);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65004,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65004,(1),null);
cljs.core.chunk_append(b__64999,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null));

var G__65067 = (i__64998 + (1));
i__64998 = G__65067;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64999),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64957_$_iter__64996(cljs.core.chunk_rest(s__64997__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64999),null);
}
} else {
var vec__65005 = cljs.core.first(s__64997__$2);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65005,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65005,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64957_$_iter__64996(cljs.core.rest(s__64997__$2)));
}
} else {
return null;
}
break;
}
});})(dt,from_step,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,null,null));
});})(dt,from_step,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
;
return iter__5454__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores)),from_step)));
})():null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate("),cljs.core.str((org.numenta.sanity.demos.hotgym.unit_width * ((draw_steps - (1)) - i))),cljs.core.str(",0)")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,(function (){var G__65006 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,h,cljs.core.cst$kw$fill,"white"], null);
if(cljs.core.truth_(from_step)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__65006,cljs.core.cst$kw$on_DASH_click,((function (G__65006,dt,from_step,y_scores,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
return org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,from_step,org.numenta.sanity.demos.hotgym.y__GT_consumption(y,h,top,bottom));
});})(G__65006,dt,from_step,y_scores,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.array_seq([cljs.core.cst$kw$on_DASH_mouse_DASH_move,((function (G__65006,dt,from_step,y_scores,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,i) : cljs.core.reset_BANG_.call(null,hover_i,i));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,y) : cljs.core.reset_BANG_.call(null,hover_y,y));
});})(G__65006,dt,from_step,y_scores,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (G__65006,dt,from_step,y_scores,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,null) : cljs.core.reset_BANG_.call(null,hover_i,null));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,null) : cljs.core.reset_BANG_.call(null,hover_y,null));
});})(G__65006,dt,from_step,y_scores,i,s__64958__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
], 0));
} else {
return G__65006;
}
})()], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$pointer_DASH_events,"none"], null)], null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_gradient_svg,y_scores], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_samples_svg,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,y_scores)], null):null),(((((0) <= dt)) && ((dt < cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps))))))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.actual_svg,cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),dt),top,unit_height], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.prediction_svg,y_scores], null):null)], null)], null),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64957(cljs.core.rest(s__64958__$2)));
}
} else {
return null;
}
break;
}
});})(h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,null,null));
});})(h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(draw_dts)));
})()),(function (){var x = (org.numenta.sanity.demos.hotgym.unit_width * ((draw_steps - (1)) - center_i));
var points = [cljs.core.str(x),cljs.core.str(","),cljs.core.str((0)),cljs.core.str(" "),cljs.core.str(x),cljs.core.str(","),cljs.core.str((-1)),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((-1)),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((0))].join('');
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,(function (){var points__$1 = [cljs.core.str(x),cljs.core.str(","),cljs.core.str((0)),cljs.core.str(" "),cljs.core.str(x),cljs.core.str(","),cljs.core.str((-1)),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((-1)),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((0))].join('');
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$polyline,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,cljs.core.cst$kw$highlight.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.state_colors),cljs.core.cst$kw$stroke_DASH_width,(3),cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$points,points__$1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$polyline,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,0.75,cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$points,points__$1], null)], null)], null);
})(),(function (){var points__$1 = [cljs.core.str(x),cljs.core.str(","),cljs.core.str(h),cljs.core.str(" "),cljs.core.str(x),cljs.core.str(","),cljs.core.str((h + (6))),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((h + (6))),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str(h)].join('');
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$polyline,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,cljs.core.cst$kw$highlight.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.state_colors),cljs.core.cst$kw$stroke_DASH_width,(3),cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$points,points__$1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$polyline,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,0.75,cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$points,points__$1], null)], null)], null);
})()], null);
})()], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hover_y) : cljs.core.deref.call(null,hover_y)))?(function (){var i = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hover_i) : cljs.core.deref.call(null,hover_i));
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(draw_dts,i);
var from_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),(dt + (1)));
var y = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hover_y) : cljs.core.deref.call(null,hover_y));
var consumption = org.numenta.sanity.demos.hotgym.y__GT_consumption(y,h,top,bottom);
var vec__65007 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (i,dt,from_step,y,consumption,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (p__65010){
var vec__65011 = p__65010;
var vec__65012 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65011,(0),null);
var c1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65012,(0),null);
var s1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65012,(1),null);
var vec__65013 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65011,(1),null);
var c2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65013,(0),null);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65013,(1),null);
return ((c1 <= consumption)) && ((consumption <= c2));
});})(i,dt,from_step,y,consumption,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores)),from_step)))));
var vec__65008 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65007,(0),null);
var lower_consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65008,(0),null);
var lower_score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65008,(1),null);
var vec__65009 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65007,(1),null);
var upper_consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65009,(0),null);
var upper_score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65009,(1),null);
var lower_y = org.numenta.sanity.demos.hotgym.consumption__GT_y(lower_consumption,top,unit_height);
var upper_y = org.numenta.sanity.demos.hotgym.consumption__GT_y(upper_consumption,top,unit_height);
var dt_left = (w_pad_left + (org.numenta.sanity.demos.hotgym.unit_width * (((draw_steps - (1)) - i) + 0.5)));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$left,(0),cljs.core.cst$kw$top,h_pad_top,cljs.core.cst$kw$pointer_DASH_events,"none"], null)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.horizontal_label,dt_left,lower_y,(w + w_pad_left),true,null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,[cljs.core.str(lower_consumption.toFixed((1))),cljs.core.str("kW")].join(''),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),[cljs.core.str(lower_score.toFixed((3)))].join('')], null)], null),(function (){var contents = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,[cljs.core.str(consumption.toFixed((1))),cljs.core.str("kW")].join(''),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),"click"], null);
var vec__65014 = ((((y - upper_y) > (30)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [contents,null], null):((((lower_y - y) > (30)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,contents], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null)
));
var above = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65014,(0),null);
var below = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65014,(1),null);
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.horizontal_label,dt_left,y,(w + w_pad_left),false,above,below], null);
})(),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.horizontal_label,dt_left,upper_y,(w + w_pad_left),true,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,[cljs.core.str(upper_consumption.toFixed((1))),cljs.core.str("kW")].join(''),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),[cljs.core.str(upper_score.toFixed((3)))].join('')], null),null], null)], null);
})():null)], null);
});
;})(step__GT_scores,hover_i,hover_y))
});
org.numenta.sanity.demos.hotgym.world_pane = (function org$numenta$sanity$demos$hotgym$world_pane(){
if(cljs.core.truth_(cljs.core.not_empty((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps))))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(10)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_radar_pane], null)], null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(30)], null)], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$hotgym$world_pane_$_iter__65078(s__65079){
return (new cljs.core.LazySeq(null,(function (){
var s__65079__$1 = s__65079;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__65079__$1);
if(temp__4653__auto__){
var s__65079__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__65079__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__65079__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__65081 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__65080 = (0);
while(true){
if((i__65080 < size__5453__auto__)){
var vec__65086 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__65080);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65086,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65086,(1),null);
cljs.core.chunk_append(b__65081,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_bottom,(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),cljs.core.name(sense_id)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,[cljs.core.str(v)].join('')], null)], null)], null));

var G__65088 = (i__65080 + (1));
i__65080 = G__65088;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__65081),org$numenta$sanity$demos$hotgym$world_pane_$_iter__65078(cljs.core.chunk_rest(s__65079__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__65081),null);
}
} else {
var vec__65087 = cljs.core.first(s__65079__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65087,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65087,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_bottom,(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),cljs.core.name(sense_id)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,[cljs.core.str(v)].join('')], null)], null)], null),org$numenta$sanity$demos$hotgym$world_pane_$_iter__65078(cljs.core.rest(s__65079__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$sensed_DASH_values.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0()),cljs.core.cst$kw$power_DASH_consumption));
})())], null);
} else {
return null;
}
});
org.numenta.sanity.demos.hotgym.set_model_BANG_ = (function org$numenta$sanity$demos$hotgym$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.model)) == null);
var G__65097_65105 = org.numenta.sanity.demos.hotgym.model;
var G__65098_65106 = org.nfrac.comportex.core.region_network(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$rgn_DASH_0,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$power_DASH_consumption,cljs.core.cst$kw$is_DASH_weekend_QMARK_,cljs.core.cst$kw$hour_DASH_of_DASH_day], null)], null),cljs.core.constantly(org.nfrac.comportex.core.sensory_region),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$rgn_DASH_0,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.nfrac.comportex.cells.better_parameter_defaults,cljs.core.cst$kw$depth,(1),cljs.core.array_seq([cljs.core.cst$kw$max_DASH_segments,(128),cljs.core.cst$kw$distal_DASH_perm_DASH_connected,0.2,cljs.core.cst$kw$distal_DASH_perm_DASH_init,0.2], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$power_DASH_consumption,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$consumption,org.numenta.sanity.demos.hotgym.sampling_linear_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [((1024) + (256))], null),(17),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [-12.8,112.8], null),12.8)], null)], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$is_DASH_weekend_QMARK_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$is_DASH_weekend_QMARK_,org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(10)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,false], null))], null),cljs.core.cst$kw$hour_DASH_of_DASH_day,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hour_DASH_of_DASH_day,org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [((40) * (24))], null),cljs.core.range.cljs$core$IFn$_invoke$arity$1((24)))], null)], null));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65097_65105,G__65098_65106) : cljs.core.reset_BANG_.call(null,G__65097_65105,G__65098_65106));

if(init_QMARK_){
var G__65100_65107 = "../data/hotgym.consumption_weekend_hour.edn";
var G__65101_65108 = ((function (G__65100_65107,init_QMARK_){
return (function (e){
if(cljs.core.truth_(e.target.isSuccess())){
var response = e.target.getResponseText();
var inputs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.zipmap,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$consumption,cljs.core.cst$kw$is_DASH_weekend_QMARK_,cljs.core.cst$kw$hour_DASH_of_DASH_day], null)),cljs.reader.read_string(response));
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.hotgym.world_c,inputs,false);
} else {
var G__65102 = [cljs.core.str("Request to "),cljs.core.str(e.target.getLastUri()),cljs.core.str(" failed. "),cljs.core.str(e.target.getStatus()),cljs.core.str(" - "),cljs.core.str(e.target.getStatusText())].join('');
return log.error(G__65102);
}
});})(G__65100_65107,init_QMARK_))
;
goog.net.XhrIo.send(G__65100_65107,G__65101_65108);

return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.hotgym.model,org.numenta.sanity.demos.hotgym.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.hotgym.into_sim);
} else {
var G__65103 = org.numenta.sanity.main.step_template;
var G__65104 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.model)));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65103,G__65104) : cljs.core.reset_BANG_.call(null,G__65103,G__65104));
}
}));
});
org.numenta.sanity.demos.hotgym.model_tab = (function org$numenta$sanity$demos$hotgym$model_tab(){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Numenta's \"hotgym\" dataset."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Uses the solution from:",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"http://mrcslws.com/gorilla/?path=hotgym.clj"], null),"Predicting power consumptions with HTM"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This demo highlights the Anomaly Radar display on the left. The anomaly\n   scores for possible next inputs are sampled, and the sample points are shown\n   as dots. The prediction is a blue dash, and the actual value is a black\n   dash. The red->white scale represents the anomaly score. The anomaly score is\n   correct wherever there's a dot, and it's estimated elsewhere."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Inspect the numbers by hovering your mouse over the Anomaly Radar. Click\n   to add your own samples. You might want to pause the simulation first."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This demo chooses samples by decoding the predictive columns, as\n   explained in the essay above."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"It's fun to click the black dashes and see if it changes the\n   prediction. When this happens, it shows that the HTM actually predicted\n   something better than we thought, we just didn't sample the right points. You\n   could expand on this demo to try different strategies for choosing a clever\n   set of samples, finding the right balance between results and code\n   performance."], null)], null);
});
org.numenta.sanity.demos.hotgym.init = (function org$numenta$sanity$demos$hotgym$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.hotgym.into_sim], null),goog.dom.getElement("sanity-app"));

return org.numenta.sanity.demos.hotgym.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.hotgym.init', org.numenta.sanity.demos.hotgym.init);
