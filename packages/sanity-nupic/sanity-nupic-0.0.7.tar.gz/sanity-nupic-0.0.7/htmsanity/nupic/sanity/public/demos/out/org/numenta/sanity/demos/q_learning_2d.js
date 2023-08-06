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
org.numenta.sanity.demos.q_learning_2d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__66489_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__66489_SHARP_,cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(p1__66489_SHARP_),cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(p1__66489_SHARP_)], null));
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

var seq__66522_66554 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(surface)));
var chunk__66529_66555 = null;
var count__66530_66556 = (0);
var i__66531_66557 = (0);
while(true){
if((i__66531_66557 < count__66530_66556)){
var y_66558 = chunk__66529_66555.cljs$core$IIndexed$_nth$arity$2(null,i__66531_66557);
var seq__66532_66559 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.first(surface))));
var chunk__66534_66560 = null;
var count__66535_66561 = (0);
var i__66536_66562 = (0);
while(true){
if((i__66536_66562 < count__66535_66561)){
var x_66563 = chunk__66534_66560.cljs$core$IIndexed$_nth$arity$2(null,i__66536_66562);
var v_66564 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66563,y_66558], null));
if((v_66564 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66563,y_66558,(1),(1));
} else {
if((v_66564 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66563,y_66558,(1),(1));
} else {
}
}

var G__66565 = seq__66532_66559;
var G__66566 = chunk__66534_66560;
var G__66567 = count__66535_66561;
var G__66568 = (i__66536_66562 + (1));
seq__66532_66559 = G__66565;
chunk__66534_66560 = G__66566;
count__66535_66561 = G__66567;
i__66536_66562 = G__66568;
continue;
} else {
var temp__4653__auto___66569 = cljs.core.seq(seq__66532_66559);
if(temp__4653__auto___66569){
var seq__66532_66570__$1 = temp__4653__auto___66569;
if(cljs.core.chunked_seq_QMARK_(seq__66532_66570__$1)){
var c__5485__auto___66571 = cljs.core.chunk_first(seq__66532_66570__$1);
var G__66572 = cljs.core.chunk_rest(seq__66532_66570__$1);
var G__66573 = c__5485__auto___66571;
var G__66574 = cljs.core.count(c__5485__auto___66571);
var G__66575 = (0);
seq__66532_66559 = G__66572;
chunk__66534_66560 = G__66573;
count__66535_66561 = G__66574;
i__66536_66562 = G__66575;
continue;
} else {
var x_66576 = cljs.core.first(seq__66532_66570__$1);
var v_66577 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66576,y_66558], null));
if((v_66577 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66576,y_66558,(1),(1));
} else {
if((v_66577 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66576,y_66558,(1),(1));
} else {
}
}

var G__66578 = cljs.core.next(seq__66532_66570__$1);
var G__66579 = null;
var G__66580 = (0);
var G__66581 = (0);
seq__66532_66559 = G__66578;
chunk__66534_66560 = G__66579;
count__66535_66561 = G__66580;
i__66536_66562 = G__66581;
continue;
}
} else {
}
}
break;
}

var G__66582 = seq__66522_66554;
var G__66583 = chunk__66529_66555;
var G__66584 = count__66530_66556;
var G__66585 = (i__66531_66557 + (1));
seq__66522_66554 = G__66582;
chunk__66529_66555 = G__66583;
count__66530_66556 = G__66584;
i__66531_66557 = G__66585;
continue;
} else {
var temp__4653__auto___66586 = cljs.core.seq(seq__66522_66554);
if(temp__4653__auto___66586){
var seq__66522_66587__$1 = temp__4653__auto___66586;
if(cljs.core.chunked_seq_QMARK_(seq__66522_66587__$1)){
var c__5485__auto___66588 = cljs.core.chunk_first(seq__66522_66587__$1);
var G__66589 = cljs.core.chunk_rest(seq__66522_66587__$1);
var G__66590 = c__5485__auto___66588;
var G__66591 = cljs.core.count(c__5485__auto___66588);
var G__66592 = (0);
seq__66522_66554 = G__66589;
chunk__66529_66555 = G__66590;
count__66530_66556 = G__66591;
i__66531_66557 = G__66592;
continue;
} else {
var y_66593 = cljs.core.first(seq__66522_66587__$1);
var seq__66523_66594 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.first(surface))));
var chunk__66525_66595 = null;
var count__66526_66596 = (0);
var i__66527_66597 = (0);
while(true){
if((i__66527_66597 < count__66526_66596)){
var x_66598 = chunk__66525_66595.cljs$core$IIndexed$_nth$arity$2(null,i__66527_66597);
var v_66599 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66598,y_66593], null));
if((v_66599 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66598,y_66593,(1),(1));
} else {
if((v_66599 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66598,y_66593,(1),(1));
} else {
}
}

