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

org.numenta.sanity.plots_canvas.draw_grid = (function org$numenta$sanity$plots_canvas$draw_grid(ctx,p__53311,p__53312,xs,ys){
var vec__53323 = p__53311;
var x_lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53323,(0),null);
var x_hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53323,(1),null);
var vec__53324 = p__53312;
var y_lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53324,(0),null);
var y_hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53324,(1),null);
monet.canvas.begin_path(ctx);

var seq__53325_53333 = cljs.core.seq(xs);
var chunk__53326_53334 = null;
var count__53327_53335 = (0);
var i__53328_53336 = (0);
while(true){
if((i__53328_53336 < count__53327_53335)){
var x_53337 = chunk__53326_53334.cljs$core$IIndexed$_nth$arity$2(null,i__53328_53336);
monet.canvas.move_to(ctx,x_53337,y_lo);

monet.canvas.line_to(ctx,x_53337,y_hi);

var G__53338 = seq__53325_53333;
var G__53339 = chunk__53326_53334;
var G__53340 = count__53327_53335;
var G__53341 = (i__53328_53336 + (1));
seq__53325_53333 = G__53338;
chunk__53326_53334 = G__53339;
count__53327_53335 = G__53340;
i__53328_53336 = G__53341;
continue;
} else {
var temp__4653__auto___53342 = cljs.core.seq(seq__53325_53333);
if(temp__4653__auto___53342){
var seq__53325_53343__$1 = temp__4653__auto___53342;
if(cljs.core.chunked_seq_QMARK_(seq__53325_53343__$1)){
var c__5485__auto___53344 = cljs.core.chunk_first(seq__53325_53343__$1);
var G__53345 = cljs.core.chunk_rest(seq__53325_53343__$1);
var G__53346 = c__5485__auto___53344;
var G__53347 = cljs.core.count(c__5485__auto___53344);
var G__53348 = (0);
seq__53325_53333 = G__53345;
chunk__53326_53334 = G__53346;
count__53327_53335 = G__53347;
i__53328_53336 = G__53348;
continue;
} else {
var x_53349 = cljs.core.first(seq__53325_53343__$1);
monet.canvas.move_to(ctx,x_53349,y_lo);

monet.canvas.line_to(ctx,x_53349,y_hi);

var G__53350 = cljs.core.next(seq__53325_53343__$1);
var G__53351 = null;
var G__53352 = (0);
var G__53353 = (0);
seq__53325_53333 = G__53350;
chunk__53326_53334 = G__53351;
count__53327_53335 = G__53352;
i__53328_53336 = G__53353;
continue;
}
} else {
}
}
break;
}

var seq__53329_53354 = cljs.core.seq(ys);
var chunk__53330_53355 = null;
var count__53331_53356 = (0);
var i__53332_53357 = (0);
while(true){
if((i__53332_53357 < count__53331_53356)){
var y_53358 = chunk__53330_53355.cljs$core$IIndexed$_nth$arity$2(null,i__53332_53357);
monet.canvas.move_to(ctx,x_lo,y_53358);

monet.canvas.line_to(ctx,x_hi,y_53358);

var G__53359 = seq__53329_53354;
var G__53360 = chunk__53330_53355;
var G__53361 = count__53331_53356;
var G__53362 = (i__53332_53357 + (1));
seq__53329_53354 = G__53359;
chunk__53330_53355 = G__53360;
count__53331_53356 = G__53361;
i__53332_53357 = G__53362;
continue;
} else {
var temp__4653__auto___53363 = cljs.core.seq(seq__53329_53354);
if(temp__4653__auto___53363){
var seq__53329_53364__$1 = temp__4653__auto___53363;
if(cljs.core.chunked_seq_QMARK_(seq__53329_53364__$1)){
var c__5485__auto___53365 = cljs.core.chunk_first(seq__53329_53364__$1);
var G__53366 = cljs.core.chunk_rest(seq__53329_53364__$1);
var G__53367 = c__5485__auto___53365;
var G__53368 = cljs.core.count(c__5485__auto___53365);
var G__53369 = (0);
seq__53329_53354 = G__53366;
chunk__53330_53355 = G__53367;
count__53331_53356 = G__53368;
i__53332_53357 = G__53369;
continue;
} else {
var y_53370 = cljs.core.first(seq__53329_53364__$1);
monet.canvas.move_to(ctx,x_lo,y_53370);

monet.canvas.line_to(ctx,x_hi,y_53370);

var G__53371 = cljs.core.next(seq__53329_53364__$1);
var G__53372 = null;
var G__53373 = (0);
var G__53374 = (0);
seq__53329_53354 = G__53371;
chunk__53330_53355 = G__53372;
count__53331_53356 = G__53373;
i__53332_53357 = G__53374;
continue;
}
} else {
}
}
break;
}

