/* global define, d3 */

define(["utils", "CallbackManager", "lib/underscore"], function(utils, CallbackManager, _) {
    var ZoomContainer = utils.make_class();
    ZoomContainer.prototype = { init: init,
                                set_scroll_behavior: set_scroll_behavior,
                                set_use_3d_transform: set_use_3d_transform,
                                _update_scroll: _update_scroll,
                                toggle_pan_drag: toggle_pan_drag,
                                go_to: go_to,
                                _go_to_3d: _go_to_3d,
                                _clear_3d: _clear_3d,
                                _go_to_svg: _go_to_svg,
                                zoom_by: zoom_by,
                                zoom_in: zoom_in,
                                zoom_out: zoom_out,
                                get_size: get_size,
                                translate_off_screen: translate_off_screen };
    return ZoomContainer;

    // definitions
    function init(selection, scroll_behavior, use_3d_transform, fill_screen) {
        /** Make a container that will manage panning and zooming. Creates a new
         SVG element, with a parent div for CSS3 3D transforms.

         Arguments
         ---------

         selection: A d3 selection of a HTML node to put the zoom container
         in. Should have a defined width and height.

         scroll_behavior: Either 'zoom' or 'pan'.

         use_3d_transform: If true, then use CSS3 3D transform to speed up pan
         and zoom.

         fill_screen: If true, then apply styles to body and selection that fill
         the screen. The styled classes are "fill-screen-body" and
         "fill-screen-div".

         */

        // set the selection class
        selection.classed('escher-container', true);

        // fill screen classes
        if (fill_screen) {
            d3.select("body").classed('fill-screen-body', true);
            selection.classed('fill-screen-div', true);
        }

        // make the svg
        var zoom_container = selection.append('div')
                .attr('class', 'escher-zoom-container');

        var css3_transform_container = zoom_container.append('div')
                .attr('class', 'escher-3d-transform-container');

        var svg = css3_transform_container.append('svg')
            .attr("class", "escher-svg")
            .attr('xmlns', "http://www.w3.org/2000/svg");

        // set up the zoom container
        svg.select(".zoom-g").remove();
        var zoomed_sel = svg.append("g")
            .attr("class", "zoom-g");

        // attributes
        this.selection = selection;
        this.zoom_container = zoom_container;
        this.css3_transform_container = css3_transform_container;
        this.svg = svg;
        this.zoomed_sel = zoomed_sel;
        this.window_translate = {x: 0, y: 0};
        this.window_scale = 1.0;

        this._scroll_behavior = scroll_behavior;
        this._use_3d_transform = use_3d_transform;
        this._pan_drag_on = true;
        this._zoom_behavior = null;
        this._zoom_timeout = null;
        this._svg_scale = this.window_scale;
        this._svg_translate = this.window_translate;
        // this._last_svg_ms = null;

        // set up the callbacks
        this.callback_manager = new CallbackManager();

        // update the scroll behavior
        this._update_scroll();
    }

    function set_scroll_behavior(scroll_behavior) {
        /** Set up pan or zoom on scroll.
         *
         * Arguments
         * ---------
         *
         * scroll_behavior: 'none', 'pan' or 'zoom'.
         *
         */

        this._scroll_behavior = scroll_behavior;
        this._update_scroll();
    }

    function set_use_3d_transform(use_3d_transform) {
        /** Set the option use_3d_transform */
        this._use_3d_transform = use_3d_transform;
    }

    function toggle_pan_drag(on_off) {
        /** Toggle the zoom drag and the cursor UI for it. */

        if (_.isUndefined(on_off)) {
            this._pan_drag_on = !this._pan_drag_on;
        } else {
            this._pan_drag_on = on_off;
        }

        if (this._pan_drag_on) {
            // turn on the hand
            this.zoomed_sel
                .classed('cursor-grab', true).classed('cursor-grabbing', false);
            this.zoomed_sel
                .on('mousedown.cursor', function(sel) {
                    sel.classed('cursor-grab', false).classed('cursor-grabbing', true);
                }.bind(null, this.zoomed_sel))
                .on('mouseup.cursor', function(sel) {
                    sel.classed('cursor-grab', true).classed('cursor-grabbing', false);
                }.bind(null, this.zoomed_sel));
        } else {
            // turn off the hand
            this.zoomed_sel.style('cursor', null)
                .classed('cursor-grab', false)
                .classed('cursor-grabbing', false);
            this.zoomed_sel.on('mousedown.cursor', null);
            this.zoomed_sel.on('mouseup.cursor', null);
        }

        // update the behaviors
        this._update_scroll();
    }

    function _update_scroll() {
        /** Update the pan and zoom behaviors. The behaviors are applied to the
         * css3_transform_container node.
         *
         */

        if (!_.contains(['zoom', 'pan', 'none'], this._scroll_behavior)) {
            throw Error('Bad value for scroll_behavior: ' + this._scroll_behavior);
        }

        // clear all behaviors
        this.zoom_container.on("mousewheel.zoom", null) // zoom scroll behaviors
            .on("DOMMouseScroll.zoom", null) // disables older versions of Firefox
            .on("wheel.zoom", null) // disables newer versions of Firefox
            .on('dblclick.zoom', null)
            .on('mousewheel.escher', null) // pan scroll behaviors
            .on('DOMMouseScroll.escher', null)
            .on('wheel.escher', null)
            .on("mousedown.zoom", null) // drag behaviors
            .on("touchstart.zoom", null)
            .on("touchmove.zoom", null)
            .on("touchend.zoom", null);

        // This handles dragging to pan, and touch events (in any scroll
        // mode). It also handles scrolling to zoom (only 'zoom' mode).
        this._zoom_behavior = d3.behavior.zoom()
            .on("zoom", function() {
                this.go_to(d3.event.scale, {x: d3.event.translate[0], y: d3.event.translate[1]});
            }.bind(this));

        // set current location
        this._zoom_behavior.scale(this.window_scale);
        this._zoom_behavior.translate([this.window_translate.x,
                                       this.window_translate.y]);

        // set it up
        this.zoom_container.call(this._zoom_behavior);

        // always turn off double-clicking to zoom
        this.zoom_container.on('dblclick.zoom', null);

        // if panning is off, then turn off these listeners
        if (!this._pan_drag_on) {
            this.zoom_container.on("mousedown.zoom", null)
                .on("touchstart.zoom", null)
                .on("touchmove.zoom", null)
                .on("touchend.zoom", null);
        }

        // if scroll to zoom is off, then turn off these listeners
        if (this._scroll_behavior !== 'zoom') {
            this.zoom_container
                .on("mousewheel.zoom", null) // zoom scroll behaviors
                .on("DOMMouseScroll.zoom", null) // disables older versions of Firefox
                .on("wheel.zoom", null); // disables newer versions of Firefox
        }

        // add listeners for scrolling to pan
        if (this._scroll_behavior === 'pan') {
            // Add the wheel listener
            var wheel_fn = function() {
                var ev = d3.event,
                    sensitivity = 0.5;
                // stop scroll in parent elements
                ev.stopPropagation();
                ev.preventDefault();
                ev.returnValue = false;
                // change the location
                var get_directional_disp = function(wheel_delta, delta) {
                    var the_delt = _.isUndefined(wheel_delta) ? delta : -wheel_delta / 1.5;
                    return the_delt * sensitivity;
                };
                var new_translate = {
                    x: this.window_translate.x - get_directional_disp(ev.wheelDeltaX, ev.deltaX),
                    y: this.window_translate.y - get_directional_disp(ev.wheelDeltaY, ev.deltaY)
                };
                this.go_to(this.window_scale, new_translate, false);
            }.bind(this);

            // apply it
            this.zoom_container.on('mousewheel.escher', wheel_fn);
            this.zoom_container.on('DOMMouseScroll.escher', wheel_fn);
            this.zoom_container.on('wheel.escher', wheel_fn);
        }
    }

    // functions to scale and translate
    function go_to(scale, translate) {
        /** Zoom the container to a specified location.
         *
         * Arguments
         * ---------
         *
         * scale: The scale, between 0 and 1.
         *
         * translate: The location, of the form {x: 2.0, y: 3.0}.
         *
         */

        utils.check_undefined(arguments, ['scale', 'translate']);

        var use_3d_transform = this._use_3d_transform;

        // check inputs
        if (!scale) throw new Error('Bad scale value');
        if (!translate || !('x' in translate) || !('y' in translate) ||
            isNaN(translate.x) || isNaN(translate.y))
            return console.error('Bad translate value');

        // save inputs
        this.window_scale = scale;
        this.window_translate = translate;

        // save to zoom behavior
        if (!_.isNull(this._zoom_behavior)) {
            this._zoom_behavior.scale(scale);
            var translate_array = [translate.x, translate.y];
            this._zoom_behavior.translate(translate_array);
        }

        if (use_3d_transform) { // 3d tranform
            // cancel all timeouts
            if (!_.isNull(this._zoom_timeout))
                window.clearTimeout(this._zoom_timeout);

            // set the 3d transform
            this._go_to_3d(scale, translate,
                           this._svg_scale, this._svg_translate);

            // if another go_to does not happen within the delay time, then
            // redraw the svg
            this._zoom_timeout = _.delay(function() {
                // redraw the svg
                this._go_to_svg(scale, translate);
            }.bind(this), 100); // between 100 and 600 seems to be usable

        } else { // no 3d transform
            this._go_to_svg(scale, translate);
        }

        this.callback_manager.run('go_to');
    }

    function _go_to_3d(scale, translate, svg_scale, svg_translate) {
        /** Zoom & pan the CSS 3D transform container */
        var n_scale = scale / svg_scale,
            n_translate = utils.c_minus_c(
                translate,
                utils.c_times_scalar(svg_translate, n_scale)
            ),
            tranform = ('translate(' + n_translate.x + 'px,' + n_translate.y + 'px) ' +
                        'scale(' + n_scale + ')');
        this.css3_transform_container.style('transform', tranform);
        this.css3_transform_container.style('-webkit-transform', tranform);
        this.css3_transform_container.style('transform-origin', '0 0');
        this.css3_transform_container.style('-webkit-transform-origin', '0 0');
    }

    function _clear_3d() {
        this.css3_transform_container.style('transform', null);
        this.css3_transform_container.style('-webkit-transform', null);
        this.css3_transform_container.style('transform-origin', null);
        this.css3_transform_container.style('-webkit-transform-origin', null);
    }

    function _go_to_svg(scale, translate) {
        /** Zoom & pan the svg element.
         *
         * Also runs the svg_start and svg_finish callbacks.
         *
         */

        this.callback_manager.run('svg_start');

        // defer to update callbacks
        _.defer(function() {

            // start time
            // var start = new Date().getTime();

            // reset the 3d transform
            this._clear_3d();

            // redraw the svg
            this.zoomed_sel
                .attr('transform',
                      'translate(' + translate.x + ',' + translate.y + ') ' +
                      'scale(' + scale + ')');
            // save svg location
            this._svg_scale = this.window_scale;
            this._svg_translate = this.window_translate;

            _.defer(function() {
                // defer for callback after draw
                this.callback_manager.run('svg_finish');

                // wait a few ms to get a reliable end time
                // _.delay(function() {
                //     // end time
                //     var t = new Date().getTime() - start;
                //     this._last_svg_ms = t;
                // }.bind(this), 20);
            }.bind(this));
        }.bind(this));
    }

    function zoom_by(amount) {
        /** Zoom by a specified multiplier.
         *
         * Arguments
         * ---------
         *
         * amount: A multiplier for the zoom. Greater than 1 zooms in and less
         * than 1 zooms out.
         *
         */
        var size = this.get_size(),
            shift = { x: size.width/2 - ((size.width/2 - this.window_translate.x) * amount +
                                         this.window_translate.x),
                      y: size.height/2 - ((size.height/2 - this.window_translate.y) * amount +
                                          this.window_translate.y) };
        this.go_to(this.window_scale * amount,
                   utils.c_plus_c(this.window_translate, shift));
    }

    function zoom_in() {
        /** Zoom in by the default amount with the default options. */
        this.zoom_by(1.5);
    }

    function zoom_out() {
        /** Zoom out by the default amount with the default options. */
        this.zoom_by(0.667);
    }

    function get_size() {
        /** Return the size of the zoom container as coordinates.
         *
         * e.g. {x: 2, y: 3}
         *
         */
        return { width: parseInt(this.selection.style('width'), 10),
                 height: parseInt(this.selection.style('height'), 10) };
    }

    function translate_off_screen(coords) {
        /** Shift window if new reaction will draw off the screen */

        // TODO BUG not accounting for scale correctly

        var margin = 120, // pixels
            size = this.get_size(),
            current = {'x': {'min': - this.window_translate.x / this.window_scale +
                             margin / this.window_scale,
                             'max': - this.window_translate.x / this.window_scale +
                             (size.width-margin) / this.window_scale },
                       'y': {'min': - this.window_translate.y / this.window_scale +
                             margin / this.window_scale,
                             'max': - this.window_translate.y / this.window_scale +
                             (size.height-margin) / this.window_scale } };
        if (coords.x < current.x.min) {
            this.window_translate.x = this.window_translate.x -
                (coords.x - current.x.min) * this.window_scale;
            this.go_to(this.window_scale, this.window_translate);
        } else if (coords.x > current.x.max) {
            this.window_translate.x = this.window_translate.x -
                (coords.x - current.x.max) * this.window_scale;
            this.go_to(this.window_scale, this.window_translate);
        }
        if (coords.y < current.y.min) {
            this.window_translate.y = this.window_translate.y -
                (coords.y - current.y.min) * this.window_scale;
            this.go_to(this.window_scale, this.window_translate);
        } else if (coords.y > current.y.max) {
            this.window_translate.y = this.window_translate.y -
                (coords.y - current.y.max) * this.window_scale;
            this.go_to(this.window_scale, this.window_translate);
        }
    }
});
