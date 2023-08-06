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

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63714,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63716 = (((k63714 instanceof cljs.core.Keyword))?k63714.fqn:null);
switch (G__63716) {
case "selectors":
return self__.selectors;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63714,else__5299__auto__);

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

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63713){
var self__ = this;
var G__63713__$1 = this;
return (new cljs.core.RecordIter((0),G__63713__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$selectors], null),cljs.core._iterator(self__.__extmap)));
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

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63713){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63717 = cljs.core.keyword_identical_QMARK_;
var expr__63718 = k__5304__auto__;
if(cljs.core.truth_((pred__63717.cljs$core$IFn$_invoke$arity$2 ? pred__63717.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$selectors,expr__63718) : pred__63717.call(null,cljs.core.cst$kw$selectors,expr__63718)))){
return (new org.nfrac.comportex.encoders.VecSelector(G__63713,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.VecSelector(self__.selectors,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63713),null));
}
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$selectors,self__.selectors],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.VecSelector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63713){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.VecSelector(self__.selectors,G__63713,self__.__extmap,self__.__hash));
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

org.nfrac.comportex.encoders.map__GT_VecSelector = (function org$nfrac$comportex$encoders$map__GT_VecSelector(G__63715){
return (new org.nfrac.comportex.encoders.VecSelector(cljs.core.cst$kw$selectors.cljs$core$IFn$_invoke$arity$1(G__63715),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__63715,cljs.core.cst$kw$selectors),null));
});

org.nfrac.comportex.encoders.vec_selector = (function org$nfrac$comportex$encoders$vec_selector(var_args){
var args__5747__auto__ = [];
var len__5740__auto___63722 = arguments.length;
var i__5741__auto___63723 = (0);
while(true){
if((i__5741__auto___63723 < len__5740__auto___63722)){
args__5747__auto__.push((arguments[i__5741__auto___63723]));

var G__63724 = (i__5741__auto___63723 + (1));
i__5741__auto___63723 = G__63724;
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

org.nfrac.comportex.encoders.vec_selector.cljs$lang$applyTo = (function (seq63721){
return org.nfrac.comportex.encoders.vec_selector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq63721));
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
var vec__63726 = cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.keys,cljs.core.vals).call(null,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map(),aligned));
var is = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63726,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63726,(1),null);
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

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63730,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63732 = (((k63730 instanceof cljs.core.Keyword))?k63730.fqn:null);
switch (G__63732) {
case "encoders":
return self__.encoders;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63730,else__5299__auto__);

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

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63729){
var self__ = this;
var G__63729__$1 = this;
return (new cljs.core.RecordIter((0),G__63729__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$encoders], null),cljs.core._iterator(self__.__extmap)));
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
return (function (p1__63727_SHARP_,p2__63728_SHARP_){
return org.nfrac.comportex.protocols.decode(p1__63727_SHARP_,p2__63728_SHARP_,n_values);
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

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63729){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63733 = cljs.core.keyword_identical_QMARK_;
var expr__63734 = k__5304__auto__;
if(cljs.core.truth_((pred__63733.cljs$core$IFn$_invoke$arity$2 ? pred__63733.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$encoders,expr__63734) : pred__63733.call(null,cljs.core.cst$kw$encoders,expr__63734)))){
return (new org.nfrac.comportex.encoders.ConcatEncoder(G__63729,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.ConcatEncoder(self__.encoders,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63729),null));
}
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$encoders,self__.encoders],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.ConcatEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63729){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.ConcatEncoder(self__.encoders,G__63729,self__.__extmap,self__.__hash));
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

