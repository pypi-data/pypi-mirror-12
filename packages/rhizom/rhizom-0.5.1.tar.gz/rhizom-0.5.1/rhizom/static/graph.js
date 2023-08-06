function Graph(options) {
    var obj = {

        width: 700,
        height: 700,
        target_el: null,
        data_url: null,
        force: null,
        svg: null,
        link: [],
        node: [],
        center_index: null,
        btn_anonymous: null,
        anonymous: false,
        dispatcher: d3.dispatch("update"),
        final_friction: 0.8,


        init: function(options) {
            this.target_el = d3.select(options.target);
            this.data_url = options.url;
            this.btn_anonymous = $(options.btn_anonymous);
            this.setup_area();
        },


        setup_area: function() {
            var topsvg, zoom,
                self = this,
                height = $(window).height() * 0.75;
            // Adapt to the screen height
            $(this.target_el.node()).css("height", height+"px");
            // Anonymous button
            this.btn_anonymous.find("input").change(function() {
                self.onAbbrevChange(this.checked);
            });
            this.force = d3.layout.force()
                .linkDistance(70)
                //.linkStrength(function(d) { return d.siblings ? 1 / d.siblings : 1; })
                //.charge(function(d, i) { return i === this.center_index ? -1500 : -600; })
                .charge(-600)
                //.chargeDistance(300)
                .gravity(0.08)
                //.friction(0.8)
                .friction(0) // Will increase to final_friction on each tick
                .on("tick", this.tick.bind(this));
            this.target_el.selectAll("svg").remove();
            zoom = d3.behavior.zoom().on("zoom", this.rescale.bind(this));
            topsvg = this.target_el.append("svg:svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .call(zoom)
                .on("dblclick.zoom", function() {
                    zoom.translate([0,0]).scale(1).event(d3.select(this));
                });
            this.svg = topsvg.append("svg:g")
                .attr("width", "100%")
                .attr("height", "100%")

            this.link = this.svg.selectAll(".link");
            this.node = this.svg.selectAll(".node");

            // Compute the width
            //this.width = this.target_el.property("offsetWidth") - 2; // border
            this.width = this.target_el.property("offsetWidth");
            this.height = this.target_el.property("offsetHeight");
            this.force.size([this.width, this.height]);
        },


        load: function() {
            var self = this;
            d3.json(this.data_url, function(error, json) {
                self.force
                    .nodes(json.nodes)
                    .links(json.links);
                self.center_index = json.center;
                self.anonymous = json.anonymous;
                self.redraw();
            });
        },


        // Find and position the center node
        position_center: function() {
            var allNodes = this.force.nodes(),
                first_circle = [],
                distance_step = 100,
                slice_angle,
                center_node;

            if (this.center_index === null) {
                // No fixed center, find the node with the lowest id and use it as the center
                for (var i=0, l=allNodes.length; i < l; i++) {
                    var d = allNodes[i];
                    if (!center_node || d.id < center_node.id) {
                        center_node = d;
                        this.center_index = i;
                    }
                }
            } else {
                // There's a center already
                center_node = allNodes[this.center_index];
            }
            if (center_node.center || typeof center_node.x === "undefined" &&
                                      typeof center_node.y === "undefined") {
                center_node.x = this.width / 2;
                center_node.y = this.height / 2;
            }
        },


        // Compute node placement
        position_nodes: function(nodes) {
            var self = this,
                first_circle = [],
                distance_step = 100,
                slice_angle;

            // First circle
            first_circle = nodes.filter(function(d, i) { return d.circle === 1; });
            if (!first_circle.empty()) { // empty if no center is set
                slice_angle = 2 * Math.PI / first_circle.size();
                function set_coords(data, branchid, randomize) {
                    data.x = Math.cos(branchid * slice_angle) * distance_step * data.circle + self.width / 2;
                    data.y = Math.sin(branchid * slice_angle) * distance_step * data.circle + self.height / 2;
                    if (randomize) {
                        data.x += Math.random() * 100 - 50;
                        data.y += Math.random() * 100 - 50;
                    }
                    if (data.x < 0) { data.x = 0; }
                    if (data.x > self.width) { data.x = self.width; }
                    if (data.y < 0) { data.y = 0; }
                    if (data.y > self.height) { data.x = self.height; }
                }
                first_circle.each(function(d, i) {
                    if (typeof d.x !== "undefined" || typeof d.y !== "undefined") {
                        // Existing node: it already has coordinates
                        return;
                    }
                    set_coords(d, i, false);
                    nodes.each(function(node_d, node_i) {
                        if (node_d.circle < 2) { return; }
                        if (node_d.branch === d.name) {
                            set_coords(node_d, i, true);
                        }
                    });
                });
            }
        },


        redraw: function() {
            var self = this,
                current_positions = {};

            this.position_center();

            // Start the force layout here first. This must be done now, even
            // if there are no nodes or links yet, before the node and links
            // update below to ensure that references to nodes (by index) in
            // the links array are resolved. We use it to identify links.
            //this.force.start();

            // Store current positions
            this.node.each(function(d, i) { current_positions[d.id] = {x: d.x, y: d.y}; });

            // Bind the new data
            this.node = this.node.data(this.force.nodes(), function(d) { return d.id.toString(); });

            // For updated nodes, restore the current position in the data set
            this.node.each(function(d, i) {
                d.x = current_positions[d.id].x;
                d.y = current_positions[d.id].y;
            });

            // Remove old nodes
            this.node.exit().remove();

            // Create new nodes
            var nodeEnter = this.node.enter().append("g")
                .attr("class", function(d) {
                    var cls = "node";
                    if (typeof d.circle !== 'undefined') {
                        cls += " circle-" + d.circle;
                    }
                    return cls;
                }).call(this.position_nodes.bind(this))
                .attr("transform", function(d) {
                    if (!d.x && !d.y) { return; }
                    return "translate(" + d.x + "," + d.y + ")";
                });
            // circle
            nodeEnter.append("circle")
                .attr("r", function(d) { return d.size || 10; });
            // text
            nodeEnter.append("text")
                .attr("dy", ".35em")
                .text(function(d) { return d.name; })
                .attr("class", function(d, i) {
                    if (typeof d.circle !== 'undefined' && d.circle < 2) {
                        return "";
                    } else {
                        return "full";
                    }
                });
            // abbrev
            nodeEnter.each(function(d, i) {
                if (typeof d.circle !== 'undefined' && d.circle < 2) { return; }
                d3.select(this).append("text")
                    .attr("dy", ".35em")
                    .text(function(d) { return d.name.charAt(0); })
                    .attr("class", "abbrev");
            });
            // text background
            nodeEnter.each(function(d, i) {
                //var bbox = this.getElementsByTagName("text")[0].getBBox();
                var rect = d3.select(this).insert("rect", "circle"),
                    bbox;
                if (typeof d.circle !== 'undefined' && d.circle < 2) {
                    bbox = this.getElementsByTagName("text")[0].getBBox();
                    rect.attr("x", bbox.x)
                        .attr("y", bbox.y)
                        .attr("width", bbox.width)
                        .attr("height", bbox.height);
                }
            });
            // node is draggable except if fixed
            nodeEnter.filter(function(d) { return (! d.fixed); })
                .call(this.force.drag)
                .on("mousedown", function() { d3.event.stopPropagation(); });

            // Update links.
            //this.link = this.link.data(this.force.links(),
            //    function(d) { return d.source.id+"|"+d.target.id+"|"+d.css; });
            //this.link = this.link.data(this.force.links(),
            //    function(d) { return d.source+"|"+d.target+"|"+d.css; });
            var nodes = this.force.nodes();
            this.link = this.link.data(this.force.links(), function(d) {
                var s = d.source, t = d.target;
                s = typeof s === "number" ? nodes[s].id : s.id;
                t = typeof t === "number" ? nodes[t].id : t.id;
                return s+"|"+t+"|"+d.css;
            });
            this.link.exit().remove();
            this.link.enter().insert("path", ".node");
            this.link.attr("class", function(d) { // acts on new & updated
                var css = "link";
                if (d.css) { css += " " + d.css; }
                if (d.dotted) { css += " dotted"; }
                return css;
             });

            // anonymous status
            this.setAbbrev(this.anonymous);
            // run the callback for the change event in case the button state
            // did not change
            this.onAbbrevChange(this.anonymous);

            // Start or restart the simulation
            this.force.start();
            this.dispatcher.update();

            // done!
            this.target_el.select(".ajaxloader").remove();
        },


        rescale: function() {
            var trans = d3.event.translate,
                scale = d3.event.scale;
            this.svg.attr("transform",
                "translate(" + trans + ")"
                + " scale(" + scale + ")");
        },

        onSlide: function() {
            var cur_width = this.target_el.property("offsetWidth"),
                translation = (cur_width - this.width) / 2;
            this.svg.attr("transform", "translate(" + translation + ")");
        },


        // On each iteration (tick)
        tick: function() {
            var self = this;
            // Raise the friction to its final value
            var friction = this.force.friction();
            if (Math.round(friction*10) < this.final_friction*10) {
                this.force.friction(friction + (this.final_friction - friction) / 2);
                this.force.friction(friction + 0.2);
            }
            // Move links
            this.link.attr("d", function(d) {
                var radius = 0, sweep = 0;
                if (d.siblings > 1) {
                    radius = (self.force.linkDistance() * 2) / (Math.floor(d.sibling_id / 2) + 1);
                    sweep = d.sibling_id % 2;
                }
                return "M"+d.source.x+","+d.source.y+" A"+radius+","+radius+" 0 0,"+sweep+" "+d.target.x+","+d.target.y;
            });
            // Move nodes
            this.node.attr("transform",
                function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        },


        on: function(eventName, listener) {
            this.dispatcher.on(eventName, listener);
        },


        setAbbrev: function(state) {
            setToggle(this.btn_anonymous, state);
        },

        onAbbrevChange: function(checked) {
            this.node.each(function(d, i) {
                if (typeof d.circle !== 'undefined' && d.circle < 2 ) return;
                var textfull = d3.select(this.getElementsByTagName("text")[0]),
                    textabbrev = d3.select(this.getElementsByTagName("text")[1]),
                    bg = d3.select(this.getElementsByTagName("rect")[0]),
                    bbox;
                if (checked) {
                    textfull.style("display", "none");
                    textabbrev.style("display", "block");
                    bg.attr("width", 0).attr("height", 0);
                } else {
                    textabbrev.style("display", "none");
                    textfull.style("display", "block");
                    bbox = textfull[0][0].getBBox();
                    bg.attr("x", bbox.x)
                      .attr("y", bbox.y)
                      .attr("width", bbox.width)
                      .attr("height", bbox.height);
                }
            });
        },


        toggleLink: function(css, active) {
            this.link.each(function(d, i) {
                if (d.css != css ) return;
                var elem = d3.select(this);
                if (active) {
                    elem.style("opacity", "1");
                } else {
                    elem.style("opacity", "0");
                }
            });
        },


        setLinkDistance: function(distance) {
            this.force.linkDistance(distance);
            //var newstrength = 1 / (Math.log(distance) / Math.log(30));
            var newstrength = Math.min(1, 70 / distance);
            this.force.linkStrength(newstrength);
            this.force.start();
        },


        getPersonNames: function() {
            var result = []
            this.node.each(function(data, i) {
                result.push(data.name);
            });
            return result;
        },


        toString: function() {
            //console.log(this.target_el);
            //console.log(this.target_el.html());
            //var svg_content = this.target_el.select("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").node().parentNode.innerHTML;
            //console.log(svg_content);
            return this.target_el.select("svg")
                .attr("version", "1.1")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .node().parentNode.innerHTML;
        },


        stop: function() {
            this.force.stop();
        },
        resume: function() {
            this.force.resume();
        }

    };
    obj.init(options);
    return obj;
}


function GraphEditor(options) {
    var obj = {

        graph: null,
        panel: null,
        btn_toggle: null,
        active: false,
        opened_on: null,

        init: function(options) {
            var self = this;
            this.graph = options.graph;
            this.panel = $(options.panel);
            this.btn_toggle = $(options.btn_toggle);
            this.graph.on("update.editor", function() {
                self.on_graph_update();
            });
            this.panel.on("ajaxsubmit.success", "form", function(result) {
                self.on_change(result);
            });
            this.btn_toggle.find("input").change(function() {
                self.toggle(this.checked);
            });
            this.panel.find(".edit-panel-close").click(function(e) {
                e.preventDefault();
                setToggle(self.btn_toggle, false);
            });
        },

        toggle: function(state) {
            var self = this,
                graph_el = $(this.graph.target_el.node()),
                panel_margin = (this.graph.width / 2) + 2,
                graph_width = this.graph.width / 2;
            //this.panel.toggle();
            //this.panel.animate({"margin-left": "0"}, "slow");
            if (state) {
                var url = this.panel.find(".edit-panel-form").attr("data-base-url");
                this.load_from(url);
                this.panel.css({"margin-left": "-" + panel_margin + "px",
                                "width": graph_width,
                                "height": this.graph.height});
                graph_el.css({"width": this.graph.width, "float": "left"});
                graph_el.animate({"width": graph_width + "px"}, {
                    progress: function() {
                        self.graph.onSlide();
                    }
                });
                this.panel.animate({"margin-left": "0px"});
                //this.graph.stop();
                this.graph.setAbbrev(false);
                //this.graph.setAbbrev(false);
            } else {
                this.panel.animate({"margin-left": "-" + panel_margin + "px"});
                graph_el.animate({"width": this.graph.width + "px"}, {
                    progress: function() {
                        self.graph.onSlide();
                    }
                });
                graph_el.css("float", "none");
                //this.graph.resume();
            }
            this.active = state;
        },

        load_from: function(url) {
            var self = this;
            var ajaxloader = this.panel.find(".ajaxloader");
            ajaxloader.show();
            this.panel.find(".edit-panel-form").load(url, function() {
                $(this).find(".rel-add").add(".form-table").each(function() {
                    form_table_setup($(this));
                });
                ajaxloader.hide();
            });
        },

        on_graph_update: function() {
            var self = this;
            if (this.active) {
                // this.graph.setAbbrev(false);
                this.graph.setAbbrev(false);
            }
            this.graph.target_el.select("svg").on("click.editor", function() {
                self.on_graph_click();
            });
            this.graph.node.each(function(data, i) {
                d3.select(this).on("click.editor", function() {
                    self.on_person_click(this, data);
                });
            });
            // Check that the panel is open on an existing object, otherwise reset it.
            if (this.opened_on !== null) {
                var existing = this.graph.force.nodes().filter(
                    function(d) { return d.id === self.opened_on; })
                if (existing.length === 0) { this.on_graph_click(); }
            }
        },

        on_graph_click: function() {
            if (!this.active) return;
            if (this.opened_on === null) return; // already there
            var url = this.panel.find(".edit-panel-form").attr("data-base-url");
            this.opened_on = null;
            this.load_from(url);
        },

        on_person_click: function(elem, data) {
            if (!this.active) return;
            d3.event.stopPropagation();
            this.opened_on = data.id;
            this.load_from(data.edit_url);
        },

        on_change: function(result) {
            this.graph.load();
        }
    };
    obj.init(options);
    return obj;
}


function setup_graph_page(dataurl) {
    var graph = Graph({
        target: "#graph",
        url: dataurl,
        btn_anonymous: "#btn-anonymous"
    });
    graph.load();
    $("#btn-stop").click(function() { graph.stop(); });
    $("#legend ul li a").click(function(e) {
        e.preventDefault();
        var css = $(this).attr("data-rtype"),
            span = $(this).find("span"),
            active = span.css("opacity") == "1";
        if (active) {
            span.css({"opacity": "0.3", "border": "1px solid black"});
            active = false;
        } else {
            span.css({"opacity": "1", "border": "none"});
            active = true;
        }
        graph.toggleLink(css, active);
    });
    $("#linkdistance").slider({
        min: 30, max: 260, step: 10,
        animate: "fast",
        value: graph.force.linkDistance(),
        change: function(e, ui) { graph.setLinkDistance(ui.value); }
    });
    $("#export-svg").submit(function() {
        $(this).find("input[name='svg']").val(
            graph.toString()
            );
    });
    return graph;
}

function setup_editor_page(graph) {
    var editor = GraphEditor({
        graph: graph,
        panel: ".edit-panel",
        btn_toggle: "#btn-edit-mode"
    });
}
