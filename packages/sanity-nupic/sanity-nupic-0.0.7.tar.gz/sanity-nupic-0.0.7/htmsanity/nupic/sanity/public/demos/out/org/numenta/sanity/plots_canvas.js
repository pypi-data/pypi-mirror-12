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

org.numenta.sanity.plots_canvas.draw_grid = (function org$numenta$sanity$plots_canvas$draw_grid(ctx,p__53309,p__53310,xs,ys){
var vec__53321 = p__53309;
var x_lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53321,(0),null);
var x_hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53321,(1),null);
var vec__53322 = p__53310;
var y_lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53322,(0),null);
var y_hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53322,(1),null);
monet.canvas.begin_path(ctx);

var seq__53323_53331 = cljs.core.seq(xs);
var chunk__53324_53332 = null;
var count__53325_53333 = (0);
var i__53326_53334 = (0);
while(true){
if((i__53326_53334 < count__53325_53333)){
var x_53335 = chunk__53324_53332.cljs$core$IIndexed$_nth$arity$2(null,i__53326_53334);
monet.canvas.move_to(ctx,x_53335,y_lo);

monet.canvas.line_to(ctx,x_53335,y_hi);

var G__53336 = seq__53323_53331;
var G__53337 = chunk__53324_53332;
var G__53338 = count__53325_53333;
var G__53339 = (i__53326_53334 + (1));
seq__53323_53331 = G__53336;
chunk__53324_53332 = G__53337;
count__53325_53333 = G__53338;
i__53326_53334 = G__53339;
continue;
} else {
var temp__4653__auto___53340 = cljs.core.seq(seq__53323_53331);
if(temp__4653__auto___53340){
var seq__53323_53341__$1 = temp__4653__auto___53340;
if(cljs.core.chunked_seq_QMARK_(seq__53323_53341__$1)){
var c__5485__auto___53342 = cljs.core.chunk_first(seq__53323_53341__$1);
var G__53343 = cljs.core.chunk_rest(seq__53323_53341__$1);
var G__53344 = c__5485__auto___53342;
var G__53345 = cljs.core.count(c__5485__auto___53342);
var G__53346 = (0);
seq__53323_53331 = G__53343;
chunk__53324_53332 = G__53344;
count__53325_53333 = G__53345;
i__53326_53334 = G__53346;
continue;
} else {
var x_53347 = cljs.core.first(seq__53323_53341__$1);
monet.canvas.move_to(ctx,x_53347,y_lo);

monet.canvas.line_to(ctx,x_53347,y_hi);

var G__53348 = cljs.core.next(seq__53323_53341__$1);
var G__53349 = null;
var G__53350 = (0);
var G__53351 = (0);
seq__53323_53331 = G__53348;
chunk__53324_53332 = G__53349;
count__53325_53333 = G__53350;
i__53326_53334 = G__53351;
continue;
}
} else {
}
}
break;
}

var seq__53327_53352 = cljs.core.seq(ys);
var chunk__53328_53353 = null;
var count__53329_53354 = (0);
var i__53330_53355 = (0);
while(true){
if((i__53330_53355 < count__53329_53354)){
var y_53356 = chunk__53328_53353.cljs$core$IIndexed$_nth$arity$2(null,i__53330_53355);
monet.canvas.move_to(ctx,x_lo,y_53356);

monet.canvas.line_to(ctx,x_hi,y_53356);

var G__53357 = seq__53327_53352;
var G__53358 = chunk__53328_53353;
var G__53359 = count__53329_53354;
var G__53360 = (i__53330_53355 + (1));
seq__53327_53352 = G__53357;
chunk__53328_53353 = G__53358;
count__53329_53354 = G__53359;
i__53330_53355 = G__53360;
continue;
} else {
var temp__4653__auto___53361 = cljs.core.seq(seq__53327_53352);
if(temp__4653__auto___53361){
var seq__53327_53362__$1 = temp__4653__auto___53361;
if(cljs.core.chunked_seq_QMARK_(seq__53327_53362__$1)){
var c__5485__auto___53363 = cljs.core.chunk_first(seq__53327_53362__$1);
var G__53364 = cljs.core.chunk_rest(seq__53327_53362__$1);
var G__53365 = c__5485__auto___53363;
var G__53366 = cljs.core.count(c__5485__auto___53363);
var G__53367 = (0);
seq__53327_53352 = G__53364;
chunk__53328_53353 = G__53365;
count__53329_53354 = G__53366;
i__53330_53355 = G__53367;
continue;
} else {
var y_53368 = cljs.core.first(seq__53327_53362__$1);
monet.canvas.move_to(ctx,x_lo,y_53368);

monet.canvas.line_to(ctx,x_hi,y_53368);

var G__53369 = cljs.core.next(seq__53327_53362__$1);
var G__53370 = null;
var G__53371 = (0);
var G__53372 = (0);
seq__53327_53352 = G__53369;
chunk__53328_53353 = G__53370;
count__53329_53354 = G__53371;
i__53330_53355 = G__53372;
continue;
}
} else {
}
}
break;
}

