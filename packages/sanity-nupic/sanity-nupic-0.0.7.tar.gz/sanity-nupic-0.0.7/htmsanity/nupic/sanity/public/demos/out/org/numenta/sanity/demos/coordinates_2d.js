// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.coordinates_2d');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.coordinates_2d');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('monet.canvas');
org.numenta.sanity.demos.coordinates_2d.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$n_DASH_regions,(1)], null));
org.numenta.sanity.demos.coordinates_2d.quadrant = (function org$numenta$sanity$demos$coordinates_2d$quadrant(inval){
return [cljs.core.str((((cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval) > (0)))?"S":"N")),cljs.core.str((((cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval) > (0)))?"E":"W"))].join('');
});
org.numenta.sanity.demos.coordinates_2d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((50),(function (p1__66232_SHARP_){
return cljs.core.select_keys(p1__66232_SHARP_,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x,cljs.core.cst$kw$y,cljs.core.cst$kw$vx,cljs.core.cst$kw$vy], null));
}),cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__66233_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__66233_SHARP_,cljs.core.cst$kw$label,org.numenta.sanity.demos.coordinates_2d.quadrant(p1__66233_SHARP_));
}))));
org.numenta.sanity.demos.coordinates_2d.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.coordinates_2d.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.coordinates_2d.control_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
/**
 * Feed the world channel continuously, reacting to UI settings.
 */
