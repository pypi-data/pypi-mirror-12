// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.sensorimotor_1d');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.sensorimotor_1d');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('monet.canvas');
org.numenta.sanity.demos.sensorimotor_1d.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$n_DASH_regions,(1),cljs.core.cst$kw$field,cljs.core.cst$kw$abcdefghij,cljs.core.cst$kw$n_DASH_steps,(100),cljs.core.cst$kw$world_DASH_buffer_DASH_count,(0)], null));
org.numenta.sanity.demos.sensorimotor_1d.world_buffer = cljs.core.async.buffer((5000));
org.numenta.sanity.demos.sensorimotor_1d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.sensorimotor_1d.world_buffer,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__66790_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__66790_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(p1__66790_SHARP_));
})));
org.numenta.sanity.demos.sensorimotor_1d.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.sensorimotor_1d.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.demos.sensorimotor_1d.model,cljs.core.cst$kw$org$numenta$sanity$demos$sensorimotor_DASH_1d_SLASH_count_DASH_world_DASH_buffer,(function (_,___$1,___$2,___$3){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer));
}));
org.numenta.sanity.demos.sensorimotor_1d.item_colors = cljs.core.zipmap(org.nfrac.comportex.demos.sensorimotor_1d.items,(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$sensorimotor_1d$iter__66791(s__66792){
return (new cljs.core.LazySeq(null,(function (){
var s__66792__$1 = s__66792;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__66792__$1);
if(temp__4653__auto__){
var s__66792__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__66792__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66792__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66794 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66793 = (0);
while(true){
if((i__66793 < size__5453__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66793);
var hue = (i * (36));
var lig = ((cljs.core.even_QMARK_(i))?(70):(30));
cljs.core.chunk_append(b__66794,[cljs.core.str("hsl("),cljs.core.str(hue),cljs.core.str(",100%,"),cljs.core.str(lig),cljs.core.str("%)")].join(''));

var G__66797 = (i__66793 + (1));
i__66793 = G__66797;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66794),org$numenta$sanity$demos$sensorimotor_1d$iter__66791(cljs.core.chunk_rest(s__66792__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66794),null);
}
} else {
var i = cljs.core.first(s__66792__$2);
var hue = (i * (36));
var lig = ((cljs.core.even_QMARK_(i))?(70):(30));
return cljs.core.cons([cljs.core.str("hsl("),cljs.core.str(hue),cljs.core.str(",100%,"),cljs.core.str(lig),cljs.core.str("%)")].join(''),org$numenta$sanity$demos$sensorimotor_1d$iter__66791(cljs.core.rest(s__66792__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})());
org.numenta.sanity.demos.sensorimotor_1d.item_text_colors = cljs.core.zipmap(org.nfrac.comportex.demos.sensorimotor_1d.items,(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$sensorimotor_1d$iter__66798(s__66799){
return (new cljs.core.LazySeq(null,(function (){
var s__66799__$1 = s__66799;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__66799__$1);
if(temp__4653__auto__){
var s__66799__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__66799__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66799__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66801 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66800 = (0);
while(true){
if((i__66800 < size__5453__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66800);
cljs.core.chunk_append(b__66801,((cljs.core.even_QMARK_(i))?"black":"white"));

var G__66804 = (i__66800 + (1));
i__66800 = G__66804;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66801),org$numenta$sanity$demos$sensorimotor_1d$iter__66798(cljs.core.chunk_rest(s__66799__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66801),null);
}
} else {
var i = cljs.core.first(s__66799__$2);
return cljs.core.cons(((cljs.core.even_QMARK_(i))?"black":"white"),org$numenta$sanity$demos$sensorimotor_1d$iter__66798(cljs.core.rest(s__66799__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})());
org.numenta.sanity.demos.sensorimotor_1d.draw_eye = (function org$numenta$sanity$demos$sensorimotor_1d$draw_eye(ctx,p__66805){
var map__66808 = p__66805;
var map__66808__$1 = ((((!((map__66808 == null)))?((((map__66808.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66808.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66808):map__66808);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66808__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66808__$1,cljs.core.cst$kw$y);
var angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66808__$1,cljs.core.cst$kw$angle);
var radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66808__$1,cljs.core.cst$kw$radius);
monet.canvas.save(ctx);

var pi2_66810 = (Math.PI / (2));
monet.canvas.begin_path(ctx);

monet.canvas.arc(ctx,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y,cljs.core.cst$kw$r,radius,cljs.core.cst$kw$start_DASH_angle,(- pi2_66810),cljs.core.cst$kw$end_DASH_angle,pi2_66810,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_,true], null));

monet.canvas.close_path(ctx);

monet.canvas.fill_style(ctx,"white");

monet.canvas.fill(ctx);

monet.canvas.stroke_style(ctx,"black");

monet.canvas.stroke(ctx);

monet.canvas.clip(ctx);

var pupil_x_66811 = (x + (radius * Math.cos(angle)));
var pupil_y_66812 = (y + (radius * Math.sin(angle)));
monet.canvas.circle(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,pupil_x_66811,cljs.core.cst$kw$y,pupil_y_66812,cljs.core.cst$kw$r,cljs.core.quot(radius,(2))], null));

monet.canvas.fill_style(ctx,"rgb(128,128,255)");

monet.canvas.fill(ctx);

monet.canvas.circle(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,pupil_x_66811,cljs.core.cst$kw$y,pupil_y_66812,cljs.core.cst$kw$r,cljs.core.quot(radius,(5))], null));

monet.canvas.fill_style(ctx,"black");

monet.canvas.fill(ctx);

return monet.canvas.restore(ctx);
});
org.numenta.sanity.demos.sensorimotor_1d.draw_world = (function org$numenta$sanity$demos$sensorimotor_1d$draw_world(ctx,in_value){
var map__66832 = in_value;
var map__66832__$1 = ((((!((map__66832 == null)))?((((map__66832.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66832.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66832):map__66832);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66832__$1,cljs.core.cst$kw$field);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66832__$1,cljs.core.cst$kw$position);
var next_saccade = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66832__$1,cljs.core.cst$kw$next_DASH_saccade);
var item_w = (20);
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.count(field)], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,(cljs.core.count(field) * item_w)], null);
var plot = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

org.numenta.sanity.plots_canvas.frame_BANG_(plot);

monet.canvas.stroke_style(ctx,"black");

monet.canvas.font_style(ctx,"bold 14px monospace");

monet.canvas.text_baseline(ctx,cljs.core.cst$kw$middle);

var seq__66834_66851 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,field));
var chunk__66836_66852 = null;
var count__66837_66853 = (0);
var i__66838_66854 = (0);
while(true){
if((i__66838_66854 < count__66837_66853)){
var vec__66840_66855 = chunk__66836_66852.cljs$core$IIndexed$_nth$arity$2(null,i__66838_66854);
var y_66856 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66840_66855,(0),null);
var item_66857 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66840_66855,(1),null);
var rect_66858 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y_66856) : y_scale.call(null,y_66856)),cljs.core.cst$kw$w,item_w,cljs.core.cst$kw$h,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1((1)) : y_scale.call(null,(1)))], null);
var G__66841_66859 = ctx;
monet.canvas.fill_style(G__66841_66859,(org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1(item_66857) : org.numenta.sanity.demos.sensorimotor_1d.item_colors.call(null,item_66857)));

monet.canvas.fill_rect(G__66841_66859,rect_66858);

monet.canvas.stroke_rect(G__66841_66859,rect_66858);

monet.canvas.fill_style(G__66841_66859,(org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1(item_66857) : org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.call(null,item_66857)));

monet.canvas.text(G__66841_66859,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__66842 = (y_66856 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__66842) : y_scale.call(null,G__66842));
})(),cljs.core.cst$kw$text,cljs.core.name(item_66857)], null));


