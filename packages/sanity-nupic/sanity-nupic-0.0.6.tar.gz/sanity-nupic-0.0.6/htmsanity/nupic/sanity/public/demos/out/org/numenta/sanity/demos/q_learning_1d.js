// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.q_learning_1d');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.q_learning_1d');
goog.require('org.numenta.sanity.comportex.data');
goog.require('goog.string');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('goog.string.format');
goog.require('monet.canvas');
org.numenta.sanity.demos.q_learning_1d.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$n_DASH_regions,(1)], null));
org.numenta.sanity.demos.q_learning_1d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.frequencies_middleware(cljs.core.cst$kw$x,cljs.core.cst$kw$freqs)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__65433_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__65433_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(p1__65433_SHARP_));
}))));
org.numenta.sanity.demos.q_learning_1d.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.q_learning_1d.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.q_learning_1d.draw_world = (function org$numenta$sanity$demos$q_learning_1d$draw_world(ctx,inval){
var surface = org.nfrac.comportex.demos.q_learning_1d.surface;
var surface_xy = cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),surface);
var x_max = cljs.core.count(surface);
var y_max = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.max,surface);
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((0) - (1)),(x_max + (1))], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(y_max + (1)),(0)], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,(100)], null);
monet.canvas.save(ctx);

monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

var qplot_size_65478 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size),cljs.core.cst$kw$h,(40)], null);
var qplot_lim_65479 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(2)], null);
var qplot_65480 = org.numenta.sanity.plots_canvas.xy_plot(ctx,qplot_size_65478,x_lim,qplot_lim_65479);
org.numenta.sanity.plots_canvas.frame_BANG_(qplot_65480);

