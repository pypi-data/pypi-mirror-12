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
return (function (p1__64416_SHARP_){
return ((lower_bound <= p1__64416_SHARP_)) && ((p1__64416_SHARP_ <= upper_bound));
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
var vec__64418 = cljs.core.split_at(n_remaining,from__$1);
var taken = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64418,(0),null);
var untaken = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64418,(1),null);
var G__64419 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(coll__$1,taken);
var G__64420 = untaken;
coll__$1 = G__64419;
from__$1 = G__64420;
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
var G__64422 = org.numenta.sanity.demos.hotgym.into_bounded(chosen,(n_take + cljs.core.count(chosen)),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (chosen,density,half_remaining,n_take,remaining,multiples_of){
return (function (p1__64421_SHARP_){
return (((0) <= p1__64421_SHARP_)) && ((p1__64421_SHARP_ <= (n_bits - (1))));
});})(chosen,density,half_remaining,n_take,remaining,multiples_of))
,org.numenta.sanity.demos.hotgym.multiples_within_radius(center,bit_radius,multiples_of)));
var G__64423 = (density * (2));
chosen = G__64422;
density = G__64423;
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

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k64425,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__64427 = (((k64425 instanceof cljs.core.Keyword))?k64425.fqn:null);
switch (G__64427) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k64425,else__5299__auto__);

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

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__64424){
var self__ = this;
var G__64424__$1 = this;
return (new cljs.core.RecordIter((0),G__64424__$1,5,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$lower,cljs.core.cst$kw$upper,cljs.core.cst$kw$radius], null),cljs.core._iterator(self__.__extmap)));
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

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__64424){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__64428 = cljs.core.keyword_identical_QMARK_;
var expr__64429 = k__5304__auto__;
if(cljs.core.truth_((pred__64428.cljs$core$IFn$_invoke$arity$2 ? pred__64428.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__64429) : pred__64428.call(null,cljs.core.cst$kw$topo,expr__64429)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(G__64424,self__.n_active,self__.lower,self__.upper,self__.radius,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__64428.cljs$core$IFn$_invoke$arity$2 ? pred__64428.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__64429) : pred__64428.call(null,cljs.core.cst$kw$n_DASH_active,expr__64429)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,G__64424,self__.lower,self__.upper,self__.radius,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__64428.cljs$core$IFn$_invoke$arity$2 ? pred__64428.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$lower,expr__64429) : pred__64428.call(null,cljs.core.cst$kw$lower,expr__64429)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,G__64424,self__.upper,self__.radius,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__64428.cljs$core$IFn$_invoke$arity$2 ? pred__64428.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$upper,expr__64429) : pred__64428.call(null,cljs.core.cst$kw$upper,expr__64429)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,G__64424,self__.radius,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__64428.cljs$core$IFn$_invoke$arity$2 ? pred__64428.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$radius,expr__64429) : pred__64428.call(null,cljs.core.cst$kw$radius,expr__64429)))){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,G__64424,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.radius,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__64424),null));
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

org.numenta.sanity.demos.hotgym.SamplingLinearEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__64424){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.radius,G__64424,self__.__extmap,self__.__hash));
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

