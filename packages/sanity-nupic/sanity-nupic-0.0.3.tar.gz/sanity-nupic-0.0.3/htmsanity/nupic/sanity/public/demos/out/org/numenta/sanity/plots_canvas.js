// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.plots_canvas');
goog.require('cljs.core');
goog.require('monet.canvas');
org.numenta.sanity.plots_canvas.indexed = (function org$numenta$sanity$plots_canvas$indexed(ys){
return cljs.core.vec(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,ys));
});

/**
 * @interface
 */
org.numenta.sanity.plots_canvas.PPlot = function(){};

org.numenta.sanity.plots_canvas.bg_BANG_ = (function org$numenta$sanity$plots_canvas$bg_BANG_(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$bg_BANG_$arity$1 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$bg_BANG_$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.bg_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.bg_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PPlot.bg!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.frame_BANG_ = (function org$numenta$sanity$plots_canvas$frame_BANG_(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$frame_BANG_$arity$1 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$frame_BANG_$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.frame_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.frame_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PPlot.frame!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.grid_BANG_ = (function org$numenta$sanity$plots_canvas$grid_BANG_(this$,opts){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$grid_BANG_$arity$2 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$grid_BANG_$arity$2(this$,opts);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.grid_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,opts) : m__5338__auto__.call(null,this$,opts));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.grid_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,opts) : m__5338__auto____$1.call(null,this$,opts));
} else {
throw cljs.core.missing_protocol("PPlot.grid!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.point_BANG_ = (function org$numenta$sanity$plots_canvas$point_BANG_(this$,x,y,radius_px){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$point_BANG_$arity$4 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$point_BANG_$arity$4(this$,x,y,radius_px);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.point_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$4(this$,x,y,radius_px) : m__5338__auto__.call(null,this$,x,y,radius_px));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.point_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$4(this$,x,y,radius_px) : m__5338__auto____$1.call(null,this$,x,y,radius_px));
} else {
throw cljs.core.missing_protocol("PPlot.point!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.rect_BANG_ = (function org$numenta$sanity$plots_canvas$rect_BANG_(this$,x,y,w,h){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$rect_BANG_$arity$5 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$rect_BANG_$arity$5(this$,x,y,w,h);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.rect_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$5 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$5(this$,x,y,w,h) : m__5338__auto__.call(null,this$,x,y,w,h));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.rect_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$5 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$5(this$,x,y,w,h) : m__5338__auto____$1.call(null,this$,x,y,w,h));
} else {
throw cljs.core.missing_protocol("PPlot.rect!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.line_BANG_ = (function org$numenta$sanity$plots_canvas$line_BANG_(this$,xys){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$line_BANG_$arity$2 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$line_BANG_$arity$2(this$,xys);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.line_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,xys) : m__5338__auto__.call(null,this$,xys));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.line_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,xys) : m__5338__auto____$1.call(null,this$,xys));
} else {
throw cljs.core.missing_protocol("PPlot.line!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.text_BANG_ = (function org$numenta$sanity$plots_canvas$text_BANG_(this$,x,y,txt){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$text_BANG_$arity$4 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$text_BANG_$arity$4(this$,x,y,txt);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.text_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$4(this$,x,y,txt) : m__5338__auto__.call(null,this$,x,y,txt));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.text_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$4(this$,x,y,txt) : m__5338__auto____$1.call(null,this$,x,y,txt));
} else {
throw cljs.core.missing_protocol("PPlot.text!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.texts_BANG_ = (function org$numenta$sanity$plots_canvas$texts_BANG_(this$,x,y,txts,line_height){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$texts_BANG_$arity$5 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$texts_BANG_$arity$5(this$,x,y,txts,line_height);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.texts_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$5 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$5(this$,x,y,txts,line_height) : m__5338__auto__.call(null,this$,x,y,txts,line_height));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.texts_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$5 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$5(this$,x,y,txts,line_height) : m__5338__auto____$1.call(null,this$,x,y,txts,line_height));
} else {
throw cljs.core.missing_protocol("PPlot.texts!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.text_rotated_BANG_ = (function org$numenta$sanity$plots_canvas$text_rotated_BANG_(this$,x,y,txt){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$text_rotated_BANG_$arity$4 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$text_rotated_BANG_$arity$4(this$,x,y,txt);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.text_rotated_BANG_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$4(this$,x,y,txt) : m__5338__auto__.call(null,this$,x,y,txt));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.text_rotated_BANG_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$4(this$,x,y,txt) : m__5338__auto____$1.call(null,this$,x,y,txt));
} else {
throw cljs.core.missing_protocol("PPlot.text-rotated!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.__GT_px = (function org$numenta$sanity$plots_canvas$__GT_px(this$,x,y){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$__GT_px$arity$3 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$__GT_px$arity$3(this$,x,y);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.plots_canvas.__GT_px[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$3(this$,x,y) : m__5338__auto__.call(null,this$,x,y));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.plots_canvas.__GT_px["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,x,y) : m__5338__auto____$1.call(null,this$,x,y));
} else {
throw cljs.core.missing_protocol("PPlot.->px",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.draw_grid = (function org$numenta$sanity$plots_canvas$draw_grid(ctx,p__53548,p__53549,xs,ys){
var vec__53560 = p__53548;
var x_lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53560,(0),null);
var x_hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53560,(1),null);
var vec__53561 = p__53549;
var y_lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53561,(0),null);
var y_hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53561,(1),null);
monet.canvas.begin_path(ctx);

var seq__53562_53570 = cljs.core.seq(xs);
var chunk__53563_53571 = null;
var count__53564_53572 = (0);
var i__53565_53573 = (0);
while(true){
if((i__53565_53573 < count__53564_53572)){
var x_53574 = chunk__53563_53571.cljs$core$IIndexed$_nth$arity$2(null,i__53565_53573);
monet.canvas.move_to(ctx,x_53574,y_lo);

monet.canvas.line_to(ctx,x_53574,y_hi);

var G__53575 = seq__53562_53570;
var G__53576 = chunk__53563_53571;
var G__53577 = count__53564_53572;
var G__53578 = (i__53565_53573 + (1));
seq__53562_53570 = G__53575;
chunk__53563_53571 = G__53576;
count__53564_53572 = G__53577;
i__53565_53573 = G__53578;
continue;
} else {
var temp__4653__auto___53579 = cljs.core.seq(seq__53562_53570);
if(temp__4653__auto___53579){
var seq__53562_53580__$1 = temp__4653__auto___53579;
if(cljs.core.chunked_seq_QMARK_(seq__53562_53580__$1)){
var c__5485__auto___53581 = cljs.core.chunk_first(seq__53562_53580__$1);
var G__53582 = cljs.core.chunk_rest(seq__53562_53580__$1);
var G__53583 = c__5485__auto___53581;
var G__53584 = cljs.core.count(c__5485__auto___53581);
var G__53585 = (0);
seq__53562_53570 = G__53582;
chunk__53563_53571 = G__53583;
count__53564_53572 = G__53584;
i__53565_53573 = G__53585;
continue;
} else {
var x_53586 = cljs.core.first(seq__53562_53580__$1);
monet.canvas.move_to(ctx,x_53586,y_lo);

monet.canvas.line_to(ctx,x_53586,y_hi);

var G__53587 = cljs.core.next(seq__53562_53580__$1);
var G__53588 = null;
var G__53589 = (0);
var G__53590 = (0);
seq__53562_53570 = G__53587;
chunk__53563_53571 = G__53588;
count__53564_53572 = G__53589;
i__53565_53573 = G__53590;
continue;
}
} else {
}
}
break;
}

var seq__53566_53591 = cljs.core.seq(ys);
var chunk__53567_53592 = null;
var count__53568_53593 = (0);
var i__53569_53594 = (0);
while(true){
if((i__53569_53594 < count__53568_53593)){
var y_53595 = chunk__53567_53592.cljs$core$IIndexed$_nth$arity$2(null,i__53569_53594);
monet.canvas.move_to(ctx,x_lo,y_53595);

monet.canvas.line_to(ctx,x_hi,y_53595);

var G__53596 = seq__53566_53591;
var G__53597 = chunk__53567_53592;
var G__53598 = count__53568_53593;
var G__53599 = (i__53569_53594 + (1));
seq__53566_53591 = G__53596;
chunk__53567_53592 = G__53597;
count__53568_53593 = G__53598;
i__53569_53594 = G__53599;
continue;
} else {
var temp__4653__auto___53600 = cljs.core.seq(seq__53566_53591);
if(temp__4653__auto___53600){
var seq__53566_53601__$1 = temp__4653__auto___53600;
if(cljs.core.chunked_seq_QMARK_(seq__53566_53601__$1)){
var c__5485__auto___53602 = cljs.core.chunk_first(seq__53566_53601__$1);
var G__53603 = cljs.core.chunk_rest(seq__53566_53601__$1);
var G__53604 = c__5485__auto___53602;
var G__53605 = cljs.core.count(c__5485__auto___53602);
var G__53606 = (0);
seq__53566_53591 = G__53603;
chunk__53567_53592 = G__53604;
count__53568_53593 = G__53605;
i__53569_53594 = G__53606;
continue;
} else {
var y_53607 = cljs.core.first(seq__53566_53601__$1);
monet.canvas.move_to(ctx,x_lo,y_53607);

monet.canvas.line_to(ctx,x_hi,y_53607);

var G__53608 = cljs.core.next(seq__53566_53601__$1);
var G__53609 = null;
var G__53610 = (0);
var G__53611 = (0);
seq__53566_53591 = G__53608;
chunk__53567_53592 = G__53609;
count__53568_53593 = G__53610;
i__53569_53594 = G__53611;
continue;
}
} else {
}
}
break;
}

return monet.canvas.stroke(ctx);
});
org.numenta.sanity.plots_canvas.scale_fn = (function org$numenta$sanity$plots_canvas$scale_fn(p__53612,size_px){
var vec__53614 = p__53612;
var lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53614,(0),null);
var hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53614,(1),null);
return ((function (vec__53614,lo,hi){
return (function (x){
return ((x - lo) * (size_px / (hi - lo)));
});
;})(vec__53614,lo,hi))
});
org.numenta.sanity.plots_canvas.text_rotated = (function org$numenta$sanity$plots_canvas$text_rotated(ctx,p__53615){
var map__53618 = p__53615;
var map__53618__$1 = ((((!((map__53618 == null)))?((((map__53618.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53618.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53618):map__53618);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53618__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53618__$1,cljs.core.cst$kw$y);
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53618__$1,cljs.core.cst$kw$text);
monet.canvas.save(ctx);

monet.canvas.translate(ctx,x,y);

monet.canvas.rotate(ctx,(Math.PI / (2)));

monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$text,text], null));

return monet.canvas.restore(ctx);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {org.numenta.sanity.plots_canvas.PPlot}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.plots_canvas.XYPlot = (function (ctx,plot_size,x_lim,y_lim,x_scale,y_scale,__meta,__extmap,__hash){
this.ctx = ctx;
this.plot_size = plot_size;
this.x_lim = x_lim;
this.y_lim = y_lim;
this.x_scale = x_scale;
this.y_scale = y_scale;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k53621,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__53623 = (((k53621 instanceof cljs.core.Keyword))?k53621.fqn:null);
switch (G__53623) {
case "ctx":
return self__.ctx;

break;
case "plot-size":
return self__.plot_size;

break;
case "x-lim":
return self__.x_lim;

break;
case "y-lim":
return self__.y_lim;

break;
case "x-scale":
return self__.x_scale;

break;
case "y-scale":
return self__.y_scale;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k53621,else__5299__auto__);

}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.numenta.sanity.plots-canvas.XYPlot{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ctx,self__.ctx],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$plot_DASH_size,self__.plot_size],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_lim,self__.x_lim],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_lim,self__.y_lim],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_scale,self__.x_scale],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_scale,self__.y_scale],null))], null),self__.__extmap));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__53620){
var self__ = this;
var G__53620__$1 = this;
return (new cljs.core.RecordIter((0),G__53620__$1,6,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ctx,cljs.core.cst$kw$plot_DASH_size,cljs.core.cst$kw$x_DASH_lim,cljs.core.cst$kw$y_DASH_lim,cljs.core.cst$kw$x_DASH_scale,cljs.core.cst$kw$y_DASH_scale], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (6 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
var self__ = this;
var this__5291__auto____$1 = this;
var h__5117__auto__ = self__.__hash;
if(!((h__5117__auto__ == null))){
return h__5117__auto__;
} else {
var h__5117__auto____$1 = cljs.core.hash_imap(this__5291__auto____$1);
self__.__hash = h__5117__auto____$1;

return h__5117__auto____$1;
}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
var self__ = this;
var this__5292__auto____$1 = this;
if(cljs.core.truth_((function (){var and__4670__auto__ = other__5293__auto__;
if(cljs.core.truth_(and__4670__auto__)){
var and__4670__auto____$1 = (this__5292__auto____$1.constructor === other__5293__auto__.constructor);
if(and__4670__auto____$1){
return cljs.core.equiv_map(this__5292__auto____$1,other__5293__auto__);
} else {
return and__4670__auto____$1;
}
} else {
return and__4670__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x_DASH_scale,null,cljs.core.cst$kw$plot_DASH_size,null,cljs.core.cst$kw$y_DASH_lim,null,cljs.core.cst$kw$x_DASH_lim,null,cljs.core.cst$kw$ctx,null,cljs.core.cst$kw$y_DASH_scale,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__53620){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__53624 = cljs.core.keyword_identical_QMARK_;
var expr__53625 = k__5304__auto__;
if(cljs.core.truth_((pred__53624.cljs$core$IFn$_invoke$arity$2 ? pred__53624.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$ctx,expr__53625) : pred__53624.call(null,cljs.core.cst$kw$ctx,expr__53625)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(G__53620,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53624.cljs$core$IFn$_invoke$arity$2 ? pred__53624.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$plot_DASH_size,expr__53625) : pred__53624.call(null,cljs.core.cst$kw$plot_DASH_size,expr__53625)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,G__53620,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53624.cljs$core$IFn$_invoke$arity$2 ? pred__53624.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$x_DASH_lim,expr__53625) : pred__53624.call(null,cljs.core.cst$kw$x_DASH_lim,expr__53625)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,G__53620,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53624.cljs$core$IFn$_invoke$arity$2 ? pred__53624.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$y_DASH_lim,expr__53625) : pred__53624.call(null,cljs.core.cst$kw$y_DASH_lim,expr__53625)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,G__53620,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53624.cljs$core$IFn$_invoke$arity$2 ? pred__53624.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$x_DASH_scale,expr__53625) : pred__53624.call(null,cljs.core.cst$kw$x_DASH_scale,expr__53625)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,G__53620,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53624.cljs$core$IFn$_invoke$arity$2 ? pred__53624.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$y_DASH_scale,expr__53625) : pred__53624.call(null,cljs.core.cst$kw$y_DASH_scale,expr__53625)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,G__53620,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__53620),null));
}
}
}
}
}
}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ctx,self__.ctx],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$plot_DASH_size,self__.plot_size],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_lim,self__.x_lim],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_lim,self__.y_lim],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_scale,self__.x_scale],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_scale,self__.y_scale],null))], null),self__.__extmap));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__53620){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,G__53620,self__.__extmap,self__.__hash));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$ = true;

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$texts_BANG_$arity$5 = (function (_,x,y,txts,line_height){
var self__ = this;
var ___$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (___$1){
return (function (y_px,txt){
monet.canvas.text(self__.ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$text,txt,cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,y_px], null));

return (y_px + line_height);
});})(___$1))
,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y)),txts);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$frame_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var plot_rect = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(self__.plot_size,cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0)], 0));
var G__53627 = self__.ctx;
monet.canvas.stroke_style(G__53627,"black");