var seq__65456_65481 = cljs.core.seq(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval));
var chunk__65458_65482 = null;
var count__65459_65483 = (0);
var i__65460_65484 = (0);
while(true){
if((i__65460_65484 < count__65459_65483)){
var vec__65462_65485 = chunk__65458_65482.cljs$core$IIndexed$_nth$arity$2(null,i__65460_65484);
var state_action_65486 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65462_65485,(0),null);
var q_65487 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65462_65485,(1),null);
var map__65463_65488 = state_action_65486;
var map__65463_65489__$1 = ((((!((map__65463_65488 == null)))?((((map__65463_65488.cljs$lang$protocol_mask$partition0$ & (64))) || (map__65463_65488.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__65463_65488):map__65463_65488);
var x_65490 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65463_65489__$1,cljs.core.cst$kw$x);
var action_65491 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65463_65489__$1,cljs.core.cst$kw$action);
var dx_65492 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(action_65491);
monet.canvas.fill_style(ctx,(((q_65487 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_65487));

if((dx_65492 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_65480,(x_65490 - 0.6),(0),0.6,(1));
} else {
if((dx_65492 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_65480,x_65490,(1),0.6,(1));
} else {
}
}

var G__65493 = seq__65456_65481;
var G__65494 = chunk__65458_65482;
var G__65495 = count__65459_65483;
var G__65496 = (i__65460_65484 + (1));
seq__65456_65481 = G__65493;
chunk__65458_65482 = G__65494;
count__65459_65483 = G__65495;
i__65460_65484 = G__65496;
continue;
} else {
var temp__4653__auto___65497 = cljs.core.seq(seq__65456_65481);
if(temp__4653__auto___65497){
var seq__65456_65498__$1 = temp__4653__auto___65497;
if(cljs.core.chunked_seq_QMARK_(seq__65456_65498__$1)){
var c__5485__auto___65499 = cljs.core.chunk_first(seq__65456_65498__$1);
var G__65500 = cljs.core.chunk_rest(seq__65456_65498__$1);
var G__65501 = c__5485__auto___65499;
var G__65502 = cljs.core.count(c__5485__auto___65499);
var G__65503 = (0);
seq__65456_65481 = G__65500;
chunk__65458_65482 = G__65501;
count__65459_65483 = G__65502;
i__65460_65484 = G__65503;
continue;
} else {
var vec__65465_65504 = cljs.core.first(seq__65456_65498__$1);
var state_action_65505 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65465_65504,(0),null);
var q_65506 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65465_65504,(1),null);
var map__65466_65507 = state_action_65505;
var map__65466_65508__$1 = ((((!((map__65466_65507 == null)))?((((map__65466_65507.cljs$lang$protocol_mask$partition0$ & (64))) || (map__65466_65507.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__65466_65507):map__65466_65507);
var x_65509 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65466_65508__$1,cljs.core.cst$kw$x);
var action_65510 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65466_65508__$1,cljs.core.cst$kw$action);
var dx_65511 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(action_65510);
monet.canvas.fill_style(ctx,(((q_65506 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_65506));

if((dx_65511 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_65480,(x_65509 - 0.6),(0),0.6,(1));
} else {
if((dx_65511 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_65480,x_65509,(1),0.6,(1));
} else {
}
}

var G__65512 = cljs.core.next(seq__65456_65498__$1);
var G__65513 = null;
var G__65514 = (0);
var G__65515 = (0);
seq__65456_65481 = G__65512;
chunk__65458_65482 = G__65513;
count__65459_65483 = G__65514;
i__65460_65484 = G__65515;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,0.25);

monet.canvas.fill_style(ctx,"black");

var seq__65468_65516 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1((cljs.core.count(surface) + (1))));
var chunk__65469_65517 = null;
var count__65470_65518 = (0);
var i__65471_65519 = (0);
while(true){
if((i__65471_65519 < count__65470_65518)){
var x_65520 = chunk__65469_65517.cljs$core$IIndexed$_nth$arity$2(null,i__65471_65519);
org.numenta.sanity.plots_canvas.line_BANG_(qplot_65480,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65520,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65520,(2)], null)], null));

var G__65521 = seq__65468_65516;
var G__65522 = chunk__65469_65517;
var G__65523 = count__65470_65518;
var G__65524 = (i__65471_65519 + (1));
seq__65468_65516 = G__65521;
chunk__65469_65517 = G__65522;
count__65470_65518 = G__65523;
i__65471_65519 = G__65524;
continue;
} else {
var temp__4653__auto___65525 = cljs.core.seq(seq__65468_65516);
if(temp__4653__auto___65525){
var seq__65468_65526__$1 = temp__4653__auto___65525;
if(cljs.core.chunked_seq_QMARK_(seq__65468_65526__$1)){
var c__5485__auto___65527 = cljs.core.chunk_first(seq__65468_65526__$1);
var G__65528 = cljs.core.chunk_rest(seq__65468_65526__$1);
var G__65529 = c__5485__auto___65527;
var G__65530 = cljs.core.count(c__5485__auto___65527);
var G__65531 = (0);
seq__65468_65516 = G__65528;
chunk__65469_65517 = G__65529;
count__65470_65518 = G__65530;
i__65471_65519 = G__65531;
continue;
} else {
var x_65532 = cljs.core.first(seq__65468_65526__$1);
org.numenta.sanity.plots_canvas.line_BANG_(qplot_65480,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65532,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65532,(2)], null)], null));

var G__65533 = cljs.core.next(seq__65468_65526__$1);
var G__65534 = null;
var G__65535 = (0);
var G__65536 = (0);
seq__65468_65516 = G__65533;
chunk__65469_65517 = G__65534;
count__65470_65518 = G__65535;
i__65471_65519 = G__65536;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,(1));

monet.canvas.translate(ctx,(0),(40));

var plot_65537 = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
org.numenta.sanity.plots_canvas.frame_BANG_(plot_65537);

monet.canvas.stroke_style(ctx,"lightgray");

org.numenta.sanity.plots_canvas.grid_BANG_(plot_65537,cljs.core.PersistentArrayMap.EMPTY);

monet.canvas.stroke_style(ctx,"black");

org.numenta.sanity.plots_canvas.line_BANG_(plot_65537,surface_xy);

var dx_1_65538 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var x_65539 = cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval);
var y_65540 = cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval);
var x_1_65541 = (x_65539 - dx_1_65538);
var y_1_65542 = (surface.cljs$core$IFn$_invoke$arity$1 ? surface.cljs$core$IFn$_invoke$arity$1(x_1_65541) : surface.call(null,x_1_65541));
monet.canvas.stroke_style(ctx,"#888");