org.numenta.sanity.demos.hotgym.map__GT_SamplingLinearEncoder = (function org$numenta$sanity$demos$hotgym$map__GT_SamplingLinearEncoder(G__64426){
return (new org.numenta.sanity.demos.hotgym.SamplingLinearEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__64426),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__64426),cljs.core.cst$kw$lower.cljs$core$IFn$_invoke$arity$1(G__64426),cljs.core.cst$kw$upper.cljs$core$IFn$_invoke$arity$1(G__64426),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(G__64426),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__64426,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$lower,cljs.core.cst$kw$upper,cljs.core.cst$kw$radius], 0)),null));
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
org.numenta.sanity.demos.hotgym.sampling_linear_encoder = (function org$numenta$sanity$demos$hotgym$sampling_linear_encoder(dimensions,n_active,p__64432,radius){
var vec__64434 = p__64432;
var lower = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64434,(0),null);
var upper = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64434,(1),null);
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.numenta.sanity.demos.hotgym.map__GT_SamplingLinearEncoder(new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$n_DASH_active,n_active,cljs.core.cst$kw$lower,lower,cljs.core.cst$kw$upper,upper,cljs.core.cst$kw$radius,radius], null));
});
org.numenta.sanity.demos.hotgym.anomaly_score = (function org$numenta$sanity$demos$hotgym$anomaly_score(p__64435){
var map__64438 = p__64435;
var map__64438__$1 = ((((!((map__64438 == null)))?((((map__64438.cljs$lang$protocol_mask$partition0$ & (64))) || (map__64438.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__64438):map__64438);
var active = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64438__$1,cljs.core.cst$kw$active);
var active_predicted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__64438__$1,cljs.core.cst$kw$active_DASH_predicted);
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

var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,candidate,out_c,model_id){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,candidate,out_c,model_id){
return (function (state_64478){
var state_val_64479 = (state_64478[(1)]);
if((state_val_64479 === (1))){
var state_64478__$1 = state_64478;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_64478__$1,(2),out_c);
} else {
if((state_val_64479 === (2))){
var inst_64467 = (state_64478[(2)]);
var inst_64468 = cljs.core.seq(inst_64467);
var inst_64469 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_64468,(0),null);
var inst_64470 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_64469,(0),null);
var inst_64471 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_64469,(1),null);
var inst_64472 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_64473 = [step,consumption];
var inst_64474 = (new cljs.core.PersistentVector(null,2,(5),inst_64472,inst_64473,null));
var inst_64475 = org.numenta.sanity.demos.hotgym.anomaly_score(inst_64471);
var inst_64476 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(step__GT_scores,cljs.core.assoc_in,inst_64474,inst_64475);
var state_64478__$1 = (function (){var statearr_64480 = state_64478;
(statearr_64480[(7)] = inst_64470);

return statearr_64480;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_64478__$1,inst_64476);
} else {
return null;
}
}
});})(c__36154__auto__,candidate,out_c,model_id))
;
return ((function (switch__36040__auto__,c__36154__auto__,candidate,out_c,model_id){
return (function() {
var org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_64484 = [null,null,null,null,null,null,null,null];
(statearr_64484[(0)] = org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto__);

(statearr_64484[(1)] = (1));

return statearr_64484;
});
var org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto____1 = (function (state_64478){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_64478);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e64485){if((e64485 instanceof Object)){
var ex__36044__auto__ = e64485;
var statearr_64486_64488 = state_64478;
(statearr_64486_64488[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_64478);

return cljs.core.cst$kw$recur;
} else {
throw e64485;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__64489 = state_64478;
state_64478 = G__64489;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto__ = function(state_64478){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto____1.call(this,state_64478);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,candidate,out_c,model_id))
})();
var state__36156__auto__ = (function (){var statearr_64487 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_64487[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_64487;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,candidate,out_c,model_id))
);

return c__36154__auto__;
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
return (function (p__64494){
var vec__64495 = p__64494;
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64495,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64495,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(score,min_score);
});})(min_score))
,y_scores));
var vec__64493 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(candidates,cljs.core.quot(cljs.core.count(candidates),(2)));
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64493,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y - (1)),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,(2),cljs.core.cst$kw$fill,"#78B4FB"], null)], null);
});
org.numenta.sanity.demos.hotgym.anomaly_gradient_svg = (function org$numenta$sanity$demos$hotgym$anomaly_gradient_svg(y_scores){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$hotgym$anomaly_gradient_svg_$_iter__64514(s__64515){
return (new cljs.core.LazySeq(null,(function (){
var s__64515__$1 = s__64515;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64515__$1);
if(temp__4653__auto__){
var s__64515__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64515__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64515__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64517 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64516 = (0);
while(true){
if((i__64516 < size__5453__auto__)){
var vec__64526 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64516);
var vec__64527 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64526,(0),null);
var y1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64527,(0),null);
var score1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64527,(1),null);
var vec__64528 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64526,(1),null);
var y2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64528,(0),null);
var score2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64528,(1),null);
var grad_id = [cljs.core.str(cljs.core.random_uuid())].join('');
cljs.core.chunk_append(b__64517,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$defs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$linearGradient,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$id,grad_id,cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$x2,(0),cljs.core.cst$kw$y2,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"0%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"100%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score2], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(org.numenta.sanity.demos.hotgym.cx - org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$y,y1,cljs.core.cst$kw$width,((2) * org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$height,(y2 - y1),cljs.core.cst$kw$fill,[cljs.core.str("url(#"),cljs.core.str(grad_id),cljs.core.str(")")].join('')], null)], null)], null));

var G__64532 = (i__64516 + (1));
i__64516 = G__64532;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64517),org$numenta$sanity$demos$hotgym$anomaly_gradient_svg_$_iter__64514(cljs.core.chunk_rest(s__64515__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64517),null);
}
} else {
var vec__64529 = cljs.core.first(s__64515__$2);
var vec__64530 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64529,(0),null);
var y1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64530,(0),null);
var score1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64530,(1),null);
var vec__64531 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64529,(1),null);
var y2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64531,(0),null);
var score2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64531,(1),null);
var grad_id = [cljs.core.str(cljs.core.random_uuid())].join('');
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$defs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$linearGradient,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$id,grad_id,cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$x2,(0),cljs.core.cst$kw$y2,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"0%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"100%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score2], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(org.numenta.sanity.demos.hotgym.cx - org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$y,y1,cljs.core.cst$kw$width,((2) * org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$height,(y2 - y1),cljs.core.cst$kw$fill,[cljs.core.str("url(#"),cljs.core.str(grad_id),cljs.core.str(")")].join('')], null)], null)], null),org$numenta$sanity$demos$hotgym$anomaly_gradient_svg_$_iter__64514(cljs.core.rest(s__64515__$2)));
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$hotgym$anomaly_samples_svg_$_iter__64539(s__64540){
return (new cljs.core.LazySeq(null,(function (){
var s__64540__$1 = s__64540;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64540__$1);
if(temp__4653__auto__){
var s__64540__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64540__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64540__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64542 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64541 = (0);
while(true){
if((i__64541 < size__5453__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64541);
cljs.core.chunk_append(b__64542,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$circle,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$fill,"brown",cljs.core.cst$kw$cx,org.numenta.sanity.demos.hotgym.cx,cljs.core.cst$kw$cy,y,cljs.core.cst$kw$r,1.5], null)], null));

var G__64545 = (i__64541 + (1));
i__64541 = G__64545;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64542),org$numenta$sanity$demos$hotgym$anomaly_samples_svg_$_iter__64539(cljs.core.chunk_rest(s__64540__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64542),null);
}
} else {
var y = cljs.core.first(s__64540__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$circle,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$fill,"brown",cljs.core.cst$kw$cx,org.numenta.sanity.demos.hotgym.cx,cljs.core.cst$kw$cy,y,cljs.core.cst$kw$r,1.5], null)], null),org$numenta$sanity$demos$hotgym$anomaly_samples_svg_$_iter__64539(cljs.core.rest(s__64540__$2)));
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
return (function org$numenta$sanity$demos$hotgym$consumption_axis_svg_$_iter__64552(s__64553){
return (new cljs.core.LazySeq(null,((function (label_every){
return (function (){
var s__64553__$1 = s__64553;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64553__$1);
if(temp__4653__auto__){
var s__64553__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64553__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64553__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64555 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64554 = (0);
while(true){
if((i__64554 < size__5453__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64554);
cljs.core.chunk_append(b__64555,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$x,(-5),cljs.core.cst$kw$y,(h * ((1) - ((i - bottom) / (top - bottom)))),cljs.core.cst$kw$dy,"0.35em",cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$fill,"rgb(104, 104, 104)",cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,"bold"], null),cljs.core.cst$kw$text_DASH_anchor,"end"], null),[cljs.core.str(i)].join('')], null));

var G__64558 = (i__64554 + (1));
i__64554 = G__64558;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64555),org$numenta$sanity$demos$hotgym$consumption_axis_svg_$_iter__64552(cljs.core.chunk_rest(s__64553__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64555),null);
}
} else {
var i = cljs.core.first(s__64553__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$x,(-5),cljs.core.cst$kw$y,(h * ((1) - ((i - bottom) / (top - bottom)))),cljs.core.cst$kw$dy,"0.35em",cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$fill,"rgb(104, 104, 104)",cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,"bold"], null),cljs.core.cst$kw$text_DASH_anchor,"end"], null),[cljs.core.str(i)].join('')], null),org$numenta$sanity$demos$hotgym$consumption_axis_svg_$_iter__64552(cljs.core.rest(s__64553__$2)));
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$position,"relative"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$left,x,cljs.core.cst$kw$top,(y - 0.5),cljs.core.cst$kw$width,((w - x) + org.numenta.sanity.demos.hotgym.extend_past_px),cljs.core.cst$kw$transition_DASH_property,(cljs.core.truth_(transition_QMARK_)?"top":"none"),cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$height,(1),cljs.core.cst$kw$background_DASH_color,"black"], null)], null)], null)], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$hotgym$horizontal_label_$_iter__64569(s__64570){
return (new cljs.core.LazySeq(null,(function (){
var s__64570__$1 = s__64570;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64570__$1);
if(temp__4653__auto__){
var s__64570__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64570__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64570__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64572 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64571 = (0);
while(true){
if((i__64571 < size__5453__auto__)){
var vec__64577 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64571);
var contents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64577,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64577,(1),null);
if(cljs.core.truth_(contents)){
cljs.core.chunk_append(b__64572,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,y,cljs.core.cst$kw$transition_DASH_property,(cljs.core.truth_(transition_QMARK_)?"top":"none"),cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,w,cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,top,cljs.core.cst$kw$transition_DASH_property,"top",cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,(4)], null)], null),contents], null)], null));

