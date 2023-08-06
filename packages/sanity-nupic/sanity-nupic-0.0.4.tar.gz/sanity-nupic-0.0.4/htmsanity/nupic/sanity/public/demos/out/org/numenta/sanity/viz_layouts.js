// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.viz_layouts');
goog.require('cljs.core');
goog.require('monet.canvas');
goog.require('tailrecursion.priority_map');
goog.require('org.nfrac.comportex.protocols');
goog.require('org.nfrac.comportex.topology');

/**
 * @interface
 */
org.numenta.sanity.viz_layouts.PBox = function(){};

/**
 * Returns `{:x :y :w :h}` defining bounding box from top left.
 */
org.numenta.sanity.viz_layouts.layout_bounds = (function org$numenta$sanity$viz_layouts$layout_bounds(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.layout_bounds[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.layout_bounds["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PBox.layout-bounds",this$);
}
}
}
});


/**
 * @interface
 */
org.numenta.sanity.viz_layouts.PArrayLayout = function(){};

/**
 * Returns [x y] pixel coordinates for top left of time offset dt.
 */
org.numenta.sanity.viz_layouts.origin_px_topleft = (function org$numenta$sanity$viz_layouts$origin_px_topleft(this$,dt){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2(this$,dt);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.origin_px_topleft[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,dt) : m__5338__auto__.call(null,this$,dt));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.origin_px_topleft["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,dt) : m__5338__auto____$1.call(null,this$,dt));
} else {
throw cljs.core.missing_protocol("PArrayLayout.origin-px-topleft",this$);
}
}
}
});

/**
 * Returns `{:x :y :w :h}` defining local bounding box relative to dt origin.
 */
org.numenta.sanity.viz_layouts.local_dt_bounds = (function org$numenta$sanity$viz_layouts$local_dt_bounds(this$,dt){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2(this$,dt);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.local_dt_bounds[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,dt) : m__5338__auto__.call(null,this$,dt));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.local_dt_bounds["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,dt) : m__5338__auto____$1.call(null,this$,dt));
} else {
throw cljs.core.missing_protocol("PArrayLayout.local-dt-bounds",this$);
}
}
}
});

/**
 * Returns [x y] pixel coordinates for id relative to the dt origin.
 */
org.numenta.sanity.viz_layouts.local_px_topleft = (function org$numenta$sanity$viz_layouts$local_px_topleft(this$,id){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2(this$,id);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.local_px_topleft[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,id) : m__5338__auto__.call(null,this$,id));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.local_px_topleft["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,id) : m__5338__auto____$1.call(null,this$,id));
} else {
throw cljs.core.missing_protocol("PArrayLayout.local-px-topleft",this$);
}
}
}
});

/**
 * The size [w h] in pixels of each drawn array element.
 */
org.numenta.sanity.viz_layouts.element_size_px = (function org$numenta$sanity$viz_layouts$element_size_px(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.element_size_px[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.element_size_px["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PArrayLayout.element-size-px",this$);
}
}
}
});

/**
 * Current scroll position, giving the first element index visible on screen.
 */
org.numenta.sanity.viz_layouts.scroll_position = (function org$numenta$sanity$viz_layouts$scroll_position(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.scroll_position[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.scroll_position["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PArrayLayout.scroll-position",this$);
}
}
}
});

/**
 * Updates the layout with scroll position adjusted up or down one page.
 */
org.numenta.sanity.viz_layouts.scroll = (function org$numenta$sanity$viz_layouts$scroll(this$,down_QMARK_){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2(this$,down_QMARK_);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.scroll[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,down_QMARK_) : m__5338__auto__.call(null,this$,down_QMARK_));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.scroll["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,down_QMARK_) : m__5338__auto____$1.call(null,this$,down_QMARK_));
} else {
throw cljs.core.missing_protocol("PArrayLayout.scroll",this$);
}
}
}
});

/**
 * Returns the total number of ids
 */
org.numenta.sanity.viz_layouts.ids_count = (function org$numenta$sanity$viz_layouts$ids_count(_){
if((!((_ == null))) && (!((_.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1 == null)))){
return _.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1(_);
} else {
var x__5337__auto__ = (((_ == null))?null:_);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.ids_count[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5338__auto__.call(null,_));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.ids_count["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(_) : m__5338__auto____$1.call(null,_));
} else {
throw cljs.core.missing_protocol("PArrayLayout.ids-count",_);
}
}
}
});

/**
 * Returns the number of ids onscreen in constant time
 */
org.numenta.sanity.viz_layouts.ids_onscreen_count = (function org$numenta$sanity$viz_layouts$ids_onscreen_count(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.ids_onscreen_count[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.ids_onscreen_count["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PArrayLayout.ids-onscreen-count",this$);
}
}
}
});

/**
 * Sequence of element ids per timestep currently drawn in the layout.
 */
org.numenta.sanity.viz_layouts.ids_onscreen = (function org$numenta$sanity$viz_layouts$ids_onscreen(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.ids_onscreen[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.ids_onscreen["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PArrayLayout.ids-onscreen",this$);
}
}
}
});

/**
 * Checks whether the element id is currently drawn in the layout.
 */
org.numenta.sanity.viz_layouts.id_onscreen_QMARK_ = (function org$numenta$sanity$viz_layouts$id_onscreen_QMARK_(this$,id){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2(this$,id);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.id_onscreen_QMARK_[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,id) : m__5338__auto__.call(null,this$,id));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.id_onscreen_QMARK_["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,id) : m__5338__auto____$1.call(null,this$,id));
} else {
throw cljs.core.missing_protocol("PArrayLayout.id-onscreen?",this$);
}
}
}
});

/**
 * Returns [dt id] for the [x y] pixel coordinates, or null.
 */
org.numenta.sanity.viz_layouts.clicked_id = (function org$numenta$sanity$viz_layouts$clicked_id(this$,x,y){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3(this$,x,y);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.clicked_id[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$3(this$,x,y) : m__5338__auto__.call(null,this$,x,y));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.clicked_id["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,x,y) : m__5338__auto____$1.call(null,this$,x,y));
} else {
throw cljs.core.missing_protocol("PArrayLayout.clicked-id",this$);
}
}
}
});

/**
 * Draws the element in dt-local coordinates. Does not stroke or fill.
 */
org.numenta.sanity.viz_layouts.draw_element = (function org$numenta$sanity$viz_layouts$draw_element(this$,ctx,id){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3(this$,ctx,id);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.draw_element[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$3(this$,ctx,id) : m__5338__auto__.call(null,this$,ctx,id));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.draw_element["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,ctx,id) : m__5338__auto____$1.call(null,this$,ctx,id));
} else {
throw cljs.core.missing_protocol("PArrayLayout.draw-element",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.right_px = (function org$numenta$sanity$viz_layouts$right_px(this$){
var b = org.numenta.sanity.viz_layouts.layout_bounds(this$);
return (cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(b) + cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(b));
});
/**
 * Returns pixel coordinates on the canvas `[x y]` for the
 * center of an input element `id` at time delay `dt`.
 */
org.numenta.sanity.viz_layouts.element_xy = (function org$numenta$sanity$viz_layouts$element_xy(lay,id,dt){
var vec__40958 = org.numenta.sanity.viz_layouts.element_size_px(lay);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40958,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40958,(1),null);
var vec__40959 = org.numenta.sanity.viz_layouts.origin_px_topleft(lay,dt);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40959,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40959,(1),null);
var vec__40960 = org.numenta.sanity.viz_layouts.local_px_topleft(lay,id);
var lx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40960,(0),null);
var ly = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40960,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((x + lx) + (w * 0.5)),((y + ly) + (h * 0.5))], null);
});
/**
 * Fills all elements with the given ids (in a single path if
 *   possible). For efficiency, skips any ids which are currently
 *   offscreen.
 */
