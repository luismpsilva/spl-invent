// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

/*********************************************** INIT VIEWS ***********************************************/
function init_inventario() {
    if (!obs_inventario) {
        obs_inventario = new kendo.observable({
            mode: null,
            switchPicagem: function (e) {
                var grid = $("#gridInventario").data("kendoGrid");
                var modeType = $(e.currentTarget).data("mode");
                if (this.mode) {
                    this.set("mode", modeType);
                    grid.hideColumn(3);
                } else {
                    this.set("mode", modeType);
                    grid.showColumn(3);
                }
                $("#gridInventario").data("kendoGrid").refresh();
            },
            gravarPicagem: function () {
                var checkedIDs = [], checked = $("#gridInventario [type='checkbox']:checked"),
                    query = "UPDATE inventario WHERE id IN ";
                for (var i = 0, length = checked.length; i < length; i++) {
                    var id = $(checked[i]).data("id");
                    if (id) checkedIDs.push(id);
                }
                query += "(" + checkedIDs + ")";
                updateFromDb(query,[]);
            }
        });
    }
}
/*********************************************** SHOW VIEWS ***********************************************/
function show_inventario() {
    if (!$("#gridInventario").data("kendoGrid")) {
        $("#gridInventario").kendoGrid({
            mobile: "phone",
            scrollable: true,
            selectable: "row",
            toolbar: ["excel"],
            excel: {
                fileName: "Inventario.xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true
            },
            dataSource: new kendo.data.DataSource({
                pageSize: 20,
                serverPaging: true,
                transport: {
                    read: function (options) {
                        startTransation().then(function (tr) {
                            if (tr) {
                                tr.executeSql("SELECT id,descricao,quantidade,quantidade_picada,foto FROM inventario", [], function (tx, resultSet) {
                                    try {
                                        var data = [];
                                        if (resultSet.rows.length > 0) {
                                            for (var x = 0; x < resultSet.rows.length; x++) {
                                                data.push(new INVENTARIO(resultSet.rows.item(x)));
                                            }
                                        }
                                        options.success(data);
                                    } catch (ex) {
                                        notificacao('Erro ao criar objecto [Grid]: ' + ex.message, 'error', 'Ups...');
                                    }
                                },
                                function (tx, error) {
                                    notificacao('SELECT error: ' + error.message, 'error', 'Ups...');
                                });
                            }
                            else {
                                var d = [{ id: 1, descricao: "Teste 1", quantidade: 1, quantidade_picada: 0, foto: null },
                                { id: 2, descricao: "Teste 2", quantidade: 1, quantidade_picada: 0, foto: null },
                                { id: 3, descricao: "Teste 3", quantidade: 1, quantidade_picada: 0, foto: null }], data = [];
                                data.push(new INVENTARIO(d[0]));
                                data.push(new INVENTARIO(d[1]));
                                data.push(new INVENTARIO(d[2]));
                                options.success(data);
                            }
                        });
                    },
                    schema: {
                        model: {
                            id: "ID",
                            fields: {
                                ID: { nullable: false, editable: false },
                                DESCRICAO: { type: "string", editable: false },
                                QUANTIDADE: { type: "number", editable: true },
                                QUANTIDADE_PICADA: { type: "number", editable: true },
                                TIPO: { type: "string", editable: false },
                            }
                        }
                    },
                },
            }),
            columns: [
                {
                    title: "Foto",
                    template: "<div class='inventario-photo'>" +
                                "<img #if(typeof FOTO != 'undefined' && FOTO && FOTO !='null'){# src='data:image/png;base64,#:FOTO#' #}else{# src='./images/NoImage.png' #}# style='height: 100%; width: 100%; object-fit: contain'/>" +
                              "</div>",
                }, {
                    title: "Descrição",
                    field: "DESCRICAO",
                }, {
                    title: "Qtd.",
                    field: "QUANTIDADE",
                    attributes: { class: "numbers" },
                    width:"70px"
                }/*, {
                    title: " ",
                    template: '<input type="checkbox">',
                    hidden: true,
                    width: "50px"
                }*/, {
                    template: kendo.template($("#gridInventario-command-template").html()),
                    width:"110px"
                }],
            excelExport: function (e) {
                // Prevent the default behavior which will prompt the user to save the generated file.
                e.preventDefault();
                if (!obs_inventario.mode) {
                    Loading(true);
                    // Get the Excel file as a data URL.
                    var dataURL = new kendo.ooxml.Workbook(e.workbook).toDataURL();
                    // Strip the data URL prologue.
                    if (typeof cordova == 'undefined') {
                        kendo.saveAs({
                            dataURI: dataURL,
                            fileName: "Inventario.xlsx"
                        });
                        Loading();
                    } else {
                        if (dataDirectory) {
                            var dfd = new $.Deferred();
                            dataURL = saveAsBlob(dataURL);
                            window.fileStorage.save(dataDirectory, "TEMP", "Inventario.xlsx", dataURL).done(function () {
                                notificacao("Ficheiro gravado.", "success", null, true);
                                dfd.resolve();
                            });
                            dfd.then(function () {
                                window.fileStorage.read_dir(dataDirectory + tempDirectory).done(function (fileEntry) {
                                    if (fileEntry.length > 0) {
                                        var fileURL = fileEntry[0].nativeURL;
                                        //Perguntar se quer mandar e-mail
                                        if (cordova && cordova.plugins && cordova.plugins.email) {
                                            $confirm('Deseja enviar por e-mail?', function (buttonIndex) {
                                                if (buttonIndex == 1) {
                                                    mailAvailable().then(function () {
                                                        openEmail({ attachments: fileURL }).then(function () {
                                                            var ref = cordova.InAppBrowser.open(fileURL, "_system", "location=yes,enableViewportScale=yes,hidden=no");
                                                        })
                                                    });
                                                } else {
                                                    var ref = cordova.InAppBrowser.open(fileURL, "_system", "location=yes,enableViewportScale=yes,hidden=no");
                                                }
                                            }, 'Confirmação', ['Sim', 'Não'], event);
                                        } else {
                                            var ref = cordova.InAppBrowser.open(fileURL, "_system", "location=yes,enableViewportScale=yes,hidden=no");
                                        }
                                    }
                                });
                                Loading();
                            });
                        } else {
                            notificacao("O plugin dos ficheiros não se encontra ativo.", "error", "Ups...");
                            Loading();
                        }
                    }
                }
            },
            change: function (e) {
                if (!obs_inventario.mode) {
                    e.preventDefault();
                    var cell = this.select();
                    $(cell).removeClass("k-state-selected");
                    var dataItem = this.dataItem(cell.closest("tr"));
                    if (dataItem.FOTO != null)
                        showImageHandler(true, { image: dataItem.FOTO, text: dataItem.DESCRICAO })
                }
            },
        });
    } else {
        $("#gridInventario").data("kendoGrid").dataSource.read();
    }
    $("#gridInventario").off("click").on("click", ".k-grid-remover", function (e) {
        if (!obs_inventario.mode) {
            var linhaID = $(e.currentTarget).data("id");
            var dataSource = $("#gridInventario").data("kendoGrid").dataSource;
            $confirm('Deseja remover a linha?', function (buttonIndex) {
                if (buttonIndex == 1) {
                    if (db)
                        removeFromDb("DELETE FROM inventario where id = ?", [linhaID]);

                    dataSource.remove(linhaID);
                    dataSource.read();
                }
            }, 'Confirmação', ['Sim', 'Não'], event);
        }
    });
    kendo.bind($("#view-inventario"), obs_inventario)
}