var G__66600 = seq__66523_66594;
var G__66601 = chunk__66525_66595;
var G__66602 = count__66526_66596;
var G__66603 = (i__66527_66597 + (1));
seq__66523_66594 = G__66600;
chunk__66525_66595 = G__66601;
count__66526_66596 = G__66602;
i__66527_66597 = G__66603;
continue;
} else {
var temp__4653__auto___66604__$1 = cljs.core.seq(seq__66523_66594);
if(temp__4653__auto___66604__$1){
var seq__66523_66605__$1 = temp__4653__auto___66604__$1;
if(cljs.core.chunked_seq_QMARK_(seq__66523_66605__$1)){
var c__5485__auto___66606 = cljs.core.chunk_first(seq__66523_66605__$1);
var G__66607 = cljs.core.chunk_rest(seq__66523_66605__$1);
var G__66608 = c__5485__auto___66606;
var G__66609 = cljs.core.count(c__5485__auto___66606);
var G__66610 = (0);
seq__66523_66594 = G__66607;
chunk__66525_66595 = G__66608;
count__66526_66596 = G__66609;
i__66527_66597 = G__66610;
continue;
} else {
var x_66611 = cljs.core.first(seq__66523_66605__$1);
var v_66612 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66611,y_66593], null));
if((v_66612 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66611,y_66593,(1),(1));
} else {
if((v_66612 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66611,y_66593,(1),(1));
} else {
}
}

var G__66613 = cljs.core.next(seq__66523_66605__$1);
var G__66614 = null;
var G__66615 = (0);
var G__66616 = (0);
seq__66523_66594 = G__66613;
chunk__66525_66595 = G__66614;
count__66526_66596 = G__66615;
i__66527_66597 = G__66616;
continue;
}
} else {
}
}
break;
}

var G__66617 = cljs.core.next(seq__66522_66587__$1);
var G__66618 = null;
var G__66619 = (0);
var G__66620 = (0);
seq__66522_66554 = G__66617;
chunk__66529_66555 = G__66618;
count__66530_66556 = G__66619;
i__66531_66557 = G__66620;
continue;
}
} else {
}
}
break;
}