var G__66860 = seq__66834_66851;
var G__66861 = chunk__66836_66852;
var G__66862 = count__66837_66853;
var G__66863 = (i__66838_66854 + (1));
seq__66834_66851 = G__66860;
chunk__66836_66852 = G__66861;
count__66837_66853 = G__66862;
i__66838_66854 = G__66863;
continue;
} else {
var temp__4653__auto___66864 = cljs.core.seq(seq__66834_66851);
if(temp__4653__auto___66864){
var seq__66834_66865__$1 = temp__4653__auto___66864;
if(cljs.core.chunked_seq_QMARK_(seq__66834_66865__$1)){
var c__5485__auto___66866 = cljs.core.chunk_first(seq__66834_66865__$1);
var G__66867 = cljs.core.chunk_rest(seq__66834_66865__$1);
var G__66868 = c__5485__auto___66866;
var G__66869 = cljs.core.count(c__5485__auto___66866);
var G__66870 = (0);
seq__66834_66851 = G__66867;
chunk__66836_66852 = G__66868;
count__66837_66853 = G__66869;
i__66838_66854 = G__66870;
continue;
} else {
var vec__66843_66871 = cljs.core.first(seq__66834_66865__$1);
var y_66872 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66843_66871,(0),null);
var item_66873 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66843_66871,(1),null);
var rect_66874 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y_66872) : y_scale.call(null,y_66872)),cljs.core.cst$kw$w,item_w,cljs.core.cst$kw$h,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1((1)) : y_scale.call(null,(1)))], null);
var G__66844_66875 = ctx;
monet.canvas.fill_style(G__66844_66875,(org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1(item_66873) : org.numenta.sanity.demos.sensorimotor_1d.item_colors.call(null,item_66873)));