var G__64579 = (i__64571 + (1));
i__64571 = G__64579;
continue;
} else {
var G__64580 = (i__64571 + (1));
i__64571 = G__64580;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64572),org$numenta$sanity$demos$hotgym$horizontal_label_$_iter__64569(cljs.core.chunk_rest(s__64570__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64572),null);
}
} else {
var vec__64578 = cljs.core.first(s__64570__$2);
var contents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64578,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64578,(1),null);
if(cljs.core.truth_(contents)){
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,y,cljs.core.cst$kw$transition_DASH_property,(cljs.core.truth_(transition_QMARK_)?"top":"none"),cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,w,cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,top,cljs.core.cst$kw$transition_DASH_property,"top",cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,(4)], null)], null),contents], null)], null),org$numenta$sanity$demos$hotgym$horizontal_label_$_iter__64569(cljs.core.rest(s__64570__$2)));
} else {
var G__64581 = cljs.core.rest(s__64570__$2);
s__64570__$1 = G__64581;
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

var seq__64796 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.contains_QMARK_,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores))),steps_v));
var chunk__64798 = null;
var count__64799 = (0);
var i__64800 = (0);
while(true){
if((i__64800 < count__64799)){
var step = chunk__64798.cljs$core$IIndexed$_nth$arity$2(null,i__64800);
var out_c_65010 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var model_id_65011 = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(step);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["decode-predictive-columns",model_id_65011,cljs.core.cst$kw$power_DASH_consumption,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.n_predictions) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.n_predictions)),org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c_65010,true)], null));

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(-10));

org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(110));
} else {
}

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_last_value_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_last_value_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(step,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input_DASH_value,cljs.core.cst$kw$consumption], null)));
} else {
}

