// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.topology');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.protocols');
org.nfrac.comportex.topology.abs = (function org$nfrac$comportex$topology$abs(x){
if((x < (0))){
return (- x);
} else {
return x;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {org.nfrac.comportex.protocols.PTopology}
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
org.nfrac.comportex.topology.OneDTopology = (function (size,__meta,__extmap,__hash){
this.size = size;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k34412,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__34414 = (((k34412 instanceof cljs.core.Keyword))?k34412.fqn:null);
switch (G__34414) {
case "size":
return self__.size;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k34412,else__5299__auto__);

}
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.topology.OneDTopology{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$size,self__.size],null))], null),self__.__extmap));
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__34411){
var self__ = this;
var G__34411__$1 = this;
return (new cljs.core.RecordIter((0),G__34411__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$size], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.topology.OneDTopology(self__.size,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.topology.OneDTopology.prototype.org$nfrac$comportex$protocols$PTopology$ = true;

org.nfrac.comportex.topology.OneDTopology.prototype.org$nfrac$comportex$protocols$PTopology$dimensions$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.size], null);
});

org.nfrac.comportex.topology.OneDTopology.prototype.org$nfrac$comportex$protocols$PTopology$coordinates_of_index$arity$2 = (function (_,idx){
var self__ = this;
var ___$1 = this;
return idx;
});

org.nfrac.comportex.topology.OneDTopology.prototype.org$nfrac$comportex$protocols$PTopology$index_of_coordinates$arity$2 = (function (_,coord){
var self__ = this;
var ___$1 = this;
return coord;
});

org.nfrac.comportex.topology.OneDTopology.prototype.org$nfrac$comportex$protocols$PTopology$neighbours_STAR_$arity$4 = (function (this$,coord,outer_r,inner_r){
var self__ = this;
var this$__$1 = this;
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__5020__auto__ = ((coord + inner_r) + (1));
var y__5021__auto__ = self__.size;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})(),(function (){var x__5020__auto__ = ((coord + outer_r) + (1));
var y__5021__auto__ = self__.size;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})()),cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__5013__auto__ = (coord - outer_r);
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})(),(function (){var x__5013__auto__ = (coord - inner_r);
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})()));
});

org.nfrac.comportex.topology.OneDTopology.prototype.org$nfrac$comportex$protocols$PTopology$coord_distance$arity$3 = (function (_,coord_a,coord_b){
var self__ = this;
var ___$1 = this;
return org.nfrac.comportex.topology.abs((coord_b - coord_a));
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$size,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.topology.OneDTopology(self__.size,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__34411){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__34415 = cljs.core.keyword_identical_QMARK_;
var expr__34416 = k__5304__auto__;
if(cljs.core.truth_((pred__34415.cljs$core$IFn$_invoke$arity$2 ? pred__34415.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$size,expr__34416) : pred__34415.call(null,cljs.core.cst$kw$size,expr__34416)))){
return (new org.nfrac.comportex.topology.OneDTopology(G__34411,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.topology.OneDTopology(self__.size,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__34411),null));
}
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$size,self__.size],null))], null),self__.__extmap));
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__34411){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.topology.OneDTopology(self__.size,G__34411,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topology.OneDTopology.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.topology.OneDTopology.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$size], null);
});

org.nfrac.comportex.topology.OneDTopology.cljs$lang$type = true;

org.nfrac.comportex.topology.OneDTopology.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.topology/OneDTopology");
});

org.nfrac.comportex.topology.OneDTopology.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.topology/OneDTopology");
});

org.nfrac.comportex.topology.__GT_OneDTopology = (function org$nfrac$comportex$topology$__GT_OneDTopology(size){
return (new org.nfrac.comportex.topology.OneDTopology(size,null,null,null));
});

org.nfrac.comportex.topology.map__GT_OneDTopology = (function org$nfrac$comportex$topology$map__GT_OneDTopology(G__34413){
return (new org.nfrac.comportex.topology.OneDTopology(cljs.core.cst$kw$size.cljs$core$IFn$_invoke$arity$1(G__34413),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__34413,cljs.core.cst$kw$size),null));
});