monet.canvas.fill_style(ctx,"white");

org.numenta.sanity.plots_canvas.point_BANG_(plot_65537,x_1_65541,y_1_65542,(3));

monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"yellow");

org.numenta.sanity.plots_canvas.point_BANG_(plot_65537,x_65539,y_65540,(4));

monet.canvas.translate(ctx,(0),cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));

var freqs_65543 = cljs.core.cst$kw$freqs.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(inval));
var hist_lim_65544 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.vals(freqs_65543)) + (1))], null);
var histogram_65545 = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,hist_lim_65544);
monet.canvas.stroke_style(ctx,"black");

var seq__65472_65546 = cljs.core.seq(freqs_65543);
var chunk__65473_65547 = null;
var count__65474_65548 = (0);
var i__65475_65549 = (0);
while(true){
if((i__65475_65549 < count__65474_65548)){
var vec__65476_65550 = chunk__65473_65547.cljs$core$IIndexed$_nth$arity$2(null,i__65475_65549);
var x_65551 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65476_65550,(0),null);
var f_65552 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65476_65550,(1),null);
org.numenta.sanity.plots_canvas.line_BANG_(histogram_65545,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65551,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65551,f_65552], null)], null));

var G__65553 = seq__65472_65546;
var G__65554 = chunk__65473_65547;
var G__65555 = count__65474_65548;
var G__65556 = (i__65475_65549 + (1));
seq__65472_65546 = G__65553;
chunk__65473_65547 = G__65554;
count__65474_65548 = G__65555;
i__65475_65549 = G__65556;
continue;
} else {
var temp__4653__auto___65557 = cljs.core.seq(seq__65472_65546);
if(temp__4653__auto___65557){
var seq__65472_65558__$1 = temp__4653__auto___65557;
if(cljs.core.chunked_seq_QMARK_(seq__65472_65558__$1)){
var c__5485__auto___65559 = cljs.core.chunk_first(seq__65472_65558__$1);
var G__65560 = cljs.core.chunk_rest(seq__65472_65558__$1);
var G__65561 = c__5485__auto___65559;
var G__65562 = cljs.core.count(c__5485__auto___65559);
var G__65563 = (0);
seq__65472_65546 = G__65560;
chunk__65473_65547 = G__65561;
count__65474_65548 = G__65562;
i__65475_65549 = G__65563;
continue;
} else {
var vec__65477_65564 = cljs.core.first(seq__65472_65558__$1);
var x_65565 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65477_65564,(0),null);
var f_65566 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65477_65564,(1),null);
org.numenta.sanity.plots_canvas.line_BANG_(histogram_65545,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65565,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65565,f_65566], null)], null));

var G__65567 = cljs.core.next(seq__65472_65558__$1);
var G__65568 = null;
var G__65569 = (0);
var G__65570 = (0);
seq__65472_65546 = G__65567;
chunk__65473_65547 = G__65568;
count__65474_65548 = G__65569;
i__65475_65549 = G__65570;
continue;
}
} else {
}
}
break;
}

