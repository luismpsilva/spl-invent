/********************************************* GLOBAL VARIABLES *********************************************/
var app = null, db = null, jsconfirm = null, dataDirectory = null, tempDirectory = "Temp";
/******************************************** GLOBAL OBSERVABELS ********************************************/
var obs_inventario = null;
/******************************************* NOTIFICATION DIALOGS *******************************************/
function notificacao(mensagem, tipo, title, autoClose, confirm) {
    if (!autoClose) {
        var type = null;
        var $title = 'Erro';
        var $icon = 'fa fa-warning';

        if (tipo && tipo == "error") {
            type = "error";
            console.log(mensagem);
        }
        else {
            type = "info";
            $title = 'Informação';
            $icon = 'fa fa-info-circle';
        }

        if (title) {
            $title = title;
        }

        if (navigator && navigator.notification) {
            mensagem = mensagem.replace(/<br>/g, '\n').replace(/<br\/>/g, '\n').replace(/<br \/>/g, '\n');
            navigator.notification.alert(mensagem, function () { }, $title);
        }
        else {
            $.confirm({
                title: $title,
                content: mensagem,
                backgroundDismiss: false,
                icon: $icon,
                theme: 'hololight',
                titleClass: 'app-bottom-line',
                autoClose: autoClose ? 'confirm|3000' : null,
                buttons: {
                    Ok: {
                        btnClass: 'app-bottom-line confirm-button-noborder btn-default-width100',
                        text: 'Ok',
                        action: confirm
                    }
                },
            });
        }
    } else {
        if (!$(document).data("kendoNotification")) {
            $(document).kendoNotification({
                stacking: "up",
                autoHideAfter: 5000,
                animation: {
                    open: {
                        effects: "slideIn:left"
                    },
                    close: {
                        effects: "slideIn:left",
                        reverse: true
                    }
                },
                position: {
                    pinned: true,
                    top: 10,
                    right: 10
                },
                templates: [{
                    type: "warning",
                    template: "<div class='k-notification-wrap' style='box-shadow: 0 0 15px rgb(250, 189, 33)'><i class='fa fa-exclamation-triangle' aria-hidden='true' style='margin-right:5px'></i>#= mensagem #</div>"
                }, {
                    type: "info",
                    template: "<div class='k-notification-wrap' style='box-shadow: 0 0 15px rgb(0, 124, 192)'><i class='fa fa-info-circle' aria-hidden='true' style='margin-right:5px'></i>#= mensagem #</div>"
                }, {
                    type: "error",
                    template: "<div class='k-notification-wrap' style='box-shadow: 0 0 15px rgb(255, 113, 113)'><i class='fa fa-times-circle-o' aria-hidden='true' style='margin-right:5px'></i>#= mensagem #</div>"
                }, {
                    type: "success",
                    template: "<div class='k-notification-wrap' style='box-shadow: 0 0 15px rgb(17, 167, 81)'><i class='fa fa-check-circle-o' aria-hidden='true' style='margin-right:5px'></i>#= mensagem #</div>"
                }
                ]
            }).data("kendoNotification").show({ mensagem: mensagem }, tipo);
        } else {
            $(document).data("kendoNotification").show({ mensagem: mensagem }, tipo);
        }
    }
}
function $confirm(message, confirmCallback, title, buttonLabels, event, closeIcon) {
    var useNative = typeof nativeDialogs != 'undefined' && nativeDialogs,
        isNavigator = typeof navigator != 'undefined';

    if (isNavigator && useNative && navigator.notification) {
        navigator.notification.confirm(message, confirmCallback, title, buttonLabels);
    }
    else {
        var confirmButton = buttonLabels != undefined ? buttonLabels[0] : ['OK'];
        var cancelButton = (buttonLabels != undefined && buttonLabels.length > 1) ? buttonLabels[1] : false;

        var confirmButtonText = buttonLabels != undefined ? buttonLabels[0].toLowerCase() : 'ok';
        var cancelButtonText = (buttonLabels != undefined && buttonLabels.length > 1) ? buttonLabels[1].toLowerCase() : 'fechar';

        if (jsconfirm && jsconfirm.$content && jsconfirm.$content.html() === message) {
            return;
        }

        jsconfirm = $.confirm({
            closeIcon: closeIcon,
            closeIconClass: 'fa fa-times-circle-o confirm-close-icon',
            //columnClass: 'col-md-7 col-md-offset-2',
            title: title,
            content: message,
            backgroundDismiss: false,
            icon: "fa fa-question-circle",
            theme: 'hololight',
            titleClass: 'app-bottom-line',
            buttons: {
                confirm: {
                    btnClass: 'app-bottom-line confirm-button-noborder',
                    text: confirmButton,
                    action: function () {
                        jsconfirm = null;
                        if (confirmCallback) {
                            confirmCallback.call(this, 1);
                        }
                    }
                },
                cancel: {
                    btnClass: 'app-bottom-line confirm-button-noborder',
                    text: cancelButtonText,
                    action: function () {
                        jsconfirm = null;
                        if (confirmCallback) {
                            confirmCallback.call(this, 2);
                        }
                    }
                }
            }
        });

        if (typeof SpeechRecognition != 'undefined') {
            if (!recognition) {
                recognition = new SpeechRecognition();
            }

            recognition.onresult = function (event) {
                if (event.results.length > 0) {
                    if (event.results[0][0].transcript == confirmButtonText) {
                        if (confirmCallback) {
                            confirmCallback.call(this, 1);
                        }
                    }
                    else {
                        if (event.results[0][0].transcript == cancelButtonText || event.results[0][0].transcript == 'fechar') {
                            if (confirmCallback) {
                                confirmCallback.call(this, 2);
                            }
                        }
                    }
                }
            }
        }
    }
}
/****************************************** MODAL GENERIC FUNCTIONS *****************************************/
function closeModalView(args, viewname) {
    if (args) {
        if (args.button) {
            var data = args.button.data();
            viewname = data.viewname;
        }
        else {
            if (args.sender && args.sender.element) {
                var data = args.sender.element.data();
                viewname = data.viewname;
            }
            else {
                if (args.currentTarget) {
                    var data = $(args.currentTarget).data();
                    viewname = data.viewname;
                }
            }
        }
    }
    if (viewname && viewname !== '' && viewname.indexOf('#') < 0) {
        viewname = '#' + viewname;
    }

    if (viewname && $(viewname).length > 0) {
        if ($(viewname).data('kendoMobileModalView')) {
            $(viewname).data('kendoMobileModalView').close();
        }

        if ($(viewname).data('modalview')) {
            var modalview = $('#' + $(viewname).data('modalview'));
            if (modalview.data('kendoMobileModalView')) {// initialized
                modalview.kendoMobileModalView("open");
            }
        }
    }
}
/********************************************* LOADER FUNCTIONS *********************************************/
function Loading(show) {
    if (show)
        kendo.mobile.application.showLoading();
    else
        kendo.mobile.application.hideLoading();
}
/*********************************************** DB OPERATIONS **********************************************/
function startTransation() {
    return $.Deferred(function () {
        var that = this;
        if (db) {
            db.transaction(function (tr) {
                that.resolve(tr);
            }, function (error) {
                notificacao('Transaction error: ' + error.message, 'error', 'Ups...');
            }, function () {
                console.log('Transaction Ok');
            });
        } else {
            that.resolve();
        }
    });
}
function removeFromDb(query, fields) {
    if (db) {
        startTransation().then(function (tr) {
            tr.executeSql(query, fields, function (tx, res) {
                notificacao("Removido com sucesso " + res.rowsAffected + " registo(s).", "success", null, true);
            },
            function (tx, error) {
                notificacao("DELETE error: [removeFromDb]: " + error.message, "error", 'Ups...');
            });
        });
    }
}
function updateFromDb(query, fields) {
    startTransation().then(function (tr) {
        if (tr) {
            tr.executeSql(query, fields, function (tx, res) {
                console.log("insertId: " + res.insertId);
                notificacao(res.rowsAffected + " Registos actualizado(s) com sucesso!", "success", null, true);
            },
            function (tx, error) {
                notificacao('UPDATE error: [updateFromDb] ' + error.message, "error", 'Ups...');
            });
        }
    });
}
function Count(tr, table) {
    return $.Deferred(function () {
        var that = this;
        tr.executeSql("SELECT count(*) AS mycount FROM " + table, [], function (tx, rs) {
            that.resolve(rs.rows.item(0).mycount);
        }, function (tx, error) {
            notificacao('COUNT error: ' + error.message, 'error', 'Ups...');
        });
    });
}
function closeDB() {
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
}
/********************************************** OBJECT CLASSES **********************************************/
function INVENTARIO(data) {
    this.ID = data.id;
    this.DESCRICAO = data.descricao;
    this.TIPO = data.tipo;
    this.QUANTIDADE = data.quantidade;
    this.QUANTIDADE_PICADA = data.quantidade_picada;
    this.FOTO = data.foto;
    //return this;
}
/******************************************* EMAIL FUNCTIONS *******************************************/
function openEmail(data) {
    return $.Deferred(function () {
        var that = this;
        if (data) {
            cordova.plugins.email.open({
                to: data.to ? data.to : null, //Array - email addresses for TO field
                cc: data.cc ? data.cc : null, //Array - email addresses for CC field
                bcc: data.bcc ? data.bcc : null, //Array - email addresses for BCC field
                attachments: data.attachments ? data.attachments : null, //Array - file paths or base64 data streams
                subject: data.subject ? data.subject : null, //String - subject of the email
                body: data.body ? data.body : null, //String email body (for HTML, set isHtml to true)
                isHtml: data.isHtml ? true : null, //Boolean - indicats if the body is HTML or plain text
            }, function (a, b, c) {
                console.log(a);
                that.resolve();
            });
        } else {
            cordova.plugins.email.open({},
                function (a, b, c) {
                    console.log(a);
                    that.resolve();
                });
        }
    });
}
function mailAvailable() {
    return $.Deferred(function () {
        var that = this;
        cordova.plugins.email.isAvailable(function (hasAccount) {
            if (hasAccount) {
                that.resolve();
            } else {
                notificacao("Não tem conta de E-Mail configurada.", "error", "Ups...");
            }
        });
    });
}
/******************************************* APP GLOBAL FUNCTIONS *******************************************/
function exitFromApp() {
    if (navigator && navigator.app)
        navigator.app.exitApp();
}
function saveAsBlob(dataURI) {
    var blob = dataURI; // could be a Blob object
    if (typeof dataURI == "string") {
        var parts = dataURI.split(";base64,");
        var contentType = parts[0];
        var base64 = atob(parts[1]);
        var array = new Uint8Array(base64.length);

        for (var idx = 0; idx < base64.length; idx++) {
            array[idx] = base64.charCodeAt(idx);
        }
        blob = new Blob([array.buffer], { type: contentType });
    }

    return blob;
}
function showImageHandler(open, data) {
    if (open) {
        $("#my-overlay p").text(data.text);
        $("#my-overlay").removeClass("hidden").css("background-image", "url(data:image/jpeg;base64," + data.image + ")");
    } else {
        $("#my-overlay p").text(null);
        $("#my-overlay").css("background-image", '').addClass("hidden");
    }
}
function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}