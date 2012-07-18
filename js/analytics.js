/*global localStorage, _gaq, OPTIONS, TYPE, VERSION*/
/*jslint white: true, vars: true*/

'use strict';

/*
    deals with google analytics (sending the options, events, etc)
 
 */

var Analytics = {

};



 //HERE parte do codigo está no main.js ... parece k nao funciona se for aqui
Analytics.start = function ()
{
var ga = document.createElement('script'); 
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

var s = document.getElementsByTagName('script')[0]; 
s.parentNode.insertBefore(ga, s);
    



if ( Analytics.hasOneDayPassed() === true )
    {
        //send the options to google analytics (once and then)
    Analytics.options();        
    
        // tell which version we're running
    Analytics.send( "TYPE_VERSION", "VERSION_" + TYPE + '_' + VERSION );
    }
};






/*
 * sends the options that are set
 */

Analytics.options = function ()
{
      //we send the options values to google analytics
Analytics.send( 'options', 'OPTIONS_noteWidth:  ' + OPTIONS.noteWidth, 'other' );
Analytics.send( 'options', 'OPTIONS_noteHeight:  ' + OPTIONS.noteHeight, 'other' );
Analytics.send( 'options', 'OPTIONS_noteMargin:  ' + OPTIONS.noteMargin, 'other' );
Analytics.send( 'options', 'OPTIONS_generateColorType:  ' + OPTIONS.generateColorType, 'other' );
Analytics.send( 'options', 'OPTIONS_spellCheck:  ' + OPTIONS.spellCheck, 'other' );
};




/*
 * Returns true/false if one day (or more) has passed since last time (it saves in localStorage)
 */

Analytics.hasOneDayPassed = function()
{
/*
    Get the number of miliseconds of a day
    
    1 week   -> 7 days
    1 day    -> 24 hours
    1 hour   -> 60 minutes
    1 minute -> 60 seconds
    1 second -> 1000 miliseconds
    
    So a week is: 7 * 24 * 60 * 60 * 1000
    
    A day is: 1000 * 60 * 60 * 24
 */


var dayTime = 86400000;


var currentDate = new Date();
            
var currentInMiliseconds = currentDate.getTime();


    //if there isn't any date there, we initialize it with the current date
if (OPTIONS.analyticsTimer < 0)
    {
    OPTIONS.analyticsTimer = currentInMiliseconds;
    }

else
    {
    var lastInMiliseconds = OPTIONS.analyticsTimer;
        
         
        //see if we got ourselves a number
    if (isNaN( lastInMiliseconds ) === false)
        {
            //we add the day time to the last date, and if this is lower than the current time, means a day or more has passed
        if (( lastInMiliseconds + dayTime ) < currentInMiliseconds)
            { 
                //reset the value, with the current date
            OPTIONS.analyticsTimer = currentInMiliseconds;
            
            return true;
            }
        }
    }

return false;
};





/*
 * sends an event to google analytics
 * 
 * Default:
 * 
 *      label : "other"
 */

Analytics.send = function (category, action, label)
{
if (OPTIONS.analytics !== false)
    {
    if (typeof label == 'undefined')
        {
        label = "other";
        }
    
    _gaq.push( [ '_trackEvent', category, action, label ] );
    }
};