monet.canvas.stroke_rect(G__53627,plot_rect);

return G__53627;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$bg_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var plot_rect = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(self__.plot_size,cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0)], 0));
var G__53628 = self__.ctx;
monet.canvas.fill_style(G__53628,"white");

monet.canvas.fill_rect(G__53628,plot_rect);

return G__53628;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$rect_BANG_$arity$5 = (function (_,x,y,w,h){
var self__ = this;
var ___$1 = this;
var xpx = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x));
var ypx = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y));
var G__53629 = self__.ctx;
monet.canvas.fill_rect(G__53629,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,xpx,cljs.core.cst$kw$y,ypx,cljs.core.cst$kw$w,((function (){var G__53630 = (x + w);
return (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(G__53630) : self__.x_scale.call(null,G__53630));
})() - xpx),cljs.core.cst$kw$h,((function (){var G__53631 = (y + h);
return (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(G__53631) : self__.y_scale.call(null,G__53631));
})() - ypx)], null));

return G__53629;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$line_BANG_$arity$2 = (function (_,xys){
var self__ = this;
var ___$1 = this;
monet.canvas.begin_path(self__.ctx);

var seq__53632_53653 = cljs.core.seq(org.numenta.sanity.plots_canvas.indexed(xys));
var chunk__53633_53654 = null;
var count__53634_53655 = (0);
var i__53635_53656 = (0);
while(true){
if((i__53635_53656 < count__53634_53655)){
var vec__53636_53657 = chunk__53633_53654.cljs$core$IIndexed$_nth$arity$2(null,i__53635_53656);
var i_53658 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53636_53657,(0),null);
var vec__53637_53659 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53636_53657,(1),null);
var x_53660 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53637_53659,(0),null);
var y_53661 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53637_53659,(1),null);
var f_53662 = (((i_53658 === (0)))?monet.canvas.move_to:monet.canvas.line_to);
var G__53638_53663 = self__.ctx;
var G__53639_53664 = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x_53660) : self__.x_scale.call(null,x_53660));
var G__53640_53665 = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y_53661) : self__.y_scale.call(null,y_53661));
(f_53662.cljs$core$IFn$_invoke$arity$3 ? f_53662.cljs$core$IFn$_invoke$arity$3(G__53638_53663,G__53639_53664,G__53640_53665) : f_53662.call(null,G__53638_53663,G__53639_53664,G__53640_53665));

