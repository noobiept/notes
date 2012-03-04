/*jslint browser:true*/
/*global MainContainer, window, Save, Load*/

'use strict';


/*
    - As notas estão todas juntas (e têm todas o mesmo tamanho)  
    - ter uma dummy note, para adicionar notas
    - dá para eliminar/arrastar as notas directamente
    - Dá para editar directamente as notas (aparece uma barra caso tenha muito texto)
    - dá para abrir uma janela onde aparece o mesmo texto que na nota, juntamente com a opção de formatar o texto
    
    
    to doo:
    
        - poder definir as cores das notas (na NoteWindow -- color e background-color)
    
        - poder formatar o texto (tamanho das letras / cor / bold)    

		- mas tb ter uma forma generica, em k ele vai dando cores ah sorte para cada entrada
	
        - on hover, aumentar o rectangulo para aum tamanho maior?.. ou ter outro efeito
		
	    - o background-color mudar automaticamente (ficar colorido) ou num pattern (tipo alternar entre 2 cores)
	
	    - ctrl + enter cria uma entrada na posicao seguinte
	
	    - fazer um video a mostrar o programa logo desde o inicio

        - o simbolo pode ser algo relacionado com os rectangulos coloridos
   
        - qd está em edit mode (com a popup window), ter tb umas setas de lado para mudar de nota

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
    noteDimension      : 100,   // the width/height of each note
    activeNotePosition : -1     // which note to get focus on the beginning of the program (-1 means no one)
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