monet.canvas.fill_rect(G__66844_66875,rect_66874);

monet.canvas.stroke_rect(G__66844_66875,rect_66874);

monet.canvas.fill_style(G__66844_66875,(org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1(item_66873) : org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.call(null,item_66873)));

monet.canvas.text(G__66844_66875,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__66845 = (y_66872 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__66845) : y_scale.call(null,G__66845));
})(),cljs.core.cst$kw$text,cljs.core.name(item_66873)], null));


var G__66876 = cljs.core.next(seq__66834_66865__$1);
var G__66877 = null;
var G__66878 = (0);
var G__66879 = (0);
seq__66834_66851 = G__66876;
chunk__66836_66852 = G__66877;
count__66837_66853 = G__66878;
i__66838_66854 = G__66879;
continue;
}
} else {
}
}
break;
}

var focus_x = (10);
var focus_y = (function (){var G__66846 = (0.5 + position);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__66846) : y_scale.call(null,G__66846));
})();
var next_focus_y = (function (){var G__66847 = ((0.5 + position) + next_saccade);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__66847) : y_scale.call(null,G__66847));
})();
var eye_x = cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size);
var eye_y = cljs.core.quot(cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size),(2));
var G__66848 = ctx;
monet.canvas.begin_path(G__66848);

monet.canvas.move_to(G__66848,eye_x,eye_y);

monet.canvas.line_to(G__66848,focus_x,next_focus_y);

monet.canvas.stroke_style(G__66848,"lightgrey");

monet.canvas.stroke(G__66848);

monet.canvas.begin_path(G__66848);

monet.canvas.move_to(G__66848,eye_x,eye_y);

monet.canvas.line_to(G__66848,focus_x,focus_y);

monet.canvas.stroke_style(G__66848,"black");

monet.canvas.stroke(G__66848);

org.numenta.sanity.demos.sensorimotor_1d.draw_eye(G__66848,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,eye_x,cljs.core.cst$kw$y,eye_y,cljs.core.cst$kw$angle,(function (){var G__66849 = (focus_y - eye_y);
var G__66850 = (focus_x - eye_x);
return Math.atan2(G__66849,G__66850);
})(),cljs.core.cst$kw$radius,(30)], null));

