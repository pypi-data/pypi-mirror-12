// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.encoders');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.nfrac.comportex.topology');
goog.require('org.nfrac.comportex.util');
goog.require('clojure.test.check.random');
cljs.core.Keyword.prototype.org$nfrac$comportex$protocols$PSelector$ = true;

cljs.core.Keyword.prototype.org$nfrac$comportex$protocols$PSelector$extract$arity$2 = (function (this$,state){
var this$__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(state,this$__$1);
});

cljs.core.PersistentVector.prototype.org$nfrac$comportex$protocols$PSelector$ = true;

cljs.core.PersistentVector.prototype.org$nfrac$comportex$protocols$PSelector$extract$arity$2 = (function (this$,state){
var this$__$1 = this;
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,this$__$1);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {org.nfrac.comportex.protocols.PSelector}
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
org.nfrac.comportex.encoders.VecSelector = (function (selectors,__meta,__extmap,__hash){
this.selectors = selectors;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63711,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63713 = (((k63711 instanceof cljs.core.Keyword))?k63711.fqn:null);
switch (G__63713) {
case "selectors":
return self__.selectors;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63711,else__5299__auto__);

}
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.encoders.VecSelector{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$selectors,self__.selectors],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63710){
var self__ = this;
var G__63710__$1 = this;
return (new cljs.core.RecordIter((0),G__63710__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$selectors], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.encoders.VecSelector(self__.selectors,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.encoders.VecSelector.prototype.org$nfrac$comportex$protocols$PSelector$ = true;

org.nfrac.comportex.encoders.VecSelector.prototype.org$nfrac$comportex$protocols$PSelector$extract$arity$2 = (function (_,state){
var self__ = this;
var ___$1 = this;
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.protocols.extract,self__.selectors,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(state));
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$selectors,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.encoders.VecSelector(self__.selectors,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63710){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63714 = cljs.core.keyword_identical_QMARK_;
var expr__63715 = k__5304__auto__;
if(cljs.core.truth_((pred__63714.cljs$core$IFn$_invoke$arity$2 ? pred__63714.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$selectors,expr__63715) : pred__63714.call(null,cljs.core.cst$kw$selectors,expr__63715)))){
return (new org.nfrac.comportex.encoders.VecSelector(G__63710,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.VecSelector(self__.selectors,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63710),null));
}
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$selectors,self__.selectors],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63710){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.VecSelector(self__.selectors,G__63710,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.encoders.VecSelector.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$selectors], null);
});

org.nfrac.comportex.encoders.VecSelector.cljs$lang$type = true;

org.nfrac.comportex.encoders.VecSelector.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.encoders/VecSelector");
});

org.nfrac.comportex.encoders.VecSelector.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.encoders/VecSelector");
});

org.nfrac.comportex.encoders.__GT_VecSelector = (function org$nfrac$comportex$encoders$__GT_VecSelector(selectors){
return (new org.nfrac.comportex.encoders.VecSelector(selectors,null,null,null));
});

org.nfrac.comportex.encoders.map__GT_VecSelector = (function org$nfrac$comportex$encoders$map__GT_VecSelector(G__63712){
return (new org.nfrac.comportex.encoders.VecSelector(cljs.core.cst$kw$selectors.cljs$core$IFn$_invoke$arity$1(G__63712),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__63712,cljs.core.cst$kw$selectors),null));
});

org.nfrac.comportex.encoders.vec_selector = (function org$nfrac$comportex$encoders$vec_selector(var_args){
var args__5747__auto__ = [];
var len__5740__auto___63719 = arguments.length;
var i__5741__auto___63720 = (0);
while(true){
if((i__5741__auto___63720 < len__5740__auto___63719)){
args__5747__auto__.push((arguments[i__5741__auto___63720]));

var G__63721 = (i__5741__auto___63720 + (1));
i__5741__auto___63720 = G__63721;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((0) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((0)),(0))):null);
return org.nfrac.comportex.encoders.vec_selector.cljs$core$IFn$_invoke$arity$variadic(argseq__5748__auto__);
});

org.nfrac.comportex.encoders.vec_selector.cljs$core$IFn$_invoke$arity$variadic = (function (selectors){
return org.nfrac.comportex.encoders.__GT_VecSelector(selectors);
});

org.nfrac.comportex.encoders.vec_selector.cljs$lang$maxFixedArity = (0);

