// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.fixed_seqs');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.isolated_1d');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('monet.canvas');
org.numenta.sanity.demos.fixed_seqs.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$n_DASH_regions,(1)], null));
org.numenta.sanity.demos.fixed_seqs.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__64168_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__64168_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(p1__64168_SHARP_));
})));
org.numenta.sanity.demos.fixed_seqs.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.fixed_seqs.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.fixed_seqs.draw_world = (function org$numenta$sanity$demos$fixed_seqs$draw_world(ctx,inval,patterns){
var patterns_xy = org.nfrac.comportex.util.remap(org.numenta.sanity.plots_canvas.indexed,patterns);
var x_max = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.val,cljs.core.array_seq([patterns_xy], 0))));
var y_max = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.val,cljs.core.array_seq([patterns_xy], 0))));
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((0) - (1)),(x_max + (1))], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((0) - (1)),(y_max + (1))], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,(200)], null);
var plot = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

org.numenta.sanity.plots_canvas.frame_BANG_(plot);

monet.canvas.stroke_style(ctx,"lightgray");

org.numenta.sanity.plots_canvas.grid_BANG_(plot,cljs.core.PersistentArrayMap.EMPTY);

monet.canvas.stroke_style(ctx,"black");

var temp__4653__auto__ = cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(inval);
if(cljs.core.truth_(temp__4653__auto__)){
var id = temp__4653__auto__;
org.numenta.sanity.plots_canvas.line_BANG_(plot,(patterns_xy.cljs$core$IFn$_invoke$arity$1 ? patterns_xy.cljs$core$IFn$_invoke$arity$1(id) : patterns_xy.call(null,id)));

var seq__64177 = cljs.core.seq(org.numenta.sanity.plots_canvas.indexed((patterns_xy.cljs$core$IFn$_invoke$arity$1 ? patterns_xy.cljs$core$IFn$_invoke$arity$1(id) : patterns_xy.call(null,id))));
var chunk__64178 = null;
var count__64179 = (0);
var i__64180 = (0);
while(true){
if((i__64180 < count__64179)){
var vec__64181 = chunk__64178.cljs$core$IIndexed$_nth$arity$2(null,i__64180);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64181,(0),null);
var vec__64182 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64181,(1),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64182,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64182,(1),null);
monet.canvas.fill_style(ctx,(((i === cljs.core.cst$kw$index.cljs$core$IFn$_invoke$arity$1(inval)))?"red":"lightgrey"));

org.numenta.sanity.plots_canvas.point_BANG_(plot,x,y,(4));

var G__64185 = seq__64177;
var G__64186 = chunk__64178;
var G__64187 = count__64179;
var G__64188 = (i__64180 + (1));
seq__64177 = G__64185;
chunk__64178 = G__64186;
count__64179 = G__64187;
i__64180 = G__64188;
continue;
} else {
var temp__4653__auto____$1 = cljs.core.seq(seq__64177);
if(temp__4653__auto____$1){
var seq__64177__$1 = temp__4653__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__64177__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__64177__$1);
var G__64189 = cljs.core.chunk_rest(seq__64177__$1);
var G__64190 = c__5485__auto__;
var G__64191 = cljs.core.count(c__5485__auto__);
var G__64192 = (0);
seq__64177 = G__64189;
chunk__64178 = G__64190;
count__64179 = G__64191;
i__64180 = G__64192;
continue;
} else {
var vec__64183 = cljs.core.first(seq__64177__$1);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64183,(0),null);
var vec__64184 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64183,(1),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64184,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64184,(1),null);
monet.canvas.fill_style(ctx,(((i === cljs.core.cst$kw$index.cljs$core$IFn$_invoke$arity$1(inval)))?"red":"lightgrey"));

org.numenta.sanity.plots_canvas.point_BANG_(plot,x,y,(4));

var G__64193 = cljs.core.next(seq__64177__$1);
var G__64194 = null;
var G__64195 = (0);
var G__64196 = (0);
seq__64177 = G__64193;
chunk__64178 = G__64194;
count__64179 = G__64195;
i__64180 = G__64196;
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
});
org.numenta.sanity.demos.fixed_seqs.world_pane = (function org$numenta$sanity$demos$fixed_seqs$world_pane(){
var temp__4653__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4653__auto__)){
var step = temp__4653__auto__;
var inval = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tbody,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"pattern"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"value"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str((function (){var or__4682__auto__ = cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(inval);
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "-";
}
})())].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(inval)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"300px"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (inval,step,temp__4653__auto__){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var inval__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.fixed_seqs.draw_world(ctx,inval__$1,org.nfrac.comportex.demos.isolated_1d.patterns);
});})(inval,step,temp__4653__auto__))
,null], null)], null);
} else {
return null;
}
});
org.numenta.sanity.demos.fixed_seqs.set_model_BANG_ = (function org$numenta$sanity$demos$fixed_seqs$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.fixed_seqs.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.fixed_seqs.model)) == null);
var G__64201_64205 = org.numenta.sanity.demos.fixed_seqs.model;
var G__64202_64206 = org.nfrac.comportex.demos.isolated_1d.n_region_model.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$n_DASH_regions.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.fixed_seqs.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.fixed_seqs.config))));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__64201_64205,G__64202_64206) : cljs.core.reset_BANG_.call(null,G__64201_64205,G__64202_64206));

if(init_QMARK_){
org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.fixed_seqs.model,org.numenta.sanity.demos.fixed_seqs.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.fixed_seqs.into_sim);
} else {
var G__64203_64207 = org.numenta.sanity.main.step_template;
var G__64204_64208 = org.numenta.sanity.comportex.data.step_template_data((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.fixed_seqs.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.fixed_seqs.model)));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__64203_64207,G__64204_64208) : cljs.core.reset_BANG_.call(null,G__64203_64207,G__64204_64208));
}

if(init_QMARK_){
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.fixed_seqs.world_c,org.nfrac.comportex.demos.isolated_1d.input_seq(),false);
} else {
return null;
}
}));
});
org.numenta.sanity.demos.fixed_seqs.config_template = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Encoder:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$encoder,cljs.core.cst$kw$disabled,"disabled"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$block], null),"block"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$random], null),"random"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of regions:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_regions], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.fixed_seqs.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The following fixed sequences are presented one at a time with\n   a gap of 5 time steps. Each new pattern is chosen randomly. This\n   example is designed for testing temporal pooling, as each fixed\n   sequence should give rise to a stable representation.",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre,":run-0-5   [0 1 2 3 4 5]\n:rev-5-1   [5 4 3 2 1]\n:run-6-10  [6 7 8 9 10]\n:jump-6-12 [6 7 8 11 12]\n:twos      [0 2 4 6 8 10 12 14]\n:saw-10-15 [10 12 11 13 12 14 13 15]"], null)], null)], null);
org.numenta.sanity.demos.fixed_seqs.model_tab = (function org$numenta$sanity$demos$fixed_seqs$model_tab(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Fixed integer patterns repeating in random order."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.fixed_seqs.config_template,org.numenta.sanity.demos.fixed_seqs.config], null)], null);
});
org.numenta.sanity.demos.fixed_seqs.init = (function org$numenta$sanity$demos$fixed_seqs$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.fixed_seqs.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.fixed_seqs.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.fixed_seqs.into_sim], null),goog.dom.getElement("sanity-app"));

return org.numenta.sanity.demos.fixed_seqs.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.fixed_seqs.init', org.numenta.sanity.demos.fixed_seqs.init);
