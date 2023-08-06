// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.q_learning_2d');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.q_learning_2d');
goog.require('org.numenta.sanity.comportex.data');
goog.require('goog.string');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.q_learning_1d');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('goog.string.format');
goog.require('monet.canvas');
org.numenta.sanity.demos.q_learning_2d.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$n_DASH_regions,(1)], null));
org.numenta.sanity.demos.q_learning_2d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__66491_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__66491_SHARP_,cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(p1__66491_SHARP_),cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(p1__66491_SHARP_)], null));
})));
org.numenta.sanity.demos.q_learning_2d.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.q_learning_2d.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.q_learning_2d.draw_world = (function org$numenta$sanity$demos$q_learning_2d$draw_world(ctx,inval,htm){
var surface = org.nfrac.comportex.demos.q_learning_2d.surface;
var x_max = cljs.core.count(surface);
var y_max = cljs.core.count(cljs.core.first(surface));
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),x_max], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),y_max], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var edge_px = (function (){var x__5020__auto__ = width_px;
var y__5021__auto__ = height_px;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,edge_px,cljs.core.cst$kw$h,edge_px], null);
var plot = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

org.numenta.sanity.plots_canvas.frame_BANG_(plot);

var seq__66524_66556 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(surface)));
var chunk__66531_66557 = null;
var count__66532_66558 = (0);
var i__66533_66559 = (0);
while(true){
if((i__66533_66559 < count__66532_66558)){
var y_66560 = chunk__66531_66557.cljs$core$IIndexed$_nth$arity$2(null,i__66533_66559);
var seq__66534_66561 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.first(surface))));
var chunk__66536_66562 = null;
var count__66537_66563 = (0);
var i__66538_66564 = (0);
while(true){
if((i__66538_66564 < count__66537_66563)){
var x_66565 = chunk__66536_66562.cljs$core$IIndexed$_nth$arity$2(null,i__66538_66564);
var v_66566 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66565,y_66560], null));
if((v_66566 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66565,y_66560,(1),(1));
} else {
if((v_66566 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66565,y_66560,(1),(1));
} else {
}
}

var G__66567 = seq__66534_66561;
var G__66568 = chunk__66536_66562;
var G__66569 = count__66537_66563;
var G__66570 = (i__66538_66564 + (1));
seq__66534_66561 = G__66567;
chunk__66536_66562 = G__66568;
count__66537_66563 = G__66569;
i__66538_66564 = G__66570;
continue;
} else {
var temp__4653__auto___66571 = cljs.core.seq(seq__66534_66561);
if(temp__4653__auto___66571){
var seq__66534_66572__$1 = temp__4653__auto___66571;
if(cljs.core.chunked_seq_QMARK_(seq__66534_66572__$1)){
var c__5485__auto___66573 = cljs.core.chunk_first(seq__66534_66572__$1);
var G__66574 = cljs.core.chunk_rest(seq__66534_66572__$1);
var G__66575 = c__5485__auto___66573;
var G__66576 = cljs.core.count(c__5485__auto___66573);
var G__66577 = (0);
seq__66534_66561 = G__66574;
chunk__66536_66562 = G__66575;
count__66537_66563 = G__66576;
i__66538_66564 = G__66577;
continue;
} else {
var x_66578 = cljs.core.first(seq__66534_66572__$1);
var v_66579 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66578,y_66560], null));
if((v_66579 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66578,y_66560,(1),(1));
} else {
if((v_66579 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66578,y_66560,(1),(1));
} else {
}
}

var G__66580 = cljs.core.next(seq__66534_66572__$1);
var G__66581 = null;
var G__66582 = (0);
var G__66583 = (0);
seq__66534_66561 = G__66580;
chunk__66536_66562 = G__66581;
count__66537_66563 = G__66582;
i__66538_66564 = G__66583;
continue;
}
} else {
}
}
break;
}