var G__53666 = seq__53632_53653;
var G__53667 = chunk__53633_53654;
var G__53668 = count__53634_53655;
var G__53669 = (i__53635_53656 + (1));
seq__53632_53653 = G__53666;
chunk__53633_53654 = G__53667;
count__53634_53655 = G__53668;
i__53635_53656 = G__53669;
continue;
} else {
var temp__4653__auto___53670 = cljs.core.seq(seq__53632_53653);
if(temp__4653__auto___53670){
var seq__53632_53671__$1 = temp__4653__auto___53670;
if(cljs.core.chunked_seq_QMARK_(seq__53632_53671__$1)){
var c__5485__auto___53672 = cljs.core.chunk_first(seq__53632_53671__$1);
var G__53673 = cljs.core.chunk_rest(seq__53632_53671__$1);
var G__53674 = c__5485__auto___53672;
var G__53675 = cljs.core.count(c__5485__auto___53672);
var G__53676 = (0);
seq__53632_53653 = G__53673;
chunk__53633_53654 = G__53674;
count__53634_53655 = G__53675;
i__53635_53656 = G__53676;
continue;
} else {
var vec__53641_53677 = cljs.core.first(seq__53632_53671__$1);
var i_53678 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53641_53677,(0),null);
var vec__53642_53679 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53641_53677,(1),null);
var x_53680 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53642_53679,(0),null);
var y_53681 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53642_53679,(1),null);
var f_53682 = (((i_53678 === (0)))?monet.canvas.move_to:monet.canvas.line_to);
var G__53643_53683 = self__.ctx;
var G__53644_53684 = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x_53680) : self__.x_scale.call(null,x_53680));
var G__53645_53685 = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y_53681) : self__.y_scale.call(null,y_53681));
(f_53682.cljs$core$IFn$_invoke$arity$3 ? f_53682.cljs$core$IFn$_invoke$arity$3(G__53643_53683,G__53644_53684,G__53645_53685) : f_53682.call(null,G__53643_53683,G__53644_53684,G__53645_53685));

