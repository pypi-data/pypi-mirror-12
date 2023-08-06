// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.bridge.marshalling');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async.impl.protocols');
goog.require('cognitect.transit');

/**
 * @interface
 */
org.numenta.sanity.bridge.marshalling.PMarshalled = function(){};

org.numenta.sanity.bridge.marshalling.release_BANG_ = (function org$numenta$sanity$bridge$marshalling$release_BANG_(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$bridge$marshalling$PMarshalled$release_BANG_$arity$1 == null)))){
return this$.org$numenta$sanity$bridge$marshalling$PMarshalled$release_BANG_$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.bridge.marshalling.release_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.bridge.marshalling.release_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PMarshalled.release!",this$);
}
}
}
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.numenta.sanity.bridge.marshalling.PMarshalled}
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
org.numenta.sanity.bridge.marshalling.ChannelMarshal = (function (ch,single_use_QMARK_,released_QMARK_,__meta,__extmap,__hash){
this.ch = ch;
this.single_use_QMARK_ = single_use_QMARK_;
this.released_QMARK_ = released_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k39920,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__39922 = (((k39920 instanceof cljs.core.Keyword))?k39920.fqn:null);
switch (G__39922) {
case "ch":
return self__.ch;

break;
case "single-use?":
return self__.single_use_QMARK_;

break;
case "released?":
return self__.released_QMARK_;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k39920,else__5299__auto__);

}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.org$numenta$sanity$bridge$marshalling$PMarshalled$ = true;

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.org$numenta$sanity$bridge$marshalling$PMarshalled$release_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.released_QMARK_,true) : cljs.core.reset_BANG_.call(null,self__.released_QMARK_,true));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.numenta.sanity.bridge.marshalling.ChannelMarshal{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ch,self__.ch],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$single_DASH_use_QMARK_,self__.single_use_QMARK_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$released_QMARK_,self__.released_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__39919){
var self__ = this;
var G__39919__$1 = this;
return (new cljs.core.RecordIter((0),G__39919__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$single_DASH_use_QMARK_,cljs.core.cst$kw$released_QMARK_], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (3 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$ch,null,cljs.core.cst$kw$single_DASH_use_QMARK_,null,cljs.core.cst$kw$released_QMARK_,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,self__.released_QMARK_,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__39919){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__39923 = cljs.core.keyword_identical_QMARK_;
var expr__39924 = k__5304__auto__;
if(cljs.core.truth_((pred__39923.cljs$core$IFn$_invoke$arity$2 ? pred__39923.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$ch,expr__39924) : pred__39923.call(null,cljs.core.cst$kw$ch,expr__39924)))){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(G__39919,self__.single_use_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__39923.cljs$core$IFn$_invoke$arity$2 ? pred__39923.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$single_DASH_use_QMARK_,expr__39924) : pred__39923.call(null,cljs.core.cst$kw$single_DASH_use_QMARK_,expr__39924)))){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,G__39919,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__39923.cljs$core$IFn$_invoke$arity$2 ? pred__39923.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$released_QMARK_,expr__39924) : pred__39923.call(null,cljs.core.cst$kw$released_QMARK_,expr__39924)))){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,G__39919,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,self__.released_QMARK_,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__39919),null));
}
}
}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ch,self__.ch],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$single_DASH_use_QMARK_,self__.single_use_QMARK_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$released_QMARK_,self__.released_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__39919){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,self__.released_QMARK_,G__39919,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ch,cljs.core.cst$sym$single_DASH_use_QMARK_,cljs.core.cst$sym$released_QMARK_], null);
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.ChannelMarshal.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.bridge.marshalling/ChannelMarshal");
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.numenta.sanity.bridge.marshalling/ChannelMarshal");
});

org.numenta.sanity.bridge.marshalling.__GT_ChannelMarshal = (function org$numenta$sanity$bridge$marshalling$__GT_ChannelMarshal(ch,single_use_QMARK_,released_QMARK_){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(ch,single_use_QMARK_,released_QMARK_,null,null,null));
});