return monet.canvas.stroke(ctx);
});
org.numenta.sanity.plots_canvas.scale_fn = (function org$numenta$sanity$plots_canvas$scale_fn(p__53375,size_px){
var vec__53377 = p__53375;
var lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53377,(0),null);
var hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53377,(1),null);
return ((function (vec__53377,lo,hi){
return (function (x){
return ((x - lo) * (size_px / (hi - lo)));
});
;})(vec__53377,lo,hi))
});
org.numenta.sanity.plots_canvas.text_rotated = (function org$numenta$sanity$plots_canvas$text_rotated(ctx,p__53378){
var map__53381 = p__53378;
var map__53381__$1 = ((((!((map__53381 == null)))?((((map__53381.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53381.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53381):map__53381);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53381__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53381__$1,cljs.core.cst$kw$y);
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53381__$1,cljs.core.cst$kw$text);
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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k53384,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__53386 = (((k53384 instanceof cljs.core.Keyword))?k53384.fqn:null);
switch (G__53386) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k53384,else__5299__auto__);

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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__53383){
var self__ = this;
var G__53383__$1 = this;
return (new cljs.core.RecordIter((0),G__53383__$1,6,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ctx,cljs.core.cst$kw$plot_DASH_size,cljs.core.cst$kw$x_DASH_lim,cljs.core.cst$kw$y_DASH_lim,cljs.core.cst$kw$x_DASH_scale,cljs.core.cst$kw$y_DASH_scale], null),cljs.core._iterator(self__.__extmap)));
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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__53383){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__53387 = cljs.core.keyword_identical_QMARK_;
var expr__53388 = k__5304__auto__;
if(cljs.core.truth_((pred__53387.cljs$core$IFn$_invoke$arity$2 ? pred__53387.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$ctx,expr__53388) : pred__53387.call(null,cljs.core.cst$kw$ctx,expr__53388)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(G__53383,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53387.cljs$core$IFn$_invoke$arity$2 ? pred__53387.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$plot_DASH_size,expr__53388) : pred__53387.call(null,cljs.core.cst$kw$plot_DASH_size,expr__53388)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,G__53383,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53387.cljs$core$IFn$_invoke$arity$2 ? pred__53387.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$x_DASH_lim,expr__53388) : pred__53387.call(null,cljs.core.cst$kw$x_DASH_lim,expr__53388)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,G__53383,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53387.cljs$core$IFn$_invoke$arity$2 ? pred__53387.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$y_DASH_lim,expr__53388) : pred__53387.call(null,cljs.core.cst$kw$y_DASH_lim,expr__53388)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,G__53383,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53387.cljs$core$IFn$_invoke$arity$2 ? pred__53387.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$x_DASH_scale,expr__53388) : pred__53387.call(null,cljs.core.cst$kw$x_DASH_scale,expr__53388)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,G__53383,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53387.cljs$core$IFn$_invoke$arity$2 ? pred__53387.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$y_DASH_scale,expr__53388) : pred__53387.call(null,cljs.core.cst$kw$y_DASH_scale,expr__53388)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,G__53383,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__53383),null));
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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__53383){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,G__53383,self__.__extmap,self__.__hash));
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
var G__53390 = self__.ctx;
monet.canvas.stroke_style(G__53390,"black");

monet.canvas.stroke_rect(G__53390,plot_rect);

return G__53390;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$bg_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var plot_rect = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(self__.plot_size,cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0)], 0));
var G__53391 = self__.ctx;
monet.canvas.fill_style(G__53391,"white");