var G__53686 = cljs.core.next(seq__53632_53671__$1);
var G__53687 = null;
var G__53688 = (0);
var G__53689 = (0);
seq__53632_53653 = G__53686;
chunk__53633_53654 = G__53687;
count__53634_53655 = G__53688;
i__53635_53656 = G__53689;
continue;
}
} else {
}
}
break;
}

return monet.canvas.stroke(self__.ctx);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$point_BANG_$arity$4 = (function (_,x,y,radius_px){
var self__ = this;
var ___$1 = this;
var G__53646 = self__.ctx;
monet.canvas.circle(G__53646,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y)),cljs.core.cst$kw$r,radius_px], null));

monet.canvas.fill(G__53646);

monet.canvas.stroke(G__53646);

return G__53646;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$grid_BANG_$arity$2 = (function (_,p__53647){
var self__ = this;
var map__53648 = p__53647;
var map__53648__$1 = ((((!((map__53648 == null)))?((((map__53648.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53648.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53648):map__53648);
var grid_every = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__53648__$1,cljs.core.cst$kw$grid_DASH_every,(1));
var ___$1 = this;
monet.canvas.save(self__.ctx);

var vec__53650_53690 = self__.x_lim;
var x_lo_53691 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53650_53690,(0),null);
var x_hi_53692 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53650_53690,(1),null);
var vec__53651_53693 = self__.y_lim;
var y_lo_53694 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53651_53693,(0),null);
var y_hi_53695 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53651_53693,(1),null);
org.numenta.sanity.plots_canvas.draw_grid(self__.ctx,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(self__.plot_size)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(self__.plot_size)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(self__.x_scale,cljs.core.range.cljs$core$IFn$_invoke$arity$3(cljs.core.long$(x_lo_53691),(cljs.core.long$(x_hi_53692) + (1)),grid_every)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(self__.y_scale,cljs.core.range.cljs$core$IFn$_invoke$arity$3(cljs.core.long$(y_lo_53694),(cljs.core.long$(y_hi_53695) + (1)),grid_every)));

return monet.canvas.restore(self__.ctx);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$__GT_px$arity$3 = (function (_,x,y){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y))], null);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$text_BANG_$arity$4 = (function (_,x,y,txt){
var self__ = this;
var ___$1 = this;
return monet.canvas.text(self__.ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$text,txt,cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y))], null));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$text_rotated_BANG_$arity$4 = (function (_,x,y,txt){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.plots_canvas.text_rotated(self__.ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$text,txt,cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y))], null));
});