org.numenta.sanity.viz_layouts.fill_elements = (function org$numenta$sanity$viz_layouts$fill_elements(lay,ctx,ids){
var one_d_QMARK_ = ((1) === cljs.core.count(org.nfrac.comportex.protocols.dims_of(lay)));
monet.canvas.begin_path(ctx);

var seq__40967_40973 = cljs.core.seq(ids);
var chunk__40969_40974 = null;
var count__40970_40975 = (0);
var i__40971_40976 = (0);
while(true){
if((i__40971_40976 < count__40970_40975)){
var id_40977 = chunk__40969_40974.cljs$core$IIndexed$_nth$arity$2(null,i__40971_40976);
if(cljs.core.truth_(org.numenta.sanity.viz_layouts.id_onscreen_QMARK_(lay,id_40977))){
org.numenta.sanity.viz_layouts.draw_element(lay,ctx,id_40977);

if(one_d_QMARK_){
} else {
monet.canvas.fill(ctx);

monet.canvas.begin_path(ctx);
}

var G__40978 = seq__40967_40973;
var G__40979 = chunk__40969_40974;
var G__40980 = count__40970_40975;
var G__40981 = (i__40971_40976 + (1));
seq__40967_40973 = G__40978;
chunk__40969_40974 = G__40979;
count__40970_40975 = G__40980;
i__40971_40976 = G__40981;
continue;
} else {
var G__40982 = seq__40967_40973;
var G__40983 = chunk__40969_40974;
var G__40984 = count__40970_40975;
var G__40985 = (i__40971_40976 + (1));
seq__40967_40973 = G__40982;
chunk__40969_40974 = G__40983;
count__40970_40975 = G__40984;
i__40971_40976 = G__40985;
continue;
}
} else {
var temp__4653__auto___40986 = cljs.core.seq(seq__40967_40973);
if(temp__4653__auto___40986){
var seq__40967_40987__$1 = temp__4653__auto___40986;
if(cljs.core.chunked_seq_QMARK_(seq__40967_40987__$1)){
var c__5485__auto___40988 = cljs.core.chunk_first(seq__40967_40987__$1);
var G__40989 = cljs.core.chunk_rest(seq__40967_40987__$1);
var G__40990 = c__5485__auto___40988;
var G__40991 = cljs.core.count(c__5485__auto___40988);
var G__40992 = (0);
seq__40967_40973 = G__40989;
chunk__40969_40974 = G__40990;
count__40970_40975 = G__40991;
i__40971_40976 = G__40992;
continue;
} else {
var id_40993 = cljs.core.first(seq__40967_40987__$1);
if(cljs.core.truth_(org.numenta.sanity.viz_layouts.id_onscreen_QMARK_(lay,id_40993))){
org.numenta.sanity.viz_layouts.draw_element(lay,ctx,id_40993);

if(one_d_QMARK_){
} else {
monet.canvas.fill(ctx);

monet.canvas.begin_path(ctx);
}

var G__40994 = cljs.core.next(seq__40967_40987__$1);
var G__40995 = null;
var G__40996 = (0);
var G__40997 = (0);
seq__40967_40973 = G__40994;
chunk__40969_40974 = G__40995;
count__40970_40975 = G__40996;
i__40971_40976 = G__40997;
continue;
} else {
var G__40998 = cljs.core.next(seq__40967_40987__$1);
var G__40999 = null;
var G__41000 = (0);
var G__41001 = (0);
seq__40967_40973 = G__40998;
chunk__40969_40974 = G__40999;
count__40970_40975 = G__41000;
i__40971_40976 = G__41001;
continue;
}
}
} else {
}
}
break;
}

if(one_d_QMARK_){
monet.canvas.fill(ctx);
} else {
}

return ctx;
});
/**
 * Groups the map `id-styles` by key, each key being a style value.
 * For each such group, calls `set-style` with the value and then
 * fills the group of elements.
 */
org.numenta.sanity.viz_layouts.group_and_fill_elements = (function org$numenta$sanity$viz_layouts$group_and_fill_elements(lay,ctx,id_styles,set_style){
monet.canvas.save(ctx);

var seq__41008_41014 = cljs.core.seq(cljs.core.group_by(id_styles,cljs.core.keys(id_styles)));
var chunk__41009_41015 = null;
var count__41010_41016 = (0);
var i__41011_41017 = (0);
while(true){
if((i__41011_41017 < count__41010_41016)){
var vec__41012_41018 = chunk__41009_41015.cljs$core$IIndexed$_nth$arity$2(null,i__41011_41017);
var style_41019 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41012_41018,(0),null);
var ids_41020 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41012_41018,(1),null);
(set_style.cljs$core$IFn$_invoke$arity$2 ? set_style.cljs$core$IFn$_invoke$arity$2(ctx,style_41019) : set_style.call(null,ctx,style_41019));

org.numenta.sanity.viz_layouts.fill_elements(lay,ctx,ids_41020);

monet.canvas.fill(ctx);

var G__41021 = seq__41008_41014;
var G__41022 = chunk__41009_41015;
var G__41023 = count__41010_41016;
var G__41024 = (i__41011_41017 + (1));
seq__41008_41014 = G__41021;
chunk__41009_41015 = G__41022;
count__41010_41016 = G__41023;
i__41011_41017 = G__41024;
continue;
} else {
var temp__4653__auto___41025 = cljs.core.seq(seq__41008_41014);
if(temp__4653__auto___41025){
var seq__41008_41026__$1 = temp__4653__auto___41025;
if(cljs.core.chunked_seq_QMARK_(seq__41008_41026__$1)){
var c__5485__auto___41027 = cljs.core.chunk_first(seq__41008_41026__$1);
var G__41028 = cljs.core.chunk_rest(seq__41008_41026__$1);
var G__41029 = c__5485__auto___41027;
var G__41030 = cljs.core.count(c__5485__auto___41027);
var G__41031 = (0);
seq__41008_41014 = G__41028;
chunk__41009_41015 = G__41029;
count__41010_41016 = G__41030;
i__41011_41017 = G__41031;
continue;
} else {
var vec__41013_41032 = cljs.core.first(seq__41008_41026__$1);
var style_41033 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41013_41032,(0),null);
var ids_41034 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41013_41032,(1),null);
(set_style.cljs$core$IFn$_invoke$arity$2 ? set_style.cljs$core$IFn$_invoke$arity$2(ctx,style_41033) : set_style.call(null,ctx,style_41033));

org.numenta.sanity.viz_layouts.fill_elements(lay,ctx,ids_41034);

monet.canvas.fill(ctx);

var G__41035 = cljs.core.next(seq__41008_41026__$1);
var G__41036 = null;
var G__41037 = (0);
var G__41038 = (0);
seq__41008_41014 = G__41035;
chunk__41009_41015 = G__41036;
count__41010_41016 = G__41037;
i__41011_41017 = G__41038;
continue;
}
} else {
}
}
break;
}

monet.canvas.restore(ctx);