return monet.canvas.stroke(ctx);
});
org.numenta.sanity.plots_canvas.scale_fn = (function org$numenta$sanity$plots_canvas$scale_fn(p__53373,size_px){
var vec__53375 = p__53373;
var lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53375,(0),null);
var hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53375,(1),null);
return ((function (vec__53375,lo,hi){
return (function (x){
return ((x - lo) * (size_px / (hi - lo)));
});
;})(vec__53375,lo,hi))
});
org.numenta.sanity.plots_canvas.text_rotated = (function org$numenta$sanity$plots_canvas$text_rotated(ctx,p__53376){
var map__53379 = p__53376;
var map__53379__$1 = ((((!((map__53379 == null)))?((((map__53379.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53379.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53379):map__53379);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53379__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53379__$1,cljs.core.cst$kw$y);
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53379__$1,cljs.core.cst$kw$text);
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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k53382,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__53384 = (((k53382 instanceof cljs.core.Keyword))?k53382.fqn:null);
switch (G__53384) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k53382,else__5299__auto__);

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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__53381){
var self__ = this;
var G__53381__$1 = this;
return (new cljs.core.RecordIter((0),G__53381__$1,6,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ctx,cljs.core.cst$kw$plot_DASH_size,cljs.core.cst$kw$x_DASH_lim,cljs.core.cst$kw$y_DASH_lim,cljs.core.cst$kw$x_DASH_scale,cljs.core.cst$kw$y_DASH_scale], null),cljs.core._iterator(self__.__extmap)));
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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__53381){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__53385 = cljs.core.keyword_identical_QMARK_;
var expr__53386 = k__5304__auto__;
if(cljs.core.truth_((pred__53385.cljs$core$IFn$_invoke$arity$2 ? pred__53385.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$ctx,expr__53386) : pred__53385.call(null,cljs.core.cst$kw$ctx,expr__53386)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(G__53381,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53385.cljs$core$IFn$_invoke$arity$2 ? pred__53385.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$plot_DASH_size,expr__53386) : pred__53385.call(null,cljs.core.cst$kw$plot_DASH_size,expr__53386)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,G__53381,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53385.cljs$core$IFn$_invoke$arity$2 ? pred__53385.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$x_DASH_lim,expr__53386) : pred__53385.call(null,cljs.core.cst$kw$x_DASH_lim,expr__53386)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,G__53381,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53385.cljs$core$IFn$_invoke$arity$2 ? pred__53385.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$y_DASH_lim,expr__53386) : pred__53385.call(null,cljs.core.cst$kw$y_DASH_lim,expr__53386)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,G__53381,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53385.cljs$core$IFn$_invoke$arity$2 ? pred__53385.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$x_DASH_scale,expr__53386) : pred__53385.call(null,cljs.core.cst$kw$x_DASH_scale,expr__53386)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,G__53381,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__53385.cljs$core$IFn$_invoke$arity$2 ? pred__53385.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$y_DASH_scale,expr__53386) : pred__53385.call(null,cljs.core.cst$kw$y_DASH_scale,expr__53386)))){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,G__53381,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__53381),null));
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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__53381){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,G__53381,self__.__extmap,self__.__hash));
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
var G__53388 = self__.ctx;
monet.canvas.stroke_style(G__53388,"black");

monet.canvas.stroke_rect(G__53388,plot_rect);

