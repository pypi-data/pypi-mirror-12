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
org.numenta.sanity.demos.sensorimotor_1d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.sensorimotor_1d.world_buffer,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__66792_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__66792_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(p1__66792_SHARP_));
})));
org.numenta.sanity.demos.sensorimotor_1d.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.sensorimotor_1d.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.demos.sensorimotor_1d.model,cljs.core.cst$kw$org$numenta$sanity$demos$sensorimotor_DASH_1d_SLASH_count_DASH_world_DASH_buffer,(function (_,___$1,___$2,___$3){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer));
}));
org.numenta.sanity.demos.sensorimotor_1d.item_colors = cljs.core.zipmap(org.nfrac.comportex.demos.sensorimotor_1d.items,(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$sensorimotor_1d$iter__66793(s__66794){
return (new cljs.core.LazySeq(null,(function (){
var s__66794__$1 = s__66794;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__66794__$1);
if(temp__4653__auto__){
var s__66794__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__66794__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66794__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66796 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66795 = (0);
while(true){
if((i__66795 < size__5453__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66795);
var hue = (i * (36));
var lig = ((cljs.core.even_QMARK_(i))?(70):(30));
cljs.core.chunk_append(b__66796,[cljs.core.str("hsl("),cljs.core.str(hue),cljs.core.str(",100%,"),cljs.core.str(lig),cljs.core.str("%)")].join(''));

var G__66799 = (i__66795 + (1));
i__66795 = G__66799;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66796),org$numenta$sanity$demos$sensorimotor_1d$iter__66793(cljs.core.chunk_rest(s__66794__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66796),null);
}
} else {
var i = cljs.core.first(s__66794__$2);
var hue = (i * (36));
var lig = ((cljs.core.even_QMARK_(i))?(70):(30));
return cljs.core.cons([cljs.core.str("hsl("),cljs.core.str(hue),cljs.core.str(",100%,"),cljs.core.str(lig),cljs.core.str("%)")].join(''),org$numenta$sanity$demos$sensorimotor_1d$iter__66793(cljs.core.rest(s__66794__$2)));
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
org.numenta.sanity.demos.sensorimotor_1d.item_text_colors = cljs.core.zipmap(org.nfrac.comportex.demos.sensorimotor_1d.items,(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$sensorimotor_1d$iter__66800(s__66801){
return (new cljs.core.LazySeq(null,(function (){
var s__66801__$1 = s__66801;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__66801__$1);
if(temp__4653__auto__){
var s__66801__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__66801__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66801__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66803 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66802 = (0);
while(true){
if((i__66802 < size__5453__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66802);
cljs.core.chunk_append(b__66803,((cljs.core.even_QMARK_(i))?"black":"white"));

var G__66806 = (i__66802 + (1));
i__66802 = G__66806;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66803),org$numenta$sanity$demos$sensorimotor_1d$iter__66800(cljs.core.chunk_rest(s__66801__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66803),null);
}
} else {
var i = cljs.core.first(s__66801__$2);
return cljs.core.cons(((cljs.core.even_QMARK_(i))?"black":"white"),org$numenta$sanity$demos$sensorimotor_1d$iter__66800(cljs.core.rest(s__66801__$2)));
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
org.numenta.sanity.demos.sensorimotor_1d.draw_eye = (function org$numenta$sanity$demos$sensorimotor_1d$draw_eye(ctx,p__66807){
var map__66810 = p__66807;
var map__66810__$1 = ((((!((map__66810 == null)))?((((map__66810.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66810.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66810):map__66810);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66810__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66810__$1,cljs.core.cst$kw$y);
var angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66810__$1,cljs.core.cst$kw$angle);
var radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66810__$1,cljs.core.cst$kw$radius);
monet.canvas.save(ctx);

var pi2_66812 = (Math.PI / (2));
monet.canvas.begin_path(ctx);

monet.canvas.arc(ctx,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y,cljs.core.cst$kw$r,radius,cljs.core.cst$kw$start_DASH_angle,(- pi2_66812),cljs.core.cst$kw$end_DASH_angle,pi2_66812,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_,true], null));

monet.canvas.close_path(ctx);

monet.canvas.fill_style(ctx,"white");

monet.canvas.fill(ctx);

monet.canvas.stroke_style(ctx,"black");

monet.canvas.stroke(ctx);

monet.canvas.clip(ctx);

var pupil_x_66813 = (x + (radius * Math.cos(angle)));
var pupil_y_66814 = (y + (radius * Math.sin(angle)));
monet.canvas.circle(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,pupil_x_66813,cljs.core.cst$kw$y,pupil_y_66814,cljs.core.cst$kw$r,cljs.core.quot(radius,(2))], null));

monet.canvas.fill_style(ctx,"rgb(128,128,255)");

monet.canvas.fill(ctx);

monet.canvas.circle(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,pupil_x_66813,cljs.core.cst$kw$y,pupil_y_66814,cljs.core.cst$kw$r,cljs.core.quot(radius,(5))], null));

monet.canvas.fill_style(ctx,"black");

monet.canvas.fill(ctx);

return monet.canvas.restore(ctx);
});
org.numenta.sanity.demos.sensorimotor_1d.draw_world = (function org$numenta$sanity$demos$sensorimotor_1d$draw_world(ctx,in_value){
var map__66834 = in_value;
var map__66834__$1 = ((((!((map__66834 == null)))?((((map__66834.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66834.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66834):map__66834);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66834__$1,cljs.core.cst$kw$field);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66834__$1,cljs.core.cst$kw$position);
var next_saccade = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66834__$1,cljs.core.cst$kw$next_DASH_saccade);
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

var seq__66836_66853 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,field));
var chunk__66838_66854 = null;
var count__66839_66855 = (0);
var i__66840_66856 = (0);
while(true){
if((i__66840_66856 < count__66839_66855)){
var vec__66842_66857 = chunk__66838_66854.cljs$core$IIndexed$_nth$arity$2(null,i__66840_66856);
var y_66858 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66842_66857,(0),null);
var item_66859 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66842_66857,(1),null);
var rect_66860 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y_66858) : y_scale.call(null,y_66858)),cljs.core.cst$kw$w,item_w,cljs.core.cst$kw$h,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1((1)) : y_scale.call(null,(1)))], null);
var G__66843_66861 = ctx;
monet.canvas.fill_style(G__66843_66861,(org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1(item_66859) : org.numenta.sanity.demos.sensorimotor_1d.item_colors.call(null,item_66859)));

monet.canvas.fill_rect(G__66843_66861,rect_66860);

monet.canvas.stroke_rect(G__66843_66861,rect_66860);

monet.canvas.fill_style(G__66843_66861,(org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1(item_66859) : org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.call(null,item_66859)));

monet.canvas.text(G__66843_66861,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__66844 = (y_66858 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__66844) : y_scale.call(null,G__66844));
})(),cljs.core.cst$kw$text,cljs.core.name(item_66859)], null));


var G__66862 = seq__66836_66853;
var G__66863 = chunk__66838_66854;
var G__66864 = count__66839_66855;
var G__66865 = (i__66840_66856 + (1));
seq__66836_66853 = G__66862;
chunk__66838_66854 = G__66863;
count__66839_66855 = G__66864;
i__66840_66856 = G__66865;
continue;
} else {
var temp__4653__auto___66866 = cljs.core.seq(seq__66836_66853);
if(temp__4653__auto___66866){
var seq__66836_66867__$1 = temp__4653__auto___66866;
if(cljs.core.chunked_seq_QMARK_(seq__66836_66867__$1)){
var c__5485__auto___66868 = cljs.core.chunk_first(seq__66836_66867__$1);
var G__66869 = cljs.core.chunk_rest(seq__66836_66867__$1);
var G__66870 = c__5485__auto___66868;
var G__66871 = cljs.core.count(c__5485__auto___66868);
var G__66872 = (0);
seq__66836_66853 = G__66869;
chunk__66838_66854 = G__66870;
count__66839_66855 = G__66871;
i__66840_66856 = G__66872;
continue;
} else {
var vec__66845_66873 = cljs.core.first(seq__66836_66867__$1);
var y_66874 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66845_66873,(0),null);
var item_66875 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66845_66873,(1),null);
var rect_66876 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y_66874) : y_scale.call(null,y_66874)),cljs.core.cst$kw$w,item_w,cljs.core.cst$kw$h,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1((1)) : y_scale.call(null,(1)))], null);
var G__66846_66877 = ctx;
monet.canvas.fill_style(G__66846_66877,(org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1(item_66875) : org.numenta.sanity.demos.sensorimotor_1d.item_colors.call(null,item_66875)));