org.numenta.sanity.demos.coordinates_2d.feed_world_BANG_ = (function org$numenta$sanity$demos$coordinates_2d$feed_world_BANG_(){
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__){
return (function (state_66314){
var state_val_66315 = (state_66314[(1)]);
if((state_val_66315 === (7))){
var inst_66297 = (state_66314[(2)]);
var inst_66298 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_66297,(0),null);
var inst_66299 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_66297,(1),null);
var inst_66300 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_66299,org.numenta.sanity.demos.coordinates_2d.control_c);
var state_66314__$1 = (function (){var statearr_66316 = state_66314;
(statearr_66316[(7)] = inst_66298);

return statearr_66316;
})();
if(inst_66300){
var statearr_66317_66336 = state_66314__$1;
(statearr_66317_66336[(1)] = (8));

} else {
var statearr_66318_66337 = state_66314__$1;
(statearr_66318_66337[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66315 === (1))){
var inst_66285 = org.nfrac.comportex.demos.coordinates_2d.initial_input_val;
var state_66314__$1 = (function (){var statearr_66319 = state_66314;
(statearr_66319[(8)] = inst_66285);

return statearr_66319;
})();
var statearr_66320_66338 = state_66314__$1;
(statearr_66320_66338[(2)] = null);

(statearr_66320_66338[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66315 === (4))){
var inst_66285 = (state_66314[(8)]);
var inst_66288 = (state_66314[(2)]);
var inst_66289 = cljs.core.async.timeout((50));
var inst_66290 = inst_66285;
var state_66314__$1 = (function (){var statearr_66321 = state_66314;
(statearr_66321[(9)] = inst_66290);

(statearr_66321[(10)] = inst_66289);

(statearr_66321[(11)] = inst_66288);

return statearr_66321;
})();
var statearr_66322_66339 = state_66314__$1;
(statearr_66322_66339[(2)] = null);

(statearr_66322_66339[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66315 === (6))){
var inst_66308 = (state_66314[(2)]);
var inst_66309 = org.nfrac.comportex.demos.coordinates_2d.input_transform(inst_66308);
var inst_66285 = inst_66309;
var state_66314__$1 = (function (){var statearr_66323 = state_66314;
(statearr_66323[(8)] = inst_66285);

return statearr_66323;
})();
var statearr_66324_66340 = state_66314__$1;
(statearr_66324_66340[(2)] = null);

(statearr_66324_66340[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66315 === (3))){
var inst_66312 = (state_66314[(2)]);
var state_66314__$1 = state_66314;
return cljs.core.async.impl.ioc_helpers.return_chan(state_66314__$1,inst_66312);
} else {
if((state_val_66315 === (2))){
var inst_66285 = (state_66314[(8)]);
var state_66314__$1 = state_66314;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_66314__$1,(4),org.numenta.sanity.demos.coordinates_2d.world_c,inst_66285);
} else {
if((state_val_66315 === (9))){
var inst_66290 = (state_66314[(9)]);
var state_66314__$1 = state_66314;
var statearr_66325_66341 = state_66314__$1;
(statearr_66325_66341[(2)] = inst_66290);

(statearr_66325_66341[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66315 === (5))){
var inst_66289 = (state_66314[(10)]);
var inst_66293 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_66294 = [org.numenta.sanity.demos.coordinates_2d.control_c,inst_66289];
var inst_66295 = (new cljs.core.PersistentVector(null,2,(5),inst_66293,inst_66294,null));
var state_66314__$1 = state_66314;
return cljs.core.async.ioc_alts_BANG_(state_66314__$1,(7),inst_66295);
} else {
if((state_val_66315 === (10))){
var inst_66306 = (state_66314[(2)]);
var state_66314__$1 = state_66314;
var statearr_66326_66342 = state_66314__$1;
(statearr_66326_66342[(2)] = inst_66306);

(statearr_66326_66342[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66315 === (8))){
var inst_66290 = (state_66314[(9)]);
var inst_66298 = (state_66314[(7)]);
var inst_66302 = (inst_66298.cljs$core$IFn$_invoke$arity$1 ? inst_66298.cljs$core$IFn$_invoke$arity$1(inst_66290) : inst_66298.call(null,inst_66290));
var inst_66290__$1 = inst_66302;
var state_66314__$1 = (function (){var statearr_66327 = state_66314;
(statearr_66327[(9)] = inst_66290__$1);

return statearr_66327;
})();
var statearr_66328_66343 = state_66314__$1;
(statearr_66328_66343[(2)] = null);

(statearr_66328_66343[(1)] = (5));


return cljs.core.cst$kw$recur;
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
}
}
});})(c__35961__auto__))
;
return ((function (switch__35847__auto__,c__35961__auto__){
return (function() {
var org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_66332 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_66332[(0)] = org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto__);

(statearr_66332[(1)] = (1));

return statearr_66332;
});
var org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto____1 = (function (state_66314){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66314);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66333){if((e66333 instanceof Object)){
var ex__35851__auto__ = e66333;
var statearr_66334_66344 = state_66314;
(statearr_66334_66344[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66314);

return cljs.core.cst$kw$recur;
} else {
throw e66333;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66345 = state_66314;
state_66314 = G__66345;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto__ = function(state_66314){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto____1.call(this,state_66314);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__))
})();
var state__35963__auto__ = (function (){var statearr_66335 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66335[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_66335;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__))
);

return c__35961__auto__;
});
org.numenta.sanity.demos.coordinates_2d.draw_arrow = (function org$numenta$sanity$demos$coordinates_2d$draw_arrow(ctx,p__66346){
var map__66349 = p__66346;
var map__66349__$1 = ((((!((map__66349 == null)))?((((map__66349.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66349.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66349):map__66349);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66349__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66349__$1,cljs.core.cst$kw$y);
var angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66349__$1,cljs.core.cst$kw$angle);
monet.canvas.save(ctx);

monet.canvas.translate(ctx,x,y);

monet.canvas.rotate(ctx,angle);

monet.canvas.begin_path(ctx);

monet.canvas.move_to(ctx,(5),(0));

monet.canvas.line_to(ctx,(-5),(3));

monet.canvas.line_to(ctx,(-5),(-3));

monet.canvas.line_to(ctx,(5),(0));

monet.canvas.fill(ctx);

monet.canvas.stroke(ctx);

return monet.canvas.restore(ctx);
});
org.numenta.sanity.demos.coordinates_2d.centred_rect = (function org$numenta$sanity$demos$coordinates_2d$centred_rect(cx,cy,w,h){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(cx - (w / (2))),cljs.core.cst$kw$y,(cy - (h / (2))),cljs.core.cst$kw$w,w,cljs.core.cst$kw$h,h], null);
});
org.numenta.sanity.demos.coordinates_2d.draw_world = (function org$numenta$sanity$demos$coordinates_2d$draw_world(ctx,in_value){
var max_pos = org.nfrac.comportex.demos.coordinates_2d.max_pos;
var radius = org.nfrac.comportex.demos.coordinates_2d.radius;
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- max_pos),max_pos], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- max_pos),max_pos], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var edge_px = (function (){var x__5020__auto__ = width_px;
var y__5021__auto__ = height_px;
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,edge_px,cljs.core.cst$kw$h,edge_px], null);
var plot = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
var map__66363 = in_value;
var map__66363__$1 = ((((!((map__66363 == null)))?((((map__66363.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66363.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66363):map__66363);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66363__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66363__$1,cljs.core.cst$kw$y);
var vx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66363__$1,cljs.core.cst$kw$vx);
var vy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66363__$1,cljs.core.cst$kw$vy);
var history = cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(in_value));
var r_px = ((x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1(radius) : x_scale.call(null,radius)) - (x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1((0)) : x_scale.call(null,(0))));
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

org.numenta.sanity.plots_canvas.frame_BANG_(plot);

monet.canvas.stroke_style(ctx,"lightgray");

org.numenta.sanity.plots_canvas.grid_BANG_(plot,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$grid_DASH_every,(2)], null));

monet.canvas.stroke_style(ctx,"black");

org.numenta.sanity.plots_canvas.draw_grid(ctx,cljs.core.map.cljs$core$IFn$_invoke$arity$2(x_scale,x_lim),cljs.core.map.cljs$core$IFn$_invoke$arity$2(y_scale,y_lim),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1((0)) : x_scale.call(null,(0))))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1((0)) : y_scale.call(null,(0))))], null));