org.numenta.sanity.bridge.marshalling.map__GT_ChannelMarshal = (function org$numenta$sanity$bridge$marshalling$map__GT_ChannelMarshal(G__39921){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(G__39921),cljs.core.cst$kw$single_DASH_use_QMARK_.cljs$core$IFn$_invoke$arity$1(G__39921),cljs.core.cst$kw$released_QMARK_.cljs$core$IFn$_invoke$arity$1(G__39921),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__39921,cljs.core.cst$kw$ch,cljs.core.array_seq([cljs.core.cst$kw$single_DASH_use_QMARK_,cljs.core.cst$kw$released_QMARK_], 0)),null));
});

/**
 * Allows a channel to be marshalled across the network.
 * 
 *   When Client A serializes a ChannelMarshal, Client A will assign it a target-id
 *   and send the target-id across the network. When decoding the message, Client B
 *   will set the decoded ChannelMarshal's :ch field to a ChannelProxy. Any `put!`
 *   or `close!` on a ChannelProxy will be delivered across the network back to
 *   Client A.
 * 
 *   Client B should not send a ChannelMarshal back to Client A. It will create a
 *   silly chain of proxies. Use `channel-weak`.
 * 
 *   All of this assumes that the network code on both clients is using
 *   write-handlers and read-handlers that follow this protocol.
 */
org.numenta.sanity.bridge.marshalling.channel = (function org$numenta$sanity$bridge$marshalling$channel(var_args){
var args39927 = [];
var len__5740__auto___39930 = arguments.length;
var i__5741__auto___39931 = (0);
while(true){
if((i__5741__auto___39931 < len__5740__auto___39930)){
args39927.push((arguments[i__5741__auto___39931]));

var G__39932 = (i__5741__auto___39931 + (1));
i__5741__auto___39931 = G__39932;
continue;
} else {
}
break;
}

var G__39929 = args39927.length;
switch (G__39929) {
case 1:
return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args39927.length)].join('')));

}
});

org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(ch,false);
});

org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2 = (function (ch,single_use_QMARK_){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(ch,single_use_QMARK_,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false)),null,null,null));
});

org.numenta.sanity.bridge.marshalling.channel.cljs$lang$maxFixedArity = 2;

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
org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal = (function (target_id,__meta,__extmap,__hash){
this.target_id = target_id;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k39935,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__39937 = (((k39935 instanceof cljs.core.Keyword))?k39935.fqn:null);
switch (G__39937) {
case "target-id":
return self__.target_id;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k39935,else__5299__auto__);

}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__39934){
var self__ = this;
var G__39934__$1 = this;
return (new cljs.core.RecordIter((0),G__39934__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target_DASH_id], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(self__.target_id,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$target_DASH_id,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(self__.target_id,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__39934){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__39938 = cljs.core.keyword_identical_QMARK_;
var expr__39939 = k__5304__auto__;
if(cljs.core.truth_((pred__39938.cljs$core$IFn$_invoke$arity$2 ? pred__39938.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,expr__39939) : pred__39938.call(null,cljs.core.cst$kw$target_DASH_id,expr__39939)))){
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(G__39934,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(self__.target_id,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__39934),null));
}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__39934){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(self__.target_id,G__39934,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$target_DASH_id], null);
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.bridge.marshalling/ChannelWeakMarshal");
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.numenta.sanity.bridge.marshalling/ChannelWeakMarshal");
});

org.numenta.sanity.bridge.marshalling.__GT_ChannelWeakMarshal = (function org$numenta$sanity$bridge$marshalling$__GT_ChannelWeakMarshal(target_id){
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(target_id,null,null,null));
});

org.numenta.sanity.bridge.marshalling.map__GT_ChannelWeakMarshal = (function org$numenta$sanity$bridge$marshalling$map__GT_ChannelWeakMarshal(G__39936){
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(G__39936),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__39936,cljs.core.cst$kw$target_DASH_id),null));
});