return monet.canvas.restore(ctx);
});
org.numenta.sanity.demos.q_learning_1d.signed_str = (function org$numenta$sanity$demos$q_learning_1d$signed_str(x){
return [cljs.core.str((((x < (0)))?"":"+")),cljs.core.str(x)].join('');
});
org.numenta.sanity.demos.q_learning_1d.q_learning_sub_pane = (function org$numenta$sanity$demos$q_learning_1d$q_learning_sub_pane(htm){
var alyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$regions,cljs.core.cst$kw$action,cljs.core.cst$kw$layer_DASH_3], null));
var qinfo = cljs.core.cst$kw$Q_DASH_info.cljs$core$IFn$_invoke$arity$1(alyr);
var map__65575 = cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(alyr);
var map__65575__$1 = ((((!((map__65575 == null)))?((((map__65575.cljs$lang$protocol_mask$partition0$ & (64))) || (map__65575.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__65575):map__65575);
var q_alpha = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65575__$1,cljs.core.cst$kw$q_DASH_alpha);
var q_discount = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65575__$1,cljs.core.cst$kw$q_DASH_discount);
var Q_T = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"Q",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t"], null)], null);
var Q_T_1 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var$text_DASH_nowrap,"Q",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t-1"], null)], null);
var R_T = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var$text_DASH_nowrap,"R",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t"], null)], null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Q learning"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table$table_DASH_condensed,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,R_T], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"reward"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$reward.cljs$core$IFn$_invoke$arity$2(qinfo,(0)).toFixed((2))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,Q_T], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"goodness"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$Q_DASH_val.cljs$core$IFn$_invoke$arity$2(qinfo,(0)).toFixed((3))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,Q_T_1], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"previous"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$Q_DASH_old.cljs$core$IFn$_invoke$arity$2(qinfo,(0)).toFixed((3))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"n"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"active synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$perms.cljs$core$IFn$_invoke$arity$2(qinfo,(0))], null)], null)], null),new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_right,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,"adjustment: "], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$abbr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,[cljs.core.str("learning rate, alpha")].join('')], null),q_alpha], null),"(",R_T," + ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$abbr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,"discount factor"], null),q_discount], null),Q_T," - ",Q_T_1,") = ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$mark,(function (){var G__65577 = "%+.3f";
var G__65578 = cljs.core.cst$kw$adj.cljs$core$IFn$_invoke$arity$2(qinfo,(0));
return goog.string.format(G__65577,G__65578);
})()], null)], null)], null);
});
org.numenta.sanity.demos.q_learning_1d.world_pane = (function org$numenta$sanity$demos$q_learning_1d$world_pane(){
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$q_DASH_learning_DASH_1d_SLASH_fetch_DASH_selected_DASH_htm,((function (selected_htm){
return (function (_,___$1,___$2,p__65594){
var vec__65595 = p__65594;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65595,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65595,sel,selected_htm){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65595,sel,selected_htm){
return (function (state_65600){
var state_val_65601 = (state_65600[(1)]);
if((state_val_65601 === (1))){
var state_65600__$1 = state_65600;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65600__$1,(2),out_c);
} else {
if((state_val_65601 === (2))){
var inst_65597 = (state_65600[(2)]);
var inst_65598 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_65597) : cljs.core.reset_BANG_.call(null,selected_htm,inst_65597));
var state_65600__$1 = state_65600;
return cljs.core.async.impl.ioc_helpers.return_chan(state_65600__$1,inst_65598);
} else {
return null;
}
}
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65595,sel,selected_htm))
;
return ((function (switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65595,sel,selected_htm){
return (function() {
var org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_65605 = [null,null,null,null,null,null,null];
(statearr_65605[(0)] = org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto__);

(statearr_65605[(1)] = (1));

return statearr_65605;
});
var org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto____1 = (function (state_65600){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_65600);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e65606){if((e65606 instanceof Object)){
var ex__35851__auto__ = e65606;
var statearr_65607_65609 = state_65600;
(statearr_65607_65609[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65600);

return cljs.core.cst$kw$recur;
} else {
throw e65606;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__65610 = state_65600;
state_65600 = G__65610;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto__ = function(state_65600){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto____1.call(this,state_65600);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65595,sel,selected_htm))
})();
var state__35963__auto__ = (function (){var statearr_65608 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_65608[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_65608;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__65595,sel,selected_htm))
);

return c__35961__auto__;
} else {
return null;
}
});})(selected_htm))
);