org.nfrac.comportex.encoders.map__GT_ConcatEncoder = (function org$nfrac$comportex$encoders$map__GT_ConcatEncoder(G__63731){
return (new org.nfrac.comportex.encoders.ConcatEncoder(cljs.core.cst$kw$encoders.cljs$core$IFn$_invoke$arity$1(G__63731),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__63731,cljs.core.cst$kw$encoders),null));
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

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63738,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63740 = (((k63738 instanceof cljs.core.Keyword))?k63738.fqn:null);
switch (G__63740) {
case "encoder":
return self__.encoder;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63738,else__5299__auto__);

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

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63737){
var self__ = this;
var G__63737__$1 = this;
return (new cljs.core.RecordIter((0),G__63737__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$encoder], null),cljs.core._iterator(self__.__extmap)));
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

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63737){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63741 = cljs.core.keyword_identical_QMARK_;
var expr__63742 = k__5304__auto__;
if(cljs.core.truth_((pred__63741.cljs$core$IFn$_invoke$arity$2 ? pred__63741.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$encoder,expr__63742) : pred__63741.call(null,cljs.core.cst$kw$encoder,expr__63742)))){
return (new org.nfrac.comportex.encoders.SplatEncoder(G__63737,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.SplatEncoder(self__.encoder,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63737),null));
}
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$encoder,self__.encoder],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.SplatEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63737){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.SplatEncoder(self__.encoder,G__63737,self__.__extmap,self__.__hash));
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

org.nfrac.comportex.encoders.map__GT_SplatEncoder = (function org$nfrac$comportex$encoders$map__GT_SplatEncoder(G__63739){
return (new org.nfrac.comportex.encoders.SplatEncoder(cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(G__63739),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__63739,cljs.core.cst$kw$encoder),null));
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

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63746,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63748 = (((k63746 instanceof cljs.core.Keyword))?k63746.fqn:null);
switch (G__63748) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63746,else__5299__auto__);

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

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63745){
var self__ = this;
var G__63745__$1 = this;
return (new cljs.core.RecordIter((0),G__63745__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$lower,cljs.core.cst$kw$upper], null),cljs.core._iterator(self__.__extmap)));
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

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63745){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63749 = cljs.core.keyword_identical_QMARK_;
var expr__63750 = k__5304__auto__;
if(cljs.core.truth_((pred__63749.cljs$core$IFn$_invoke$arity$2 ? pred__63749.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63750) : pred__63749.call(null,cljs.core.cst$kw$topo,expr__63750)))){
return (new org.nfrac.comportex.encoders.LinearEncoder(G__63745,self__.n_active,self__.lower,self__.upper,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63749.cljs$core$IFn$_invoke$arity$2 ? pred__63749.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__63750) : pred__63749.call(null,cljs.core.cst$kw$n_DASH_active,expr__63750)))){
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,G__63745,self__.lower,self__.upper,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63749.cljs$core$IFn$_invoke$arity$2 ? pred__63749.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$lower,expr__63750) : pred__63749.call(null,cljs.core.cst$kw$lower,expr__63750)))){
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,G__63745,self__.upper,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63749.cljs$core$IFn$_invoke$arity$2 ? pred__63749.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$upper,expr__63750) : pred__63749.call(null,cljs.core.cst$kw$upper,expr__63750)))){
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,self__.lower,G__63745,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63745),null));
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

org.nfrac.comportex.encoders.LinearEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63745){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.LinearEncoder(self__.topo,self__.n_active,self__.lower,self__.upper,G__63745,self__.__extmap,self__.__hash));
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