var G__66584 = seq__66524_66556;
var G__66585 = chunk__66531_66557;
var G__66586 = count__66532_66558;
var G__66587 = (i__66533_66559 + (1));
seq__66524_66556 = G__66584;
chunk__66531_66557 = G__66585;
count__66532_66558 = G__66586;
i__66533_66559 = G__66587;
continue;
} else {
var temp__4653__auto___66588 = cljs.core.seq(seq__66524_66556);
if(temp__4653__auto___66588){
var seq__66524_66589__$1 = temp__4653__auto___66588;
if(cljs.core.chunked_seq_QMARK_(seq__66524_66589__$1)){
var c__5485__auto___66590 = cljs.core.chunk_first(seq__66524_66589__$1);
var G__66591 = cljs.core.chunk_rest(seq__66524_66589__$1);
var G__66592 = c__5485__auto___66590;
var G__66593 = cljs.core.count(c__5485__auto___66590);
var G__66594 = (0);
seq__66524_66556 = G__66591;
chunk__66531_66557 = G__66592;
count__66532_66558 = G__66593;
i__66533_66559 = G__66594;
continue;
} else {
var y_66595 = cljs.core.first(seq__66524_66589__$1);
var seq__66525_66596 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.first(surface))));
var chunk__66527_66597 = null;
var count__66528_66598 = (0);
var i__66529_66599 = (0);
while(true){
if((i__66529_66599 < count__66528_66598)){
var x_66600 = chunk__66527_66597.cljs$core$IIndexed$_nth$arity$2(null,i__66529_66599);
var v_66601 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66600,y_66595], null));
if((v_66601 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66600,y_66595,(1),(1));
} else {
if((v_66601 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66600,y_66595,(1),(1));
} else {
}
}

var G__66602 = seq__66525_66596;
var G__66603 = chunk__66527_66597;
var G__66604 = count__66528_66598;
var G__66605 = (i__66529_66599 + (1));
seq__66525_66596 = G__66602;
chunk__66527_66597 = G__66603;
count__66528_66598 = G__66604;
i__66529_66599 = G__66605;
continue;
} else {
var temp__4653__auto___66606__$1 = cljs.core.seq(seq__66525_66596);
if(temp__4653__auto___66606__$1){
var seq__66525_66607__$1 = temp__4653__auto___66606__$1;
if(cljs.core.chunked_seq_QMARK_(seq__66525_66607__$1)){
var c__5485__auto___66608 = cljs.core.chunk_first(seq__66525_66607__$1);
var G__66609 = cljs.core.chunk_rest(seq__66525_66607__$1);
var G__66610 = c__5485__auto___66608;
var G__66611 = cljs.core.count(c__5485__auto___66608);
var G__66612 = (0);
seq__66525_66596 = G__66609;
chunk__66527_66597 = G__66610;
count__66528_66598 = G__66611;
i__66529_66599 = G__66612;
continue;
} else {
var x_66613 = cljs.core.first(seq__66525_66607__$1);
var v_66614 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66613,y_66595], null));
if((v_66614 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66613,y_66595,(1),(1));
} else {
if((v_66614 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66613,y_66595,(1),(1));
} else {
}
}

var G__66615 = cljs.core.next(seq__66525_66607__$1);
var G__66616 = null;
var G__66617 = (0);
var G__66618 = (0);
seq__66525_66596 = G__66615;
chunk__66527_66597 = G__66616;
count__66528_66598 = G__66617;
i__66529_66599 = G__66618;
continue;
}
} else {
}
}
break;
}

var G__66619 = cljs.core.next(seq__66524_66589__$1);
var G__66620 = null;
var G__66621 = (0);
var G__66622 = (0);
seq__66524_66556 = G__66619;
chunk__66531_66557 = G__66620;
count__66532_66558 = G__66621;
i__66533_66559 = G__66622;
continue;
}
} else {
}
}
break;
}