/**
 * Allows a marshalled channel to be referred to without creating chains of
 *   proxies.
 * 
 *   When a client decodes a message containing a ChannelWeakMarshal, it will check
 *   if this target-id belongs to this client. If it does, this ChannelWeakMarshal
 *   will be 'decoded' into its original ChannelMarshal. This allows Client B to
 *   tell Client A 'If we get disconnected, send me this data blob on reconnect,
 *   and I'll remember you'. This allows the data blob to contain channels that are
 *   usable again on second send without causing a chain of proxies.
 * 
 *   All of this assumes that the network code on both clients is using
 *   write-handlers and read-handlers that follow this protocol.
 */
org.numenta.sanity.bridge.marshalling.channel_weak = (function org$numenta$sanity$bridge$marshalling$channel_weak(target_id){
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(target_id,null,null,null));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.numenta.sanity.bridge.marshalling.PMarshalled}
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
org.numenta.sanity.bridge.marshalling.BigValueMarshal = (function (resource_id,value,pushed_QMARK_,released_QMARK_,__meta,__extmap,__hash){
this.resource_id = resource_id;
this.value = value;
this.pushed_QMARK_ = pushed_QMARK_;
this.released_QMARK_ = released_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k39943,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__39945 = (((k39943 instanceof cljs.core.Keyword))?k39943.fqn:null);
switch (G__39945) {
case "resource-id":
return self__.resource_id;

break;
case "value":
return self__.value;

break;
case "pushed?":
return self__.pushed_QMARK_;

break;
case "released?":
return self__.released_QMARK_;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k39943,else__5299__auto__);

}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.org$numenta$sanity$bridge$marshalling$PMarshalled$ = true;

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.org$numenta$sanity$bridge$marshalling$PMarshalled$release_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.released_QMARK_,true) : cljs.core.reset_BANG_.call(null,self__.released_QMARK_,true));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.numenta.sanity.bridge.marshalling.BigValueMarshal{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$resource_DASH_id,self__.resource_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$value,self__.value],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$pushed_QMARK_,self__.pushed_QMARK_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$released_QMARK_,self__.released_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__39942){
var self__ = this;
var G__39942__$1 = this;
return (new cljs.core.RecordIter((0),G__39942__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$resource_DASH_id,cljs.core.cst$kw$value,cljs.core.cst$kw$pushed_QMARK_,cljs.core.cst$kw$released_QMARK_], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$value,null,cljs.core.cst$kw$resource_DASH_id,null,cljs.core.cst$kw$pushed_QMARK_,null,cljs.core.cst$kw$released_QMARK_,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__39942){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__39946 = cljs.core.keyword_identical_QMARK_;
var expr__39947 = k__5304__auto__;
if(cljs.core.truth_((pred__39946.cljs$core$IFn$_invoke$arity$2 ? pred__39946.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$resource_DASH_id,expr__39947) : pred__39946.call(null,cljs.core.cst$kw$resource_DASH_id,expr__39947)))){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(G__39942,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__39946.cljs$core$IFn$_invoke$arity$2 ? pred__39946.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value,expr__39947) : pred__39946.call(null,cljs.core.cst$kw$value,expr__39947)))){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,G__39942,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__39946.cljs$core$IFn$_invoke$arity$2 ? pred__39946.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$pushed_QMARK_,expr__39947) : pred__39946.call(null,cljs.core.cst$kw$pushed_QMARK_,expr__39947)))){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,G__39942,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__39946.cljs$core$IFn$_invoke$arity$2 ? pred__39946.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$released_QMARK_,expr__39947) : pred__39946.call(null,cljs.core.cst$kw$released_QMARK_,expr__39947)))){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,G__39942,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__39942),null));
}
}
}
}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$resource_DASH_id,self__.resource_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$value,self__.value],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$pushed_QMARK_,self__.pushed_QMARK_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$released_QMARK_,self__.released_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__39942){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,G__39942,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$resource_DASH_id,cljs.core.cst$sym$value,cljs.core.cst$sym$pushed_QMARK_,cljs.core.cst$sym$released_QMARK_], null);
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.BigValueMarshal.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.bridge.marshalling/BigValueMarshal");
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.numenta.sanity.bridge.marshalling/BigValueMarshal");
});