org.nfrac.comportex.encoders.map__GT_LinearEncoder = (function org$nfrac$comportex$encoders$map__GT_LinearEncoder(G__63747){
return (new org.nfrac.comportex.encoders.LinearEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63747),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__63747),cljs.core.cst$kw$lower.cljs$core$IFn$_invoke$arity$1(G__63747),cljs.core.cst$kw$upper.cljs$core$IFn$_invoke$arity$1(G__63747),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63747,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$lower,cljs.core.cst$kw$upper], 0)),null));
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
org.nfrac.comportex.encoders.linear_encoder = (function org$nfrac$comportex$encoders$linear_encoder(dimensions,n_active,p__63753){
var vec__63755 = p__63753;
var lower = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63755,(0),null);
var upper = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63755,(1),null);
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

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63757,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63759 = (((k63757 instanceof cljs.core.Keyword))?k63757.fqn:null);
switch (G__63759) {
case "topo":
return self__.topo;

break;
case "value->index":
return self__.value__GT_index;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63757,else__5299__auto__);

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

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63756){
var self__ = this;
var G__63756__$1 = this;
return (new cljs.core.RecordIter((0),G__63756__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$value_DASH__GT_index], null),cljs.core._iterator(self__.__extmap)));
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

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63756){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63760 = cljs.core.keyword_identical_QMARK_;
var expr__63761 = k__5304__auto__;
if(cljs.core.truth_((pred__63760.cljs$core$IFn$_invoke$arity$2 ? pred__63760.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63761) : pred__63760.call(null,cljs.core.cst$kw$topo,expr__63761)))){
return (new org.nfrac.comportex.encoders.CategoryEncoder(G__63756,self__.value__GT_index,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63760.cljs$core$IFn$_invoke$arity$2 ? pred__63760.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value_DASH__GT_index,expr__63761) : pred__63760.call(null,cljs.core.cst$kw$value_DASH__GT_index,expr__63761)))){
return (new org.nfrac.comportex.encoders.CategoryEncoder(self__.topo,G__63756,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.CategoryEncoder(self__.topo,self__.value__GT_index,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63756),null));
}
}
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$value_DASH__GT_index,self__.value__GT_index],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.CategoryEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63756){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.CategoryEncoder(self__.topo,self__.value__GT_index,G__63756,self__.__extmap,self__.__hash));
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

org.nfrac.comportex.encoders.map__GT_CategoryEncoder = (function org$nfrac$comportex$encoders$map__GT_CategoryEncoder(G__63758){
return (new org.nfrac.comportex.encoders.CategoryEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63758),cljs.core.cst$kw$value_DASH__GT_index.cljs$core$IFn$_invoke$arity$1(G__63758),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63758,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$value_DASH__GT_index], 0)),null));
});

org.nfrac.comportex.encoders.category_encoder = (function org$nfrac$comportex$encoders$category_encoder(dimensions,values){
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.nfrac.comportex.encoders.map__GT_CategoryEncoder(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$value_DASH__GT_index,cljs.core.zipmap(values,cljs.core.range.cljs$core$IFn$_invoke$arity$0())], null));
});
org.nfrac.comportex.encoders.unique_sdr = (function org$nfrac$comportex$encoders$unique_sdr(x,n_bits,n_active){
var rngs = clojure.test.check.random.split_n(clojure.test.check.random.make_random.cljs$core$IFn$_invoke$arity$1(cljs.core.hash(x)),cljs.core.long$((n_active * 1.25)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.List.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$3(cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (rngs){
return (function (p1__63764_SHARP_){
return org.nfrac.comportex.util.rand_int.cljs$core$IFn$_invoke$arity$2(p1__63764_SHARP_,n_bits);
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

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63766,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63768 = (((k63766 instanceof cljs.core.Keyword))?k63766.fqn:null);
switch (G__63768) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63766,else__5299__auto__);

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

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63765){
var self__ = this;
var G__63765__$1 = this;
return (new cljs.core.RecordIter((0),G__63765__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$cache], null),cljs.core._iterator(self__.__extmap)));
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

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63765){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63769 = cljs.core.keyword_identical_QMARK_;
var expr__63770 = k__5304__auto__;
if(cljs.core.truth_((pred__63769.cljs$core$IFn$_invoke$arity$2 ? pred__63769.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63770) : pred__63769.call(null,cljs.core.cst$kw$topo,expr__63770)))){
return (new org.nfrac.comportex.encoders.UniqueEncoder(G__63765,self__.n_active,self__.cache,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63769.cljs$core$IFn$_invoke$arity$2 ? pred__63769.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__63770) : pred__63769.call(null,cljs.core.cst$kw$n_DASH_active,expr__63770)))){
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,G__63765,self__.cache,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63769.cljs$core$IFn$_invoke$arity$2 ? pred__63769.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cache,expr__63770) : pred__63769.call(null,cljs.core.cst$kw$cache,expr__63770)))){
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,self__.n_active,G__63765,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,self__.n_active,self__.cache,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63765),null));
}
}
}
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_active,self__.n_active],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$cache,self__.cache],null))], null),self__.__extmap));
});

