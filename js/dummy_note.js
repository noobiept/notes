/*global MAIN_CONTAINER*/



function DummyNote()
{
var dummy = document.createElement( 'div' );


dummy.className = "dummyNote";
dummy.innerHTML = "New Note";


dummy.onclick = function()
    {
    MAIN_CONTAINER.add();  
    };


this.dummy_html = dummy;

return this;
}




DummyNote.prototype.getHtmlElement = function()
{
return this.dummy_html;
};
