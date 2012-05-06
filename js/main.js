/*jslint browser:true*/
/*global MainContainer, window, Save, Load, PopupWindow, NoteWindow*/

'use strict';

/*

    Dependencies:
    
        jquery
        jqueryui
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
    
    to doo:
   
    
        - o fixed_order -- dar para escolher as cores 
		
	    - fazer um video a mostrar o programa logo desde o inicio

        - o simbolo pode ser algo relacionado com os rectangulos coloridos
                      
        - posso por na documentacao uns atalhos:
            ctrl + b --> bold
            ctrl + i --> italic
            
            ctrl + z --> undo
            ctrl + shift + z --> redo
            
        - por o spellcheck nas opcoes
    
        - por uma border na NoteWindow entre o menu e a entrada de texto (border-bottom: 4px dashed white; no menu)
              
    a pensar:
    
        - ter tb os alarmes tipo todolist
	
        - poder dividir as entradas em grupos (com uma barra no meio.. ter um titulo para o grupo?...)
                ser draggable entre os grupos

        - Retirar o overlay?...	
        
        - poder formatar o texto (tamanho das letras / cor / bold) -- ter um menu na NoteWindow
        
        - quando abre a NoteWindow, ter em baixo as notas k foram abertas (tipo os programas k tao abertos no panel/task_bar)
                funciona estilo historico, onde dps basta clicar ai para abrir a respectiva nota
            tar limitado a um numero de notas...


Problemas:

    - fazer o scroll do texto numa nota, as vezes nao faz o update do texto
            - quando esta em foco, o scroll nao actualiza o texto
            - se for fazer o scroll antes de por em foco, funciona

    - o UndoRedo de uma nota com o red_gradient no inicio, ele volta com uma cor gerada outra x, mas + clara (pois esta a contar que seja uma nota no fim...)

    - com frases grandes na NoteWindow, a janela vai aumentando, ao ponto das setas ficarem por cima (limitar + a NoteWindow?..)
    
    - ao selecionar as notas na NoteWindow, por o outline correspondente na nota
    
    - ver o problema no .getText() e comparar com o jquery .html() (dps actualizar na todolist tb)
    
 */


var OPTIONS = {
    noteWidth  : 250,   // the width/height of each note
    noteHeight : 125,
    noteMargin : 7,
    activeNotePosition      : -1,            // which note to get focus on the beginning of the program (-1 means no one)
    generateBackgroundColor : 'red_gradient' // how to generate the background-color of the notes
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
        PopupWindow.resize();            
        }    
    };


resize();

    // resize/reposition the popup windows, according to the space available
window.addEventListener( 'resize', resize, true );    
    

};



window.onunload = function()
{
Save();
};