org.numenta.sanity.bridge.marshalling.__GT_BigValueMarshal = (function org$numenta$sanity$bridge$marshalling$__GT_BigValueMarshal(resource_id,value,pushed_QMARK_,released_QMARK_){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(resource_id,value,pushed_QMARK_,released_QMARK_,null,null,null));
});

org.numenta.sanity.bridge.marshalling.map__GT_BigValueMarshal = (function org$numenta$sanity$bridge$marshalling$map__GT_BigValueMarshal(G__39944){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(cljs.core.cst$kw$resource_DASH_id.cljs$core$IFn$_invoke$arity$1(G__39944),cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(G__39944),cljs.core.cst$kw$pushed_QMARK_.cljs$core$IFn$_invoke$arity$1(G__39944),cljs.core.cst$kw$released_QMARK_.cljs$core$IFn$_invoke$arity$1(G__39944),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__39944,cljs.core.cst$kw$resource_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$value,cljs.core.cst$kw$pushed_QMARK_,cljs.core.cst$kw$released_QMARK_], 0)),null));
});

/**
 * Put a value in a box labelled 'recipients should cache this so that I don't
 *   have to send it every time.'
 * 
 *   When Client B decodes a message containing a BigValueMarshal, it will save the
 *   value and tell Client A that it has saved the value. Later, when Client A
 *   serializes the same BigValueMarshal to send it to Client B, it will only
 *   include the resource-id, and Client B will reinsert the value when it decodes
 *   the message.
 * 
 *   Call `release!` on a BigValueMarshal to tell other machines that they can
 *   release it.
 * 
 *   All of this assumes that the network code on both clients is using
 *   write-handlers and read-handlers that follow this protocol.
 */
org.numenta.sanity.bridge.marshalling.big_value = (function org$numenta$sanity$bridge$marshalling$big_value(value){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(cljs.core.random_uuid(),value,false,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false)),null,null,null));
});
org.numenta.sanity.bridge.marshalling.future = (function org$numenta$sanity$bridge$marshalling$future(val){
if(typeof org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IWithMeta}
*/
org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953 = (function (future,val,meta39954){
this.future = future;
this.val = val;
this.meta39954 = meta39954;
this.cljs$lang$protocol_mask$partition0$ = 425984;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39955,meta39954__$1){
var self__ = this;
var _39955__$1 = this;
return (new org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953(self__.future,self__.val,meta39954__$1));
});

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39955){
var self__ = this;
var _39955__$1 = this;
return self__.meta39954;
});

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.val;
});

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$future,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$val], null)))], null)),cljs.core.cst$sym$val,cljs.core.cst$sym$meta39954], null);
});

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953.cljs$lang$ctorStr = "org.numenta.sanity.bridge.marshalling/t_org$numenta$sanity$bridge$marshalling39953";

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953.cljs$lang$ctorPrWriter = (function (this__5280__auto__,writer__5281__auto__,opt__5282__auto__){
return cljs.core._write(writer__5281__auto__,"org.numenta.sanity.bridge.marshalling/t_org$numenta$sanity$bridge$marshalling39953");
});

org.numenta.sanity.bridge.marshalling.__GT_t_org$numenta$sanity$bridge$marshalling39953 = (function org$numenta$sanity$bridge$marshalling$future_$___GT_t_org$numenta$sanity$bridge$marshalling39953(future__$1,val__$1,meta39954){
return (new org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953(future__$1,val__$1,meta39954));
});

}

return (new org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling39953(org$numenta$sanity$bridge$marshalling$future,val,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
*/
org.numenta.sanity.bridge.marshalling.ImpersonateChannel = (function (fput,fclose,ftake){
this.fput = fput;
this.fclose = fclose;
this.ftake = ftake;
})
org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,___$1){
var self__ = this;
var ___$2 = this;
return org.numenta.sanity.bridge.marshalling.future((self__.ftake.cljs$core$IFn$_invoke$arity$0 ? self__.ftake.cljs$core$IFn$_invoke$arity$0() : self__.ftake.call(null)));
});

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,v,___$1){
var self__ = this;
var ___$2 = this;
if(cljs.core.truth_(v)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$sym$v], 0)))].join('')));
}

