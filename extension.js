var vscode = require( 'vscode' );

function activate( context )
{
    var disposable = vscode.commands.registerCommand( 'renumberSelection', function()
    {
        var editor = vscode.window.activeTextEditor;
        var selection = editor.selection;

        var s = selection.start;
        var e = selection.end;

        var hasSelection = s.line !== e.line || s.character !== e.character;

        if( hasSelection )
        {
            var config = vscode.workspace.getConfiguration( 'renumber-selection' );
            var counter = config.startValue;
            var document = editor.document;
            var numberPattern = new RegExp( config.regex, 'gm' );

            var text = document.getText();
            var lines = text.substring( document.offsetAt( selection.start ), document.offsetAt( selection.end ) );

            lines = lines.replace( numberPattern, function( match, g1, g2 )
            {
                var current = counter;
                counter += config.increment;
                return current;
            } );

            var edits = [];
            edits.push( new vscode.TextEdit( selection, lines ) );
            var edit = new vscode.WorkspaceEdit();
            edit.set( editor.document.uri, edits );
            vscode.workspace.applyEdit( edit );
        }
    } );

    context.subscriptions.push( disposable );
}

exports.activate = activate;

function deactivate()
{
}
exports.deactivate = deactivate;
