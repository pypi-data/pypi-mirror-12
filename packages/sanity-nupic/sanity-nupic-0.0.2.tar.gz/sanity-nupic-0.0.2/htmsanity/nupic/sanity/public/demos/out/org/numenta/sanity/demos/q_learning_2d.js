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
org.numenta.sanity.demos.q_learning_2d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__66254_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__66254_SHARP_,cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(p1__66254_SHARP_),cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(p1__66254_SHARP_)], null));
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

var seq__66287_66319 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(surface)));
var chunk__66294_66320 = null;
var count__66295_66321 = (0);
var i__66296_66322 = (0);
while(true){
if((i__66296_66322 < count__66295_66321)){
var y_66323 = chunk__66294_66320.cljs$core$IIndexed$_nth$arity$2(null,i__66296_66322);
var seq__66297_66324 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.first(surface))));
var chunk__66299_66325 = null;
var count__66300_66326 = (0);
var i__66301_66327 = (0);
while(true){
if((i__66301_66327 < count__66300_66326)){
var x_66328 = chunk__66299_66325.cljs$core$IIndexed$_nth$arity$2(null,i__66301_66327);
var v_66329 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66328,y_66323], null));
if((v_66329 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66328,y_66323,(1),(1));
} else {
if((v_66329 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66328,y_66323,(1),(1));
} else {
}
}

var G__66330 = seq__66297_66324;
var G__66331 = chunk__66299_66325;
var G__66332 = count__66300_66326;
var G__66333 = (i__66301_66327 + (1));
seq__66297_66324 = G__66330;
chunk__66299_66325 = G__66331;
count__66300_66326 = G__66332;
i__66301_66327 = G__66333;
continue;
} else {
var temp__4653__auto___66334 = cljs.core.seq(seq__66297_66324);
if(temp__4653__auto___66334){
var seq__66297_66335__$1 = temp__4653__auto___66334;
if(cljs.core.chunked_seq_QMARK_(seq__66297_66335__$1)){
var c__5485__auto___66336 = cljs.core.chunk_first(seq__66297_66335__$1);
var G__66337 = cljs.core.chunk_rest(seq__66297_66335__$1);
var G__66338 = c__5485__auto___66336;
var G__66339 = cljs.core.count(c__5485__auto___66336);
var G__66340 = (0);
seq__66297_66324 = G__66337;
chunk__66299_66325 = G__66338;
count__66300_66326 = G__66339;
i__66301_66327 = G__66340;
continue;
} else {
var x_66341 = cljs.core.first(seq__66297_66335__$1);
var v_66342 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66341,y_66323], null));
if((v_66342 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66341,y_66323,(1),(1));
} else {
if((v_66342 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66341,y_66323,(1),(1));
} else {
}
}

var G__66343 = cljs.core.next(seq__66297_66335__$1);
var G__66344 = null;
var G__66345 = (0);
var G__66346 = (0);
seq__66297_66324 = G__66343;
chunk__66299_66325 = G__66344;
count__66300_66326 = G__66345;
i__66301_66327 = G__66346;
continue;
}
} else {
}
}
break;
}

var G__66347 = seq__66287_66319;
var G__66348 = chunk__66294_66320;
var G__66349 = count__66295_66321;
var G__66350 = (i__66296_66322 + (1));
seq__66287_66319 = G__66347;
chunk__66294_66320 = G__66348;
count__66295_66321 = G__66349;
i__66296_66322 = G__66350;
continue;
} else {
var temp__4653__auto___66351 = cljs.core.seq(seq__66287_66319);
if(temp__4653__auto___66351){
var seq__66287_66352__$1 = temp__4653__auto___66351;
if(cljs.core.chunked_seq_QMARK_(seq__66287_66352__$1)){
var c__5485__auto___66353 = cljs.core.chunk_first(seq__66287_66352__$1);
var G__66354 = cljs.core.chunk_rest(seq__66287_66352__$1);
var G__66355 = c__5485__auto___66353;
var G__66356 = cljs.core.count(c__5485__auto___66353);
var G__66357 = (0);
seq__66287_66319 = G__66354;
chunk__66294_66320 = G__66355;
count__66295_66321 = G__66356;
i__66296_66322 = G__66357;
continue;
} else {
var y_66358 = cljs.core.first(seq__66287_66352__$1);
var seq__66288_66359 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.first(surface))));
var chunk__66290_66360 = null;
var count__66291_66361 = (0);
var i__66292_66362 = (0);
while(true){
if((i__66292_66362 < count__66291_66361)){
var x_66363 = chunk__66290_66360.cljs$core$IIndexed$_nth$arity$2(null,i__66292_66362);
var v_66364 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66363,y_66358], null));
if((v_66364 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66363,y_66358,(1),(1));
} else {
if((v_66364 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66363,y_66358,(1),(1));
} else {
}
}