return ctx;
});
org.numenta.sanity.viz_layouts.circle = (function org$numenta$sanity$viz_layouts$circle(ctx,x,y,r){
return ctx.arc(x,y,r,(0),(Math.PI * (2)),true);
});
org.numenta.sanity.viz_layouts.circle_from_bounds = (function org$numenta$sanity$viz_layouts$circle_from_bounds(ctx,x,y,w){
var r = (w * 0.5);
return org.numenta.sanity.viz_layouts.circle(ctx,(x + r),(y + r),r);
});
org.numenta.sanity.viz_layouts.extra_px_for_highlight = (4);
org.numenta.sanity.viz_layouts.highlight_rect = (function org$numenta$sanity$viz_layouts$highlight_rect(ctx,rect,color){
var G__41040 = ctx;
monet.canvas.stroke_style(G__41040,color);

monet.canvas.stroke_width(G__41040,(3));

monet.canvas.stroke_rect(G__41040,rect);

monet.canvas.stroke_style(G__41040,"black");

monet.canvas.stroke_width(G__41040,0.75);

monet.canvas.stroke_rect(G__41040,rect);

return G__41040;
});
/**
 * Draws highlight around the whole layout in global coordinates.
 */
org.numenta.sanity.viz_layouts.highlight_layer = (function org$numenta$sanity$viz_layouts$highlight_layer(lay,ctx,color){
var bb = org.numenta.sanity.viz_layouts.layout_bounds(lay);
var scroll_off = (((org.numenta.sanity.viz_layouts.scroll_position(lay) > (0)))?(50):(0));
return org.numenta.sanity.viz_layouts.highlight_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb) - (1)),cljs.core.cst$kw$y,((cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(bb) - (1)) - scroll_off),cljs.core.cst$kw$w,(cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(bb) + (2)),cljs.core.cst$kw$h,((cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(bb) + (2)) + scroll_off)], null),color);
});
/**
 * Draws highlight on the time offset dt in global coordinates.
 */
org.numenta.sanity.viz_layouts.highlight_dt = (function org$numenta$sanity$viz_layouts$highlight_dt(lay,ctx,dt,color){
var vec__41042 = org.numenta.sanity.viz_layouts.origin_px_topleft(lay,dt);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41042,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41042,(1),null);
var bb = org.numenta.sanity.viz_layouts.local_dt_bounds(lay,dt);
var scroll_off = (((org.numenta.sanity.viz_layouts.scroll_position(lay) > (0)))?(50):(0));
return org.numenta.sanity.viz_layouts.highlight_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(x - (0)),cljs.core.cst$kw$y,((y - (1)) - scroll_off),cljs.core.cst$kw$w,(cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(bb) + (0)),cljs.core.cst$kw$h,((cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(bb) + (2)) + scroll_off)], null),color);
});
/**
 * Draw highlight bar horizontally to left axis from element.
 */
org.numenta.sanity.viz_layouts.highlight_element = (function org$numenta$sanity$viz_layouts$highlight_element(lay,ctx,dt,id,label,color){
var vec__41046 = org.numenta.sanity.viz_layouts.origin_px_topleft(lay,dt);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41046,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41046,(1),null);
var vec__41047 = org.numenta.sanity.viz_layouts.local_px_topleft(lay,id);
var lx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41047,(0),null);
var ly = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41047,(1),null);
var bb = org.numenta.sanity.viz_layouts.layout_bounds(lay);
var vec__41048 = org.numenta.sanity.viz_layouts.element_size_px(lay);
var element_w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41048,(0),null);
var element_h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41048,(1),null);
var rect = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb) - (1)),cljs.core.cst$kw$y,((y + ly) - (1)),cljs.core.cst$kw$w,((((x - cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb)) + lx) + element_w) + (2)),cljs.core.cst$kw$h,(element_h + (2))], null);
org.numenta.sanity.viz_layouts.highlight_rect(ctx,rect,color);

if(cljs.core.truth_(label)){
monet.canvas.save(ctx);

monet.canvas.text_align(ctx,cljs.core.cst$kw$right);

monet.canvas.text_baseline(ctx,cljs.core.cst$kw$middle);

monet.canvas.fill_style(ctx,"black");

monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(rect) - (1)),cljs.core.cst$kw$y,(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(rect) + (element_h / (2))),cljs.core.cst$kw$text,label], null));