var seq__66538_66621 = cljs.core.seq(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval));
var chunk__66540_66622 = null;
var count__66541_66623 = (0);
var i__66542_66624 = (0);
while(true){
if((i__66542_66624 < count__66541_66623)){
var vec__66544_66625 = chunk__66540_66622.cljs$core$IIndexed$_nth$arity$2(null,i__66542_66624);
var state_action_66626 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66544_66625,(0),null);
var q_66627 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66544_66625,(1),null);
var map__66545_66628 = state_action_66626;
var map__66545_66629__$1 = ((((!((map__66545_66628 == null)))?((((map__66545_66628.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66545_66628.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66545_66628):map__66545_66628);
var x_66630 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66545_66629__$1,cljs.core.cst$kw$x);
var y_66631 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66545_66629__$1,cljs.core.cst$kw$y);
var action_66632 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66545_66629__$1,cljs.core.cst$kw$action);
var map__66546_66633 = action_66632;
var map__66546_66634__$1 = ((((!((map__66546_66633 == null)))?((((map__66546_66633.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66546_66633.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66546_66633):map__66546_66633);
var dx_66635 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66546_66634__$1,cljs.core.cst$kw$dx);
var dy_66636 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66546_66634__$1,cljs.core.cst$kw$dy);
monet.canvas.fill_style(ctx,(((q_66627 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_66627));

if((dx_66635 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66630 - 0.25),y_66631,0.25,(1));
} else {
if((dx_66635 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66630 + (1)),y_66631,0.25,(1));
} else {
if((dy_66636 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66630,(y_66631 - 0.25),(1),0.25);
} else {
if((dy_66636 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66630,(y_66631 + (1)),(1),0.25);
} else {
}
}
}
}

var G__66637 = seq__66538_66621;
var G__66638 = chunk__66540_66622;
var G__66639 = count__66541_66623;
var G__66640 = (i__66542_66624 + (1));
seq__66538_66621 = G__66637;
chunk__66540_66622 = G__66638;
count__66541_66623 = G__66639;
i__66542_66624 = G__66640;
continue;
} else {
var temp__4653__auto___66641 = cljs.core.seq(seq__66538_66621);
if(temp__4653__auto___66641){
var seq__66538_66642__$1 = temp__4653__auto___66641;
if(cljs.core.chunked_seq_QMARK_(seq__66538_66642__$1)){
var c__5485__auto___66643 = cljs.core.chunk_first(seq__66538_66642__$1);
var G__66644 = cljs.core.chunk_rest(seq__66538_66642__$1);
var G__66645 = c__5485__auto___66643;
var G__66646 = cljs.core.count(c__5485__auto___66643);
var G__66647 = (0);
seq__66538_66621 = G__66644;
chunk__66540_66622 = G__66645;
count__66541_66623 = G__66646;
i__66542_66624 = G__66647;
continue;
} else {
var vec__66549_66648 = cljs.core.first(seq__66538_66642__$1);
var state_action_66649 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66549_66648,(0),null);
var q_66650 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66549_66648,(1),null);
var map__66550_66651 = state_action_66649;
var map__66550_66652__$1 = ((((!((map__66550_66651 == null)))?((((map__66550_66651.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66550_66651.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66550_66651):map__66550_66651);
var x_66653 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66550_66652__$1,cljs.core.cst$kw$x);
var y_66654 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66550_66652__$1,cljs.core.cst$kw$y);
var action_66655 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66550_66652__$1,cljs.core.cst$kw$action);
var map__66551_66656 = action_66655;
var map__66551_66657__$1 = ((((!((map__66551_66656 == null)))?((((map__66551_66656.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66551_66656.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66551_66656):map__66551_66656);
var dx_66658 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66551_66657__$1,cljs.core.cst$kw$dx);
var dy_66659 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66551_66657__$1,cljs.core.cst$kw$dy);
monet.canvas.fill_style(ctx,(((q_66650 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_66650));

if((dx_66658 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66653 - 0.25),y_66654,0.25,(1));
} else {
if((dx_66658 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66653 + (1)),y_66654,0.25,(1));
} else {
if((dy_66659 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66653,(y_66654 - 0.25),(1),0.25);
} else {
if((dy_66659 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66653,(y_66654 + (1)),(1),0.25);
} else {
}
}
}
}

var G__66660 = cljs.core.next(seq__66538_66642__$1);
var G__66661 = null;
var G__66662 = (0);
var G__66663 = (0);
seq__66538_66621 = G__66660;
chunk__66540_66622 = G__66661;
count__66541_66623 = G__66662;
i__66542_66624 = G__66663;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,(1));

var x_EQ__66664 = (0.5 + cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval));
var y_EQ__66665 = (0.5 + cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval));
var dx_1_66666 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var dy_1_66667 = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var dx_66668 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var dy_66669 = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
monet.canvas.stroke_style(ctx,"black");

org.numenta.sanity.plots_canvas.line_BANG_(plot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x_EQ__66664 - dx_1_66666),(y_EQ__66665 - dy_1_66667)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_EQ__66664,y_EQ__66665], null)], null));

monet.canvas.stroke_style(ctx,"#888");

org.numenta.sanity.plots_canvas.line_BANG_(plot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_EQ__66664,y_EQ__66665], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x_EQ__66664 + dx_66668),(y_EQ__66665 + dy_66669)], null)], null));

monet.canvas.stroke_style(ctx,"#888");

monet.canvas.fill_style(ctx,"white");

org.numenta.sanity.plots_canvas.point_BANG_(plot,(x_EQ__66664 - dx_1_66666),(y_EQ__66665 - dy_1_66667),(3));

monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"yellow");

org.numenta.sanity.plots_canvas.point_BANG_(plot,x_EQ__66664,y_EQ__66665,(4));

monet.canvas.stroke_style(ctx,"black");

