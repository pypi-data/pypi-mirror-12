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
var seq__59714_59728 = cljs.core.seq(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m));
var chunk__59715_59729 = null;
var count__59716_59730 = (0);
var i__59717_59731 = (0);
while(true){
if((i__59717_59731 < count__59716_59730)){
var f_59732 = chunk__59715_59729.cljs$core$IIndexed$_nth$arity$2(null,i__59717_59731);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_59732], 0));

var G__59733 = seq__59714_59728;
var G__59734 = chunk__59715_59729;
var G__59735 = count__59716_59730;
var G__59736 = (i__59717_59731 + (1));
seq__59714_59728 = G__59733;
chunk__59715_59729 = G__59734;
count__59716_59730 = G__59735;
i__59717_59731 = G__59736;
continue;
} else {
var temp__4653__auto___59737 = cljs.core.seq(seq__59714_59728);
if(temp__4653__auto___59737){
var seq__59714_59738__$1 = temp__4653__auto___59737;
if(cljs.core.chunked_seq_QMARK_(seq__59714_59738__$1)){
var c__5485__auto___59739 = cljs.core.chunk_first(seq__59714_59738__$1);
var G__59740 = cljs.core.chunk_rest(seq__59714_59738__$1);
var G__59741 = c__5485__auto___59739;
var G__59742 = cljs.core.count(c__5485__auto___59739);
var G__59743 = (0);
seq__59714_59728 = G__59740;
chunk__59715_59729 = G__59741;
count__59716_59730 = G__59742;
i__59717_59731 = G__59743;
continue;
} else {
var f_59744 = cljs.core.first(seq__59714_59738__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_59744], 0));

var G__59745 = cljs.core.next(seq__59714_59738__$1);
var G__59746 = null;
var G__59747 = (0);
var G__59748 = (0);
seq__59714_59728 = G__59745;
chunk__59715_59729 = G__59746;
count__59716_59730 = G__59747;
i__59717_59731 = G__59748;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m))){
var arglists_59749 = cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglists_59749], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$quote,cljs.core.first(arglists_59749)))?cljs.core.second(arglists_59749):arglists_59749)], 0));
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
var seq__59718 = cljs.core.seq(cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(m));
var chunk__59719 = null;
var count__59720 = (0);
var i__59721 = (0);
while(true){
if((i__59721 < count__59720)){
var vec__59722 = chunk__59719.cljs$core$IIndexed$_nth$arity$2(null,i__59721);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59722,(0),null);
var map__59723 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59722,(1),null);
var map__59723__$1 = ((((!((map__59723 == null)))?((((map__59723.cljs$lang$protocol_mask$partition0$ & (64))) || (map__59723.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__59723):map__59723);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59723__$1,cljs.core.cst$kw$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59723__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__59750 = seq__59718;
var G__59751 = chunk__59719;
var G__59752 = count__59720;
var G__59753 = (i__59721 + (1));
seq__59718 = G__59750;
chunk__59719 = G__59751;
count__59720 = G__59752;
i__59721 = G__59753;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__59718);
if(temp__4653__auto__){
var seq__59718__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__59718__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__59718__$1);
var G__59754 = cljs.core.chunk_rest(seq__59718__$1);
var G__59755 = c__5485__auto__;
var G__59756 = cljs.core.count(c__5485__auto__);
var G__59757 = (0);
seq__59718 = G__59754;
chunk__59719 = G__59755;
count__59720 = G__59756;
i__59721 = G__59757;
continue;
} else {
var vec__59725 = cljs.core.first(seq__59718__$1);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59725,(0),null);
var map__59726 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59725,(1),null);
var map__59726__$1 = ((((!((map__59726 == null)))?((((map__59726.cljs$lang$protocol_mask$partition0$ & (64))) || (map__59726.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__59726):map__59726);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59726__$1,cljs.core.cst$kw$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59726__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__59758 = cljs.core.next(seq__59718__$1);
var G__59759 = null;
var G__59760 = (0);
var G__59761 = (0);
seq__59718 = G__59758;
chunk__59719 = G__59759;
count__59720 = G__59760;
i__59721 = G__59761;
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
