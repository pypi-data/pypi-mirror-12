// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('tailrecursion.priority_map');
goog.require('cljs.core');
goog.require('cljs.core');
goog.require('cljs.reader');

/**
* @constructor
 * @implements {cljs.core.IReversible}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.IEmptyableCollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISorted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IStack}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
tailrecursion.priority_map.PersistentPriorityMap = (function (priority__GT_set_of_items,item__GT_priority,meta,keyfn,__hash){
this.priority__GT_set_of_items = priority__GT_set_of_items;
this.item__GT_priority = item__GT_priority;
this.meta = meta;
this.keyfn = keyfn;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2565220111;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this$,item){
var self__ = this;
var this$__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,item,not_found){
var self__ = this;
var coll__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,not_found);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var coll__$1 = this;
var pr_pair = ((function (coll__$1){
return (function (keyval){
return cljs.core.pr_sequential_writer(writer,cljs.core.pr_writer,""," ","",opts,keyval);
});})(coll__$1))
;
return cljs.core.pr_sequential_writer(writer,pr_pair,"#tailrecursion.priority-map {",", ","}",opts,coll__$1);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.meta;
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.count(self__.item__GT_priority);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IStack$_peek$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if((cljs.core.count(self__.item__GT_priority) === (0))){
return null;
} else {
var f = cljs.core.first(self__.priority__GT_set_of_items);
var item = cljs.core.first(cljs.core.val(f));
if(cljs.core.truth_(self__.keyfn)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,cljs.core.key(f)], null);
}
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IStack$_pop$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if((cljs.core.count(self__.item__GT_priority) === (0))){
throw (new Error("Can't pop empty priority map"));
} else {
var f = cljs.core.first(self__.priority__GT_set_of_items);
var item_set = cljs.core.val(f);
var item = cljs.core.first(item_set);
var priority_key = cljs.core.key(f);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(item_set),(1))){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,priority_key),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,self__.keyfn,null));
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(item_set,item)),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,self__.keyfn,null));
}
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
if(cljs.core.truth_(self__.keyfn)){
return cljs.core.seq((function (){var iter__5454__auto__ = ((function (coll__$1){
return (function tailrecursion$priority_map$iter__41080(s__41081){
return (new cljs.core.LazySeq(null,((function (coll__$1){
return (function (){
var s__41081__$1 = s__41081;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__41081__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__41090 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41090,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41090,(1),null);
var iterys__5450__auto__ = ((function (s__41081__$1,vec__41090,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1){
return (function tailrecursion$priority_map$iter__41080_$_iter__41082(s__41083){
return (new cljs.core.LazySeq(null,((function (s__41081__$1,vec__41090,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1){
return (function (){
var s__41083__$1 = s__41083;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__41083__$1);
if(temp__4653__auto____$1){
var s__41083__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__41083__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__41083__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__41085 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__41084 = (0);
while(true){
if((i__41084 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__41084);
cljs.core.chunk_append(b__41085,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null));

var G__41159 = (i__41084 + (1));
i__41084 = G__41159;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__41085),tailrecursion$priority_map$iter__41080_$_iter__41082(cljs.core.chunk_rest(s__41083__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__41085),null);
}
} else {
var item = cljs.core.first(s__41083__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null),tailrecursion$priority_map$iter__41080_$_iter__41082(cljs.core.rest(s__41083__$2)));
}
} else {
return null;
}
break;
}
});})(s__41081__$1,vec__41090,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1))
,null,null));
});})(s__41081__$1,vec__41090,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__41080(cljs.core.rest(s__41081__$1)));
} else {
var G__41160 = cljs.core.rest(s__41081__$1);
s__41081__$1 = G__41160;
continue;
}
} else {
return null;
}
break;
}
});})(coll__$1))
,null,null));
});})(coll__$1))
;
return iter__5454__auto__(cljs.core.rseq(self__.priority__GT_set_of_items));
})());
} else {
return cljs.core.seq((function (){var iter__5454__auto__ = ((function (coll__$1){
return (function tailrecursion$priority_map$iter__41093(s__41094){
return (new cljs.core.LazySeq(null,((function (coll__$1){
return (function (){
var s__41094__$1 = s__41094;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__41094__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__41103 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41103,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41103,(1),null);
var iterys__5450__auto__ = ((function (s__41094__$1,vec__41103,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1){
return (function tailrecursion$priority_map$iter__41093_$_iter__41095(s__41096){
return (new cljs.core.LazySeq(null,((function (s__41094__$1,vec__41103,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1){
return (function (){
var s__41096__$1 = s__41096;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__41096__$1);
if(temp__4653__auto____$1){
var s__41096__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__41096__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__41096__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__41098 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__41097 = (0);
while(true){
if((i__41097 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__41097);
cljs.core.chunk_append(b__41098,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__41161 = (i__41097 + (1));
i__41097 = G__41161;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__41098),tailrecursion$priority_map$iter__41093_$_iter__41095(cljs.core.chunk_rest(s__41096__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__41098),null);
}
} else {
var item = cljs.core.first(s__41096__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__41093_$_iter__41095(cljs.core.rest(s__41096__$2)));
}
} else {
return null;
}
break;
}
});})(s__41094__$1,vec__41103,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1))
,null,null));
});})(s__41094__$1,vec__41103,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__41093(cljs.core.rest(s__41094__$1)));
} else {
var G__41162 = cljs.core.rest(s__41094__$1);
s__41094__$1 = G__41162;
continue;
}
} else {
return null;
}
break;
}
});})(coll__$1))
,null,null));
});})(coll__$1))
;
return iter__5454__auto__(cljs.core.rseq(self__.priority__GT_set_of_items));
})());
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var h__5117__auto__ = self__.__hash;
if(!((h__5117__auto__ == null))){
return h__5117__auto__;
} else {
var h__5117__auto____$1 = cljs.core.hash_imap(this$__$1);
self__.__hash = h__5117__auto____$1;

return h__5117__auto____$1;
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
return cljs.core._equiv(self__.item__GT_priority,other);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.with_meta(tailrecursion.priority_map.PersistentPriorityMap.EMPTY,self__.meta);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this$,item){
var self__ = this;
var this$__$1 = this;
var priority = (self__.item__GT_priority.cljs$core$IFn$_invoke$arity$2 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$2(item,cljs.core.cst$kw$tailrecursion$priority_DASH_map_SLASH_not_DASH_found) : self__.item__GT_priority.call(null,item,cljs.core.cst$kw$tailrecursion$priority_DASH_map_SLASH_not_DASH_found));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(priority,cljs.core.cst$kw$tailrecursion$priority_DASH_map_SLASH_not_DASH_found)){
return this$__$1;
} else {
var priority_key = (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(priority) : self__.keyfn.call(null,priority));
var item_set = (self__.priority__GT_set_of_items.cljs$core$IFn$_invoke$arity$1 ? self__.priority__GT_set_of_items.cljs$core$IFn$_invoke$arity$1(priority_key) : self__.priority__GT_set_of_items.call(null,priority_key));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(item_set),(1))){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,priority_key),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,self__.keyfn,null));
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(item_set,item)),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,self__.keyfn,null));
}
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this$,item,priority){
var self__ = this;
var this$__$1 = this;
var temp__4651__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,null);
if(cljs.core.truth_(temp__4651__auto__)){
var current_priority = temp__4651__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_priority,priority)){
return this$__$1;
} else {
var priority_key = (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(priority) : self__.keyfn.call(null,priority));
var current_priority_key = (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(current_priority) : self__.keyfn.call(null,current_priority));
var item_set = cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,current_priority_key);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(item_set),(1))){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,current_priority_key),priority_key,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.PersistentHashSet.EMPTY),item)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,priority),self__.meta,self__.keyfn,null));
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(self__.priority__GT_set_of_items,current_priority,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,current_priority_key),item),cljs.core.array_seq([priority,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.PersistentHashSet.EMPTY),item)], 0)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,priority),self__.meta,self__.keyfn,null));
}
}
} else {
var priority_key = (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(priority) : self__.keyfn.call(null,priority));
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.PersistentHashSet.EMPTY),item)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,priority),self__.meta,self__.keyfn,null));
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this$,item){
var self__ = this;
var this$__$1 = this;
return cljs.core.contains_QMARK_(self__.item__GT_priority,item);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(self__.keyfn)){
return cljs.core.seq((function (){var iter__5454__auto__ = ((function (this$__$1){
return (function tailrecursion$priority_map$iter__41106(s__41107){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__41107__$1 = s__41107;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__41107__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__41116 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41116,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41116,(1),null);
var iterys__5450__auto__ = ((function (s__41107__$1,vec__41116,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function tailrecursion$priority_map$iter__41106_$_iter__41108(s__41109){
return (new cljs.core.LazySeq(null,((function (s__41107__$1,vec__41116,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function (){
var s__41109__$1 = s__41109;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__41109__$1);
if(temp__4653__auto____$1){
var s__41109__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__41109__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__41109__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__41111 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__41110 = (0);
while(true){
if((i__41110 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__41110);
cljs.core.chunk_append(b__41111,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null));

var G__41163 = (i__41110 + (1));
i__41110 = G__41163;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__41111),tailrecursion$priority_map$iter__41106_$_iter__41108(cljs.core.chunk_rest(s__41109__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__41111),null);
}
} else {
var item = cljs.core.first(s__41109__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null),tailrecursion$priority_map$iter__41106_$_iter__41108(cljs.core.rest(s__41109__$2)));
}
} else {
return null;
}
break;
}
});})(s__41107__$1,vec__41116,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1))
,null,null));
});})(s__41107__$1,vec__41116,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__41106(cljs.core.rest(s__41107__$1)));
} else {
var G__41164 = cljs.core.rest(s__41107__$1);
s__41107__$1 = G__41164;
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
return iter__5454__auto__(self__.priority__GT_set_of_items);
})());
} else {
return cljs.core.seq((function (){var iter__5454__auto__ = ((function (this$__$1){
return (function tailrecursion$priority_map$iter__41119(s__41120){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__41120__$1 = s__41120;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__41120__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__41129 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41129,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41129,(1),null);
var iterys__5450__auto__ = ((function (s__41120__$1,vec__41129,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function tailrecursion$priority_map$iter__41119_$_iter__41121(s__41122){
return (new cljs.core.LazySeq(null,((function (s__41120__$1,vec__41129,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function (){
var s__41122__$1 = s__41122;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__41122__$1);
if(temp__4653__auto____$1){
var s__41122__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__41122__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__41122__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__41124 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__41123 = (0);
while(true){
if((i__41123 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__41123);
cljs.core.chunk_append(b__41124,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__41165 = (i__41123 + (1));
i__41123 = G__41165;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__41124),tailrecursion$priority_map$iter__41119_$_iter__41121(cljs.core.chunk_rest(s__41122__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__41124),null);
}
} else {
var item = cljs.core.first(s__41122__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__41119_$_iter__41121(cljs.core.rest(s__41122__$2)));
}
} else {
return null;
}
break;
}
});})(s__41120__$1,vec__41129,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1))
,null,null));
});})(s__41120__$1,vec__41129,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__41119(cljs.core.rest(s__41120__$1)));
} else {
var G__41166 = cljs.core.rest(s__41120__$1);
s__41120__$1 = G__41166;
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
return iter__5454__auto__(self__.priority__GT_set_of_items);
})());
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this$,meta__$1){
var self__ = this;
var this$__$1 = this;
return (new tailrecursion.priority_map.PersistentPriorityMap(self__.priority__GT_set_of_items,self__.item__GT_priority,meta__$1,self__.keyfn,self__.__hash));
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this$,entry){
var self__ = this;
var this$__$1 = this;
if(cljs.core.vector_QMARK_(entry)){
return cljs.core._assoc(this$__$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this$__$1,entry);
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.call = (function() {
var G__41167 = null;
var G__41167__2 = (function (self__,item){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
return this$.cljs$core$ILookup$_lookup$arity$2(null,item);
});
var G__41167__3 = (function (self__,item,not_found){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
return this$.cljs$core$ILookup$_lookup$arity$3(null,item,not_found);
});
G__41167 = function(self__,item,not_found){
switch(arguments.length){
case 2:
return G__41167__2.call(this,self__,item);
case 3:
return G__41167__3.call(this,self__,item,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__41167.cljs$core$IFn$_invoke$arity$2 = G__41167__2;
G__41167.cljs$core$IFn$_invoke$arity$3 = G__41167__3;
return G__41167;
})()
;

tailrecursion.priority_map.PersistentPriorityMap.prototype.apply = (function (self__,args41079){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args41079)));
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IFn$_invoke$arity$1 = (function (item){
var self__ = this;
var this$ = this;
return this$.cljs$core$ILookup$_lookup$arity$2(null,item);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IFn$_invoke$arity$2 = (function (item,not_found){
var self__ = this;
var this$ = this;
return this$.cljs$core$ILookup$_lookup$arity$3(null,item,not_found);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (this$,ascending_QMARK_){
var self__ = this;
var this$__$1 = this;
return (cljs.core.truth_(ascending_QMARK_)?cljs.core.seq:cljs.core.rseq).call(null,this$__$1);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (this$,k,ascending_QMARK_){
var self__ = this;
var this$__$1 = this;
var sets = (cljs.core.truth_(ascending_QMARK_)?cljs.core.subseq.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,cljs.core._GT__EQ_,k):cljs.core.rsubseq.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,cljs.core._LT__EQ_,k));
if(cljs.core.truth_(self__.keyfn)){
return cljs.core.seq((function (){var iter__5454__auto__ = ((function (sets,this$__$1){
return (function tailrecursion$priority_map$iter__41132(s__41133){
return (new cljs.core.LazySeq(null,((function (sets,this$__$1){
return (function (){
var s__41133__$1 = s__41133;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__41133__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__41142 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41142,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41142,(1),null);
var iterys__5450__auto__ = ((function (s__41133__$1,vec__41142,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1){
return (function tailrecursion$priority_map$iter__41132_$_iter__41134(s__41135){
return (new cljs.core.LazySeq(null,((function (s__41133__$1,vec__41142,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1){
return (function (){
var s__41135__$1 = s__41135;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__41135__$1);
if(temp__4653__auto____$1){
var s__41135__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__41135__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__41135__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__41137 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__41136 = (0);
while(true){
if((i__41136 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__41136);
cljs.core.chunk_append(b__41137,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null));

var G__41168 = (i__41136 + (1));
i__41136 = G__41168;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__41137),tailrecursion$priority_map$iter__41132_$_iter__41134(cljs.core.chunk_rest(s__41135__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__41137),null);
}
} else {
var item = cljs.core.first(s__41135__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null),tailrecursion$priority_map$iter__41132_$_iter__41134(cljs.core.rest(s__41135__$2)));
}
} else {
return null;
}
break;
}
});})(s__41133__$1,vec__41142,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1))
,null,null));
});})(s__41133__$1,vec__41142,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__41132(cljs.core.rest(s__41133__$1)));
} else {
var G__41169 = cljs.core.rest(s__41133__$1);
s__41133__$1 = G__41169;
continue;
}
} else {
return null;
}
break;
}
});})(sets,this$__$1))
,null,null));
});})(sets,this$__$1))
;
return iter__5454__auto__(sets);
})());
} else {
return cljs.core.seq((function (){var iter__5454__auto__ = ((function (sets,this$__$1){
return (function tailrecursion$priority_map$iter__41145(s__41146){
return (new cljs.core.LazySeq(null,((function (sets,this$__$1){
return (function (){
var s__41146__$1 = s__41146;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__41146__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__41155 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41155,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41155,(1),null);
var iterys__5450__auto__ = ((function (s__41146__$1,vec__41155,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1){
return (function tailrecursion$priority_map$iter__41145_$_iter__41147(s__41148){
return (new cljs.core.LazySeq(null,((function (s__41146__$1,vec__41155,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1){
return (function (){
var s__41148__$1 = s__41148;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__41148__$1);
if(temp__4653__auto____$1){
var s__41148__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__41148__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__41148__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__41150 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__41149 = (0);
while(true){
if((i__41149 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__41149);
cljs.core.chunk_append(b__41150,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__41170 = (i__41149 + (1));
i__41149 = G__41170;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__41150),tailrecursion$priority_map$iter__41145_$_iter__41147(cljs.core.chunk_rest(s__41148__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__41150),null);
}
} else {
var item = cljs.core.first(s__41148__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__41145_$_iter__41147(cljs.core.rest(s__41148__$2)));
}
} else {
return null;
}
break;
}
});})(s__41146__$1,vec__41155,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1))
,null,null));
});})(s__41146__$1,vec__41155,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__41145(cljs.core.rest(s__41146__$1)));
} else {
var G__41171 = cljs.core.rest(s__41146__$1);
s__41146__$1 = G__41171;
continue;
}
} else {
return null;
}
break;
}
});})(sets,this$__$1))
,null,null));
});})(sets,this$__$1))
;
return iter__5454__auto__(sets);
})());
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (this$,entry){
var self__ = this;
var this$__$1 = this;
var G__41158 = cljs.core.val(entry);
return (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(G__41158) : self__.keyfn.call(null,G__41158));
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.compare;
});

tailrecursion.priority_map.PersistentPriorityMap.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$priority_DASH__GT_set_DASH_of_DASH_items,cljs.core.cst$sym$item_DASH__GT_priority,cljs.core.cst$sym$meta,cljs.core.cst$sym$keyfn,cljs.core.with_meta(cljs.core.cst$sym$__hash,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

tailrecursion.priority_map.PersistentPriorityMap.cljs$lang$type = true;

tailrecursion.priority_map.PersistentPriorityMap.cljs$lang$ctorStr = "tailrecursion.priority-map/PersistentPriorityMap";

tailrecursion.priority_map.PersistentPriorityMap.cljs$lang$ctorPrWriter = (function (this__5280__auto__,writer__5281__auto__,opt__5282__auto__){
return cljs.core._write(writer__5281__auto__,"tailrecursion.priority-map/PersistentPriorityMap");
});

tailrecursion.priority_map.__GT_PersistentPriorityMap = (function tailrecursion$priority_map$__GT_PersistentPriorityMap(priority__GT_set_of_items,item__GT_priority,meta,keyfn,__hash){
return (new tailrecursion.priority_map.PersistentPriorityMap(priority__GT_set_of_items,item__GT_priority,meta,keyfn,__hash));
});

tailrecursion.priority_map.PersistentPriorityMap.EMPTY = (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map(),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,cljs.core.identity,null));
tailrecursion.priority_map.pm_empty_by = (function tailrecursion$priority_map$pm_empty_by(comparator){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map_by(comparator),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,cljs.core.identity,null));
});
tailrecursion.priority_map.pm_empty_keyfn = (function tailrecursion$priority_map$pm_empty_keyfn(var_args){
var args41172 = [];
var len__5740__auto___41175 = arguments.length;
var i__5741__auto___41176 = (0);
while(true){
if((i__5741__auto___41176 < len__5740__auto___41175)){
args41172.push((arguments[i__5741__auto___41176]));

var G__41177 = (i__5741__auto___41176 + (1));
i__5741__auto___41176 = G__41177;
continue;
} else {
}
break;
}

var G__41174 = args41172.length;
switch (G__41174) {
case 1:
return tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41172.length)].join('')));

}
});

tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$1 = (function (keyfn){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map(),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,keyfn,null));
});

tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$2 = (function (keyfn,comparator){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map_by(comparator),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,keyfn,null));
});

tailrecursion.priority_map.pm_empty_keyfn.cljs$lang$maxFixedArity = 2;
tailrecursion.priority_map.read_priority_map = (function tailrecursion$priority_map$read_priority_map(elems){
if(cljs.core.map_QMARK_(elems)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(tailrecursion.priority_map.PersistentPriorityMap.EMPTY,elems);
} else {
return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null,cljs.core.array_seq(["Priority map literal expects a map for its elements."], 0));
}
});
cljs.reader.register_tag_parser_BANG_("tailrecursion.priority-map",tailrecursion.priority_map.read_priority_map);
/**
 * keyval => key val
 *   Returns a new priority map with supplied mappings.
 */