org.nfrac.comportex.encoders.vec_selector.cljs$lang$applyTo = (function (seq63718){
return org.nfrac.comportex.encoders.vec_selector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq63718));
});
org.nfrac.comportex.encoders.prediction_stats = (function org$nfrac$comportex$encoders$prediction_stats(x_bits,bit_votes,total_votes){
var o_votes = cljs.core.select_keys(bit_votes,x_bits);
var total_o_votes = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.vals(o_votes));
var o_bits = cljs.core.keys(o_votes);
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$bit_DASH_coverage,(cljs.core.count(o_bits) / (function (){var x__5013__auto__ = (1);
var y__5014__auto__ = cljs.core.count(x_bits);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})()),cljs.core.cst$kw$bit_DASH_precision,(cljs.core.count(o_bits) / (function (){var x__5013__auto__ = (1);
var y__5014__auto__ = cljs.core.count(bit_votes);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})()),cljs.core.cst$kw$votes_DASH_frac,(total_o_votes / (function (){var x__5013__auto__ = (1);
var y__5014__auto__ = total_votes;
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})()),cljs.core.cst$kw$votes_DASH_per_DASH_bit,(total_o_votes / (function (){var x__5013__auto__ = (1);
var y__5014__auto__ = cljs.core.count(x_bits);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})())], null);
});
org.nfrac.comportex.encoders.decode_by_brute_force = (function org$nfrac$comportex$encoders$decode_by_brute_force(e,try_values,bit_votes){
var total_votes = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.vals(bit_votes));
if((total_votes > (0))){
return cljs.core.reverse(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$votes_DASH_frac,cljs.core.cst$kw$bit_DASH_coverage,cljs.core.cst$kw$bit_DASH_precision),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.pos_QMARK_,cljs.core.cst$kw$votes_DASH_frac),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (total_votes){
return (function (x){
var x_bits = org.nfrac.comportex.protocols.encode(e,x);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.encoders.prediction_stats(x_bits,bit_votes,total_votes),cljs.core.cst$kw$value,x);
});})(total_votes))
,try_values))));
} else {
return null;
}
});
org.nfrac.comportex.encoders.unaligned_bit_votes = (function org$nfrac$comportex$encoders$unaligned_bit_votes(widths,aligned){
var vec__63723 = cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.keys,cljs.core.vals).call(null,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map(),aligned));
var is = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63723,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63723,(1),null);
var partitioned_is = org.nfrac.comportex.util.unalign_indices(widths,is);
var partitioned_vs = org.nfrac.comportex.util.splits_at(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,partitioned_is),vs);
return cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.zipmap,partitioned_is,partitioned_vs);
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
org.nfrac.comportex.encoders.ConcatEncoder = (function (encoders,__meta,__extmap,__hash){
this.encoders = encoders;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63727,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63729 = (((k63727 instanceof cljs.core.Keyword))?k63727.fqn:null);
switch (G__63729) {
case "encoders":
return self__.encoders;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63727,else__5299__auto__);

}
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.nfrac.comportex.encoders.ConcatEncoder.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var dim = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.topology.combined_dimensions,cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.dims_of,self__.encoders));
return org.nfrac.comportex.topology.make_topology(dim);
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.encoders.ConcatEncoder{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$encoders,self__.encoders],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63726){
var self__ = this;
var G__63726__$1 = this;
return (new cljs.core.RecordIter((0),G__63726__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$encoders], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.encoders.ConcatEncoder(self__.encoders,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.encoders.ConcatEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$ = true;

org.nfrac.comportex.encoders.ConcatEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = (function (_,xs){
var self__ = this;
var ___$1 = this;
var bit_widths = cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.size_of,self__.encoders);
return org.nfrac.comportex.util.align_indices.cljs$core$IFn$_invoke$arity$2(bit_widths,cljs.core.map.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.protocols.encode,self__.encoders,xs));
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$decode$arity$3 = (function (_,bit_votes,n_values){
var self__ = this;
var ___$1 = this;
var bit_widths = cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.size_of,self__.encoders);
return cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (bit_widths,___$1){
return (function (p1__63724_SHARP_,p2__63725_SHARP_){
return org.nfrac.comportex.protocols.decode(p1__63724_SHARP_,p2__63725_SHARP_,n_values);
});})(bit_widths,___$1))
,self__.encoders,org.nfrac.comportex.encoders.unaligned_bit_votes(bit_widths,bit_votes));
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$encoders,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.encoders.ConcatEncoder(self__.encoders,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63726){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63730 = cljs.core.keyword_identical_QMARK_;
var expr__63731 = k__5304__auto__;
if(cljs.core.truth_((pred__63730.cljs$core$IFn$_invoke$arity$2 ? pred__63730.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$encoders,expr__63731) : pred__63730.call(null,cljs.core.cst$kw$encoders,expr__63731)))){
return (new org.nfrac.comportex.encoders.ConcatEncoder(G__63726,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.ConcatEncoder(self__.encoders,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63726),null));
}
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$encoders,self__.encoders],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63726){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.ConcatEncoder(self__.encoders,G__63726,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.encoders.ConcatEncoder.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$encoders], null);
});

org.nfrac.comportex.encoders.ConcatEncoder.cljs$lang$type = true;

org.nfrac.comportex.encoders.ConcatEncoder.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.encoders/ConcatEncoder");
});

org.nfrac.comportex.encoders.ConcatEncoder.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.encoders/ConcatEncoder");
});

org.nfrac.comportex.encoders.__GT_ConcatEncoder = (function org$nfrac$comportex$encoders$__GT_ConcatEncoder(encoders){
return (new org.nfrac.comportex.encoders.ConcatEncoder(encoders,null,null,null));
});

org.nfrac.comportex.encoders.map__GT_ConcatEncoder = (function org$nfrac$comportex$encoders$map__GT_ConcatEncoder(G__63728){
return (new org.nfrac.comportex.encoders.ConcatEncoder(cljs.core.cst$kw$encoders.cljs$core$IFn$_invoke$arity$1(G__63728),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__63728,cljs.core.cst$kw$encoders),null));
});

/**
 * Returns an encoder for a sequence of values, where each is encoded
 *   separately before the results are concatenated into a single
 *   sense. Each value by index is passed to the corresponding index of
 *   `encoders`.
 */
org.nfrac.comportex.encoders.encat = (function org$nfrac$comportex$encoders$encat(encoders){
return org.nfrac.comportex.encoders.__GT_ConcatEncoder(encoders);
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
org.nfrac.comportex.encoders.SplatEncoder = (function (encoder,__meta,__extmap,__hash){
this.encoder = encoder;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63735,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63737 = (((k63735 instanceof cljs.core.Keyword))?k63735.fqn:null);
switch (G__63737) {
case "encoder":
return self__.encoder;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63735,else__5299__auto__);

}
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.nfrac.comportex.encoders.SplatEncoder.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.nfrac.comportex.protocols.topology(self__.encoder);
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.encoders.SplatEncoder{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$encoder,self__.encoder],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63734){
var self__ = this;
var G__63734__$1 = this;
return (new cljs.core.RecordIter((0),G__63734__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$encoder], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.encoders.SplatEncoder(self__.encoder,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.encoders.SplatEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$ = true;

org.nfrac.comportex.encoders.SplatEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = (function (_,xs){
var self__ = this;
var ___$1 = this;
return cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.protocols.encode,self__.encoder),cljs.core.array_seq([xs], 0)));
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$encoder,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.encoders.SplatEncoder(self__.encoder,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63734){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63738 = cljs.core.keyword_identical_QMARK_;
var expr__63739 = k__5304__auto__;
if(cljs.core.truth_((pred__63738.cljs$core$IFn$_invoke$arity$2 ? pred__63738.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$encoder,expr__63739) : pred__63738.call(null,cljs.core.cst$kw$encoder,expr__63739)))){
return (new org.nfrac.comportex.encoders.SplatEncoder(G__63734,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.SplatEncoder(self__.encoder,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63734),null));
}
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$encoder,self__.encoder],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63734){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.SplatEncoder(self__.encoder,G__63734,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.encoders.SplatEncoder.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$encoder], null);
});

org.nfrac.comportex.encoders.SplatEncoder.cljs$lang$type = true;

