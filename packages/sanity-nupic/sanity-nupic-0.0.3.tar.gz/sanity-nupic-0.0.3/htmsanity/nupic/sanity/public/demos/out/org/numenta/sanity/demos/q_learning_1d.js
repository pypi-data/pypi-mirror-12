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
org.numenta.sanity.demos.q_learning_1d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.frequencies_middleware(cljs.core.cst$kw$x,cljs.core.cst$kw$freqs)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__65428_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__65428_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(p1__65428_SHARP_));
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

var qplot_size_65473 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size),cljs.core.cst$kw$h,(40)], null);
var qplot_lim_65474 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(2)], null);
var qplot_65475 = org.numenta.sanity.plots_canvas.xy_plot(ctx,qplot_size_65473,x_lim,qplot_lim_65474);
org.numenta.sanity.plots_canvas.frame_BANG_(qplot_65475);

var seq__65451_65476 = cljs.core.seq(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval));
var chunk__65453_65477 = null;
var count__65454_65478 = (0);
var i__65455_65479 = (0);
while(true){
if((i__65455_65479 < count__65454_65478)){
var vec__65457_65480 = chunk__65453_65477.cljs$core$IIndexed$_nth$arity$2(null,i__65455_65479);
var state_action_65481 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65457_65480,(0),null);
var q_65482 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65457_65480,(1),null);
var map__65458_65483 = state_action_65481;
var map__65458_65484__$1 = ((((!((map__65458_65483 == null)))?((((map__65458_65483.cljs$lang$protocol_mask$partition0$ & (64))) || (map__65458_65483.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__65458_65483):map__65458_65483);
var x_65485 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65458_65484__$1,cljs.core.cst$kw$x);
var action_65486 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65458_65484__$1,cljs.core.cst$kw$action);
var dx_65487 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(action_65486);
monet.canvas.fill_style(ctx,(((q_65482 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_65482));

if((dx_65487 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_65475,(x_65485 - 0.6),(0),0.6,(1));
} else {
if((dx_65487 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_65475,x_65485,(1),0.6,(1));
} else {
}
}

var G__65488 = seq__65451_65476;
var G__65489 = chunk__65453_65477;
var G__65490 = count__65454_65478;
var G__65491 = (i__65455_65479 + (1));
seq__65451_65476 = G__65488;
chunk__65453_65477 = G__65489;
count__65454_65478 = G__65490;
i__65455_65479 = G__65491;
continue;
} else {
var temp__4653__auto___65492 = cljs.core.seq(seq__65451_65476);
if(temp__4653__auto___65492){
var seq__65451_65493__$1 = temp__4653__auto___65492;
if(cljs.core.chunked_seq_QMARK_(seq__65451_65493__$1)){
var c__5485__auto___65494 = cljs.core.chunk_first(seq__65451_65493__$1);
var G__65495 = cljs.core.chunk_rest(seq__65451_65493__$1);
var G__65496 = c__5485__auto___65494;
var G__65497 = cljs.core.count(c__5485__auto___65494);
var G__65498 = (0);
seq__65451_65476 = G__65495;
chunk__65453_65477 = G__65496;
count__65454_65478 = G__65497;
i__65455_65479 = G__65498;
continue;
} else {
var vec__65460_65499 = cljs.core.first(seq__65451_65493__$1);
var state_action_65500 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65460_65499,(0),null);
var q_65501 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65460_65499,(1),null);
var map__65461_65502 = state_action_65500;
var map__65461_65503__$1 = ((((!((map__65461_65502 == null)))?((((map__65461_65502.cljs$lang$protocol_mask$partition0$ & (64))) || (map__65461_65502.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__65461_65502):map__65461_65502);
var x_65504 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65461_65503__$1,cljs.core.cst$kw$x);
var action_65505 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65461_65503__$1,cljs.core.cst$kw$action);
var dx_65506 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(action_65505);
monet.canvas.fill_style(ctx,(((q_65501 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_65501));

if((dx_65506 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_65475,(x_65504 - 0.6),(0),0.6,(1));
} else {
if((dx_65506 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_65475,x_65504,(1),0.6,(1));
} else {
}
}

var G__65507 = cljs.core.next(seq__65451_65493__$1);
var G__65508 = null;
var G__65509 = (0);
var G__65510 = (0);
seq__65451_65476 = G__65507;
chunk__65453_65477 = G__65508;
count__65454_65478 = G__65509;
i__65455_65479 = G__65510;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,0.25);

monet.canvas.fill_style(ctx,"black");

var seq__65463_65511 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1((cljs.core.count(surface) + (1))));
var chunk__65464_65512 = null;
var count__65465_65513 = (0);
var i__65466_65514 = (0);
while(true){
if((i__65466_65514 < count__65465_65513)){
var x_65515 = chunk__65464_65512.cljs$core$IIndexed$_nth$arity$2(null,i__65466_65514);
org.numenta.sanity.plots_canvas.line_BANG_(qplot_65475,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65515,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65515,(2)], null)], null));

var G__65516 = seq__65463_65511;
var G__65517 = chunk__65464_65512;
var G__65518 = count__65465_65513;
var G__65519 = (i__65466_65514 + (1));
seq__65463_65511 = G__65516;
chunk__65464_65512 = G__65517;
count__65465_65513 = G__65518;
i__65466_65514 = G__65519;
continue;
} else {
var temp__4653__auto___65520 = cljs.core.seq(seq__65463_65511);
if(temp__4653__auto___65520){
var seq__65463_65521__$1 = temp__4653__auto___65520;
if(cljs.core.chunked_seq_QMARK_(seq__65463_65521__$1)){
var c__5485__auto___65522 = cljs.core.chunk_first(seq__65463_65521__$1);
var G__65523 = cljs.core.chunk_rest(seq__65463_65521__$1);
var G__65524 = c__5485__auto___65522;
var G__65525 = cljs.core.count(c__5485__auto___65522);
var G__65526 = (0);
seq__65463_65511 = G__65523;
chunk__65464_65512 = G__65524;
count__65465_65513 = G__65525;
i__65466_65514 = G__65526;
continue;
} else {
var x_65527 = cljs.core.first(seq__65463_65521__$1);
org.numenta.sanity.plots_canvas.line_BANG_(qplot_65475,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65527,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65527,(2)], null)], null));

var G__65528 = cljs.core.next(seq__65463_65521__$1);
var G__65529 = null;
var G__65530 = (0);
var G__65531 = (0);
seq__65463_65511 = G__65528;
chunk__65464_65512 = G__65529;
count__65465_65513 = G__65530;
i__65466_65514 = G__65531;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,(1));

monet.canvas.translate(ctx,(0),(40));

var plot_65532 = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
org.numenta.sanity.plots_canvas.frame_BANG_(plot_65532);

monet.canvas.stroke_style(ctx,"lightgray");

org.numenta.sanity.plots_canvas.grid_BANG_(plot_65532,cljs.core.PersistentArrayMap.EMPTY);

monet.canvas.stroke_style(ctx,"black");

org.numenta.sanity.plots_canvas.line_BANG_(plot_65532,surface_xy);

var dx_1_65533 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var x_65534 = cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval);
var y_65535 = cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval);
var x_1_65536 = (x_65534 - dx_1_65533);
var y_1_65537 = (surface.cljs$core$IFn$_invoke$arity$1 ? surface.cljs$core$IFn$_invoke$arity$1(x_1_65536) : surface.call(null,x_1_65536));
monet.canvas.stroke_style(ctx,"#888");