return monet.canvas.restore(ctx);
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.numenta.sanity.viz_layouts.PArrayLayout}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {org.numenta.sanity.viz_layouts.PBox}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {org.nfrac.comportex.protocols.PTopological}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.viz_layouts.Grid1dLayout = (function (topo,scroll_top,dt_offset,draw_steps,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_,__meta,__extmap,__hash){
this.topo = topo;
this.scroll_top = scroll_top;
this.dt_offset = dt_offset;
this.draw_steps = draw_steps;
this.element_w = element_w;
this.element_h = element_h;
this.shrink = shrink;
this.left_px = left_px;
this.top_px = top_px;
this.max_bottom_px = max_bottom_px;
this.circles_QMARK_ = circles_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k41050,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__41052 = (((k41050 instanceof cljs.core.Keyword))?k41050.fqn:null);
switch (G__41052) {
case "scroll-top":
return self__.scroll_top;

break;
case "topo":
return self__.topo;

break;
case "element-h":
return self__.element_h;

break;
case "dt-offset":
return self__.dt_offset;

break;
case "shrink":
return self__.shrink;

break;
case "draw-steps":
return self__.draw_steps;

break;
case "max-bottom-px":
return self__.max_bottom_px;

break;
case "top-px":
return self__.top_px;

break;
case "left-px":
return self__.left_px;

break;
case "circles?":
return self__.circles_QMARK_;

break;
case "element-w":
return self__.element_w;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k41050,else__5299__auto__);

}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.topo;
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.numenta.sanity.viz-layouts.Grid1dLayout{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scroll_DASH_top,self__.scroll_top],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$dt_DASH_offset,self__.dt_offset],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$draw_DASH_steps,self__.draw_steps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_w,self__.element_w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_h,self__.element_h],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$shrink,self__.shrink],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$left_DASH_px,self__.left_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$top_DASH_px,self__.top_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_bottom_DASH_px,self__.max_bottom_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$circles_QMARK_,self__.circles_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__41049){
var self__ = this;
var G__41049__$1 = this;
return (new cljs.core.RecordIter((0),G__41049__$1,11,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$dt_DASH_offset,cljs.core.cst$kw$draw_DASH_steps,cljs.core.cst$kw$element_DASH_w,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$shrink,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$circles_QMARK_], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (11 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ = true;

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2 = (function (this$,dt){
var self__ = this;
var this$__$1 = this;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.numenta.sanity.viz_layouts.layout_bounds(this$__$1),cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,self__.element_w], 0));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var G__41053 = org.nfrac.comportex.protocols.size(self__.topo);
if(cljs.core.truth_(self__.max_bottom_px)){
var x__5020__auto__ = G__41053;
var y__5021__auto__ = cljs.core.quot((self__.max_bottom_px - self__.top_px),self__.element_h);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
} else {
return G__41053;
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.element_w,self__.element_h], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3 = (function (this$,ctx,id){
var self__ = this;
var this$__$1 = this;
var vec__41054 = org.numenta.sanity.viz_layouts.local_px_topleft(this$__$1,id);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41054,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41054,(1),null);
if(cljs.core.truth_(self__.circles_QMARK_)){
return org.numenta.sanity.viz_layouts.circle_from_bounds(ctx,x,y,(self__.element_w * self__.shrink));
} else {
return ctx.rect(x,y,(self__.element_w * self__.shrink),(self__.element_h * self__.shrink));
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2 = (function (this$,id){
var self__ = this;
var this$__$1 = this;
var n = org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1);
var n0 = self__.scroll_top;
return ((n0 <= id)) && ((id < (n0 + n)));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.nfrac.comportex.protocols.size(self__.topo);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var n0 = self__.scroll_top;
return cljs.core.range.cljs$core$IFn$_invoke$arity$2(n0,(n0 + org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1)));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.scroll_top;
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2 = (function (_,dt){
var self__ = this;
var ___$1 = this;
var right = (self__.left_px + (self__.draw_steps * self__.element_w));
var off_x_px = (((dt + (1)) - self__.dt_offset) * self__.element_w);
var x_px = (right - off_x_px);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_px,self__.top_px], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2 = (function (this$,down_QMARK_){
var self__ = this;
var this$__$1 = this;
var page_n = org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1);
var n_ids = org.nfrac.comportex.protocols.size(self__.topo);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$scroll_DASH_top,(cljs.core.truth_(down_QMARK_)?(((self__.scroll_top < (n_ids - page_n)))?(self__.scroll_top + page_n):self__.scroll_top):(function (){var x__5013__auto__ = (0);
var y__5014__auto__ = (self__.scroll_top - page_n);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})()));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2 = (function (_,id){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),((id - self__.scroll_top) * self__.element_h)], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3 = (function (this$,x,y){
var self__ = this;
var this$__$1 = this;
var right = (self__.left_px + (self__.draw_steps * self__.element_w));
var dt_STAR_ = (function (){var G__41055 = ((right - x) / self__.element_w);
return Math.floor(G__41055);
})();
var id_STAR_ = (function (){var G__41056 = ((y - self__.top_px) / self__.element_h);
return Math.floor(G__41056);
})();
var id = (id_STAR_ + self__.scroll_top);
var dt = (dt_STAR_ + self__.dt_offset);
if((((0) <= dt_STAR_)) && ((dt_STAR_ <= self__.draw_steps))){
if(cljs.core.truth_(org.numenta.sanity.viz_layouts.id_onscreen_QMARK_(this$__$1,id))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dt,id], null);
} else {
if((y <= self__.top_px)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dt,null], null);
} else {
return null;
}
}
} else {
return null;
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [cljs.core.cst$kw$scroll_DASH_top,null,cljs.core.cst$kw$topo,null,cljs.core.cst$kw$element_DASH_h,null,cljs.core.cst$kw$dt_DASH_offset,null,cljs.core.cst$kw$shrink,null,cljs.core.cst$kw$draw_DASH_steps,null,cljs.core.cst$kw$max_DASH_bottom_DASH_px,null,cljs.core.cst$kw$top_DASH_px,null,cljs.core.cst$kw$left_DASH_px,null,cljs.core.cst$kw$circles_QMARK_,null,cljs.core.cst$kw$element_DASH_w,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__41049){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__41057 = cljs.core.keyword_identical_QMARK_;
var expr__41058 = k__5304__auto__;
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$topo,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(G__41049,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$scroll_DASH_top,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$scroll_DASH_top,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,G__41049,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$dt_DASH_offset,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$dt_DASH_offset,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,G__41049,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$draw_DASH_steps,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$draw_DASH_steps,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,G__41049,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$element_DASH_w,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$element_DASH_w,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,G__41049,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$element_DASH_h,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$element_DASH_h,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,G__41049,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$shrink,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$shrink,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,G__41049,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$left_DASH_px,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$left_DASH_px,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,G__41049,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$top_DASH_px,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$top_DASH_px,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,G__41049,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$max_DASH_bottom_DASH_px,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$max_DASH_bottom_DASH_px,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,G__41049,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41057.cljs$core$IFn$_invoke$arity$2 ? pred__41057.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$circles_QMARK_,expr__41058) : pred__41057.call(null,cljs.core.cst$kw$circles_QMARK_,expr__41058)))){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,G__41049,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__41049),null));
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
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PBox$ = true;

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,self__.left_px,cljs.core.cst$kw$y,self__.top_px,cljs.core.cst$kw$w,(self__.draw_steps * self__.element_w),cljs.core.cst$kw$h,(function (){var G__41060 = (org.nfrac.comportex.protocols.size(self__.topo) * self__.element_h);
if(cljs.core.truth_(self__.max_bottom_px)){
var x__5020__auto__ = G__41060;
var y__5021__auto__ = (self__.max_bottom_px - self__.top_px);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
} else {
return G__41060;
}
})()], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scroll_DASH_top,self__.scroll_top],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$dt_DASH_offset,self__.dt_offset],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$draw_DASH_steps,self__.draw_steps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_w,self__.element_w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_h,self__.element_h],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$shrink,self__.shrink],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$left_DASH_px,self__.left_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$top_DASH_px,self__.top_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_bottom_DASH_px,self__.max_bottom_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$circles_QMARK_,self__.circles_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__41049){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,G__41049,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.getBasis = (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$topo,cljs.core.cst$sym$scroll_DASH_top,cljs.core.cst$sym$dt_DASH_offset,cljs.core.cst$sym$draw_DASH_steps,cljs.core.cst$sym$element_DASH_w,cljs.core.cst$sym$element_DASH_h,cljs.core.cst$sym$shrink,cljs.core.cst$sym$left_DASH_px,cljs.core.cst$sym$top_DASH_px,cljs.core.cst$sym$max_DASH_bottom_DASH_px,cljs.core.cst$sym$circles_QMARK_], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.cljs$lang$type = true;

org.numenta.sanity.viz_layouts.Grid1dLayout.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.viz-layouts/Grid1dLayout");
});

org.numenta.sanity.viz_layouts.Grid1dLayout.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.numenta.sanity.viz-layouts/Grid1dLayout");
});

org.numenta.sanity.viz_layouts.__GT_Grid1dLayout = (function org$numenta$sanity$viz_layouts$__GT_Grid1dLayout(topo,scroll_top,dt_offset,draw_steps,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(topo,scroll_top,dt_offset,draw_steps,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_,null,null,null));
});

org.numenta.sanity.viz_layouts.map__GT_Grid1dLayout = (function org$numenta$sanity$viz_layouts$map__GT_Grid1dLayout(G__41051){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$scroll_DASH_top.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$dt_DASH_offset.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$draw_DASH_steps.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$element_DASH_w.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$element_DASH_h.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$shrink.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$left_DASH_px.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$top_DASH_px.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$max_DASH_bottom_DASH_px.cljs$core$IFn$_invoke$arity$1(G__41051),cljs.core.cst$kw$circles_QMARK_.cljs$core$IFn$_invoke$arity$1(G__41051),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__41051,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$dt_DASH_offset,cljs.core.cst$kw$draw_DASH_steps,cljs.core.cst$kw$element_DASH_w,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$shrink,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$circles_QMARK_], 0)),null));
});