org.nfrac.comportex.encoders.SplatEncoder.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.encoders/SplatEncoder");
});

org.nfrac.comportex.encoders.SplatEncoder.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.encoders/SplatEncoder");
});

org.nfrac.comportex.encoders.__GT_SplatEncoder = (function org$nfrac$comportex$encoders$__GT_SplatEncoder(encoder){
return (new org.nfrac.comportex.encoders.SplatEncoder(encoder,null,null,null));
});

org.nfrac.comportex.encoders.map__GT_SplatEncoder = (function org$nfrac$comportex$encoders$map__GT_SplatEncoder(G__63736){
return (new org.nfrac.comportex.encoders.SplatEncoder(cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(G__63736),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__63736,cljs.core.cst$kw$encoder),null));
});

/**
 * Returns an encoder for a sequence of values. The given encoder will
 *   be applied to each value, and the resulting encodings
 *   overlaid (splatted together), taking the union of the sets of bits.
 */
org.nfrac.comportex.encoders.ensplat = (function org$nfrac$comportex$encoders$ensplat(encoder){
return org.nfrac.comportex.encoders.__GT_SplatEncoder(encoder);
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
org.nfrac.comportex.encoders.LinearEncoder = (function (topo,n_active,lower,upper,__meta,__extmap,__hash){
this.topo = topo;
this.n_active = n_active;
this.lower = lower;
this.upper = upper;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63743,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63745 = (((k63743 instanceof cljs.core.Keyword))?k63743.fqn:null);
switch (G__63745) {
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
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63743,else__5299__auto__);

}
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.nfrac.comportex.encoders.LinearEncoder.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.topo;
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.encoders.LinearEncoder{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$lower,self__.lower],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$upper,self__.upper],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63742){
var self__ = this;
var G__63742__$1 = this;
return (new cljs.core.RecordIter((0),G__63742__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$lower,cljs.core.cst$kw$upper], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.encoders.LinearEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$ = true;

org.nfrac.comportex.encoders.LinearEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(x)){
var n_bits = org.nfrac.comportex.protocols.size(self__.topo);
var span = (self__.upper - self__.lower);
var x__$1 = (function (){var x__5020__auto__ = (function (){var x__5013__auto__ = x;
var y__5014__auto__ = self__.lower;
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
var y__5021__auto__ = self__.upper;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
var z = ((x__$1 - self__.lower) / span);
var i = cljs.core.long$((z * (n_bits - self__.n_active)));
return cljs.core.range.cljs$core$IFn$_invoke$arity$2(i,(i + self__.n_active));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(null);
}
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$decode$arity$3 = (function (this$,bit_votes,n){
var self__ = this;
var this$__$1 = this;
var span = (self__.upper - self__.lower);
var values = cljs.core.range.cljs$core$IFn$_invoke$arity$3(self__.lower,self__.upper,(((((5) < span)) && ((span < (250))))?(1):(span / (50))));
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,org.nfrac.comportex.encoders.decode_by_brute_force(this$__$1,values,bit_votes));
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$upper,null,cljs.core.cst$kw$topo,null,cljs.core.cst$kw$lower,null,cljs.core.cst$kw$n_DASH_active,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63742){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63746 = cljs.core.keyword_identical_QMARK_;
var expr__63747 = k__5304__auto__;
if(cljs.core.truth_((pred__63746.cljs$core$IFn$_invoke$arity$2 ? pred__63746.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63747) : pred__63746.call(null,cljs.core.cst$kw$topo,expr__63747)))){
return (new org.nfrac.comportex.encoders.LinearEncoder(G__63742,self__.n_active,self__.lower,self__.upper,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63746.cljs$core$IFn$_invoke$arity$2 ? pred__63746.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__63747) : pred__63746.call(null,cljs.core.cst$kw$n_DASH_active,expr__63747)))){
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,G__63742,self__.lower,self__.upper,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63746.cljs$core$IFn$_invoke$arity$2 ? pred__63746.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$lower,expr__63747) : pred__63746.call(null,cljs.core.cst$kw$lower,expr__63747)))){
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,G__63742,self__.upper,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63746.cljs$core$IFn$_invoke$arity$2 ? pred__63746.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$upper,expr__63747) : pred__63746.call(null,cljs.core.cst$kw$upper,expr__63747)))){
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,self__.lower,G__63742,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63742),null));
}
}
}
}
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$lower,self__.lower],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$upper,self__.upper],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63742){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,G__63742,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.encoders.LinearEncoder.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$topo,cljs.core.cst$sym$n_DASH_active,cljs.core.cst$sym$lower,cljs.core.cst$sym$upper], null);
});

org.nfrac.comportex.encoders.LinearEncoder.cljs$lang$type = true;

org.nfrac.comportex.encoders.LinearEncoder.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.encoders/LinearEncoder");
});

org.nfrac.comportex.encoders.LinearEncoder.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.encoders/LinearEncoder");
});

org.nfrac.comportex.encoders.__GT_LinearEncoder = (function org$nfrac$comportex$encoders$__GT_LinearEncoder(topo,n_active,lower,upper){
return (new org.nfrac.comportex.encoders.LinearEncoder(topo,n_active,lower,upper,null,null,null));
});

org.nfrac.comportex.encoders.map__GT_LinearEncoder = (function org$nfrac$comportex$encoders$map__GT_LinearEncoder(G__63744){
return (new org.nfrac.comportex.encoders.LinearEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63744),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__63744),cljs.core.cst$kw$lower.cljs$core$IFn$_invoke$arity$1(G__63744),cljs.core.cst$kw$upper.cljs$core$IFn$_invoke$arity$1(G__63744),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63744,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$lower,cljs.core.cst$kw$upper], 0)),null));
});

/**
 * Returns a simple encoder for a single number. It encodes a number
 *   by its position on a continuous scale within a numeric range.
 * 
 *   * `dimensions` is the size of the encoder in bits along one or more
 *  dimensions, a vector e.g. [500].
 * 
 *   * `n-active` is the number of bits to be active.
 * 
 *   * `[lower upper]` gives the numeric range to cover. The input number
 *  will be clamped to this range.
 */