org.nfrac.comportex.topology.one_d_topology = (function org$nfrac$comportex$topology$one_d_topology(size){
return org.nfrac.comportex.topology.__GT_OneDTopology(size);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {org.nfrac.comportex.protocols.PTopology}
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
org.nfrac.comportex.topology.TwoDTopology = (function (width,height,__meta,__extmap,__hash){
this.width = width;
this.height = height;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k34420,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__34422 = (((k34420 instanceof cljs.core.Keyword))?k34420.fqn:null);
switch (G__34422) {
case "width":
return self__.width;

break;
case "height":
return self__.height;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k34420,else__5299__auto__);

}
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.topology.TwoDTopology{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$height,self__.height],null))], null),self__.__extmap));
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__34419){
var self__ = this;
var G__34419__$1 = this;
return (new cljs.core.RecordIter((0),G__34419__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$width,cljs.core.cst$kw$height], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.topology.TwoDTopology(self__.width,self__.height,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.topology.TwoDTopology.prototype.org$nfrac$comportex$protocols$PTopology$ = true;

org.nfrac.comportex.topology.TwoDTopology.prototype.org$nfrac$comportex$protocols$PTopology$dimensions$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.width,self__.height], null);
});

org.nfrac.comportex.topology.TwoDTopology.prototype.org$nfrac$comportex$protocols$PTopology$coordinates_of_index$arity$2 = (function (_,idx){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(idx,self__.height),cljs.core.rem(idx,self__.height)], null);
});

org.nfrac.comportex.topology.TwoDTopology.prototype.org$nfrac$comportex$protocols$PTopology$index_of_coordinates$arity$2 = (function (_,coord){
var self__ = this;
var ___$1 = this;
var vec__34423 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34423,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34423,(1),null);
return ((cx * self__.height) + cy);
});

org.nfrac.comportex.topology.TwoDTopology.prototype.org$nfrac$comportex$protocols$PTopology$neighbours_STAR_$arity$4 = (function (this$,coord,outer_r,inner_r){
var self__ = this;
var this$__$1 = this;
var vec__34424 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34424,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34424,(1),null);
var iter__5454__auto__ = ((function (vec__34424,cx,cy,this$__$1){
return (function org$nfrac$comportex$topology$iter__34425(s__34426){
return (new cljs.core.LazySeq(null,((function (vec__34424,cx,cy,this$__$1){
return (function (){
var s__34426__$1 = s__34426;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__34426__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var x = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__34426__$1,x,xs__5201__auto__,temp__4653__auto__,vec__34424,cx,cy,this$__$1){
return (function org$nfrac$comportex$topology$iter__34425_$_iter__34427(s__34428){
return (new cljs.core.LazySeq(null,((function (s__34426__$1,x,xs__5201__auto__,temp__4653__auto__,vec__34424,cx,cy,this$__$1){
return (function (){
var s__34428__$1 = s__34428;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__34428__$1);
if(temp__4653__auto____$1){
var s__34428__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__34428__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__34428__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__34430 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__34429 = (0);
while(true){
if((i__34429 < size__5453__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__34429);
if(((org.nfrac.comportex.topology.abs((x - cx)) > inner_r)) || ((org.nfrac.comportex.topology.abs((y - cy)) > inner_r))){
cljs.core.chunk_append(b__34430,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null));

var G__34442 = (i__34429 + (1));
i__34429 = G__34442;
continue;
} else {
var G__34443 = (i__34429 + (1));
i__34429 = G__34443;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__34430),org$nfrac$comportex$topology$iter__34425_$_iter__34427(cljs.core.chunk_rest(s__34428__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__34430),null);
}
} else {
var y = cljs.core.first(s__34428__$2);
if(((org.nfrac.comportex.topology.abs((x - cx)) > inner_r)) || ((org.nfrac.comportex.topology.abs((y - cy)) > inner_r))){
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),org$nfrac$comportex$topology$iter__34425_$_iter__34427(cljs.core.rest(s__34428__$2)));
} else {
var G__34444 = cljs.core.rest(s__34428__$2);
s__34428__$1 = G__34444;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__34426__$1,x,xs__5201__auto__,temp__4653__auto__,vec__34424,cx,cy,this$__$1))
,null,null));
});})(s__34426__$1,x,xs__5201__auto__,temp__4653__auto__,vec__34424,cx,cy,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__5013__auto__ = (cy - outer_r);
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})(),(function (){var x__5020__auto__ = ((cy + outer_r) + (1));
var y__5021__auto__ = self__.height;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})())));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$topology$iter__34425(cljs.core.rest(s__34426__$1)));
} else {
var G__34445 = cljs.core.rest(s__34426__$1);
s__34426__$1 = G__34445;
continue;
}
} else {
return null;
}
break;
}
});})(vec__34424,cx,cy,this$__$1))
,null,null));
});})(vec__34424,cx,cy,this$__$1))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__5013__auto__ = (cx - outer_r);
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})(),(function (){var x__5020__auto__ = ((cx + outer_r) + (1));
var y__5021__auto__ = self__.width;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})()));
});

