// Compiled by ClojureScript 1.7.170 {:static-fns true, :optimize-constants true}
goog.provide('monet.canvas');
goog.require('cljs.core');
goog.require('monet.core');
monet.canvas.get_context = (function monet$canvas$get_context(canvas,type){
return canvas.getContext(cljs.core.name(type));
});
/**
 * Starts a new path by resetting the list of sub-paths.
 * Call this method when you want to create a new path.
 */
monet.canvas.begin_path = (function monet$canvas$begin_path(ctx){
ctx.beginPath();

return ctx;
});
/**
 * Tries to draw a straight line from the current point to the start.
 * If the shape has already been closed or has only one point, this
 * function does nothing.
 */
monet.canvas.close_path = (function monet$canvas$close_path(ctx){
ctx.closePath();

return ctx;
});
/**
 * Saves the current drawing style state using a stack so you can revert
 * any change you make to it using restore.
 */
monet.canvas.save = (function monet$canvas$save(ctx){
ctx.save();

return ctx;
});
/**
 * Restores the drawing style state to the last element on the 'state stack'
 * saved by save.
 */
monet.canvas.restore = (function monet$canvas$restore(ctx){
ctx.restore();

return ctx;
});
/**
 * Rotate the context 
 */
monet.canvas.rotate = (function monet$canvas$rotate(ctx,angle){
ctx.rotate(angle);

return ctx;
});
/**
 * Scales the context by a floating-point factor in each direction
 */
monet.canvas.scale = (function monet$canvas$scale(ctx,x,y){
ctx.scale(x,y);

return ctx;
});
/**
 * Moves the origin point of the context to (x, y).
 */
monet.canvas.translate = (function monet$canvas$translate(ctx,x,y){
ctx.translate(x,y);

return ctx;
});
/**
 * Multiplies a custom transformation matrix to the existing
 * HTML5 canvas transformation according to the follow convention:
 * 
 * [ x']   [ m11 m21 dx ] [ x ]
 * [ y'] = [ m12 m22 dy ] [ y ]
 * [ 1 ]   [ 0   0   1  ] [ 1 ]
 */
monet.canvas.transform = (function monet$canvas$transform(var_args){
var args40776 = [];
var len__5740__auto___40782 = arguments.length;
var i__5741__auto___40783 = (0);
while(true){
if((i__5741__auto___40783 < len__5740__auto___40782)){
args40776.push((arguments[i__5741__auto___40783]));

var G__40784 = (i__5741__auto___40783 + (1));
i__5741__auto___40783 = G__40784;
continue;
} else {
}
break;
}

var G__40778 = args40776.length;
switch (G__40778) {
case 7:
return monet.canvas.transform.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 2:
return monet.canvas.transform.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40776.length)].join('')));

}
});

monet.canvas.transform.cljs$core$IFn$_invoke$arity$7 = (function (ctx,m11,m12,m21,m22,dx,dy){
ctx.transform(m11,m12,m21,m22,dx,dy);

return ctx;
});

monet.canvas.transform.cljs$core$IFn$_invoke$arity$2 = (function (ctx,p__40779){
var map__40780 = p__40779;
var map__40780__$1 = ((((!((map__40780 == null)))?((((map__40780.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40780.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40780):map__40780);
var m11 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40780__$1,cljs.core.cst$kw$m11);
var m12 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40780__$1,cljs.core.cst$kw$m12);
var m21 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40780__$1,cljs.core.cst$kw$m21);
var m22 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40780__$1,cljs.core.cst$kw$m22);
var dx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40780__$1,cljs.core.cst$kw$dx);
var dy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40780__$1,cljs.core.cst$kw$dy);
ctx.transform(m11,m12,m21,m22,dx,dy);

return ctx;
});

monet.canvas.transform.cljs$lang$maxFixedArity = 7;
/**
 * Fills the subpaths with the current fill style.
 */
monet.canvas.fill = (function monet$canvas$fill(ctx){
ctx.fill();

return ctx;
});
/**
 * Strokes the subpaths with the current stroke style.
 */
monet.canvas.stroke = (function monet$canvas$stroke(ctx){
ctx.stroke();

return ctx;
});
/**
 * Further constrains the clipping region to the current path.
 */