org.nfrac.comportex.encoders.linear_encoder = (function org$nfrac$comportex$encoders$linear_encoder(dimensions,n_active,p__63750){
var vec__63752 = p__63750;
var lower = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63752,(0),null);
var upper = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63752,(1),null);
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.nfrac.comportex.encoders.map__GT_LinearEncoder(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$n_DASH_active,n_active,cljs.core.cst$kw$lower,lower,cljs.core.cst$kw$upper,upper], null));
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
org.nfrac.comportex.encoders.CategoryEncoder = (function (topo,value__GT_index,__meta,__extmap,__hash){
this.topo = topo;
this.value__GT_index = value__GT_index;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63754,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63756 = (((k63754 instanceof cljs.core.Keyword))?k63754.fqn:null);
switch (G__63756) {
case "topo":
return self__.topo;

break;
case "value->index":
return self__.value__GT_index;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63754,else__5299__auto__);

}
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.nfrac.comportex.encoders.CategoryEncoder.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.topo;
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.encoders.CategoryEncoder{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$value_DASH__GT_index,self__.value__GT_index],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63753){
var self__ = this;
var G__63753__$1 = this;
return (new cljs.core.RecordIter((0),G__63753__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$value_DASH__GT_index], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.encoders.CategoryEncoder(self__.topo,self__.value__GT_index,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.encoders.CategoryEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$ = true;

org.nfrac.comportex.encoders.CategoryEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
var temp__4651__auto__ = (self__.value__GT_index.cljs$core$IFn$_invoke$arity$1 ? self__.value__GT_index.cljs$core$IFn$_invoke$arity$1(x) : self__.value__GT_index.call(null,x));
if(cljs.core.truth_(temp__4651__auto__)){
var idx = temp__4651__auto__;
var n_bits = org.nfrac.comportex.protocols.size(self__.topo);
var n_active = cljs.core.quot(n_bits,cljs.core.count(self__.value__GT_index));
var i = (idx * n_active);
return cljs.core.range.cljs$core$IFn$_invoke$arity$2(i,(i + n_active));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(null);
}
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$decode$arity$3 = (function (this$,bit_votes,n){
var self__ = this;
var this$__$1 = this;
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,org.nfrac.comportex.encoders.decode_by_brute_force(this$__$1,cljs.core.keys(self__.value__GT_index),bit_votes));
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$topo,null,cljs.core.cst$kw$value_DASH__GT_index,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.encoders.CategoryEncoder(self__.topo,self__.value__GT_index,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63753){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63757 = cljs.core.keyword_identical_QMARK_;
var expr__63758 = k__5304__auto__;
if(cljs.core.truth_((pred__63757.cljs$core$IFn$_invoke$arity$2 ? pred__63757.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63758) : pred__63757.call(null,cljs.core.cst$kw$topo,expr__63758)))){
return (new org.nfrac.comportex.encoders.CategoryEncoder(G__63753,self__.value__GT_index,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63757.cljs$core$IFn$_invoke$arity$2 ? pred__63757.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value_DASH__GT_index,expr__63758) : pred__63757.call(null,cljs.core.cst$kw$value_DASH__GT_index,expr__63758)))){
return (new org.nfrac.comportex.encoders.CategoryEncoder(self__.topo,G__63753,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.CategoryEncoder(self__.topo,self__.value__GT_index,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63753),null));
}
}
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$value_DASH__GT_index,self__.value__GT_index],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63753){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.CategoryEncoder(self__.topo,self__.value__GT_index,G__63753,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.encoders.CategoryEncoder.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$topo,cljs.core.cst$sym$value_DASH__GT_index], null);
});

org.nfrac.comportex.encoders.CategoryEncoder.cljs$lang$type = true;

org.nfrac.comportex.encoders.CategoryEncoder.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.encoders/CategoryEncoder");
});

org.nfrac.comportex.encoders.CategoryEncoder.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.encoders/CategoryEncoder");
});

org.nfrac.comportex.encoders.__GT_CategoryEncoder = (function org$nfrac$comportex$encoders$__GT_CategoryEncoder(topo,value__GT_index){
return (new org.nfrac.comportex.encoders.CategoryEncoder(topo,value__GT_index,null,null,null));
});

org.nfrac.comportex.encoders.map__GT_CategoryEncoder = (function org$nfrac$comportex$encoders$map__GT_CategoryEncoder(G__63755){
return (new org.nfrac.comportex.encoders.CategoryEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63755),cljs.core.cst$kw$value_DASH__GT_index.cljs$core$IFn$_invoke$arity$1(G__63755),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63755,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$value_DASH__GT_index], 0)),null));
});