/*********************************************** OPEN MODALS **********************************************/
function open_ModalInsertArtigo() {
    if (!obs_artigo) {
        var obs_artigo = new kendo.observable({
            hasIMAGEM:false,
            IMAGEM: null,
            DESCRICAO: null,
            QUANTIDADE: 1,
            selectImage: function (e) {
                e.preventDefault();
                if (navigator.camera) {
                    navigator.camera.getPicture(onSuccess, onFail, {
                        quality: 100,
                        destinationType: Camera.DestinationType.DATA_URL,//Experimentar guardar a foto e converter
                        sourceType: navigator.camera.PictureSourceType.CAMERA,
                        //encodingType: Camera.EncodingType.JPEG,
                        allowEdit: false,
                        correctOrientation: true,  //Corrects Android orientation quirks
                        targetWidth: 1024,
                        targetHeight: 1024
                    });

                    function onSuccess(imageData) {
                        try {
                            var image = document.getElementById("img-upload");
                            image.src = "data:image/jpeg;base64," + imageData;
                            obs_artigo.set("IMAGEM", imageData);
                        } catch (ex) {
                            notificacao('Ocorreu um erro ao gravar a foto [onSuccess]: ' + ex.message, 'error', 'Ups...');
                        }

                    }

                    function onFail(message) {
                        if (message.includes("Camera cancelled") || message.includes("Selection cancelled") || message.includes("no image selected")) {
                            console.log("A obtenção de fotos foi cancelada.");
                        }
                        else {
                            notificacao("Ocorreu um erro a gravar a foto [onFail]: " + message, 'error', 'Ups...');
                        }
                    } 
                } else {
                    $("#img-upload").show();
                    $(document).on('change', '.btn-file :file', function () {
                        var input = $(this),
                            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                        input.trigger('fileselect', [label]);
                    });

                    //$('.btn-file :file').on('fileselect', function (event, label) {

                    //    var input = $(this).parents('.input-group').find(':text'),
                    //        log = label;

                    //    if (input.length) {
                    //        input.val(log);
                    //    } else {
                    //        if (log) alert(log);
                    //    }

                    //});
                    function readURL(input) {
                        if (input.files && input.files[0]) {
                            var reader = new FileReader();

                            reader.onload = function (e) {
                                obs_artigo.set("IMAGEM", e.target.result);
                                $('#img-upload').attr('src', e.target.result);
                            }

                            reader.readAsDataURL(input.files[0]);
                        }
                    }

                    $("#imgInp").change(function () {
                        readURL(this);
                    });
                }
            },
            gravarArtigo: function () {
                var validator = $("#artigo-validator").kendoValidator().data("kendoValidator");
                if (validator.validate()) {
                    Loading(true);
                    //Gravar
                    if (db) {
                        db.transaction(function (tx) {
                            var query = "INSERT INTO inventario (descricao, quantidade, foto) VALUES ('" + obs_artigo.get("DESCRICAO") + "','" + obs_artigo.get("QUANTIDADE") + "','" + obs_artigo.get("IMAGEM") + "')";
                            tx.executeSql(query, [], function (tx, res) {
                                notificacao("Inserido com sucesso.", "success", null, true);
                                obs_artigo.reset();
                                Loading();
                            },
                            function (tx, error) {
                                notificacao("Erro ao inserir [gravarArtigo]: " + error.message, "error", 'Ups...');
                                Loading();
                            });
                        }, function (error) {
                            notificacao("Erro de transaction [gravarArtigo]: " + error.message, "error", 'Ups...');
                            Loading();
                        }, function () {
                            console.log('Transaction Ok [gravarArtigo]');
                            Loading();
                        });
                    } else {
                        notificacao("Inserido com sucesso.", "success", null, true);
                        obs_artigo.reset();
                        Loading();
                    }
                    $("#modalview-insert-artigo [data-role='content']").data("kendoMobileScroller").reset();
                }
            },
            clearImage: function () {
                this.set("IMAGEM", null);
                $("#img-upload").attr("src",'');
            },
            reset: function () {
                this.set("IMAGEM", null);
                this.set("DESCRICAO", null);
                this.set("QUANTIDADE", 1);
                $("#img-upload").attr("src", '');
                $("#descArtigo").focus();
            }
        });
    } else {
        obs_artigo.reset();
    }
    kendo.bind($("#modalview-insert-artigo"), obs_artigo);
    obs_artigo.bind("change", function (e) {
        switch (e.field) {
            case "IMAGEM":
                this.set("hasIMAGEM", (this.get("IMAGEM")) ? true : false);
        }
    });
    $("#descArtigo").focus();
    $("#qtdArtigo").TouchSpin({ min: 1, step: 1, maxboostedstep: false, });
}
/********************************************** CLOSE MODALS **********************************************/
function close_ModalInsertArtigo() {
    $("#gridInventario").data("kendoGrid").dataSource.read();
}