var G__66365 = seq__66288_66359;
var G__66366 = chunk__66290_66360;
var G__66367 = count__66291_66361;
var G__66368 = (i__66292_66362 + (1));
seq__66288_66359 = G__66365;
chunk__66290_66360 = G__66366;
count__66291_66361 = G__66367;
i__66292_66362 = G__66368;
continue;
} else {
var temp__4653__auto___66369__$1 = cljs.core.seq(seq__66288_66359);
if(temp__4653__auto___66369__$1){
var seq__66288_66370__$1 = temp__4653__auto___66369__$1;
if(cljs.core.chunked_seq_QMARK_(seq__66288_66370__$1)){
var c__5485__auto___66371 = cljs.core.chunk_first(seq__66288_66370__$1);
var G__66372 = cljs.core.chunk_rest(seq__66288_66370__$1);
var G__66373 = c__5485__auto___66371;
var G__66374 = cljs.core.count(c__5485__auto___66371);
var G__66375 = (0);
seq__66288_66359 = G__66372;
chunk__66290_66360 = G__66373;
count__66291_66361 = G__66374;
i__66292_66362 = G__66375;
continue;
} else {
var x_66376 = cljs.core.first(seq__66288_66370__$1);
var v_66377 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_66376,y_66358], null));
if((v_66377 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66376,y_66358,(1),(1));
} else {
if((v_66377 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66376,y_66358,(1),(1));
} else {
}
}

var G__66378 = cljs.core.next(seq__66288_66370__$1);
var G__66379 = null;
var G__66380 = (0);
var G__66381 = (0);
seq__66288_66359 = G__66378;
chunk__66290_66360 = G__66379;
count__66291_66361 = G__66380;
i__66292_66362 = G__66381;
continue;
}
} else {
}
}
break;
}

var G__66382 = cljs.core.next(seq__66287_66352__$1);
var G__66383 = null;
var G__66384 = (0);
var G__66385 = (0);
seq__66287_66319 = G__66382;
chunk__66294_66320 = G__66383;
count__66295_66321 = G__66384;
i__66296_66322 = G__66385;
continue;
}
} else {
}
}
break;
}