org.numenta.sanity.viz_layouts.grid_1d_layout = (function org$numenta$sanity$viz_layouts$grid_1d_layout(topo,top,left,opts,inbits_QMARK_){
var map__41064 = opts;
var map__41064__$1 = ((((!((map__41064 == null)))?((((map__41064.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41064.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41064):map__41064);
var draw_steps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41064__$1,cljs.core.cst$kw$draw_DASH_steps);
var max_height_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41064__$1,cljs.core.cst$kw$max_DASH_height_DASH_px);
var col_d_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41064__$1,cljs.core.cst$kw$col_DASH_d_DASH_px);
var col_shrink = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41064__$1,cljs.core.cst$kw$col_DASH_shrink);
var bit_w_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41064__$1,cljs.core.cst$kw$bit_DASH_w_DASH_px);
var bit_h_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41064__$1,cljs.core.cst$kw$bit_DASH_h_DASH_px);
var bit_shrink = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41064__$1,cljs.core.cst$kw$bit_DASH_shrink);
return org.numenta.sanity.viz_layouts.map__GT_Grid1dLayout(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$topo,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$dt_DASH_offset,cljs.core.cst$kw$shrink,cljs.core.cst$kw$draw_DASH_steps,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$circles_QMARK_,cljs.core.cst$kw$element_DASH_w],[(0),topo,(cljs.core.truth_(inbits_QMARK_)?bit_h_px:col_d_px),(0),(cljs.core.truth_(inbits_QMARK_)?bit_shrink:col_shrink),draw_steps,(cljs.core.truth_(max_height_px)?(max_height_px - org.numenta.sanity.viz_layouts.extra_px_for_highlight):null),top,left,(cljs.core.truth_(inbits_QMARK_)?false:true),(cljs.core.truth_(inbits_QMARK_)?bit_w_px:col_d_px)]));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.numenta.sanity.viz_layouts.PArrayLayout}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {org.numenta.sanity.viz_layouts.PBox}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {org.nfrac.comportex.protocols.PTopological}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.viz_layouts.Grid2dLayout = (function (n_elements,topo,scroll_top,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_,__meta,__extmap,__hash){
this.n_elements = n_elements;
this.topo = topo;
this.scroll_top = scroll_top;
this.element_w = element_w;
this.element_h = element_h;
this.shrink = shrink;
this.left_px = left_px;
this.top_px = top_px;
this.max_bottom_px = max_bottom_px;
this.circles_QMARK_ = circles_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k41067,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__41069 = (((k41067 instanceof cljs.core.Keyword))?k41067.fqn:null);
switch (G__41069) {
case "scroll-top":
return self__.scroll_top;

break;
case "topo":
return self__.topo;

break;
case "element-h":
return self__.element_h;

break;
case "shrink":
return self__.shrink;

break;
case "max-bottom-px":
return self__.max_bottom_px;

break;
case "n-elements":
return self__.n_elements;

break;
case "top-px":
return self__.top_px;

break;
case "left-px":
return self__.left_px;

break;
case "circles?":
return self__.circles_QMARK_;

break;
case "element-w":
return self__.element_w;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k41067,else__5299__auto__);

}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.topo;
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.numenta.sanity.viz-layouts.Grid2dLayout{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_elements,self__.n_elements],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scroll_DASH_top,self__.scroll_top],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_w,self__.element_w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_h,self__.element_h],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$shrink,self__.shrink],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$left_DASH_px,self__.left_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$top_DASH_px,self__.top_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_bottom_DASH_px,self__.max_bottom_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$circles_QMARK_,self__.circles_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__41066){
var self__ = this;
var G__41066__$1 = this;
return (new cljs.core.RecordIter((0),G__41066__$1,10,new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$n_DASH_elements,cljs.core.cst$kw$topo,cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$element_DASH_w,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$shrink,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$circles_QMARK_], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (10 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ = true;

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2 = (function (this$,dt){
var self__ = this;
var this$__$1 = this;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.numenta.sanity.viz_layouts.layout_bounds(this$__$1),cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0)], 0));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var vec__41070 = org.nfrac.comportex.protocols.dimensions(self__.topo);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41070,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41070,(1),null);
var x__5020__auto__ = self__.n_elements;
var y__5021__auto__ = (w * (function (){var G__41071 = h;
if(cljs.core.truth_(self__.max_bottom_px)){
var x__5020__auto____$1 = G__41071;
var y__5021__auto__ = cljs.core.quot((self__.max_bottom_px - self__.top_px),self__.element_h);
return ((x__5020__auto____$1 < y__5021__auto__) ? x__5020__auto____$1 : y__5021__auto__);
} else {
return G__41071;
}
})());
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.element_w,self__.element_h], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3 = (function (this$,ctx,id){
var self__ = this;
var this$__$1 = this;
var vec__41072 = org.numenta.sanity.viz_layouts.local_px_topleft(this$__$1,id);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41072,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41072,(1),null);
if(cljs.core.truth_(self__.circles_QMARK_)){
return org.numenta.sanity.viz_layouts.circle_from_bounds(ctx,x,y,(self__.element_w * self__.shrink));
} else {
return ctx.rect(x,y,(self__.element_w * self__.shrink),(self__.element_h * self__.shrink));
}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2 = (function (this$,id){
var self__ = this;
var this$__$1 = this;
var n0 = self__.scroll_top;
return ((n0 <= id)) && ((id < (n0 + org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1))));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.n_elements;
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var n0 = self__.scroll_top;
return cljs.core.range.cljs$core$IFn$_invoke$arity$2(n0,(n0 + org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1)));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.scroll_top;
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2 = (function (_,dt){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.left_px,self__.top_px], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2 = (function (this$,down_QMARK_){
var self__ = this;
var this$__$1 = this;
var page_n = org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1);
var n_ids = org.nfrac.comportex.protocols.size(self__.topo);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$scroll_DASH_top,(cljs.core.truth_(down_QMARK_)?(((self__.scroll_top < (n_ids - page_n)))?(self__.scroll_top + page_n):self__.scroll_top):(function (){var x__5013__auto__ = (0);
var y__5014__auto__ = (self__.scroll_top - page_n);
return ((x__5013__auto__ > y__5014__auto__) ? x__5013__auto__ : y__5014__auto__);
})()));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2 = (function (_,id){
var self__ = this;
var ___$1 = this;
var vec__41073 = org.nfrac.comportex.protocols.coordinates_of_index(self__.topo,(id + self__.scroll_top));
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41073,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41073,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x * self__.element_w),(y * self__.element_h)], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3 = (function (_,x,y){
var self__ = this;
var ___$1 = this;
var vec__41074 = org.nfrac.comportex.protocols.dimensions(self__.topo);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41074,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41074,(1),null);
var xi = (function (){var G__41075 = ((x - self__.left_px) / self__.element_w);
return Math.floor(G__41075);
})();
var yi = (function (){var G__41076 = ((y - self__.top_px) / self__.element_h);
return Math.floor(G__41076);
})();
if(((((0) <= xi)) && ((xi <= (w - (1))))) && ((yi <= (h - (1))))){
if((y >= (0))){
var id_STAR_ = org.nfrac.comportex.protocols.index_of_coordinates(self__.topo,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [xi,yi], null));
var id = (id_STAR_ - self__.scroll_top);
if((id < self__.n_elements)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),id], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),null], null);
}
} else {
return null;
}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [cljs.core.cst$kw$scroll_DASH_top,null,cljs.core.cst$kw$topo,null,cljs.core.cst$kw$element_DASH_h,null,cljs.core.cst$kw$shrink,null,cljs.core.cst$kw$max_DASH_bottom_DASH_px,null,cljs.core.cst$kw$n_DASH_elements,null,cljs.core.cst$kw$top_DASH_px,null,cljs.core.cst$kw$left_DASH_px,null,cljs.core.cst$kw$circles_QMARK_,null,cljs.core.cst$kw$element_DASH_w,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__41066){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__41077 = cljs.core.keyword_identical_QMARK_;
var expr__41078 = k__5304__auto__;
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$n_DASH_elements,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$n_DASH_elements,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(G__41066,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$topo,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$topo,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,G__41066,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$scroll_DASH_top,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$scroll_DASH_top,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,G__41066,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$element_DASH_w,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$element_DASH_w,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,G__41066,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$element_DASH_h,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$element_DASH_h,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,G__41066,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$shrink,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$shrink,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,G__41066,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$left_DASH_px,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$left_DASH_px,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,G__41066,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$top_DASH_px,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$top_DASH_px,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,self__.left_px,G__41066,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$max_DASH_bottom_DASH_px,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$max_DASH_bottom_DASH_px,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,G__41066,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41077.cljs$core$IFn$_invoke$arity$2 ? pred__41077.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$circles_QMARK_,expr__41078) : pred__41077.call(null,cljs.core.cst$kw$circles_QMARK_,expr__41078)))){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,G__41066,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__41066),null));
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
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PBox$ = true;

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var vec__41080 = org.nfrac.comportex.protocols.dimensions(self__.topo);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41080,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41080,(1),null);
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,self__.left_px,cljs.core.cst$kw$y,self__.top_px,cljs.core.cst$kw$w,(w * self__.element_w),cljs.core.cst$kw$h,(function (){var G__41081 = (h * self__.element_h);
if(cljs.core.truth_(self__.max_bottom_px)){
var x__5020__auto__ = G__41081;
var y__5021__auto__ = (self__.max_bottom_px - self__.top_px);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
} else {
return G__41081;
}
})()], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_elements,self__.n_elements],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scroll_DASH_top,self__.scroll_top],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_w,self__.element_w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_h,self__.element_h],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$shrink,self__.shrink],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$left_DASH_px,self__.left_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$top_DASH_px,self__.top_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_bottom_DASH_px,self__.max_bottom_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$circles_QMARK_,self__.circles_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__41066){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,G__41066,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$n_DASH_elements,cljs.core.cst$sym$topo,cljs.core.cst$sym$scroll_DASH_top,cljs.core.cst$sym$element_DASH_w,cljs.core.cst$sym$element_DASH_h,cljs.core.cst$sym$shrink,cljs.core.cst$sym$left_DASH_px,cljs.core.cst$sym$top_DASH_px,cljs.core.cst$sym$max_DASH_bottom_DASH_px,cljs.core.cst$sym$circles_QMARK_], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.cljs$lang$type = true;