var c__36154__auto___65012 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (seq__64796,chunk__64798,count__64799,i__64800,c__36154__auto___65012,out_c_65010,model_id_65011,step,step__GT_scores,hover_i,hover_y){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (seq__64796,chunk__64798,count__64799,i__64800,c__36154__auto___65012,out_c_65010,model_id_65011,step,step__GT_scores,hover_i,hover_y){
return (function (state_64846){
var state_val_64847 = (state_64846[(1)]);
if((state_val_64847 === (7))){
var inst_64842 = (state_64846[(2)]);
var state_64846__$1 = state_64846;
var statearr_64848_65013 = state_64846__$1;
(statearr_64848_65013[(2)] = inst_64842);

(statearr_64848_65013[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (1))){
var state_64846__$1 = state_64846;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_64846__$1,(2),out_c_65010);
} else {
if((state_val_64847 === (4))){
var inst_64844 = (state_64846[(2)]);
var state_64846__$1 = state_64846;
return cljs.core.async.impl.ioc_helpers.return_chan(state_64846__$1,inst_64844);
} else {
if((state_val_64847 === (13))){
var inst_64837 = (state_64846[(2)]);
var state_64846__$1 = state_64846;
var statearr_64849_65014 = state_64846__$1;
(statearr_64849_65014[(2)] = inst_64837);

(statearr_64849_65014[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (6))){
var inst_64810 = (state_64846[(7)]);
var inst_64823 = (state_64846[(8)]);
var inst_64823__$1 = cljs.core.seq(inst_64810);
var state_64846__$1 = (function (){var statearr_64850 = state_64846;
(statearr_64850[(8)] = inst_64823__$1);

return statearr_64850;
})();
if(inst_64823__$1){
var statearr_64851_65015 = state_64846__$1;
(statearr_64851_65015[(1)] = (8));

} else {
var statearr_64852_65016 = state_64846__$1;
(statearr_64852_65016[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (3))){
var inst_64812 = (state_64846[(9)]);
var inst_64813 = (state_64846[(10)]);
var inst_64815 = (inst_64813 < inst_64812);
var inst_64816 = inst_64815;
var state_64846__$1 = state_64846;
if(cljs.core.truth_(inst_64816)){
var statearr_64853_65017 = state_64846__$1;
(statearr_64853_65017[(1)] = (5));

} else {
var statearr_64854_65018 = state_64846__$1;
(statearr_64854_65018[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (12))){
var inst_64823 = (state_64846[(8)]);
var inst_64832 = cljs.core.first(inst_64823);
var inst_64833 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_64832);
var inst_64834 = cljs.core.next(inst_64823);
var inst_64810 = inst_64834;
var inst_64811 = null;
var inst_64812 = (0);
var inst_64813 = (0);
var state_64846__$1 = (function (){var statearr_64855 = state_64846;
(statearr_64855[(11)] = inst_64811);

(statearr_64855[(7)] = inst_64810);

(statearr_64855[(12)] = inst_64833);

(statearr_64855[(9)] = inst_64812);

(statearr_64855[(10)] = inst_64813);

return statearr_64855;
})();
var statearr_64856_65019 = state_64846__$1;
(statearr_64856_65019[(2)] = null);

(statearr_64856_65019[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (2))){
var inst_64807 = (state_64846[(2)]);
var inst_64808 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value,inst_64807);
var inst_64809 = cljs.core.seq(inst_64808);
var inst_64810 = inst_64809;
var inst_64811 = null;
var inst_64812 = (0);
var inst_64813 = (0);
var state_64846__$1 = (function (){var statearr_64857 = state_64846;
(statearr_64857[(11)] = inst_64811);

(statearr_64857[(7)] = inst_64810);

(statearr_64857[(9)] = inst_64812);

(statearr_64857[(10)] = inst_64813);

return statearr_64857;
})();
var statearr_64858_65020 = state_64846__$1;
(statearr_64858_65020[(2)] = null);

(statearr_64858_65020[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (11))){
var inst_64823 = (state_64846[(8)]);
var inst_64827 = cljs.core.chunk_first(inst_64823);
var inst_64828 = cljs.core.chunk_rest(inst_64823);
var inst_64829 = cljs.core.count(inst_64827);
var inst_64810 = inst_64828;
var inst_64811 = inst_64827;
var inst_64812 = inst_64829;
var inst_64813 = (0);
var state_64846__$1 = (function (){var statearr_64862 = state_64846;
(statearr_64862[(11)] = inst_64811);

(statearr_64862[(7)] = inst_64810);

(statearr_64862[(9)] = inst_64812);

(statearr_64862[(10)] = inst_64813);

return statearr_64862;
})();
var statearr_64863_65021 = state_64846__$1;
(statearr_64863_65021[(2)] = null);

(statearr_64863_65021[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (9))){
var state_64846__$1 = state_64846;
var statearr_64864_65022 = state_64846__$1;
(statearr_64864_65022[(2)] = null);

(statearr_64864_65022[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (5))){
var inst_64811 = (state_64846[(11)]);
var inst_64810 = (state_64846[(7)]);
var inst_64812 = (state_64846[(9)]);
var inst_64813 = (state_64846[(10)]);
var inst_64818 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_64811,inst_64813);
var inst_64819 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_64818);
var inst_64820 = (inst_64813 + (1));
var tmp64859 = inst_64811;
var tmp64860 = inst_64810;
var tmp64861 = inst_64812;
var inst_64810__$1 = tmp64860;
var inst_64811__$1 = tmp64859;
var inst_64812__$1 = tmp64861;
var inst_64813__$1 = inst_64820;
var state_64846__$1 = (function (){var statearr_64865 = state_64846;
(statearr_64865[(11)] = inst_64811__$1);

(statearr_64865[(7)] = inst_64810__$1);

(statearr_64865[(13)] = inst_64819);

(statearr_64865[(9)] = inst_64812__$1);

(statearr_64865[(10)] = inst_64813__$1);

return statearr_64865;
})();
var statearr_64866_65023 = state_64846__$1;
(statearr_64866_65023[(2)] = null);

(statearr_64866_65023[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (10))){
var inst_64840 = (state_64846[(2)]);
var state_64846__$1 = state_64846;
var statearr_64867_65024 = state_64846__$1;
(statearr_64867_65024[(2)] = inst_64840);

(statearr_64867_65024[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64847 === (8))){
var inst_64823 = (state_64846[(8)]);
var inst_64825 = cljs.core.chunked_seq_QMARK_(inst_64823);
var state_64846__$1 = state_64846;
if(inst_64825){
var statearr_64868_65025 = state_64846__$1;
(statearr_64868_65025[(1)] = (11));

} else {
var statearr_64869_65026 = state_64846__$1;
(statearr_64869_65026[(1)] = (12));

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
});})(seq__64796,chunk__64798,count__64799,i__64800,c__36154__auto___65012,out_c_65010,model_id_65011,step,step__GT_scores,hover_i,hover_y))
;
return ((function (seq__64796,chunk__64798,count__64799,i__64800,switch__36040__auto__,c__36154__auto___65012,out_c_65010,model_id_65011,step,step__GT_scores,hover_i,hover_y){
return (function() {
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____0 = (function (){
var statearr_64873 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_64873[(0)] = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__);

(statearr_64873[(1)] = (1));

return statearr_64873;
});
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____1 = (function (state_64846){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_64846);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e64874){if((e64874 instanceof Object)){
var ex__36044__auto__ = e64874;
var statearr_64875_65027 = state_64846;
(statearr_64875_65027[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_64846);

return cljs.core.cst$kw$recur;
} else {
throw e64874;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__65028 = state_64846;
state_64846 = G__65028;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__ = function(state_64846){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____1.call(this,state_64846);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__;
})()
;})(seq__64796,chunk__64798,count__64799,i__64800,switch__36040__auto__,c__36154__auto___65012,out_c_65010,model_id_65011,step,step__GT_scores,hover_i,hover_y))
})();
var state__36156__auto__ = (function (){var statearr_64876 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_64876[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___65012);

return statearr_64876;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(seq__64796,chunk__64798,count__64799,i__64800,c__36154__auto___65012,out_c_65010,model_id_65011,step,step__GT_scores,hover_i,hover_y))
);


var G__65029 = seq__64796;
var G__65030 = chunk__64798;
var G__65031 = count__64799;
var G__65032 = (i__64800 + (1));
seq__64796 = G__65029;
chunk__64798 = G__65030;
count__64799 = G__65031;
i__64800 = G__65032;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__64796);
if(temp__4653__auto__){
var seq__64796__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__64796__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__64796__$1);
var G__65033 = cljs.core.chunk_rest(seq__64796__$1);
var G__65034 = c__5485__auto__;
var G__65035 = cljs.core.count(c__5485__auto__);
var G__65036 = (0);
seq__64796 = G__65033;
chunk__64798 = G__65034;
count__64799 = G__65035;
i__64800 = G__65036;
continue;
} else {
var step = cljs.core.first(seq__64796__$1);
var out_c_65037 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var model_id_65038 = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(step);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["decode-predictive-columns",model_id_65038,cljs.core.cst$kw$power_DASH_consumption,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.n_predictions) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.n_predictions)),org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c_65037,true)], null));

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(-10));

org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(110));
} else {
}

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_last_value_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_last_value_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(step,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input_DASH_value,cljs.core.cst$kw$consumption], null)));
} else {
}

