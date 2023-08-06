// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.second_level_motor');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.second_level_motor');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('monet.canvas');
goog.require('org.numenta.sanity.demos.sensorimotor_1d');
goog.require('clojure.string');
org.numenta.sanity.demos.second_level_motor.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$text,org.nfrac.comportex.demos.second_level_motor.test_text,cljs.core.cst$kw$edit_DASH_text,org.nfrac.comportex.demos.second_level_motor.test_text], null));
org.numenta.sanity.demos.second_level_motor.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__67099_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__67099_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(p1__67099_SHARP_));
})));
org.numenta.sanity.demos.second_level_motor.control_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.second_level_motor.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.second_level_motor.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.second_level_motor.draw_world = (function org$numenta$sanity$demos$second_level_motor$draw_world(ctx,inval){
var map__67117 = inval;
var map__67117__$1 = ((((!((map__67117 == null)))?((((map__67117.cljs$lang$protocol_mask$partition0$ & (64))) || (map__67117.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__67117):map__67117);
var sentences = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67117__$1,cljs.core.cst$kw$sentences);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67117__$1,cljs.core.cst$kw$position);
var vec__67118 = position;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67118,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67118,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67118,(2),null);
var sentence = cljs.core.get.cljs$core$IFn$_invoke$arity$2(sentences,i);
var word_n_letters = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.inc,cljs.core.count),sentence);
var sentence_flat = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.flatten(cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(" ",sentence)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["."], null));
var n_letters = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,word_n_letters);
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),n_letters], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null);
var plot = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

org.numenta.sanity.plots_canvas.frame_BANG_(plot);

monet.canvas.font_style(ctx,[cljs.core.str((function (){var x__5020__auto__ = (30);
var y__5021__auto__ = ((height_px / n_letters) | (0));
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})()),cljs.core.str("px monospace")].join(''));

monet.canvas.text_baseline(ctx,cljs.core.cst$kw$middle);

monet.canvas.fill_style(ctx,"black");

var seq__67120_67134 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,sentence_flat));
var chunk__67121_67135 = null;
var count__67122_67136 = (0);
var i__67123_67137 = (0);
while(true){
if((i__67123_67137 < count__67122_67136)){
var vec__67124_67138 = chunk__67121_67135.cljs$core$IIndexed$_nth$arity$2(null,i__67123_67137);
var y_67139 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67124_67138,(0),null);
var letter_67140 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67124_67138,(1),null);
monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__67125 = (y_67139 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__67125) : y_scale.call(null,G__67125));
})(),cljs.core.cst$kw$text,[cljs.core.str(letter_67140)].join('')], null));

var G__67141 = seq__67120_67134;
var G__67142 = chunk__67121_67135;
var G__67143 = count__67122_67136;
var G__67144 = (i__67123_67137 + (1));
seq__67120_67134 = G__67141;
chunk__67121_67135 = G__67142;
count__67122_67136 = G__67143;
i__67123_67137 = G__67144;
continue;
} else {
var temp__4653__auto___67145 = cljs.core.seq(seq__67120_67134);
if(temp__4653__auto___67145){
var seq__67120_67146__$1 = temp__4653__auto___67145;
if(cljs.core.chunked_seq_QMARK_(seq__67120_67146__$1)){
var c__5485__auto___67147 = cljs.core.chunk_first(seq__67120_67146__$1);
var G__67148 = cljs.core.chunk_rest(seq__67120_67146__$1);
var G__67149 = c__5485__auto___67147;
var G__67150 = cljs.core.count(c__5485__auto___67147);
var G__67151 = (0);
seq__67120_67134 = G__67148;
chunk__67121_67135 = G__67149;
count__67122_67136 = G__67150;
i__67123_67137 = G__67151;
continue;
} else {
var vec__67126_67152 = cljs.core.first(seq__67120_67146__$1);
var y_67153 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67126_67152,(0),null);
var letter_67154 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67126_67152,(1),null);
monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__67127 = (y_67153 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__67127) : y_scale.call(null,G__67127));
})(),cljs.core.cst$kw$text,[cljs.core.str(letter_67154)].join('')], null));

var G__67155 = cljs.core.next(seq__67120_67146__$1);
var G__67156 = null;
var G__67157 = (0);
var G__67158 = (0);
seq__67120_67134 = G__67155;
chunk__67121_67135 = G__67156;
count__67122_67136 = G__67157;
i__67123_67137 = G__67158;
continue;
}
} else {
}
}
break;
}

