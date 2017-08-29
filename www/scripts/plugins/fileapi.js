window.fileStorage = {
    save: function (appPath, relativePath, filename, data) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        /*var gotFileSystem = function (fileSystem) {
			if (cordova && cordova.file) {
				//var fileLocation = cordova.file.externalApplicationStorageDirectory + 'Temp';
				var fileLocation = appPath + relativePath;
				var relativeDirectory = fileLocation.replace(cordova.file.externalRootDirectory, '');
				fileLocation = fileLocation.replace('file://', '');

				new DirManager().create_r(relativeDirectory, function () {
					fileSystem.root.getDirectory(relativeDirectory, { create: true, exclusive: false }, function (dirEntry) { // Android/data/pt.alidata.goMobile2/temp
						dirEntry.getFile(filename, { create: true, exclusive: false }, gotFileEntry, fail);
					}, fail);
				});

			} else {
				deferred.resolve();
			}
		};*/

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                new DirManager(appPath).create_r(relativePath, function () {
                    window.resolveLocalFileSystemURL(appPath + relativePath, function (dirEntry) {
                        //fileSystem.root.getDirectory(relativeDirectory, { create: true, exclusive: false }, function (dirEntry) {
                        dirEntry.getFile(filename, { create: true, exclusive: false }, gotFileEntry, fail);
                        //}, fail);
                    });
                });

            } else {
                deferred.resolve();
            }
        };

        var gotFileEntry = function (fileEntry) {
            fileEntry.createWriter(gotFileWriter, fail);
        };

        var gotFileWriter = function (writer) {
            writer.onwrite = function () {
                deferred.resolve();
            };
            writer.onerror = fail;
            writer.write(data);
        }

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, data.length || 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },

    move: function (appPath, relativePath, origin) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                var fileLocation = appPath + relativePath;
                //var relativeDirectory = fileLocation.replace(cordova.file.externalRootDirectory, '');
                //fileLocation = fileLocation.replace('file://', '');

                fileSystem.root.getDirectory(fileLocation, { create: true, exclusive: false }, function (dirEntry) {
                    //new DirManager().create_r(relativeDirectory, function () {
                    //fileSystem.root.getDirectory(fileLocation, { create: true, exclusive: false }, function (dirEntry) {
                    //	dirEntry.getFile(filename, { create: true, exclusive: false }, gotFileEntry, fail);
                    //}, fail);

                    /*window.resolveLocalFileSystemURI(origin, function(file) {
                        window.resolveLocalFileSystemURI(fileLocation, function(destination) {
                            file.moveTo(fileLocation, origin.split('/')[origin.split('/').length - 1], function (entry) {
                                //alert("New Path: " + entry.fullPath);
                            }, fail);
                        },fail);
                    },fail);*/
                    var filename = origin.split('/')[origin.split('/').length - 1];
                    var destinationURL = fileLocation + filename;

                    if (destinationURL === origin) {
                        deferred.resolve(destinationURL);
                    }
                    else {
                        window.resolveLocalFileSystemURL(origin, function (fileEntry) {
                            //window.resolveLocalFileSystemURL(fileLocation, function (dirEntry) {
                            // move the file to a new directory and rename it
                            fileEntry.moveTo(dirEntry, filename, function (entry) {
                                deferred.resolve(fileLocation + '/' + filename);
                            }, fail);
                            //}, fail);
                        }, fail);
                    }
                    //});
                }, fail);
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },

    load: function (name) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            fileSystem.root.getFile(name, { create: false, exclusive: false }, gotFileEntry, fail);
        };

        var gotFileEntry = function (fileEntry) {
            fileEntry.file(gotFile, fail);
        };

        var gotFileWriter = function (writer) {
            reader = new FileReader();
            reader.onloadend = function (evt) {
                data = evt.target.result;
                deferred.resolve(data);
            };

            reader.readAsText(file);
        }

        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, data.length || 0, gotFileSystem, fail);
        return deferred.promise();
    },

    delete: function (name) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            fileSystem.root.getFile(name, { create: false, exclusive: false }, gotFileEntry, fail);
        };

        var gotFileEntry = function (fileEntry) {
            fileEntry.remove();
        };

        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        return deferred.promise();
    },

    read: function (path) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                path = path.replace('file://', '');
                fileSystem.root.getDirectory(path, { create: false, exclusive: false }, function (dirEntry) {
                    // Get a directory reader
                    var directoryReader = dirEntry.createReader();
                    // Get a list of all the entries in the directory
                    directoryReader.readEntries(function (entries) {
                        var data = [];
                        for (var i = 0; i < entries.length; i++) {
                            //dirEntry.getFile(entries[i].name, { create: false, exclusive: false }, function (fileEntry) {
                            //	fileEntry.file(function (file) {
                            //		var filename = file.name;
                            //	});
                            //});
                            if (entries[i].isFile) {
                                data.push({ 'name': entries[i].name, 'nativeURL': entries[i].nativeURL, 'fullPath': entries[i].fullPath });
                            }
                        }

                        deferred.resolve(data);
                    });
                }, fail);
            } else {
                deferred.resolve();
            }
        };

        var gotFileEntry = function (fileEntry) {
            fileEntry.createWriter(gotFileWriter, fail);
        };

        var gotFileWriter = function (writer) {
            writer.onwrite = function () {
                deferred.resolve();
            };
            writer.onerror = fail;
            writer.write(data);
        }

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },
    read_file: function (path, filename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                window.resolveLocalFileSystemURL(path, function (dirEntry) {
                    dirEntry.getFile(filename, { create: false, exclusive: false }, function (fileEntry) {
                        deferred.resolve(fileEntry);
                    }, fail);
                });
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },
    get_file: function (dataDirectory, destinationFolder, filename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                window.resolveLocalFileSystemURL(dataDirectory, function (dirEntry) {
                    new DirManager(dataDirectory).create_r(destinationFolder, function () {
                        window.resolveLocalFileSystemURL(dataDirectory + destinationFolder, function (dirEntry) {
                            dirEntry.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
                                deferred.resolve(fileEntry);
                            }, fail);
                        });
                    });
                });
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },
    read_dir: function (path) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                window.resolveLocalFileSystemURL(path, function (dirEntry) {
                    dirEntry.createReader().readEntries(function (entries) {
                        deferred.resolve(entries);
                    });
                }, function (error) {
                    var destinationFolder = path.substring(path.lastIndexOf('/')).replace('/', '');
                    new DirManager(path.replace('/' + destinationFolder, '')).create_r(destinationFolder, function () {
                        deferred.resolve([]);
                    });
                });
            } else {
                deferred.resolve([]);
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve([]);
        }

        return deferred.promise();
    },
    read_dir2: function (dataDirectory, destinationFolder) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {

                window.resolveLocalFileSystemURL(dataDirectory, function (dirEntry) {
                    new DirManager(dataDirectory).create_r(destinationFolder, function () {
                        window.resolveLocalFileSystemURL(dataDirectory + destinationFolder, function (dirEntry) {
                            dirEntry.createReader().readEntries(function (entries) {
                                deferred.resolve(entries);
                            });
                        });
                    });
                });

            } else {
                deferred.resolve([]);
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve([]);
        }

        return deferred.promise();
    },
    move_file: function (filepath, newpath, newfilename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                window.resolveLocalFileSystemURL(filepath, function (fileEntry) {
                    window.resolveLocalFileSystemURL(newpath, function (dirEntry) {
                        fileEntry.moveTo(dirEntry, newfilename, function (fileEntry) {
                            deferred.resolve(fileEntry);
                        }, fail);
                    }, fail);
                });
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },
    move_file2: function (dataDirectory, destinationFolder, originFilePath, newfilename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                var destinationPath = dataDirectory + destinationFolder;

                window.resolveLocalFileSystemURL(originFilePath, function (fileEntry) {

                    window.resolveLocalFileSystemURL(dataDirectory, function (dirEntry) {

                        new DirManager(dataDirectory).create_r(destinationFolder, function () {

                            //dirEntry.getDirectory(destinationFolder, {create: true, exclusive: false}, function(dirName) {
                            window.resolveLocalFileSystemURL(destinationPath, function (dirEntry) {
                                fileEntry.moveTo(dirEntry, newfilename, function (fileEntry) {
                                    deferred.resolve(fileEntry);
                                }, fail);
                            }, fail);
                            //});

                        }); // new DirManager().create_r

                    }, fail); // window.resolveLocalFileSystemURL(dataDirectory

                }, fail); // window.resolveLocalFileSystemURL(originFilePath
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },

    copy_file: function (dataDirectory, destinationFolder, originFilePath, newfilename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                var destinationPath = dataDirectory + destinationFolder;

                window.resolveLocalFileSystemURL(originFilePath, function (fileEntry) {

                    window.resolveLocalFileSystemURL(dataDirectory, function (dirEntry) {

                        new DirManager(dataDirectory).create_r(destinationFolder, function () {

                            window.resolveLocalFileSystemURL(destinationPath, function (dirEntry) {
                                fileEntry.copyTo(dirEntry, newfilename, function (fileEntry) {
                                    deferred.resolve(fileEntry);
                                }, fail);
                            }, fail);

                        }); // new DirManager().create_r

                    }, fail); // window.resolveLocalFileSystemURL(dataDirectory

                }, fail); // window.resolveLocalFileSystemURL(originFilePath
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    }
};
function fileError(error) {
    switch (error.code) {
        case FileError.NOT_FOUND_ERR:
            alert('NOT_FOUND_ERR');
            break;
        case FileError.SECURITY_ERR:
            alert('SECURITY_ERR');
            break;
        case FileError.ABORT_ERR:
            alert('ABORT_ERR');
            break;
        case FileError.NOT_READABLE_ERR:
            alert('NOT_READABLE_ERR');
            break;
        case FileError.ENCODING_ERR:
            alert('ENCODING_ERR');
            break;
        case FileError.NO_MODIFICATION_ALLOWED_ERR:
            alert('NO_MODIFICATION_ALLOWED_ERR');
            break;
        case FileError.INVALID_STATE_ERR:
            alert('INVALID_STATE_ERR');
            break;
        case FileError.SYNTAX_ERR:
            alert('SYNTAX_ERR');
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            alert('INVALID_MODIFICATION_ERR');
            break;
        case FileError.QUOTA_EXCEEDED_ERR:
            alert('QUOTA_EXCEEDED_ERR');
            break;
        case FileError.TYPE_MISMATCH_ERR:
            alert('TYPE_MISMATCH_ERR');
            break;
        case FileError.PATH_EXISTS_ERR:
            alert('PATH_EXISTS_ERR');
            break;
    }
    window.kendoMobileApplication.hideLoading();
}