org.nfrac.comportex.encoders.UniqueEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63765){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.UniqueEncoder(self__.topo,self__.n_active,self__.cache,G__63765,self__.__extmap,self__.__hash));
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

org.nfrac.comportex.encoders.map__GT_UniqueEncoder = (function org$nfrac$comportex$encoders$map__GT_UniqueEncoder(G__63767){
return (new org.nfrac.comportex.encoders.UniqueEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63767),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__63767),cljs.core.cst$kw$cache.cljs$core$IFn$_invoke$arity$1(G__63767),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63767,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$cache], 0)),null));
});

/**
 * This encoder generates a unique bit set for each distinct value,
 *   based on its hash. `dimensions` is given as a vector.
 */
org.nfrac.comportex.encoders.unique_encoder = (function org$nfrac$comportex$encoders$unique_encoder(dimensions,n_active){
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.nfrac.comportex.encoders.map__GT_UniqueEncoder(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$n_DASH_active,n_active,cljs.core.cst$kw$cache,(function (){var G__63774 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63774) : cljs.core.atom.call(null,G__63774));
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

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63776,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63778 = (((k63776 instanceof cljs.core.Keyword))?k63776.fqn:null);
switch (G__63778) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63776,else__5299__auto__);

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

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63775){
var self__ = this;
var G__63775__$1 = this;
return (new cljs.core.RecordIter((0),G__63775__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$x_DASH_max,cljs.core.cst$kw$y_DASH_max], null),cljs.core._iterator(self__.__extmap)));
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

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$encode$arity$2 = (function (_,p__63779){
var self__ = this;
var vec__63780 = p__63779;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63780,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63780,(1),null);
var ___$1 = this;
if(cljs.core.truth_(x)){
var vec__63781 = org.nfrac.comportex.protocols.dimensions(self__.topo);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63781,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63781,(1),null);
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
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(self__.n_active,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (vec__63781,w,h,x__$1,y__$1,xz,yz,xi,yi,coord,idx,___$1,vec__63780,x,y){
return (function (radius){
return org.nfrac.comportex.protocols.neighbours_indices.cljs$core$IFn$_invoke$arity$4(self__.topo,idx,radius,(radius - (1)));
});})(vec__63781,w,h,x__$1,y__$1,xz,yz,xi,yi,coord,idx,___$1,vec__63780,x,y))
,cljs.core.array_seq([cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))], 0)));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(null);
}
});

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.org$nfrac$comportex$protocols$PEncoder$decode$arity$3 = (function (this$,bit_votes,n){
var self__ = this;
var this$__$1 = this;
var values = (function (){var iter__5454__auto__ = ((function (this$__$1){
return (function org$nfrac$comportex$encoders$iter__63782(s__63783){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__63783__$1 = s__63783;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63783__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var x = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__63783__$1,x,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function org$nfrac$comportex$encoders$iter__63782_$_iter__63784(s__63785){
return (new cljs.core.LazySeq(null,((function (s__63783__$1,x,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function (){
var s__63785__$1 = s__63785;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63785__$1);
if(temp__4653__auto____$1){
var s__63785__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__63785__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63785__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63787 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63786 = (0);
while(true){
if((i__63786 < size__5453__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63786);
cljs.core.chunk_append(b__63787,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null));

var G__63797 = (i__63786 + (1));
i__63786 = G__63797;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63787),org$nfrac$comportex$encoders$iter__63782_$_iter__63784(cljs.core.chunk_rest(s__63785__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63787),null);
}
} else {
var y = cljs.core.first(s__63785__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),org$nfrac$comportex$encoders$iter__63782_$_iter__63784(cljs.core.rest(s__63785__$2)));
}
} else {
return null;
}
break;
}
});})(s__63783__$1,x,xs__5201__auto__,temp__4653__auto__,this$__$1))
,null,null));
});})(s__63783__$1,x,xs__5201__auto__,temp__4653__auto__,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(self__.y_max)));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$encoders$iter__63782(cljs.core.rest(s__63783__$1)));
} else {
var G__63798 = cljs.core.rest(s__63783__$1);
s__63783__$1 = G__63798;
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

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63775){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63793 = cljs.core.keyword_identical_QMARK_;
var expr__63794 = k__5304__auto__;
if(cljs.core.truth_((pred__63793.cljs$core$IFn$_invoke$arity$2 ? pred__63793.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63794) : pred__63793.call(null,cljs.core.cst$kw$topo,expr__63794)))){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(G__63775,self__.n_active,self__.x_max,self__.y_max,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63793.cljs$core$IFn$_invoke$arity$2 ? pred__63793.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__63794) : pred__63793.call(null,cljs.core.cst$kw$n_DASH_active,expr__63794)))){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,G__63775,self__.x_max,self__.y_max,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63793.cljs$core$IFn$_invoke$arity$2 ? pred__63793.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$x_DASH_max,expr__63794) : pred__63793.call(null,cljs.core.cst$kw$x_DASH_max,expr__63794)))){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,G__63775,self__.y_max,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63793.cljs$core$IFn$_invoke$arity$2 ? pred__63793.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$y_DASH_max,expr__63794) : pred__63793.call(null,cljs.core.cst$kw$y_DASH_max,expr__63794)))){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,self__.x_max,G__63775,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,self__.x_max,self__.y_max,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63775),null));
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