monet.canvas.clip = (function monet$canvas$clip(ctx){
ctx.clip();

return ctx;
});
/**
 * Sets all pixels in the rectangle defined by starting point (x, y)
 * and size (w, h) to transparent black.
 */
monet.canvas.clear_rect = (function monet$canvas$clear_rect(ctx,p__40786){
var map__40789 = p__40786;
var map__40789__$1 = ((((!((map__40789 == null)))?((((map__40789.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40789.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40789):map__40789);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40789__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40789__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40789__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40789__$1,cljs.core.cst$kw$h);
ctx.clearRect(x,y,w,h);

return ctx;
});
/**
 * Paints a rectangle which has a starting point at (x, y) and has a
 * w width and an h height onto the canvas, using the current stroke
 * style.
 */
monet.canvas.stroke_rect = (function monet$canvas$stroke_rect(ctx,p__40791){
var map__40794 = p__40791;
var map__40794__$1 = ((((!((map__40794 == null)))?((((map__40794.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40794.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40794):map__40794);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40794__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40794__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40794__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40794__$1,cljs.core.cst$kw$h);
ctx.strokeRect(x,y,w,h);

return ctx;
});
/**
 * Draws a filled rectangle at (x, y) position whose size is determined
 * by width w and height h.
 */
monet.canvas.fill_rect = (function monet$canvas$fill_rect(ctx,p__40796){
var map__40799 = p__40796;
var map__40799__$1 = ((((!((map__40799 == null)))?((((map__40799.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40799.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40799):map__40799);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40799__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40799__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40799__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40799__$1,cljs.core.cst$kw$h);
ctx.fillRect(x,y,w,h);

return ctx;
});
/**
 * Draws an arc at position (x, y) with radius r, beginning at start-angle,
 * finishing at end-angle, in the direction specified.
 */
monet.canvas.arc = (function monet$canvas$arc(ctx,p__40801){
var map__40804 = p__40801;
var map__40804__$1 = ((((!((map__40804 == null)))?((((map__40804.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40804.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40804):map__40804);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40804__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40804__$1,cljs.core.cst$kw$y);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40804__$1,cljs.core.cst$kw$r);
var start_angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40804__$1,cljs.core.cst$kw$start_DASH_angle);
var end_angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40804__$1,cljs.core.cst$kw$end_DASH_angle);
var counter_clockwise_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40804__$1,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_);
ctx.arc(x,y,r,start_angle,end_angle,counter_clockwise_QMARK_);

return ctx;
});
monet.canvas.two_pi = ((2) * Math.PI);
/**
 * Draws an ellipse at position (x, y) with radius (rw, rh)
 */
monet.canvas.ellipse = (function monet$canvas$ellipse(ctx,p__40806){
var map__40809 = p__40806;
var map__40809__$1 = ((((!((map__40809 == null)))?((((map__40809.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40809.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40809):map__40809);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40809__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40809__$1,cljs.core.cst$kw$y);
var rw = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40809__$1,cljs.core.cst$kw$rw);
var rh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40809__$1,cljs.core.cst$kw$rh);
return monet.canvas.restore(monet.canvas.close_path(monet.canvas.arc(monet.canvas.begin_path(monet.canvas.scale(monet.canvas.save(ctx),(1),(rh / rw))),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y,cljs.core.cst$kw$r,rw,cljs.core.cst$kw$start_DASH_angle,(0),cljs.core.cst$kw$end_DASH_angle,monet.canvas.two_pi,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_,false], null))));
});
/**
 * Draws a circle at position (x, y) with radius r
 */
monet.canvas.circle = (function monet$canvas$circle(ctx,p__40811){
var map__40814 = p__40811;
var map__40814__$1 = ((((!((map__40814 == null)))?((((map__40814.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40814.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40814):map__40814);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40814__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40814__$1,cljs.core.cst$kw$y);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40814__$1,cljs.core.cst$kw$r);
return monet.canvas.close_path(monet.canvas.arc(monet.canvas.begin_path(ctx),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y,cljs.core.cst$kw$r,r,cljs.core.cst$kw$start_DASH_angle,(0),cljs.core.cst$kw$end_DASH_angle,monet.canvas.two_pi,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_,true], null)));
});
/**
 * Paints the given text at a starting point at (x, y), using the
 * current stroke style.
 */
monet.canvas.text = (function monet$canvas$text(ctx,p__40816){
var map__40819 = p__40816;
var map__40819__$1 = ((((!((map__40819 == null)))?((((map__40819.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40819.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40819):map__40819);
var text__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40819__$1,cljs.core.cst$kw$text);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40819__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40819__$1,cljs.core.cst$kw$y);
ctx.fillText(text__$1,x,y);

return ctx;
});
/**
 * Sets the font. Default value 10px sans-serif.
 */
monet.canvas.font_style = (function monet$canvas$font_style(ctx,font){
ctx.font = font;

return ctx;
});
/**
 * Color or style to use inside shapes. Default #000 (black).
 */
monet.canvas.fill_style = (function monet$canvas$fill_style(ctx,color){
ctx.fillStyle = cljs.core.name(color);

return ctx;
});
/**
 * Color or style to use for the lines around shapes. Default #000 (black).
 */
monet.canvas.stroke_style = (function monet$canvas$stroke_style(ctx,color){
ctx.strokeStyle = cljs.core.name(color);

return ctx;
});
/**
 * Sets the line width. Default 1.0
 */
monet.canvas.stroke_width = (function monet$canvas$stroke_width(ctx,w){
ctx.lineWidth = w;

return ctx;
});
/**
 * Sets the line cap. Possible values (as string or keyword):
 * butt (default), round, square
 */
monet.canvas.stroke_cap = (function monet$canvas$stroke_cap(ctx,cap){
ctx.lineCap = cljs.core.name(cap);

return ctx;
});
/**
 * Can be set, to change the line join style. Possible values (as string
 * or keyword): bevel, round, and miter. Other values are ignored.
 */
monet.canvas.stroke_join = (function monet$canvas$stroke_join(ctx,join){
ctx.lineJoin = cljs.core.name(join);

return ctx;
});
/**
 * Moves the starting point of a new subpath to the (x, y) coordinates.
 */
monet.canvas.move_to = (function monet$canvas$move_to(ctx,x,y){
ctx.moveTo(x,y);

return ctx;
});
/**
 * Connects the last point in the subpath to the x, y coordinates with a
 * straight line.
 */
monet.canvas.line_to = (function monet$canvas$line_to(ctx,x,y){
ctx.lineTo(x,y);

return ctx;
});
/**
 * Global Alpha value that is applied to shapes and images before they are
 * composited onto the canvas. Default 1.0 (opaque).
 */
monet.canvas.alpha = (function monet$canvas$alpha(ctx,a){
ctx.globalAlpha = a;

return ctx;
});
/**
 * With Global Alpha applied this sets how shapes and images are drawn
 * onto the existing bitmap. Possible values (as string or keyword):
 * source-atop, source-in, source-out, source-over (default),
 * destination-atop, destination-in, destination-out, destination-over,
 * lighter, darker, copy, xor
 */
monet.canvas.composition_operation = (function monet$canvas$composition_operation(ctx,operation){
ctx.globalCompositionOperation = cljs.core.name(operation);

return ctx;
});
/**
 * Sets the text alignment attribute. Possible values (specified
 * as a string or keyword): start (default), end, left, right or
 * center.
 */
monet.canvas.text_align = (function monet$canvas$text_align(ctx,alignment){
ctx.textAlign = cljs.core.name(alignment);

return ctx;
});
/**
 * Sets the text baseline attribute. Possible values (specified
 * as a string or keyword): top, hanging, middle, alphabetic (default),
 * ideographic, bottom
 */
monet.canvas.text_baseline = (function monet$canvas$text_baseline(ctx,alignment){
ctx.textBaseline = cljs.core.name(alignment);

return ctx;
});
/**
 * Gets the pixel value as a hash map of RGBA values
 */
monet.canvas.get_pixel = (function monet$canvas$get_pixel(ctx,x,y){
var imgd = ctx.getImageData(x,y,(1),(1)).data;
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$red,(imgd[(0)]),cljs.core.cst$kw$green,(imgd[(1)]),cljs.core.cst$kw$blue,(imgd[(2)]),cljs.core.cst$kw$alpha,(imgd[(3)])], null);
});
/**
 * Draws the image onto the canvas at the given position.
 * If a map of params is given, the number of entries is used to
 * determine the underlying call to make.
 */
monet.canvas.draw_image = (function monet$canvas$draw_image(var_args){
var args40821 = [];
var len__5740__auto___40830 = arguments.length;
var i__5741__auto___40831 = (0);
while(true){
if((i__5741__auto___40831 < len__5740__auto___40830)){
args40821.push((arguments[i__5741__auto___40831]));

var G__40832 = (i__5741__auto___40831 + (1));
i__5741__auto___40831 = G__40832;
continue;
} else {
}
break;
}

var G__40823 = args40821.length;
switch (G__40823) {
case 4:
return monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 3:
return monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40821.length)].join('')));

}
});

monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$4 = (function (ctx,img,x,y){
ctx.drawImage(img,x,y);

return ctx;
});

monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$3 = (function (ctx,img,p__40824){
var map__40825 = p__40824;
var map__40825__$1 = ((((!((map__40825 == null)))?((((map__40825.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40825.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40825):map__40825);
var params = map__40825__$1;
var sh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$sh);
var sw = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$sw);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$y);
var dh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$dh);
var dx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$dx);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$w);
var sy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$sy);
var dy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$dy);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$h);
var dw = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$dw);
var sx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40825__$1,cljs.core.cst$kw$sx);
var pred__40827_40834 = cljs.core._EQ_;
var expr__40828_40835 = cljs.core.count(params);
if(cljs.core.truth_((pred__40827_40834.cljs$core$IFn$_invoke$arity$2 ? pred__40827_40834.cljs$core$IFn$_invoke$arity$2((2),expr__40828_40835) : pred__40827_40834.call(null,(2),expr__40828_40835)))){
ctx.drawImage(img,x,y);
} else {
if(cljs.core.truth_((pred__40827_40834.cljs$core$IFn$_invoke$arity$2 ? pred__40827_40834.cljs$core$IFn$_invoke$arity$2((4),expr__40828_40835) : pred__40827_40834.call(null,(4),expr__40828_40835)))){
ctx.drawImage(img,x,y,w,h);
} else {
if(cljs.core.truth_((pred__40827_40834.cljs$core$IFn$_invoke$arity$2 ? pred__40827_40834.cljs$core$IFn$_invoke$arity$2((8),expr__40828_40835) : pred__40827_40834.call(null,(8),expr__40828_40835)))){
ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__40828_40835)].join('')));
}
}
}

return ctx;
});