var c__36154__auto___65039 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (seq__64796,chunk__64798,count__64799,i__64800,c__36154__auto___65039,out_c_65037,model_id_65038,step,seq__64796__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (seq__64796,chunk__64798,count__64799,i__64800,c__36154__auto___65039,out_c_65037,model_id_65038,step,seq__64796__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y){
return (function (state_64921){
var state_val_64922 = (state_64921[(1)]);
if((state_val_64922 === (7))){
var inst_64917 = (state_64921[(2)]);
var state_64921__$1 = state_64921;
var statearr_64923_65040 = state_64921__$1;
(statearr_64923_65040[(2)] = inst_64917);

(statearr_64923_65040[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (1))){
var state_64921__$1 = state_64921;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_64921__$1,(2),out_c_65037);
} else {
if((state_val_64922 === (4))){
var inst_64919 = (state_64921[(2)]);
var state_64921__$1 = state_64921;
return cljs.core.async.impl.ioc_helpers.return_chan(state_64921__$1,inst_64919);
} else {
if((state_val_64922 === (13))){
var inst_64912 = (state_64921[(2)]);
var state_64921__$1 = state_64921;
var statearr_64924_65041 = state_64921__$1;
(statearr_64924_65041[(2)] = inst_64912);

(statearr_64924_65041[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (6))){
var inst_64898 = (state_64921[(7)]);
var inst_64885 = (state_64921[(8)]);
var inst_64898__$1 = cljs.core.seq(inst_64885);
var state_64921__$1 = (function (){var statearr_64925 = state_64921;
(statearr_64925[(7)] = inst_64898__$1);

return statearr_64925;
})();
if(inst_64898__$1){
var statearr_64926_65042 = state_64921__$1;
(statearr_64926_65042[(1)] = (8));

} else {
var statearr_64927_65043 = state_64921__$1;
(statearr_64927_65043[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (3))){
var inst_64888 = (state_64921[(9)]);
var inst_64887 = (state_64921[(10)]);
var inst_64890 = (inst_64888 < inst_64887);
var inst_64891 = inst_64890;
var state_64921__$1 = state_64921;
if(cljs.core.truth_(inst_64891)){
var statearr_64928_65044 = state_64921__$1;
(statearr_64928_65044[(1)] = (5));

} else {
var statearr_64929_65045 = state_64921__$1;
(statearr_64929_65045[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (12))){
var inst_64898 = (state_64921[(7)]);
var inst_64907 = cljs.core.first(inst_64898);
var inst_64908 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_64907);
var inst_64909 = cljs.core.next(inst_64898);
var inst_64885 = inst_64909;
var inst_64886 = null;
var inst_64887 = (0);
var inst_64888 = (0);
var state_64921__$1 = (function (){var statearr_64930 = state_64921;
(statearr_64930[(9)] = inst_64888);

(statearr_64930[(8)] = inst_64885);

(statearr_64930[(11)] = inst_64886);

(statearr_64930[(10)] = inst_64887);

(statearr_64930[(12)] = inst_64908);

return statearr_64930;
})();
var statearr_64931_65046 = state_64921__$1;
(statearr_64931_65046[(2)] = null);

(statearr_64931_65046[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (2))){
var inst_64882 = (state_64921[(2)]);
var inst_64883 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value,inst_64882);
var inst_64884 = cljs.core.seq(inst_64883);
var inst_64885 = inst_64884;
var inst_64886 = null;
var inst_64887 = (0);
var inst_64888 = (0);
var state_64921__$1 = (function (){var statearr_64932 = state_64921;
(statearr_64932[(9)] = inst_64888);

(statearr_64932[(8)] = inst_64885);

(statearr_64932[(11)] = inst_64886);

(statearr_64932[(10)] = inst_64887);

return statearr_64932;
})();
var statearr_64933_65047 = state_64921__$1;
(statearr_64933_65047[(2)] = null);

(statearr_64933_65047[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (11))){
var inst_64898 = (state_64921[(7)]);
var inst_64902 = cljs.core.chunk_first(inst_64898);
var inst_64903 = cljs.core.chunk_rest(inst_64898);
var inst_64904 = cljs.core.count(inst_64902);
var inst_64885 = inst_64903;
var inst_64886 = inst_64902;
var inst_64887 = inst_64904;
var inst_64888 = (0);
var state_64921__$1 = (function (){var statearr_64937 = state_64921;
(statearr_64937[(9)] = inst_64888);

(statearr_64937[(8)] = inst_64885);

(statearr_64937[(11)] = inst_64886);

(statearr_64937[(10)] = inst_64887);

return statearr_64937;
})();
var statearr_64938_65048 = state_64921__$1;
(statearr_64938_65048[(2)] = null);

(statearr_64938_65048[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (9))){
var state_64921__$1 = state_64921;
var statearr_64939_65049 = state_64921__$1;
(statearr_64939_65049[(2)] = null);

(statearr_64939_65049[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (5))){
var inst_64888 = (state_64921[(9)]);
var inst_64885 = (state_64921[(8)]);
var inst_64886 = (state_64921[(11)]);
var inst_64887 = (state_64921[(10)]);
var inst_64893 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_64886,inst_64888);
var inst_64894 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_64893);
var inst_64895 = (inst_64888 + (1));
var tmp64934 = inst_64885;
var tmp64935 = inst_64886;
var tmp64936 = inst_64887;
var inst_64885__$1 = tmp64934;
var inst_64886__$1 = tmp64935;
var inst_64887__$1 = tmp64936;
var inst_64888__$1 = inst_64895;
var state_64921__$1 = (function (){var statearr_64940 = state_64921;
(statearr_64940[(9)] = inst_64888__$1);

(statearr_64940[(13)] = inst_64894);

(statearr_64940[(8)] = inst_64885__$1);

(statearr_64940[(11)] = inst_64886__$1);

(statearr_64940[(10)] = inst_64887__$1);

return statearr_64940;
})();
var statearr_64941_65050 = state_64921__$1;
(statearr_64941_65050[(2)] = null);

(statearr_64941_65050[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (10))){
var inst_64915 = (state_64921[(2)]);
var state_64921__$1 = state_64921;
var statearr_64942_65051 = state_64921__$1;
(statearr_64942_65051[(2)] = inst_64915);

(statearr_64942_65051[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_64922 === (8))){
var inst_64898 = (state_64921[(7)]);
var inst_64900 = cljs.core.chunked_seq_QMARK_(inst_64898);
var state_64921__$1 = state_64921;
if(inst_64900){
var statearr_64943_65052 = state_64921__$1;
(statearr_64943_65052[(1)] = (11));

} else {
var statearr_64944_65053 = state_64921__$1;
(statearr_64944_65053[(1)] = (12));

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
});})(seq__64796,chunk__64798,count__64799,i__64800,c__36154__auto___65039,out_c_65037,model_id_65038,step,seq__64796__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y))
;
return ((function (seq__64796,chunk__64798,count__64799,i__64800,switch__36040__auto__,c__36154__auto___65039,out_c_65037,model_id_65038,step,seq__64796__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y){
return (function() {
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____0 = (function (){
var statearr_64948 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_64948[(0)] = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__);

(statearr_64948[(1)] = (1));

return statearr_64948;
});
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____1 = (function (state_64921){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_64921);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e64949){if((e64949 instanceof Object)){
var ex__36044__auto__ = e64949;
var statearr_64950_65054 = state_64921;
(statearr_64950_65054[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_64921);

return cljs.core.cst$kw$recur;
} else {
throw e64949;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__65055 = state_64921;
state_64921 = G__65055;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__ = function(state_64921){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____1.call(this,state_64921);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__36041__auto__;
})()
;})(seq__64796,chunk__64798,count__64799,i__64800,switch__36040__auto__,c__36154__auto___65039,out_c_65037,model_id_65038,step,seq__64796__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y))
})();
var state__36156__auto__ = (function (){var statearr_64951 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_64951[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto___65039);

return statearr_64951;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(seq__64796,chunk__64798,count__64799,i__64800,c__36154__auto___65039,out_c_65037,model_id_65038,step,seq__64796__$1,temp__4653__auto__,step__GT_scores,hover_i,hover_y))
);


var G__65056 = cljs.core.next(seq__64796__$1);
var G__65057 = null;
var G__65058 = (0);
var G__65059 = (0);
seq__64796 = G__65056;
chunk__64798 = G__65057;
count__64799 = G__65058;
i__64800 = G__65059;
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
return (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64952(s__64953){
return (new cljs.core.LazySeq(null,((function (h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (){
var s__64953__$1 = s__64953;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__64953__$1);
if(temp__4653__auto__){
var s__64953__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__64953__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64953__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64955 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64954 = (0);
while(true){
if((i__64954 < size__5453__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64954);
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(draw_dts,i);
var from_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),(dt + (1)),null);
var y_scores = (cljs.core.truth_(from_step)?(function (){var iter__5454__auto__ = ((function (i__64954,dt,from_step,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64952_$_iter__64980(s__64981){
return (new cljs.core.LazySeq(null,((function (i__64954,dt,from_step,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (){
var s__64981__$1 = s__64981;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__64981__$1);
if(temp__4653__auto____$1){
var s__64981__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__64981__$2)){
var c__5452__auto____$1 = cljs.core.chunk_first(s__64981__$2);
var size__5453__auto____$1 = cljs.core.count(c__5452__auto____$1);
var b__64983 = cljs.core.chunk_buffer(size__5453__auto____$1);
if((function (){var i__64982 = (0);
while(true){
if((i__64982 < size__5453__auto____$1)){
var vec__64988 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto____$1,i__64982);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64988,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64988,(1),null);
cljs.core.chunk_append(b__64983,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null));

var G__65060 = (i__64982 + (1));
i__64982 = G__65060;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64983),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64952_$_iter__64980(cljs.core.chunk_rest(s__64981__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64983),null);
}
} else {
var vec__64989 = cljs.core.first(s__64981__$2);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64989,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64989,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64952_$_iter__64980(cljs.core.rest(s__64981__$2)));
}
} else {
return null;
}
break;
}
});})(i__64954,dt,from_step,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,null,null));
});})(i__64954,dt,from_step,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
;
return iter__5454__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores)),from_step)));
})():null);
cljs.core.chunk_append(b__64955,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate("),cljs.core.str((org.numenta.sanity.demos.hotgym.unit_width * ((draw_steps - (1)) - i))),cljs.core.str(",0)")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,(function (){var G__64990 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,h,cljs.core.cst$kw$fill,"white"], null);
if(cljs.core.truth_(from_step)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__64990,cljs.core.cst$kw$on_DASH_click,((function (i__64954,G__64990,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
return org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,from_step,org.numenta.sanity.demos.hotgym.y__GT_consumption(y,h,top,bottom));
});})(i__64954,G__64990,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.array_seq([cljs.core.cst$kw$on_DASH_mouse_DASH_move,((function (i__64954,G__64990,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,i) : cljs.core.reset_BANG_.call(null,hover_i,i));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,y) : cljs.core.reset_BANG_.call(null,hover_y,y));
});})(i__64954,G__64990,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (i__64954,G__64990,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,null) : cljs.core.reset_BANG_.call(null,hover_i,null));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,null) : cljs.core.reset_BANG_.call(null,hover_y,null));
});})(i__64954,G__64990,dt,from_step,y_scores,i,c__5452__auto__,size__5453__auto__,b__64955,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
], 0));
} else {
return G__64990;
}
})()], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$pointer_DASH_events,"none"], null)], null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_gradient_svg,y_scores], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_samples_svg,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,y_scores)], null):null),(((((0) <= dt)) && ((dt < cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps))))))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.actual_svg,cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),dt),top,unit_height], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.prediction_svg,y_scores], null):null)], null)], null));