org.nfrac.comportex.topology.TwoDTopology.prototype.org$nfrac$comportex$protocols$PTopology$coord_distance$arity$3 = (function (_,coord_a,coord_b){
var self__ = this;
var ___$1 = this;
var vec__34436 = coord_a;
var xa = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34436,(0),null);
var ya = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34436,(1),null);
var vec__34437 = coord_b;
var xb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34437,(0),null);
var yb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34437,(1),null);
return (org.nfrac.comportex.topology.abs((xb - xa)) + org.nfrac.comportex.topology.abs((yb - ya)));
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,null,cljs.core.cst$kw$height,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.topology.TwoDTopology(self__.width,self__.height,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__34419){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__34438 = cljs.core.keyword_identical_QMARK_;
var expr__34439 = k__5304__auto__;
if(cljs.core.truth_((pred__34438.cljs$core$IFn$_invoke$arity$2 ? pred__34438.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$width,expr__34439) : pred__34438.call(null,cljs.core.cst$kw$width,expr__34439)))){
return (new org.nfrac.comportex.topology.TwoDTopology(G__34419,self__.height,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34438.cljs$core$IFn$_invoke$arity$2 ? pred__34438.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$height,expr__34439) : pred__34438.call(null,cljs.core.cst$kw$height,expr__34439)))){
return (new org.nfrac.comportex.topology.TwoDTopology(self__.width,G__34419,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.topology.TwoDTopology(self__.width,self__.height,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__34419),null));
}
}
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$height,self__.height],null))], null),self__.__extmap));
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__34419){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.topology.TwoDTopology(self__.width,self__.height,G__34419,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topology.TwoDTopology.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.topology.TwoDTopology.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$width,cljs.core.cst$sym$height], null);
});

org.nfrac.comportex.topology.TwoDTopology.cljs$lang$type = true;

org.nfrac.comportex.topology.TwoDTopology.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.topology/TwoDTopology");
});

org.nfrac.comportex.topology.TwoDTopology.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.topology/TwoDTopology");
});

org.nfrac.comportex.topology.__GT_TwoDTopology = (function org$nfrac$comportex$topology$__GT_TwoDTopology(width,height){
return (new org.nfrac.comportex.topology.TwoDTopology(width,height,null,null,null));
});

org.nfrac.comportex.topology.map__GT_TwoDTopology = (function org$nfrac$comportex$topology$map__GT_TwoDTopology(G__34421){
return (new org.nfrac.comportex.topology.TwoDTopology(cljs.core.cst$kw$width.cljs$core$IFn$_invoke$arity$1(G__34421),cljs.core.cst$kw$height.cljs$core$IFn$_invoke$arity$1(G__34421),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__34421,cljs.core.cst$kw$width,cljs.core.array_seq([cljs.core.cst$kw$height], 0)),null));
});