org.nfrac.comportex.encoders.category_encoder = (function org$nfrac$comportex$encoders$category_encoder(dimensions,values){
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.nfrac.comportex.encoders.map__GT_CategoryEncoder(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$value_DASH__GT_index,cljs.core.zipmap(values,cljs.core.range.cljs$core$IFn$_invoke$arity$0())], null));
});
org.nfrac.comportex.encoders.unique_sdr = (function org$nfrac$comportex$encoders$unique_sdr(x,n_bits,n_active){
var rngs = clojure.test.check.random.split_n(clojure.test.check.random.make_random.cljs$core$IFn$_invoke$arity$1(cljs.core.hash(x)),cljs.core.long$((n_active * 1.25)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.List.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$3(cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (rngs){
return (function (p1__63761_SHARP_){
return org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$2(p1__63761_SHARP_,n_bits);
});})(rngs))
),cljs.core.distinct.cljs$core$IFn$_invoke$arity$0(),cljs.core.take.cljs$core$IFn$_invoke$arity$1(n_active)),rngs);
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
org.nfrac.comportex.encoders.UniqueEncoder = (function (topo,n_active,cache,__meta,__extmap,__hash){
this.topo = topo;
this.n_active = n_active;
this.cache = cache;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63763,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63765 = (((k63763 instanceof cljs.core.Keyword))?k63763.fqn:null);
switch (G__63765) {
case "topo":
return self__.topo;

break;
case "n-active":
return self__.n_active;

break;
case "cache":
return self__.cache;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63763,else__5299__auto__);

}
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.nfrac.comportex.encoders.UniqueEncoder.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.topo;
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.encoders.UniqueEncoder{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$cache,self__.cache],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63762){
var self__ = this;
var G__63762__$1 = this;
return (new cljs.core.RecordIter((0),G__63762__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$cache], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,self__.n_active,self__.cache,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (3 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.encoders.UniqueEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$ = true;

org.nfrac.comportex.encoders.UniqueEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
if((x == null)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(null);
} else {
var or__4682__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.cache) : cljs.core.deref.call(null,self__.cache)),x);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
var sdr = org.nfrac.comportex.encoders.unique_sdr(x,org.nfrac.comportex.protocols.size(self__.topo),self__.n_active);
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cache,cljs.core.assoc,x,sdr),x);
}
}
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$decode$arity$3 = (function (this$,bit_votes,n){
var self__ = this;
var this$__$1 = this;
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,org.nfrac.comportex.encoders.decode_by_brute_force(this$__$1,cljs.core.keys((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.cache) : cljs.core.deref.call(null,self__.cache))),bit_votes));
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$topo,null,cljs.core.cst$kw$cache,null,cljs.core.cst$kw$n_DASH_active,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,self__.n_active,self__.cache,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63762){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63766 = cljs.core.keyword_identical_QMARK_;
var expr__63767 = k__5304__auto__;
if(cljs.core.truth_((pred__63766.cljs$core$IFn$_invoke$arity$2 ? pred__63766.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63767) : pred__63766.call(null,cljs.core.cst$kw$topo,expr__63767)))){
return (new org.nfrac.comportex.encoders.UniqueEncoder(G__63762,self__.n_active,self__.cache,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63766.cljs$core$IFn$_invoke$arity$2 ? pred__63766.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__63767) : pred__63766.call(null,cljs.core.cst$kw$n_DASH_active,expr__63767)))){
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,G__63762,self__.cache,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63766.cljs$core$IFn$_invoke$arity$2 ? pred__63766.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cache,expr__63767) : pred__63766.call(null,cljs.core.cst$kw$cache,expr__63767)))){
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,self__.n_active,G__63762,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,self__.n_active,self__.cache,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63762),null));
}
}
}
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$cache,self__.cache],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63762){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,self__.n_active,self__.cache,G__63762,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.encoders.UniqueEncoder.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$topo,cljs.core.cst$sym$n_DASH_active,cljs.core.cst$sym$cache], null);
});

org.nfrac.comportex.encoders.UniqueEncoder.cljs$lang$type = true;

org.nfrac.comportex.encoders.UniqueEncoder.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.encoders/UniqueEncoder");
});

org.nfrac.comportex.encoders.UniqueEncoder.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.encoders/UniqueEncoder");
});

org.nfrac.comportex.encoders.__GT_UniqueEncoder = (function org$nfrac$comportex$encoders$__GT_UniqueEncoder(topo,n_active,cache){
return (new org.nfrac.comportex.encoders.UniqueEncoder(topo,n_active,cache,null,null,null));
});

org.nfrac.comportex.encoders.map__GT_UniqueEncoder = (function org$nfrac$comportex$encoders$map__GT_UniqueEncoder(G__63764){
return (new org.nfrac.comportex.encoders.UniqueEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63764),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__63764),cljs.core.cst$kw$cache.cljs$core$IFn$_invoke$arity$1(G__63764),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63764,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$cache], 0)),null));
});

/**
 * This encoder generates a unique bit set for each distinct value,
 *   based on its hash. `dimensions` is given as a vector.
 */