var G__65061 = (i__64954 + (1));
i__64954 = G__65061;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64955),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64952(cljs.core.chunk_rest(s__64953__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64955),null);
}
} else {
var i = cljs.core.first(s__64953__$2);
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(draw_dts,i);
var from_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),(dt + (1)),null);
var y_scores = (cljs.core.truth_(from_step)?(function (){var iter__5454__auto__ = ((function (dt,from_step,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64952_$_iter__64991(s__64992){
return (new cljs.core.LazySeq(null,((function (dt,from_step,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (){
var s__64992__$1 = s__64992;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__64992__$1);
if(temp__4653__auto____$1){
var s__64992__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__64992__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__64992__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__64994 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__64993 = (0);
while(true){
if((i__64993 < size__5453__auto__)){
var vec__64999 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__64993);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64999,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64999,(1),null);
cljs.core.chunk_append(b__64994,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null));

var G__65062 = (i__64993 + (1));
i__64993 = G__65062;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__64994),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64952_$_iter__64991(cljs.core.chunk_rest(s__64992__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__64994),null);
}
} else {
var vec__65000 = cljs.core.first(s__64992__$2);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65000,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65000,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64952_$_iter__64991(cljs.core.rest(s__64992__$2)));
}
} else {
return null;
}
break;
}
});})(dt,from_step,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,null,null));
});})(dt,from_step,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
;
return iter__5454__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores)),from_step)));
})():null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate("),cljs.core.str((org.numenta.sanity.demos.hotgym.unit_width * ((draw_steps - (1)) - i))),cljs.core.str(",0)")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,(function (){var G__65001 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,h,cljs.core.cst$kw$fill,"white"], null);
if(cljs.core.truth_(from_step)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__65001,cljs.core.cst$kw$on_DASH_click,((function (G__65001,dt,from_step,y_scores,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
return org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,from_step,org.numenta.sanity.demos.hotgym.y__GT_consumption(y,h,top,bottom));
});})(G__65001,dt,from_step,y_scores,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.array_seq([cljs.core.cst$kw$on_DASH_mouse_DASH_move,((function (G__65001,dt,from_step,y_scores,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,i) : cljs.core.reset_BANG_.call(null,hover_i,i));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,y) : cljs.core.reset_BANG_.call(null,hover_y,y));
});})(G__65001,dt,from_step,y_scores,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (G__65001,dt,from_step,y_scores,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,null) : cljs.core.reset_BANG_.call(null,hover_i,null));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,null) : cljs.core.reset_BANG_.call(null,hover_y,null));
});})(G__65001,dt,from_step,y_scores,i,s__64953__$2,temp__4653__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
], 0));
} else {
return G__65001;
}
})()], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$pointer_DASH_events,"none"], null)], null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_gradient_svg,y_scores], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_samples_svg,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,y_scores)], null):null),(((((0) <= dt)) && ((dt < cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps))))))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.actual_svg,cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),dt),top,unit_height], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.prediction_svg,y_scores], null):null)], null)], null),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__64952(cljs.core.rest(s__64953__$2)));
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
var vec__65002 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (i,dt,from_step,y,consumption,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (p__65005){
var vec__65006 = p__65005;
var vec__65007 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65006,(0),null);
var c1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65007,(0),null);
var s1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65007,(1),null);
var vec__65008 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65006,(1),null);
var c2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65008,(0),null);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65008,(1),null);
return ((c1 <= consumption)) && ((consumption <= c2));
});})(i,dt,from_step,y,consumption,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores)),from_step)))));
var vec__65003 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65002,(0),null);
var lower_consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65003,(0),null);
var lower_score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65003,(1),null);
var vec__65004 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65002,(1),null);
var upper_consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65004,(0),null);
var upper_score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65004,(1),null);
var lower_y = org.numenta.sanity.demos.hotgym.consumption__GT_y(lower_consumption,top,unit_height);
var upper_y = org.numenta.sanity.demos.hotgym.consumption__GT_y(upper_consumption,top,unit_height);
var dt_left = (w_pad_left + (org.numenta.sanity.demos.hotgym.unit_width * (((draw_steps - (1)) - i) + 0.5)));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$left,(0),cljs.core.cst$kw$top,h_pad_top,cljs.core.cst$kw$pointer_DASH_events,"none"], null)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.horizontal_label,dt_left,lower_y,(w + w_pad_left),true,null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,[cljs.core.str(lower_consumption.toFixed((1))),cljs.core.str("kW")].join(''),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),[cljs.core.str(lower_score.toFixed((3)))].join('')], null)], null),(function (){var contents = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,[cljs.core.str(consumption.toFixed((1))),cljs.core.str("kW")].join(''),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),"click"], null);
var vec__65009 = ((((y - upper_y) > (30)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [contents,null], null):((((lower_y - y) > (30)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,contents], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null)
));
var above = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65009,(0),null);
var below = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65009,(1),null);
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.horizontal_label,dt_left,y,(w + w_pad_left),false,above,below], null);
})(),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.horizontal_label,dt_left,upper_y,(w + w_pad_left),true,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,[cljs.core.str(upper_consumption.toFixed((1))),cljs.core.str("kW")].join(''),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),[cljs.core.str(upper_score.toFixed((3)))].join('')], null),null], null)], null);
})():null)], null);
});
;})(step__GT_scores,hover_i,hover_y))
});
org.numenta.sanity.demos.hotgym.world_pane = (function org$numenta$sanity$demos$hotgym$world_pane(){
if(cljs.core.truth_(cljs.core.not_empty((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps))))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(10)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_radar_pane], null)], null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(30)], null)], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$hotgym$world_pane_$_iter__65073(s__65074){
return (new cljs.core.LazySeq(null,(function (){
var s__65074__$1 = s__65074;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__65074__$1);
if(temp__4653__auto__){
var s__65074__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__65074__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__65074__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__65076 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__65075 = (0);
while(true){
if((i__65075 < size__5453__auto__)){
var vec__65081 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__65075);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65081,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65081,(1),null);
cljs.core.chunk_append(b__65076,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_bottom,(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),cljs.core.name(sense_id)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,[cljs.core.str(v)].join('')], null)], null)], null));

