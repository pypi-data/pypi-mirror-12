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
var args41211 = [];
var len__5740__auto___41217 = arguments.length;
var i__5741__auto___41218 = (0);
while(true){
if((i__5741__auto___41218 < len__5740__auto___41217)){
args41211.push((arguments[i__5741__auto___41218]));

var G__41219 = (i__5741__auto___41218 + (1));
i__5741__auto___41218 = G__41219;
continue;
} else {
}
break;
}

var G__41213 = args41211.length;
switch (G__41213) {
case 7:
return monet.canvas.transform.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 2:
return monet.canvas.transform.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41211.length)].join('')));

}
});

monet.canvas.transform.cljs$core$IFn$_invoke$arity$7 = (function (ctx,m11,m12,m21,m22,dx,dy){
ctx.transform(m11,m12,m21,m22,dx,dy);

return ctx;
});

monet.canvas.transform.cljs$core$IFn$_invoke$arity$2 = (function (ctx,p__41214){
var map__41215 = p__41214;
var map__41215__$1 = ((((!((map__41215 == null)))?((((map__41215.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41215.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41215):map__41215);
var m11 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41215__$1,cljs.core.cst$kw$m11);
var m12 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41215__$1,cljs.core.cst$kw$m12);
var m21 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41215__$1,cljs.core.cst$kw$m21);
var m22 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41215__$1,cljs.core.cst$kw$m22);
var dx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41215__$1,cljs.core.cst$kw$dx);
var dy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41215__$1,cljs.core.cst$kw$dy);
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
monet.canvas.clear_rect = (function monet$canvas$clear_rect(ctx,p__41221){
var map__41224 = p__41221;
var map__41224__$1 = ((((!((map__41224 == null)))?((((map__41224.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41224.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41224):map__41224);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41224__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41224__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41224__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41224__$1,cljs.core.cst$kw$h);
ctx.clearRect(x,y,w,h);

return ctx;
});
/**
 * Paints a rectangle which has a starting point at (x, y) and has a
 * w width and an h height onto the canvas, using the current stroke
 * style.
 */
monet.canvas.stroke_rect = (function monet$canvas$stroke_rect(ctx,p__41226){
var map__41229 = p__41226;
var map__41229__$1 = ((((!((map__41229 == null)))?((((map__41229.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41229.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41229):map__41229);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41229__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41229__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41229__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41229__$1,cljs.core.cst$kw$h);
ctx.strokeRect(x,y,w,h);

return ctx;
});
/**
 * Draws a filled rectangle at (x, y) position whose size is determined
 * by width w and height h.
 */
monet.canvas.fill_rect = (function monet$canvas$fill_rect(ctx,p__41231){
var map__41234 = p__41231;
var map__41234__$1 = ((((!((map__41234 == null)))?((((map__41234.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41234.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41234):map__41234);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41234__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41234__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41234__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41234__$1,cljs.core.cst$kw$h);
ctx.fillRect(x,y,w,h);

return ctx;
});
/**
 * Draws an arc at position (x, y) with radius r, beginning at start-angle,
 * finishing at end-angle, in the direction specified.
 */
monet.canvas.arc = (function monet$canvas$arc(ctx,p__41236){
var map__41239 = p__41236;
var map__41239__$1 = ((((!((map__41239 == null)))?((((map__41239.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41239.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41239):map__41239);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41239__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41239__$1,cljs.core.cst$kw$y);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41239__$1,cljs.core.cst$kw$r);
var start_angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41239__$1,cljs.core.cst$kw$start_DASH_angle);
var end_angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41239__$1,cljs.core.cst$kw$end_DASH_angle);
var counter_clockwise_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41239__$1,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_);
ctx.arc(x,y,r,start_angle,end_angle,counter_clockwise_QMARK_);

return ctx;
});
monet.canvas.two_pi = ((2) * Math.PI);
/**
 * Draws an ellipse at position (x, y) with radius (rw, rh)
 */
monet.canvas.ellipse = (function monet$canvas$ellipse(ctx,p__41241){
var map__41244 = p__41241;
var map__41244__$1 = ((((!((map__41244 == null)))?((((map__41244.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41244.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41244):map__41244);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41244__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41244__$1,cljs.core.cst$kw$y);
var rw = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41244__$1,cljs.core.cst$kw$rw);
var rh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41244__$1,cljs.core.cst$kw$rh);
return monet.canvas.restore(monet.canvas.close_path(monet.canvas.arc(monet.canvas.begin_path(monet.canvas.scale(monet.canvas.save(ctx),(1),(rh / rw))),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y,cljs.core.cst$kw$r,rw,cljs.core.cst$kw$start_DASH_angle,(0),cljs.core.cst$kw$end_DASH_angle,monet.canvas.two_pi,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_,false], null))));
});
/**
 * Draws a circle at position (x, y) with radius r
 */
monet.canvas.circle = (function monet$canvas$circle(ctx,p__41246){
var map__41249 = p__41246;
var map__41249__$1 = ((((!((map__41249 == null)))?((((map__41249.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41249.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41249):map__41249);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41249__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41249__$1,cljs.core.cst$kw$y);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41249__$1,cljs.core.cst$kw$r);
return monet.canvas.close_path(monet.canvas.arc(monet.canvas.begin_path(ctx),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y,cljs.core.cst$kw$r,r,cljs.core.cst$kw$start_DASH_angle,(0),cljs.core.cst$kw$end_DASH_angle,monet.canvas.two_pi,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_,true], null)));
});
/**
 * Paints the given text at a starting point at (x, y), using the
 * current stroke style.
 */
monet.canvas.text = (function monet$canvas$text(ctx,p__41251){
var map__41254 = p__41251;
var map__41254__$1 = ((((!((map__41254 == null)))?((((map__41254.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41254.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41254):map__41254);
var text__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41254__$1,cljs.core.cst$kw$text);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41254__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41254__$1,cljs.core.cst$kw$y);
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
var args41256 = [];
var len__5740__auto___41265 = arguments.length;
var i__5741__auto___41266 = (0);
while(true){
if((i__5741__auto___41266 < len__5740__auto___41265)){
args41256.push((arguments[i__5741__auto___41266]));

var G__41267 = (i__5741__auto___41266 + (1));
i__5741__auto___41266 = G__41267;
continue;
} else {
}
break;
}

var G__41258 = args41256.length;
switch (G__41258) {
case 4:
return monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 3:
return monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41256.length)].join('')));

}
});

monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$4 = (function (ctx,img,x,y){
ctx.drawImage(img,x,y);

return ctx;
});

monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$3 = (function (ctx,img,p__41259){
var map__41260 = p__41259;
var map__41260__$1 = ((((!((map__41260 == null)))?((((map__41260.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41260.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41260):map__41260);
var params = map__41260__$1;
var sh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$sh);
var sw = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$sw);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$y);
var dh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$dh);
var dx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$dx);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$w);
var sy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$sy);
var dy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$dy);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$h);
var dw = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$dw);
var sx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41260__$1,cljs.core.cst$kw$sx);
var pred__41262_41269 = cljs.core._EQ_;
var expr__41263_41270 = cljs.core.count(params);
if(cljs.core.truth_((pred__41262_41269.cljs$core$IFn$_invoke$arity$2 ? pred__41262_41269.cljs$core$IFn$_invoke$arity$2((2),expr__41263_41270) : pred__41262_41269.call(null,(2),expr__41263_41270)))){
ctx.drawImage(img,x,y);
} else {
if(cljs.core.truth_((pred__41262_41269.cljs$core$IFn$_invoke$arity$2 ? pred__41262_41269.cljs$core$IFn$_invoke$arity$2((4),expr__41263_41270) : pred__41262_41269.call(null,(4),expr__41263_41270)))){
ctx.drawImage(img,x,y,w,h);
} else {
if(cljs.core.truth_((pred__41262_41269.cljs$core$IFn$_invoke$arity$2 ? pred__41262_41269.cljs$core$IFn$_invoke$arity$2((8),expr__41263_41270) : pred__41262_41269.call(null,(8),expr__41263_41270)))){
ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__41263_41270)].join('')));
}
}
}

return ctx;
});

monet.canvas.draw_image.cljs$lang$maxFixedArity = 4;
monet.canvas.quadratic_curve_to = (function monet$canvas$quadratic_curve_to(var_args){
var args41271 = [];
var len__5740__auto___41277 = arguments.length;
var i__5741__auto___41278 = (0);
while(true){
if((i__5741__auto___41278 < len__5740__auto___41277)){
args41271.push((arguments[i__5741__auto___41278]));

var G__41279 = (i__5741__auto___41278 + (1));
i__5741__auto___41278 = G__41279;
continue;
} else {
}
break;
}

var G__41273 = args41271.length;
switch (G__41273) {
case 5:
return monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 2:
return monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41271.length)].join('')));

}
});

monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5 = (function (ctx,cpx,cpy,x,y){
ctx.quadraticCurveTo(cpx,cpy,x,y);

return ctx;
});

monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$2 = (function (ctx,p__41274){
var map__41275 = p__41274;
var map__41275__$1 = ((((!((map__41275 == null)))?((((map__41275.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41275.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41275):map__41275);
var cpx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41275__$1,cljs.core.cst$kw$cpx);
var cpy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41275__$1,cljs.core.cst$kw$cpy);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41275__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41275__$1,cljs.core.cst$kw$y);
ctx.quadraticCurveTo(cpx,cpy,x,y);

return ctx;
});

monet.canvas.quadratic_curve_to.cljs$lang$maxFixedArity = 5;
monet.canvas.bezier_curve_to = (function monet$canvas$bezier_curve_to(var_args){
var args41281 = [];
var len__5740__auto___41287 = arguments.length;
var i__5741__auto___41288 = (0);
while(true){
if((i__5741__auto___41288 < len__5740__auto___41287)){
args41281.push((arguments[i__5741__auto___41288]));

var G__41289 = (i__5741__auto___41288 + (1));
i__5741__auto___41288 = G__41289;
continue;
} else {
}
break;
}

var G__41283 = args41281.length;
switch (G__41283) {
case 7:
return monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 2:
return monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args41281.length)].join('')));

}
});

monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$7 = (function (ctx,cp1x,cp1y,cp2x,cp2y,x,y){
ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);

return ctx;
});

monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$2 = (function (ctx,p__41284){
var map__41285 = p__41284;
var map__41285__$1 = ((((!((map__41285 == null)))?((((map__41285.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41285.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41285):map__41285);
var cp1x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41285__$1,cljs.core.cst$kw$cp1x);
var cp1y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41285__$1,cljs.core.cst$kw$cp1y);
var cp2x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41285__$1,cljs.core.cst$kw$cp2x);
var cp2y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41285__$1,cljs.core.cst$kw$cp2y);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41285__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41285__$1,cljs.core.cst$kw$y);
ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);

return ctx;
});

monet.canvas.bezier_curve_to.cljs$lang$maxFixedArity = 7;
monet.canvas.rounded_rect = (function monet$canvas$rounded_rect(ctx,p__41291){
var map__41294 = p__41291;
var map__41294__$1 = ((((!((map__41294 == null)))?((((map__41294.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41294.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41294):map__41294);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41294__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41294__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41294__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41294__$1,cljs.core.cst$kw$h);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41294__$1,cljs.core.cst$kw$r);

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
var len__5740__auto___41300 = arguments.length;
var i__5741__auto___41301 = (0);
while(true){
if((i__5741__auto___41301 < len__5740__auto___41300)){
args__5747__auto__.push((arguments[i__5741__auto___41301]));

var G__41302 = (i__5741__auto___41301 + (1));
i__5741__auto___41301 = G__41302;
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

monet.canvas.update_entity.cljs$lang$applyTo = (function (seq41296){
var G__41297 = cljs.core.first(seq41296);
var seq41296__$1 = cljs.core.next(seq41296);
var G__41298 = cljs.core.first(seq41296__$1);
var seq41296__$2 = cljs.core.next(seq41296__$1);
var G__41299 = cljs.core.first(seq41296__$2);
var seq41296__$3 = cljs.core.next(seq41296__$2);
return monet.canvas.update_entity.cljs$core$IFn$_invoke$arity$variadic(G__41297,G__41298,G__41299,seq41296__$3);
});
monet.canvas.clear_BANG_ = (function monet$canvas$clear_BANG_(mc){
var ks = cljs.core.js_keys(cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc));
var seq__41307 = cljs.core.seq(ks);
var chunk__41308 = null;
var count__41309 = (0);
var i__41310 = (0);
while(true){
if((i__41310 < count__41309)){
var k = chunk__41308.cljs$core$IIndexed$_nth$arity$2(null,i__41310);
monet.canvas.remove_entity(mc,k);

var G__41311 = seq__41307;
var G__41312 = chunk__41308;
var G__41313 = count__41309;
var G__41314 = (i__41310 + (1));
seq__41307 = G__41311;
chunk__41308 = G__41312;
count__41309 = G__41313;
i__41310 = G__41314;
continue;
} else {
var temp__4653__auto__ = cljs.core.seq(seq__41307);
if(temp__4653__auto__){
var seq__41307__$1 = temp__4653__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41307__$1)){
var c__5485__auto__ = cljs.core.chunk_first(seq__41307__$1);
var G__41315 = cljs.core.chunk_rest(seq__41307__$1);
var G__41316 = c__5485__auto__;
var G__41317 = cljs.core.count(c__5485__auto__);
var G__41318 = (0);
seq__41307 = G__41315;
chunk__41308 = G__41316;
count__41309 = G__41317;
i__41310 = G__41318;
continue;
} else {
var k = cljs.core.first(seq__41307__$1);
monet.canvas.remove_entity(mc,k);

var G__41319 = cljs.core.next(seq__41307__$1);
var G__41320 = null;
var G__41321 = (0);
var G__41322 = (0);
seq__41307 = G__41319;
chunk__41308 = G__41320;
count__41309 = G__41321;
i__41310 = G__41322;
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
monet.canvas.draw_loop = (function monet$canvas$draw_loop(p__41323){
var map__41334 = p__41323;
var map__41334__$1 = ((((!((map__41334 == null)))?((((map__41334.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41334.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41334):map__41334);
var mc = map__41334__$1;
var canvas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41334__$1,cljs.core.cst$kw$canvas);
var updating_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41334__$1,cljs.core.cst$kw$updating_QMARK_);
var ctx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41334__$1,cljs.core.cst$kw$ctx);
var active = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41334__$1,cljs.core.cst$kw$active);
var entities = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41334__$1,cljs.core.cst$kw$entities);
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,monet.canvas.attr(canvas,"width"),cljs.core.cst$kw$h,monet.canvas.attr(canvas,"height")], null));

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(active) : cljs.core.deref.call(null,active)))){
var ks_41344 = cljs.core.js_keys(entities);
var cnt_41345 = ks_41344.length;
var i_41346 = (0);
while(true){
if((i_41346 < cnt_41345)){
var k_41347 = (ks_41344[i_41346]);
var map__41336_41348 = (entities[k_41347]);
var map__41336_41349__$1 = ((((!((map__41336_41348 == null)))?((((map__41336_41348.cljs$lang$protocol_mask$partition0$ & (64))) || (map__41336_41348.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__41336_41348):map__41336_41348);
var ent_41350 = map__41336_41349__$1;
var draw_41351 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41336_41349__$1,cljs.core.cst$kw$draw);
var update_41352 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41336_41349__$1,cljs.core.cst$kw$update);
var value_41353 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41336_41349__$1,cljs.core.cst$kw$value);
if(cljs.core.truth_((function (){var and__4670__auto__ = update_41352;
if(cljs.core.truth_(and__4670__auto__)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(updating_QMARK_) : cljs.core.deref.call(null,updating_QMARK_));
} else {
return and__4670__auto__;
}
})())){
var updated_41354 = (function (){var or__4682__auto__ = (function (){try{return (update_41352.cljs$core$IFn$_invoke$arity$1 ? update_41352.cljs$core$IFn$_invoke$arity$1(value_41353) : update_41352.call(null,value_41353));
}catch (e41339){if((e41339 instanceof Error)){
var e = e41339;
console.log(e);

return value_41353;
} else {
throw e41339;

}
}})();
if(cljs.core.truth_(or__4682__auto__)){
return or__4682__auto__;
} else {
return value_41353;
}
})();
if(cljs.core.truth_((entities[k_41347]))){
(entities[k_41347] = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ent_41350,cljs.core.cst$kw$value,updated_41354));
} else {
}
} else {
}

if(cljs.core.truth_(draw_41351)){
try{var G__41341_41355 = ctx;
var G__41342_41356 = cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1((entities[k_41347]));
(draw_41351.cljs$core$IFn$_invoke$arity$2 ? draw_41351.cljs$core$IFn$_invoke$arity$2(G__41341_41355,G__41342_41356) : draw_41351.call(null,G__41341_41355,G__41342_41356));
}catch (e41340){if((e41340 instanceof Error)){
var e_41357 = e41340;
console.log(e_41357);
} else {
throw e41340;

}
}} else {
}

var G__41358 = (i_41346 + (1));
i_41346 = G__41358;
continue;
} else {
}
break;
}

var G__41343 = ((function (map__41334,map__41334__$1,mc,canvas,updating_QMARK_,ctx,active,entities){
return (function (){
return monet$canvas$draw_loop(mc);
});})(map__41334,map__41334__$1,mc,canvas,updating_QMARK_,ctx,active,entities))
;
return (monet.core.animation_frame.cljs$core$IFn$_invoke$arity$1 ? monet.core.animation_frame.cljs$core$IFn$_invoke$arity$1(G__41343) : monet.core.animation_frame.call(null,G__41343));
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
var len__5740__auto___41367 = arguments.length;
var i__5741__auto___41368 = (0);
while(true){
if((i__5741__auto___41368 < len__5740__auto___41367)){
args__5747__auto__.push((arguments[i__5741__auto___41368]));

var G__41369 = (i__5741__auto___41368 + (1));
i__5741__auto___41368 = G__41369;
continue;
} else {
}
break;
}

var argseq__5748__auto__ = ((((1) < args__5747__auto__.length))?(new cljs.core.IndexedSeq(args__5747__auto__.slice((1)),(0))):null);
return monet.canvas.init.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5748__auto__);
});

monet.canvas.init.cljs$core$IFn$_invoke$arity$variadic = (function (canvas,p__41365){
var vec__41366 = p__41365;
var context_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41366,(0),null);
var mc = monet.canvas.monet_canvas(canvas,context_type);
monet.canvas.draw_loop(mc);

return mc;
});

monet.canvas.init.cljs$lang$maxFixedArity = (1);

monet.canvas.init.cljs$lang$applyTo = (function (seq41363){
var G__41364 = cljs.core.first(seq41363);
var seq41363__$1 = cljs.core.next(seq41363);
return monet.canvas.init.cljs$core$IFn$_invoke$arity$variadic(G__41364,seq41363__$1);
});
monet.canvas.stop = (function monet$canvas$stop(mc){
var G__41372 = cljs.core.cst$kw$active.cljs$core$IFn$_invoke$arity$1(mc);
var G__41373 = false;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__41372,G__41373) : cljs.core.reset_BANG_.call(null,G__41372,G__41373));
});
monet.canvas.stop_updating = (function monet$canvas$stop_updating(mc){
var G__41376 = cljs.core.cst$kw$updating_QMARK_.cljs$core$IFn$_invoke$arity$1(mc);
var G__41377 = false;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__41376,G__41377) : cljs.core.reset_BANG_.call(null,G__41376,G__41377));
});
monet.canvas.start_updating = (function monet$canvas$start_updating(mc){
var G__41380 = cljs.core.cst$kw$updating_QMARK_.cljs$core$IFn$_invoke$arity$1(mc);
var G__41381 = true;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__41380,G__41381) : cljs.core.reset_BANG_.call(null,G__41380,G__41381));
});
monet.canvas.restart = (function monet$canvas$restart(mc){
var G__41384_41386 = cljs.core.cst$kw$active.cljs$core$IFn$_invoke$arity$1(mc);
var G__41385_41387 = true;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__41384_41386,G__41385_41387) : cljs.core.reset_BANG_.call(null,G__41384_41386,G__41385_41387));

return monet.canvas.draw_loop(mc);
});