monet.canvas.draw_image.cljs$lang$maxFixedArity = 4;
monet.canvas.quadratic_curve_to = (function monet$canvas$quadratic_curve_to(var_args){
var args40836 = [];
var len__5740__auto___40842 = arguments.length;
var i__5741__auto___40843 = (0);
while(true){
if((i__5741__auto___40843 < len__5740__auto___40842)){
args40836.push((arguments[i__5741__auto___40843]));

var G__40844 = (i__5741__auto___40843 + (1));
i__5741__auto___40843 = G__40844;
continue;
} else {
}
break;
}

var G__40838 = args40836.length;
switch (G__40838) {
case 5:
return monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 2:
return monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40836.length)].join('')));

}
});

monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5 = (function (ctx,cpx,cpy,x,y){
ctx.quadraticCurveTo(cpx,cpy,x,y);

return ctx;
});

monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$2 = (function (ctx,p__40839){
var map__40840 = p__40839;
var map__40840__$1 = ((((!((map__40840 == null)))?((((map__40840.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40840.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40840):map__40840);
var cpx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40840__$1,cljs.core.cst$kw$cpx);
var cpy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40840__$1,cljs.core.cst$kw$cpy);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40840__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40840__$1,cljs.core.cst$kw$y);
ctx.quadraticCurveTo(cpx,cpy,x,y);

return ctx;
});

monet.canvas.quadratic_curve_to.cljs$lang$maxFixedArity = 5;
monet.canvas.bezier_curve_to = (function monet$canvas$bezier_curve_to(var_args){
var args40846 = [];
var len__5740__auto___40852 = arguments.length;
var i__5741__auto___40853 = (0);
while(true){
if((i__5741__auto___40853 < len__5740__auto___40852)){
args40846.push((arguments[i__5741__auto___40853]));

var G__40854 = (i__5741__auto___40853 + (1));
i__5741__auto___40853 = G__40854;
continue;
} else {
}
break;
}

var G__40848 = args40846.length;
switch (G__40848) {
case 7:
return monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 2:
return monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40846.length)].join('')));

}
});

monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$7 = (function (ctx,cp1x,cp1y,cp2x,cp2y,x,y){
ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);

return ctx;
});

monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$2 = (function (ctx,p__40849){
var map__40850 = p__40849;
var map__40850__$1 = ((((!((map__40850 == null)))?((((map__40850.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40850.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40850):map__40850);
var cp1x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40850__$1,cljs.core.cst$kw$cp1x);
var cp1y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40850__$1,cljs.core.cst$kw$cp1y);
var cp2x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40850__$1,cljs.core.cst$kw$cp2x);
var cp2y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40850__$1,cljs.core.cst$kw$cp2y);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40850__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40850__$1,cljs.core.cst$kw$y);
ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);

return ctx;
});

monet.canvas.bezier_curve_to.cljs$lang$maxFixedArity = 7;
monet.canvas.rounded_rect = (function monet$canvas$rounded_rect(ctx,p__40856){
var map__40859 = p__40856;
var map__40859__$1 = ((((!((map__40859 == null)))?((((map__40859.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40859.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40859):map__40859);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40859__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40859__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40859__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40859__$1,cljs.core.cst$kw$h);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40859__$1,cljs.core.cst$kw$r);

monet.canvas.stroke(monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5(monet.canvas.line_to(monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5(monet.canvas.line_to(monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5(monet.canvas.line_to(monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5(monet.canvas.line_to(monet.canvas.move_to(monet.canvas.begin_path(ctx),x,(y + r)),x,((y + h) - r)),x,(y + h),(x + r),(y + h)),((x + w) - r),(y + h)),(x + w),(y + h),(x + w),((y + h) - r)),(x + w),(y + r)),(x + w),y,((x + w) - r),y),(x + r),y),x,y,x,(y + r)));

return ctx;
});
monet.canvas.add_entity = (function monet$canvas$add_entity(mc,k,ent){
return (cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k] = ent);
});
monet.canvas.remove_entity = (function monet$canvas$remove_entity(mc,k){
return delete cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k];
});
monet.canvas.get_entity = (function monet$canvas$get_entity(mc,k){
return cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1((cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k]));
});
monet.canvas.update_entity = (function monet$canvas$update_entity(var_args){
var args__5747__auto__ = [];
var len__5740__auto___40865 = arguments.length;
var i__5741__auto___40866 = (0);
while(true){
if((i__5741__auto___40866 < len__5740__auto___40865)){
args__5747__auto__.push((arguments[i__5741__auto___40866]));

var G__40867 = (i__5741__auto___40866 + (1));
i__5741__auto___40866 = G__40867;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((3) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((3)),(0))):null);
return monet.canvas.update_entity.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5748__auto__);
});