var G__65083 = (i__65075 + (1));
i__65075 = G__65083;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__65076),org$numenta$sanity$demos$hotgym$world_pane_$_iter__65073(cljs.core.chunk_rest(s__65074__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__65076),null);
}
} else {
var vec__65082 = cljs.core.first(s__65074__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65082,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65082,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_bottom,(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),cljs.core.name(sense_id)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,[cljs.core.str(v)].join('')], null)], null)], null),org$numenta$sanity$demos$hotgym$world_pane_$_iter__65073(cljs.core.rest(s__65074__$2)));
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
var G__65092_65100 = org.numenta.sanity.demos.hotgym.model;
var G__65093_65101 = org.nfrac.comportex.core.region_network(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$rgn_DASH_0,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$power_DASH_consumption,cljs.core.cst$kw$is_DASH_weekend_QMARK_,cljs.core.cst$kw$hour_DASH_of_DASH_day], null)], null),cljs.core.constantly(org.nfrac.comportex.core.sensory_region),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$rgn_DASH_0,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.nfrac.comportex.cells.better_parameter_defaults,cljs.core.cst$kw$depth,(1),cljs.core.array_seq([cljs.core.cst$kw$max_DASH_segments,(128),cljs.core.cst$kw$distal_DASH_perm_DASH_connected,0.2,cljs.core.cst$kw$distal_DASH_perm_DASH_init,0.2], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$power_DASH_consumption,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$consumption,org.numenta.sanity.demos.hotgym.sampling_linear_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [((1024) + (256))], null),(17),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [-12.8,112.8], null),12.8)], null)], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$is_DASH_weekend_QMARK_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$is_DASH_weekend_QMARK_,org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(10)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,false], null))], null),cljs.core.cst$kw$hour_DASH_of_DASH_day,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hour_DASH_of_DASH_day,org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [((40) * (24))], null),cljs.core.range.cljs$core$IFn$_invoke$arity$1((24)))], null)], null));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65092_65100,G__65093_65101) : cljs.core.reset_BANG_.call(null,G__65092_65100,G__65093_65101));