return org.numenta.sanity.bridge.marshalling.future((self__.fput.cljs$core$IFn$_invoke$arity$1 ? self__.fput.cljs$core$IFn$_invoke$arity$1(v) : self__.fput.call(null,v)));
});

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$Channel$ = true;

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (self__.fclose.cljs$core$IFn$_invoke$arity$0 ? self__.fclose.cljs$core$IFn$_invoke$arity$0() : self__.fclose.call(null));
});

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$fput,cljs.core.cst$sym$fclose,cljs.core.cst$sym$ftake], null);
});

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.cljs$lang$ctorStr = "org.numenta.sanity.bridge.marshalling/ImpersonateChannel";

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.cljs$lang$ctorPrWriter = (function (this__5280__auto__,writer__5281__auto__,opt__5282__auto__){
return cljs.core._write(writer__5281__auto__,"org.numenta.sanity.bridge.marshalling/ImpersonateChannel");
});

org.numenta.sanity.bridge.marshalling.__GT_ImpersonateChannel = (function org$numenta$sanity$bridge$marshalling$__GT_ImpersonateChannel(fput,fclose,ftake){
return (new org.numenta.sanity.bridge.marshalling.ImpersonateChannel(fput,fclose,ftake));
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
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
org.numenta.sanity.bridge.marshalling.ChannelProxy = (function (target_id,ch,__meta,__extmap,__hash){
this.target_id = target_id;
this.ch = ch;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,handler){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,handler);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$Channel$ = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k39957,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__39959 = (((k39957 instanceof cljs.core.Keyword))?k39957.fqn:null);
switch (G__39959) {
case "target-id":
return self__.target_id;

break;
case "ch":
return self__.ch;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k39957,else__5299__auto__);

}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.numenta.sanity.bridge.marshalling.ChannelProxy{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ch,self__.ch],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__39956){
var self__ = this;
var G__39956__$1 = this;
return (new cljs.core.RecordIter((0),G__39956__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target_DASH_id,cljs.core.cst$kw$ch], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,self__.ch,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,v,handler){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,v,handler);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$target_DASH_id,null,cljs.core.cst$kw$ch,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,self__.ch,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__39956){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__39960 = cljs.core.keyword_identical_QMARK_;
var expr__39961 = k__5304__auto__;
if(cljs.core.truth_((pred__39960.cljs$core$IFn$_invoke$arity$2 ? pred__39960.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,expr__39961) : pred__39960.call(null,cljs.core.cst$kw$target_DASH_id,expr__39961)))){
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(G__39956,self__.ch,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__39960.cljs$core$IFn$_invoke$arity$2 ? pred__39960.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$ch,expr__39961) : pred__39960.call(null,cljs.core.cst$kw$ch,expr__39961)))){
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,G__39956,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,self__.ch,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__39956),null));
}
}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ch,self__.ch],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__39956){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,self__.ch,G__39956,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$target_DASH_id,cljs.core.cst$sym$ch], null);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.bridge.marshalling/ChannelProxy");
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.numenta.sanity.bridge.marshalling/ChannelProxy");
});

org.numenta.sanity.bridge.marshalling.__GT_ChannelProxy = (function org$numenta$sanity$bridge$marshalling$__GT_ChannelProxy(target_id,ch){
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(target_id,ch,null,null,null));
});

org.numenta.sanity.bridge.marshalling.map__GT_ChannelProxy = (function org$numenta$sanity$bridge$marshalling$map__GT_ChannelProxy(G__39958){
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(G__39958),cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(G__39958),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__39958,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$ch], 0)),null));
});