monet.canvas.fill_style(ctx,"white");

org.numenta.sanity.plots_canvas.point_BANG_(plot_65532,x_1_65536,y_1_65537,(3));

monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"yellow");

org.numenta.sanity.plots_canvas.point_BANG_(plot_65532,x_65534,y_65535,(4));

monet.canvas.translate(ctx,(0),cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));

var freqs_65538 = cljs.core.cst$kw$freqs.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(inval));
var hist_lim_65539 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.vals(freqs_65538)) + (1))], null);
var histogram_65540 = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,hist_lim_65539);
monet.canvas.stroke_style(ctx,"black");

var seq__65467_65541 = cljs.core.seq(freqs_65538);
var chunk__65468_65542 = null;
var count__65469_65543 = (0);
var i__65470_65544 = (0);
while(true){
if((i__65470_65544 < count__65469_65543)){
var vec__65471_65545 = chunk__65468_65542.cljs$core$IIndexed$_nth$arity$2(null,i__65470_65544);
var x_65546 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65471_65545,(0),null);
var f_65547 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65471_65545,(1),null);
org.numenta.sanity.plots_canvas.line_BANG_(histogram_65540,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65546,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65546,f_65547], null)], null));

var G__65548 = seq__65467_65541;
var G__65549 = chunk__65468_65542;
var G__65550 = count__65469_65543;
var G__65551 = (i__65470_65544 + (1));
seq__65467_65541 = G__65548;
chunk__65468_65542 = G__65549;
count__65469_65543 = G__65550;
i__65470_65544 = G__65551;
continue;
} else {
var temp__4653__auto___65552 = cljs.core.seq(seq__65467_65541);
if(temp__4653__auto___65552){
var seq__65467_65553__$1 = temp__4653__auto___65552;
if(cljs.core.chunked_seq_QMARK_(seq__65467_65553__$1)){
var c__5485__auto___65554 = cljs.core.chunk_first(seq__65467_65553__$1);
var G__65555 = cljs.core.chunk_rest(seq__65467_65553__$1);
var G__65556 = c__5485__auto___65554;
var G__65557 = cljs.core.count(c__5485__auto___65554);
var G__65558 = (0);
seq__65467_65541 = G__65555;
chunk__65468_65542 = G__65556;
count__65469_65543 = G__65557;
i__65470_65544 = G__65558;
continue;
} else {
var vec__65472_65559 = cljs.core.first(seq__65467_65553__$1);
var x_65560 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65472_65559,(0),null);
var f_65561 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65472_65559,(1),null);
org.numenta.sanity.plots_canvas.line_BANG_(histogram_65540,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65560,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_65560,f_65561], null)], null));

