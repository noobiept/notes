


/*
 * 
 */

function Color(red, green, blue, alpha)
{
this.red_int = red;
this.green_int = green;
this.blue_int = blue;
this.alpha_float = alpha;
}



/*
 * 
 */

Color.prototype.getCssRepresentation = function()
{
return "rgba(" + this.red_int + ", " + this.green_int + ", " + this.blue_int + ", " + this.alpha_float  + ")";
};


/*
 * 
 */

Color.prototype.getRed = function()
{
return this.red_int;
};


/*
 * 
 */

Color.prototype.setRed = function( red )
{
this.red_int = red;
};


/*
 * 
 */

Color.prototype.getGreen = function()
{
return this.green_int;
};


/*
 * 
 */

Color.prototype.setGreen = function( green )
{
this.green_int = green;
};


/*
 * 
 */

Color.prototype.getBlue = function()
{
return this.blue_int;
};


/*
 * 
 */

Color.prototype.setBlue = function( blue )
{
this.blue_int = blue;
};

/*
 * 
 */

Color.prototype.getAlpha = function()
{
return this.alpha_float;
};


/*
 * 
 */

Color.prototype.setAlpha = function( alpha )
{
this.alpha_int = alpha;
};


/*
 * Returns a dictionary that has as keys, the components of the final color, red/green/blue/alpha
 *        (red/green/blue varies from 0 to 255, alpha from 0 to 1)
 */

Color.prototype.getColor = function()
{
return { 
    red   : this.red_int, 
    green : this.green_int,
    blue  : this.blue_int,
    alpha : this.alpha_float
    };
};