var curr_index = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,k,cljs.core.take.cljs$core$IFn$_invoke$arity$2(j,word_n_letters));
var vec__67128 = org.nfrac.comportex.demos.second_level_motor.next_position(position,cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var ni = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67128,(0),null);
var nj = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67128,(1),null);
var nk = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67128,(2),null);
var sentence_sacc = cljs.core.cst$kw$next_DASH_sentence_DASH_saccade.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var next_index = (((sentence_sacc < (0)))?(-1):(((sentence_sacc > (0)))?(n_letters + (1)):cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,nk,cljs.core.take.cljs$core$IFn$_invoke$arity$2(nj,word_n_letters))
));
var focus_x = (10);
var focus_y = (function (){var G__67129 = (0.5 + curr_index);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__67129) : y_scale.call(null,G__67129));
})();
var next_focus_y = (function (){var G__67130 = (0.5 + next_index);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__67130) : y_scale.call(null,G__67130));
})();
var eye_x = cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size);
var eye_y = cljs.core.quot(cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size),(2));
var G__67131 = ctx;
monet.canvas.begin_path(G__67131);

monet.canvas.move_to(G__67131,eye_x,eye_y);

monet.canvas.line_to(G__67131,focus_x,next_focus_y);

monet.canvas.stroke_style(G__67131,"lightgrey");

monet.canvas.stroke(G__67131);

monet.canvas.begin_path(G__67131);

monet.canvas.move_to(G__67131,eye_x,eye_y);

monet.canvas.line_to(G__67131,focus_x,focus_y);

monet.canvas.stroke_style(G__67131,"black");

monet.canvas.stroke(G__67131);

org.numenta.sanity.demos.sensorimotor_1d.draw_eye(G__67131,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,eye_x,cljs.core.cst$kw$y,eye_y,cljs.core.cst$kw$angle,(function (){var G__67132 = (focus_y - eye_y);
var G__67133 = (focus_x - eye_x);
return Math.atan2(G__67132,G__67133);
})(),cljs.core.cst$kw$radius,(30)], null));