monet.canvas.update_entity.cljs$core$IFn$_invoke$arity$variadic = (function (mc,k,func,extra){
var cur = (cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k]);
var res = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(func,cur,extra);
return (cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k] = res);
});

monet.canvas.update_entity.cljs$lang$maxFixedArity = (3);

monet.canvas.update_entity.cljs$lang$applyTo = (function (seq40861){
var G__40862 = cljs.core.first(seq40861);
var seq40861__$1 = cljs.core.next(seq40861);
var G__40863 = cljs.core.first(seq40861__$1);
var seq40861__$2 = cljs.core.next(seq40861__$1);
var G__40864 = cljs.core.first(seq40861__$2);
var seq40861__$3 = cljs.core.next(seq40861__$2);
return monet.canvas.update_entity.cljs$core$IFn$_invoke$arity$variadic(G__40862,G__40863,G__40864,seq40861__$3);
});
monet.canvas.clear_BANG_ = (function monet$canvas$clear_BANG_(mc){
var ks = cljs.core.js_keys(cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc));
var seq__40872 = cljs.core.seq(ks);
var chunk__40873 = null;
var count__40874 = (0);
var i__40875 = (0);
while(true){
if((i__40875 < count__40874)){
var k = chunk__40873.cljs$core$IIndexed$_nth$arity$2(null,i__40875);
monet.canvas.remove_entity(mc,k);

var G__40876 = seq__40872;
var G__40877 = chunk__40873;
var G__40878 = count__40874;
var G__40879 = (i__40875 + (1));
seq__40872 = G__40876;
chunk__40873 = G__40877;
count__40874 = G__40878;
i__40875 = G__40879;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__40872);
if(temp__4653__auto__){
var seq__40872__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40872__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__40872__$1);
var G__40880 = cljs.core.chunk_rest(seq__40872__$1);
var G__40881 = c__5485__auto__;
var G__40882 = cljs.core.count(c__5485__auto__);
var G__40883 = (0);
seq__40872 = G__40880;
chunk__40873 = G__40881;
count__40874 = G__40882;
i__40875 = G__40883;
continue;
} else {
var k = cljs.core.first(seq__40872__$1);
monet.canvas.remove_entity(mc,k);

var G__40884 = cljs.core.next(seq__40872__$1);
var G__40885 = null;
var G__40886 = (0);
var G__40887 = (0);
seq__40872 = G__40884;
chunk__40873 = G__40885;
count__40874 = G__40886;
i__40875 = G__40887;
continue;
}
} else {
return null;
}
}
break;
}
});
monet.canvas.entity = (function monet$canvas$entity(v,update,draw){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$value,v,cljs.core.cst$kw$draw,draw,cljs.core.cst$kw$update,update], null);
});
monet.canvas.attr = (function monet$canvas$attr(e,a){
return e.getAttribute(a);
});
monet.canvas.draw_loop = (function monet$canvas$draw_loop(p__40888){
var map__40899 = p__40888;
var map__40899__$1 = ((((!((map__40899 == null)))?((((map__40899.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40899.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40899):map__40899);
var mc = map__40899__$1;
var canvas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40899__$1,cljs.core.cst$kw$canvas);
var updating_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40899__$1,cljs.core.cst$kw$updating_QMARK_);
var ctx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40899__$1,cljs.core.cst$kw$ctx);
var active = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40899__$1,cljs.core.cst$kw$active);
var entities = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40899__$1,cljs.core.cst$kw$entities);
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,monet.canvas.attr(canvas,"width"),cljs.core.cst$kw$h,monet.canvas.attr(canvas,"height")], null));

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(active) : cljs.core.deref.call(null,active)))){
var ks_40909 = cljs.core.js_keys(entities);
var cnt_40910 = ks_40909.length;
var i_40911 = (0);
while(true){
if((i_40911 < cnt_40910)){
var k_40912 = (ks_40909[i_40911]);
var map__40901_40913 = (entities[k_40912]);
var map__40901_40914__$1 = ((((!((map__40901_40913 == null)))?((((map__40901_40913.cljs$lang$protocol_mask$partition0$ & (64))) || (map__40901_40913.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__40901_40913):map__40901_40913);
var ent_40915 = map__40901_40914__$1;
var draw_40916 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40901_40914__$1,cljs.core.cst$kw$draw);
var update_40917 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40901_40914__$1,cljs.core.cst$kw$update);
var value_40918 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40901_40914__$1,cljs.core.cst$kw$value);
if(cljs.core.truth_((function (){var and__4670__auto__ = update_40917;
if(cljs.core.truth_(and__4670__auto__)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(updating_QMARK_) : cljs.core.deref.call(null,updating_QMARK_));
} else {
return and__4670__auto__;
}
})())){
var updated_40919 = (function (){var or__4682__auto__ = (function (){try{return (update_40917.cljs$core$IFn$_invoke$arity$1 ? update_40917.cljs$core$IFn$_invoke$arity$1(value_40918) : update_40917.call(null,value_40918));
}catch (e40904){if((e40904 instanceof Error)){
var e = e40904;
console.log(e);

return value_40918;
} else {
throw e40904;

}
}})();
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return value_40918;
}
})();
if(cljs.core.truth_((entities[k_40912]))){
(entities[k_40912] = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ent_40915,cljs.core.cst$kw$value,updated_40919));
} else {
}
} else {
}

if(cljs.core.truth_(draw_40916)){
try{var G__40906_40920 = ctx;
var G__40907_40921 = cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1((entities[k_40912]));
(draw_40916.cljs$core$IFn$_invoke$arity$2 ? draw_40916.cljs$core$IFn$_invoke$arity$2(G__40906_40920,G__40907_40921) : draw_40916.call(null,G__40906_40920,G__40907_40921));
}catch (e40905){if((e40905 instanceof Error)){
var e_40922 = e40905;
console.log(e_40922);
} else {
throw e40905;

}
}} else {
}

var G__40923 = (i_40911 + (1));
i_40911 = G__40923;
continue;
} else {
}
break;
}