org.nfrac.comportex.encoders.unique_encoder = (function org$nfrac$comportex$encoders$unique_encoder(dimensions,n_active){
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.nfrac.comportex.encoders.map__GT_UniqueEncoder(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$n_DASH_active,n_active,cljs.core.cst$kw$cache,(function (){var G__63771 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63771) : cljs.core.atom.call(null,G__63771));
})()], null));
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
org.nfrac.comportex.encoders.Linear2DEncoder = (function (topo,n_active,x_max,y_max,__meta,__extmap,__hash){
this.topo = topo;
this.n_active = n_active;
this.x_max = x_max;
this.y_max = y_max;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63773,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63775 = (((k63773 instanceof cljs.core.Keyword))?k63773.fqn:null);
switch (G__63775) {
case "topo":
return self__.topo;

break;
case "n-active":
return self__.n_active;

break;
case "x-max":
return self__.x_max;

break;
case "y-max":
return self__.y_max;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63773,else__5299__auto__);

}
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.topo;
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.encoders.Linear2DEncoder{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_max,self__.x_max],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_max,self__.y_max],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63772){
var self__ = this;
var G__63772__$1 = this;
return (new cljs.core.RecordIter((0),G__63772__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$x_DASH_max,cljs.core.cst$kw$y_DASH_max], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,self__.x_max,self__.y_max,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$ = true;

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = (function (_,p__63776){
var self__ = this;
var vec__63777 = p__63776;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63777,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63777,(1),null);
var ___$1 = this;
if(cljs.core.truth_(x)){
var vec__63778 = org.nfrac.comportex.protocols.dimensions(self__.topo);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63778,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63778,(1),null);
var x__$1 = (function (){var x__5020__auto__ = (function (){var x__5013__auto__ = x;
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
var y__5021__auto__ = self__.x_max;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
var y__$1 = (function (){var x__5020__auto__ = (function (){var x__5013__auto__ = y;
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})();
var y__5021__auto__ = self__.y_max;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
var xz = (x__$1 / self__.x_max);
var yz = (y__$1 / self__.y_max);
var xi = cljs.core.long$((xz * w));
var yi = cljs.core.long$((yz * h));
var coord = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [xi,yi], null);
var idx = org.nfrac.comportex.protocols.index_of_coordinates(self__.topo,coord);
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(self__.n_active,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (vec__63778,w,h,x__$1,y__$1,xz,yz,xi,yi,coord,idx,___$1,vec__63777,x,y){
return (function (radius){
return org.nfrac.comportex.protocols.neighbours_indices.cljs$core$IFn$_invoke$arity$4(self__.topo,idx,radius,(radius - (1)));
});})(vec__63778,w,h,x__$1,y__$1,xz,yz,xi,yi,coord,idx,___$1,vec__63777,x,y))
,cljs.core.array_seq([cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))], 0)));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(null);
}
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$decode$arity$3 = (function (this$,bit_votes,n){
var self__ = this;
var this$__$1 = this;
var values = (function (){var iter__5454__auto__ = ((function (this$__$1){
return (function org$nfrac$comportex$encoders$iter__63779(s__63780){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__63780__$1 = s__63780;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63780__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var x = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__63780__$1,x,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function org$nfrac$comportex$encoders$iter__63779_$_iter__63781(s__63782){
return (new cljs.core.LazySeq(null,((function (s__63780__$1,x,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function (){
var s__63782__$1 = s__63782;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63782__$1);
if(temp__4653__auto____$1){
var s__63782__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__63782__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63782__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63784 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63783 = (0);
while(true){
if((i__63783 < size__5453__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63783);
cljs.core.chunk_append(b__63784,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null));

var G__63794 = (i__63783 + (1));
i__63783 = G__63794;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63784),org$nfrac$comportex$encoders$iter__63779_$_iter__63781(cljs.core.chunk_rest(s__63782__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63784),null);
}
} else {
var y = cljs.core.first(s__63782__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),org$nfrac$comportex$encoders$iter__63779_$_iter__63781(cljs.core.rest(s__63782__$2)));
}
} else {
return null;
}
break;
}
});})(s__63780__$1,x,xs__5201__auto__,temp__4653__auto__,this$__$1))
,null,null));
});})(s__63780__$1,x,xs__5201__auto__,temp__4653__auto__,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(self__.y_max)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$encoders$iter__63779(cljs.core.rest(s__63780__$1)));
} else {
var G__63795 = cljs.core.rest(s__63780__$1);
s__63780__$1 = G__63795;
continue;
}
} else {
return null;
}
break;
}
});})(this$__$1))
,null,null));
});})(this$__$1))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(self__.x_max));
})();
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,org.nfrac.comportex.encoders.decode_by_brute_force(this$__$1,values,bit_votes));
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$topo,null,cljs.core.cst$kw$x_DASH_max,null,cljs.core.cst$kw$n_DASH_active,null,cljs.core.cst$kw$y_DASH_max,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,self__.x_max,self__.y_max,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63772){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63790 = cljs.core.keyword_identical_QMARK_;
var expr__63791 = k__5304__auto__;
if(cljs.core.truth_((pred__63790.cljs$core$IFn$_invoke$arity$2 ? pred__63790.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63791) : pred__63790.call(null,cljs.core.cst$kw$topo,expr__63791)))){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(G__63772,self__.n_active,self__.x_max,self__.y_max,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63790.cljs$core$IFn$_invoke$arity$2 ? pred__63790.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__63791) : pred__63790.call(null,cljs.core.cst$kw$n_DASH_active,expr__63791)))){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,G__63772,self__.x_max,self__.y_max,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63790.cljs$core$IFn$_invoke$arity$2 ? pred__63790.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$x_DASH_max,expr__63791) : pred__63790.call(null,cljs.core.cst$kw$x_DASH_max,expr__63791)))){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,G__63772,self__.y_max,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63790.cljs$core$IFn$_invoke$arity$2 ? pred__63790.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$y_DASH_max,expr__63791) : pred__63790.call(null,cljs.core.cst$kw$y_DASH_max,expr__63791)))){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,self__.x_max,G__63772,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,self__.x_max,self__.y_max,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63772),null));
}
}
}
}
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_max,self__.x_max],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_max,self__.y_max],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63772){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,self__.x_max,self__.y_max,G__63772,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.encoders.Linear2DEncoder.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$topo,cljs.core.cst$sym$n_DASH_active,cljs.core.cst$sym$x_DASH_max,cljs.core.cst$sym$y_DASH_max], null);
});

org.nfrac.comportex.encoders.Linear2DEncoder.cljs$lang$type = true;

org.nfrac.comportex.encoders.Linear2DEncoder.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.encoders/Linear2DEncoder");
});

org.nfrac.comportex.encoders.Linear2DEncoder.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.encoders/Linear2DEncoder");
});

org.nfrac.comportex.encoders.__GT_Linear2DEncoder = (function org$nfrac$comportex$encoders$__GT_Linear2DEncoder(topo,n_active,x_max,y_max){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(topo,n_active,x_max,y_max,null,null,null));
});

org.nfrac.comportex.encoders.map__GT_Linear2DEncoder = (function org$nfrac$comportex$encoders$map__GT_Linear2DEncoder(G__63774){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63774),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__63774),cljs.core.cst$kw$x_DASH_max.cljs$core$IFn$_invoke$arity$1(G__63774),cljs.core.cst$kw$y_DASH_max.cljs$core$IFn$_invoke$arity$1(G__63774),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63774,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$x_DASH_max,cljs.core.cst$kw$y_DASH_max], 0)),null));
});

/**
 * Returns a simple encoder for a tuple of two numbers representing a
 *   position in rectangular bounds. The encoder maps input spatial
 *   positions to boxes of active bits in corresponding spatial positions
 *   of the encoded sense. So input positions close in both coordinates
 *   will have overlapping bit sets.
 * 
 *   * `dimensions` - of the encoded bits, given as a vector [nx ny].
 * 
 *   * `n-active` is the number of bits to be active.
 * 
 *   * `[x-max y-max]` gives the numeric range of input space to
 *   cover. The numbers will be clamped to this range, and below by
 *   zero.
 */
org.nfrac.comportex.encoders.linear_2d_encoder = (function org$nfrac$comportex$encoders$linear_2d_encoder(dimensions,n_active,p__63796){
var vec__63798 = p__63796;
var x_max = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63798,(0),null);
var y_max = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63798,(1),null);
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.nfrac.comportex.encoders.map__GT_Linear2DEncoder(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$n_DASH_active,n_active,cljs.core.cst$kw$x_DASH_max,x_max,cljs.core.cst$kw$y_DASH_max,y_max], null));
});
org.nfrac.comportex.encoders.coordinate_neighbours = (function org$nfrac$comportex$encoders$coordinate_neighbours(coord,radii){
var G__63842 = cljs.core.count(coord);
switch (G__63842) {
case (1):
var vec__63843 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63843,(0),null);
var vec__63844 = radii;
var rx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63844,(0),null);
var iter__5454__auto__ = ((function (vec__63843,cx,vec__63844,rx,G__63842){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63845(s__63846){
return (new cljs.core.LazySeq(null,((function (vec__63843,cx,vec__63844,rx,G__63842){
return (function (){
var s__63846__$1 = s__63846;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63846__$1);
if(temp__4653__auto__){
var s__63846__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__63846__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63846__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63848 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63847 = (0);
while(true){
if((i__63847 < size__5453__auto__)){
var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63847);
cljs.core.chunk_append(b__63848,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null));

var G__63886 = (i__63847 + (1));
i__63847 = G__63886;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63848),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63845(cljs.core.chunk_rest(s__63846__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63848),null);
}
} else {
var x = cljs.core.first(s__63846__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63845(cljs.core.rest(s__63846__$2)));
}
} else {
return null;
}
break;
}
});})(vec__63843,cx,vec__63844,rx,G__63842))
,null,null));
});})(vec__63843,cx,vec__63844,rx,G__63842))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cx - rx),((cx + rx) + (1))));