var G__65562 = cljs.core.next(seq__65467_65553__$1);
var G__65563 = null;
var G__65564 = (0);
var G__65565 = (0);
seq__65467_65541 = G__65562;
chunk__65468_65542 = G__65563;
count__65469_65543 = G__65564;
i__65470_65544 = G__65565;
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
var map__65570 = cljs.core.cst$kw$spec.cljs$core$IFn$_invoke$arity$1(alyr);
var map__65570__$1 = ((((!((map__65570 == null)))?((((map__65570.cljs$lang$protocol_mask$partition0$ & (64))) || (map__65570.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__65570):map__65570);
var q_alpha = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65570__$1,cljs.core.cst$kw$q_DASH_alpha);
var q_discount = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__65570__$1,cljs.core.cst$kw$q_DASH_discount);
var Q_T = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"Q",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t"], null)], null);
var Q_T_1 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var$text_DASH_nowrap,"Q",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t-1"], null)], null);
var R_T = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var$text_DASH_nowrap,"R",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t"], null)], null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Q learning"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table$table_DASH_condensed,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,R_T], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"reward"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$reward.cljs$core$IFn$_invoke$arity$2(qinfo,(0)).toFixed((2))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,Q_T], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"goodness"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$Q_DASH_val.cljs$core$IFn$_invoke$arity$2(qinfo,(0)).toFixed((3))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,Q_T_1], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"previous"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$Q_DASH_old.cljs$core$IFn$_invoke$arity$2(qinfo,(0)).toFixed((3))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"n"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"active synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$perms.cljs$core$IFn$_invoke$arity$2(qinfo,(0))], null)], null)], null),new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_right,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,"adjustment: "], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$abbr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,[cljs.core.str("learning rate, alpha")].join('')], null),q_alpha], null),"(",R_T," + ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$abbr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,"discount factor"], null),q_discount], null),Q_T," - ",Q_T_1,") = ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$mark,(function (){var G__65572 = "%+.3f";
var G__65573 = cljs.core.cst$kw$adj.cljs$core$IFn$_invoke$arity$2(qinfo,(0));
return goog.string.format(G__65572,G__65573);
})()], null)], null)], null);
});
org.numenta.sanity.demos.q_learning_1d.world_pane = (function org$numenta$sanity$demos$q_learning_1d$world_pane(){
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$q_DASH_learning_DASH_1d_SLASH_fetch_DASH_selected_DASH_htm,((function (selected_htm){
return (function (_,___$1,___$2,p__65589){
var vec__65590 = p__65589;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__65590,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65590,sel,selected_htm){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65590,sel,selected_htm){
return (function (state_65595){
var state_val_65596 = (state_65595[(1)]);
if((state_val_65596 === (1))){
var state_65595__$1 = state_65595;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65595__$1,(2),out_c);
} else {
if((state_val_65596 === (2))){
var inst_65592 = (state_65595[(2)]);
var inst_65593 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_65592) : cljs.core.reset_BANG_.call(null,selected_htm,inst_65592));
var state_65595__$1 = state_65595;
return cljs.core.async.impl.ioc_helpers.return_chan(state_65595__$1,inst_65593);
} else {
return null;
}
}
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65590,sel,selected_htm))
;
return ((function (switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65590,sel,selected_htm){
return (function() {
var org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto____0 = (function (){
var statearr_65600 = [null,null,null,null,null,null,null];
(statearr_65600[(0)] = org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto__);

(statearr_65600[(1)] = (1));

return statearr_65600;
});
var org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto____1 = (function (state_65595){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_65595);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e65601){if((e65601 instanceof Object)){
var ex__36044__auto__ = e65601;
var statearr_65602_65604 = state_65595;
(statearr_65602_65604[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65595);

return cljs.core.cst$kw$recur;
} else {
throw e65601;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__65605 = state_65595;
state_65595 = G__65605;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto__ = function(state_65595){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto____1.call(this,state_65595);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65590,sel,selected_htm))
})();
var state__36156__auto__ = (function (){var statearr_65603 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_65603[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_65603;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__65590,sel,selected_htm))
);

return c__36154__auto__;
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
var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,init_QMARK_){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,init_QMARK_){
return (function (state_65663){
var state_val_65664 = (state_65663[(1)]);
if((state_val_65664 === (1))){
var state_65663__$1 = state_65663;
if(init_QMARK_){
var statearr_65665_65682 = state_65663__$1;
(statearr_65665_65682[(1)] = (2));

} else {
var statearr_65666_65683 = state_65663__$1;
(statearr_65666_65683[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65664 === (2))){
var state_65663__$1 = state_65663;
var statearr_65667_65684 = state_65663__$1;
(statearr_65667_65684[(2)] = null);

(statearr_65667_65684[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65664 === (3))){
var state_65663__$1 = state_65663;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_65663__$1,(5),org.numenta.sanity.demos.q_learning_1d.world_c);
} else {
if((state_val_65664 === (4))){
var inst_65649 = (state_65663[(2)]);
var inst_65650 = org.nfrac.comportex.demos.q_learning_1d.make_model();
var inst_65651 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_1d.model,inst_65650) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.demos.q_learning_1d.model,inst_65650));
var state_65663__$1 = (function (){var statearr_65668 = state_65663;
(statearr_65668[(7)] = inst_65651);

(statearr_65668[(8)] = inst_65649);

return statearr_65668;
})();
if(init_QMARK_){
var statearr_65669_65685 = state_65663__$1;
(statearr_65669_65685[(1)] = (6));

} else {
var statearr_65670_65686 = state_65663__$1;
(statearr_65670_65686[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_65664 === (5))){
var inst_65647 = (state_65663[(2)]);
var state_65663__$1 = state_65663;
var statearr_65671_65687 = state_65663__$1;
(statearr_65671_65687[(2)] = inst_65647);

(statearr_65671_65687[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65664 === (6))){
var inst_65653 = org.nfrac.comportex.demos.q_learning_1d.htm_step_with_action_selection(org.numenta.sanity.demos.q_learning_1d.world_c);
var inst_65654 = org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(org.numenta.sanity.demos.q_learning_1d.model,org.numenta.sanity.demos.q_learning_1d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.q_learning_1d.into_sim,inst_65653);
var state_65663__$1 = state_65663;
var statearr_65672_65688 = state_65663__$1;
(statearr_65672_65688[(2)] = inst_65654);

(statearr_65672_65688[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65664 === (7))){
var inst_65656 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_1d.model));
var inst_65657 = org.numenta.sanity.comportex.data.step_template_data(inst_65656);
var inst_65658 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.step_template,inst_65657) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.step_template,inst_65657));
var state_65663__$1 = state_65663;
var statearr_65673_65689 = state_65663__$1;
(statearr_65673_65689[(2)] = inst_65658);

(statearr_65673_65689[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_65664 === (8))){
var inst_65660 = (state_65663[(2)]);
var inst_65661 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_1d.world_c,org.nfrac.comportex.demos.q_learning_1d.initial_inval);
var state_65663__$1 = (function (){var statearr_65674 = state_65663;
(statearr_65674[(9)] = inst_65660);

return statearr_65674;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_65663__$1,inst_65661);
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
});})(c__36154__auto__,init_QMARK_))
;
return ((function (switch__36040__auto__,c__36154__auto__,init_QMARK_){
return (function() {
var org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_65678 = [null,null,null,null,null,null,null,null,null,null];
(statearr_65678[(0)] = org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto__);

(statearr_65678[(1)] = (1));

return statearr_65678;
});
var org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto____1 = (function (state_65663){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_65663);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e65679){if((e65679 instanceof Object)){
var ex__36044__auto__ = e65679;
var statearr_65680_65690 = state_65663;
(statearr_65680_65690[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_65663);

return cljs.core.cst$kw$recur;
} else {
throw e65679;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__65691 = state_65663;
state_65663 = G__65691;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto__ = function(state_65663){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto____1.call(this,state_65663);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,init_QMARK_))
})();
var state__36156__auto__ = (function (){var statearr_65681 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_65681[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_65681;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,init_QMARK_))
);

return c__36154__auto__;
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