org.numenta.sanity.viz_layouts.Grid2dLayout.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.viz-layouts/Grid2dLayout");
});

org.numenta.sanity.viz_layouts.Grid2dLayout.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.numenta.sanity.viz-layouts/Grid2dLayout");
});

org.numenta.sanity.viz_layouts.__GT_Grid2dLayout = (function org$numenta$sanity$viz_layouts$__GT_Grid2dLayout(n_elements,topo,scroll_top,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(n_elements,topo,scroll_top,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_,null,null,null));
});

org.numenta.sanity.viz_layouts.map__GT_Grid2dLayout = (function org$numenta$sanity$viz_layouts$map__GT_Grid2dLayout(G__41068){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(cljs.core.cst$kw$n_DASH_elements.cljs$core$IFn$_invoke$arity$1(G__41068),cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__41068),cljs.core.cst$kw$scroll_DASH_top.cljs$core$IFn$_invoke$arity$1(G__41068),cljs.core.cst$kw$element_DASH_w.cljs$core$IFn$_invoke$arity$1(G__41068),cljs.core.cst$kw$element_DASH_h.cljs$core$IFn$_invoke$arity$1(G__41068),cljs.core.cst$kw$shrink.cljs$core$IFn$_invoke$arity$1(G__41068),cljs.core.cst$kw$left_DASH_px.cljs$core$IFn$_invoke$arity$1(G__41068),cljs.core.cst$kw$top_DASH_px.cljs$core$IFn$_invoke$arity$1(G__41068),cljs.core.cst$kw$max_DASH_bottom_DASH_px.cljs$core$IFn$_invoke$arity$1(G__41068),cljs.core.cst$kw$circles_QMARK_.cljs$core$IFn$_invoke$arity$1(G__41068),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__41068,cljs.core.cst$kw$n_DASH_elements,cljs.core.array_seq([cljs.core.cst$kw$topo,cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$element_DASH_w,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$shrink,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$circles_QMARK_], 0)),null));
});

org.numenta.sanity.viz_layouts.grid_2d_layout = (function org$numenta$sanity$viz_layouts$grid_2d_layout(n_elements,topo,top,left,opts,inbits_QMARK_){
var map__41085 = opts;
var map__41085__$1 = ((((!((map__41085 == null)))?((((map__41085.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41085.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41085):map__41085);
var max_height_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41085__$1,cljs.core.cst$kw$max_DASH_height_DASH_px);
var col_d_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41085__$1,cljs.core.cst$kw$col_DASH_d_DASH_px);
var col_shrink = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41085__$1,cljs.core.cst$kw$col_DASH_shrink);
var bit_w_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41085__$1,cljs.core.cst$kw$bit_DASH_w_DASH_px);
var bit_h_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41085__$1,cljs.core.cst$kw$bit_DASH_h_DASH_px);
var bit_shrink = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41085__$1,cljs.core.cst$kw$bit_DASH_shrink);
return org.numenta.sanity.viz_layouts.map__GT_Grid2dLayout(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$topo,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$shrink,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$n_DASH_elements,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$circles_QMARK_,cljs.core.cst$kw$element_DASH_w],[(0),topo,(cljs.core.truth_(inbits_QMARK_)?bit_h_px:col_d_px),(cljs.core.truth_(inbits_QMARK_)?bit_shrink:col_shrink),(cljs.core.truth_(max_height_px)?(max_height_px - org.numenta.sanity.viz_layouts.extra_px_for_highlight):null),n_elements,top,left,(cljs.core.truth_(inbits_QMARK_)?false:true),(cljs.core.truth_(inbits_QMARK_)?bit_w_px:col_d_px)]));
});
org.numenta.sanity.viz_layouts.grid_layout = (function org$numenta$sanity$viz_layouts$grid_layout(dims,top,left,opts,inbits_QMARK_,display_mode){
var n_elements = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,dims);
var G__41091 = (((display_mode instanceof cljs.core.Keyword))?display_mode.fqn:null);
switch (G__41091) {
case "one-d":
return org.numenta.sanity.viz_layouts.grid_1d_layout(org.nfrac.comportex.topology.one_d_topology(n_elements),top,left,opts,inbits_QMARK_);

break;
case "two-d":
var vec__41092 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(dims)))?dims:(function (){var w = (function (){var x__5020__auto__ = (function (){var G__41093 = Math.sqrt(n_elements);
return Math.ceil(G__41093);
})();
var y__5021__auto__ = (20);
return ((x__5020__auto__ < y__5021__auto__) ? x__5020__auto__ : y__5021__auto__);
})();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [w,(function (){var G__41094 = (n_elements / w);
return Math.ceil(G__41094);
})()], null);
})());
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41092,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41092,(1),null);
return org.numenta.sanity.viz_layouts.grid_2d_layout(n_elements,org.nfrac.comportex.topology.two_d_topology(width,height),top,left,opts,inbits_QMARK_);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(display_mode)].join('')));

}
});

/**
 * @interface
 */
org.numenta.sanity.viz_layouts.POrderable = function(){};

org.numenta.sanity.viz_layouts.reorder = (function org$numenta$sanity$viz_layouts$reorder(this$,ordered_ids){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$POrderable$reorder$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$POrderable$reorder$arity$2(this$,ordered_ids);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.reorder[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,ordered_ids) : m__5338__auto__.call(null,this$,ordered_ids));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.reorder["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,ordered_ids) : m__5338__auto____$1.call(null,this$,ordered_ids));
} else {
throw cljs.core.missing_protocol("POrderable.reorder",this$);
}
}
}
});


/**
 * @interface
 */
org.numenta.sanity.viz_layouts.PTemporalSortable = function(){};