monet.canvas.fill_rect(G__66846_66877,rect_66876);

monet.canvas.stroke_rect(G__66846_66877,rect_66876);

monet.canvas.fill_style(G__66846_66877,(org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1(item_66875) : org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.call(null,item_66875)));

monet.canvas.text(G__66846_66877,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__66847 = (y_66874 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__66847) : y_scale.call(null,G__66847));
})(),cljs.core.cst$kw$text,cljs.core.name(item_66875)], null));


var G__66878 = cljs.core.next(seq__66836_66867__$1);
var G__66879 = null;
var G__66880 = (0);
var G__66881 = (0);
seq__66836_66853 = G__66878;
chunk__66838_66854 = G__66879;
count__66839_66855 = G__66880;
i__66840_66856 = G__66881;
continue;
}
} else {
}
}
break;
}

var focus_x = (10);
var focus_y = (function (){var G__66848 = (0.5 + position);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__66848) : y_scale.call(null,G__66848));
})();
var next_focus_y = (function (){var G__66849 = ((0.5 + position) + next_saccade);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__66849) : y_scale.call(null,G__66849));
})();
var eye_x = cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size);
var eye_y = cljs.core.quot(cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size),(2));
var G__66850 = ctx;
monet.canvas.begin_path(G__66850);

monet.canvas.move_to(G__66850,eye_x,eye_y);

