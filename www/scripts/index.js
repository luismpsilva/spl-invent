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
                var grid = $("#gridInventario").data("kendoGrid"), data = grid.dataSource.data(),bl;
                for (var i = 0, length = data.length; i < length; i++) {
                    if (!data[i].QUANTIDADE_PICADA) {
                        bl = true;
                        break;
                    }
                }
                if (data.length > 0 && bl) {
                    this.set("mode", $(e.currentTarget).data("mode"));
                    grid.refresh();
                } else {
                    notificacao("Todos os artigos já foram conferidos ou não existem artigos.", "info", null, true);
                }
            },
            gravarPicagem: function () {
                var checked = $("#gridInventario [type='checkbox']:checked"), queryArray = [];
                    //query = "UPDATE inventario WHERE id IN ";
                for (var i = 0, length = checked.length; i < length; i++) {
                    var id = $(checked[i]).data("id"), qtd = $(checked[i]).data("qtd");
                    if (id) 
                        queryArray.push({
                            query:"UPDATE inventario set quantidade_picada = ? WHERE id = ?",
                            fields: [qtd,id]
                        })
                }
                updateFromDb(null, null, queryArray).then(function () {
                    $("#gridInventario").data("kendoGrid").dataSource.read();
                    obs_inventario.set("mode", false);
                });
            }
        });
    }
}
/*********************************************** SHOW VIEWS ***********************************************/
function show_inventario() {
    if (!$("#gridInventario").data("kendoGrid")) {
        $("#gridInventario").kendoGrid({
            mobile: "phone",
            height:"100%",
            scrollable: true,
            selectable: "cell",
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
                                tr.executeSql("SELECT id,descricao,id_tipo,tipo,quantidade,quantidade_picada,foto FROM inventario", [], function (tx, resultSet) {
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
                                var d = [{ id: 1, descricao: "Teste 1", tipo: "Tipo 1", quantidade: 3, quantidade_picada: 0, foto: null },
                                { id: 2, descricao: "Teste 2", tipo: "Tipo 1", quantidade: 3, quantidade_picada: 0, foto: null },
                                { id: 3, descricao: "Teste 3", tipo: "Tipo 1", quantidade: 3, quantidade_picada: 0, foto: null },
                                { id: 4, descricao: "Teste 2", tipo: "Tipo 1", quantidade: 3, quantidade_picada: 0, foto: null },
                                { id: 5, descricao: "Teste 3", tipo: "Tipo 1", quantidade: 3, quantidade_picada: 0, foto: null },
                                { id: 6, descricao: "Teste 2", tipo: "Tipo 1", quantidade: 3, quantidade_picada: 0, foto: null },
                                { id: 7, descricao: "Teste 3", tipo: "Tipo 1", quantidade: 3, quantidade_picada: 0, foto: null },
                                { id: 8, descricao: "Teste 2", tipo: "Tipo 1", quantidade: 3, quantidade_picada: 0, foto: null },
                                { id: 9, descricao: "Teste 3", tipo: "Tipo 1", quantidade: 3, quantidade_picada: 0, foto: null }], data = [];
                                for (var i = 0, length = d.length; i < length; i++) {
                                    data.push(new INVENTARIO(d[i]));
                                }
                                
                                options.success(data);
                            }
                        });
                    },
                    schema: {
                        model: {
                            id: "ID",
                            fields: {
                                ID: { nullable: false, editable: false },
                                ID_TIPO: { type:"number", editable: false },
                                DESCRICAO: { type: "string", editable: false },
                                TIPO: { type: "string", editable: false },
                                QUANTIDADE: { type: "number", editable: true },
                                QUANTIDADE_PICADA: { type: "number", editable: true },
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
                    title: "Tipo",
                    field: "TIPO",
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
                    if (cell.index() == 0) {
                        if (dataItem.FOTO != null)
                            showImageHandler(true, { image: dataItem.FOTO, text: dataItem.DESCRICAO })
                    } else {
                        openModalView(e, "modalview-insert-artigo", dataItem);
                    }
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
function open_ModalInsertArtigo(e) {
    if (!obs_artigo) {
        var obs_artigo = new kendo.observable({
            aux_tipo: null,
            aux_id_tipo:null,
            hasIMAGEM:false,
            IMAGEM: null,
            QUANTIDADE: 1,
            //TIPO: null,
            ID:null,
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
                    var aux_tipo = null, aux_id_tipo = null;
                    startTransation().then(function (tr) {
                        if ($("#ddTipoArtigo").data("kendoDropDownList").dataItem()) {
                            aux_tipo = $("#ddTipoArtigo").data("kendoDropDownList").dataItem().DESC_TIPO;
                            aux_id_tipo = $("#ddTipoArtigo").data("kendoDropDownList").dataItem().ID;
                        }
                        if(!obs_artigo.get("ID")) {
                            db.transaction(function (tx) {
                                var query = "INSERT INTO inventario (descricao, id_tipo, tipo, quantidade, foto) VALUES ('" +
                                    obs_artigo.get("DESCRICAO") + "','" + aux_id_tipo + "','" + aux_tipo + "','" +
                                    obs_artigo.get("QUANTIDADE") + "','" + obs_artigo.get("IMAGEM") + "')";
                                tx.executeSql(query, [], function (tx, res) {
                                    notificacao("Inserido com sucesso.", "success", null, true);
                                    obs_artigo.reset();
                                    Loading();
                                },
                                function (tx, error) {
                                    notificacao("Erro ao inserir [gravarArtigo]: " + error.message, "error", 'Ups...');
                                    Loading();
                                });
                            });
                        }else{
                            updateFromDb("UPDATE inventario set descricao = ?, quantidade = ?,id_tipo = ?, tipo = ?, foto =? WHERE id = ?",
                                [obs_artigo.get("DESCRICAO"), obs_artigo.get("QUANTIDADE"),id_tipo, tipo, obs_artigo.get("IMAGEM"), obs_artigo.get("ID")]).then(function () {
                                    //notificacao("Actualizado com sucesso.", "success", null, true);
                                    obs_artigo.reset();
                                    Loading();
                                });
                        }
                    });
                    $("#modalview-insert-artigo [data-role='content']").data("kendoMobileScroller").reset();
                }
            },
            clearImage: function () {
                this.set("IMAGEM", null);
                $("#img-upload").attr("src",'');
            },
            reset: function () {
                this.set("DESCRICAO", null);
                this.set("IMAGEM", null);
                //this.set("TIPO", null);
                this.set("QUANTIDADE", 1);
                this.set("ID", null);
                this.set('aux_tipo', null);
                this.set('aux_id_tipo', null);
                $("#img-upload").attr("src", '');
                $("#descArtigo").focus();
            },
            setData: function (data) {
                if (data.FOTO) {
                    var image = document.getElementById("img-upload");
                    image.src = "data:image/jpeg;base64," + data.FOTO;
                    obs_artigo.set("IMAGEM", data.FOTO);
                }
                obs_artigo.set('DESCRICAO', data.DESCRICAO);
                obs_artigo.set('QUANTIDADE', data.QUANTIDADE);
                obs_artigo.set('ID', data.ID);
                $("#ddTipoArtigo").data("kendoDropDownList").select(data.ID_TIPO - 1);
            },
        });
    } else
        obs_artigo.reset();    
    if (!$("#ddTipoArtigo").data("kendoDropDownList")) {
        $("#ddTipoArtigo").kendoDropDownList({
            filter: "startswith",
            dataTextField: "DESC_TIPO",
            dataValueField: "ID",
            dataSource: new kendo.data.DataSource({
                pageSize: 20,
                serverPaging: true,
                transport: {
                    read: function (options) {
                        startTransation().then(function (tr) {
                            if (tr) {
                                tr.executeSql("SELECT id, desc_tipo FROM tipo", [], function (tx, resultSet) {
                                    try {
                                        var data = [];
                                        if (resultSet.rows.length > 0) {
                                            for (var x = 0; x < resultSet.rows.length; x++) {
                                                data.push(new TIPO(resultSet.rows.item(x)));
                                            }
                                        }
                                        options.success(data);
                                    } catch (ex) {
                                        notificacao('Erro ao criar objecto [DropTipo]: ' + ex.message, 'error', 'Ups...');
                                    }
                                },
                                function (tx, error) {
                                    notificacao('SELECT error: ' + error.message, 'error', 'Ups...');
                                });
                            }
                            else {
                                var d = [{ id: 1,desc_tipo:"Tipo 1", descricao: "Tipo 1"},
                                { id: 2, desc_tipo: "Tipo 1", descricao: "Tipo 2" },
                                { id: 3, desc_tipo: "Tipo 1", descricao: "Tipo 3" },
                                { id: 4, desc_tipo: "Tipo 1", descricao: "Tipo 4" }], data = [];
                                for (var i = 0, length = d.length; i < length; i++) {
                                    data.push(new TIPO(d[i]));
                                }
                                options.success(data);
                            }
                        });
                    },
                    schema: {
                        model: {
                            id: "ID",
                            fields: {
                                ID: { nullable: false, editable: false },
                                DESC_TIPO:{nullable:false,editable:false },
                                DESCRICAO: { type: "string", editable: false },
                            }
                        }
                    },
                },
            }),
            noDataTemplate: $("#dd-noDataTemplate").html(),
            popup: {
                position: "top center",
                origin: "top center"
            }
        });
    }
    kendo.bind($("#modalview-insert-artigo"), obs_artigo);
    obs_artigo.bind("change", function (e) {
        switch (e.field) {
            case "IMAGEM":
                this.set("hasIMAGEM", (this.get("IMAGEM")) ? true : false);
        }
    });
    delay(function () {
        if (e.dataItem)
            obs_artigo.setData(e.dataItem);
        $("#descArtigo").focus();
    }, 300);
    $("#qtdArtigo").TouchSpin({ min: 1, step: 1, maxboostedstep: false, });
}
function open_ModalInsertListDbTables(e) {
    if (!$("#gridDbTabels").data("kendoGrid")) {
        $("#gridDbTabels").kendoGrid({
            mobile: "phone",
            height: "100%",
            scrollable: true,
            //selectable: "cell",
            dataSource: new kendo.data.DataSource({
                //pageSize: 20,
                //serverPaging: true,
                transport: {
                    read: function (options) {
                        ListTables().then(function (results) {
                            options.success(results);
                        });
                    },
                },
            }),
            columns: [{
                    title: "Tabela",
                    field: "TABLE",
            }],
        });
    } else {
        $("#gridDbTabels").data("kendoGrid").dataSource.read();
    }
}
/********************************************** CLOSE MODALS **********************************************/
function close_ModalInsertArtigo() {
    $("#gridInventario").data("kendoGrid").dataSource.read();
}
/******************************************* OPEN ACTIONSHEETS ********************************************/
/**********************************************************************************************************/
function optionsClearData(e) {
    var tabela = (typeof e != 'String') ? $(e.target).data("table") : e;
    $confirm('Tem a certeza que pretende apagar TODOS os dados?', function (buttonIndex) {
        if (buttonIndex == 1) {
            clearTable(tabela).then(function () {
                clearTable('tipo').then(function () {
                    $("#gridInventario").data("kendoGrid").dataSource.read();
                });
            });
        }
    }, 'Confirmação', ['Sim', 'Não'], e);
}
function optionsListTables(e) {
    openModalView(null, "modalview-list-db-tables");
}