org.numenta.sanity.viz_layouts.sort_by_recent_activity = (function org$numenta$sanity$viz_layouts$sort_by_recent_activity(this$,ids_ts){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$sort_by_recent_activity$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$sort_by_recent_activity$arity$2(this$,ids_ts);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.sort_by_recent_activity[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,ids_ts) : m__5338__auto__.call(null,this$,ids_ts));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.sort_by_recent_activity["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,ids_ts) : m__5338__auto____$1.call(null,this$,ids_ts));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.sort-by-recent-activity",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.clear_sort = (function org$numenta$sanity$viz_layouts$clear_sort(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_sort$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_sort$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.clear_sort[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.clear_sort["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.clear-sort",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.add_facet = (function org$numenta$sanity$viz_layouts$add_facet(this$,ids,label){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$add_facet$arity$3 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$add_facet$arity$3(this$,ids,label);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.add_facet[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$3(this$,ids,label) : m__5338__auto__.call(null,this$,ids,label));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.add_facet["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,ids,label) : m__5338__auto____$1.call(null,this$,ids,label));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.add-facet",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.clear_facets = (function org$numenta$sanity$viz_layouts$clear_facets(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_facets$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_facets$arity$1(this$);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.clear_facets[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto__.call(null,this$));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.clear_facets["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__5338__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.clear-facets",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.draw_facets = (function org$numenta$sanity$viz_layouts$draw_facets(this$,ctx){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$draw_facets$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$draw_facets$arity$2(this$,ctx);
} else {
var x__5337__auto__ = (((this$ == null))?null:this$);
var m__5338__auto__ = (org.numenta.sanity.viz_layouts.draw_facets[goog.typeOf(x__5337__auto__)]);
if(!((m__5338__auto__ == null))){
return (m__5338__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto__.cljs$core$IFn$_invoke$arity$2(this$,ctx) : m__5338__auto__.call(null,this$,ctx));
} else {
var m__5338__auto____$1 = (org.numenta.sanity.viz_layouts.draw_facets["_"]);
if(!((m__5338__auto____$1 == null))){
return (m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__5338__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,ctx) : m__5338__auto____$1.call(null,this$,ctx));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.draw-facets",this$);
}
}
}
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.numenta.sanity.viz_layouts.PArrayLayout}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {org.numenta.sanity.viz_layouts.PTemporalSortable}
 * @implements {org.numenta.sanity.viz_layouts.PBox}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {org.numenta.sanity.viz_layouts.POrderable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {org.nfrac.comportex.protocols.PTopological}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.viz_layouts.OrderableLayout = (function (layout,order,facets,__meta,__extmap,__hash){
this.layout = layout;
this.order = order;
this.facets = facets;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5296__auto__,k__5297__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__5296__auto____$1,k__5297__auto__,null);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5298__auto__,k41098,else__5299__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
var G__41100 = (((k41098 instanceof cljs.core.Keyword))?k41098.fqn:null);
switch (G__41100) {
case "layout":
return self__.layout;

break;
case "order":
return self__.order;

break;
case "facets":
return self__.facets;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k41098,else__5299__auto__);

}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$nfrac$comportex$protocols$PTopological$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$nfrac$comportex$protocols$PTopological$topology$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.nfrac.comportex.protocols.topology(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5310__auto__,writer__5311__auto__,opts__5312__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
var pr_pair__5313__auto__ = ((function (this__5310__auto____$1){
return (function (keyval__5314__auto__){
return cljs.core.pr_sequential_writer(writer__5311__auto__,cljs.core.pr_writer,""," ","",opts__5312__auto__,keyval__5314__auto__);
});})(this__5310__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__5311__auto__,pr_pair__5313__auto__,"#org.numenta.sanity.viz-layouts.OrderableLayout{",", ","}",opts__5312__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$layout,self__.layout],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$order,self__.order],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$facets,self__.facets],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__41097){
var self__ = this;
var G__41097__$1 = this;
return (new cljs.core.RecordIter((0),G__41097__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layout,cljs.core.cst$kw$order,cljs.core.cst$kw$facets], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5294__auto__){
var self__ = this;
var this__5294__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5290__auto__){
var self__ = this;
var this__5290__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.order,self__.facets,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5300__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return (3 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2 = (function (_,dt){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.local_dt_bounds(self__.layout,dt);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.ids_onscreen_count(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.element_size_px(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3 = (function (this$,ctx,id){
var self__ = this;
var this$__$1 = this;
var idx = (self__.order.cljs$core$IFn$_invoke$arity$1 ? self__.order.cljs$core$IFn$_invoke$arity$1(id) : self__.order.call(null,id));
return org.numenta.sanity.viz_layouts.draw_element(self__.layout,ctx,idx);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2 = (function (_,id){
var self__ = this;
var ___$1 = this;
var idx = (self__.order.cljs$core$IFn$_invoke$arity$1 ? self__.order.cljs$core$IFn$_invoke$arity$1(id) : self__.order.call(null,id));
return org.numenta.sanity.viz_layouts.id_onscreen_QMARK_(self__.layout,idx);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.ids_count(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var n0 = org.numenta.sanity.viz_layouts.scroll_position(self__.layout);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.key,cljs.core.subseq.cljs$core$IFn$_invoke$arity$5(self__.order,cljs.core._GT__EQ_,n0,cljs.core._LT_,(n0 + org.numenta.sanity.viz_layouts.ids_onscreen_count(self__.layout))));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.scroll_position(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2 = (function (_,dt){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.origin_px_topleft(self__.layout,dt);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2 = (function (this$,down_QMARK_){
var self__ = this;
var this$__$1 = this;
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(this$__$1,cljs.core.cst$kw$layout,org.numenta.sanity.viz_layouts.scroll,down_QMARK_);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2 = (function (_,id){
var self__ = this;
var ___$1 = this;
var idx = (self__.order.cljs$core$IFn$_invoke$arity$1 ? self__.order.cljs$core$IFn$_invoke$arity$1(id) : self__.order.call(null,id));
return org.numenta.sanity.viz_layouts.local_px_topleft(self__.layout,idx);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3 = (function (this$,x,y){
var self__ = this;
var this$__$1 = this;
var temp__4653__auto__ = org.numenta.sanity.viz_layouts.clicked_id(self__.layout,x,y);
if(cljs.core.truth_(temp__4653__auto__)){
var vec__41101 = temp__4653__auto__;
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41101,(0),null);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41101,(1),null);
if(cljs.core.truth_(idx)){
var id = cljs.core.key(cljs.core.first(cljs.core.subseq.cljs$core$IFn$_invoke$arity$5(self__.order,cljs.core._GT__EQ_,idx,cljs.core._LT__EQ_,idx)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dt,id], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dt,null], null);
}
} else {
return null;
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5291__auto__){
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

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__5292__auto__,other__5293__auto__){
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

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5305__auto__,k__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$layout,null,cljs.core.cst$kw$order,null,cljs.core.cst$kw$facets,null], null), null),k__5306__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5305__auto____$1),self__.__meta),k__5306__auto__);
} else {
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.order,self__.facets,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5306__auto__)),null));
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$POrderable$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$POrderable$reorder$arity$2 = (function (this$,ordered_ids){
var self__ = this;
var this$__$1 = this;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(ordered_ids),cljs.core.count(self__.order))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$_EQ_,cljs.core.list(cljs.core.cst$sym$count,cljs.core.cst$sym$ordered_DASH_ids),cljs.core.list(cljs.core.cst$sym$count,cljs.core.cst$sym$order))], 0)))].join('')));
}

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$order,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(tailrecursion.priority_map.priority_map,cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(ordered_ids,cljs.core.range.cljs$core$IFn$_invoke$arity$0())));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$sort_by_recent_activity$arity$2 = (function (this$,ids_ts){
var self__ = this;
var this$__$1 = this;
if(cljs.core.every_QMARK_(cljs.core.set_QMARK_,ids_ts)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(cljs.core.cst$sym$every_QMARK_,cljs.core.cst$sym$set_QMARK_,cljs.core.cst$sym$ids_DASH_ts)], 0)))].join('')));
}

var ftotal = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,self__.facets));
var faceted = cljs.core.take.cljs$core$IFn$_invoke$arity$2(ftotal,cljs.core.keys(self__.order));
var ord_ids = (function (){var ids_ts__$1 = ids_ts;
var ord = cljs.core.transient$(cljs.core.vec(faceted));
var ord_set = cljs.core.transient$(cljs.core.set(faceted));
while(true){
var temp__4651__auto__ = cljs.core.first(ids_ts__$1);
if(cljs.core.truth_(temp__4651__auto__)){
var ids = temp__4651__auto__;
var new_ids = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(((function (ids_ts__$1,ord,ord_set,ids,temp__4651__auto__,ftotal,faceted,this$__$1){
return (function (id){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (ids_ts__$1,ord,ord_set,ids,temp__4651__auto__,ftotal,faceted,this$__$1){
return (function (p1__41096_SHARP_){
return cljs.core.boolean$((p1__41096_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__41096_SHARP_.cljs$core$IFn$_invoke$arity$1(id) : p1__41096_SHARP_.call(null,id)));
});})(ids_ts__$1,ord,ord_set,ids,temp__4651__auto__,ftotal,faceted,this$__$1))
,ids_ts__$1);
});})(ids_ts__$1,ord,ord_set,ids,temp__4651__auto__,ftotal,faceted,this$__$1))
,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(ord_set,ids));
var G__41110 = cljs.core.next(ids_ts__$1);
var G__41111 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,ord,new_ids);
var G__41112 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,ord_set,new_ids);
ids_ts__$1 = G__41110;
ord = G__41111;
ord_set = G__41112;
continue;
} else {
return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,ord,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(ord_set,cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(self__.order)))));
}
break;
}
})();
return org.numenta.sanity.viz_layouts.reorder(this$__$1,ord_ids);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_sort$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var ftotal = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,self__.facets));
var faceted = cljs.core.take.cljs$core$IFn$_invoke$arity$2(ftotal,cljs.core.keys(self__.order));
var ord_ids = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(faceted,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(faceted),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(self__.order))));
return org.numenta.sanity.viz_layouts.reorder(this$__$1,ord_ids);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$add_facet$arity$3 = (function (this$,ids,label){
var self__ = this;
var this$__$1 = this;
var ftotal = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,self__.facets));
var old_faceted = cljs.core.take.cljs$core$IFn$_invoke$arity$2(ftotal,cljs.core.keys(self__.order));
var new_faceted = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(old_faceted,ids));
var new_length = (cljs.core.count(new_faceted) - cljs.core.count(old_faceted));
if((new_length === (0))){
return this$__$1;
} else {
var ord_ids = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new_faceted,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(ids),cljs.core.drop.cljs$core$IFn$_invoke$arity$2(ftotal,cljs.core.keys(self__.order))));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.viz_layouts.reorder(this$__$1,ord_ids),cljs.core.cst$kw$facets,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(self__.facets,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [label,new_length], null)));
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_facets$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$facets,cljs.core.PersistentVector.EMPTY);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$draw_facets$arity$2 = (function (this$,ctx){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq(self__.facets)){
var bb = org.numenta.sanity.viz_layouts.layout_bounds(this$__$1);
var vec__41102 = org.numenta.sanity.viz_layouts.origin_px_topleft(this$__$1,(0));
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41102,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41102,(1),null);
monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"black");