var seq__66303_66386 = cljs.core.seq(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval));
var chunk__66305_66387 = null;
var count__66306_66388 = (0);
var i__66307_66389 = (0);
while(true){
if((i__66307_66389 < count__66306_66388)){
var vec__66309_66390 = chunk__66305_66387.cljs$core$IIndexed$_nth$arity$2(null,i__66307_66389);
var state_action_66391 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66309_66390,(0),null);
var q_66392 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66309_66390,(1),null);
var map__66310_66393 = state_action_66391;
var map__66310_66394__$1 = ((((!((map__66310_66393 == null)))?((((map__66310_66393.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66310_66393.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66310_66393):map__66310_66393);
var x_66395 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66310_66394__$1,cljs.core.cst$kw$x);
var y_66396 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66310_66394__$1,cljs.core.cst$kw$y);
var action_66397 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66310_66394__$1,cljs.core.cst$kw$action);
var map__66311_66398 = action_66397;
var map__66311_66399__$1 = ((((!((map__66311_66398 == null)))?((((map__66311_66398.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66311_66398.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66311_66398):map__66311_66398);
var dx_66400 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66311_66399__$1,cljs.core.cst$kw$dx);
var dy_66401 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66311_66399__$1,cljs.core.cst$kw$dy);
monet.canvas.fill_style(ctx,(((q_66392 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_66392));

if((dx_66400 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66395 - 0.25),y_66396,0.25,(1));
} else {
if((dx_66400 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66395 + (1)),y_66396,0.25,(1));
} else {
if((dy_66401 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66395,(y_66396 - 0.25),(1),0.25);
} else {
if((dy_66401 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66395,(y_66396 + (1)),(1),0.25);
} else {
}
}
}
}

var G__66402 = seq__66303_66386;
var G__66403 = chunk__66305_66387;
var G__66404 = count__66306_66388;
var G__66405 = (i__66307_66389 + (1));
seq__66303_66386 = G__66402;
chunk__66305_66387 = G__66403;
count__66306_66388 = G__66404;
i__66307_66389 = G__66405;
continue;
} else {
var temp__4653__auto___66406 = cljs.core.seq(seq__66303_66386);
if(temp__4653__auto___66406){
var seq__66303_66407__$1 = temp__4653__auto___66406;
if(cljs.core.chunked_seq_QMARK_(seq__66303_66407__$1)){
var c__5485__auto___66408 = cljs.core.chunk_first(seq__66303_66407__$1);
var G__66409 = cljs.core.chunk_rest(seq__66303_66407__$1);
var G__66410 = c__5485__auto___66408;
var G__66411 = cljs.core.count(c__5485__auto___66408);
var G__66412 = (0);
seq__66303_66386 = G__66409;
chunk__66305_66387 = G__66410;
count__66306_66388 = G__66411;
i__66307_66389 = G__66412;
continue;
} else {
var vec__66314_66413 = cljs.core.first(seq__66303_66407__$1);
var state_action_66414 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66314_66413,(0),null);
var q_66415 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66314_66413,(1),null);
var map__66315_66416 = state_action_66414;
var map__66315_66417__$1 = ((((!((map__66315_66416 == null)))?((((map__66315_66416.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66315_66416.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66315_66416):map__66315_66416);
var x_66418 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66315_66417__$1,cljs.core.cst$kw$x);
var y_66419 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66315_66417__$1,cljs.core.cst$kw$y);
var action_66420 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66315_66417__$1,cljs.core.cst$kw$action);
var map__66316_66421 = action_66420;
var map__66316_66422__$1 = ((((!((map__66316_66421 == null)))?((((map__66316_66421.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66316_66421.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66316_66421):map__66316_66421);
var dx_66423 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66316_66422__$1,cljs.core.cst$kw$dx);
var dy_66424 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66316_66422__$1,cljs.core.cst$kw$dy);
monet.canvas.fill_style(ctx,(((q_66415 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_66415));

if((dx_66423 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66418 - 0.25),y_66419,0.25,(1));
} else {
if((dx_66423 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_66418 + (1)),y_66419,0.25,(1));
} else {
if((dy_66424 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66418,(y_66419 - 0.25),(1),0.25);
} else {
if((dy_66424 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_66418,(y_66419 + (1)),(1),0.25);
} else {
}
}
}
}

var G__66425 = cljs.core.next(seq__66303_66407__$1);
var G__66426 = null;
var G__66427 = (0);
var G__66428 = (0);
seq__66303_66386 = G__66425;
chunk__66305_66387 = G__66426;
count__66306_66388 = G__66427;
i__66307_66389 = G__66428;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,(1));

var x_EQ__66429 = (0.5 + cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval));
var y_EQ__66430 = (0.5 + cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval));
var dx_1_66431 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var dy_1_66432 = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var dx_66433 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var dy_66434 = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
monet.canvas.stroke_style(ctx,"black");

org.numenta.sanity.plots_canvas.line_BANG_(plot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x_EQ__66429 - dx_1_66431),(y_EQ__66430 - dy_1_66432)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_EQ__66429,y_EQ__66430], null)], null));

monet.canvas.stroke_style(ctx,"#888");

org.numenta.sanity.plots_canvas.line_BANG_(plot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_EQ__66429,y_EQ__66430], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x_EQ__66429 + dx_66433),(y_EQ__66430 + dy_66434)], null)], null));

