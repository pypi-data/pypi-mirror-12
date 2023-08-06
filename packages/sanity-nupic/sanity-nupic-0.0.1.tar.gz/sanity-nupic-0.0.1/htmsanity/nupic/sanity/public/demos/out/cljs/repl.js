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
var seq__59951_59965 = cljs.core.seq(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m));
var chunk__59952_59966 = null;
var count__59953_59967 = (0);
var i__59954_59968 = (0);
while(true){
if((i__59954_59968 < count__59953_59967)){
var f_59969 = chunk__59952_59966.cljs$core$IIndexed$_nth$arity$2(null,i__59954_59968);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_59969], 0));

var G__59970 = seq__59951_59965;
var G__59971 = chunk__59952_59966;
var G__59972 = count__59953_59967;
var G__59973 = (i__59954_59968 + (1));
seq__59951_59965 = G__59970;
chunk__59952_59966 = G__59971;
count__59953_59967 = G__59972;
i__59954_59968 = G__59973;
continue;
} else {
var temp__4653__auto___59974 = cljs.core.seq(seq__59951_59965);
if(temp__4653__auto___59974){
var seq__59951_59975__$1 = temp__4653__auto___59974;
if(cljs.core.chunked_seq_QMARK_(seq__59951_59975__$1)){
var c__5485__auto___59976 = cljs.core.chunk_first(seq__59951_59975__$1);
var G__59977 = cljs.core.chunk_rest(seq__59951_59975__$1);
var G__59978 = c__5485__auto___59976;
var G__59979 = cljs.core.count(c__5485__auto___59976);
var G__59980 = (0);
seq__59951_59965 = G__59977;
chunk__59952_59966 = G__59978;
count__59953_59967 = G__59979;
i__59954_59968 = G__59980;
continue;
} else {
var f_59981 = cljs.core.first(seq__59951_59975__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_59981], 0));

var G__59982 = cljs.core.next(seq__59951_59975__$1);
var G__59983 = null;
var G__59984 = (0);
var G__59985 = (0);
seq__59951_59965 = G__59982;
chunk__59952_59966 = G__59983;
count__59953_59967 = G__59984;
i__59954_59968 = G__59985;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m))){
var arglists_59986 = cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4682__auto__ = cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglists_59986], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$quote,cljs.core.first(arglists_59986)))?cljs.core.second(arglists_59986):arglists_59986)], 0));
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
var seq__59955 = cljs.core.seq(cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(m));
var chunk__59956 = null;
var count__59957 = (0);
var i__59958 = (0);
while(true){
if((i__59958 < count__59957)){
var vec__59959 = chunk__59956.cljs$core$IIndexed$_nth$arity$2(null,i__59958);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59959,(0),null);
var map__59960 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59959,(1),null);
var map__59960__$1 = ((((!((map__59960 == null)))?((((map__59960.cljs$lang$protocol_mask$partition0$ & (64))) || (map__59960.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__59960):map__59960);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59960__$1,cljs.core.cst$kw$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59960__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__59987 = seq__59955;
var G__59988 = chunk__59956;
var G__59989 = count__59957;
var G__59990 = (i__59958 + (1));
seq__59955 = G__59987;
chunk__59956 = G__59988;
count__59957 = G__59989;
i__59958 = G__59990;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__59955);
if(temp__4653__auto__){
var seq__59955__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__59955__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__59955__$1);
var G__59991 = cljs.core.chunk_rest(seq__59955__$1);
var G__59992 = c__5485__auto__;
var G__59993 = cljs.core.count(c__5485__auto__);
var G__59994 = (0);
seq__59955 = G__59991;
chunk__59956 = G__59992;
count__59957 = G__59993;
i__59958 = G__59994;
continue;
} else {
var vec__59962 = cljs.core.first(seq__59955__$1);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59962,(0),null);
var map__59963 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__59962,(1),null);
var map__59963__$1 = ((((!((map__59963 == null)))?((((map__59963.cljs$lang$protocol_mask$partition0$ & (64))) || (map__59963.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__59963):map__59963);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59963__$1,cljs.core.cst$kw$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59963__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__59995 = cljs.core.next(seq__59955__$1);
var G__59996 = null;
var G__59997 = (0);
var G__59998 = (0);
seq__59955 = G__59995;
chunk__59956 = G__59996;
count__59957 = G__59997;
i__59958 = G__59998;
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
