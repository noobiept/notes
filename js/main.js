/*jslint white: true, vars: true, browser: true, newcap: true*/
/*global MainContainer, window, Save, Load, PopupWindow, NoteWindow, Analytics*/

'use strict';

/*
    Dependencies:
    
        jquery
        jqueryui
            position
            start theme
            slider
            blind effect
            fade effect
            
        ba-resize
 */


/*
    - As notas estão todas juntas (e têm todas o mesmo tamanho)  
    - ter uma dummy note, para adicionar notas
    - dá para eliminar/arrastar as notas directamente
    - Dá para editar directamente as notas (aparece uma barra caso tenha muito texto)
    - dá para abrir uma janela onde aparece o mesmo texto que na nota, juntamente com a opção de formatar o texto
    - a cor de fundo da nota pode ser gerada (de diversas maneiras, consoante a opção escolhida), ou definida pelo utilizador 
    
    
    a pensar:
    
        - o fixed_order -- dar para escolher as cores 
		
	    - fazer um video a mostrar o programa logo desde o inicio

        - o simbolo pode ser algo relacionado com os rectangulos coloridos
    
        - por uma border na NoteWindow entre o menu e a entrada de texto (border-bottom: 4px dashed white; no menu)
    
        - ter tb os alarmes tipo todolist
	
        - poder dividir as entradas em grupos (com uma barra no meio.. ter um titulo para o grupo?...)
                ser draggable entre os grupos

        - Retirar o overlay?...	
        
        - poder formatar o texto (tamanho das letras / cor / bold) -- ter um menu na NoteWindow
        
        - quando abre a NoteWindow, ter em baixo as notas k foram abertas (tipo os programas k tao abertos no panel/task_bar)
                funciona estilo historico, onde dps basta clicar ai para abrir a respectiva nota
            tar limitado a um numero de notas...

        - aparecer na NoteWindow algures a dizer a posicao da note (noteObject.getPosition())

Problemas:

    - fazer o scroll do texto numa nota, as vezes nao faz o update do texto
            - quando esta em foco, o scroll nao actualiza o texto
            - se for fazer o scroll antes de por em foco, funciona

    - o UndoRedo de uma nota com o red_gradient no inicio, ele volta com uma cor gerada outra x, mas + clara (pois esta a contar que seja uma nota no fim...)

    - com frases grandes na NoteWindow, a janela vai aumentando, ao ponto das setas ficarem por cima (limitar + a NoteWindow?..)
    
    - ao selecionar as notas na NoteWindow, por o outline correspondente na nota
    
    - abrir a janela das opcoes, e clicar tab, ele vai selecionar as notas

 */

/*
    to doo:
    
        - changing the notes dimensions (width/height/margin) affects the next notes that are added (so you end up with notes with different width etc). have 2 separate options (the active ones, and the next ones)
    
 */
 

/*
    In the server version, the index.html (in the server templates) has these variables re-defined
 */

var TYPE = 'app';
var VERSION = '1.1';

var BASE_URL = '';
 
 
var OPTIONS = {
    noteWidth  : 250,   // the width/height of each note
    noteHeight : 125,
    noteMargin : 7,
    activeNotePosition : -1,               // which note to get focus on the beginning of the program (-1 means no one)
    generateColorType  : 'red_gradient',   // how to generate the background-color of the notes
    analyticsTimer     : -1,
    spellCheck : true
    };


var MAIN_CONTAINER = null;



window.onload = function()
{
MAIN_CONTAINER = new MainContainer();
    

Load();


var resize = function() 
    {
    if (PopupWindow.hasOpenedWindows() === true)
        {
        PopupWindow.resizeAll();            
        }    
    };


resize();

    // resize/reposition the popup windows, according to the space available
window.addEventListener( 'resize', resize, true );    

window.addEventListener( 'keyup', globalShortcuts, true );
};




    // 'on before unload' instead of 'on unload' so that in the server version, when refreshing (F5)
    // the logout gets called first, than the load of the new page (otherwise, the new load will have the previous data)
window.onbeforeunload = function()
{
    //save some stuff when the application is closed
Save(); 
}; 



/*
 * Logout the user as well
 */

function Logout()
{
    // remove the function from the event, otherwise its going to be called again (the Save() will redirect to '/')
window.onbeforeunload = null;
    
Save( true );
}

