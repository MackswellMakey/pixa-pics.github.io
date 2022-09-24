import SIMDope from "../../../utils/SIMDope";
const simdops = SIMDope.simdops;
const SIMDopeColorUint8x4 = SIMDope.SIMDopeColorUint8x4;
const SuperBlend = {
    _build_state(layer_number, max_length) {
        "use strict";
        layer_number = layer_number | 0;
        max_length = max_length | 0;

        const state = {
            layer_number: layer_number | 0,
            max_length: max_length | 0,
            current_index: 0,
            indexes_data_for_layers: new Uint32Array(max_length),
            colors_data_in_layers_buffers: new Array(),
            colors_data_in_layers_uint32: new Array(),
            colors_data_in_layers_views: new Array(),
            amount_data_in_layers_buffers: new Array(),
            amount_data_in_layers: new Array(),
            amount_data_in_layers_views: new Array(),
            hover_data_in_layers_buffers: new Array(),
            hover_data_in_layers: new Array(),
            hover_data_in_layers_views: new Array(),
        };

        for(let i= 0; i < layer_number; i = i+1|0) {

            let colors_data_in_layers_buffers = new ArrayBuffer((max_length*4|0)>>>0);
            state.colors_data_in_layers_uint32.push(new Uint32Array(colors_data_in_layers_buffers));
            state.colors_data_in_layers_views.push(new DataView(colors_data_in_layers_buffers));
            state.colors_data_in_layers_buffers.push(colors_data_in_layers_buffers);

            let amount_data_in_layers_buffers = new ArrayBuffer(max_length);
            state.amount_data_in_layers.push(new Uint8ClampedArray(amount_data_in_layers_buffers));
            state.amount_data_in_layers_views.push(new DataView(amount_data_in_layers_buffers));
            state.amount_data_in_layers_buffers.push(amount_data_in_layers_buffers);

            let hover_data_in_layers_buffers = new ArrayBuffer(max_length);
            state.hover_data_in_layers.push(new Uint8ClampedArray(hover_data_in_layers_buffers));
            state.hover_data_in_layers_views.push(new DataView(hover_data_in_layers_buffers));
            state.hover_data_in_layers_buffers.push(hover_data_in_layers_buffers);
        }

        return Object.assign({}, state);
    },
    _build_shadow_state (state, old_shadow_state) {
        "use strict";
        if(typeof old_shadow_state !== "undefined") {

            delete old_shadow_state.base_rgba_colors_for_blending;
            for(let i = 0; i < old_shadow_state.uint32_rgba_colors_data_in_layers.length; i = (i+1 | 0)>>>0) {
                delete old_shadow_state.uint32_rgba_colors_data_in_layers[(i|0)>>>0];
            }
            delete old_shadow_state.uint32_rgba_colors_data_in_layers;
        }

        // Create a shadow state for computation
        let shadow_state = {
            base_rgba_colors_for_blending: new Uint32Array(0),
            uint32_rgba_colors_data_in_layers: new Array(state.layer_number),
            start_layer_indexes: new Uint8ClampedArray(0),
            mapped_colors: new Map(),
            all_layers_length: 0,
            used_colors_length: 0,
            bv: {}
        };

        shadow_state.bv.color_less_uint8x4 = SIMDopeColorUint8x4.new_splat(64);
        shadow_state.bv.color_full_uint8x4 = SIMDopeColorUint8x4.new_splat(192);
        shadow_state.bv.hover_uint8x4 = SIMDopeColorUint8x4.new_zero();
        shadow_state.bv.base_uint8x4 = SIMDopeColorUint8x4.new_zero();
        shadow_state.bv.added_uint8x4 = SIMDopeColorUint8x4.new_zero();
        shadow_state.bv.float_variables = new Uint8ClampedArray(new ArrayBuffer(6));
        shadow_state.bv.start_layer = 0;

        // Slice uint32 colors and give them as uint8
        for(let layer_n = 0; layer_n < state.layer_number; layer_n = (layer_n + 1 | 0)>>>0) {
            shadow_state.uint32_rgba_colors_data_in_layers[layer_n] = new Uint32Array(0);
        }

        return shadow_state;
    },
    _update_state(state, layer_number, max_length, _build_state) {
        "use strict";
        layer_number = layer_number | 0;
        max_length = max_length | 0;

        if(typeof state === "undefined") {

            return _build_state(layer_number, max_length);
        } if(state === null){

            return _build_state(layer_number, max_length);
        } else {

            let layer_number_difference = simdops.minus_int(layer_number, state.layer_number);
            let redefine_it_up_to_layer_n = state.layer_number | 0;

            // Add or remove layers
            if(simdops.uint_not_equal(layer_number_difference, 0)) {

                if(layer_number_difference > 0) { // Must add some layers

                    // Add layers within data array
                    for(let i = 1; simdops.int_less_equal(i, simdops.abs_int(layer_number_difference)); i = simdops.plus_uint(i, 1)) {

                        let colors_data_in_layers_buffers = new ArrayBuffer(simdops.multiply_uint(max_length, 4));
                        state.colors_data_in_layers_uint32.push(new Uint32Array(colors_data_in_layers_buffers));
                        state.colors_data_in_layers_views.push(new DataView(colors_data_in_layers_buffers));
                        state.colors_data_in_layers_buffers.push(colors_data_in_layers_buffers);

                        let amount_data_in_layers_buffers = new ArrayBuffer(max_length);
                        state.amount_data_in_layers.push(new Uint8ClampedArray(amount_data_in_layers_buffers));
                        state.amount_data_in_layers_views.push(new DataView(amount_data_in_layers_buffers));
                        state.amount_data_in_layers_buffers.push(amount_data_in_layers_buffers);

                        let hover_data_in_layers_buffers = new ArrayBuffer(max_length);
                        state.hover_data_in_layers.push(new Uint8ClampedArray(hover_data_in_layers_buffers));
                        state.hover_data_in_layers_views.push(new DataView(hover_data_in_layers_buffers));
                        state.hover_data_in_layers_buffers.push(hover_data_in_layers_buffers);
                    }

                }else if(simdops.int_less(layer_number_difference, 0)){ // Must remove some layers

                    // Delete layers within data array
                    for(let i = 1; i <= simdops.uint_less_equal(i, simdops.abs_int(layer_number_difference)); i = simdops.plus_uint(i, 1)) {

                        let index = simdops.minus_uint(state.layer_number,i);
                        delete state.colors_data_in_layers_uint32[index];
                        delete state.colors_data_in_layers_views[index];
                        delete state.colors_data_in_layers_buffers[index];
                        delete state.amount_data_in_layers[index];
                        delete state.amount_data_in_layers_views[index];
                        delete state.amount_data_in_layers_buffers[index];
                        delete state.hover_data_in_layers[index];
                        delete state.hover_data_in_layers_views[index];
                        delete state.hover_data_in_layers_buffers[index];
                    }
                }
                layer_number_difference = 0;
            }

            // Flooding or recreate existing layers
            if (simdops.int_not_equal(layer_number_difference, 0) || simdops.int_not_equal(state.max_length, max_length)) {

                if (simdops.int_not_equal(state.max_length, max_length) || typeof state.colors_data_in_layers_uint32[simdops.minus_int(redefine_it_up_to_layer_n, 1)] === "undefined") {

                    state.indexes_data_for_layers = new Uint32Array(max_length);
                    for (let i = 0; simdops.uint_less(i, redefine_it_up_to_layer_n); i = simdops.plus_uint(i, 1)) {

                        state.colors_data_in_layers_buffers[i] = new ArrayBuffer(simdops.multiply_uint(max_length,4));
                        state.colors_data_in_layers_uint32[i] = new Uint32Array(state.colors_data_in_layers_buffers[i]);
                        state.colors_data_in_layers_views[i] = new DataView(state.colors_data_in_layers_buffers[i]);
                        state.amount_data_in_layers_buffers[i] = new ArrayBuffer(max_length);
                        state.amount_data_in_layers[i] = new Uint8ClampedArray(state.amount_data_in_layers_buffers[i]);
                        state.amount_data_in_layers_views[i] = new DataView(state.amount_data_in_layers_buffers[i]);
                        state.hover_data_in_layers_buffers[i] = new ArrayBuffer(max_length);
                        state.hover_data_in_layers[i] = new Uint8ClampedArray(state.hover_data_in_layers_buffers[i]);
                        state.hover_data_in_layers_views[i] = new DataView(state.hover_data_in_layers_buffers[i]);
                    }
                } else {

                    state.indexes_data_for_layers.fill(0);
                    for (let i = 0; simdops.uint_less(i, redefine_it_up_to_layer_n); i = simdops.plus_uint(i, 1)) {

                        state.colors_data_in_layers_uint32[i].fill(0);
                        state.amount_data_in_layers[i].fill(0);
                        state.hover_data_in_layers[i].fill(0);
                    }
                }
            }

            state.layer_number = layer_number | 0;
            state.max_length = max_length | 0;
            state.current_index = 0;
            return Object.assign({}, state);
        }
    },
    _update_shadow_state (shadow_state, state) {
        "use strict";
        // Create a shadow state for computation
        shadow_state.all_layers_length = state.layer_number | 0;
        shadow_state.used_colors_length = state.current_index | 0;
        shadow_state.base_rgba_colors_for_blending = new Uint32Array(shadow_state.used_colors_length);
        shadow_state.start_layer_indexes = new Uint8ClampedArray(shadow_state.used_colors_length);
        shadow_state.mapped_colors.clear()

        // Slice uint32 colors and give them as uint8
        for(let layer_n = 0; simdops.uint_less(layer_n, state.layer_number); layer_n = simdops.plus_uint(layer_n, 1)) {
            shadow_state.uint32_rgba_colors_data_in_layers[layer_n] = state.colors_data_in_layers_uint32[layer_n].subarray(0, shadow_state.used_colors_length);
        }

        return shadow_state;
    },
    init(lay_n, pxl_len){
        "use strict";
        const builder = this._build_state;
        const shadow_builder = this._build_shadow_state;
        const updater = this._update_state;
        const shadow_updater = this._update_shadow_state;

        let state = builder(lay_n || 1, pxl_len || 1);
        let shadow_state = shadow_builder(state);

        let bytes_index_32 = -4;

        return {
            for: function(pixel_index) {
                "use strict";

                pixel_index = (pixel_index|0)>>>0;
                state.indexes_data_for_layers[state.current_index|0] = (pixel_index | 0) >>> 0;
                state.current_index = simdops.plus_uint(state.current_index, 1);
                bytes_index_32 = simdops.plus_int(bytes_index_32,4);
            },
            stack: function(for_layer_index, ui32color, amount, is_hover) {
                "use strict";

                for_layer_index = (for_layer_index | 0) >>> 0;
                ui32color = simdops.clamp_uint32(ui32color);
                amount = simdops.clamp_uint8(amount);
                is_hover = simdops.clamp_uint8(is_hover);
                
                state.colors_data_in_layers_views[for_layer_index].setUint32(bytes_index_32, ui32color);
                state.amount_data_in_layers_views[for_layer_index].setUint8(simdops.divide_four_uint(bytes_index_32), amount);
                state.hover_data_in_layers_views[for_layer_index].setUint8(simdops.divide_four_uint(bytes_index_32), is_hover);
            },
            blend: function(should_return_transparent, alpha_addition) {
                "use strict";

                should_return_transparent = should_return_transparent | 0;
                alpha_addition = alpha_addition | 0;

                shadow_state = shadow_updater(shadow_state, state);
                let {hover_data_in_layers, amount_data_in_layers, indexes_data_for_layers} = state;
                let {base_rgba_colors_for_blending, uint32_rgba_colors_data_in_layers, start_layer_indexes, mapped_colors, all_layers_length, used_colors_length, bv} = shadow_state;
                let {color_less_uint8x4, color_full_uint8x4, hover_uint8x4, base_uint8x4, added_uint8x4, float_variables, start_layer} = bv;

                // Browse the full list of pixel colors encoded within 32 bytes of data
                for(let i = 0; simdops.int_less(i, used_colors_length); i = simdops.plus_uint(i,1)) {

                    // Compute the layer to start the color addition
                    start_layer = -1;
                    for (let layer_n = simdops.minus_int(all_layers_length, 1); simdops.int_greater_equal(layer_n, 0); layer_n = simdops.minus_int(layer_n, 1)) {

                        if (simdops.int_equal(start_layer, -1)) {

                            if (simdops.int_equal(simdops.clamp_uint8(uint32_rgba_colors_data_in_layers[layer_n][simdops.plus_uint(i, 3)]), 255) && simdops.int_equal(simdops.clamp_uint8(amount_data_in_layers[layer_n][i]), 255)) {

                                start_layer = layer_n|0;
                            }
                        }
                    }
                    start_layer_indexes[i] = simdops.plus_int(start_layer, 1);
                }

                for(let i = 0; simdops.uint_less(i, used_colors_length); i = simdops.plus_uint(i,1)) {

                    start_layer = start_layer_indexes[i];
                    // Get the first base color to sum up with colors atop of it
                    if(simdops.int_less_equal(start_layer, 0)) { base_uint8x4 = SIMDopeColorUint8x4(base_rgba_colors_for_blending.buffer, i);
                    }else {base_uint8x4 = SIMDopeColorUint8x4(uint32_rgba_colors_data_in_layers[simdops.minus_int(start_layer,1)].buffer, i);}

                    // Sum up all colors above
                    for(let layer_n = start_layer|0; simdops.int_less(layer_n, all_layers_length); layer_n = simdops.plus_uint(layer_n, 1)) {

                        // Compute hover if hover color
                        if(simdops.uint_not_equal(hover_data_in_layers[layer_n][i], 0)) {

                            // Get the color below current layer
                            hover_uint8x4 = SIMDopeColorUint8x4(base_uint8x4.buffer);

                            if(simdops.uint_greater_equal(SIMDopeColorUint8x4.sumarray(hover_uint8x4, 0, 3), 384)) {

                                hover_uint8x4 = SIMDopeColorUint8x4.average(hover_uint8x4, color_full_uint8x4);
                            }else {

                                hover_uint8x4 = SIMDopeColorUint8x4.average(hover_uint8x4, color_less_uint8x4);
                            }

                            hover_uint8x4 = SIMDopeColorUint8x4.with_a(hover_uint8x4, simdops.plus_uint(128, simdops.divide_uint(amount_data_in_layers[layer_n][i], 2)));
                            added_uint8x4 = SIMDopeColorUint8x4(hover_uint8x4);
                        }else {

                            added_uint8x4 = SIMDopeColorUint8x4.new_uint32(uint32_rgba_colors_data_in_layers[layer_n][i]);
                        }

                        float_variables[5] = amount_data_in_layers[layer_n][i];

                        if(should_return_transparent && simdops.uint_equal(added_uint8x4.a, 0) && simdops.uint_equal(float_variables[5], 255)) {

                            base_uint8x4 = SIMDopeColorUint8x4.new_zero();
                        }else if(simdops.int_equal(added_uint8x4.a, 255) && simdops.int_equal(float_variables[5], 255)) {

                            base_uint8x4 = SIMDopeColorUint8x4(added_uint8x4.buffer);
                        }else {

                            float_variables[0] = base_uint8x4.a;
                            float_variables[1] = simdops.clamp_uint8(added_uint8x4.a * float_variables[5]/255);

                            if (simdops.uint_not_equal(float_variables[0], 0) && simdops.uint_not_equal(float_variables[1], 0)) {

                                if(alpha_addition) { float_variables[2] = simdops.clamp_uint8((float_variables[0] + float_variables[1]) / 2); } else { float_variables[2] = simdops.clamp_uint8(255 - (1 - float_variables[1]/255) * (1 - float_variables[0]/255) * 255);}
                                float_variables[3] = simdops.clamp_uint8(float_variables[1] / float_variables[2] * 255);
                                float_variables[4] =  simdops.clamp_uint8(float_variables[0] * (1 - float_variables[1]/255) / (float_variables[2]/255));
                                added_uint8x4 = SIMDopeColorUint8x4.merge_scale_of(added_uint8x4, float_variables[3]/255, base_uint8x4, float_variables[4]/255);
                                base_uint8x4 = SIMDopeColorUint8x4.with_a(base_uint8x4, float_variables[2]);

                            }else if(simdops.int_greater(float_variables[1], 0)) {

                                base_uint8x4 = SIMDopeColorUint8x4(added_uint8x4.buffer);
                            }else {

                                base_uint8x4 = SIMDopeColorUint8x4.with_a(base_uint8x4, base_uint8x4.a);
                            }
                        }
                    }
                    base_rgba_colors_for_blending[i] = base_uint8x4.uint32;
                }

                // Map index and color as they are converted back in ui32
                for(let i = 0; simdops.int_less(i, used_colors_length); i = simdops.plus_uint(i, 1)) {
                    mapped_colors.set(indexes_data_for_layers[i], base_rgba_colors_for_blending[i]);
                }

                return mapped_colors;
            },
            build: function(layer_number, max_length) {
                "use strict";
                layer_number = (layer_number | 0) >>> 0;
                max_length = (max_length | 0) >>> 0;

                bytes_index_32 = -4;
                state = builder(layer_number, max_length);
                shadow_state = shadow_builder(state, shadow_state);
            },
            update: function(layer_number, max_length) {
                "use strict";
                layer_number = (layer_number | 0) >>> 0;
                max_length = (max_length | 0) >>> 0;

                bytes_index_32 = -4;
                const changed_layer_number = (state.layer_number !== layer_number);
                state = updater(state, layer_number, max_length, builder);
                if(changed_layer_number) { shadow_state = shadow_builder(state, shadow_state); }
            },
            clear: function() {
                "use strict";
                state = updater(state, 1, 1, builder);
            }
        };
    }
};

module.exports = SuperBlend;