var seq__66540_66623 = cljs.core.seq(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval));
var chunk__66542_66624 = null;
var count__66543_66625 = (0);
var i__66544_66626 = (0);
while(true){
if((i__66544_66626 < count__66543_66625)){
var vec__66546_66627 = chunk__66542_66624.cljs$core$IIndexed$_nth$arity$2(null,i__66544_66626);
var state_action_66628 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66546_66627,(0),null);
var q_66629 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66546_66627,(1),null);
var map__66547_66630 = state_action_66628;
var map__66547_66631__$1 = ((((!((map__66547_66630 == null)))?((((map__66547_66630.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66547_66630.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66547_66630):map__66547_66630);
var x_66632 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66547_66631__$1,cljs.core.cst$kw$x);
var y_66633 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66547_66631__$1,cljs.core.cst$kw$y);
var action_66634 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66547_66631__$1,cljs.core.cst$kw$action);
var map__66548_66635 = action_66634;
var map__66548_66636__$1 = ((((!((map__66548_66635 == null)))?((((map__66548_66635.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66548_66635.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66548_66635):map__66548_66635);
var dx_66637 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66548_66636__$1,cljs.core.cst$kw$dx);
var dy_66638 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66548_66636__$1,cljs.core.cst$kw$dy);
monet.canvas.fill_style(ctx,(((q_66629 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_66629));

if((dx_66637 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66632 - 0.25),y_66633,0.25,(1));
} else {
if((dx_66637 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66632 + (1)),y_66633,0.25,(1));
} else {
if((dy_66638 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66632,(y_66633 - 0.25),(1),0.25);
} else {
if((dy_66638 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66632,(y_66633 + (1)),(1),0.25);
} else {
}
}
}
}

var G__66639 = seq__66540_66623;
var G__66640 = chunk__66542_66624;
var G__66641 = count__66543_66625;
var G__66642 = (i__66544_66626 + (1));
seq__66540_66623 = G__66639;
chunk__66542_66624 = G__66640;
count__66543_66625 = G__66641;
i__66544_66626 = G__66642;
continue;
} else {
var temp__4653__auto___66643 = cljs.core.seq(seq__66540_66623);
if(temp__4653__auto___66643){
var seq__66540_66644__$1 = temp__4653__auto___66643;
if(cljs.core.chunked_seq_QMARK_(seq__66540_66644__$1)){
var c__5485__auto___66645 = cljs.core.chunk_first(seq__66540_66644__$1);
var G__66646 = cljs.core.chunk_rest(seq__66540_66644__$1);
var G__66647 = c__5485__auto___66645;
var G__66648 = cljs.core.count(c__5485__auto___66645);
var G__66649 = (0);
seq__66540_66623 = G__66646;
chunk__66542_66624 = G__66647;
count__66543_66625 = G__66648;
i__66544_66626 = G__66649;
continue;
} else {
var vec__66551_66650 = cljs.core.first(seq__66540_66644__$1);
var state_action_66651 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66551_66650,(0),null);
var q_66652 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66551_66650,(1),null);
var map__66552_66653 = state_action_66651;
var map__66552_66654__$1 = ((((!((map__66552_66653 == null)))?((((map__66552_66653.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66552_66653.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66552_66653):map__66552_66653);
var x_66655 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66552_66654__$1,cljs.core.cst$kw$x);
var y_66656 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66552_66654__$1,cljs.core.cst$kw$y);
var action_66657 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66552_66654__$1,cljs.core.cst$kw$action);
var map__66553_66658 = action_66657;
var map__66553_66659__$1 = ((((!((map__66553_66658 == null)))?((((map__66553_66658.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66553_66658.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66553_66658):map__66553_66658);
var dx_66660 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66553_66659__$1,cljs.core.cst$kw$dx);
var dy_66661 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66553_66659__$1,cljs.core.cst$kw$dy);
monet.canvas.fill_style(ctx,(((q_66652 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_66652));

if((dx_66660 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66655 - 0.25),y_66656,0.25,(1));
} else {
if((dx_66660 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66655 + (1)),y_66656,0.25,(1));
} else {
if((dy_66661 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66655,(y_66656 - 0.25),(1),0.25);
} else {
if((dy_66661 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66655,(y_66656 + (1)),(1),0.25);
} else {
}
}
}
}

var G__66662 = cljs.core.next(seq__66540_66644__$1);
var G__66663 = null;
var G__66664 = (0);
var G__66665 = (0);
seq__66540_66623 = G__66662;
chunk__66542_66624 = G__66663;
count__66543_66625 = G__66664;
i__66544_66626 = G__66665;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,(1));

var x_EQ__66666 = (0.5 + cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval));
var y_EQ__66667 = (0.5 + cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval));
var dx_1_66668 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var dy_1_66669 = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var dx_66670 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var dy_66671 = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
monet.canvas.stroke_style(ctx,"black");

org.numenta.sanity.plots_canvas.line_BANG_(plot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x_EQ__66666 - dx_1_66668),(y_EQ__66667 - dy_1_66669)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_EQ__66666,y_EQ__66667], null)], null));

monet.canvas.stroke_style(ctx,"#888");

org.numenta.sanity.plots_canvas.line_BANG_(plot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_EQ__66666,y_EQ__66667], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x_EQ__66666 + dx_66670),(y_EQ__66667 + dy_66671)], null)], null));

