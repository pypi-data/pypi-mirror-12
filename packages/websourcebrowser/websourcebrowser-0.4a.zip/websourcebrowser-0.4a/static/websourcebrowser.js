// Copyright (C) 2009-2010, Stefan Schwarzer

// FIXME In IE 7 the code strips one additional character before
// setting the page title in the top pane (or maybe earlier, when
// extracting the URL from the <a> tag). Curiously, everything
// works fine in Firefox 3.6.

WEBSOURCEBROWSER = function() {
    //////////////////////////////////////////////////////////////////////
    // constants - have to be the same as in `config.py`
    var PROJECT_DIR = "project";

    //////////////////////////////////////////////////////////////////////
    // variables
    var wsbLayout;
    var levels = {
        // last successfully used level; "custom" after manual changes
        //  to the tree
        last: undefined,
        // last valid level used in the text entry field
        lastInTextField: undefined,
        // level at which all filesystem items are shown
        max: undefined,
    };

    //////////////////////////////////////////////////////////////////////
    // handlers
    function fetchFile(aElement) {
        // build URL of required HTML snippet
        var newUrl = location.protocol + "//" + location.host +
          "/ajaxfile" + aElement.pathname.substr(PROJECT_DIR.length+1);
        // get file pane content from the server
        // TODO more error handling?
        function callback(data, textStatus, xmlHttpRequest) {
            var pane = $("#file");
            if(textStatus === "success") {
                pane.html(data);
            } else {
                pane.html("Couldn't load content!");
            };
            $("#file").scrollTop(0);
            // re-install handler in just-loaded pane
            $("#file a").click(function(ev) {
                ev.preventDefault();
                fetchFile(this);
            });
        };
        $("#file").load(newUrl, callback);
        // remove leading slash
        var newPath = aElement.pathname.substr(1);
        newPath = decodeURI(newPath);
        // remove leading project directory if present
        if(newPath.indexOf(PROJECT_DIR + "/") === 0) {
            // +1 to remove the slash
            newPath = newPath.substr(PROJECT_DIR.length + 1);
        };
        // use `text`, not `html` because the path string might contain
        //  special characters like <, > and & -> prevent XSS attacks
        $("#top_path").text(newPath);
        // change title; assume we have only one separator " - " between
        //  path and project name
        var oldTitle = $("title").text();
        // as used by the Python code
        var pathProjectSeparator = " - ";
        var newTitle = newPath +
          oldTitle.substr(oldTitle.indexOf(pathProjectSeparator));
        $("title").text(newTitle);
    };

    function toNumber(numberString) {
        return numberString - 0;
    };

    function setNestingLevel(level) {
        // normalize the level "all" to a number, if possible
        if(level === "all" && levels.max !== undefined) {
            level = levels.max;
        };
        // don't act if the level isn't changed
        if(level === levels.last) {
            return;
        };
        // Modify the treeview so that all levels from the top to
        //  level `level` are expanded and the levels "below" that
        //  level are closed.
        // set conditions for opening and closing branches
        if(level === "all") {
            var openingCondition = function(liElement, linkLevel) {
                return $(liElement).hasClass("expandable") === true;
            }
            var closingCondition = function(liElement, linkLevel) {
                return false;
            }
        } else {
            level = toNumber(level);
            var openingCondition = function(liElement, linkLevel) {
                return $(liElement).hasClass("expandable") === true &&
                       linkLevel < level;
            }
            var closingCondition = function(liElement, linkLevel) {
                return $(liElement).hasClass("collapsable") === true &&
                       linkLevel === level;
            }
        };
        // iterate over all nodes (<li> tags) and open/close the nodes
        //  according to the conditions defined above
        var maxLinkLevel = 1;
        $("#directory_tree li.expandable").
          add("#directory_tree li.collapsable").
          each(function (index, liElement) {
            // calculate nesting level for this `li` tag
            var link = $("a:first", liElement).attr("href");
            var numberOfSlashes = link.split("/").length - 1;
            // account for "/project" prefix
            var linkLevel = numberOfSlashes - 1;
            if(level === "all") {
                maxLinkLevel = Math.max(maxLinkLevel, linkLevel);
            }
            // open/close branches depending on following conditions
            var shouldOpen = openingCondition(liElement, linkLevel);
            var shouldClose = closingCondition(liElement, linkLevel);
            var isVisible = $(liElement).is(":visible");
            if((shouldOpen || shouldClose) && isVisible) {
                $("div.hitarea:first", liElement).click();
            }
        });
        // update text field
        if(level === "all") {
            // add 1 to account for the fact that the deepest directory
            //  level is not only shown but opened as well
            level = maxLinkLevel + 1;
            // cache maximum level
            levels.max = level;
        };
        $("#current_level").attr("value", level);
        levels.last = level;
    };

    //////////////////////////////////////////////////////////////////////
    // setup
    function setupLayout() {
        // remove the old styles before setting up new ones
        $("#top").removeClass("top_preset");
        $("#dir").removeClass("dir_preset");
        $("#file").removeClass("file_preset");
        // add classes for JavaScript pane layout
        $("#top").addClass("ui-layout-north");
        $("#dir").addClass("ui-layout-west");
        $("#file").addClass("ui-layout-center");
        // now set up the jQuery-supported layout
        // flexify might be an alternative to do the layout; see
        //  http://tim-ryan.com/projects/flexify/demos/splitter.html
        wsbLayout = $("body").layout({
        });
        wsbLayout.sizePane("west", "30%");
        // add treeview layout
        $("#directory_tree").treeview({
            collapsed: true,
            // needed for `toggle` to work (according to documentation)
            speed: 1,
            toggle: function() {
                levels.last = "custom";
            }
        });
    };

    function setupHandlers() {
        // set up click handler for getting a file from the server
        $("#dir ul a, #file a").click(function(ev) {
            ev.preventDefault();
            fetchFile(this);
        });
        // set up handlers for treeview level control
        $("#level_1").click(function(ev) {
            ev.preventDefault();
            setNestingLevel(1);
        });
        $("#level_minus").click(function(ev) {
            ev.preventDefault();
            var oldLevel = toNumber($("#current_level").attr("value"));
            var newLevel = oldLevel - 1;
            newLevel = Math.max(newLevel, 1);
            setNestingLevel(newLevel);
        });
        $("#current_level").bind("change keypress", function(ev) {
            // if there was a keypress, react only to [Return]
            if(ev.type === "change" ||
               (ev.type === "keypress" && ev.which === 13)) {
                var oldLevel = toNumber($("#current_level").attr("value"));
                var newLevel = Math.max(oldLevel, 1);
                // handle non-numeric entries in text field
                if(!isNaN(newLevel)) {
                    setNestingLevel(newLevel);
                    levels.lastInTextField = newLevel;
                } else {
                    // reset to last valid value
                    $("#current_level").attr("value", levels.lastInTextField);
                }
            }
        });
        $("#level_plus").click(function(ev) {
            ev.preventDefault();
            var oldLevel = toNumber($("#current_level").attr("value"));
            var newLevel = oldLevel + 1;
            newLevel = Math.max(newLevel, 1);
            setNestingLevel(newLevel);
        });
        $("#level_all").click(function(ev) {
            ev.preventDefault();
            setNestingLevel("all");
        });
    };

    setupLayout();
    setupHandlers();
    // let the treeview conform to the current text field value
    $("#current_level").change();
};

$(WEBSOURCEBROWSER);

