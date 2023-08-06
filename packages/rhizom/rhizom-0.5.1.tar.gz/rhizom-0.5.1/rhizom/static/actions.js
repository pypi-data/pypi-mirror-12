/*
 * Rhizom - Relationship grapher
 *
 * Copyright (C) 2015  Aurelien Bompard <aurelien@bompard.org>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/



$(function() {
    $(".autoclose").delay(3000)
        .fadeOut("slow", function() { $(this).remove(); });

    $(".form-table").each(function() { form_table_setup($(this)); });

    // http://getbootstrap.com/javascript/#tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // http://getbootstrap.com/javascript/#popovers
    $('[data-toggle="popover"]').popover().filter("a").click(function(e) { e.preventDefault(); });

    $('form.with-loading-button').submit(function() {
        $(this).find("button[data-loading-text]").button("loading");
    });

    /*
    $(".loadable").each(function() {
        $(this).load($(this).attr("data-load-from"), function() {
            $(this).removeClass("loadable");
        });
    });
    */

    // BrowserID
    $(".signin").click(function(e) {
        e.preventDefault();
        navigator.id.request();
    });
    $(".signout").click(function(e) {
        e.preventDefault();
        navigator.id.logout();
    });

});



/*
 * Forms
 */
function form_table_setup(elem) {
    elem.find("button[type!='submit']").click(form_table_click);
}
function form_table_click(e) {
    e.preventDefault();
    var button = $(this),
        form = $(this).parents("form").first(),
        data = form.serialize();
    if (button.attr("data-confirm")) {
        var response = confirm(button.attr("data-confirm"));
        if (!response) return;
    }
    button.button("loading");
    jQuery.ajax({
        type: button.val(),
        url: form.attr("action"),
        data: data,
        dataType: "json",
        success: function(result) {
            form.trigger("ajaxsubmit.success", result); // The form may be deleted below, trigger now
            if (result.action == "add") {
                form.get(0).reset();
                var new_content = $(result.content);
                new_content.hide().insertAfter(form).slideDown();
                form_table_setup(new_content);
            } else if (result.action == "replace") {
                var new_content = $(result.content);
                form.replaceWith(new_content);
                form_table_setup(new_content);
            } else if (result.action == "delete") {
                form.fadeOut("slow", function() { $(this).remove(); });
            } else if (result.action == "replace-table") {
                // replace the whole table
                var new_content = $(result.content);
                form.parents(".form-table").first().replaceWith(new_content);
                form_table_setup(new_content);
            }
            if (result.message) {
                var alert_type;
                if (result.status == "OK") {
                    alert_type = "success";
                } else if (result.status == "error") {
                    alert_type = "warning";
                }
                make_alert(alert_type, result.message);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (textStatus == "error") {
                make_alert("danger", errorThrown);
            }
            form.get(0).reset();
        },
        complete: function(jqXHR, textStatus) {
            button.button("reset");
        }
    });
}


function setup_autocomplete(field, existing) {
    field.typeahead({
        minLength: 3, highlight: true
    }, {
        name: 'persons',
        source: function(query, cb) {
            var suggestions = [];
            existing.forEach(function(name) {
                if (name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                    suggestions.push({value: name});
                }
            });
            cb(suggestions);
        }
    });
}


function make_alert(type, message) {
    var elem = $(
        '<div class="flashmessage">'
       +'<div class="alert alert-dismissible" role="alert">'
       +'<button type="button" class="close" data-dismiss="alert">'
       +'<span aria-hidden="true">&times;</span>'
       +'<span class="sr-only">Close</span></button>'
       + message + '</div></div>');
    elem.find(".alert").addClass("alert-"+type);
    if (type === "success") {
        elem.addClass("autoclose").delay(3000)
            .fadeOut("slow", function() { $(this).remove(); });
    }
    elem.prependTo(".flashmessages");
}



function setToggle(button, state) {
    var input = button.find("input");
    input.prop('checked', state);
    if (state && !button.hasClass("active")) {
        button.addClass("active");
        input.trigger("change");
    } else if (!state && button.hasClass("active")) {
        button.removeClass("active");
        input.trigger("change");
    }
}


/*
 * BrowserID
 */

navigator.id.watch({
    loggedInUser: currentUser,
    onlogin: function(assertion) {
        // Un utilisateur est connecté ! Voici ce qu'il faut faire :
        // 1. Envoyer l'assertion à votre backend pour vérification et pour créer la session.
        // 2. Mettre à jour l'interface utilisateur.
        $.ajax({
            type: 'POST',
            url: loginUrl,
            data: {assertion: assertion, csrf_token: csrf_token},
            success: function(res, status, xhr) { window.location = res; },
            error: function(xhr, status, err) {
                navigator.id.logout();
                //alert("Login failure: " + err);
            }
        });
    },
    onlogout: function() {
        // Un utilisateur s'est déconnecté ! Voici ce qu'il faut faire :
        // Détruire la session de l'utilisateur en redirigeant l'utilisateur ou en appelant votre backend.
        // Assurez vous aussi de réinitialiser loggedInUser à null sur la prochain fois où la page sera chargée
        // (Pas false, ni 0 ou undefined. null)
        $.ajax({
            type: 'POST',
            url: logoutUrl,
            data: {csrf_token: csrf_token},
            success: function(res, status, xhr) { window.location = res; },
            error: function(xhr, status, err) { alert("Logout failure: " + err); }
        });
    }
});