return G__66848;
});
org.numenta.sanity.demos.sensorimotor_1d.world_pane = (function org$numenta$sanity$demos$sensorimotor_1d$world_pane(){
var temp__4653__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4653__auto__)){
var step = temp__4653__auto__;
var in_value = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
var map__66882 = in_value;
var map__66882__$1 = ((((!((map__66882 == null)))?((((map__66882.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66882.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66882):map__66882);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66882__$1,cljs.core.cst$kw$field);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66882__$1,cljs.core.cst$kw$position);
var next_saccade = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66882__$1,cljs.core.cst$kw$next_DASH_saccade);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"val"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str(cljs.core.get.cljs$core$IFn$_invoke$arity$2(field,position))].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"next"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,(((next_saccade < (0)))?"":"+"),next_saccade], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"300px"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (in_value,map__66882,map__66882__$1,field,position,next_saccade,step,temp__4653__auto__){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var in_value__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.sensorimotor_1d.draw_world(ctx,in_value__$1);
});})(in_value,map__66882,map__66882__$1,field,position,next_saccade,step,temp__4653__auto__))
,null], null)], null);
} else {
return null;
}
});
org.numenta.sanity.demos.sensorimotor_1d.seed_counter = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((0));
org.numenta.sanity.demos.sensorimotor_1d.send_input_stream_BANG_ = (function org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG_(){
var field_key = cljs.core.cst$kw$field.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.config)));
var n_steps = cljs.core.cst$kw$n_DASH_steps.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.config)));
var field = (org.nfrac.comportex.demos.sensorimotor_1d.fields.cljs$core$IFn$_invoke$arity$1 ? org.nfrac.comportex.demos.sensorimotor_1d.fields.cljs$core$IFn$_invoke$arity$1(field_key) : org.nfrac.comportex.demos.sensorimotor_1d.fields.call(null,field_key));
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,field_key,n_steps,field){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,field_key,n_steps,field){
return (function (state_66914){
var state_val_66915 = (state_66914[(1)]);
if((state_val_66915 === (1))){
var inst_66904 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.sensorimotor_1d.seed_counter,cljs.core.inc);
var inst_66905 = org.nfrac.comportex.demos.sensorimotor_1d.initial_world(field,inst_66904);
var inst_66906 = org.nfrac.comportex.demos.sensorimotor_1d.input_seq(inst_66905);
var inst_66907 = cljs.core.take.cljs$core$IFn$_invoke$arity$2(n_steps,inst_66906);
var inst_66908 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.sensorimotor_1d.world_c,inst_66907,false);
var state_66914__$1 = state_66914;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66914__$1,(2),inst_66908);
} else {
if((state_val_66915 === (2))){
var inst_66910 = (state_66914[(2)]);
var inst_66911 = cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer);
var inst_66912 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_66911);
var state_66914__$1 = (function (){var statearr_66916 = state_66914;
(statearr_66916[(7)] = inst_66910);

return statearr_66916;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_66914__$1,inst_66912);
} else {
return null;
}
}
});})(c__35961__auto__,field_key,n_steps,field))
;
return ((function (switch__35847__auto__,c__35961__auto__,field_key,n_steps,field){
return (function() {
var org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_66920 = [null,null,null,null,null,null,null,null];
(statearr_66920[(0)] = org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__);

(statearr_66920[(1)] = (1));

return statearr_66920;
});
var org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____1 = (function (state_66914){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66914);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66921){if((e66921 instanceof Object)){
var ex__35851__auto__ = e66921;
var statearr_66922_66924 = state_66914;
(statearr_66922_66924[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66914);

return cljs.core.cst$kw$recur;
} else {
throw e66921;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66925 = state_66914;
state_66914 = G__66925;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__ = function(state_66914){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____1.call(this,state_66914);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,field_key,n_steps,field))
})();
var state__35963__auto__ = (function (){var statearr_66923 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66923[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_66923;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,field_key,n_steps,field))
);

return c__35961__auto__;
});
org.numenta.sanity.demos.sensorimotor_1d.set_model_BANG_ = (function org$numenta$sanity$demos$sensorimotor_1d$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.model)) == null);
var G__66930_66934 = org.numenta.sanity.demos.sensorimotor_1d.model;
var G__66931_66935 = org.nfrac.comportex.demos.sensorimotor_1d.n_region_model.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$n_DASH_regions.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.config))));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__66930_66934,G__66931_66935) : cljs.core.reset_BANG_.call(null,G__66930_66934,G__66931_66935));

