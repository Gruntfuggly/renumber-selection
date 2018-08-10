var vscode = require( 'vscode' );

function activate( context )
{
    var decoration;

    function zeroPad( num, numZeros )
    {
        var n = Math.abs( num );
        var zeros = Math.max( 0, numZeros - Math.floor( n ).toString().length );
        var zeroString = Math.pow( 10, zeros ).toString().substr( 1 );
        if( num < 0 )
        {
            zeroString = '-' + zeroString;
        }

        return zeroString + n;
    }

    var disposable = vscode.commands.registerCommand( 'renumberSelection', function()
    {
        var editor = vscode.window.activeTextEditor;
        var selection = editor.selection;

        var s = selection.start;
        var e = selection.end;

        var hasSelection = s.line !== e.line || s.character !== e.character;

        var config = vscode.workspace.getConfiguration( 'renumber-selection' );
        var counter = config.startValue;
        var document = editor.document;
        var numberPattern = new RegExp( config.regex, 'gm' );

        var lines = document.getText();
        var range = new vscode.Range( 0,
            document.lineAt( 0 ).range.start.character,
            document.lineCount - 1,
            document.lineAt( document.lineCount - 1 ).range.end.character );

        var selectionOffset = 0;

        if( hasSelection )
        {
            selectionOffset = document.offsetAt( selection.start );
            lines = lines.substring( selectionOffset, document.offsetAt( selection.end ) );
            range = selection;
        }

        var highlights = [];

        lines = lines.replace( numberPattern, function( match, g1, g2, g3 )
        {
            var offset = arguments[ arguments.length - 2 ];
            var current = counter;
            counter += config.increment;
            const startPos = editor.document.positionAt( offset + selectionOffset + g1.length );
            const endPos = editor.document.positionAt( offset + selectionOffset + g1.length + g2.length );
            const highlight = { range: new vscode.Range( startPos, endPos ) };
            highlights.push( highlight );
            return g1 + zeroPad( current, g2.length ) + ( g3 ? g3 : "" );
        } );

        var edits = [];
        edits.push( new vscode.TextEdit( range, lines ) );
        var edit = new vscode.WorkspaceEdit();
        edit.set( editor.document.uri, edits );
        vscode.workspace.applyEdit( edit );

        if( vscode.workspace.getConfiguration( 'renumber-selection' ).get( 'highlightChanges', true ) )
        {
            if( decoration )
            {
                decoration.dispose();
            }

            var lanes = {
                "center": 2,
                "full": 7,
                "left": 1,
                "right": 4
            };

            decoration = vscode.window.createTextEditorDecorationType( {
                light: { outline: vscode.workspace.getConfiguration( 'renumber-selection' ).get( 'highlightLight' ) },
                dark: { outline: vscode.workspace.getConfiguration( 'renumber-selection' ).get( 'highlightDark' ) },
                overviewRulerColor: vscode.workspace.getConfiguration( 'renumber-selection' ).get( 'highlightRulerColour' ),
                overviewRulerLane: lanes[ vscode.workspace.getConfiguration( 'renumber-selection' ).get( 'highlightRulerLane' ) ],
            } );

            editor.setDecorations( decoration, highlights );
        }
    } );

    context.subscriptions.push( disposable );
}

exports.activate = activate;

function deactivate()
{
}
exports.deactivate = deactivate;