return G__53388;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$bg_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var plot_rect = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(self__.plot_size,cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0)], 0));
var G__53389 = self__.ctx;
monet.canvas.fill_style(G__53389,"white");

monet.canvas.fill_rect(G__53389,plot_rect);

return G__53389;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$rect_BANG_$arity$5 = (function (_,x,y,w,h){
var self__ = this;
var ___$1 = this;
var xpx = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x));
var ypx = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y));
var G__53390 = self__.ctx;
monet.canvas.fill_rect(G__53390,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,xpx,cljs.core.cst$kw$y,ypx,cljs.core.cst$kw$w,((function (){var G__53391 = (x + w);
return (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(G__53391) : self__.x_scale.call(null,G__53391));
})() - xpx),cljs.core.cst$kw$h,((function (){var G__53392 = (y + h);
return (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(G__53392) : self__.y_scale.call(null,G__53392));
})() - ypx)], null));

return G__53390;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$line_BANG_$arity$2 = (function (_,xys){
var self__ = this;
var ___$1 = this;
monet.canvas.begin_path(self__.ctx);

var seq__53393_53414 = cljs.core.seq(org.numenta.sanity.plots_canvas.indexed(xys));
var chunk__53394_53415 = null;
var count__53395_53416 = (0);
var i__53396_53417 = (0);
while(true){
if((i__53396_53417 < count__53395_53416)){
var vec__53397_53418 = chunk__53394_53415.cljs$core$IIndexed$_nth$arity$2(null,i__53396_53417);
var i_53419 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53397_53418,(0),null);
var vec__53398_53420 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53397_53418,(1),null);
var x_53421 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53398_53420,(0),null);
var y_53422 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53398_53420,(1),null);
var f_53423 = (((i_53419 === (0)))?monet.canvas.move_to:monet.canvas.line_to);
var G__53399_53424 = self__.ctx;
var G__53400_53425 = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x_53421) : self__.x_scale.call(null,x_53421));
var G__53401_53426 = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y_53422) : self__.y_scale.call(null,y_53422));
(f_53423.cljs$core$IFn$_invoke$arity$3 ? f_53423.cljs$core$IFn$_invoke$arity$3(G__53399_53424,G__53400_53425,G__53401_53426) : f_53423.call(null,G__53399_53424,G__53400_53425,G__53401_53426));

var G__53427 = seq__53393_53414;
var G__53428 = chunk__53394_53415;
var G__53429 = count__53395_53416;
var G__53430 = (i__53396_53417 + (1));
seq__53393_53414 = G__53427;
chunk__53394_53415 = G__53428;
count__53395_53416 = G__53429;
i__53396_53417 = G__53430;
continue;
} else {
var temp__4653__auto___53431 = cljs.core.seq(seq__53393_53414);
if(temp__4653__auto___53431){
var seq__53393_53432__$1 = temp__4653__auto___53431;
if(cljs.core.chunked_seq_QMARK_(seq__53393_53432__$1)){
var c__5485__auto___53433 = cljs.core.chunk_first(seq__53393_53432__$1);
var G__53434 = cljs.core.chunk_rest(seq__53393_53432__$1);
var G__53435 = c__5485__auto___53433;
var G__53436 = cljs.core.count(c__5485__auto___53433);
var G__53437 = (0);
seq__53393_53414 = G__53434;
chunk__53394_53415 = G__53435;
count__53395_53416 = G__53436;
i__53396_53417 = G__53437;
continue;
} else {
var vec__53402_53438 = cljs.core.first(seq__53393_53432__$1);
var i_53439 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53402_53438,(0),null);
var vec__53403_53440 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53402_53438,(1),null);
var x_53441 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53403_53440,(0),null);
var y_53442 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53403_53440,(1),null);
var f_53443 = (((i_53439 === (0)))?monet.canvas.move_to:monet.canvas.line_to);
var G__53404_53444 = self__.ctx;
var G__53405_53445 = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x_53441) : self__.x_scale.call(null,x_53441));
var G__53406_53446 = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y_53442) : self__.y_scale.call(null,y_53442));
(f_53443.cljs$core$IFn$_invoke$arity$3 ? f_53443.cljs$core$IFn$_invoke$arity$3(G__53404_53444,G__53405_53445,G__53406_53446) : f_53443.call(null,G__53404_53444,G__53405_53445,G__53406_53446));