org.nfrac.comportex.topology.two_d_topology = (function org$nfrac$comportex$topology$two_d_topology(width,height){
return org.nfrac.comportex.topology.__GT_TwoDTopology(width,height);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {org.nfrac.comportex.protocols.PTopology}
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
org.nfrac.comportex.topology.ThreeDTopology = (function (width,height,depth,__meta,__extmap,__hash){
this.width = width;
this.height = height;
this.depth = depth;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k34447,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__34449 = (((k34447 instanceof cljs.core.Keyword))?k34447.fqn:null);
switch (G__34449) {
case "width":
return self__.width;

break;
case "height":
return self__.height;

break;
case "depth":
return self__.depth;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k34447,else__5299__auto__);

}
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.nfrac.comportex.topology.ThreeDTopology{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$depth,self__.depth],null))], null),self__.__extmap));
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__34446){
var self__ = this;
var G__34446__$1 = this;
return (new cljs.core.RecordIter((0),G__34446__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$width,cljs.core.cst$kw$height,cljs.core.cst$kw$depth], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.nfrac.comportex.topology.ThreeDTopology(self__.width,self__.height,self__.depth,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (3 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.nfrac.comportex.topology.ThreeDTopology.prototype.org$nfrac$comportex$protocols$PTopology$ = true;

org.nfrac.comportex.topology.ThreeDTopology.prototype.org$nfrac$comportex$protocols$PTopology$dimensions$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.width,self__.height,self__.depth], null);
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.org$nfrac$comportex$protocols$PTopology$coordinates_of_index$arity$2 = (function (_,idx){
var self__ = this;
var ___$1 = this;
var x = cljs.core.quot(idx,(self__.height * self__.depth));
var x_rem = cljs.core.rem(idx,(self__.height * self__.depth));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,cljs.core.quot(x_rem,self__.depth),cljs.core.rem(x_rem,self__.depth)], null);
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.org$nfrac$comportex$protocols$PTopology$index_of_coordinates$arity$2 = (function (_,coord){
var self__ = this;
var ___$1 = this;
var vec__34450 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34450,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34450,(1),null);
var cz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34450,(2),null);
return ((((cx * self__.height) * self__.depth) + (cy * self__.height)) + cz);
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.org$nfrac$comportex$protocols$PTopology$neighbours_STAR_$arity$4 = (function (this$,coord,outer_r,inner_r){
var self__ = this;
var this$__$1 = this;
var vec__34451 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34451,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34451,(1),null);
var cz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34451,(2),null);
var iter__5454__auto__ = ((function (vec__34451,cx,cy,cz,this$__$1){
return (function org$nfrac$comportex$topology$iter__34452(s__34453){
return (new cljs.core.LazySeq(null,((function (vec__34451,cx,cy,cz,this$__$1){
return (function (){
var s__34453__$1 = s__34453;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__34453__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var x = cljs.core.first(xs__5201__auto__);
var iterys__5450__auto__ = ((function (s__34453__$1,x,xs__5201__auto__,temp__4653__auto__,vec__34451,cx,cy,cz,this$__$1){
return (function org$nfrac$comportex$topology$iter__34452_$_iter__34454(s__34455){
return (new cljs.core.LazySeq(null,((function (s__34453__$1,x,xs__5201__auto__,temp__4653__auto__,vec__34451,cx,cy,cz,this$__$1){
return (function (){
var s__34455__$1 = s__34455;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__34455__$1);
if(temp__4653__auto____$1){
var xs__5201__auto____$1 = temp__4653__auto____$1;
var y = cljs.core.first(xs__5201__auto____$1);
var iterys__5450__auto__ = ((function (s__34455__$1,s__34453__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__34451,cx,cy,cz,this$__$1){
return (function org$nfrac$comportex$topology$iter__34452_$_iter__34454_$_iter__34456(s__34457){
return (new cljs.core.LazySeq(null,((function (s__34455__$1,s__34453__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__34451,cx,cy,cz,this$__$1){
return (function (){
var s__34457__$1 = s__34457;
while(true){
var temp__4653__auto____$2 = cljs.core.seq(s__34457__$1);
if(temp__4653__auto____$2){
var s__34457__$2 = temp__4653__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__34457__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__34457__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__34459 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__34458 = (0);
while(true){
if((i__34458 < size__5453__auto__)){
var z = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__34458);
if(((org.nfrac.comportex.topology.abs((x - cx)) > inner_r)) || ((org.nfrac.comportex.topology.abs((y - cy)) > inner_r)) || ((org.nfrac.comportex.topology.abs((y - cz)) > inner_r))){
cljs.core.chunk_append(b__34459,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null));

var G__34477 = (i__34458 + (1));
i__34458 = G__34477;
continue;
} else {
var G__34478 = (i__34458 + (1));
i__34458 = G__34478;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__34459),org$nfrac$comportex$topology$iter__34452_$_iter__34454_$_iter__34456(cljs.core.chunk_rest(s__34457__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__34459),null);
}
} else {
var z = cljs.core.first(s__34457__$2);
if(((org.nfrac.comportex.topology.abs((x - cx)) > inner_r)) || ((org.nfrac.comportex.topology.abs((y - cy)) > inner_r)) || ((org.nfrac.comportex.topology.abs((y - cz)) > inner_r))){
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null),org$nfrac$comportex$topology$iter__34452_$_iter__34454_$_iter__34456(cljs.core.rest(s__34457__$2)));
} else {
var G__34479 = cljs.core.rest(s__34457__$2);
s__34457__$1 = G__34479;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__34455__$1,s__34453__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__34451,cx,cy,cz,this$__$1))
,null,null));
});})(s__34455__$1,s__34453__$1,y,xs__5201__auto____$1,temp__4653__auto____$1,x,xs__5201__auto__,temp__4653__auto__,vec__34451,cx,cy,cz,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__5013__auto__ = (cz - outer_r);
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})(),(function (){var x__5020__auto__ = ((cz + outer_r) + (1));
var y__5021__auto__ = self__.depth;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})())));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$topology$iter__34452_$_iter__34454(cljs.core.rest(s__34455__$1)));
} else {
var G__34480 = cljs.core.rest(s__34455__$1);
s__34455__$1 = G__34480;
continue;
}
} else {
return null;
}
break;
}
});})(s__34453__$1,x,xs__5201__auto__,temp__4653__auto__,vec__34451,cx,cy,cz,this$__$1))
,null,null));
});})(s__34453__$1,x,xs__5201__auto__,temp__4653__auto__,vec__34451,cx,cy,cz,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__5013__auto__ = (cy - outer_r);
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})(),(function (){var x__5020__auto__ = ((cy + outer_r) + (1));
var y__5021__auto__ = self__.height;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})())));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,org$nfrac$comportex$topology$iter__34452(cljs.core.rest(s__34453__$1)));
} else {
var G__34481 = cljs.core.rest(s__34453__$1);
s__34453__$1 = G__34481;
continue;
}
} else {
return null;
}
break;
}
});})(vec__34451,cx,cy,cz,this$__$1))
,null,null));
});})(vec__34451,cx,cy,cz,this$__$1))
;
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__5013__auto__ = (cx - outer_r);
var y__5014__auto__ = (0);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})(),(function (){var x__5020__auto__ = ((cx + outer_r) + (1));
var y__5021__auto__ = self__.width;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})()));
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.org$nfrac$comportex$protocols$PTopology$coord_distance$arity$3 = (function (_,coord_a,coord_b){
var self__ = this;
var ___$1 = this;
var vec__34471 = coord_a;
var xa = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34471,(0),null);
var ya = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34471,(1),null);
var za = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34471,(2),null);
var vec__34472 = coord_b;
var xb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34472,(0),null);
var yb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34472,(1),null);
var zb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34472,(2),null);
return ((org.nfrac.comportex.topology.abs((xb - xa)) + org.nfrac.comportex.topology.abs((yb - ya))) + org.nfrac.comportex.topology.abs((zb - za)));
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$width,null,cljs.core.cst$kw$depth,null,cljs.core.cst$kw$height,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.nfrac.comportex.topology.ThreeDTopology(self__.width,self__.height,self__.depth,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__34446){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__34473 = cljs.core.keyword_identical_QMARK_;
var expr__34474 = k__5304__auto__;
if(cljs.core.truth_((pred__34473.cljs$core$IFn$_invoke$arity$2 ? pred__34473.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$width,expr__34474) : pred__34473.call(null,cljs.core.cst$kw$width,expr__34474)))){
return (new org.nfrac.comportex.topology.ThreeDTopology(G__34446,self__.height,self__.depth,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34473.cljs$core$IFn$_invoke$arity$2 ? pred__34473.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$height,expr__34474) : pred__34473.call(null,cljs.core.cst$kw$height,expr__34474)))){
return (new org.nfrac.comportex.topology.ThreeDTopology(self__.width,G__34446,self__.depth,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__34473.cljs$core$IFn$_invoke$arity$2 ? pred__34473.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$depth,expr__34474) : pred__34473.call(null,cljs.core.cst$kw$depth,expr__34474)))){
return (new org.nfrac.comportex.topology.ThreeDTopology(self__.width,self__.height,G__34446,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.topology.ThreeDTopology(self__.width,self__.height,self__.depth,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__34446),null));
}
}
}
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$depth,self__.depth],null))], null),self__.__extmap));
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__34446){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.nfrac.comportex.topology.ThreeDTopology(self__.width,self__.height,self__.depth,G__34446,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topology.ThreeDTopology.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.nfrac.comportex.topology.ThreeDTopology.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$width,cljs.core.cst$sym$height,cljs.core.cst$sym$depth], null);
});