org.numenta.sanity.bridge.marshalling.encoding = cljs.core.cst$kw$json;
org.numenta.sanity.bridge.marshalling.write_handlers = (function org$numenta$sanity$bridge$marshalling$write_handlers(target__GT_mchannel,local_resources){
return cljs.core.PersistentArrayMap.fromArray([org.numenta.sanity.bridge.marshalling.ChannelMarshal,cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2((function (_){
return "ChannelMarshal";
}),(function (mchannel){
var target_id = cljs.core.random_uuid();
var released_QMARK_ = cljs.core.cst$kw$released_QMARK_.cljs$core$IFn$_invoke$arity$1(mchannel);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(released_QMARK_) : cljs.core.deref.call(null,released_QMARK_)))){
cljs.core.add_watch(released_QMARK_,cljs.core.random_uuid(),((function (target_id,released_QMARK_){
return (function (_,___$1,___$2,r_QMARK_){
if(cljs.core.truth_(r_QMARK_)){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(target__GT_mchannel,cljs.core.dissoc,target_id);
} else {
return null;
}
});})(target_id,released_QMARK_))
);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(target__GT_mchannel,cljs.core.assoc,target_id,mchannel);

return target_id;
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Serializing a released channel!",mchannel], 0));
}
})),org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal,cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2((function (_){
return "ChannelWeakMarshal";
}),(function (wmchannel){
return cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(wmchannel);
})),org.numenta.sanity.bridge.marshalling.BigValueMarshal,cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2((function (_){
return "BigValueMarshal";
}),(function (marshal){
var map__39993 = marshal;
var map__39993__$1 = ((((!((map__39993 == null)))?((((map__39993.cljs$lang$protocol_mask$partition0$ & (64))) || (map__39993.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__39993):map__39993);
var released_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39993__$1,cljs.core.cst$kw$released_QMARK_);
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39993__$1,cljs.core.cst$kw$resource_DASH_id);
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(released_QMARK_) : cljs.core.deref.call(null,released_QMARK_)))){
} else {
if(cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(local_resources) : cljs.core.deref.call(null,local_resources)),resource_id)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(local_resources,cljs.core.assoc,resource_id,marshal);

cljs.core.add_watch(released_QMARK_,local_resources,((function (map__39993,map__39993__$1,released_QMARK_,resource_id){
return (function (_,___$1,___$2,r_QMARK_){
if(cljs.core.truth_(r_QMARK_)){
cljs.core.remove_watch(released_QMARK_,local_resources);

var temp__4653__auto___40022 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(local_resources) : cljs.core.deref.call(null,local_resources)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [resource_id,cljs.core.cst$kw$on_DASH_released_DASH_c], null));
if(cljs.core.truth_(temp__4653__auto___40022)){
var ch_40023 = temp__4653__auto___40022;
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch_40023,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$release], null));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(local_resources,cljs.core.dissoc,resource_id);
} else {
return null;
}
});})(map__39993,map__39993__$1,released_QMARK_,resource_id))
);
}
}