return org.numenta.sanity.plots_canvas.grid_BANG_(plot,cljs.core.PersistentArrayMap.EMPTY);
});
org.numenta.sanity.demos.q_learning_2d.signed_str = (function org$numenta$sanity$demos$q_learning_2d$signed_str(x){
return [cljs.core.str((((x < (0)))?"":"+")),cljs.core.str(x)].join('');
});
org.numenta.sanity.demos.q_learning_2d.world_pane = (function org$numenta$sanity$demos$q_learning_2d$world_pane(){
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$q_DASH_learning_DASH_2d_SLASH_fetch_DASH_selected_DASH_htm,((function (selected_htm){
return (function (_,___$1,___$2,p__66685){
var vec__66686 = p__66685;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66686,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66686,sel,selected_htm){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66686,sel,selected_htm){
return (function (state_66691){
var state_val_66692 = (state_66691[(1)]);
if((state_val_66692 === (1))){
var state_66691__$1 = state_66691;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66691__$1,(2),out_c);
} else {
if((state_val_66692 === (2))){
var inst_66688 = (state_66691[(2)]);
var inst_66689 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_66688) : cljs.core.reset_BANG_.call(null,selected_htm,inst_66688));
var state_66691__$1 = state_66691;
return cljs.core.async.impl.ioc_helpers.return_chan(state_66691__$1,inst_66689);
} else {
return null;
}
}
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66686,sel,selected_htm))
;
return ((function (switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66686,sel,selected_htm){
return (function() {
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____0 = (function (){
var statearr_66696 = [null,null,null,null,null,null,null];
(statearr_66696[(0)] = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__);

(statearr_66696[(1)] = (1));

return statearr_66696;
});
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____1 = (function (state_66691){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66691);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66697){if((e66697 instanceof Object)){
var ex__35851__auto__ = e66697;
var statearr_66698_66700 = state_66691;
(statearr_66698_66700[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66691);

return cljs.core.cst$kw$recur;
} else {
throw e66697;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66701 = state_66691;
state_66691 = G__66701;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__ = function(state_66691){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____1.call(this,state_66691);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____0;
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66686,sel,selected_htm))
})();
var state__35963__auto__ = (function (){var statearr_66699 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66699[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_66699;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,out_c,model_id,temp__4653__auto__,vec__66686,sel,selected_htm))
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
return (function (state_66759){
var state_val_66760 = (state_66759[(1)]);
if((state_val_66760 === (1))){
var state_66759__$1 = state_66759;
if(init_QMARK_){
var statearr_66761_66778 = state_66759__$1;
(statearr_66761_66778[(1)] = (2));

} else {
var statearr_66762_66779 = state_66759__$1;
(statearr_66762_66779[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66760 === (2))){
var state_66759__$1 = state_66759;
var statearr_66763_66780 = state_66759__$1;
(statearr_66763_66780[(2)] = null);

(statearr_66763_66780[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66760 === (3))){
var state_66759__$1 = state_66759;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66759__$1,(5),org.numenta.sanity.demos.q_learning_2d.world_c);
} else {
if((state_val_66760 === (4))){
var inst_66745 = (state_66759[(2)]);
var inst_66746 = org.nfrac.comportex.demos.q_learning_2d.make_model();
var inst_66747 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_2d.model,inst_66746) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.demos.q_learning_2d.model,inst_66746));
var state_66759__$1 = (function (){var statearr_66764 = state_66759;
(statearr_66764[(7)] = inst_66747);

(statearr_66764[(8)] = inst_66745);

return statearr_66764;
})();
if(init_QMARK_){
var statearr_66765_66781 = state_66759__$1;
(statearr_66765_66781[(1)] = (6));

} else {
var statearr_66766_66782 = state_66759__$1;
(statearr_66766_66782[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66760 === (5))){
var inst_66743 = (state_66759[(2)]);
var state_66759__$1 = state_66759;
var statearr_66767_66783 = state_66759__$1;
(statearr_66767_66783[(2)] = inst_66743);

(statearr_66767_66783[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66760 === (6))){
var inst_66749 = org.nfrac.comportex.demos.q_learning_2d.htm_step_with_action_selection(org.numenta.sanity.demos.q_learning_2d.world_c);
var inst_66750 = org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(org.numenta.sanity.demos.q_learning_2d.model,org.numenta.sanity.demos.q_learning_2d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.q_learning_2d.into_sim,inst_66749);
var state_66759__$1 = state_66759;
var statearr_66768_66784 = state_66759__$1;
(statearr_66768_66784[(2)] = inst_66750);

(statearr_66768_66784[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66760 === (7))){
var inst_66752 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_2d.model));
var inst_66753 = org.numenta.sanity.comportex.data.step_template_data(inst_66752);
var inst_66754 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.step_template,inst_66753) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.step_template,inst_66753));
var state_66759__$1 = state_66759;
var statearr_66769_66785 = state_66759__$1;
(statearr_66769_66785[(2)] = inst_66754);

(statearr_66769_66785[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66760 === (8))){
var inst_66756 = (state_66759[(2)]);
var inst_66757 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_2d.world_c,org.nfrac.comportex.demos.q_learning_2d.initial_inval);
var state_66759__$1 = (function (){var statearr_66770 = state_66759;
(statearr_66770[(9)] = inst_66756);

return statearr_66770;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_66759__$1,inst_66757);
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
var statearr_66774 = [null,null,null,null,null,null,null,null,null,null];
(statearr_66774[(0)] = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__);

(statearr_66774[(1)] = (1));

return statearr_66774;
});
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____1 = (function (state_66759){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66759);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66775){if((e66775 instanceof Object)){
var ex__35851__auto__ = e66775;
var statearr_66776_66786 = state_66759;
(statearr_66776_66786[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66759);

return cljs.core.cst$kw$recur;
} else {
throw e66775;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66787 = state_66759;
state_66759 = G__66787;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__ = function(state_66759){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____1.call(this,state_66759);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,init_QMARK_))
})();
var state__35963__auto__ = (function (){var statearr_66777 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66777[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_66777;
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