org.numenta.sanity.plots_canvas.XYPlot.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ctx,cljs.core.cst$sym$plot_DASH_size,cljs.core.cst$sym$x_DASH_lim,cljs.core.cst$sym$y_DASH_lim,cljs.core.cst$sym$x_DASH_scale,cljs.core.cst$sym$y_DASH_scale], null);
});

org.numenta.sanity.plots_canvas.XYPlot.cljs$lang$type = true;

org.numenta.sanity.plots_canvas.XYPlot.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.plots-canvas/XYPlot");
});

org.numenta.sanity.plots_canvas.XYPlot.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.numenta.sanity.plots-canvas/XYPlot");
});

org.numenta.sanity.plots_canvas.__GT_XYPlot = (function org$numenta$sanity$plots_canvas$__GT_XYPlot(ctx,plot_size,x_lim,y_lim,x_scale,y_scale){
return (new org.numenta.sanity.plots_canvas.XYPlot(ctx,plot_size,x_lim,y_lim,x_scale,y_scale,null,null,null));
});

org.numenta.sanity.plots_canvas.map__GT_XYPlot = (function org$numenta$sanity$plots_canvas$map__GT_XYPlot(G__53622){
return (new org.numenta.sanity.plots_canvas.XYPlot(cljs.core.cst$kw$ctx.cljs$core$IFn$_invoke$arity$1(G__53622),cljs.core.cst$kw$plot_DASH_size.cljs$core$IFn$_invoke$arity$1(G__53622),cljs.core.cst$kw$x_DASH_lim.cljs$core$IFn$_invoke$arity$1(G__53622),cljs.core.cst$kw$y_DASH_lim.cljs$core$IFn$_invoke$arity$1(G__53622),cljs.core.cst$kw$x_DASH_scale.cljs$core$IFn$_invoke$arity$1(G__53622),cljs.core.cst$kw$y_DASH_scale.cljs$core$IFn$_invoke$arity$1(G__53622),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__53622,cljs.core.cst$kw$ctx,cljs.core.array_seq([cljs.core.cst$kw$plot_DASH_size,cljs.core.cst$kw$x_DASH_lim,cljs.core.cst$kw$y_DASH_lim,cljs.core.cst$kw$x_DASH_scale,cljs.core.cst$kw$y_DASH_scale], 0)),null));
});

/**
 * Assumes ctx is already translated.
 */
org.numenta.sanity.plots_canvas.xy_plot = (function org$numenta$sanity$plots_canvas$xy_plot(ctx,p__53696,x_lim,y_lim){
var map__53699 = p__53696;
var map__53699__$1 = ((((!((map__53699 == null)))?((((map__53699.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53699.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53699):map__53699);
var plot_size = map__53699__$1;
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53699__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53699__$1,cljs.core.cst$kw$h);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
return org.numenta.sanity.plots_canvas.map__GT_XYPlot(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$ctx,ctx,cljs.core.cst$kw$plot_DASH_size,plot_size,cljs.core.cst$kw$x_DASH_lim,x_lim,cljs.core.cst$kw$y_DASH_lim,y_lim,cljs.core.cst$kw$x_DASH_scale,x_scale,cljs.core.cst$kw$y_DASH_scale,y_scale], null));
});