break;
case (2):
var vec__63851 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63851,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63851,(1),null);
var vec__63852 = radii;
var rx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63852,(0),null);
var ry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63852,(1),null);
var iter__5454__auto__ = ((function (vec__63851,cx,cy,vec__63852,rx,ry,G__63842){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63853(s__63854){
return (new cljs.core.LazySeq(null,((function (vec__63851,cx,cy,vec__63852,rx,ry,G__63842){
return (function (){
var s__63854__$1 = s__63854;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63854__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var x = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__63854__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63851,cx,cy,vec__63852,rx,ry,G__63842){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63853_$_iter__63855(s__63856){
return (new cljs.core.LazySeq(null,((function (s__63854__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63851,cx,cy,vec__63852,rx,ry,G__63842){
return (function (){
var s__63856__$1 = s__63856;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63856__$1);
if(temp__4653__auto____$1){
var s__63856__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__63856__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63856__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63858 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63857 = (0);
while(true){
if((i__63857 < size__5453__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63857);
cljs.core.chunk_append(b__63858,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null));

var G__63887 = (i__63857 + (1));
i__63857 = G__63887;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63858),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63853_$_iter__63855(cljs.core.chunk_rest(s__63856__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63858),null);
}
} else {
var y = cljs.core.first(s__63856__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63853_$_iter__63855(cljs.core.rest(s__63856__$2)));
}
} else {
return null;
}
break;
}
});})(s__63854__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63851,cx,cy,vec__63852,rx,ry,G__63842))
,null,null));
});})(s__63854__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63851,cx,cy,vec__63852,rx,ry,G__63842))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cy - ry),((cy + ry) + (1)))));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63853(cljs.core.rest(s__63854__$1)));
} else {
var G__63888 = cljs.core.rest(s__63854__$1);
s__63854__$1 = G__63888;
continue;
}
} else {
return null;
}
break;
}
});})(vec__63851,cx,cy,vec__63852,rx,ry,G__63842))
,null,null));
});})(vec__63851,cx,cy,vec__63852,rx,ry,G__63842))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cx - rx),((cx + rx) + (1))));

break;
case (3):
var vec__63864 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63864,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63864,(1),null);
var cz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63864,(2),null);
var vec__63865 = radii;
var rx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63865,(0),null);
var ry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63865,(1),null);
var rz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63865,(2),null);
var iter__5454__auto__ = ((function (vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63866(s__63867){
return (new cljs.core.LazySeq(null,((function (vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842){
return (function (){
var s__63867__$1 = s__63867;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63867__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var x = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__63867__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63866_$_iter__63868(s__63869){
return (new cljs.core.LazySeq(null,((function (s__63867__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842){
return (function (){
var s__63869__$1 = s__63869;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63869__$1);
if(temp__4653__auto____$1){
var xs__5201__auto____$1 = temp__4653__auto____$1;
var y = cljs.core.first(xs__5201__auto____$1);
var iterys__5450__auto__ = ((function (s__63869__$1,s__63867__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63866_$_iter__63868_$_iter__63870(s__63871){
return (new cljs.core.LazySeq(null,((function (s__63869__$1,s__63867__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842){
return (function (){
var s__63871__$1 = s__63871;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__63871__$1);
if(temp__4653__auto____$2){
var s__63871__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__63871__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63871__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63873 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63872 = (0);
while(true){
if((i__63872 < size__5453__auto__)){
var z = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63872);
cljs.core.chunk_append(b__63873,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null));

var G__63889 = (i__63872 + (1));
i__63872 = G__63889;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63873),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63866_$_iter__63868_$_iter__63870(cljs.core.chunk_rest(s__63871__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63873),null);
}
} else {
var z = cljs.core.first(s__63871__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63866_$_iter__63868_$_iter__63870(cljs.core.rest(s__63871__$2)));
}
} else {
return null;
}
break;
}
});})(s__63869__$1,s__63867__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842))
,null,null));
});})(s__63869__$1,s__63867__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cz - rz),((cz + rz) + (1)))));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63866_$_iter__63868(cljs.core.rest(s__63869__$1)));
} else {
var G__63890 = cljs.core.rest(s__63869__$1);
s__63869__$1 = G__63890;
continue;
}
} else {
return null;
}
break;
}
});})(s__63867__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842))
,null,null));
});})(s__63867__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cy - ry),((cy + ry) + (1)))));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63866(cljs.core.rest(s__63867__$1)));
} else {
var G__63891 = cljs.core.rest(s__63867__$1);
s__63867__$1 = G__63891;
continue;
}
} else {
return null;
}
break;
}
});})(vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842))
,null,null));
});})(vec__63864,cx,cy,cz,vec__63865,rx,ry,rz,G__63842))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cx - rx),((cx + rx) + (1))));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.count(coord))].join('')));

}
});
org.nfrac.comportex.encoders.coordinate_order = (function org$nfrac$comportex$encoders$coordinate_order(coord){
return clojure.test.check.random.rand_double(clojure.test.check.random.make_random.cljs$core$IFn$_invoke$arity$1(cljs.core.hash([cljs.core.str(coord)].join(''))));
});
org.nfrac.comportex.encoders.coordinate_bit = (function org$nfrac$comportex$encoders$coordinate_bit(size,coord){
return org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$2(cljs.core.second(clojure.test.check.random.split(clojure.test.check.random.make_random.cljs$core$IFn$_invoke$arity$1(cljs.core.hash([cljs.core.str(coord)].join(''))))),size);
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
org.nfrac.comportex.encoders.CoordinateEncoder = (function (topo,n_active,scale_factors,radii,__meta,__extmap,__hash){
this.topo = topo;
this.n_active = n_active;
this.scale_factors = scale_factors;
this.radii = radii;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63893,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63895 = (((k63893 instanceof cljs.core.Keyword))?k63893.fqn:null);
switch (G__63895) {
case "topo":
return self__.topo;

break;
case "n-active":
return self__.n_active;

break;
case "scale-factors":
return self__.scale_factors;

break;
case "radii":
return self__.radii;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63893,else__5299__auto__);

}
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.topo;
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.encoders.CoordinateEncoder{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scale_DASH_factors,self__.scale_factors],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$radii,self__.radii],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63892){
var self__ = this;
var G__63892__$1 = this;
return (new cljs.core.RecordIter((0),G__63892__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$scale_DASH_factors,cljs.core.cst$kw$radii], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,self__.scale_factors,self__.radii,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$ = true;

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = (function (_,coord){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(cljs.core.first(coord))){
var int_coord = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.util.round,cljs.core._STAR_),coord,self__.scale_factors);
var neighs = org.nfrac.comportex.encoders.coordinate_neighbours(int_coord,self__.radii);
return cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.encoders.coordinate_bit,org.nfrac.comportex.protocols.size(self__.topo)),org.nfrac.comportex.util.top_n_keys_by_value(self__.n_active,cljs.core.zipmap(neighs,cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.encoders.coordinate_order,neighs)))));
} else {
return null;
}
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$radii,null,cljs.core.cst$kw$topo,null,cljs.core.cst$kw$n_DASH_active,null,cljs.core.cst$kw$scale_DASH_factors,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,self__.scale_factors,self__.radii,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63892){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63896 = cljs.core.keyword_identical_QMARK_;
var expr__63897 = k__5304__auto__;
if(cljs.core.truth_((pred__63896.cljs$core$IFn$_invoke$arity$2 ? pred__63896.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63897) : pred__63896.call(null,cljs.core.cst$kw$topo,expr__63897)))){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(G__63892,self__.n_active,self__.scale_factors,self__.radii,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63896.cljs$core$IFn$_invoke$arity$2 ? pred__63896.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__63897) : pred__63896.call(null,cljs.core.cst$kw$n_DASH_active,expr__63897)))){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,G__63892,self__.scale_factors,self__.radii,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63896.cljs$core$IFn$_invoke$arity$2 ? pred__63896.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$scale_DASH_factors,expr__63897) : pred__63896.call(null,cljs.core.cst$kw$scale_DASH_factors,expr__63897)))){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,G__63892,self__.radii,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63896.cljs$core$IFn$_invoke$arity$2 ? pred__63896.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$radii,expr__63897) : pred__63896.call(null,cljs.core.cst$kw$radii,expr__63897)))){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,self__.scale_factors,G__63892,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,self__.scale_factors,self__.radii,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63892),null));
}
}
}
}
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scale_DASH_factors,self__.scale_factors],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$radii,self__.radii],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63892){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,self__.scale_factors,self__.radii,G__63892,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.encoders.CoordinateEncoder.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$topo,cljs.core.cst$sym$n_DASH_active,cljs.core.cst$sym$scale_DASH_factors,cljs.core.cst$sym$radii], null);
});

