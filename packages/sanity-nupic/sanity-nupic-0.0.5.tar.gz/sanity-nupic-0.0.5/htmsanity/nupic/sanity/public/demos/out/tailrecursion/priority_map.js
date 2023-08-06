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
return (function tailrecursion$priority_map$iter__40645(s__40646){
return (new cljs.core.LazySeq(null,((function (coll__$1){
return (function (){
var s__40646__$1 = s__40646;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40646__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__40655 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40655,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40655,(1),null);
var iterys__5450__auto__ = ((function (s__40646__$1,vec__40655,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1){
return (function tailrecursion$priority_map$iter__40645_$_iter__40647(s__40648){
return (new cljs.core.LazySeq(null,((function (s__40646__$1,vec__40655,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1){
return (function (){
var s__40648__$1 = s__40648;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__40648__$1);
if(temp__4653__auto____$1){
var s__40648__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__40648__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40648__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40650 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40649 = (0);
while(true){
if((i__40649 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40649);
cljs.core.chunk_append(b__40650,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null));

var G__40724 = (i__40649 + (1));
i__40649 = G__40724;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40650),tailrecursion$priority_map$iter__40645_$_iter__40647(cljs.core.chunk_rest(s__40648__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40650),null);
}
} else {
var item = cljs.core.first(s__40648__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null),tailrecursion$priority_map$iter__40645_$_iter__40647(cljs.core.rest(s__40648__$2)));
}
} else {
return null;
}
break;
}
});})(s__40646__$1,vec__40655,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1))
,null,null));
});})(s__40646__$1,vec__40655,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__40645(cljs.core.rest(s__40646__$1)));
} else {
var G__40725 = cljs.core.rest(s__40646__$1);
s__40646__$1 = G__40725;
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
return (function tailrecursion$priority_map$iter__40658(s__40659){
return (new cljs.core.LazySeq(null,((function (coll__$1){
return (function (){
var s__40659__$1 = s__40659;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40659__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__40668 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40668,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40668,(1),null);
var iterys__5450__auto__ = ((function (s__40659__$1,vec__40668,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1){
return (function tailrecursion$priority_map$iter__40658_$_iter__40660(s__40661){
return (new cljs.core.LazySeq(null,((function (s__40659__$1,vec__40668,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1){
return (function (){
var s__40661__$1 = s__40661;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__40661__$1);
if(temp__4653__auto____$1){
var s__40661__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__40661__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40661__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40663 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40662 = (0);
while(true){
if((i__40662 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40662);
cljs.core.chunk_append(b__40663,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__40726 = (i__40662 + (1));
i__40662 = G__40726;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40663),tailrecursion$priority_map$iter__40658_$_iter__40660(cljs.core.chunk_rest(s__40661__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40663),null);
}
} else {
var item = cljs.core.first(s__40661__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__40658_$_iter__40660(cljs.core.rest(s__40661__$2)));
}
} else {
return null;
}
break;
}
});})(s__40659__$1,vec__40668,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1))
,null,null));
});})(s__40659__$1,vec__40668,priority,item_set,xs__5201__auto__,temp__4653__auto__,coll__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__40658(cljs.core.rest(s__40659__$1)));
} else {
var G__40727 = cljs.core.rest(s__40659__$1);
s__40659__$1 = G__40727;
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
return (function tailrecursion$priority_map$iter__40671(s__40672){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__40672__$1 = s__40672;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40672__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__40681 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40681,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40681,(1),null);
var iterys__5450__auto__ = ((function (s__40672__$1,vec__40681,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function tailrecursion$priority_map$iter__40671_$_iter__40673(s__40674){
return (new cljs.core.LazySeq(null,((function (s__40672__$1,vec__40681,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function (){
var s__40674__$1 = s__40674;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__40674__$1);
if(temp__4653__auto____$1){
var s__40674__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__40674__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40674__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40676 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40675 = (0);
while(true){
if((i__40675 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40675);
cljs.core.chunk_append(b__40676,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null));

var G__40728 = (i__40675 + (1));
i__40675 = G__40728;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40676),tailrecursion$priority_map$iter__40671_$_iter__40673(cljs.core.chunk_rest(s__40674__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40676),null);
}
} else {
var item = cljs.core.first(s__40674__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null),tailrecursion$priority_map$iter__40671_$_iter__40673(cljs.core.rest(s__40674__$2)));
}
} else {
return null;
}
break;
}
});})(s__40672__$1,vec__40681,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1))
,null,null));
});})(s__40672__$1,vec__40681,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__40671(cljs.core.rest(s__40672__$1)));
} else {
var G__40729 = cljs.core.rest(s__40672__$1);
s__40672__$1 = G__40729;
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
return (function tailrecursion$priority_map$iter__40684(s__40685){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__40685__$1 = s__40685;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40685__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__40694 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40694,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40694,(1),null);
var iterys__5450__auto__ = ((function (s__40685__$1,vec__40694,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function tailrecursion$priority_map$iter__40684_$_iter__40686(s__40687){
return (new cljs.core.LazySeq(null,((function (s__40685__$1,vec__40694,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1){
return (function (){
var s__40687__$1 = s__40687;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__40687__$1);
if(temp__4653__auto____$1){
var s__40687__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__40687__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40687__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40689 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40688 = (0);
while(true){
if((i__40688 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40688);
cljs.core.chunk_append(b__40689,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__40730 = (i__40688 + (1));
i__40688 = G__40730;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40689),tailrecursion$priority_map$iter__40684_$_iter__40686(cljs.core.chunk_rest(s__40687__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40689),null);
}
} else {
var item = cljs.core.first(s__40687__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__40684_$_iter__40686(cljs.core.rest(s__40687__$2)));
}
} else {
return null;
}
break;
}
});})(s__40685__$1,vec__40694,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1))
,null,null));
});})(s__40685__$1,vec__40694,priority,item_set,xs__5201__auto__,temp__4653__auto__,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__40684(cljs.core.rest(s__40685__$1)));
} else {
var G__40731 = cljs.core.rest(s__40685__$1);
s__40685__$1 = G__40731;
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
var G__40732 = null;
var G__40732__2 = (function (self__,item){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
return this$.cljs$core$ILookup$_lookup$arity$2(null,item);
});
var G__40732__3 = (function (self__,item,not_found){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
return this$.cljs$core$ILookup$_lookup$arity$3(null,item,not_found);
});
G__40732 = function(self__,item,not_found){
switch(arguments.length){
case 2:
return G__40732__2.call(this,self__,item);
case 3:
return G__40732__3.call(this,self__,item,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__40732.cljs$core$IFn$_invoke$arity$2 = G__40732__2;
G__40732.cljs$core$IFn$_invoke$arity$3 = G__40732__3;
return G__40732;
})()
;

tailrecursion.priority_map.PersistentPriorityMap.prototype.apply = (function (self__,args40644){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args40644)));
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
return (function tailrecursion$priority_map$iter__40697(s__40698){
return (new cljs.core.LazySeq(null,((function (sets,this$__$1){
return (function (){
var s__40698__$1 = s__40698;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40698__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__40707 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40707,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40707,(1),null);
var iterys__5450__auto__ = ((function (s__40698__$1,vec__40707,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1){
return (function tailrecursion$priority_map$iter__40697_$_iter__40699(s__40700){
return (new cljs.core.LazySeq(null,((function (s__40698__$1,vec__40707,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1){
return (function (){
var s__40700__$1 = s__40700;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__40700__$1);
if(temp__4653__auto____$1){
var s__40700__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__40700__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40700__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40702 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40701 = (0);
while(true){
if((i__40701 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40701);
cljs.core.chunk_append(b__40702,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null));

var G__40733 = (i__40701 + (1));
i__40701 = G__40733;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40702),tailrecursion$priority_map$iter__40697_$_iter__40699(cljs.core.chunk_rest(s__40700__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40702),null);
}
} else {
var item = cljs.core.first(s__40700__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null),tailrecursion$priority_map$iter__40697_$_iter__40699(cljs.core.rest(s__40700__$2)));
}
} else {
return null;
}
break;
}
});})(s__40698__$1,vec__40707,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1))
,null,null));
});})(s__40698__$1,vec__40707,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__40697(cljs.core.rest(s__40698__$1)));
} else {
var G__40734 = cljs.core.rest(s__40698__$1);
s__40698__$1 = G__40734;
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
return (function tailrecursion$priority_map$iter__40710(s__40711){
return (new cljs.core.LazySeq(null,((function (sets,this$__$1){
return (function (){
var s__40711__$1 = s__40711;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__40711__$1);
if(temp__4653__auto__){
var xs__5201__auto__ = temp__4653__auto__;
var vec__40720 = cljs.core.first(xs__5201__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40720,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40720,(1),null);
var iterys__5450__auto__ = ((function (s__40711__$1,vec__40720,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1){
return (function tailrecursion$priority_map$iter__40710_$_iter__40712(s__40713){
return (new cljs.core.LazySeq(null,((function (s__40711__$1,vec__40720,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1){
return (function (){
var s__40713__$1 = s__40713;
while(true){
var temp__4653__auto____$1 = cljs.core.seq(s__40713__$1);
if(temp__4653__auto____$1){
var s__40713__$2 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__40713__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__40713__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__40715 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__40714 = (0);
while(true){
if((i__40714 < size__5453__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__40714);
cljs.core.chunk_append(b__40715,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__40735 = (i__40714 + (1));
i__40714 = G__40735;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40715),tailrecursion$priority_map$iter__40710_$_iter__40712(cljs.core.chunk_rest(s__40713__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40715),null);
}
} else {
var item = cljs.core.first(s__40713__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__40710_$_iter__40712(cljs.core.rest(s__40713__$2)));
}
} else {
return null;
}
break;
}
});})(s__40711__$1,vec__40720,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1))
,null,null));
});})(s__40711__$1,vec__40720,priority,item_set,xs__5201__auto__,temp__4653__auto__,sets,this$__$1))
;
var fs__5451__auto__ = cljs.core.seq(iterys__5450__auto__(item_set));
if(fs__5451__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5451__auto__,tailrecursion$priority_map$iter__40710(cljs.core.rest(s__40711__$1)));
} else {
var G__40736 = cljs.core.rest(s__40711__$1);
s__40711__$1 = G__40736;
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
var G__40723 = cljs.core.val(entry);
return (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(G__40723) : self__.keyfn.call(null,G__40723));
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
var args40737 = [];
var len__5740__auto___40740 = arguments.length;
var i__5741__auto___40741 = (0);
while(true){
if((i__5741__auto___40741 < len__5740__auto___40740)){
args40737.push((arguments[i__5741__auto___40741]));

var G__40742 = (i__5741__auto___40741 + (1));
i__5741__auto___40741 = G__40742;
continue;
} else {
}
break;
}

var G__40739 = args40737.length;
switch (G__40739) {
case 1:
return tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40737.length)].join('')));

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
var len__5740__auto___40745 = arguments.length;
var i__5741__auto___40746 = (0);
while(true){
if((i__5741__auto___40746 < len__5740__auto___40745)){
args__5747__auto__.push((arguments[i__5741__auto___40746]));

var G__40747 = (i__5741__auto___40746 + (1));
i__5741__auto___40746 = G__40747;
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
var G__40748 = cljs.core.nnext(in$);
var G__40749 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__40748;
out = G__40749;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map.cljs$lang$maxFixedArity = (0);

tailrecursion.priority_map.priority_map.cljs$lang$applyTo = (function (seq40744){
return tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq40744));
});
/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied comparator.
 */
tailrecursion.priority_map.priority_map_by = (function tailrecursion$priority_map$priority_map_by(var_args){
var args__5747__auto__ = [];
var len__5740__auto___40752 = arguments.length;
var i__5741__auto___40753 = (0);
while(true){
if((i__5741__auto___40753 < len__5740__auto___40752)){
args__5747__auto__.push((arguments[i__5741__auto___40753]));

var G__40754 = (i__5741__auto___40753 + (1));
i__5741__auto___40753 = G__40754;
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
var G__40755 = cljs.core.nnext(in$);
var G__40756 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__40755;
out = G__40756;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_by.cljs$lang$maxFixedArity = (1);

tailrecursion.priority_map.priority_map_by.cljs$lang$applyTo = (function (seq40750){
var G__40751 = cljs.core.first(seq40750);
var seq40750__$1 = cljs.core.next(seq40750);
return tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic(G__40751,seq40750__$1);
});
/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied keyfn.
 */
tailrecursion.priority_map.priority_map_keyfn = (function tailrecursion$priority_map$priority_map_keyfn(var_args){
var args__5747__auto__ = [];
var len__5740__auto___40759 = arguments.length;
var i__5741__auto___40760 = (0);
while(true){
if((i__5741__auto___40760 < len__5740__auto___40759)){
args__5747__auto__.push((arguments[i__5741__auto___40760]));

var G__40761 = (i__5741__auto___40760 + (1));
i__5741__auto___40760 = G__40761;
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
var G__40762 = cljs.core.nnext(in$);
var G__40763 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__40762;
out = G__40763;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_keyfn.cljs$lang$maxFixedArity = (1);

tailrecursion.priority_map.priority_map_keyfn.cljs$lang$applyTo = (function (seq40757){
var G__40758 = cljs.core.first(seq40757);
var seq40757__$1 = cljs.core.next(seq40757);
return tailrecursion.priority_map.priority_map_keyfn.cljs$core$IFn$_invoke$arity$variadic(G__40758,seq40757__$1);
});
/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied keyfn and comparator.
 */
tailrecursion.priority_map.priority_map_keyfn_by = (function tailrecursion$priority_map$priority_map_keyfn_by(var_args){
var args__5747__auto__ = [];
var len__5740__auto___40767 = arguments.length;
var i__5741__auto___40768 = (0);
while(true){
if((i__5741__auto___40768 < len__5740__auto___40767)){
args__5747__auto__.push((arguments[i__5741__auto___40768]));

var G__40769 = (i__5741__auto___40768 + (1));
i__5741__auto___40768 = G__40769;
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
var G__40770 = cljs.core.nnext(in$);
var G__40771 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__40770;
out = G__40771;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_keyfn_by.cljs$lang$maxFixedArity = (2);

tailrecursion.priority_map.priority_map_keyfn_by.cljs$lang$applyTo = (function (seq40764){
var G__40765 = cljs.core.first(seq40764);
var seq40764__$1 = cljs.core.next(seq40764);
var G__40766 = cljs.core.first(seq40764__$1);
var seq40764__$2 = cljs.core.next(seq40764__$1);
return tailrecursion.priority_map.priority_map_keyfn_by.cljs$core$IFn$_invoke$arity$variadic(G__40765,G__40766,seq40764__$2);
});