org.nfrac.comportex.topology.ThreeDTopology.cljs$lang$type = true;

org.nfrac.comportex.topology.ThreeDTopology.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.topology/ThreeDTopology");
});

org.nfrac.comportex.topology.ThreeDTopology.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.nfrac.comportex.topology/ThreeDTopology");
});

org.nfrac.comportex.topology.__GT_ThreeDTopology = (function org$nfrac$comportex$topology$__GT_ThreeDTopology(width,height,depth){
return (new org.nfrac.comportex.topology.ThreeDTopology(width,height,depth,null,null,null));
});

org.nfrac.comportex.topology.map__GT_ThreeDTopology = (function org$nfrac$comportex$topology$map__GT_ThreeDTopology(G__34448){
return (new org.nfrac.comportex.topology.ThreeDTopology(cljs.core.cst$kw$width.cljs$core$IFn$_invoke$arity$1(G__34448),cljs.core.cst$kw$height.cljs$core$IFn$_invoke$arity$1(G__34448),cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(G__34448),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__34448,cljs.core.cst$kw$width,cljs.core.array_seq([cljs.core.cst$kw$height,cljs.core.cst$kw$depth], 0)),null));
});

org.nfrac.comportex.topology.three_d_topology = (function org$nfrac$comportex$topology$three_d_topology(w,h,d){
return org.nfrac.comportex.topology.__GT_ThreeDTopology(w,h,d);
});
org.nfrac.comportex.topology.make_topology = (function org$nfrac$comportex$topology$make_topology(dims){
var vec__34484 = dims;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34484,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34484,(1),null);
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34484,(2),null);
var q = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34484,(3),null);
var G__34485 = cljs.core.count(dims);
switch (G__34485) {
case (0):
return org.nfrac.comportex.topology.one_d_topology((0));

break;
case (1):
return org.nfrac.comportex.topology.one_d_topology(w);

break;
case (2):
return org.nfrac.comportex.topology.two_d_topology(w,h);

break;
case (3):
return org.nfrac.comportex.topology.three_d_topology(w,h,d);

break;
case (4):
return org.nfrac.comportex.topology.three_d_topology(w,h,(d * q));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.count(dims))].join('')));

}
});
org.nfrac.comportex.topology.empty_topology = org.nfrac.comportex.topology.make_topology(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null));
/**
 * Project n dimensions to n-1 dimensions by eliminating the last dimension.
 * 
 *   This removes potentially-valuable structure.
 *   Example: in dimensions [8 7 6], the points [0 0 0] [0 1 0] are adjacent.
 *   After squashing to [8 42], these points [0 0] [0 6] are much further apart.
 */