org.nfrac.comportex.encoders.Linear2DEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63775){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.Linear2DEncoder(self__.topo,self__.n_active,self__.x_max,self__.y_max,G__63775,self__.__extmap,self__.__hash));
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

org.nfrac.comportex.encoders.map__GT_Linear2DEncoder = (function org$nfrac$comportex$encoders$map__GT_Linear2DEncoder(G__63777){
return (new org.nfrac.comportex.encoders.Linear2DEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63777),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__63777),cljs.core.cst$kw$x_DASH_max.cljs$core$IFn$_invoke$arity$1(G__63777),cljs.core.cst$kw$y_DASH_max.cljs$core$IFn$_invoke$arity$1(G__63777),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63777,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$x_DASH_max,cljs.core.cst$kw$y_DASH_max], 0)),null));
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
org.nfrac.comportex.encoders.linear_2d_encoder = (function org$nfrac$comportex$encoders$linear_2d_encoder(dimensions,n_active,p__63799){
var vec__63801 = p__63799;
var x_max = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63801,(0),null);
var y_max = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63801,(1),null);
var topo = org.nfrac.comportex.topology.make_topology(dimensions);
return org.nfrac.comportex.encoders.map__GT_Linear2DEncoder(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$topo,topo,cljs.core.cst$kw$n_DASH_active,n_active,cljs.core.cst$kw$x_DASH_max,x_max,cljs.core.cst$kw$y_DASH_max,y_max], null));
});
org.nfrac.comportex.encoders.coordinate_neighbours = (function org$nfrac$comportex$encoders$coordinate_neighbours(coord,radii){
var G__63845 = cljs.core.count(coord);
switch (G__63845) {
case (1):
var vec__63846 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63846,(0),null);
var vec__63847 = radii;
var rx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63847,(0),null);
var iter__5454__auto__ = ((function (vec__63846,cx,vec__63847,rx,G__63845){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63848(s__63849){
return (new cljs.core.LazySeq(null,((function (vec__63846,cx,vec__63847,rx,G__63845){
return (function (){
var s__63849__$1 = s__63849;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63849__$1);
if(temp__4653__auto__){
var s__63849__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__63849__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63849__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63851 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63850 = (0);
while(true){
if((i__63850 < size__5453__auto__)){
var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63850);
cljs.core.chunk_append(b__63851,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null));

var G__63889 = (i__63850 + (1));
i__63850 = G__63889;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63851),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63848(cljs.core.chunk_rest(s__63849__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63851),null);
}
} else {
var x = cljs.core.first(s__63849__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63848(cljs.core.rest(s__63849__$2)));
}
} else {
return null;
}
break;
}
});})(vec__63846,cx,vec__63847,rx,G__63845))
,null,null));
});})(vec__63846,cx,vec__63847,rx,G__63845))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cx - rx),((cx + rx) + (1))));