org.nfrac.comportex.encoders.CoordinateEncoder.cljs$lang$type = true;

org.nfrac.comportex.encoders.CoordinateEncoder.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.encoders/CoordinateEncoder");
});

org.nfrac.comportex.encoders.CoordinateEncoder.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.encoders/CoordinateEncoder");
});

org.nfrac.comportex.encoders.__GT_CoordinateEncoder = (function org$nfrac$comportex$encoders$__GT_CoordinateEncoder(topo,n_active,scale_factors,radii){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(topo,n_active,scale_factors,radii,null,null,null));
});

org.nfrac.comportex.encoders.map__GT_CoordinateEncoder = (function org$nfrac$comportex$encoders$map__GT_CoordinateEncoder(G__63894){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63894),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__63894),cljs.core.cst$kw$scale_DASH_factors.cljs$core$IFn$_invoke$arity$1(G__63894),cljs.core.cst$kw$radii.cljs$core$IFn$_invoke$arity$1(G__63894),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63894,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$scale_DASH_factors,cljs.core.cst$kw$radii], 0)),null));
});

/**
 * Coordinate encoder for integer coordinates, unbounded, with one,
 *   two or three dimensions. Expects a coordinate, i.e. a sequence of
 *   numbers with 1, 2 or 3 elements. These raw values will be multiplied
 *   by corresponding `scale-factors` to obtain integer grid
 *   coordinates. Each dimension has an associated radius within which
 *   there is some similarity in encoded SDRs.
 */
org.nfrac.comportex.encoders.coordinate_encoder = (function org$nfrac$comportex$encoders$coordinate_encoder(dimensions,n_active,scale_factors,radii){
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.nfrac.comportex.encoders.map__GT_CoordinateEncoder(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$n_DASH_active,n_active,cljs.core.cst$kw$scale_DASH_factors,scale_factors,cljs.core.cst$kw$radii,radii], null));
});
org.nfrac.comportex.encoders.sensor_cat = (function org$nfrac$comportex$encoders$sensor_cat(var_args){
var args__5747__auto__ = [];
var len__5740__auto___63901 = arguments.length;
var i__5741__auto___63902 = (0);
while(true){
if((i__5741__auto___63902 < len__5740__auto___63901)){
args__5747__auto__.push((arguments[i__5741__auto___63902]));

var G__63903 = (i__5741__auto___63902 + (1));
i__5741__auto___63902 = G__63903;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((0) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((0)),(0))):null);
return org.nfrac.comportex.encoders.sensor_cat.cljs$core$IFn$_invoke$arity$variadic(argseq__5748__auto__);
});

org.nfrac.comportex.encoders.sensor_cat.cljs$core$IFn$_invoke$arity$variadic = (function (sensors){
var selectors = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,sensors);
var encoders = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,sensors);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.apply.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.encoders.vec_selector,selectors),org.nfrac.comportex.encoders.encat(encoders)], null);
});

org.nfrac.comportex.encoders.sensor_cat.cljs$lang$maxFixedArity = (0);

org.nfrac.comportex.encoders.sensor_cat.cljs$lang$applyTo = (function (seq63900){
return org.nfrac.comportex.encoders.sensor_cat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq63900));
});