return G__67131;
});
org.numenta.sanity.demos.second_level_motor.signed_str = (function org$numenta$sanity$demos$second_level_motor$signed_str(x){
return [cljs.core.str((((x < (0)))?"":"+")),cljs.core.str(x)].join('');
});
org.numenta.sanity.demos.second_level_motor.sentence_string = (function org$numenta$sanity$demos$second_level_motor$sentence_string(sentence){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.flatten(cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(" ",sentence)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["."], null)));
});
org.numenta.sanity.demos.second_level_motor.world_pane = (function org$numenta$sanity$demos$second_level_motor$world_pane(){
var temp__4653__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4653__auto__)){
var step = temp__4653__auto__;
var inval = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
var map__67162 = inval;
var map__67162__$1 = ((((!((map__67162 == null)))?((((map__67162.cljs$lang$protocol_mask$partition0$ & (64))) || (map__67162.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__67162):map__67162);
var sentences = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67162__$1,cljs.core.cst$kw$sentences);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67162__$1,cljs.core.cst$kw$position);
var action = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67162__$1,cljs.core.cst$kw$action);
var vec__67163 = position;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67163,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67163,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67163,(2),null);
var letter_sacc = cljs.core.cst$kw$next_DASH_letter_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action);
var word_sacc = cljs.core.cst$kw$next_DASH_word_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action);
var sentence_sacc = cljs.core.cst$kw$next_DASH_sentence_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action);
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"value"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str(cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(inval))].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"next move"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,((!((sentence_sacc === (0))))?"sentence":((!((word_sacc === (0))))?"word":((!((letter_sacc === (0))))?"letter":null)))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"direction"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,(((((sentence_sacc + word_sacc) + letter_sacc) > (0)))?"fwd":"back")], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre,clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.sentence_string,cljs.core.take.cljs$core$IFn$_invoke$arity$2(i,sentences)))], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"75vh"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (inval,map__67162,map__67162__$1,sentences,position,action,vec__67163,i,j,k,letter_sacc,word_sacc,sentence_sacc,step,temp__4653__auto__){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var inval__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.second_level_motor.draw_world(ctx,inval__$1);
});})(inval,map__67162,map__67162__$1,sentences,position,action,vec__67163,i,j,k,letter_sacc,word_sacc,sentence_sacc,step,temp__4653__auto__))
,null], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre,clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.sentence_string,cljs.core.drop.cljs$core$IFn$_invoke$arity$2((i + (1)),sentences)))], null)], null);
} else {
return null;
}
});
org.numenta.sanity.demos.second_level_motor.set_model_BANG_ = (function org$numenta$sanity$demos$second_level_motor$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.second_level_motor.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.second_level_motor.model)) == null);
var c__35961__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__35961__auto__,init_QMARK_){
return (function (){
var f__35962__auto__ = (function (){var switch__35847__auto__ = ((function (c__35961__auto__,init_QMARK_){
return (function (state_67230){
var state_val_67231 = (state_67230[(1)]);
if((state_val_67231 === (1))){
var state_67230__$1 = state_67230;
if(init_QMARK_){
var statearr_67232_67249 = state_67230__$1;
(statearr_67232_67249[(1)] = (2));

} else {
var statearr_67233_67250 = state_67230__$1;
(statearr_67233_67250[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67231 === (2))){
var state_67230__$1 = state_67230;
var statearr_67234_67251 = state_67230__$1;
(statearr_67234_67251[(2)] = null);

(statearr_67234_67251[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67231 === (3))){
var state_67230__$1 = state_67230;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_67230__$1,(5),org.numenta.sanity.demos.second_level_motor.world_c);
} else {
if((state_val_67231 === (4))){
var inst_67212 = (state_67230[(2)]);
var inst_67213 = org.nfrac.comportex.demos.second_level_motor.two_region_model.cljs$core$IFn$_invoke$arity$0();
var inst_67214 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.model,inst_67213) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.demos.second_level_motor.model,inst_67213));
var state_67230__$1 = (function (){var statearr_67235 = state_67230;
(statearr_67235[(7)] = inst_67212);

(statearr_67235[(8)] = inst_67214);

return statearr_67235;
})();
if(init_QMARK_){
var statearr_67236_67252 = state_67230__$1;
(statearr_67236_67252[(1)] = (6));

} else {
var statearr_67237_67253 = state_67230__$1;
(statearr_67237_67253[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_67231 === (5))){
var inst_67210 = (state_67230[(2)]);
var state_67230__$1 = state_67230;
var statearr_67238_67254 = state_67230__$1;
(statearr_67238_67254[(2)] = inst_67210);

(statearr_67238_67254[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67231 === (6))){
var inst_67216 = org.nfrac.comportex.demos.second_level_motor.htm_step_with_action_selection(org.numenta.sanity.demos.second_level_motor.world_c,org.numenta.sanity.demos.second_level_motor.control_c);
var inst_67217 = org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(org.numenta.sanity.demos.second_level_motor.model,org.numenta.sanity.demos.second_level_motor.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.second_level_motor.into_sim,inst_67216);
var state_67230__$1 = state_67230;
var statearr_67239_67255 = state_67230__$1;
(statearr_67239_67255[(2)] = inst_67217);

(statearr_67239_67255[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67231 === (7))){
var inst_67219 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.second_level_motor.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.second_level_motor.model));
var inst_67220 = org.numenta.sanity.comportex.data.step_template_data(inst_67219);
var inst_67221 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.step_template,inst_67220) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.step_template,inst_67220));
var state_67230__$1 = state_67230;
var statearr_67240_67256 = state_67230__$1;
(statearr_67240_67256[(2)] = inst_67221);

(statearr_67240_67256[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_67231 === (8))){
var inst_67223 = (state_67230[(2)]);
var inst_67224 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.second_level_motor.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.second_level_motor.config));
var inst_67225 = cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1(inst_67224);
var inst_67226 = org.nfrac.comportex.demos.second_level_motor.parse_sentences(inst_67225);
var inst_67227 = org.nfrac.comportex.demos.second_level_motor.initial_inval(inst_67226);
var inst_67228 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.world_c,inst_67227);
var state_67230__$1 = (function (){var statearr_67241 = state_67230;
(statearr_67241[(9)] = inst_67223);

return statearr_67241;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_67230__$1,inst_67228);
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
var org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto__ = null;
var org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto____0 = (function (){
var statearr_67245 = [null,null,null,null,null,null,null,null,null,null];
(statearr_67245[(0)] = org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto__);

(statearr_67245[(1)] = (1));

return statearr_67245;
});
var org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto____1 = (function (state_67230){
while(true){
var ret_value__35849__auto__ = (function (){try{while(true){
var result__35850__auto__ = switch__35847__auto__(state_67230);
if(cljs.core.keyword_identical_QMARK_(result__35850__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__35850__auto__;
}
break;
}
}catch (e67246){if((e67246 instanceof Object)){
var ex__35851__auto__ = e67246;
var statearr_67247_67257 = state_67230;
(statearr_67247_67257[(5)] = ex__35851__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_67230);

return cljs.core.cst$kw$recur;
} else {
throw e67246;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__35849__auto__,cljs.core.cst$kw$recur)){
var G__67258 = state_67230;
state_67230 = G__67258;
continue;
} else {
return ret_value__35849__auto__;
}
break;
}
});
org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto__ = function(state_67230){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto____1.call(this,state_67230);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto____0;
org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto____1;
return org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__35848__auto__;
})()
;})(switch__35847__auto__,c__35961__auto__,init_QMARK_))
})();
var state__35963__auto__ = (function (){var statearr_67248 = (f__35962__auto__.cljs$core$IFn$_invoke$arity$0 ? f__35962__auto__.cljs$core$IFn$_invoke$arity$0() : f__35962__auto__.call(null));
(statearr_67248[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__35961__auto__);

return statearr_67248;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__35963__auto__);
});})(c__35961__auto__,init_QMARK_))
);

return c__35961__auto__;
}));
});
org.numenta.sanity.demos.second_level_motor.set_text_BANG_ = (function org$numenta$sanity$demos$second_level_motor$set_text_BANG_(){
var text = cljs.core.cst$kw$edit_DASH_text.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.second_level_motor.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.second_level_motor.config)));
var sentences = org.nfrac.comportex.demos.second_level_motor.parse_sentences(text);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.control_c,((function (text,sentences){
return (function (_){
return org.nfrac.comportex.demos.second_level_motor.initial_inval(sentences);
});})(text,sentences))
);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.second_level_motor.config,cljs.core.assoc,cljs.core.cst$kw$text,text);
});
org.numenta.sanity.demos.second_level_motor.config_template = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Letters in words in sentences"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea$form_DASH_control,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$textarea,cljs.core.cst$kw$id,cljs.core.cst$kw$edit_DASH_text,cljs.core.cst$kw$rows,(8)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__67259_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$edit_DASH_text.cljs$core$IFn$_invoke$arity$1(p1__67259_SHARP_),cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1(p1__67259_SHARP_));
}),cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.second_level_motor.set_text_BANG_();

