/*jslint browser:true*/
/*global MainContainer, window, Save, Load, PopupWindow*/

'use strict';

/*

    Dependencies:
    
        jquery
        jqueryui
            start theme
            slider
            blind effect
            fade effect

 */


/*
    - As notas estão todas juntas (e têm todas o mesmo tamanho)  
    - ter uma dummy note, para adicionar notas
    - dá para eliminar/arrastar as notas directamente
    - Dá para editar directamente as notas (aparece uma barra caso tenha muito texto)
    - dá para abrir uma janela onde aparece o mesmo texto que na nota, juntamente com a opção de formatar o texto
    
    
    to doo:
    
        - poder definir as cores das notas (na NoteWindow -- color e background-color)
            dar para definir as cores pelo utilizador, e essas nao sao afectadas por o Note.generateColor()
    
        - o fixed_order -- dar para escolher as cores 

        - on hover, aumentar o rectangulo para aum tamanho maior?.. ou ter outro efeito
		
	    - fazer um video a mostrar o programa logo desde o inicio

        - o simbolo pode ser algo relacionado com os rectangulos coloridos
              
        - no undo/redo aparecer o k vai acontecer caso se clique (tipo Undo: removed note)
    
        - melhorar o estilo da scroll bar
        
        - Puff and Size come bundled with scale -- experimentar o puff para o overlay
                 
        - posso por na documentacao uns atalhos:
            ctrl + b --> bold
            ctrl + i --> italic
            
            ctrl + z --> undo
            ctrl + shift + z --> redo
              
    a pensar:
    
        - ter tb os alarmes tipo todolist
	
        - poder dividir as entradas em grupos (com uma barra no meio.. ter um titulo para o grupo?...)
                ser draggable entre os grupos

        - Retirar o overlay?...	
        
        - poder formatar o texto (tamanho das letras / cor / bold) -- ter um menu na NoteWindow
        
        - quando abre a NoteWindow, ter em baixo as notas k foram abertas (tipo os programas k tao abertos no panel/task_bar)
                funciona estilo historico, onde dps basta clicar ai para abrir a respectiva nota
            tar limitado a um numero de notas...

 */


var OPTIONS = {
    noteWidth  : 250,   // the width/height of each note
    noteHeight : 125,
    noteMargin : 5,
    activeNotePosition      : -1,            // which note to get focus on the beginning of the program (-1 means no one)
    generateBackgroundColor : 'red_gradient' // how to generate the background-color of the notes
    };


var MAIN_CONTAINER = null;

window.onload = function()
{
MAIN_CONTAINER = new MainContainer();
    

Load();

    // resize/reposition the popup windows, according to the space available
window.addEventListener( 'resize', 
    function() 
    {
    if (PopupWindow.hasOpenedWindows() === true)
        {
        PopupWindow.resize();            
        }    
    }, 
    true );    
    

};



window.onunload = function()
{
Save();
};