monet.canvas.text_baseline(ctx,cljs.core.cst$kw$bottom);

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (bb,vec__41102,x,y,this$__$1){
return (function (offset,p__41103){
var vec__41104 = p__41103;
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41104,(0),null);
var length = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41104,(1),null);
var idx = (offset + length);
var vec__41105 = org.numenta.sanity.viz_layouts.local_px_topleft(self__.layout,idx);
var lx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41105,(0),null);
var ly = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41105,(1),null);
var y_px = (y + ly);
monet.canvas.begin_path(ctx);

monet.canvas.move_to(ctx,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb),y_px);

monet.canvas.line_to(ctx,((cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb) + cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(bb)) + (16)),y_px);

monet.canvas.stroke(ctx);

monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,((cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb) + cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(bb)) + (3)),cljs.core.cst$kw$y,y_px,cljs.core.cst$kw$text,label], null));

return (offset + length);
});})(bb,vec__41102,x,y,this$__$1))
,(0),self__.facets);
} else {
return null;
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5303__auto__,k__5304__auto__,G__41097){
var self__ = this;
var this__5303__auto____$1 = this;
var pred__41106 = cljs.core.keyword_identical_QMARK_;
var expr__41107 = k__5304__auto__;
if(cljs.core.truth_((pred__41106.cljs$core$IFn$_invoke$arity$2 ? pred__41106.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$layout,expr__41107) : pred__41106.call(null,cljs.core.cst$kw$layout,expr__41107)))){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(G__41097,self__.order,self__.facets,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41106.cljs$core$IFn$_invoke$arity$2 ? pred__41106.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$order,expr__41107) : pred__41106.call(null,cljs.core.cst$kw$order,expr__41107)))){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,G__41097,self__.facets,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__41106.cljs$core$IFn$_invoke$arity$2 ? pred__41106.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$facets,expr__41107) : pred__41106.call(null,cljs.core.cst$kw$facets,expr__41107)))){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.order,G__41097,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.order,self__.facets,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5304__auto__,G__41097),null));
}
}
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PBox$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.layout_bounds(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5308__auto__){
var self__ = this;
var this__5308__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$layout,self__.layout],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$order,self__.order],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$facets,self__.facets],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5295__auto__,G__41097){
var self__ = this;
var this__5295__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.order,self__.facets,G__41097,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5301__auto__,entry__5302__auto__){
var self__ = this;
var this__5301__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5302__auto__)){
return cljs.core._assoc(this__5301__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__5302__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5301__auto____$1,entry__5302__auto__);
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$layout,cljs.core.cst$sym$order,cljs.core.cst$sym$facets], null);
});

org.numenta.sanity.viz_layouts.OrderableLayout.cljs$lang$type = true;

org.numenta.sanity.viz_layouts.OrderableLayout.cljs$lang$ctorPrSeq = (function (this__5330__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.viz-layouts/OrderableLayout");
});

org.numenta.sanity.viz_layouts.OrderableLayout.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__){
return cljs.core._write(writer__5331__auto__,"org.numenta.sanity.viz-layouts/OrderableLayout");
});

org.numenta.sanity.viz_layouts.__GT_OrderableLayout = (function org$numenta$sanity$viz_layouts$__GT_OrderableLayout(layout,order,facets){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(layout,order,facets,null,null,null));
});

org.numenta.sanity.viz_layouts.map__GT_OrderableLayout = (function org$numenta$sanity$viz_layouts$map__GT_OrderableLayout(G__41099){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(cljs.core.cst$kw$layout.cljs$core$IFn$_invoke$arity$1(G__41099),cljs.core.cst$kw$order.cljs$core$IFn$_invoke$arity$1(G__41099),cljs.core.cst$kw$facets.cljs$core$IFn$_invoke$arity$1(G__41099),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__41099,cljs.core.cst$kw$layout,cljs.core.array_seq([cljs.core.cst$kw$order,cljs.core.cst$kw$facets], 0)),null));
});

org.numenta.sanity.viz_layouts.orderable_layout = (function org$numenta$sanity$viz_layouts$orderable_layout(lay,n_ids){
var order = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(tailrecursion.priority_map.priority_map,cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_ids),cljs.core.range.cljs$core$IFn$_invoke$arity$0()));
return org.numenta.sanity.viz_layouts.map__GT_OrderableLayout(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$layout,lay,cljs.core.cst$kw$order,order,cljs.core.cst$kw$facets,cljs.core.PersistentVector.EMPTY], null));
});