monet.canvas.fill_style(ctx,"rgba(255,0,0,0.25)");

monet.canvas.fill_rect(ctx,org.numenta.sanity.demos.coordinates_2d.centred_rect((x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1(x) : x_scale.call(null,x)),(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y) : y_scale.call(null,y)),((2) * r_px),((2) * r_px)));

monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"yellow");

var seq__66365 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,history));
var chunk__66366 = null;
var count__66367 = (0);
var i__66368 = (0);
while(true){
if((i__66368 < count__66367)){
var vec__66369 = chunk__66366.cljs$core$IIndexed$_nth$arity$2(null,i__66368);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66369,(0),null);
var map__66370 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66369,(1),null);
var map__66370__$1 = ((((!((map__66370 == null)))?((((map__66370.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66370.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66370):map__66370);
var x__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66370__$1,cljs.core.cst$kw$x);
var y__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66370__$1,cljs.core.cst$kw$y);
var vx__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66370__$1,cljs.core.cst$kw$vx);
var vy__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66370__$1,cljs.core.cst$kw$vy);
if(((i + (1)) === cljs.core.count(history))){
monet.canvas.alpha(ctx,(1));
} else {
monet.canvas.alpha(ctx,(((i + (1)) / cljs.core.count(history)) / (2)));
}

org.numenta.sanity.demos.coordinates_2d.draw_arrow(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1(x__$1) : x_scale.call(null,x__$1)),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y__$1) : y_scale.call(null,y__$1)),cljs.core.cst$kw$angle,Math.atan2(vy__$1,vx__$1)], null));

var G__66375 = seq__66365;
var G__66376 = chunk__66366;
var G__66377 = count__66367;
var G__66378 = (i__66368 + (1));
seq__66365 = G__66375;
chunk__66366 = G__66376;
count__66367 = G__66377;
i__66368 = G__66378;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__66365);
if(temp__4653__auto__){
var seq__66365__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__66365__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__66365__$1);
var G__66379 = cljs.core.chunk_rest(seq__66365__$1);
var G__66380 = c__5485__auto__;
var G__66381 = cljs.core.count(c__5485__auto__);
var G__66382 = (0);
seq__66365 = G__66379;
chunk__66366 = G__66380;
count__66367 = G__66381;
i__66368 = G__66382;
continue;
} else {
var vec__66372 = cljs.core.first(seq__66365__$1);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66372,(0),null);
var map__66373 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66372,(1),null);
var map__66373__$1 = ((((!((map__66373 == null)))?((((map__66373.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66373.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66373):map__66373);
var x__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66373__$1,cljs.core.cst$kw$x);
var y__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66373__$1,cljs.core.cst$kw$y);
var vx__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66373__$1,cljs.core.cst$kw$vx);
var vy__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66373__$1,cljs.core.cst$kw$vy);
if(((i + (1)) === cljs.core.count(history))){
monet.canvas.alpha(ctx,(1));
} else {
monet.canvas.alpha(ctx,(((i + (1)) / cljs.core.count(history)) / (2)));
}

org.numenta.sanity.demos.coordinates_2d.draw_arrow(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1(x__$1) : x_scale.call(null,x__$1)),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y__$1) : y_scale.call(null,y__$1)),cljs.core.cst$kw$angle,Math.atan2(vy__$1,vx__$1)], null));

