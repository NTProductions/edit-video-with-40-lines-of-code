var mainWindow = new Window("palette", "Edit Video", undefined);
var button = mainWindow.add("button", undefined, "Edit Video");

mainWindow.center();
mainWindow.show();

button.onClick = function() {
    app.beginUndoGroup("Auto Edit");
        var folder = new Folder;
        folder = folder.selectDlg("Select your media folder");
        var files = folder.getFiles();
        var importedItems = [];
        for(var i = 0; i < files.length; i++) {
            if(files[i].name.indexOf(".mp4") != -1 || files[i].name.indexOf(".mov") != -1 || files[i].name.indexOf(".jpg") != -1 || files[i].name.indexOf(".png") != -1) {
                importedItems.push(app.project.importFile(new ImportOptions(files[i])));
                }
            }
        shuffleOrder(importedItems);
        createVideo(importedItems);
    app.endUndoGroup();
    }

function shuffleOrder(items) {
    for (var i = items.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    }
    }

function createVideo(items) {
    var comp = app.project.items.addComp("Auto Edit", 1920, 1080, 1, 360, 30);
    var layers = [];
    var start = 0;
    for(var i = 0; i < items.length; i++) {
        layers.push(comp.layers.add(items[i]));
        layers[i].selected = true;
        layers[i].startTime = start;
        start += layers[i].outPoint - layers[i].inPoint;
        }
    comp.workAreaDuration = layers[layers.length-1].outPoint;
    comp.openInViewer();
    }