break;
case (2):
var vec__63854 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63854,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63854,(1),null);
var vec__63855 = radii;
var rx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63855,(0),null);
var ry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63855,(1),null);
var iter__5454__auto__ = ((function (vec__63854,cx,cy,vec__63855,rx,ry,G__63845){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63856(s__63857){
return (new cljs.core.LazySeq(null,((function (vec__63854,cx,cy,vec__63855,rx,ry,G__63845){
return (function (){
var s__63857__$1 = s__63857;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63857__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var x = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__63857__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63854,cx,cy,vec__63855,rx,ry,G__63845){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63856_$_iter__63858(s__63859){
return (new cljs.core.LazySeq(null,((function (s__63857__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63854,cx,cy,vec__63855,rx,ry,G__63845){
return (function (){
var s__63859__$1 = s__63859;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63859__$1);
if(temp__4653__auto____$1){
var s__63859__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__63859__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63859__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63861 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63860 = (0);
while(true){
if((i__63860 < size__5453__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63860);
cljs.core.chunk_append(b__63861,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null));

var G__63890 = (i__63860 + (1));
i__63860 = G__63890;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63861),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63856_$_iter__63858(cljs.core.chunk_rest(s__63859__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63861),null);
}
} else {
var y = cljs.core.first(s__63859__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63856_$_iter__63858(cljs.core.rest(s__63859__$2)));
}
} else {
return null;
}
break;
}
});})(s__63857__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63854,cx,cy,vec__63855,rx,ry,G__63845))
,null,null));
});})(s__63857__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63854,cx,cy,vec__63855,rx,ry,G__63845))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cy - ry),((cy + ry) + (1)))));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63856(cljs.core.rest(s__63857__$1)));
} else {
var G__63891 = cljs.core.rest(s__63857__$1);
s__63857__$1 = G__63891;
continue;
}
} else {
return null;
}
break;
}
});})(vec__63854,cx,cy,vec__63855,rx,ry,G__63845))
,null,null));
});})(vec__63854,cx,cy,vec__63855,rx,ry,G__63845))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cx - rx),((cx + rx) + (1))));