return ((function (selected_htm){
return (function (){
var temp__4653__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4653__auto__)){
var step = temp__4653__auto__;
var temp__4653__auto____$1 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_htm) : cljs.core.deref.call(null,selected_htm));
if(cljs.core.truth_(temp__4653__auto____$1)){
var htm = temp__4653__auto____$1;
var inval = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
var DELTA = goog.string.unescapeEntities("&Delta;");
var TIMES = goog.string.unescapeEntities("&times;");
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Reward ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"R"], null)," = ",DELTA,"y ",TIMES," 0.5"], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table$table_DASH_condensed,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"x"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"position"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("x")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"action"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,org.numenta.sanity.demos.q_learning_1d.signed_str(cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval)))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("y")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"~reward"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,org.numenta.sanity.demos.q_learning_1d.signed_str(cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(inval))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("x")].join(''),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t+1"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"action"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,org.numenta.sanity.demos.q_learning_1d.signed_str(cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval)))], null)], null)], null),org.numenta.sanity.demos.q_learning_1d.q_learning_sub_pane(htm),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"240px"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (inval,DELTA,TIMES,htm,temp__4653__auto____$1,step,temp__4653__auto__,selected_htm){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var inval__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.q_learning_1d.draw_world(ctx,inval__$1);
});})(inval,DELTA,TIMES,htm,temp__4653__auto____$1,step,temp__4653__auto__,selected_htm))
,null], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,"top: "], null),"Approx Q values for each position/action combination,\n            where green is positive and red is negative.\n            These are the last seen Q values including last adjustments."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,"middle: "], null),"Current position on the objective function surface."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,"bottom: "], null),"Frequencies of being at each position."], null)], null)], null);
} else {
return null;
}
} else {
return null;
}
});
;})(selected_htm))
});
org.numenta.sanity.demos.q_learning_1d.set_model_BANG_ = (function org$numenta$sanity$demos$q_learning_1d$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_1d.model)) == null);
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,init_QMARK_){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,init_QMARK_){
return (function (state_65668){
var state_val_65669 = (state_65668[(1)]);
if((state_val_65669 === (1))){
var state_65668__$1 = state_65668;
if(init_QMARK_){
var statearr_65670_65687 = state_65668__$1;
(statearr_65670_65687[(1)] = (2));

} else {
var statearr_65671_65688 = state_65668__$1;
(statearr_65671_65688[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65669 === (2))){
var state_65668__$1 = state_65668;
var statearr_65672_65689 = state_65668__$1;
(statearr_65672_65689[(2)] = null);

(statearr_65672_65689[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65669 === (3))){
var state_65668__$1 = state_65668;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65668__$1,(5),org.numenta.sanity.demos.q_learning_1d.world_c);
} else {
if((state_val_65669 === (4))){
var inst_65654 = (state_65668[(2)]);
var inst_65655 = org.nfrac.comportex.demos.q_learning_1d.make_model();
var inst_65656 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_1d.model,inst_65655) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.demos.q_learning_1d.model,inst_65655));
var state_65668__$1 = (function (){var statearr_65673 = state_65668;
(statearr_65673[(7)] = inst_65656);

(statearr_65673[(8)] = inst_65654);

return statearr_65673;
})();
if(init_QMARK_){
var statearr_65674_65690 = state_65668__$1;
(statearr_65674_65690[(1)] = (6));

} else {
var statearr_65675_65691 = state_65668__$1;
(statearr_65675_65691[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65669 === (5))){
var inst_65652 = (state_65668[(2)]);
var state_65668__$1 = state_65668;
var statearr_65676_65692 = state_65668__$1;
(statearr_65676_65692[(2)] = inst_65652);

(statearr_65676_65692[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65669 === (6))){
var inst_65658 = org.nfrac.comportex.demos.q_learning_1d.htm_step_with_action_selection(org.numenta.sanity.demos.q_learning_1d.world_c);
var inst_65659 = org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(org.numenta.sanity.demos.q_learning_1d.model,org.numenta.sanity.demos.q_learning_1d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.q_learning_1d.into_sim,inst_65658);
var state_65668__$1 = state_65668;
var statearr_65677_65693 = state_65668__$1;
(statearr_65677_65693[(2)] = inst_65659);

(statearr_65677_65693[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65669 === (7))){
var inst_65661 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_1d.model));
var inst_65662 = org.numenta.sanity.comportex.data.step_template_data(inst_65661);
var inst_65663 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.step_template,inst_65662) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.step_template,inst_65662));
var state_65668__$1 = state_65668;
var statearr_65678_65694 = state_65668__$1;
(statearr_65678_65694[(2)] = inst_65663);

(statearr_65678_65694[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65669 === (8))){
var inst_65665 = (state_65668[(2)]);
var inst_65666 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_1d.world_c,org.nfrac.comportex.demos.q_learning_1d.initial_inval);
var state_65668__$1 = (function (){var statearr_65679 = state_65668;
(statearr_65679[(9)] = inst_65665);

return statearr_65679;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_65668__$1,inst_65666);
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
});})(c__35961__auto__,init_QMARK_))
;
return ((function (switch__35847__auto__,c__35961__auto__,init_QMARK_){
return (function() {
var org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_65683 = [null,null,null,null,null,null,null,null,null,null];
(statearr_65683[(0)] = org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto__);

(statearr_65683[(1)] = (1));

return statearr_65683;
});
var org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto____1 = (function (state_65668){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_65668);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e65684){if((e65684 instanceof Object)){
var ex__35851__auto__ = e65684;
var statearr_65685_65695 = state_65668;
(statearr_65685_65695[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65668);

return cljs.core.cst$kw$recur;
} else {
throw e65684;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__65696 = state_65668;
state_65668 = G__65696;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto__ = function(state_65668){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto____1.call(this,state_65668);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,init_QMARK_))
})();
var state__35963__auto__ = (function (){var statearr_65686 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_65686[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_65686;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,init_QMARK_))
);

return c__35961__auto__;
}));
});
org.numenta.sanity.demos.q_learning_1d.config_template = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of regions:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_regions], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.q_learning_1d.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null);
org.numenta.sanity.demos.q_learning_1d.model_tab = (function org$numenta$sanity$demos$q_learning_1d$model_tab(){
return new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Highly experimental attempt at integrating ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"http://en.wikipedia.org/wiki/Q-learning"], null),"Q learning"], null)," (reinforcement learning)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"General approach"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A Q value indicates the goodness of taking an action from some\n        state. We represent a Q value by the average permanence of\n        synapses activating the action from that state, minus the\n        initial permanence value."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The action region columns are activated just like any other\n        region, but are then interpreted to produce an action."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Adjustments to a Q value, based on reward and expected future\n        reward, are applied to the permanence of synapses which\n        directly activated the action (columns). This adjustment\n        applies in the action layer only, where it replaces the usual\n        learning of proximal synapses (spatial pooling)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Exploration arises from the usual boosting of neglected\n        columns, primarily in the action layer."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"This example"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The agent can move left or right on a reward surface. The\n        reward is proportional to the change in y value after\n        moving (dy)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The action layer columns are interpreted to produce an\n        action. 15 columns are allocated to each of the two directions\n        of movement, and the direction with most active columns is\n        used to move the agent."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The input is the location of the agent via coordinate\n        encoder, plus the last movement as distal input."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This example is continuous, not episodic. Success is\n        presumably indicated by the agent finding the optimum position\n        and staying there."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.q_learning_1d.config_template,org.numenta.sanity.demos.q_learning_1d.config], null)], null);
});
org.numenta.sanity.demos.q_learning_1d.init = (function org$numenta$sanity$demos$q_learning_1d$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.q_learning_1d.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.q_learning_1d.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.q_learning_1d.into_sim], null),goog.dom.getElement("sanity-app"));

return org.numenta.sanity.demos.q_learning_1d.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.q_learning_1d.init', org.numenta.sanity.demos.q_learning_1d.init);