monet.canvas.stroke_style(ctx,"#888");

monet.canvas.fill_style(ctx,"white");

org.numenta.sanity.plots_canvas.point_BANG_(plot,(x_EQ__66666 - dx_1_66668),(y_EQ__66667 - dy_1_66669),(3));

monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"yellow");

org.numenta.sanity.plots_canvas.point_BANG_(plot,x_EQ__66666,y_EQ__66667,(4));

monet.canvas.stroke_style(ctx,"black");

return org.numenta.sanity.plots_canvas.grid_BANG_(plot,cljs.core.PersistentArrayMap.EMPTY);
});
org.numenta.sanity.demos.q_learning_2d.signed_str = (function org$numenta$sanity$demos$q_learning_2d$signed_str(x){
return [cljs.core.str((((x < (0)))?"":"+")),cljs.core.str(x)].join('');
});
org.numenta.sanity.demos.q_learning_2d.world_pane = (function org$numenta$sanity$demos$q_learning_2d$world_pane(){
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$q_DASH_learning_DASH_2d_SLASH_fetch_DASH_selected_DASH_htm,((function (selected_htm){
return (function (_,___$1,___$2,p__66687){
var vec__66688 = p__66687;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66688,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66688,sel,selected_htm){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66688,sel,selected_htm){
return (function (state_66693){
var state_val_66694 = (state_66693[(1)]);
if((state_val_66694 === (1))){
var state_66693__$1 = state_66693;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66693__$1,(2),out_c);
} else {
if((state_val_66694 === (2))){
var inst_66690 = (state_66693[(2)]);
var inst_66691 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_66690) : cljs.core.reset_BANG_.call(null,selected_htm,inst_66690));
var state_66693__$1 = state_66693;
return cljs.core.async.impl.ioc_helpers.return_chan(state_66693__$1,inst_66691);
} else {
return null;
}
}
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66688,sel,selected_htm))
;
return ((function (switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66688,sel,selected_htm){
return (function() {
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_66698 = [null,null,null,null,null,null,null];
(statearr_66698[(0)] = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__);

(statearr_66698[(1)] = (1));

return statearr_66698;
});
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____1 = (function (state_66693){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66693);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66699){if((e66699 instanceof Object)){
var ex__35851__auto__ = e66699;
var statearr_66700_66702 = state_66693;
(statearr_66700_66702[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66693);

return cljs.core.cst$kw$recur;
} else {
throw e66699;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66703 = state_66693;
state_66693 = G__66703;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__ = function(state_66693){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____1.call(this,state_66693);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66688,sel,selected_htm))
})();
var state__35963__auto__ = (function (){var statearr_66701 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66701[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_66701;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66688,sel,selected_htm))
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
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Reward ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"R"], null)," = z ",TIMES," 0.01"], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table$table_DASH_condensed,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"x,y"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"position"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval),",",cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("x,"),cljs.core.str(DELTA),cljs.core.str("y")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"action"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str(org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval)))),cljs.core.str(","),cljs.core.str(org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval))))].join('')], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"z"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"~reward"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$z.cljs$core$IFn$_invoke$arity$1(inval))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("x,"),cljs.core.str(DELTA),cljs.core.str("y")].join(''),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t+1"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"action"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str(org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval)))),cljs.core.str(","),cljs.core.str(org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval))))].join('')], null)], null)], null),org.numenta.sanity.demos.q_learning_1d.q_learning_sub_pane(htm),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"240px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection,selected_htm], null),((function (inval,DELTA,TIMES,htm,temp__4653__auto____$1,step,temp__4653__auto__,selected_htm){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var inval__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.q_learning_2d.draw_world(ctx,inval__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_htm) : cljs.core.deref.call(null,selected_htm)));
});})(inval,DELTA,TIMES,htm,temp__4653__auto____$1,step,temp__4653__auto__,selected_htm))
,null], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Current position on the objective function surface. ","Also shows approx Q values for each position/action combination,\n            where green is positive and red is negative.\n            These are the last seen Q values including last adjustments."], null)], null)], null);
} else {
return null;
}
} else {
return null;
}
});
;})(selected_htm))
});
org.numenta.sanity.demos.q_learning_2d.set_model_BANG_ = (function org$numenta$sanity$demos$q_learning_2d$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_2d.model)) == null);
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,init_QMARK_){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,init_QMARK_){
return (function (state_66761){
var state_val_66762 = (state_66761[(1)]);
if((state_val_66762 === (1))){
var state_66761__$1 = state_66761;
if(init_QMARK_){
var statearr_66763_66780 = state_66761__$1;
(statearr_66763_66780[(1)] = (2));

} else {
var statearr_66764_66781 = state_66761__$1;
(statearr_66764_66781[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66762 === (2))){
var state_66761__$1 = state_66761;
var statearr_66765_66782 = state_66761__$1;
(statearr_66765_66782[(2)] = null);

(statearr_66765_66782[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66762 === (3))){
var state_66761__$1 = state_66761;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66761__$1,(5),org.numenta.sanity.demos.q_learning_2d.world_c);
} else {
if((state_val_66762 === (4))){
var inst_66747 = (state_66761[(2)]);
var inst_66748 = org.nfrac.comportex.demos.q_learning_2d.make_model();
var inst_66749 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_2d.model,inst_66748) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.demos.q_learning_2d.model,inst_66748));
var state_66761__$1 = (function (){var statearr_66766 = state_66761;
(statearr_66766[(7)] = inst_66747);

(statearr_66766[(8)] = inst_66749);

return statearr_66766;
})();
if(init_QMARK_){
var statearr_66767_66783 = state_66761__$1;
(statearr_66767_66783[(1)] = (6));

} else {
var statearr_66768_66784 = state_66761__$1;
(statearr_66768_66784[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66762 === (5))){
var inst_66745 = (state_66761[(2)]);
var state_66761__$1 = state_66761;
var statearr_66769_66785 = state_66761__$1;
(statearr_66769_66785[(2)] = inst_66745);

(statearr_66769_66785[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66762 === (6))){
var inst_66751 = org.nfrac.comportex.demos.q_learning_2d.htm_step_with_action_selection(org.numenta.sanity.demos.q_learning_2d.world_c);
var inst_66752 = org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(org.numenta.sanity.demos.q_learning_2d.model,org.numenta.sanity.demos.q_learning_2d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.q_learning_2d.into_sim,inst_66751);
var state_66761__$1 = state_66761;
var statearr_66770_66786 = state_66761__$1;
(statearr_66770_66786[(2)] = inst_66752);

(statearr_66770_66786[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66762 === (7))){
var inst_66754 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_2d.model));
var inst_66755 = org.numenta.sanity.comportex.data.step_template_data(inst_66754);
var inst_66756 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.step_template,inst_66755) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.step_template,inst_66755));
var state_66761__$1 = state_66761;
var statearr_66771_66787 = state_66761__$1;
(statearr_66771_66787[(2)] = inst_66756);

(statearr_66771_66787[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66762 === (8))){
var inst_66758 = (state_66761[(2)]);
var inst_66759 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_2d.world_c,org.nfrac.comportex.demos.q_learning_2d.initial_inval);
var state_66761__$1 = (function (){var statearr_66772 = state_66761;
(statearr_66772[(9)] = inst_66758);

return statearr_66772;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_66761__$1,inst_66759);
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
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_66776 = [null,null,null,null,null,null,null,null,null,null];
(statearr_66776[(0)] = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__);

(statearr_66776[(1)] = (1));

return statearr_66776;
});
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____1 = (function (state_66761){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66761);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66777){if((e66777 instanceof Object)){
var ex__35851__auto__ = e66777;
var statearr_66778_66788 = state_66761;
(statearr_66778_66788[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66761);

return cljs.core.cst$kw$recur;
} else {
throw e66777;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66789 = state_66761;
state_66761 = G__66789;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__ = function(state_66761){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____1.call(this,state_66761);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,init_QMARK_))
})();
var state__35963__auto__ = (function (){var statearr_66779 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66779[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_66779;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,init_QMARK_))
);

return c__35961__auto__;
}));
});
org.numenta.sanity.demos.q_learning_2d.config_template = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of regions:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_regions], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.q_learning_2d.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null);
org.numenta.sanity.demos.q_learning_2d.model_tab = (function org$numenta$sanity$demos$q_learning_2d$model_tab(){
return new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Highly experimental attempt at integrating ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"http://en.wikipedia.org/wiki/Q-learning"], null),"Q learning"], null)," (reinforcement learning)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"General approach"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A Q value indicates the goodness of taking an action from some\n        state. We represent a Q value by the average permanence of\n        synapses activating the action from that state, minus the\n        initial permanence value."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The action region columns are activated just like any other\n        region, but are then interpreted to produce an action."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Adjustments to a Q value, based on reward and expected future\n        reward, are applied to the permanence of synapses which\n        directly activated the action (columns). This adjustment\n        applies in the action layer only, where it replaces the usual\n        learning of proximal synapses (spatial pooling)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Exploration arises from the usual boosting of neglected\n        columns, primarily in the action layer."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"This example"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The agent can move up, down, left or right on a surface.\n        The reward is -3 on normal squares, -200 on hazard squares\n        and +200 on the goal square. These are divided by 100 for\n        comparison to Q values on the synaptic permanence scale."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The action layer columns are interpreted to produce an\n        action. 10 columns are allocated to each of the four\n        directions of movement, and the direction with most active\n        columns is used to move the agent."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The input is the location of the agent via coordinate\n        encoder, plus the last movement as distal input."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This example is episodic: when the agent reaches either the\n        goal or a hazard it is returned to the starting point. Success\n        is indicated by the agent following a direct path to the goal\n        square."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.q_learning_2d.config_template,org.numenta.sanity.demos.q_learning_2d.config], null)], null);
});
org.numenta.sanity.demos.q_learning_2d.init = (function org$numenta$sanity$demos$q_learning_2d$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.q_learning_2d.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.q_learning_2d.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.q_learning_2d.into_sim], null),goog.dom.getElement("sanity-app"));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$two_DASH_d);

return org.numenta.sanity.demos.q_learning_2d.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.q_learning_2d.init', org.numenta.sanity.demos.q_learning_2d.init);