if(init_QMARK_){
var G__65095_65102 = "../data/hotgym.consumption_weekend_hour.edn";
var G__65096_65103 = ((function (G__65095_65102,init_QMARK_){
return (function (e){
if(cljs.core.truth_(e.target.isSuccess())){
var response = e.target.getResponseText();
var inputs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.zipmap,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$consumption,cljs.core.cst$kw$is_DASH_weekend_QMARK_,cljs.core.cst$kw$hour_DASH_of_DASH_day], null)),cljs.reader.read_string(response));
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.hotgym.world_c,inputs,false);
} else {
var G__65097 = [cljs.core.str("Request to "),cljs.core.str(e.target.getLastUri()),cljs.core.str(" failed. "),cljs.core.str(e.target.getStatus()),cljs.core.str(" - "),cljs.core.str(e.target.getStatusText())].join('');
return log.error(G__65097);
}
});})(G__65095_65102,init_QMARK_))
;
goog.net.XhrIo.send(G__65095_65102,G__65096_65103);

return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.hotgym.model,org.numenta.sanity.demos.hotgym.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.hotgym.into_sim);
} else {
var G__65098 = org.numenta.sanity.main.step_template;
var G__65099 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.model)));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__65098,G__65099) : cljs.core.reset_BANG_.call(null,G__65098,G__65099));
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