var G__40908 = ((function (map__40899,map__40899__$1,mc,canvas,updating_QMARK_,ctx,active,entities){
return (function (){
return monet$canvas$draw_loop(mc);
});})(map__40899,map__40899__$1,mc,canvas,updating_QMARK_,ctx,active,entities))
;
return (monet.core.animation_frame.cljs$core$IFn$_invoke$arity$1 ? monet.core.animation_frame.cljs$core$IFn$_invoke$arity$1(G__40908) : monet.core.animation_frame.call(null,G__40908));
} else {
return null;
}
});
monet.canvas.monet_canvas = (function monet$canvas$monet_canvas(elem,context_type){
var ct = (function (){var or__4682__auto__ = context_type;
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return "2d";
}
})();
var ctx = monet.canvas.get_context(elem,ct);
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$canvas,elem,cljs.core.cst$kw$ctx,ctx,cljs.core.cst$kw$entities,{},cljs.core.cst$kw$updating_QMARK_,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true)),cljs.core.cst$kw$active,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true))], null);
});
monet.canvas.init = (function monet$canvas$init(var_args){
var args__5747__auto__ = [];
var len__5740__auto___40932 = arguments.length;
var i__5741__auto___40933 = (0);
while(true){
if((i__5741__auto___40933 < len__5740__auto___40932)){
args__5747__auto__.push((arguments[i__5741__auto___40933]));

var G__40934 = (i__5741__auto___40933 + (1));
i__5741__auto___40933 = G__40934;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return monet.canvas.init.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

monet.canvas.init.cljs$core$IFn$_invoke$arity$variadic = (function (canvas,p__40930){
var vec__40931 = p__40930;
var context_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40931,(0),null);
var mc = monet.canvas.monet_canvas(canvas,context_type);
monet.canvas.draw_loop(mc);

return mc;
});

monet.canvas.init.cljs$lang$maxFixedArity = (1);

monet.canvas.init.cljs$lang$applyTo = (function (seq40928){
var G__40929 = cljs.core.first(seq40928);
var seq40928__$1 = cljs.core.next(seq40928);
return monet.canvas.init.cljs$core$IFn$_invoke$arity$variadic(G__40929,seq40928__$1);
});
monet.canvas.stop = (function monet$canvas$stop(mc){
var G__40937 = cljs.core.cst$kw$active.cljs$core$IFn$_invoke$arity$1(mc);
var G__40938 = false;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__40937,G__40938) : cljs.core.reset_BANG_.call(null,G__40937,G__40938));
});
monet.canvas.stop_updating = (function monet$canvas$stop_updating(mc){
var G__40941 = cljs.core.cst$kw$updating_QMARK_.cljs$core$IFn$_invoke$arity$1(mc);
var G__40942 = false;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__40941,G__40942) : cljs.core.reset_BANG_.call(null,G__40941,G__40942));
});
monet.canvas.start_updating = (function monet$canvas$start_updating(mc){
var G__40945 = cljs.core.cst$kw$updating_QMARK_.cljs$core$IFn$_invoke$arity$1(mc);
var G__40946 = true;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__40945,G__40946) : cljs.core.reset_BANG_.call(null,G__40945,G__40946));
});
monet.canvas.restart = (function monet$canvas$restart(mc){
var G__40949_40951 = cljs.core.cst$kw$active.cljs$core$IFn$_invoke$arity$1(mc);
var G__40950_40952 = true;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__40949_40951,G__40950_40952) : cljs.core.reset_BANG_.call(null,G__40949_40951,G__40950_40952));

return monet.canvas.draw_loop(mc);
});