org.nfrac.comportex.topology.squash_last_dimension = (function org$nfrac$comportex$topology$squash_last_dimension(dims){
return cljs.core.vec(cljs.core.butlast(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(dims,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.count(dims) - (2))], null),cljs.core._STAR_,cljs.core.last(dims))));
});
/**
 * Project n dimensions to n+1 dimensions by dividing the first dimension
 *   into cross sections.
 * 
 *   This artificially adds structure. It can also disrupt existing structure.
 *   Example: In dimensions [64] the points [7] and [8] are adjacent.
 *   After splitting to [8 8], these points [0 7] [1 0] are further apart.
 */
org.nfrac.comportex.topology.split_first_dimension = (function org$nfrac$comportex$topology$split_first_dimension(dims,xsection_length){
var temp__4653__auto__ = dims;
if(cljs.core.truth_(temp__4653__auto__)){
var vec__34488 = temp__4653__auto__;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34488,(0),null);
var rest = cljs.core.nthnext(vec__34488,(1));
if((cljs.core.rem(x,xsection_length) === (0))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(x,xsection_length)], null),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(dims,(0),xsection_length));
} else {
return null;
}
} else {
return null;
}
});
/**
 * Align n topologies along the x axis into a single topology.
 *   If the topologies don't stack neatly, force compatibility via two
 *   strategies:
 * 
 *   1. Add dimensions to the lower-dimensional topology by splitting its first
 *   dimension into cross sections. This is analogous to summing numbers encoded
 *   in a mixed radix. If the sum of `higher` and `lower` can be expressed by only
 *   changing the first digit of `higher`, then the two can be stacked in
 *   `higher`'s radix (i.e. dimensions).
 * 
 *   Default behavior: don't redistribute / mangle `lower`'s lower dimensions
 *   (i.e. [y, z, ...]). To force mangling, provide a 1-dimensional `lower`.
 * 
 *   2. Remove dimensions from the higher-dimension topology by squashing its
 *   last two dimensions into one.
 * 
 *   It's best to hand-pick compatible topologies if topology matters.
 */