monet.canvas.line_to(G__66850,focus_x,next_focus_y);

monet.canvas.stroke_style(G__66850,"lightgrey");

monet.canvas.stroke(G__66850);

monet.canvas.begin_path(G__66850);

monet.canvas.move_to(G__66850,eye_x,eye_y);

monet.canvas.line_to(G__66850,focus_x,focus_y);

monet.canvas.stroke_style(G__66850,"black");

monet.canvas.stroke(G__66850);

org.numenta.sanity.demos.sensorimotor_1d.draw_eye(G__66850,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,eye_x,cljs.core.cst$kw$y,eye_y,cljs.core.cst$kw$angle,(function (){var G__66851 = (focus_y - eye_y);
var G__66852 = (focus_x - eye_x);
return Math.atan2(G__66851,G__66852);
})(),cljs.core.cst$kw$radius,(30)], null));

return G__66850;
});
org.numenta.sanity.demos.sensorimotor_1d.world_pane = (function org$numenta$sanity$demos$sensorimotor_1d$world_pane(){
var temp__4653__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4653__auto__)){
var step = temp__4653__auto__;
var in_value = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
var map__66884 = in_value;
var map__66884__$1 = ((((!((map__66884 == null)))?((((map__66884.cljs$lang$protocol_mask$partition0$ & (64))) || (map__66884.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__66884):map__66884);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66884__$1,cljs.core.cst$kw$field);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66884__$1,cljs.core.cst$kw$position);
var next_saccade = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66884__$1,cljs.core.cst$kw$next_DASH_saccade);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"val"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str(cljs.core.get.cljs$core$IFn$_invoke$arity$2(field,position))].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"next"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,(((next_saccade < (0)))?"":"+"),next_saccade], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"300px"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (in_value,map__66884,map__66884__$1,field,position,next_saccade,step,temp__4653__auto__){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var in_value__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.sensorimotor_1d.draw_world(ctx,in_value__$1);
});})(in_value,map__66884,map__66884__$1,field,position,next_saccade,step,temp__4653__auto__))
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
return (function (state_66916){
var state_val_66917 = (state_66916[(1)]);
if((state_val_66917 === (1))){
var inst_66906 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.sensorimotor_1d.seed_counter,cljs.core.inc);
var inst_66907 = org.nfrac.comportex.demos.sensorimotor_1d.initial_world(field,inst_66906);
var inst_66908 = org.nfrac.comportex.demos.sensorimotor_1d.input_seq(inst_66907);
var inst_66909 = cljs.core.take.cljs$core$IFn$_invoke$arity$2(n_steps,inst_66908);
var inst_66910 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.sensorimotor_1d.world_c,inst_66909,false);
var state_66916__$1 = state_66916;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66916__$1,(2),inst_66910);
} else {
if((state_val_66917 === (2))){
var inst_66912 = (state_66916[(2)]);
var inst_66913 = cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer);
var inst_66914 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_66913);
var state_66916__$1 = (function (){var statearr_66918 = state_66916;
(statearr_66918[(7)] = inst_66912);

return statearr_66918;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_66916__$1,inst_66914);
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
var statearr_66922 = [null,null,null,null,null,null,null,null];
(statearr_66922[(0)] = org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__);

(statearr_66922[(1)] = (1));

return statearr_66922;
});
var org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____1 = (function (state_66916){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66916);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66923){if((e66923 instanceof Object)){
var ex__35851__auto__ = e66923;
var statearr_66924_66926 = state_66916;
(statearr_66924_66926[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66916);

return cljs.core.cst$kw$recur;
} else {
throw e66923;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66927 = state_66916;
state_66916 = G__66927;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__ = function(state_66916){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____1.call(this,state_66916);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,field_key,n_steps,field))
})();
var state__35963__auto__ = (function (){var statearr_66925 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66925[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_66925;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,field_key,n_steps,field))
);