return e.preventDefault();
})], null),"Set sentences"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.second_level_motor.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null)], null);
org.numenta.sanity.demos.second_level_motor.model_tab = (function org$numenta$sanity$demos$second_level_motor$model_tab(){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A two-region example of temporal pooling over sensorimotor input."], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The world is a string of letters divided into words and\n   sentences. Only one letter is received as direct sensory input at\n   any one time. Motor actions (saccades) shift the focus to a new\n   letter. These motor actions are encoded in two separate senses: ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"letter-motor"], null)," and ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"word-motor"], null),". The former is distal input to the first level region, while the\n    latter is distal input to the second-level region."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Within a word, letter saccades always move forward one\n   letter. At the end of a word, we check whether the first region's\n   columns are bursting (indicating it has not yet learned the word's\n   letter sequence). If it is bursting, a letter saccade moves back to\n   the start of the same word. Otherwise, a word saccade is\n   generated."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Within a sentence, word saccades always move forward one\n   word. At the end of a sentence, we check whether the second\n   region's columns are bursting (indicating it has not yet learned\n   the sentence's word sequence). If it is bursting, a word saccade\n   moves back to the start of the same sentence."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"And similarly for sentence saccades."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.second_level_motor.config_template,org.numenta.sanity.demos.second_level_motor.config], null)], null);
});
org.numenta.sanity.demos.second_level_motor.init = (function org$numenta$sanity$demos$second_level_motor$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.second_level_motor.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.second_level_motor.world_pane], null),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.second_level_motor.into_sim], null),goog.dom.getElement("sanity-app"));

return org.numenta.sanity.demos.second_level_motor.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.second_level_motor.init', org.numenta.sanity.demos.second_level_motor.init);