tailrecursion.priority_map.priority_map = (function tailrecursion$priority_map$priority_map(var_args){
var args__5747__auto__ = [];
var len__5740__auto___41180 = arguments.length;
var i__5741__auto___41181 = (0);
while(true){
if((i__5741__auto___41181 < len__5740__auto___41180)){
args__5747__auto__.push((arguments[i__5741__auto___41181]));

var G__41182 = (i__5741__auto___41181 + (1));
i__5741__auto___41181 = G__41182;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((0) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((0)),(0))):null);
return tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic(argseq__5748__auto__);
});

tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic = (function (keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.PersistentPriorityMap.EMPTY;
while(true){
if(in$){
var G__41183 = cljs.core.nnext(in$);
var G__41184 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__41183;
out = G__41184;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map.cljs$lang$maxFixedArity = (0);

tailrecursion.priority_map.priority_map.cljs$lang$applyTo = (function (seq41179){
return tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq41179));
});
/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied comparator.
 */
tailrecursion.priority_map.priority_map_by = (function tailrecursion$priority_map$priority_map_by(var_args){
var args__5747__auto__ = [];
var len__5740__auto___41187 = arguments.length;
var i__5741__auto___41188 = (0);
while(true){
if((i__5741__auto___41188 < len__5740__auto___41187)){
args__5747__auto__.push((arguments[i__5741__auto___41188]));

var G__41189 = (i__5741__auto___41188 + (1));
i__5741__auto___41188 = G__41189;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic = (function (comparator,keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.pm_empty_by(comparator);
while(true){
if(in$){
var G__41190 = cljs.core.nnext(in$);
var G__41191 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__41190;
out = G__41191;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_by.cljs$lang$maxFixedArity = (1);

tailrecursion.priority_map.priority_map_by.cljs$lang$applyTo = (function (seq41185){
var G__41186 = cljs.core.first(seq41185);
var seq41185__$1 = cljs.core.next(seq41185);
return tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic(G__41186,seq41185__$1);
});
/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied keyfn.
 */
tailrecursion.priority_map.priority_map_keyfn = (function tailrecursion$priority_map$priority_map_keyfn(var_args){
var args__5747__auto__ = [];
var len__5740__auto___41194 = arguments.length;
var i__5741__auto___41195 = (0);
while(true){
if((i__5741__auto___41195 < len__5740__auto___41194)){
args__5747__auto__.push((arguments[i__5741__auto___41195]));

var G__41196 = (i__5741__auto___41195 + (1));
i__5741__auto___41195 = G__41196;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return tailrecursion.priority_map.priority_map_keyfn.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

tailrecursion.priority_map.priority_map_keyfn.cljs$core$IFn$_invoke$arity$variadic = (function (keyfn,keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$1(keyfn);
while(true){
if(in$){
var G__41197 = cljs.core.nnext(in$);
var G__41198 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__41197;
out = G__41198;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_keyfn.cljs$lang$maxFixedArity = (1);

tailrecursion.priority_map.priority_map_keyfn.cljs$lang$applyTo = (function (seq41192){
var G__41193 = cljs.core.first(seq41192);
var seq41192__$1 = cljs.core.next(seq41192);
return tailrecursion.priority_map.priority_map_keyfn.cljs$core$IFn$_invoke$arity$variadic(G__41193,seq41192__$1);
});
/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied keyfn and comparator.
 */
tailrecursion.priority_map.priority_map_keyfn_by = (function tailrecursion$priority_map$priority_map_keyfn_by(var_args){
var args__5747__auto__ = [];
var len__5740__auto___41202 = arguments.length;
var i__5741__auto___41203 = (0);
while(true){
if((i__5741__auto___41203 < len__5740__auto___41202)){
args__5747__auto__.push((arguments[i__5741__auto___41203]));

var G__41204 = (i__5741__auto___41203 + (1));
i__5741__auto___41203 = G__41204;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((2) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((2)),(0))):null);
return tailrecursion.priority_map.priority_map_keyfn_by.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5748__auto__);
});

tailrecursion.priority_map.priority_map_keyfn_by.cljs$core$IFn$_invoke$arity$variadic = (function (keyfn,comparator,keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$2(keyfn,comparator);
while(true){
if(in$){
var G__41205 = cljs.core.nnext(in$);
var G__41206 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__41205;
out = G__41206;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_keyfn_by.cljs$lang$maxFixedArity = (2);

tailrecursion.priority_map.priority_map_keyfn_by.cljs$lang$applyTo = (function (seq41199){
var G__41200 = cljs.core.first(seq41199);
var seq41199__$1 = cljs.core.next(seq41199);
var G__41201 = cljs.core.first(seq41199__$1);
var seq41199__$2 = cljs.core.next(seq41199__$1);
return tailrecursion.priority_map.priority_map_keyfn_by.cljs$core$IFn$_invoke$arity$variadic(G__41200,G__41201,seq41199__$2);
});