break;
case (3):
var vec__63867 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63867,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63867,(1),null);
var cz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63867,(2),null);
var vec__63868 = radii;
var rx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63868,(0),null);
var ry = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63868,(1),null);
var rz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63868,(2),null);
var iter__5454__auto__ = ((function (vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63869(s__63870){
return (new cljs.core.LazySeq(null,((function (vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845){
return (function (){
var s__63870__$1 = s__63870;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__63870__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var x = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__63870__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63869_$_iter__63871(s__63872){
return (new cljs.core.LazySeq(null,((function (s__63870__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845){
return (function (){
var s__63872__$1 = s__63872;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__63872__$1);
if(temp__4653__auto____$1){
var xs__5201__auto____$1 = temp__4653__auto____$1;
var y = cljs.core.first(xs__5201__auto____$1);
var iterys__5450__auto__ = ((function (s__63872__$1,s__63870__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845){
return (function org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63869_$_iter__63871_$_iter__63873(s__63874){
return (new cljs.core.LazySeq(null,((function (s__63872__$1,s__63870__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845){
return (function (){
var s__63874__$1 = s__63874;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__63874__$1);
if(temp__4653__auto____$2){
var s__63874__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__63874__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__63874__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__63876 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__63875 = (0);
while(true){
if((i__63875 < size__5453__auto__)){
var z = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__63875);
cljs.core.chunk_append(b__63876,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null));

var G__63892 = (i__63875 + (1));
i__63875 = G__63892;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63876),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63869_$_iter__63871_$_iter__63873(cljs.core.chunk_rest(s__63874__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63876),null);
}
} else {
var z = cljs.core.first(s__63874__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null),org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63869_$_iter__63871_$_iter__63873(cljs.core.rest(s__63874__$2)));
}
} else {
return null;
}
break;
}
});})(s__63872__$1,s__63870__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845))
,null,null));
});})(s__63872__$1,s__63870__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cz - rz),((cz + rz) + (1)))));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63869_$_iter__63871(cljs.core.rest(s__63872__$1)));
} else {
var G__63893 = cljs.core.rest(s__63872__$1);
s__63872__$1 = G__63893;
continue;
}
} else {
return null;
}
break;
}
});})(s__63870__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845))
,null,null));
});})(s__63870__$1,x,xs__5201__auto__,temp__4653__auto__,vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((cy - ry),((cy + ry) + (1)))));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$encoders$coordinate_neighbours_$_iter__63869(cljs.core.rest(s__63870__$1)));
} else {
var G__63894 = cljs.core.rest(s__63870__$1);
s__63870__$1 = G__63894;
continue;
}
} else {
return null;
}
break;
}
});})(vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845))
,null,null));
});})(vec__63867,cx,cy,cz,vec__63868,rx,ry,rz,G__63845))
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

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k63896,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__63898 = (((k63896 instanceof cljs.core.Keyword))?k63896.fqn:null);
switch (G__63898) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63896,else__5299__auto__);

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

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63895){
var self__ = this;
var G__63895__$1 = this;
return (new cljs.core.RecordIter((0),G__63895__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$scale_DASH_factors,cljs.core.cst$kw$radii], null),cljs.core._iterator(self__.__extmap)));
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

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__63895){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__63899 = cljs.core.keyword_identical_QMARK_;
var expr__63900 = k__5304__auto__;
if(cljs.core.truth_((pred__63899.cljs$core$IFn$_invoke$arity$2 ? pred__63899.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__63900) : pred__63899.call(null,cljs.core.cst$kw$topo,expr__63900)))){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(G__63895,self__.n_active,self__.scale_factors,self__.radii,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63899.cljs$core$IFn$_invoke$arity$2 ? pred__63899.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_active,expr__63900) : pred__63899.call(null,cljs.core.cst$kw$n_DASH_active,expr__63900)))){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,G__63895,self__.scale_factors,self__.radii,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63899.cljs$core$IFn$_invoke$arity$2 ? pred__63899.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$scale_DASH_factors,expr__63900) : pred__63899.call(null,cljs.core.cst$kw$scale_DASH_factors,expr__63900)))){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,G__63895,self__.radii,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__63899.cljs$core$IFn$_invoke$arity$2 ? pred__63899.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$radii,expr__63900) : pred__63899.call(null,cljs.core.cst$kw$radii,expr__63900)))){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,self__.scale_factors,G__63895,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,self__.scale_factors,self__.radii,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__63895),null));
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

org.nfrac.comportex.encoders.CoordinateEncoder.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__63895){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.encoders.CoordinateEncoder(self__.topo,self__.n_active,self__.scale_factors,self__.radii,G__63895,self__.__extmap,self__.__hash));
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

org.nfrac.comportex.encoders.map__GT_CoordinateEncoder = (function org$nfrac$comportex$encoders$map__GT_CoordinateEncoder(G__63897){
return (new org.nfrac.comportex.encoders.CoordinateEncoder(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__63897),cljs.core.cst$kw$n_DASH_active.cljs$core$IFn$_invoke$arity$1(G__63897),cljs.core.cst$kw$scale_DASH_factors.cljs$core$IFn$_invoke$arity$1(G__63897),cljs.core.cst$kw$radii.cljs$core$IFn$_invoke$arity$1(G__63897),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63897,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_active,cljs.core.cst$kw$scale_DASH_factors,cljs.core.cst$kw$radii], 0)),null));
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
var len__5740__auto___63904 = arguments.length;
var i__5741__auto___63905 = (0);
while(true){
if((i__5741__auto___63905 < len__5740__auto___63904)){
args__5747__auto__.push((arguments[i__5741__auto___63905]));

var G__63906 = (i__5741__auto___63905 + (1));
i__5741__auto___63905 = G__63906;
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

org.nfrac.comportex.encoders.sensor_cat.cljs$lang$applyTo = (function (seq63903){
return org.nfrac.comportex.encoders.sensor_cat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq63903));
});