return c__35961__auto__;
});
org.numenta.sanity.demos.sensorimotor_1d.set_model_BANG_ = (function org$numenta$sanity$demos$sensorimotor_1d$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.model)) == null);
var G__66932_66936 = org.numenta.sanity.demos.sensorimotor_1d.model;
var G__66933_66937 = org.nfrac.comportex.demos.sensorimotor_1d.n_region_model.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$n_DASH_regions.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.config))));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__66932_66936,G__66933_66937) : cljs.core.reset_BANG_.call(null,G__66932_66936,G__66933_66937));

if(init_QMARK_){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.model,org.numenta.sanity.demos.sensorimotor_1d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.sensorimotor_1d.into_sim);
} else {
var G__66934 = org.numenta.sanity.main.step_template;
var G__66935 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.model)));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__66934,G__66935) : cljs.core.reset_BANG_.call(null,G__66934,G__66935));
}
}));
});
org.numenta.sanity.demos.sensorimotor_1d.config_template = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Sensorimotor sequences"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$postamble," queued input values."], null)], null)," ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__66938_SHARP_){
return (cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1(p1__66938_SHARP_) > (0));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_xs,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
var c__35961__auto___66985 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto___66985){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto___66985){
return (function (state_66958){
var state_val_66959 = (state_66958[(1)]);
if((state_val_66959 === (7))){
var inst_66944 = (state_66958[(2)]);
var state_66958__$1 = state_66958;
var statearr_66960_66986 = state_66958__$1;
(statearr_66960_66986[(2)] = inst_66944);

(statearr_66960_66986[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66959 === (1))){
var state_66958__$1 = state_66958;
var statearr_66961_66987 = state_66958__$1;
(statearr_66961_66987[(2)] = null);

(statearr_66961_66987[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66959 === (4))){
var state_66958__$1 = state_66958;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_66958__$1,(7),org.numenta.sanity.demos.sensorimotor_1d.world_c);
} else {
if((state_val_66959 === (6))){
var inst_66947 = (state_66958[(2)]);
var state_66958__$1 = state_66958;
if(cljs.core.truth_(inst_66947)){
var statearr_66962_66988 = state_66958__$1;
(statearr_66962_66988[(1)] = (8));

} else {
var statearr_66963_66989 = state_66958__$1;
(statearr_66963_66989[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66959 === (3))){
var inst_66956 = (state_66958[(2)]);
var state_66958__$1 = state_66958;
return cljs.core.async.impl.ioc_helpers.return_chan(state_66958__$1,inst_66956);
} else {
if((state_val_66959 === (2))){
var inst_66941 = (state_66958[(7)]);
var inst_66940 = cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer);
var inst_66941__$1 = (inst_66940 > (0));
var state_66958__$1 = (function (){var statearr_66964 = state_66958;
(statearr_66964[(7)] = inst_66941__$1);

return statearr_66964;
})();
if(cljs.core.truth_(inst_66941__$1)){
var statearr_66965_66990 = state_66958__$1;
(statearr_66965_66990[(1)] = (4));

} else {
var statearr_66966_66991 = state_66958__$1;
(statearr_66966_66991[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_66959 === (9))){
var state_66958__$1 = state_66958;
var statearr_66967_66992 = state_66958__$1;
(statearr_66967_66992[(2)] = null);

(statearr_66967_66992[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66959 === (5))){
var inst_66941 = (state_66958[(7)]);
var state_66958__$1 = state_66958;
var statearr_66968_66993 = state_66958__$1;
(statearr_66968_66993[(2)] = inst_66941);

(statearr_66968_66993[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66959 === (10))){
var inst_66954 = (state_66958[(2)]);
var state_66958__$1 = state_66958;
var statearr_66969_66994 = state_66958__$1;
(statearr_66969_66994[(2)] = inst_66954);

(statearr_66969_66994[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_66959 === (8))){
var inst_66949 = cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer);
var inst_66950 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_66949);
var state_66958__$1 = (function (){var statearr_66970 = state_66958;
(statearr_66970[(8)] = inst_66950);

return statearr_66970;
})();
var statearr_66971_66995 = state_66958__$1;
(statearr_66971_66995[(2)] = null);

(statearr_66971_66995[(1)] = (2));


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
});})(c__35961__auto___66985))
;
return ((function (switch__35847__auto__,c__35961__auto___66985){
return (function() {
var org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____0 = (function (){
var statearr_66975 = [null,null,null,null,null,null,null,null,null];
(statearr_66975[(0)] = org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__);

(statearr_66975[(1)] = (1));

return statearr_66975;
});
var org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____1 = (function (state_66958){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_66958);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e66976){if((e66976 instanceof Object)){
var ex__35851__auto__ = e66976;
var statearr_66977_66996 = state_66958;
(statearr_66977_66996[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_66958);

return cljs.core.cst$kw$recur;
} else {
throw e66976;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__66997 = state_66958;
state_66958 = G__66997;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__ = function(state_66958){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____1.call(this,state_66958);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____0;
org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto____1;
return org$numenta$sanity$demos$sensorimotor_1d$state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto___66985))
})();
var state__35963__auto__ = (function (){var statearr_66978 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_66978[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto___66985);

return statearr_66978;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto___66985))
);


return e.preventDefault();
})], null),"Clear"], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Field of values (a world):"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$field], null),(function (){var iter__5454__auto__ = (function org$numenta$sanity$demos$sensorimotor_1d$iter__66979(s__66980){
return (new cljs.core.LazySeq(null,(function (){
var s__66980__$1 = s__66980;
while(true){
var temp__4653__auto__ = cljs.core.seq(s__66980__$1);
if(temp__4653__auto__){
var s__66980__$2 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(s__66980__$2)){
var c__5452__auto__ = cljs.core.chunk_first(s__66980__$2);
var size__5453__auto__ = cljs.core.count(c__5452__auto__);
var b__66982 = cljs.core.chunk_buffer(size__5453__auto__);
if((function (){var i__66981 = (0);
while(true){
if((i__66981 < size__5453__auto__)){
var k = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__5452__auto__,i__66981);
cljs.core.chunk_append(b__66982,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null),cljs.core.name(k)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null)));

var G__66998 = (i__66981 + (1));
i__66981 = G__66998;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66982),org$numenta$sanity$demos$sensorimotor_1d$iter__66979(cljs.core.chunk_rest(s__66980__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66982),null);
}
} else {
var k = cljs.core.first(s__66980__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null),cljs.core.name(k)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null)),org$numenta$sanity$demos$sensorimotor_1d$iter__66979(cljs.core.rest(s__66980__$2)));
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