if(init_QMARK_){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.model,org.numenta.sanity.demos.sensorimotor_1d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.sensorimotor_1d.into_sim);
} else {
var G__66932 = org.numenta.sanity.main.step_template;
var G__66933 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.model)));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__66932,G__66933) : cljs.core.reset_BANG_.call(null,G__66932,G__66933));
}
}));
});
org.numenta.sanity.demos.sensorimotor_1d.config_template = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Sensorimotor sequences"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$postamble," queued input values."], null)], null)," ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__66936_SHARP_){
return (cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1(p1__66936_SHARP_) > (0));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_xs,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
var c__35961__auto___66983 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___66983){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___66983){
return (function (state_66956){
var state_val_66957 = (state_66956[(1)]);
if((state_val_66957 === (7))){
var inst_66942 = (state_66956[(2)]);
var state_66956__$1 = state_66956;
var statearr_66958_66984 = state_66956__$1;
(statearr_66958_66984[(2)] = inst_66942);

(statearr_66958_66984[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66957 === (1))){
var state_66956__$1 = state_66956;
var statearr_66959_66985 = state_66956__$1;
(statearr_66959_66985[(2)] = null);

(statearr_66959_66985[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66957 === (4))){
var state_66956__$1 = state_66956;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66956__$1,(7),org.numenta.sanity.demos.sensorimotor_1d.world_c);
} else {
if((state_val_66957 === (6))){
var inst_66945 = (state_66956[(2)]);
var state_66956__$1 = state_66956;
if(cljs.core.truth_(inst_66945)){
var statearr_66960_66986 = state_66956__$1;
(statearr_66960_66986[(1)] = (8));

} else {
var statearr_66961_66987 = state_66956__$1;
(statearr_66961_66987[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66957 === (3))){
var inst_66954 = (state_66956[(2)]);
var state_66956__$1 = state_66956;
return cljs.core.async.impl.ioc_helpers.return_chan(state_66956__$1,inst_66954);
} else {
if((state_val_66957 === (2))){
var inst_66939 = (state_66956[(7)]);
var inst_66938 = cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer);
var inst_66939__$1 = (inst_66938 > (0));
var state_66956__$1 = (function (){var statearr_66962 = state_66956;
(statearr_66962[(7)] = inst_66939__$1);

return statearr_66962;
})();
if(cljs.core.truth_(inst_66939__$1)){
var statearr_66963_66988 = state_66956__$1;
(statearr_66963_66988[(1)] = (4));

} else {
var statearr_66964_66989 = state_66956__$1;
(statearr_66964_66989[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66957 === (9))){
var state_66956__$1 = state_66956;
var statearr_66965_66990 = state_66956__$1;
(statearr_66965_66990[(2)] = null);

(statearr_66965_66990[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66957 === (5))){
var inst_66939 = (state_66956[(7)]);
var state_66956__$1 = state_66956;
var statearr_66966_66991 = state_66956__$1;
(statearr_66966_66991[(2)] = inst_66939);

(statearr_66966_66991[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66957 === (10))){
var inst_66952 = (state_66956[(2)]);
var state_66956__$1 = state_66956;
var statearr_66967_66992 = state_66956__$1;
(statearr_66967_66992[(2)] = inst_66952);

(statearr_66967_66992[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66957 === (8))){
var inst_66947 = cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer);
var inst_66948 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_66947);
var state_66956__$1 = (function (){var statearr_66968 = state_66956;
(statearr_66968[(8)] = inst_66948);

return statearr_66968;
})();
var statearr_66969_66993 = state_66956__$1;
(statearr_66969_66993[(2)] = null);

(statearr_66969_66993[(1)] = (2));


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
});})(c__35961__auto___66983))
;
return ((function (switch__35847__auto__,c__35961__auto___66983){
return (function() {
var org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____0 = (function (){
var statearr_66973 = [null,null,null,null,null,null,null,null,null];
(statearr_66973[(0)] = org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__);

(statearr_66973[(1)] = (1));

return statearr_66973;
});
var org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____1 = (function (state_66956){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66956);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66974){if((e66974 instanceof Object)){
var ex__35851__auto__ = e66974;
var statearr_66975_66994 = state_66956;
(statearr_66975_66994[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66956);

return cljs.core.cst$kw$recur;
} else {
throw e66974;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66995 = state_66956;
state_66956 = G__66995;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__ = function(state_66956){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____1.call(this,state_66956);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____0;
org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____1;
return org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___66983))
})();
var state__35963__auto__ = (function (){var statearr_66976 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66976[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___66983);

return statearr_66976;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___66983))
);


return e.preventDefault();
})], null),"Clear"], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Field of values (a world):"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$field], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$sensorimotor_1d$iter__66977(s__66978){
return (new cljs.core.LazySeq(null,(function (){
var s__66978__$1 = s__66978;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__66978__$1);
if(temp__4653__auto__){
var s__66978__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__66978__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66978__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66980 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66979 = (0);
while(true){
if((i__66979 < size__5453__auto__)){
var k = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66979);
cljs.core.chunk_append(b__66980,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null),cljs.core.name(k)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null)));

var G__66996 = (i__66979 + (1));
i__66979 = G__66996;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66980),org$numenta$sanity$demos$sensorimotor_1d$iter__66977(cljs.core.chunk_rest(s__66978__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66980),null);
}
} else {
var k = cljs.core.first(s__66978__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null),cljs.core.name(k)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null)),org$numenta$sanity$demos$sensorimotor_1d$iter__66977(cljs.core.rest(s__66978__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5454__auto__(cljs.core.keys(org.nfrac.comportex.demos.sensorimotor_1d.fields));
})()], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of steps:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_steps], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.sensorimotor_1d.send_input_stream_BANG_();

return e.preventDefault();
})], null),"Send input stream"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of regions:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_regions], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.sensorimotor_1d.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null)], null);
org.numenta.sanity.demos.sensorimotor_1d.model_tab = (function org$numenta$sanity$demos$sensorimotor_1d$model_tab(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A simple example of sensorimotor input in 1D."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.sensorimotor_1d.config_template,org.numenta.sanity.demos.sensorimotor_1d.config], null)], null);
});
org.numenta.sanity.demos.sensorimotor_1d.init = (function org$numenta$sanity$demos$sensorimotor_1d$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.sensorimotor_1d.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.sensorimotor_1d.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.sensorimotor_1d.into_sim], null),goog.dom.getElement("sanity-app"));

org.numenta.sanity.demos.sensorimotor_1d.send_input_stream_BANG_();

return org.numenta.sanity.demos.sensorimotor_1d.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.sensorimotor_1d.init', org.numenta.sanity.demos.sensorimotor_1d.init);