var G__53447 = cljs.core.next(seq__53393_53432__$1);
var G__53448 = null;
var G__53449 = (0);
var G__53450 = (0);
seq__53393_53414 = G__53447;
chunk__53394_53415 = G__53448;
count__53395_53416 = G__53449;
i__53396_53417 = G__53450;
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
var G__53407 = self__.ctx;
monet.canvas.circle(G__53407,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y)),cljs.core.cst$kw$r,radius_px], null));

monet.canvas.fill(G__53407);

monet.canvas.stroke(G__53407);

return G__53407;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$grid_BANG_$arity$2 = (function (_,p__53408){
var self__ = this;
var map__53409 = p__53408;
var map__53409__$1 = ((((!((map__53409 == null)))?((((map__53409.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53409.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53409):map__53409);
var grid_every = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__53409__$1,cljs.core.cst$kw$grid_DASH_every,(1));
var ___$1 = this;
monet.canvas.save(self__.ctx);

var vec__53411_53451 = self__.x_lim;
var x_lo_53452 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53411_53451,(0),null);
var x_hi_53453 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53411_53451,(1),null);
var vec__53412_53454 = self__.y_lim;
var y_lo_53455 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53412_53454,(0),null);
var y_hi_53456 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53412_53454,(1),null);
org.numenta.sanity.plots_canvas.draw_grid(self__.ctx,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(self__.plot_size)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(self__.plot_size)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(self__.x_scale,cljs.core.range.cljs$core$IFn$_invoke$arity$3(cljs.core.long$(x_lo_53452),(cljs.core.long$(x_hi_53453) + (1)),grid_every)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(self__.y_scale,cljs.core.range.cljs$core$IFn$_invoke$arity$3(cljs.core.long$(y_lo_53455),(cljs.core.long$(y_hi_53456) + (1)),grid_every)));

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

org.numenta.sanity.plots_canvas.map__GT_XYPlot = (function org$numenta$sanity$plots_canvas$map__GT_XYPlot(G__53383){
return (new org.numenta.sanity.plots_canvas.XYPlot(cljs.core.cst$kw$ctx.cljs$core$IFn$_invoke$arity$1(G__53383),cljs.core.cst$kw$plot_DASH_size.cljs$core$IFn$_invoke$arity$1(G__53383),cljs.core.cst$kw$x_DASH_lim.cljs$core$IFn$_invoke$arity$1(G__53383),cljs.core.cst$kw$y_DASH_lim.cljs$core$IFn$_invoke$arity$1(G__53383),cljs.core.cst$kw$x_DASH_scale.cljs$core$IFn$_invoke$arity$1(G__53383),cljs.core.cst$kw$y_DASH_scale.cljs$core$IFn$_invoke$arity$1(G__53383),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__53383,cljs.core.cst$kw$ctx,cljs.core.array_seq([cljs.core.cst$kw$plot_DASH_size,cljs.core.cst$kw$x_DASH_lim,cljs.core.cst$kw$y_DASH_lim,cljs.core.cst$kw$x_DASH_scale,cljs.core.cst$kw$y_DASH_scale], 0)),null));
});

/**
 * Assumes ctx is already translated.
 */
org.numenta.sanity.plots_canvas.xy_plot = (function org$numenta$sanity$plots_canvas$xy_plot(ctx,p__53457,x_lim,y_lim){
var map__53460 = p__53457;
var map__53460__$1 = ((((!((map__53460 == null)))?((((map__53460.cljs$lang$protocol_mask$partition0$ & (64))) || (map__53460.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53460):map__53460);
var plot_size = map__53460__$1;
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53460__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53460__$1,cljs.core.cst$kw$h);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
return org.numenta.sanity.plots_canvas.map__GT_XYPlot(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$ctx,ctx,cljs.core.cst$kw$plot_DASH_size,plot_size,cljs.core.cst$kw$x_DASH_lim,x_lim,cljs.core.cst$kw$y_DASH_lim,y_lim,cljs.core.cst$kw$x_DASH_scale,x_scale,cljs.core.cst$kw$y_DASH_scale,y_scale], null));
});
