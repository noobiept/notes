/*jslint browser:true*/
/*global MainContainer, window, Save, Load*/

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
    
        - poder formatar o texto (tamanho das letras / cor / bold)    

        - on hover, aumentar o rectangulo para aum tamanho maior?.. ou ter outro efeito
		
	    - fazer um video a mostrar o programa logo desde o inicio

        - o simbolo pode ser algo relacionado com os rectangulos coloridos
   
        - se fazer drag das notas, ele gravar tb o background color?..
            (depende do modo de cores...)
            
        - no undo/redo aparecer o k vai acontecer caso se clique (tipo Undo: removed note)
    
        - ver Note.generateColor()
              
    a pensar:
    
        - ter tb os alarmes tipo todolist
	
        - poder dividir as entradas em grupos (com uma barra no meio.. ter um titulo para o grupo?...)
                ser draggable entre os grupos

        - Retirar o overlay?...	

 */


var OPTIONS = {
    noteWidth  : 200,   // the width/height of each note
    noteHeight : 100,
    activeNotePosition      : -1,            // which note to get focus on the beginning of the program (-1 means no one)
    generateBackgroundColor : 'red_gradient' // how to generate the background-color of the notes
    };


var MAIN_CONTAINER = null;

window.onload = function()
{
MAIN_CONTAINER = new MainContainer();
    

Load();
};



window.onunload = function()
{
Save();
};