var G__66383 = cljs.core.next(seq__66365__$1);
var G__66384 = null;
var G__66385 = (0);
var G__66386 = (0);
seq__66365 = G__66383;
chunk__66366 = G__66384;
count__66367 = G__66385;
i__66368 = G__66386;
continue;
}
} else {
return null;
}
}
break;
}
});
org.numenta.sanity.demos.coordinates_2d.world_pane = (function org$numenta$sanity$demos$coordinates_2d$world_pane(){
var temp__4653__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4653__auto__)){
var step = temp__4653__auto__;
var in_value = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
var map__66389 = in_value;
var map__66389__$1 = ((((!((map__66389 == null)))?((((map__66389.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66389.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66389):map__66389);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66389__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66389__$1,cljs.core.cst$kw$y);
var vx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66389__$1,cljs.core.cst$kw$vx);
var vy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66389__$1,cljs.core.cst$kw$vy);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"x"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,x], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"y"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,y], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"300px"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (in_value,map__66389,map__66389__$1,x,y,vx,vy,step,temp__4653__auto__){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var in_value__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.coordinates_2d.draw_world(ctx,in_value__$1);
});})(in_value,map__66389,map__66389__$1,x,y,vx,vy,step,temp__4653__auto__))
,null], null)], null);
} else {
return null;
}
});
org.numenta.sanity.demos.coordinates_2d.set_model_BANG_ = (function org$numenta$sanity$demos$coordinates_2d$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.coordinates_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.coordinates_2d.model)) == null);
var G__66395_66399 = org.numenta.sanity.demos.coordinates_2d.model;
var G__66396_66400 = org.nfrac.comportex.demos.coordinates_2d.n_region_model.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$n_DASH_regions.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.coordinates_2d.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.coordinates_2d.config))));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__66395_66399,G__66396_66400) : cljs.core.reset_BANG_.call(null,G__66395_66399,G__66396_66400));

if(init_QMARK_){
org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.coordinates_2d.model,org.numenta.sanity.demos.coordinates_2d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.coordinates_2d.into_sim);
} else {
var G__66397_66401 = org.numenta.sanity.main.step_template;
var G__66398_66402 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.coordinates_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.coordinates_2d.model)));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__66397_66401,G__66398_66402) : cljs.core.reset_BANG_.call(null,G__66397_66401,G__66398_66402));
}

if(init_QMARK_){
return org.numenta.sanity.demos.coordinates_2d.feed_world_BANG_();
} else {
return null;
}
}));
});
org.numenta.sanity.demos.coordinates_2d.config_template = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of regions:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_regions], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.coordinates_2d.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null);
org.numenta.sanity.demos.coordinates_2d.model_tab = (function org$numenta$sanity$demos$coordinates_2d$model_tab(){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A simple example of the coordinate encoder in 2\n    dimensions, on a repeating path."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The coordinate is on a 90x90 integer grid and has a\n    locality radius of 15 units. It maintains position, velocity\n    and acceleration. Velocity is limited to 5 units per timestep.\n    When the point crosses the horizontal axis, its vertical\n    acceleration is reversed; when it crosses the vertical axis,\n    its horizontal acceleration is reversed."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.coordinates_2d.config_template,org.numenta.sanity.demos.coordinates_2d.config], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Interference with the movement path"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.coordinates_2d.control_c,(function (p1__66403_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(p1__66403_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ay], null),cljs.core.dec);
}));

return e.preventDefault();
})], null),"Turn up"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.coordinates_2d.control_c,(function (p1__66404_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(p1__66404_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ay], null),cljs.core.inc);
}));

return e.preventDefault();
})], null),"Turn down"], null)], null)], null)], null)], null);
});
org.numenta.sanity.demos.coordinates_2d.init = (function org$numenta$sanity$demos$coordinates_2d$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.coordinates_2d.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.coordinates_2d.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.coordinates_2d.into_sim], null),goog.dom.getElement("sanity-app"));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$two_DASH_d);

return org.numenta.sanity.demos.coordinates_2d.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.coordinates_2d.init', org.numenta.sanity.demos.coordinates_2d.init);