monet.canvas.stroke_style(ctx,"#888");

monet.canvas.fill_style(ctx,"white");

org.numenta.sanity.plots_canvas.point_BANG_(plot,(x_EQ__66429 - dx_1_66431),(y_EQ__66430 - dy_1_66432),(3));

monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"yellow");

org.numenta.sanity.plots_canvas.point_BANG_(plot,x_EQ__66429,y_EQ__66430,(4));

monet.canvas.stroke_style(ctx,"black");

return org.numenta.sanity.plots_canvas.grid_BANG_(plot,cljs.core.PersistentArrayMap.EMPTY);
});
org.numenta.sanity.demos.q_learning_2d.signed_str = (function org$numenta$sanity$demos$q_learning_2d$signed_str(x){
return [cljs.core.str((((x < (0)))?"":"+")),cljs.core.str(x)].join('');
});
org.numenta.sanity.demos.q_learning_2d.world_pane = (function org$numenta$sanity$demos$q_learning_2d$world_pane(){
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$q_DASH_learning_DASH_2d_SLASH_fetch_DASH_selected_DASH_htm,((function (selected_htm){
return (function (_,___$1,___$2,p__66450){
var vec__66451 = p__66450;
var sel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66451,(0),null);
var temp__4653__auto__ = cljs.core.cst$kw$model_DASH_id.cljs$core$IFn$_invoke$arity$1(sel);
if(cljs.core.truth_(temp__4653__auto__)){
var model_id = temp__4653__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",model_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__66451,sel,selected_htm){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__66451,sel,selected_htm){
return (function (state_66456){
var state_val_66457 = (state_66456[(1)]);
if((state_val_66457 === (1))){
var state_66456__$1 = state_66456;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66456__$1,(2),out_c);
} else {
if((state_val_66457 === (2))){
var inst_66453 = (state_66456[(2)]);
var inst_66454 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_66453) : cljs.core.reset_BANG_.call(null,selected_htm,inst_66453));
var state_66456__$1 = state_66456;
return cljs.core.async.impl.ioc_helpers.return_chan(state_66456__$1,inst_66454);
} else {
return null;
}
}
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__66451,sel,selected_htm))
;
return ((function (switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__66451,sel,selected_htm){
return (function() {
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto____0 = (function (){
var statearr_66461 = [null,null,null,null,null,null,null];
(statearr_66461[(0)] = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto__);

(statearr_66461[(1)] = (1));

return statearr_66461;
});
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto____1 = (function (state_66456){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_66456);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e66462){if((e66462 instanceof Object)){
var ex__36044__auto__ = e66462;
var statearr_66463_66465 = state_66456;
(statearr_66463_66465[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66456);

return cljs.core.cst$kw$recur;
} else {
throw e66462;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__66466 = state_66456;
state_66456 = G__66466;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto__ = function(state_66456){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto____1.call(this,state_66456);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto____0;
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__66451,sel,selected_htm))
})();
var state__36156__auto__ = (function (){var statearr_66464 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_66464[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_66464;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,out_c,model_id,temp__4653__auto__,vec__66451,sel,selected_htm))
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
var c__36154__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__36154__auto__,init_QMARK_){
return (function (){
var f__36155__auto__ = (function (){var switch__36040__auto__ = ((function (c__36154__auto__,init_QMARK_){
return (function (state_66524){
var state_val_66525 = (state_66524[(1)]);
if((state_val_66525 === (1))){
var state_66524__$1 = state_66524;
if(init_QMARK_){
var statearr_66526_66543 = state_66524__$1;
(statearr_66526_66543[(1)] = (2));

} else {
var statearr_66527_66544 = state_66524__$1;
(statearr_66527_66544[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66525 === (2))){
var state_66524__$1 = state_66524;
var statearr_66528_66545 = state_66524__$1;
(statearr_66528_66545[(2)] = null);

(statearr_66528_66545[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66525 === (3))){
var state_66524__$1 = state_66524;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66524__$1,(5),org.numenta.sanity.demos.q_learning_2d.world_c);
} else {
if((state_val_66525 === (4))){
var inst_66510 = (state_66524[(2)]);
var inst_66511 = org.nfrac.comportex.demos.q_learning_2d.make_model();
var inst_66512 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_2d.model,inst_66511) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.demos.q_learning_2d.model,inst_66511));
var state_66524__$1 = (function (){var statearr_66529 = state_66524;
(statearr_66529[(7)] = inst_66510);

(statearr_66529[(8)] = inst_66512);

return statearr_66529;
})();
if(init_QMARK_){
var statearr_66530_66546 = state_66524__$1;
(statearr_66530_66546[(1)] = (6));

} else {
var statearr_66531_66547 = state_66524__$1;
(statearr_66531_66547[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66525 === (5))){
var inst_66508 = (state_66524[(2)]);
var state_66524__$1 = state_66524;
var statearr_66532_66548 = state_66524__$1;
(statearr_66532_66548[(2)] = inst_66508);

(statearr_66532_66548[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66525 === (6))){
var inst_66514 = org.nfrac.comportex.demos.q_learning_2d.htm_step_with_action_selection(org.numenta.sanity.demos.q_learning_2d.world_c);
var inst_66515 = org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(org.numenta.sanity.demos.q_learning_2d.model,org.numenta.sanity.demos.q_learning_2d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.q_learning_2d.into_sim,inst_66514);
var state_66524__$1 = state_66524;
var statearr_66533_66549 = state_66524__$1;
(statearr_66533_66549[(2)] = inst_66515);

(statearr_66533_66549[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66525 === (7))){
var inst_66517 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_2d.model));
var inst_66518 = org.numenta.sanity.comportex.data.step_template_data(inst_66517);
var inst_66519 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.step_template,inst_66518) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.step_template,inst_66518));
var state_66524__$1 = state_66524;
var statearr_66534_66550 = state_66524__$1;
(statearr_66534_66550[(2)] = inst_66519);

(statearr_66534_66550[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66525 === (8))){
var inst_66521 = (state_66524[(2)]);
var inst_66522 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_2d.world_c,org.nfrac.comportex.demos.q_learning_2d.initial_inval);
var state_66524__$1 = (function (){var statearr_66535 = state_66524;
(statearr_66535[(9)] = inst_66521);

return statearr_66535;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_66524__$1,inst_66522);
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
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto__ = null;
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto____0 = (function (){
var statearr_66539 = [null,null,null,null,null,null,null,null,null,null];
(statearr_66539[(0)] = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto__);

(statearr_66539[(1)] = (1));

return statearr_66539;
});
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto____1 = (function (state_66524){
while(true){
var ret_value__36042__auto__ = (function (){try{while(true){
var result__36043__auto__ = switch__36040__auto__(state_66524);
if(cljs.core.keyword_identical_QMARK_(result__36043__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__36043__auto__;
}
break;
}
}catch (e66540){if((e66540 instanceof Object)){
var ex__36044__auto__ = e66540;
var statearr_66541_66551 = state_66524;
(statearr_66541_66551[(5)] = ex__36044__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66524);

return cljs.core.cst$kw$recur;
} else {
throw e66540;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36042__auto__,cljs.core.cst$kw$recur)){
var G__66552 = state_66524;
state_66524 = G__66552;
continue;
} else {
return ret_value__36042__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto__ = function(state_66524){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto____1.call(this,state_66524);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto____0;
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto____1;
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__36041__auto__;
})()
;})(switch__36040__auto__,c__36154__auto__,init_QMARK_))
})();
var state__36156__auto__ = (function (){var statearr_66542 = (f__36155__auto__.cljs$core$IFn$_invoke$arity$0 ? f__36155__auto__.cljs$core$IFn$_invoke$arity$0() : f__36155__auto__.call(null));
(statearr_66542[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__36154__auto__);

return statearr_66542;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__36156__auto__);
});})(c__36154__auto__,init_QMARK_))
);

return c__36154__auto__;
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