if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(local_resources) : cljs.core.deref.call(null,local_resources)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [resource_id,cljs.core.cst$kw$pushed_QMARK_], null)))){
return new cljs.core.PersistentArrayMap(null, 1, ["resource-id",resource_id], null);
} else {
var saved_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var c__35961__auto___40024 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___40024,saved_c,map__39993,map__39993__$1,released_QMARK_,resource_id){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___40024,saved_c,map__39993,map__39993__$1,released_QMARK_,resource_id){
return (function (state_40007){
var state_val_40008 = (state_40007[(1)]);
if((state_val_40008 === (1))){
var state_40007__$1 = state_40007;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40007__$1,(2),saved_c);
} else {
if((state_val_40008 === (2))){
var inst_39996 = (state_40007[(7)]);
var inst_39996__$1 = (state_40007[(2)]);
var state_40007__$1 = (function (){var statearr_40009 = state_40007;
(statearr_40009[(7)] = inst_39996__$1);

return statearr_40009;
})();
if(cljs.core.truth_(inst_39996__$1)){
var statearr_40010_40025 = state_40007__$1;
(statearr_40010_40025[(1)] = (3));

} else {
var statearr_40011_40026 = state_40007__$1;
(statearr_40011_40026[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40008 === (3))){
var inst_39996 = (state_40007[(7)]);
var inst_39999 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_39996,(0),null);
var inst_40000 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_39996,(1),null);
var inst_40001 = (function (){var temp__4653__auto__ = inst_39996;
var vec__39998 = inst_39996;
var _ = inst_39999;
var on_released_c_marshal = inst_40000;
return ((function (temp__4653__auto__,vec__39998,_,on_released_c_marshal,inst_39996,inst_39999,inst_40000,state_val_40008,c__35961__auto___40024,saved_c,map__39993,map__39993__$1,released_QMARK_,resource_id){
return (function (marshal__$1){
var G__40012 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(marshal__$1,cljs.core.cst$kw$pushed_QMARK_,true);
if(cljs.core.truth_(on_released_c_marshal)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40012,cljs.core.cst$kw$on_DASH_released_DASH_c,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(on_released_c_marshal));
} else {
return G__40012;
}
});
;})(temp__4653__auto__,vec__39998,_,on_released_c_marshal,inst_39996,inst_39999,inst_40000,state_val_40008,c__35961__auto___40024,saved_c,map__39993,map__39993__$1,released_QMARK_,resource_id))
})();
var inst_40002 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(local_resources,cljs.core.update,resource_id,inst_40001);
var state_40007__$1 = state_40007;
var statearr_40013_40027 = state_40007__$1;
(statearr_40013_40027[(2)] = inst_40002);

(statearr_40013_40027[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40008 === (4))){
var state_40007__$1 = state_40007;
var statearr_40014_40028 = state_40007__$1;
(statearr_40014_40028[(2)] = null);

(statearr_40014_40028[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40008 === (5))){
var inst_40005 = (state_40007[(2)]);
var state_40007__$1 = state_40007;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40007__$1,inst_40005);
} else {
return null;
}
}
}
}
}
});})(c__35961__auto___40024,saved_c,map__39993,map__39993__$1,released_QMARK_,resource_id))
;
return ((function (switch__35847__auto__,c__35961__auto___40024,saved_c,map__39993,map__39993__$1,released_QMARK_,resource_id){
return (function() {
var org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto____0 = (function (){
var statearr_40018 = [null,null,null,null,null,null,null,null];
(statearr_40018[(0)] = org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto__);

(statearr_40018[(1)] = (1));

return statearr_40018;
});
var org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto____1 = (function (state_40007){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_40007);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e40019){if((e40019 instanceof Object)){
var ex__35851__auto__ = e40019;
var statearr_40020_40029 = state_40007;
(statearr_40020_40029[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_40007);

return cljs.core.cst$kw$recur;
} else {
throw e40019;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__40030 = state_40007;
state_40007 = G__40030;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto__ = function(state_40007){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto____1.call(this,state_40007);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___40024,saved_c,map__39993,map__39993__$1,released_QMARK_,resource_id))
})();
var state__35963__auto__ = (function (){var statearr_40021 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_40021[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___40024);

return statearr_40021;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___40024,saved_c,map__39993,map__39993__$1,released_QMARK_,resource_id))
);


return new cljs.core.PersistentArrayMap(null, 3, ["resource-id",resource_id,"value",cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(marshal),"on-saved-c-marshal",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(saved_c,true)], null);
}
}))], true, false);
});
org.numenta.sanity.bridge.marshalling.read_handlers = (function org$numenta$sanity$bridge$marshalling$read_handlers(target__GT_mchannel,fput,fclose,remote_resources){
return new cljs.core.PersistentArrayMap(null, 3, ["ChannelMarshal",cognitect.transit.read_handler((function (target_id){
return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1((new org.numenta.sanity.bridge.marshalling.ChannelProxy(target_id,(new org.numenta.sanity.bridge.marshalling.ImpersonateChannel((function (v){
return (fput.cljs$core$IFn$_invoke$arity$2 ? fput.cljs$core$IFn$_invoke$arity$2(target_id,v) : fput.call(null,target_id,v));
}),(function (){
return (fclose.cljs$core$IFn$_invoke$arity$1 ? fclose.cljs$core$IFn$_invoke$arity$1(target_id) : fclose.call(null,target_id));
}),null)),null,null,null)));
})),"ChannelWeakMarshal",cognitect.transit.read_handler((function (target_id){
var temp__4651__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(target__GT_mchannel) : cljs.core.deref.call(null,target__GT_mchannel)),target_id);
if(cljs.core.truth_(temp__4651__auto__)){
var mchannel = temp__4651__auto__;
return mchannel;
} else {
return org.numenta.sanity.bridge.marshalling.channel_weak(target_id);
}
})),"BigValueMarshal",cognitect.transit.read_handler((function (m){
var map__40055 = m;
var map__40055__$1 = ((((!((map__40055 == null)))?((((map__40055.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40055.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40055):map__40055);
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40055__$1,"resource-id");
var on_saved_c_marshal = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40055__$1,"on-saved-c-marshal");
var new_QMARK_ = !(cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(remote_resources) : cljs.core.deref.call(null,remote_resources)),resource_id));
if(new_QMARK_){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(remote_resources,cljs.core.assoc,resource_id,(new org.numenta.sanity.bridge.marshalling.BigValueMarshal(resource_id,cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"value"),null,null,null,null,null)));
} else {
}

if(cljs.core.truth_(on_saved_c_marshal)){
var on_released_c_marshal_40079 = ((new_QMARK_)?(function (){var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var c__35961__auto___40080 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___40080,ch,map__40055,map__40055__$1,resource_id,on_saved_c_marshal,new_QMARK_){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___40080,ch,map__40055,map__40055__$1,resource_id,on_saved_c_marshal,new_QMARK_){
return (function (state_40066){
var state_val_40067 = (state_40066[(1)]);
if((state_val_40067 === (1))){
var state_40066__$1 = state_40066;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40066__$1,(2),ch);
} else {
if((state_val_40067 === (2))){
var inst_40058 = (state_40066[(2)]);
var inst_40059 = (inst_40058 == null);
var state_40066__$1 = state_40066;
if(cljs.core.truth_(inst_40059)){
var statearr_40068_40081 = state_40066__$1;
(statearr_40068_40081[(1)] = (3));

} else {
var statearr_40069_40082 = state_40066__$1;
(statearr_40069_40082[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_40067 === (3))){
var state_40066__$1 = state_40066;
var statearr_40070_40083 = state_40066__$1;
(statearr_40070_40083[(2)] = null);

(statearr_40070_40083[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40067 === (4))){
var inst_40062 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(remote_resources,cljs.core.dissoc,resource_id);
var state_40066__$1 = state_40066;
var statearr_40071_40084 = state_40066__$1;
(statearr_40071_40084[(2)] = inst_40062);

(statearr_40071_40084[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_40067 === (5))){
var inst_40064 = (state_40066[(2)]);
var state_40066__$1 = state_40066;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40066__$1,inst_40064);
} else {
return null;
}
}
}
}
}
});})(c__35961__auto___40080,ch,map__40055,map__40055__$1,resource_id,on_saved_c_marshal,new_QMARK_))
;
return ((function (switch__35847__auto__,c__35961__auto___40080,ch,map__40055,map__40055__$1,resource_id,on_saved_c_marshal,new_QMARK_){
return (function() {
var org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto____0 = (function (){
var statearr_40075 = [null,null,null,null,null,null,null];
(statearr_40075[(0)] = org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto__);

(statearr_40075[(1)] = (1));

return statearr_40075;
});
var org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto____1 = (function (state_40066){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_40066);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e40076){if((e40076 instanceof Object)){
var ex__35851__auto__ = e40076;
var statearr_40077_40085 = state_40066;
(statearr_40077_40085[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_40066);

return cljs.core.cst$kw$recur;
} else {
throw e40076;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__40086 = state_40066;
state_40066 = G__40086;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto__ = function(state_40066){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto____1.call(this,state_40066);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto____0;
org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto____1;
return org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___40080,ch,map__40055,map__40055__$1,resource_id,on_saved_c_marshal,new_QMARK_))
})();
var state__35963__auto__ = (function (){var statearr_40078 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_40078[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___40080);

return statearr_40078;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___40080,ch,map__40055,map__40055__$1,resource_id,on_saved_c_marshal,new_QMARK_))
);


return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(ch);
})():null);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(on_saved_c_marshal),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$saved,on_released_c_marshal_40079], null));
} else {
}

return cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(remote_resources) : cljs.core.deref.call(null,remote_resources)),resource_id);
}))], null);
});