org.nfrac.comportex.topology.combined_dimensions = (function org$nfrac$comportex$topology$combined_dimensions(var_args){
var args34490 = [];
var len__5740__auto___34496 = arguments.length;
var i__5741__auto___34497 = (0);
while(true){
if((i__5741__auto___34497 < len__5740__auto___34496)){
args34490.push((arguments[i__5741__auto___34497]));

var G__34498 = (i__5741__auto___34497 + (1));
i__5741__auto___34497 = G__34498;
continue;
} else {
}
break;
}

var G__34493 = args34490.length;
switch (G__34493) {
case 0:
return org.nfrac.comportex.topology.combined_dimensions.cljs$core$IFn$_invoke$arity$0();

break;
default:
var argseq__5759__auto__ = (new cljs.core.IndexedSeq(args34490.slice((0)),(0)));
return org.nfrac.comportex.topology.combined_dimensions.cljs$core$IFn$_invoke$arity$variadic(argseq__5759__auto__);

}
});

org.nfrac.comportex.topology.combined_dimensions.cljs$core$IFn$_invoke$arity$0 = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null);
});

org.nfrac.comportex.topology.combined_dimensions.cljs$core$IFn$_invoke$arity$variadic = (function (all_dims){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2((function (dims1,dims2){
while(true){
var vec__34494 = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.count,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (dims1,dims2){
return (function (p1__34489_SHARP_){
if(cljs.core.empty_QMARK_(p1__34489_SHARP_)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null);
} else {
return p1__34489_SHARP_;
}
});})(dims1,dims2))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dims1,dims2], null)));
var lower = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34494,(0),null);
var higher = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34494,(1),null);
var disparity = (cljs.core.count(higher) - cljs.core.count(lower));
var vec__34495 = cljs.core.split_at(disparity,cljs.core.rest(higher));
var to_match = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34495,(0),null);
var must_already_match = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34495,(1),null);
var temp__4651__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.rest(lower)),cljs.core.vec(must_already_match)))?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.topology.split_first_dimension,lower,cljs.core.reverse(to_match)):null);
if(cljs.core.truth_(temp__4651__auto__)){
var compatible = temp__4651__auto__;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(higher,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),cljs.core._PLUS_,cljs.core.first(compatible));
} else {
var G__34500 = org.nfrac.comportex.topology.squash_last_dimension(higher);
var G__34501 = lower;
dims1 = G__34500;
dims2 = G__34501;
continue;
}
break;
}
}),all_dims);
});

org.nfrac.comportex.topology.combined_dimensions.cljs$lang$applyTo = (function (seq34491){
return org.nfrac.comportex.topology.combined_dimensions.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34491));
});

org.nfrac.comportex.topology.combined_dimensions.cljs$lang$maxFixedArity = (0);