monet.canvas.fill_rect(G__53391,plot_rect);

return G__53391;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$rect_BANG_$arity$5 = (function (_,x,y,w,h){
var self__ = this;
var ___$1 = this;
var xpx = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x));
var ypx = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y));
var G__53392 = self__.ctx;
monet.canvas.fill_rect(G__53392,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,xpx,cljs.core.cst$kw$y,ypx,cljs.core.cst$kw$w,((function (){var G__53393 = (x + w);
return (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(G__53393) : self__.x_scale.call(null,G__53393));
})() - xpx),cljs.core.cst$kw$h,((function (){var G__53394 = (y + h);
return (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(G__53394) : self__.y_scale.call(null,G__53394));
})() - ypx)], null));

return G__53392;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$line_BANG_$arity$2 = (function (_,xys){
var self__ = this;
var ___$1 = this;
monet.canvas.begin_path(self__.ctx);

var seq__53395_53416 = cljs.core.seq(org.numenta.sanity.plots_canvas.indexed(xys));
var chunk__53396_53417 = null;
var count__53397_53418 = (0);
var i__53398_53419 = (0);
while(true){
if((i__53398_53419 < count__53397_53418)){
var vec__53399_53420 = chunk__53396_53417.cljs$core$IIndexed$_nth$arity$2(null,i__53398_53419);
var i_53421 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53399_53420,(0),null);
var vec__53400_53422 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53399_53420,(1),null);
var x_53423 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53400_53422,(0),null);
var y_53424 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53400_53422,(1),null);
var f_53425 = (((i_53421 === (0)))?monet.canvas.move_to:monet.canvas.line_to);
var G__53401_53426 = self__.ctx;
var G__53402_53427 = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x_53423) : self__.x_scale.call(null,x_53423));
var G__53403_53428 = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y_53424) : self__.y_scale.call(null,y_53424));
(f_53425.cljs$core$IFn$_invoke$arity$3 ? f_53425.cljs$core$IFn$_invoke$arity$3(G__53401_53426,G__53402_53427,G__53403_53428) : f_53425.call(null,G__53401_53426,G__53402_53427,G__53403_53428));

var G__53429 = seq__53395_53416;
var G__53430 = chunk__53396_53417;
var G__53431 = count__53397_53418;
var G__53432 = (i__53398_53419 + (1));
seq__53395_53416 = G__53429;
chunk__53396_53417 = G__53430;
count__53397_53418 = G__53431;
i__53398_53419 = G__53432;
continue;
} else {
var temp__4653__auto___53433 = cljs.core.seq(seq__53395_53416);
if(temp__4653__auto___53433){
var seq__53395_53434__$1 = temp__4653__auto___53433;
if(cljs.core.chunked_seq_QMARK_(seq__53395_53434__$1)){
var c__5485__auto___53435 = cljs.core.chunk_first(seq__53395_53434__$1);
var G__53436 = cljs.core.chunk_rest(seq__53395_53434__$1);
var G__53437 = c__5485__auto___53435;
var G__53438 = cljs.core.count(c__5485__auto___53435);
var G__53439 = (0);
seq__53395_53416 = G__53436;
chunk__53396_53417 = G__53437;
count__53397_53418 = G__53438;
i__53398_53419 = G__53439;
continue;
} else {
var vec__53404_53440 = cljs.core.first(seq__53395_53434__$1);
var i_53441 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53404_53440,(0),null);
var vec__53405_53442 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53404_53440,(1),null);
var x_53443 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53405_53442,(0),null);
var y_53444 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53405_53442,(1),null);
var f_53445 = (((i_53441 === (0)))?monet.canvas.move_to:monet.canvas.line_to);
var G__53406_53446 = self__.ctx;
var G__53407_53447 = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x_53443) : self__.x_scale.call(null,x_53443));
var G__53408_53448 = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y_53444) : self__.y_scale.call(null,y_53444));
(f_53445.cljs$core$IFn$_invoke$arity$3 ? f_53445.cljs$core$IFn$_invoke$arity$3(G__53406_53446,G__53407_53447,G__53408_53448) : f_53445.call(null,G__53406_53446,G__53407_53447,G__53408_53448));

