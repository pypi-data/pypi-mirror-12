// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str((function (){var temp__4653__auto__ = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4653__auto__)){
var ns = temp__4653__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));

if(cljs.core.truth_(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m))){
var seq__59712_59726 = cljs.core.seq(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m));
var chunk__59713_59727 = null;
var count__59714_59728 = (0);
var i__59715_59729 = (0);
while(true){
if((i__59715_59729 < count__59714_59728)){
var f_59730 = chunk__59713_59727.cljs$core$IIndexed$_nth$arity$2(null,i__59715_59729);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_59730], 0));

var G__59731 = seq__59712_59726;
var G__59732 = chunk__59713_59727;
var G__59733 = count__59714_59728;
var G__59734 = (i__59715_59729 + (1));
seq__59712_59726 = G__59731;
chunk__59713_59727 = G__59732;
count__59714_59728 = G__59733;
i__59715_59729 = G__59734;
continue;
} else {
var temp__4653__auto___59735 = cljs.core.seq(seq__59712_59726);
if(temp__4653__auto___59735){
var seq__59712_59736__$1 = temp__4653__auto___59735;
if(cljs.core.chunked_seq_QMARK_(seq__59712_59736__$1)){
var c__5485__auto___59737 = cljs.core.chunk_first(seq__59712_59736__$1);
var G__59738 = cljs.core.chunk_rest(seq__59712_59736__$1);
var G__59739 = c__5485__auto___59737;
var G__59740 = cljs.core.count(c__5485__auto___59737);
var G__59741 = (0);
seq__59712_59726 = G__59738;
chunk__59713_59727 = G__59739;
count__59714_59728 = G__59740;
i__59715_59729 = G__59741;
continue;
} else {
var f_59742 = cljs.core.first(seq__59712_59736__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_59742], 0));

var G__59743 = cljs.core.next(seq__59712_59736__$1);
var G__59744 = null;
var G__59745 = (0);
var G__59746 = (0);
seq__59712_59726 = G__59743;
chunk__59713_59727 = G__59744;
count__59714_59728 = G__59745;
i__59715_59729 = G__59746;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m))){
var arglists_59747 = cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglists_59747], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$quote,cljs.core.first(arglists_59747)))?cljs.core.second(arglists_59747):arglists_59747)], 0));
}
} else {
}
}

if(cljs.core.truth_(cljs.core.cst$kw$special_DASH_form.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,cljs.core.cst$kw$url)){
if(cljs.core.truth_(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Macro"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(m))){
var seq__59716 = cljs.core.seq(cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(m));
var chunk__59717 = null;
var count__59718 = (0);
var i__59719 = (0);
while(true){
if((i__59719 < count__59718)){
var vec__59720 = chunk__59717.cljs$core$IIndexed$_nth$arity$2(null,i__59719);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59720,(0),null);
var map__59721 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59720,(1),null);
var map__59721__$1 = ((((!((map__59721 == null)))?((((map__59721.cljs$lang$protocol_mask$partition0$ & (64))) || (map__59721.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__59721):map__59721);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59721__$1,cljs.core.cst$kw$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59721__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__59748 = seq__59716;
var G__59749 = chunk__59717;
var G__59750 = count__59718;
var G__59751 = (i__59719 + (1));
seq__59716 = G__59748;
chunk__59717 = G__59749;
count__59718 = G__59750;
i__59719 = G__59751;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__59716);
if(temp__4653__auto__){
var seq__59716__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__59716__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__59716__$1);
var G__59752 = cljs.core.chunk_rest(seq__59716__$1);
var G__59753 = c__5485__auto__;
var G__59754 = cljs.core.count(c__5485__auto__);
var G__59755 = (0);
seq__59716 = G__59752;
chunk__59717 = G__59753;
count__59718 = G__59754;
i__59719 = G__59755;
continue;
} else {
var vec__59723 = cljs.core.first(seq__59716__$1);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59723,(0),null);
var map__59724 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59723,(1),null);
var map__59724__$1 = ((((!((map__59724 == null)))?((((map__59724.cljs$lang$protocol_mask$partition0$ & (64))) || (map__59724.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__59724):map__59724);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59724__$1,cljs.core.cst$kw$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59724__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__59756 = cljs.core.next(seq__59716__$1);
var G__59757 = null;
var G__59758 = (0);
var G__59759 = (0);
seq__59716 = G__59756;
chunk__59717 = G__59757;
count__59718 = G__59758;
i__59719 = G__59759;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});
