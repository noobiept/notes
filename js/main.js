/*jslint browser:true*/
/*global MainContainer, window, Save, Load*/

'use strict';


/*
	- No inicio tem todas as notas... o texto k aparece ou eh um titulo que definimos, ou parte do texto escrito (na descricao)
	
	- poder reorganizar os rectangulos facilmente
	
	- poder mudar o tamanho das letras
	
	- mudar a cor das letras e do background
	
	- mas tb ter uma forma generica, em k ele vai dando cores ah sorte para cada entrada
	
	- on hover, aumentar o rectangulo para aum tamanho maior?.. ou se calhar ter k se clicar..
	
	- poder formatar o texto ... bold, letras maiores (ter um menu para isso, qd se edita uma entrada)
	
	- todos os rectangulos com o mesmo tamanho na parte inicial.. para ser + consistente 
		mostrar ou so um titulo, ou o inicio do texto na descricao
		
	- o background-color mudar automaticamente (ficar colorido) ou num pattern (tipo alternar entre 2 cores)
	
	- clica-se na entrada e tipo aumenta-se o tamanho da entrada, estilo uma popupwindow
		onde se escreve o texto (como a descricao da todolist)
		
	- ter um menu para alterar a cor, por bold/italica, mudar o tamanho...
	
	- ter uma .dummyEntry para criar as entradas (e tb uns butoes no menu or something..)
	
	- ctrl + enter cria uma entrada na posicao seguinte
	
	- fazer um video a mostrar o programa logo desde o inicio
	
	- por a pagar desde o inicio tb
	
	- ter tb os alarmes tipo todolist
	
	- o simbolo pode ser algo relacionado com os rectangulos coloridos 
	
	- poder dividir as entradas em grupos (com uma barra no meio.. ter um titulo para o grupo?...)
	
	- ser draggable entre os grupos
	
	- qd está em edit mode (com a popup window), poder mudar entre as notas com home/end key -- e ter tb umas setas de lado.. para fazer com o rato
	
	- se fazer drag das notas, ele gravar tb o background color?..
 */

/*

    - Retirar o overlay?...

 
    - ter k ser possivel escrever logo na note
        e se for preciso, abrir a popup window para editar com mais opções
 
 
    - no undo/redo aparecer o k vai acontecer caso se clique (tipo Undo: removed note)
 */


var MAIN_CONTAINER = null;

window.onload = function()
{
MAIN_CONTAINER = new MainContainer();
    
var newNote = document.querySelector( '#newNote' );

newNote.addEventListener( 'click', function(event) { MAIN_CONTAINER.add(); }, false );


Load();
};



window.onunload = function()
{
Save();
};