var G__53449 = cljs.core.next(seq__53395_53434__$1);
var G__53450 = null;
var G__53451 = (0);
var G__53452 = (0);
seq__53395_53416 = G__53449;
chunk__53396_53417 = G__53450;
count__53397_53418 = G__53451;
i__53398_53419 = G__53452;
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
var G__53409 = self__.ctx;
monet.canvas.circle(G__53409,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y)),cljs.core.cst$kw$r,radius_px], null));

monet.canvas.fill(G__53409);

monet.canvas.stroke(G__53409);

return G__53409;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$grid_BANG_$arity$2 = (function (_,p__53410){
var self__ = this;
var map__53411 = p__53410;
var map__53411__$1 = ((((!((map__53411 == null)))?((((map__53411.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53411.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53411):map__53411);
var grid_every = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__53411__$1,cljs.core.cst$kw$grid_DASH_every,(1));
var ___$1 = this;
monet.canvas.save(self__.ctx);

var vec__53413_53453 = self__.x_lim;
var x_lo_53454 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53413_53453,(0),null);
var x_hi_53455 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53413_53453,(1),null);
var vec__53414_53456 = self__.y_lim;
var y_lo_53457 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53414_53456,(0),null);
var y_hi_53458 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53414_53456,(1),null);
org.numenta.sanity.plots_canvas.draw_grid(self__.ctx,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(self__.plot_size)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(self__.plot_size)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(self__.x_scale,cljs.core.range.cljs$core$IFn$_invoke$arity$3(cljs.core.long$(x_lo_53454),(cljs.core.long$(x_hi_53455) + (1)),grid_every)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(self__.y_scale,cljs.core.range.cljs$core$IFn$_invoke$arity$3(cljs.core.long$(y_lo_53457),(cljs.core.long$(y_hi_53458) + (1)),grid_every)));

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

org.numenta.sanity.plots_canvas.map__GT_XYPlot = (function org$numenta$sanity$plots_canvas$map__GT_XYPlot(G__53385){
return (new org.numenta.sanity.plots_canvas.XYPlot(cljs.core.cst$kw$ctx.cljs$core$IFn$_invoke$arity$1(G__53385),cljs.core.cst$kw$plot_DASH_size.cljs$core$IFn$_invoke$arity$1(G__53385),cljs.core.cst$kw$x_DASH_lim.cljs$core$IFn$_invoke$arity$1(G__53385),cljs.core.cst$kw$y_DASH_lim.cljs$core$IFn$_invoke$arity$1(G__53385),cljs.core.cst$kw$x_DASH_scale.cljs$core$IFn$_invoke$arity$1(G__53385),cljs.core.cst$kw$y_DASH_scale.cljs$core$IFn$_invoke$arity$1(G__53385),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__53385,cljs.core.cst$kw$ctx,cljs.core.array_seq([cljs.core.cst$kw$plot_DASH_size,cljs.core.cst$kw$x_DASH_lim,cljs.core.cst$kw$y_DASH_lim,cljs.core.cst$kw$x_DASH_scale,cljs.core.cst$kw$y_DASH_scale], 0)),null));
});

/**
 * Assumes ctx is already translated.
 */
org.numenta.sanity.plots_canvas.xy_plot = (function org$numenta$sanity$plots_canvas$xy_plot(ctx,p__53459,x_lim,y_lim){
var map__53462 = p__53459;
var map__53462__$1 = ((((!((map__53462 == null)))?((((map__53462.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53462.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53462):map__53462);
var plot_size = map__53462__$1;
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53462__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53462__$1,cljs.core.cst$kw$h);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
return org.numenta.sanity.plots_canvas.map__GT_XYPlot(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$ctx,ctx,cljs.core.cst$kw$plot_DASH_size,plot_size,cljs.core.cst$kw$x_DASH_lim,x_lim,cljs.core.cst$kw$y_DASH_lim,y_lim,cljs.core.cst$kw$x_DASH_scale,x_scale,cljs.core.cst$kw$y_DASH_scale,y_scale], null));
});
